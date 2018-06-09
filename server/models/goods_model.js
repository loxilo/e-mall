const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const productSchema=new Schema({
	"productId":String,
	"productName":String,
	"productPrice":Number,
	"productImg":String,
});



//定义商品数据模型
const Goods = mongoose.model('Goods',productSchema);


//数据库插入商品数据
const insertData=(DataModle,productId,productName,productPrice,productImg)=>{
	const datamodle=new DataModle({
		productId,
		productName,
		productPrice,
		productImg
	});
	datamodle.save((err,res)=>{
		if(err){
			console.log('Error:' + err);
		}else{
			//console.log('Res:' + res);
		}
	});
}

//更新商品数据





//删除商品数据



module.exports={
	Goods,
	insertData
}