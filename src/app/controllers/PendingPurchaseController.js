const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PendingPurchaseController {
  async index (req, res) {
    const pendingPurchases = await Purchase.find({ status: 'pending' })

    return res.json(pendingPurchases)
  }
}

module.exports = new PendingPurchaseController()
