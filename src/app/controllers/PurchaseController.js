const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { adId, content } = req.body

    const purchaseAd = await Ad.findById(adId).populate('author')
    const user = await User.findById(req.userId)

    Queue.create(PurchseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    // console.log(`Ad: ${ad}`)
    console.log(`Purchase Ad: ${purchaseAd.title}`)
    // console.log(`Content: ${content}`)
    // console.log(`User: ${user}`)
    // console.log(`ReqBody: ${req.body}`)

    // const purchase = await Purchase.create({ ...req.body, buyer: req.userId })
    const purchase = await Purchase.create({
      ...req.body,
      buyerId: req.userId,
      buyerEmail: user.email,
      title: purchaseAd.title,
      price: purchaseAd.price
    })

    return [res.send(), res.json(purchase)]
  }
}

module.exports = new PurchaseController()
