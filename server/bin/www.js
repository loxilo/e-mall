//加载依赖
const koa = require('Koa');
const router = require('../routers/index');
const db = require('./db');
const bodyParser = require('koa-bodyparser');
const cookie =require('koa-cookie');


//创建应用程序
const app = new koa();

//全局拦截
const intercept=async (ctx,next)=>{
	//未登录用户禁止访问一下信息
	if((ctx.path=='/users/addAddress'||ctx.path=='/users/initAddress'||
		ctx.path=='/users/editGoods'||ctx.path=='/goods/addCart'||
		ctx.path=='/users/cartList'||ctx.path=='/users/logout')
		&&!ctx.cookies.get("userId")){
		return ctx.body={
			status:'1',
			message:'请先登陆！',
			data:null
		}
	}
	await next();
}

app.use(intercept);

//使用body-parser解析post请求
app.use(bodyParser());
//使用cookie
// app.use(cookie());


// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());


//监听端口，启动服务器
app.listen({
	host:'localhost',
	port:3000
},err=>{
	if(err){
		console.log("err:",err.message);
	}else{
		console.log('the server is listning at port 3000...');}
});