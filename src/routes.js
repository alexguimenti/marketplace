const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post(
  '/user',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.get('/users', handle(controllers.UserController.index))
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

// todas rotas daqui pra baixo precisa estar logado
routes.use(authMiddleware)

/**
 * Ads
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put('/ads/:id', handle(controllers.AdController.update))
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchases
 */
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)
routes.get('/purchases', handle(controllers.PurchaseController.index))

routes.get(
  '/pending_purchases',
  handle(controllers.PendingPurchaseController.index)
)
routes.get('/purchases/:id', handle(controllers.PurchaseController.show))
routes.put(
  '/purchases/:id',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.update)
)

module.exports = routes
