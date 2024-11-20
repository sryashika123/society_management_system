const express = require('express');

const router = express.Router();

const NotificationController = require('../controllers/NotificationController');


router.post('/createNotification', NotificationController.createNotification);

router.get('/getNotifications', NotificationController.getNotifications);

router.patch('/markAsRead/:id/read', NotificationController.markAsRead);

router.delete('/deleteNotification/:id', NotificationController.deleteNotification);

router.delete('/deleteAllNotifications', NotificationController.deleteAllNotifications);



router.patch('/acceptNotification/:id', NotificationController.acceptNotification);

router.patch('/declineNotification/:id', NotificationController.declineNotification);



module.exports = router;