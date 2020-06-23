var express = require('express');
var path = require('path');
var router = require('./router');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use(
	'/node_modules/',
	express.static(path.join(__dirname, './node_modules/'))
);

//配置后可以使用 render 方法
//第三方的模板引擎  art-template, ejs, jade(pug), handlebars
app.engine('html', require('express-art-template'));

// 可以通过 req.body 来获取表单 POST 请求体的数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//在express 框架中，默认不支持 session 和 cookie ，可以使用第三方中间件：express-session
app.use(
	session({
		// 配置加密字符串，它会在原有的加密基础之上和这个字符串拼接去加密
		//目的是为了增加安全性，防止客户端恶意伪造
		secret: 'itcast',
		resave: false,
		saveUninitialized: true, //无论你是否使用 session 服务器默认分配一把钥匙
	})
);

//挂载路由
app.use(router);

// 配置一个处理 404 的中间件
app.use(function (req, res) {
	res.render('404.html');
});

// 配置一个全局错误处理中间件,四个参数一个都不能少
app.use(function (err, req, res, next) {
	res.status(500).json({
		err_code: 500,
		message: err.message,
	});
});

app.listen(3000, function () {
	console.log('server is running...');
});
