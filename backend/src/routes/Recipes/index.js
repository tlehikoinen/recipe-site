const express = require('express')
const router = express.Router()
const middleware = require('../../utils/middleware')
const logger = require('../../utils/logger')
const Recipe = require('../../models/recipe')
const User = require('../../models/user')
const Comment = require('../../models/comment')
const path = require('path')
const multer = require('multer')
const fs = require('fs')

const { uploadFile, getFileStream, deleteFile } = require('../../utils/s3')
const ObjectId = require('mongodb').ObjectId

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

router.put('/:id/likes', middleware.userExtractor, async (req, res, next) => {
  const reqUser = req.user
  try {
    // Requesting user
    const userInDb = await User.findById(reqUser.id)

    // Create object id and compare it with users previously liked recipes. Only one like per user will be accepted
    const recipeObjectId = new ObjectId(req.params.id)
    if (userInDb.likedRecipes.includes(recipeObjectId)) {
      const error = { code: 400, message: 'User had already given like to this recipe' }
      return next(error)
    }

    // Add recipe to users likedRecipes
    const updatedUser = {
      ...userInDb, likedRecipes: userInDb.likedRecipes.push(req.params.id)
    }
    const newUser = await User.findByIdAndUpdate(reqUser.id, updatedUser, { new: true })

    // Add like to recipes likers
    const recipeInDb = await Recipe.findById(req.params.id)

    const updatedRecipe = {
      ...recipeInDb, likes: recipeInDb.likers.push(reqUser.id)
    }

    await Recipe.findByIdAndUpdate(req.params.id, updatedRecipe, { new: true })

    res.status(200).json({ user: newUser })
  } catch(e) {
    next(e)
  }
})

router.delete('/:id/likes', middleware.userExtractor, async (req, res, next) => {
  try {
    // Delete like from user
    const newUser = await User.findByIdAndUpdate(
      req.user.id,
      { '$pull': { 'likedRecipes': req.params.id } }, { new: true })

    // Delete like from recipe
    await Recipe.findByIdAndUpdate(
      req.params.id,
      { '$pull': { 'likers': req.user.id } }, { new: true })   // Delete liker from the recipe

    res.status(200).send({ user: newUser })

  } catch(e) {
    next(e)
  }
})

router.get('/:id/likes', async (req, res, next) => {
  try {
    const likesWithUsers = await Recipe.findById(req.params.id).populate('likers')
    res.status(200).json(likesWithUsers)
  } catch(e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    // This is an example of nested population
    // const recipe = await Recipe.findById(req.params.id).populate('user').populate({path: 'comments', populate:('user') })
    const recipe = await Recipe.findById(req.params.id).populate('user').populate('comments')
    if (!recipe) {
      return res.status(404).json({ error: 'Not found' } )
    } else {
      return res.status(200).json(recipe)
    }
  } catch(e) {
    next(e)
  }
})

router.put('/:id', middleware.userExtractor, async (req, res, next) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user').populate('comments')
    return res.status(200).json(updatedRecipe)


  } catch(e) {
    next(e)
  }
})

router.delete('/:id', middleware.userExtractor, async (req, res, next) => {
  try {
    const userInDb = await User.findById(req.user.id)
    const recipeInDb = await Recipe.findById(req.params.id)

    const allowDelete = userInDb && recipeInDb
      ? recipeInDb.user.toString() === userInDb.id.toString()
      : false

    if (allowDelete) {
      // Delete recipe
      await Recipe.findByIdAndDelete(recipeInDb.id)

      // Delete user reference
      const newUser = await User.findByIdAndUpdate(userInDb.id,
        { '$pull': { 'recipes': recipeInDb.id } }, { new: true })

      res.status(202).json({ user: newUser } )

    } else {
      res.status(401).send('delete not allowed')
    }

  } catch(e) {
    next(e)
  }
})


router.get('/', async (req, res, next) => {
  try {
    const recipe = await Recipe.find().populate('user').populate('comments')
    return res.status(200).json(recipe)
  } catch(e) {
    return next(e)
  }
})

router.post('/', middleware.userExtractor, async (req, res, next) => {
  const user = req.user
  try {
    const userInDb = await User.findById(user.id)

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
        timeEstimate: req.body.timeEstimate,
        servings: req.body.servings
      })

      const savedRecipe = await recipe.save()
      userInDb.recipes = userInDb.recipes.concat(savedRecipe.id)

      await userInDb.save()

      // https://stackoverflow.com/questions/13525480/mongoose-populate-after-save#:~:text=was%20to%20use-,execPopulate,-%2C%20like%20so
      // User and comments could probably be populated by chaining a callback function. TODO: Look into this
      const recipeInDb = await Recipe.findById(savedRecipe.id).populate('user').populate('comments')

      res.status(200).json(recipeInDb)
    }
  } catch(e) {
    return next(e)
  }
})

router.post('/:id/comments', middleware.userExtractor, async (req, res, next) => {
  try {
    const recipeInDb = await Recipe.findById(req.params.id)

    const comment = new Comment({
      user: req.user.id,
      username: req.user.username,
      recipe: recipeInDb.id,
      comment: req.body.comment
    })
    const savedComment = await comment.save()
    recipeInDb.comments = recipeInDb.comments.concat(savedComment.id)
    await recipeInDb.save()
    const updatedRecipe = await Recipe.findById(recipeInDb.id).populate('user').populate('comments')
    res.status(202).json({ recipe: updatedRecipe })
  } catch(e) {
    next(e)
  }
})

router.delete('/:id/comments', middleware.userExtractor, async (req, res, next) => {
  try {
    const commentInDb = await Comment.findById(req.params.id).populate('recipe')

    // Delete comment
    await Comment.findByIdAndDelete(req.params.id)

    // Delete comment reference from recipe
    const newRecipe = await Recipe.findByIdAndUpdate(commentInDb.recipe.id,
      { '$pull': { 'comments': req.params.id } }).populate('user').populate('comments')

    res.status(202).json({ recipe: newRecipe })
  } catch(e) {
    next(e)
  }
})


module.exports = router