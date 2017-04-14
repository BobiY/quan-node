var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var postReact = mongoose.model('Rpost');
/* GET home page. */

 var requireLogin = function(req, res, next){
	if(req.user){
		next();
	} else{
		res.redirect('/admin/users/login');
	}
}

router.get('/post/add',requireLogin,function (req,res,next) {
	res.render('addPost');
})

router.post('/post/add', function(req, res, next) {
	var postName = req.body.postName;
	var cateName = req.body.cateName;
    var content = req.body.content;
    const update = req.body.update;
    let name = '';
    if(req.user){
        name = req.user.name;
    } else {
        name = '小白';
    }
    //后端验证提交的文章数据是否符合要求
    //console.log(postName,cateName,content);
    if( !postName || !cateName || !content ){
        res.send({success:false,msg:'提交失败，因为提交的字段不能为空'});
    } else {
        if( update !== '' ) {
            postReact.update({_id:update}, {$set:{title:postName,cate:cateName,date:new Date(),content:content}} ,function (err,post) {
                if(err){
                    console.log(err);
                    res.send({success:false,msg:"保存失败"})
                } else {
                    console.log(post);
                    res.send({success:true,msg:""});
                }
            });
        } else {
            var post = new postReact({
        	    title: postName,
        		author: name,
                cate:cateName,
        		date: new Date(),
        		content:content
        	});
        	post.save(function (err,post) {
        	    if(err) {
        	        console.log(err);
        	    } else {
        	        console.log(post);
        			res.send({success:true,msg:"保存成功"})
        	    }
        	})
        }
    }

});

router.get('/post/edit/:id',function (req,res,next) {
	const id = req.params.id;
    postReact.findOne({_id:id}).exec(function(err,post) {
        if(err) {
            console.log(err);
        } else {
            console.log(post);
            res.send(post);
        }
    })
})

module.exports = router;
