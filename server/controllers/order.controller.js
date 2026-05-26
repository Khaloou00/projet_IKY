import Order from '../models/Order.js'
import Product from '../models/Product.js'
import Notification from '../models/Notification.js'
import { sendPush } from '../services/push.service.js'
import User from '../models/User.js'

export async function createOrder(req, res, next) {
  try {
    const { items, deliveryAddress, deliveryFee } = req.body

    let totalAmount = 0
    const resolvedItems = []

    for (const item of items) {
      const product = await Product.findById(item.product)
      if (!product || !product.isActive)
        return res.status(400).json({ message: `Product ${item.product} unavailable` })
      if (product.stock < item.quantity)
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` })

      product.stock -= item.quantity
      await product.save()

      resolvedItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0] ?? '',
      })
      totalAmount += product.price * item.quantity
    }

    const order = await Order.create({
      customer: req.user._id,
      items: resolvedItems,
      totalAmount,
      deliveryAddress,
      deliveryFee: deliveryFee ?? 1500,
    })

    await Notification.create({
      recipient: req.user._id,
      title: 'Order placed',
      body: `Your order #${order._id} has been placed successfully.`,
      type: 'ORDER_PLACED',
      data: { orderId: order._id },
    })

    res.status(201).json({ data: order })
  } catch (err) {
    next(err)
  }
}

export async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name images')
    res.json({ data: orders })
  } catch (err) {
    next(err)
  }
}

export async function getOrderById(req, res, next) {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'fullName email phone')
      .populate('items.product', 'name images')
      .populate('deliveryAgent', 'fullName phone')

    if (!order) return res.status(404).json({ message: 'Order not found' })

    const isOwner = order.customer._id.toString() === req.user._id.toString()
    const isPrivileged = ['admin', 'delivery'].includes(req.user.role)
    if (!isOwner && !isPrivileged) return res.status(403).json({ message: 'Forbidden' })

    res.json({ data: order })
  } catch (err) {
    next(err)
  }
}

export async function getAllOrders(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const pageNum = Math.max(1, parseInt(page))
    const query = {}
    if (status) query.status = status

    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .populate('customer', 'fullName email')
        .populate('deliveryAgent', 'fullName'),
      Order.countDocuments(query),
    ])

    res.json({ data: orders, total, page: pageNum })
  } catch (err) {
    next(err)
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const { status, deliveryAgent } = req.body
    const order = await Order.findById(req.params.id).populate('customer', 'fullName fcmTokens')
    if (!order) return res.status(404).json({ message: 'Order not found' })

    order.status = status
    if (deliveryAgent) order.deliveryAgent = deliveryAgent
    if (status === 'delivered') order.paymentStatus = 'paid'
    await order.save()

    const notifType = status === 'delivered' ? 'ORDER_DELIVERED' : 'ORDER_STATUS_CHANGED'
    const notif = await Notification.create({
      recipient: order.customer._id,
      title: 'Order update',
      body: `Your order status changed to ${status}.`,
      type: notifType,
      data: { orderId: order._id, status },
    })

    const tokens = order.customer.fcmTokens ?? []
    if (tokens.length) {
      await sendPush({
        tokens,
        title: notif.title,
        body: notif.body,
        data: { orderId: String(order._id) },
      }).catch(() => {})
    }

    res.json({ data: order })
  } catch (err) {
    next(err)
  }
}

export async function assignDelivery(req, res, next) {
  try {
    const { agentId } = req.body
    const agent = await User.findOne({ _id: agentId, role: 'delivery' })
    if (!agent) return res.status(400).json({ message: 'Invalid delivery agent' })

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { deliveryAgent: agentId },
      { new: true }
    )
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json({ data: order })
  } catch (err) {
    next(err)
  }
}
