const express = require('express')
const validate = require('express-validation')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post(
  '/user',
  validate(validators.User),
  controllers.UserController.store
)
routes.post(
  '/sessions',
  validate(validators.Session),
  controllers.SessionController.store
)

// todas rotas daqui pra baixo precisa estar logado
routes.use(authMiddleware)

/**
 * Ads
 */
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', validate(validators.Ad), controllers.AdController.store)
routes.put('/ads/:id', validate(validators.Ad), controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

/**
 * Purchases
 */
routes.post('/purchases', controllers.PurchaseController.store)

module.exports = routes
