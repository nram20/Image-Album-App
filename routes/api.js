var express = require('express');
var router = express.Router();

router.use('/properties', require('./properties'));

router.use('/clients', require('./clients'));

module.exports = router;
