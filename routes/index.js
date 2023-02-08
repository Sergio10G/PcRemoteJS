var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.post('/com', function (req, res) {
  if(req.body.constructor === Object &&
  Object.keys(req.body).length === 0) {
    console.log('Request body is empty.');
    res.status(400);
    res.send('Incorrect request');
    return;
}
  let type = req.body.type;

  if (type == "trail") {
	  let dataStr = req.body.data;
	  dataStr = dataStr.replace("[", "");
	  dataStr = dataStr.replace("]", "");
	  dataStr = dataStr.replace(new RegExp("},{", "g"), "}-{");
	  let data = dataStr.split('-');
	  let items = data.map(i => JSON.parse(i));
	  console.log(items);
  }
  res.status(200);
  res.send('Movement registered!');
});

module.exports = router;
