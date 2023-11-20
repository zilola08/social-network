const Router = require('express');
const router = new Router;
const refreshTokenController = require('../controllers/refreshTokenController');

router.get('/',refreshTokenController.handleRefreshToken);

module.exports = router;