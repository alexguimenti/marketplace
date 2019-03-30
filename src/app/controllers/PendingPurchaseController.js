const Purchase = require('../models/Purchase')

class PendingPurchaseController {
  async index (req, res) {
    const pendingPurchases = await Purchase.find({ status: 'pending' })

    return res.json(pendingPurchases)
  }
}

module.exports = new PendingPurchaseController()
