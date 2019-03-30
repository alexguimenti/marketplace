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

    console.log(user)

    const purchase = await Purchase.create({
      ...req.body,
      title: purchaseAd.title,
      buyerId: req.userId,
      buyerEmail: user.email,
      price: purchaseAd.price
    })

    return res.json(purchase)
    // return [res.send(), ]
  }
}

module.exports = new PurchaseController()
