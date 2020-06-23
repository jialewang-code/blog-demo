var express = require('express');
var User = require('./models/user');
var md5 = require('blueimp-md5');

var router = express.Router();

router.get('/', function (req, res) {
	// console.log(req.session.user);
	res.render('index.html', {
		user: req.session.user,
	});
});

router.get('/register', function (req, res) {
	res.render('register.html');
});

router.post('/register', function (req, res) {
	//1.获取表单提交的数据 req.body
	//2.操作数据库
	//   判断用户是否存在
	//   已存在，不允许注册
	//   不存在，创建新用户
	//3.发送响应
	// console.log(req.body);
	var body = req.body;
	User.findOne(
		{
			$or: [
				{
					email: body.email,
				},
				{
					nickname: body.nickname,
				},
			],
		},
		function (err, data, next) {
			if (err) {
				// return res.status(500).json({
				// 	success: false,
				// 	message: 'Server Error.',
				// });
				return next(err);
			}
			if (data) {
				return res.status(200).json({
					success: true,
					//前后端自定义状态码 err_code
					err_code: 1,
					message: 'Email or nickname already exists.',
				});
			}
			//对密码进行 md5 重复加密
			body.password = md5(md5(body.password));
			new User(body).save(function (err, user, next) {
				if (err) {
					// return res.status(500).json({
					// 	success: false,
					// 	err_code: 500,
					// 	message: 'Server Error.',
					// });
					return next(err);
				}
				// 注册成功，使用 session 记录用户登陆状态
				// 注意：默认 session 数据是内存存储的，服务器一旦重启数据就会丢失，生产环境中会把 session进行持久化存储
				req.session.user = user;
				// express 提供了一响应方法：json
				// json 方法接收一个对象为参数，它会自动把对象转为JSON字符串，再发送给浏览器
				res.status(200).json({
					success: true,
					err_code: 0,
					message: 'OK',
				});

				//服务端重定向针对的同步请求，异步请求无效
				// res.redirect('/')
			});
		}
	);
});

router.get('/login', function (req, res) {
	res.render('login.html');
});

router.post('/login', function (req, res) {
	//1.获取表单数据
	//2.查询数据库用户名和密码是否正确
	//3.发送响应数据
	body = req.body;
	User.findOne(
		{
			email: body.email,
			password: md5(md5(body.password)),
		},
		function (err, user, next) {
			if (err) {
				// return res.status(500).json({
				// 	err_code: 500,
				// 	message: err.message,
				// });
				return next(err);
			}

			if (!user) {
				return res.status(200).json({
					err_code: 1,
					message: 'Email or password if invalid.',
				});
			}
			//用户存在，登陆成功，通过 session 记录登陆状态
			req.session.user = user;
			res.status(200).json({
				err_code: 0,
				message: 'OK',
			});
		}
	);
});

router.get('/logout', function (req, res) {
	//清除登陆状态
	req.session.user = null;
	//重定向到登录页面
	res.redirect('/login');
});

module.exports = router;
