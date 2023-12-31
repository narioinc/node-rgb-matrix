var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({});
});

/* GET home page. */
router.post('/mode', function(req, res, next) {
  var rgbmatrix = req.app.get('matrix');
  res.json({"status": "mode set"})
});

router.post('/settings', function(req, res, next) {
  var rgbmatrix = req.app.get('matrix');
  reqBody = req.body;
  console.log(reqBody); 
  if(reqBody.brightness){
    rgbmatrix.brightness(reqBody.brightness).sync()
  }
  res.json({"status": "mode set"})
});

module.exports = router;