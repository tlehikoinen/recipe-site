const express = require('express')
const router = express.Router()
const middleware = require('../../utils/middleware')
const logger = require('../../utils/logger')
const User = require('../../models/user')
const Recipe = require('../../models/recipe')
const Follower = require('../../models/follow')
const bcrypt = require('bcrypt')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const ObjectId = require('mongodb').ObjectId

const { uploadFile, getFileStream, deleteFile } = require('../../utils/s3')

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
    const previousAvatar = userInDb.avatar.key
    console.log(previousAvatar)

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
          fs.unlinkSync(req.file.path)                // Delete file from server (In case upload to S3 fails)
          return next(err2)
        }
        // Delete previous avatar from s3
        if (previousAvatar !== '') await deleteFile(previousAvatar)
        fs.unlinkSync(req.file.path)                // Delete file from server
      }
    })
  }
})

router.put('/follow/:id', middleware.userExtractor, async (req, res, next) => {
  try {
    const followingUser = await User.findById(req.user.id)
    const followedUser = await User.findById(req.params.id)

    if (!followingUser) {
      const error = { name: 'FalseLogin', message: 'Not authorized' }
      return next(error)
    } else if (!followedUser) {
      return res.status(404).send('User does not exist')
    } else {
      const combined = followingUser.id.concat(followedUser.id)   // Combine id's to string to ensure uniquity of the follow

      const follower = new Follower({
        uniqueIds: combined.toString(),
        follower: followingUser.id,
        followed: followedUser.id,
        followerSince: new Date()
      })

      const savedFollower = await follower.save()

      followingUser.following = followingUser.following.concat(savedFollower.id)
      await followingUser.save()
      followedUser.followers = followedUser.followers.concat(savedFollower.id)
      await followedUser.save()

      const updatedFollowingUser = await User.findById(req.user.id)
      res.status(200).send({ user: updatedFollowingUser, follow: savedFollower })
    }

  } catch(e) {
    next(e)
  }
})

router.delete('/follow/:id', middleware.userExtractor, async (req, res, next) => {
  try {
    const followingUser = await User.findById(req.user.id)
    const followedUser = await User.findById(req.params.id)

    const combined = followingUser.id.concat(followedUser.id)   // Combine id's to string (uniqueIds field in db)
    const follow = await Follower.findOne({ uniqueIds: combined })

    if (followingUser && followedUser && follow) {

      await User.updateMany({ }, { '$pull': { 'following':  follow.id, 'followers' : follow.id } })   // Delete references to follow from users
      await Follower.findByIdAndDelete(follow.id) // Delete follow

      const updatedFollowingUser = await User.findById(req.user.id)
      res.status(202).send({ user: updatedFollowingUser })
    }
  } catch(e) {
    next(e)
  }
})

router.get('/avatars/:id', async (req, res, next) => {
  try {
    const userInDb = await User.findById(req.params.id)
    const file = await getFileStream(userInDb.avatar.key)
    file.on('error', () => {
      return res.status(404).send('Image not found')
    })
    res.set('Cache-Control', 'private, max-age=2629743, must-revalidate') // cache one month
    file.pipe(res)
  } catch(e) {
    next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find()
    //res.set('Cache-Control', 'private, max-age=60, must-revalidate') // cache 1 min
    res.status(200).json(users)
  } catch(e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('recipes')
    //res.set('Cache-Control', 'private, max-age=60, must-revalidate') // cache minute
    res.status(200).json(user)
  } catch(e) {
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
    // console.log('deleting')
    // console.log(userInDb)
    const correctPassword = userInDb === null
      ? false
      : await bcrypt.compare(req.body.password, userInDb.hashPassword)

    if (!(userInDb && correctPassword)) {
      const error = { name: 'FalseLogin', message: 'Wrong username or password' }
      return next(error)
    } else {

      // Delete user
      await User.findByIdAndDelete(userInDb.id)
      // Delete user references from recipes
      await Recipe.updateMany( { 'user': req.user.id }, { $unset: { 'user': '' } })

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

router.put('/:id/theme', middleware.userExtractor, async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { theme: req.body.theme })
    res.status(202).send('ok')
  } catch(e) {
    next(e)
  }

})


module.exports = router

