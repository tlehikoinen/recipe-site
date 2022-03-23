const express = require('express')
const router = express.Router()
const middleware = require('../../utils/middleware')
const logger = require('../../utils/logger')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const path = require('path')
const multer = require('multer')
const fs = require('fs')

const { uploadFile, getFileStream } = require('../../utils/s3')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {

    // Uploads is the Upload_folder_name
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
})

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb){

    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|png/
    var mimetype = filetypes.test(file.mimetype)

    var extname = filetypes.test(path.extname(
      file.originalname).toLowerCase())

    if (mimetype && extname) {
      return cb(null, true)
    }

    cb('Error: File upload only supports the '
              + 'following filetypes - ' + filetypes)
  }

// file is the name of file attribute
}).single('file')

router.post('/avatars/:id', middleware.userExtractor, async (req, res, next) => {

  const userInDb = await User.findById(req.params.id)

  const allowUpdate = userInDb === null
    ? false
    : req.user.id.toString() === userInDb._id.toString()

  if (!(userInDb && allowUpdate)) {
    const error = { name: 'FalseLogin', message: 'Wrong username or password' }
    return next(error)
  } else {
    // Todo: Save previous image location and delete it from S3 if upload is successful
    // Resize image before uploading to server
    // Upload file to server
    upload(req,res, async (err) => {
      if(err) {
        const error = { name: 'ImgUploadError', message: 'File was not supported' }
        return next(error)
      }
      else {
        try {
          const s3_res = await uploadFile(req.file)   // Upload file to S3
          console.log('S3 Response')
          console.log(s3_res)
          const updatedUser = await User.findByIdAndUpdate(req.params.id, { avatar: { key: s3_res.Key, location: s3_res.Location } }, { new: true })
          res.status(200).send({ user: updatedUser })
        }
        catch(e) {
          const err2= { name: 'ImgUploadError', code: 400, message: 'Could not save image to cloud' }
          return next(err2)
        }
        fs.unlinkSync(req.file.path)                // Delete file from server
      }
    })
  }
})


router.get('/avatars/:id', async (req, res, next) => {
  const userInDb = await User.findById(req.params.id)
  console.log(userInDb)
  const file = await getFileStream(userInDb.avatar.key)
  res.set('Cache-Control', 'private, max-age=2629743, must-revalidate') // cache one month
  file.pipe(res)
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find()
    res.set('Cache-Control', 'private, max-age=60, must-revalidate') // cache 1 min
    res.status(200).json(users)
  } catch(e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.set('Cache-Control', 'private, max-age=60, must-revalidate') // cache minute
    res.status(200).json(user)
    console.log('done')

  } catch(e) {
    console.log('error')
    next(e)
  }
})

// .../api/users/id
router.delete('/:id', middleware.userExtractor, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send('Delete successful')
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

router.post('/confirmAndDelete', middleware.userExtractor, async (req, res, next) => {
  try {
    const userInDb = await User.findById(req.user.id).select('+hashPassword')
    console.log('deleting')
    console.log(userInDb)
    const correctPassword = userInDb === null
      ? false
      : await bcrypt.compare(req.body.password, userInDb.hashPassword)

    if (!(userInDb && correctPassword)) {
      const error = { name: 'FalseLogin', message: 'Wrong username or password' }
      return next(error)
    } else {
      await User.findByIdAndDelete(req.user.id)
      res.status(200).send('Delete successful')
    }

  } catch(e) {
    next(e)
  }
})

router.put('/:id', middleware.userExtractor, async (req, res, next) => {
  try {
    const userInDb = await User.findById(req.params.id)
    const allowUpdate = userInDb === null
      ? false
      : req.user.id.toString() === userInDb._id.toString()

    if (!(userInDb && allowUpdate)) {
      const error = { name: 'FalseLogin', message: 'Wrong username or password' }
      return next(error)
    } else {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).send({ user: updatedUser })
    }

  } catch(e) {
    next(e)
  }
})


module.exports = router

