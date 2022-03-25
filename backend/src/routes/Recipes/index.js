const express = require('express')
const router = express.Router()
const middleware = require('../../utils/middleware')
const logger = require('../../utils/logger')
const Recipe = require('../../models/recipe')
const User = require('../../models/user')

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

      res.status(200).json(req.body)
    }




  } catch(e) {
    return next(e)
  }


})

module.exports = router