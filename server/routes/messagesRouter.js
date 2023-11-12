const Router = require('express');
const messagesController = require('../controllers/messagesController');
const router = new Router;

router.post('/', messagesController.addMessage);
router.get('/', messagesController.getMessagesInChat);

module.exports = router;