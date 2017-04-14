var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var postReact = mongoose.model('Rpost');
/* GET home page. */

router.get('/', function(req, res, next) {
    //console.log(55555);
    res.render('list');
});

module.exports = router;
