<template>
	<div>
		<nav-header></nav-header>
		<nav-bread>Adress</nav-bread>
		<div class="addressEdit">
			<ul>
			<li v-for="(item,index) in addressListFilter" :class="{addresschecked:addressIndex==index}" @click="addressIndex=index">
					<p>姓名:{{item.name}}</p>
					<p>电话:{{item.tel}}</p>
					<p>地址:{{item.address}}</p>
				</li>
				<div class="moreorless">
					<div v-if="isMore">
						<a href="javascript:;" @click="more">more
						<div class="moreAdress"></div></a>
					</div>
					<div v-else>
						<a href="javascript:;" @click="less"><div class="lessAdress" ></div>less</a>
					</div>					
				</div>
				<li class="incAddr">
					<div @click="addAddress"><span>点击添加地址</span></div>
					<div></div>
				</li>
			</ul>
		</div>
		<div class="checkout">
			<a href="">确认</a>
		</div>
		<nav-footer></nav-footer>
	</div>
</template>


<script>
	import NavHeader from '@/components/NavHeader'
  	import NavFooter from '@/components/NavFooter'
  	import NavBread from '@/components/NavBread'
  	import axios from 'axios'
  	export default{
  		name:'Address',
  		data(){
  			return {
  				addList:[],
  				limit:3,
  				editAddress:'',
  				isMore:true,
  				addressIndex:0,
  			}
  		},
  		components:{
  			NavHeader,
  			NavBread,
  			NavFooter
  		},
  		mounted(){
  			this.initAddress();
  		},
  		computed:{
  			addressListFilter(){
  				return this.addList.slice(0,this.limit);
  			}
  		},
  		methods:{
  			//初始化地址列表
  			initAddress(){
  				axios.get('/users/initAddress',{
  					// params:{
  					// 	username:'123',
  					// 	password:'123'
  					// }
  				})
  				.then(res=>{
  					if(res.data.status=='0'){
  						this.addList=res.data.data;
  					}
  					console.log(res.data.message);
  				},null)
  				.catch(err=>{
  					console.log(err.message);
  				});
  			},
  			//增加地址
  			addAddress(){
  				axios.post('/users/addAddress',{
  						username:'123',
  						password:'123'
  				})
  				.then(res=>{
  					if(res.data.status=='0'){
  						this.addList=res.data.data;
  					}
  				})
  				.catch(err=>{
  					console.log(err.message);
  				});
  			},
  			//显示更多地址信息
  			more(){
  				this.isMore=!this.isMore;
  				this.limit=this.addList.length;
  			},
  			//减少地址数量显示
  			less(){
  				this.isMore=!this.isMore;
  				if(this.limit>3)this.limit=3;
  			}
  		}
  	}
</script>
	

<style>
	.addressEdit{
		margin:0 auto;
		width: 95%;
		overflow: hidden;
		*zoom:1;
	}
	.addressEdit ul li{
		width: 350px;
		height: 180px;
		background: white;
		float: left;
		margin-left: 2%;
		margin-top:2%;
		margin-bottom: 2%;
		text-align: center;
		/*position: relative;*/
		opacity: .4;
		/*padding: 4px;*/
	}
	.addressEdit ul li p{
		margin-top:8%;
	}
	.addresschecked,.addressEdit ul li:hover{
		border:5px solid rgba(240,0,0,.5);
		box-sizing: border-box;
	}
	.incAddr div:nth-child(1){
		width: 180px;
		height: 2px;
		background: gray;
		border-radius: 2px;
		margin:89px auto;

	}
	.incAddr div:nth-child(1) span{
		display: inline-block;
		margin-top:30px;
	}
	.incAddr div:nth-child(2){
		width: 2px;
		height: 60px;
		background: gray;
		border-radius: 2px;
		/*margin:89px auto;*/
		/*position: absolute;*/
		float: left;
		margin-top:-120px;
		margin-left: 174px;
	}
	.checkout{
		width: 91.5%;
		height: 50px;
		background: rgba(200,0,0,0.4);
		margin:0 auto;
		border-radius: 3px;
		line-height: 50px;
		text-align: center;
		font-size: 20px;
	}
	.checkout a{
		display: inline-block;
		width: 80%;
		height: 40px;
	}
	.moreorless{
		opacity: .5;
		float: left;
		width: 96%;
		height: 40px;
		background: white;
		margin-left:2%;
		text-align: center;
		/*position: relative;*/
		line-height: 40px;
		/*padding-bottom: 10px;*/
		color: gray;
	}
	.moreAdress{
		width: 5px;
		height: 5px;
		/*background: white;*/
		margin:0 auto;
		/*float: left;*/
		transform:rotateZ(45deg);
		border-right: 1px solid black;
		border-bottom: 1px solid black;
		/*background: white;*/
		position: relative;
		bottom: 12px;
	}
	.lessAdress{
		width: 5px;
		height: 5px;
		margin:0 auto;
		transform:rotateZ(225deg);
		border-right: 1px solid black;
		border-bottom: 1px solid black;
		position: relative;
		top:13px;
	}
</style>