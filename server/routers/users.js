//导入依赖
const Router = require('koa-router');
const User = require('../models/user_model');



//登陆
const router = new Router();

router.post('/login',async ctx=>{
	console.log('访问/login');
	const param={
		userName:ctx.request.body.username,
		userPwd:ctx.request.body.password
	};
	await User.findOne(param)
	.then(userDoc=>{
		if(userDoc){
			//设置cookies
			ctx.cookies.set("userId",userDoc.userId,{
				domain:'localhost',
				path:'/',
				maxAge:2*60*1000,
				expires:new Date('2019-6-8'),
				httpOnly:false,
				overwrite:false
			})
			.set("userName",userDoc.userName,{
				domain:'localhost',
				path:'/',
				maxAge:2*60*1000,
				expires:new Date('2019-6-8'),
				httpOnly:false,
				overwrite:false
			});
			return ctx.body={
				status:'0',
				message:'登陆成功',
				data:{
					username:userDoc.userName
				}
			}
		}
		return ctx.body={
			status:'1',
			message:'该用户未被注册',
			data:null
		}
	})
	.catch(err=>{
		console.log(err.message);
	});
});

//退出登陆
router.post('/logout',async ctx=>{
	console.log('访问/logout');
	//设置cookies为空
	ctx.cookies.set("userId",'',{
		domain:'localhost',
		path:'/',
		maxAge:0,
		expires:new Date('2018-6-8'),
		httpOnly:false,
		overwrite:false
	});
	return ctx.body={
		status:'0',
		message:'退出登陆成功',
		data:null
	}
});

//检查是否已登陆
router.get('/checklogin',async ctx=>{
	console.log('访问/checklogin');
	if(ctx.cookies.get('userId')){
		return ctx.body={
			status:'0',
			message:'你已登陆',
			data:{
				username:ctx.cookies.get('userName')
			}
		}
	}
	return ctx.body={
		status:'1',
		message:'你还未登陆',
		data:null
	}
});

//注册
router.post('/register',async ctx=>{
	console.log('访问/register');
	const param={
		userName:ctx.request.body.username,
		userPwd:ctx.request.body.password
	};
	await User.findOne({userName:param.userName})
	.then(async userDoc=>{
		if(userDoc){
			console.log('已经注册');
			return ctx.body={
				status:'1',
				message:'该用户已被注册',
				data:null
			}
		}
		//查询已经注册用户数量
		let count = num = await User.find().count();
		let digit = 0;
		while(count>=1){
			digit++;
			count=count/10;
		}
		
		//按序生成唯一的ID给用户
		let userId=new Array(10-digit).fill(0).join('')+(num+1);
		//更新数据库

// 		new User({
// 			userId,
// 			userName:param.userName,
// 			userPwd:param.userPwd,
// 			orderList:[],
// 			cartList:[],
// 			addressList:[]
// 		})
// 		.save()
// 		.then(userDoc=>{
// 			console.log('更新成功！');
// 		})
// 		.catch(err=>{
// 			console.log(err.message);
// 		});
      User.update({userId},new User({
        userId,
        userName:param.userName,
        userPwd:param.userPwd,
        orderList:[],
        cartList:[],
        addressList:[]
      }),{upsert:true})
      .then(userDoc=>{
        console.log('插入成功');
      })
      .catch(err=>{
        console.log(err.message);
      });
		//返回注册数据
		return ctx.body={
			status:'0',
			message:'注册成功',
			data:{
				username:param.userName,
				userPwd:param.userPwd,
			}
		}
	})
	.catch(err=>{
		console.log(err.message);
	});
});

//获取用户购物车列表
router.get('/cartList',async ctx=>{
	console.log('访问/cartList');
	const param={
		//userName:ctx.query.username,
		//userPwd:ctx.query.password,
		userId:ctx.cookies.get("userId")
	}
	// if(!param.userName)return ctx.body={
	// 	status:'1',
	// 	message:'',
	// 	data:null
	// }
	/////
	await User.findOne(param)
	.then(userDoc=>{
		return ctx.body={
			status:'0',
			message:'获取购物车列表成功',
			data:userDoc.cartList,
		}
	})
	.catch(err=>{
		console.log(err.message);
	});

})


//增加/减少/删除购物车里某条商品数量
router.get('/editGoods',async ctx=>{
	console.log('访问/editGoods');
	const param={
		//userName:ctx.query.username,
		//userPwd:ctx.query.password,
		userId:ctx.cookies.get("userId")
	}
	const index = ctx.query.index;
	const editItem = ctx.query.editItem;
	const isAllSelect = ctx.query.isAllSelect;
	// if(!param.userName)return ctx.body={
	// 	status:'1',
	// 	message:'',
	// 	data:null
	// }
	/////
	await User.findOne(param)
	.then(userDoc=>{
		//删除相应数据
		if(editItem=='inc'){
			userDoc.cartList[index].productNum++;
			console.log('数量增加1');
		}
		//增加相应数据
		if(editItem=='dec'&&userDoc.cartList[index].productNum>1){
			userDoc.cartList[index].productNum--;
			console.log('数量减少1');
		}
		//删除整条商品数据
		if(editItem=='del'){
			userDoc.cartList.splice(index,1);
			console.log('删除整条商品数据');
		}
		//选择或取消选择
		if(editItem=='radio'){
			userDoc.cartList[index].checked=!userDoc.cartList[index].checked;
		}
		//全选
		if(editItem=='allChecked'){
			userDoc.cartList.map((val,i,arr)=>{
				arr[i].checked=isAllSelect;
			});
		}
		//更新数据库
		userDoc.save()
		.then(userDoc=>{
			console.log('数据库数据更新成功');
		})
		.catch(err=>{
			console.log(err.message);
		});
		//返回数据
		return ctx.body={
			status:'0',
			message:'购物车列表更新成功',
			data:userDoc.cartList,
		}
	})
	.catch(err=>{
		console.log(err.message);
	});
})

//获取/增加地址列表
router.get('/initAddress',async ctx=>{
	console.log('访问/initAddress');
	// const param={	
	// 	userName:ctx.query.username,
	// 	userPwd:ctx.query.password,
	// }
	const param={	
	 	//userName:ctx.cookies.get(userName),
	 	userId:ctx.cookies.get("userId"),
	}
	await User.findOne(param)
	.then(userDoc=>{
		return ctx.body={
			status:'0',
			message:'用户地址列表获取成功',
			data:userDoc.addressList,
		}
	})
	.catch(err=>{
		console.log(err.message);
	});
})




//导出路由
module.exports=router;
