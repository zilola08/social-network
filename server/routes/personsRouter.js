const Router = require('express');
const router = new Router;
const personController = require('../controllers/personController');

router.get('/', personController.getAllPersons);

module.exports = router;