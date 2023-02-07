var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.post('/', function (req, res) {
  let type = req.body.type;

  if (type == "trail") {
    console.log(req.body.startx);
    console.log(req.body.starty);
    console.log(req.body.endx);
    console.log(req.body.endy);
  }
  
});

module.exports = router;
