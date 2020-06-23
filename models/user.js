var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//连接数据库
mongoose.connect('mongodb://localhost/itcast', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

var userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	nickname: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	created_time: {
		type: Date,
		//注意：这里不要写 Date.now() 因为会立即调用，等于写死了
		// 没有传值时 mongoose 会自动调用 default 属性的方法
		default: Date.now,
	},
	last_modified_time: {
		type: Date,
		default: Date.now,
	},
	avatar: {
		type: String,
		default: '/public/img/avatar-max-img.png',
	},
	bio: {
		type: String,
		default: '',
	},
	gender: {
		type: Number,
		enum: [-1, 0, 1],
		default: -1,
	},
	birthday: {
		type: Date,
		default: new Date(2020, 00, 01),
	},
	status: {
		type: Number,
		//0 用户没有限制
		//1 用户不可以评论
		//2 用户不可以登录
		enum: [0, 1, 2],
		default: 0,
	},
});

module.exports = mongoose.model('User', userSchema);
