const Router = require('express');
const router = new Router;
const chatsController = require('../controllers/chatsController');

router.post('/', chatsController.addChat);
router.get('/', chatsController.getMyChats);
router.delete('/',chatsController.deleteChat);

module.exports = router;