var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Name = mongoose.model('Name');

module.exports.init = function(req,res){
	passport.use(new LocalStrategy({
        usernameField:'name',
        passwordField:'pass'
	},function(name, pass, done) {
        console.log('password.local.find:',name);
	    Name.findOne({ name: name }, function (err, user) {
	    console.log('sdfdfsdfsdf',req);
        console.log('password.local.find:',user,err);
	      if (err) {
	      	return done(err);
	      }
	      if (!user) {
	      	return done(null, false, {message: 'fsfsfsdffdsfdf' });
	      }
	      if (!user.verifyPassword(pass)) {
			 console.log(5555);
	      	return done(null, false);
	      }
	      return done(null, user);
	    });
	  }
	));

	passport.serializeUser(function(user, done) {
      console.log('password.local.serializeUser:',user);
	  done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
        console.log('password.local.deserializeUser:',id);

	    Name.findById(id, function (err, user) {
	      done(err, user);
	    });
	});
}
