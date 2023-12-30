var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({});
});

/* GET home page. */
router.post('/mode', function(req, res, next) {
  res.json({})
});

module.exports = router;