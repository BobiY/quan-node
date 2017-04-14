var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var Name = mongoose.model('Name');
/* GET users listing. */

router.post('/login',passport.authenticate('local', { successRedirect: '/',failureRedirect: '/users/login' }) );


router.get('/login',function (req,res,next) {
    //console.log(555555); //如果登录失败，继续登陆，直到放弃
    res.render('user');
})

router.post('/regirest', function(req, res, next) {
    var name = req.body.name;
    var pass = req.body.pass;

    if(name && pass){
        Name.findOne({name:name}).exec(function (err,user) {
            if(err) {
                console.log(`this is err:${err}`);
            } else {
                console.log(`this is err:${user}`);
                if( user ) {
                    res.send({success:false,msg:"用户名已存在"})
                } else {
                    const user = new Name ({
                        name,pass
                    });
                    user.save(function (err,user) {
                        if( err ) {
                            console.log(`this is err:${err}`);
                        } else {
                            console.log( `this user save success:${user}` );
                            res.send({success:true,msg:"注册成功请登录"});
                        }
                    })
                }
            }
        })
    } else {
        res.send({success:false,msg:"提交的字段不能为空"});
    }
});

router.get('/logout', function (req, res, next) {
   req.logout();
   res.redirect("/");
});


// router.get('/login', function(req, res, next) {
//     res.render('user');
// });

module.exports = router;
