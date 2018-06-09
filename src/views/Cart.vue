<template>
	<div>
		<nav-header :isShowCart="false"></nav-header>
		<nav-bread>Cart</nav-bread>
		<div class="content">
			<!--  -->
			<ul class="top-good-para">
				<li>选择</li> 
				<li>商品</li> 
				<li>价格</li> 
				<li>数量</li> 
				<li>总价</li> 
				<li>删除</li> 
			</ul>
			<!--  -->
			<ul class="cen-good-info">
				<li v-for="(item,index) in gList">
					<ul>
						<li><input id="radio" type="radio" :checked="item.checked" @click="editGoods(index,$event)"></li>
						<li>
							<img :src="`@/${item.productData.productImg}`" alt="">
							<span>{{item.productData.productName}}</span>
						</li>
						<li style="color: red;">{{item.productData.productPrice|currency('￥')}}</li>
						<li>
							<button id="dec" @click="editGoods(index,$event)">-</button>
								<input type="text" :value="`${item.productNum}`">
							<button id="inc" @click="editGoods(index,$event)">+</button>
						</li>
						<li style="color: red;">{{item.productData.productPrice*item.productNum|currency('￥')}}</li>
						<li>
							<button id="del" @click="editGoods(index,$event)">删除</button>
						</li>
					</ul>
				</li>
			</ul>
			<!--  -->
			<div class="bot-checked">
				<div>
					<input id="allChecked" type="radio" :checked="isAllSelect" @click="editGoods(null,$event)">&nbsp;
					全部/取消
				</div>
				<div>
					<span>总计</span>&nbsp;:&nbsp;
					<span style="color: red;">{{totalPrice|currency('￥')}}</span>&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button @click="checkout">提交订单</button>
				</div>
			</div>
		</div>
		<nav-footer></nav-footer>
	</div>
</template>

<script>
	import NavHeader from '@/components/NavHeader'
  	import NavFooter from '@/components/NavFooter'
  	import NavBread from '@/components/NavBread'
  	import axios from 'axios'
  	import {currency} from '@/util/currency'
	export default{
		name:'Cart',
		components:{
			NavHeader,
      		NavFooter,
      		NavBread
		},
		data(){
			return {
				gList:[],
				isAllSelect:false
			}
		},
		mounted(){
			this.init();
		},
		filters:{
			//currency
		},
		computed:{
			isAll(){
				//是否选中全选按钮
				return this.gList.length==this.checkedCount;
			},
			//检查已选中按钮数量
			checkedCount(){
				let i=0;
				this.gList.map(val=>{
					console.log(val.checked);
					if(val.checked==true)i++;
				});
				return i;
			},
			//计算总价
			totalPrice(){
				let total=0;
				this.gList.map(val=>{
					if(val.checked==true){
						total+=val.productData.productPrice*val.productNum;
					}
				});
				return total;
			}
		},
		methods:{
			//初始化购物车列表
			init(){
				axios.get('/users/cartList?',{
					params:{
						username:'123',
						password:'123'
					}
				})
				.then(result=>{
					const res=result.data;
					if(res.status=='0'){
						this.gList=res.data;
						this.isAllSelect=this.isAll;
					}
				})
				.catch(err=>{
					console.log(err.message)
				});
			},
			//增减/删除商品数量
			editGoods(index,event){
				const editItem = event.target.id;
				
				axios.get('/users/editGoods',{
					params:{
						username:'123',
						password:'123',
						index,
						editItem,
						isAllSelect:!this.isAllSelect
					}
				})
				.then(result=>{
					const res=result.data;
					if(res.status=='0'){
						this.gList=res.data;
						if(editItem=='allChecked'){
							this.isAllSelect=!this.isAllSelect;
						}
						if(editItem=='radio'){
							this.isAllSelect=this.isAll;
						}
					}
				})
				.catch(err=>{
					console.log(err.message);
				});
			},
			//提交订单到地址界面
			checkout(){
				if(this.checkedCount>0){
					this.$router.push({
						path:'/address'
					});
				}
			}
		}
	}	
</script>
	
<style>
	.content{
		width: 98%;
		/*height: 500px;*/
		/*background: red;*/
		margin:0 auto;
    }
    /*=======================*/
    .top-good-para{
    	width: 100%;
    	height: 50px;
    	background: #333;
    	line-height: 50px;
    	text-align: center;
    	color: white;
    }
    .top-good-para li{
    	float: left;
		/*width: 195px;	*/
		width:15%;
    }
    /*========================*/
	.cen-good-info li{
		width: 100%;
		height: 150px;
		background: white;
		box-sizing: border-box;
		border-bottom:1px solid gray;
	}
	.cen-good-info li ul{
		height: 150px;
	}
	.cen-good-info ul li{
		float: left;
		/*width: 195px;*/
		width: 15%;
		/*background: blue;*/
		line-height: 150px;
		text-align: center;
		position: relative;
	}
	.cen-good-info ul li:nth-child(2) img{
		width: 80px;
		height: 100px;
		margin-left: 0px;
		/*margin-top: 20px;*/
		top:25px;
		position: absolute;
		left: 0px;
		border-radius: 3px;
	}
	.cen-good-info ul li:nth-child(2) span{
		/*position: absolute;*/
		margin-left: 50%;
	}
	.cen-good-info ul li:nth-child(4) input{
		width: 50px;
		height: 21px;
		text-align: center;
	}
	.cen-good-info ul li:nth-child(4) button{
		width: 30px;
		height: 25px;
	}
	/*=====================*/
	.bot-checked{
		margin-top: 10px;
		width: 100%;
		height: 50px;
		background: white;
		line-height: 50px;
	}
	.bot-checked div:nth-child(1){
		float: left;
		margin-left: 6.8%;
	}
	.bot-checked div:nth-child(2){
		float: right;
		margin-right: 16%;
	}
	.bot-checked div:nth-child(2) button{
		width: 100px;
		height: 30px;
		font-size: 18px;
		background: #e00;
		border:none;
	}
	/*===========*/

</style>