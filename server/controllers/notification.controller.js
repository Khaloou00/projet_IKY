import Notification from '../models/Notification.js'

export async function getMyNotifications(req, res, next) {
  try {
    const { page = 1, limit = 20, unreadOnly } = req.query
    const pageNum = Math.max(1, parseInt(page))
    const query = { recipient: req.user._id }
    if (unreadOnly === 'true') query.isRead = false

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * parseInt(limit))
        .limit(parseInt(limit)),
      Notification.countDocuments(query),
      Notification.countDocuments({ recipient: req.user._id, isRead: false }),
    ])

    res.json({ data: notifications, total, page: pageNum, unreadCount })
  } catch (err) {
    next(err)
  }
}

export async function markAsRead(req, res, next) {
  try {
    const notif = await Notification.findOne({ _id: req.params.id, recipient: req.user._id })
    if (!notif) return res.status(404).json({ message: 'Notification not found' })
    notif.isRead = true
    await notif.save()
    res.json({ data: notif })
  } catch (err) {
    next(err)
  }
}

export async function markAllAsRead(req, res, next) {
  try {
    await Notification.updateMany({ recipient: req.user._id, isRead: false }, { isRead: true })
    res.json({ message: 'All notifications marked as read' })
  } catch (err) {
    next(err)
  }
}

export async function deleteNotification(req, res, next) {
  try {
    const notif = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id,
    })
    if (!notif) return res.status(404).json({ message: 'Notification not found' })
    res.json({ message: 'Notification deleted' })
  } catch (err) {
    next(err)
  }
}

export async function sendBroadcast(req, res, next) {
  try {
    const { title, body, type = 'PROMO', recipientIds } = req.body
    const recipients = recipientIds ?? (await import('../models/User.js')).default
      .find({}, '_id')
      .then((users) => users.map((u) => u._id))

    const ids = await recipients
    const notifications = ids.map((id) => ({ recipient: id, title, body, type }))
    await Notification.insertMany(notifications)
    res.json({ message: `Broadcast sent to ${ids.length} users` })
  } catch (err) {
    next(err)
  }
}
