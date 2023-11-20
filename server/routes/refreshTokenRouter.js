const Router = require('express');
const router = new Router;
const RefreshTokenController = require('../controllers/refreshTokenController');

router.get('/',RefreshTokenController.handleRefreshToken);

module.exports = router;