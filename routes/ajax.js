var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var postReact = mongoose.model('Rpost');
/* GET home page. */
var totlePage = 0;

function count(req,res,next) {
   postReact.find({}).exec(function (err,posts) {
       if(err){
           console.log(err);
       } else {
           totlePage = posts.length;
           next();
       }
   })
}


router.get('/', count,function(req, res, next) {
    let obj = {}
    if(req.user){
        obj.author = req.user.name;
    };
    postReact.find(obj).limit(5).skip(0).exec(function (err, posts) {
         if(err){
             console.log(err);
         } else {
             postReact.count({},function (err,count) {
                 if(err){
                     console.log(err);
                 } else {
                     res.send({posts:posts,user:req.user,totle:totlePage})
                 }
             });
         }
     });
});

router.get('/delete/:id', function(req, res, next) {
	const id = req.params.id;
	postReact.findByIdAndRemove(id,function (err,post) {
	    if(err) {
            console.log(err);
        } else {
            console.log(post);
            res.send("删除成功")
        }
	})
});

router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	postReact.findById(id,function (err,post) {
	    if(err) {
            console.log(err);
        } else {
            res.send(post)
        }
	})
});

router.get('/cate/:cate', function(req, res, next) {
	const cate = req.params.cate;
    let obj = {cate}
    if(req.user){
        obj.author = req.user.name;
    }
	postReact.find(obj,function (err,posts) {
	    if(err) {
            console.log(err);
        } else {
            res.send({posts:posts,user:req.user,totle:totlePage})
        }
	})
});

router.get('/page/:page', function(req, res, next) {
	const page = req.params.page;
    let obj = {};
    if(req.user){
        obj.author = req.user.name;
    };
    const pageSkip = (page-1)*5 ;
    console.log(pageSkip);
	postReact.find(obj).limit(5).skip(pageSkip).exec(function(err,posts) {
	    if(err) {
            console.log(err);
        } else {
            res.send({posts:posts,user:req.user,totle:totlePage})
        }
	})
});



module.exports = router;
