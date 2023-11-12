const Router = require('express');
const router = new Router;

const userRouter = require('./userRouter');
const personsRouter = require('./personsRouter');
const postsRouter = require('./postsRouter');
const messagesRouter = require('./messagesRouter');
const chatsRouter = require('./chatsRouter');

router.use('/user',userRouter)
router.use('/persons',personsRouter)
router.use('/posts',postsRouter)
router.use('/messages',messagesRouter)
router.use('/chats',chatsRouter)

module.exports = router;