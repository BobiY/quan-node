
const mongoose = require('mongoose');
Schema = mongoose.Schema;

//文章
var RpostSchema = new Schema({
    title: String,
	author: String,
    cate:String,
	date:Date,
	img: String,
	content:String
})

mongoose.model('Rpost',RpostSchema);


//分类
var CategorySchma = new Schema({
	name:String
})

mongoose.model('CategoryReact',CategorySchma);

var NameSchma = new Schema({
	name:String,
    pass:String
})

NameSchma.methods.verifyPassword = function (pass) {
	var isMacth = pass === this.pass;
	console.log('password.local.verifyPassword:', pass , this.pass , isMacth);
	return isMacth;
}

mongoose.model('Name',NameSchma);
