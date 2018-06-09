<template>
	<div class="header">
		<div class="header-left">
			<img src="@/../static/wine-logo1.png" alt="">
		</div>
		<!-- 未登录 -->
		<div class="header-right" v-if="isnLogin">
			<a href="javascript:;" @click="isShade=true;login_isShow=true">登陆</a>&nbsp;&nbsp;&nbsp;&nbsp;
			<a href="javascript:;" @click="isShade=true;sign_in_isShow=true">注册</a>&nbsp;&nbsp;&nbsp;&nbsp;
		</div>
		<!-- 已登录 -->
		<div class="header-right" v-if="!isnLogin">
			<a href="javascript:;" @click="">{{nickname}}</a>&nbsp;&nbsp;&nbsp;&nbsp;
			<a href="javascript:;" @click="logout">退出</a>&nbsp;&nbsp;&nbsp;&nbsp;
			<!-- <router-link to="/cart">购物车</router-link> -->
			<a @click="toCart" v-show="isShowCart">购物车</a>
		</div>	
		<!-- 遮罩 -->
		<div class="showShade" v-if="isShade">
			<!-- 登陆模块 -->
			<div class="login" v-if="login_isShow">
				<ul>
					<li><span>UserName:</span><input type="text" v-model="username"></li>
					<li><span>PassWord:</span><input type="text" v-model="password" @keyup.enter="login"></li>
					<li><button @click="login">登陆</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button @click="isShade=false;login_isShow=false">取消</button></li>
				</ul>
			</div>
			<div class="sign_in login" v-if="sign_in_isShow">
				<ul>
					<li><span>UserName:</span><input type="text" v-model="username"></li>
					<li><span>PassWord:</span><input type="text" v-model="password" @keyup.enter="login"></li>
					<li><button @click="register">注册</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button @click="isShade=false;sign_in_isShow=false">取消</button></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	export default {
		name:'NavHeader',
		props:['isShowCart'],
		data(){
			return {
				login_isShow:false,//登陆框显示
				sign_in_isShow:false,//注册框显示
				isShade:false,//遮罩显示
				username:'',
				password:'',
				isnLogin:true,
				nickname:'',
			}
		},
		mounted(){
			this.checklogin();
		},
		methods:{
			//检查是否已登陆
			checklogin(){
				axios.get('/users/checklogin')
				.then(res=>{
					if(res.data.status=='0'){
						this.nickname=res.data.data.username;
						this.isnLogin=false;
						this.login_isShow=false;
						this.isShade=false;
					}
				})
				.catch(err=>{
					console.log(err.message);
				});
			},
			//登陆
			login(){
				if(!this.username||!this.password){
					alert('用户名或密码不能为空！');
					return;
				}
				axios.post('/users/login',{
					username:this.username,
					password:this.password
				})
				.then(response=>{
					this.username='';
					this.password='';
					const res=response.data;
					if(res.status=='0'){
						alert('登陆成功');
						this.nickname=res.data.username;
						this.isnLogin=false;
						this.login_isShow=false;
						this.isShade=false;
						return;
					}
					alert("登陆失败！用户名或密码错误！");
				})
				.catch(err=>{
					console.log(err);
					alert("err");
				});
			},
			//退出
			logout(){
				axios.post('/users/logout')
				.then(res=>{
					if(res.data.status=='0'){
						this.isnLogin=true;
						this.nickname='';
						return;
					}
					alert('退出失败！');
				})
				.catch();
			},
			//注册
			register(){
				if(!this.username||!this.password){
						alert('用户名或密码不能为空！');
						return;
					}
				axios.post('/users/register',{
					username:this.username,
					password:this.password
				})
				.then(res=>{					
					if(res.data.status=='0'){
						alert('注册成功！');
						this.sign_in_isShow=false;
						this.isShade=false;
						return;
					}
					alert("该用户已被注册！");
				})
				.catch(err=>{
					console.log(err.message);
				});
			},
			//跳转到购物车
			toCart(){
				this.$router.push({
					path:'/cart'
				});
			}
		}
	}
</script>
<style scoped>
	.header
	{
		height:60px;
		background:#eee;
		line-height:60px;
	}
	.header .header-left
	{
		float:left;
		height:60px;
		position:relative;
	}
	.header .header-left img
	{
		position:absolute;
		top:0px;
		left: 40px;
		width: 55px;
		height: 55px;
	}
	.header .header-right
	{
		float:right;
		margin-right:30px;
	}
	.showShade{
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(100,100,100,0.3);
		z-index: 20;
		top:0;
		left: 0;
		display: inline;
	}
	.login{
		position: fixed;
		width: 360px;
		height: 210px;
		background: white;
		margin:0 auto;
		z-index: 33;
		top: 20%;
		left: 50%;
		margin-left: -180px;
		text-align: center;
		padding-top: 22px;
		box-sizing: border-box;
		border-radius: 5px;
	}
	.login ul{
		/*margin-top: 10px;*/
		font-size: 14px;
	}
	.login ul li{
		margin-top:0px;
	}
	.login span{
		color:gray;
	}
	.login ul li input{
		/*margin-left: 10px;*/
		width: 180px;
		height: 20px;
		border:1px solid rgba(128,128,128,.3);
	}
	.login ul li button{
		height: 28px;
		width: 110px;
		font-size: 18px;
		background:#73e35f;
		border:none;
		border-radius: 3px;
	}

</style>
