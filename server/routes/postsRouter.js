const Router = require('express');
const router = new Router;
const PostsController = require('../controllers/postsController');

router.post('/', PostsController.addPost);
router.get('/', PostsController.getAllPosts);
router.get('/myposts', PostsController.getMyPosts);
router.delete('/',PostsController.deletePost);

module.exports = router;
