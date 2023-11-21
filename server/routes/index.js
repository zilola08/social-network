const Router = require('express');
const router = new Router;

const userRouter = require('./userRouter');
const personsRouter = require('./personsRouter');
const postsRouter = require('./postsRouter');
const messagesRouter = require('./messagesRouter');
const chatsRouter = require('./chatsRouter');
const refreshTokenRouter = require('./refreshTokenRouter');
const verifyJWT = require('../middleware/jwtVerifyMiddleware');

//this works like a waterfall, in this specific order
router.use('/user',userRouter);
router.use('/refreshToken',refreshTokenRouter);
router.use(verifyJWT);
router.use('/persons',personsRouter);
router.use('/posts',postsRouter);
router.use('/messages',messagesRouter);
router.use('/chats',chatsRouter);

module.exports = router;