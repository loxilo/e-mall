//加载依赖
const Router = require('koa-router');

//导入子路由
const goodPage = require('../routers/goods.js');
const userPage = require('../routers/users.js');

// 创建路由并装载所有子路由
const router = new Router();
router.use('/goods', goodPage.routes(), goodPage.allowedMethods());
router.use('/users', userPage.routes(), userPage.allowedMethods());


//导出路由
module.exports=router;