const express = require('express')
const router = express.Router()
const middleware = require('../../utils/middleware')
const logger = require('../../utils/logger')
const Recipe = require('../../models/recipe')
const User = require('../../models/user')
const path = require('path')
const multer = require('multer')
const fs = require('fs')

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

  const recipeInDb = await Recipe.findById(req.params.id)

  const allowUpdate = recipeInDb === null
    ? false
    : req.user.id.toString() === recipeInDb.user.toString()

  if (!(recipeInDb && allowUpdate)) {
    const error = { name: 'FalseLogin', message: 'Wrong username or password' }
    return next(error)
  } else {
    const previousAvatar = recipeInDb.avatar.key

    upload(req,res, async (err) => {
      if(err) {
        const error = { name: 'ImgUploadError', message: 'File was not supported' }
        return next(error)
      }
      else {
        try {
          const s3_res = await uploadFile(req.file)   // Upload file to S3

          const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, { avatar: { key: s3_res.Key, location: s3_res.Location } }, { new: true })
          res.status(200).send({ recipe: updatedRecipe })
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

router.get('/avatars/:id', async (req, res, next) => {
  try {
    const recipeInDb = await Recipe.findById(req.params.id)
    const file = await getFileStream(recipeInDb.avatar.key)
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
  const recipe = await Recipe.find().populate('user')
  logger.info(recipe)
  return res.status(200).json(recipe)
})

router.post('/', middleware.userExtractor, async (req, res, next) => {
  // const recipe = req.body
  // logger.info(recipe)

  const user = req.user
  console.log(user.id)
  try {
    const userInDb = await User.findById(user.id)
    console.log(userInDb)

    if (!userInDb) {
      const error = { name: 'ValidationError', message: 'Not logged in' }
      return next(error)
    } else {
      const recipe = new Recipe({
        user: userInDb.id,
        title: req.body.title,
        course: req.body.course,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        difficulty: req.body.difficulty,
        timeEstimate: req.body.timeEstimate
      })

      const savedRecipe = await recipe.save()
      userInDb.recipes = userInDb.recipes.concat(savedRecipe.id)

      await userInDb.save()

      res.status(200).json(savedRecipe)
    }




  } catch(e) {
    return next(e)
  }


})

module.exports = router