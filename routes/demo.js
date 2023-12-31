var express = require('express');
var router = express.Router();
var demoController = require('../controllers/demo')


router.get('/:demoId', function (req, res, next) {
    //clearInterval(intervalId);
    var rgbmatrix = req.app.get('matrix');
    var canvas = req.app.get('canvas')
    console.log("running demo")
    switch (req.params.demoId) {
        case '0':
            console.log("demo 0 requested")
            demoController.d0(rgbmatrix);
            break;
        case '1':
            console.log("demo 1 requested")
            demoController.d1(rgbmatrix);
            break;
        case '2':
            console.log("demo 2 requested")
            demoController.d2(rgbmatrix, canvas);
            break;
        case '3':
            console.log("demo 3 requested")
            demoController.d3(rgbmatrix, canvas);
            break;
        case '4':
            console.log("demo 4 requested")
            demoController.d4(rgbmatrix, canvas);
            break;
        case '5':
                console.log("demo 5 requested")
                demoController.d5(rgbmatrix, canvas);
                break;    
    }

    res.json({ "status": "Demo running" });
});

module.exports = router;