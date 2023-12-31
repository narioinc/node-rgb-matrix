var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({});
});

/* GET home page. */
router.post('/mode', function(req, res, next) {
  var rgbmatrix = req.app.get('matrix');
  //console.log(rgbmatrix)
  res.json({"status": "mode set"})
});

module.exports = router;