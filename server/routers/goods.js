/*
 *商品页面，主要提供商品获取，价格升降排序，价格过滤，以及数据库中数据添加，更新等
 *
 */
//导入依赖
const Router = require('koa-router');
const {Goods} = require('../models/goods_model');


/*商品分页排序页面*/

const router = new Router();

router.get('/',async ctx=>{
	console.log("访问/goods");
	const sort = parseInt(ctx.query.sort);
	const page = parseInt(ctx.query.page);
	const pageSize = parseInt(ctx.query.pageSize);
	const skip = (page-1)*pageSize;
	const params = (ctx.query.startPrice==null)?{}:{
		productPrice:{
			$gte:parseInt(ctx.query.startPrice),
			$lte:parseInt(ctx.query.endPrice)
		}
	};
	const queryData = await 
	Goods.find(params)
	.skip(skip)
	.limit(pageSize)
	.sort({"productPrice":sort})
	.then(doc=>{
		ctx.body=doc;
	}).catch(err=>{
		console.log(err);
	});
});


//添加购物车
router.post('/addCart',async ctx=>{
	console.log("访问/addCart");
	let productId = ctx.request.body.productId;
	const userId=ctx.cookies.get("userId");
	const User = require('../models/user_model');
	await User.findOne({userId})
	.then(async userDoc=>{
		//for(let i=0,len=userDoc.cartList.length;i<len;i++){
			//如果商品存在，增加其productNum即可
		// 	if(userDoc.cartList[i].productData.productId==productId){
		// 		userDoc.cartList[i].productNum++;
		// 		//更新数据库
		// 		userDoc.save()
		// 		.then(res=>{
		// 			console.log('更新成功！');
		// 		})
		// 		.catch(err=>{
		// 			console.log("err:",err.message);
		// 		});
		// 		//返回商品信息
		// 		return ctx.body={
		// 			status:0,
		// 			message:"商品增加成功",
		// 			data:{
		// 				"productData":userDoc.cartList[i].productData,
		// 	            "checked" : "", 
		// 	            "productNum" :userDoc.cartList[i].productNum 
  //       			}
		// 		};
		// 	}		
		// }
		/////////////////////////////////////////////////////////////////////
		if((gData=userDoc.cartList.find(val=>val.productData.productId==productId))!=null){
			//如果商品存在，增加其productNum即可
			gData.productNum++;
			//异步更新数据库
			userDoc.save()
			.then(res=>{
				console.log('更新成功！');
			})
			.catch(err=>{
				console.log("err:",err.message);
			});
			//返回商品信息
			return ctx.body={
				status:0,
				message:"商品增加成功",
				data:gData
			}
		}
		/////////////////////////////////////////////////////////////////////
		//如果商品不存在，插入一个新的商品数据
		await Goods.findOne({productId})
		.then(goodsDoc=>{			
			userDoc.cartList.push({
				productData:goodsDoc,
				checked:false,
				productNum:1
			});
			//异步更新数据库
			userDoc.save()
			.then(res=>{
				console.log('插入成功！');
			})
			.catch(err=>{
				console.log("err:",err.message);
			});
			//返回商品数据
			return ctx.body={
				status:0,
				message:"成功添加商品",
				data:{
					"productData":goodsDoc,
					"checked":false,
					"productNum":1
				}
			}
		});
	})
	.catch(err=>{
		return ctx.body={
			status:-1,
			message:"添加失败",
			data:null
		}
	})
});

module.exports=router;












