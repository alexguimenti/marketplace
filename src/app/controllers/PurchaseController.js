const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async index (req, res) {
    const purchases = await Purchase.find()

    return res.json(purchases)
  }

  async store (req, res) {
    const { adId, content } = req.body

    const purchaseAd = await Ad.findById(adId).populate('author')
    const user = await User.findById(req.userId)

    Queue.create(PurchseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    const purchase = await Purchase.create({
      ...req.body,
      title: purchaseAd.title,
      buyerId: req.userId,
      buyerEmail: user.email,
      price: purchaseAd.price
    })

    return res.json(purchase)
  }

  async show (req, res) {
    const purchase = await Purchase.findById(req.params.id)

    return res.json(purchase)
  }

  async update (req, res) {
    const pendingPurchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true // depois de dar update vai atualizar com novas infos
      }
    )

    return res.json(pendingPurchase)
  }
}

module.exports = new PurchaseController()
