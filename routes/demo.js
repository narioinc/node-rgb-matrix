var express = require('express');
var router = express.Router();
var demoController = require('../controllers/demo')


router.get('/:demoId', function (req, res, next) {
    //clearInterval(intervalId);
    var rgbmatrix = req.app.get('matrix');
    var stage = req.app.get("stage")
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
            demoController.d2(rgbmatrix, stage);
            break;
        case '3':
            console.log("demo 3 requested")
            demoController.d3(rgbmatrix, stage);
            break;
        case '4':
            console.log("demo 4 requested")
            demoController.d4(rgbmatrix, stage);
            break;
        case '5':
            console.log("demo 5 requested")
            demoController.d5(rgbmatrix, stage);
            break;
        case '6':
            console.log("demo 6 requested")
            demoController.d6(rgbmatrix, stage);
            break;

    }

    res.json({ "status": "Demo running" });
});

module.exports = router;