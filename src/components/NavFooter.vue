<template>
  <div class="footer">
  	<div class="foot-left">
  		<span>Region</span>
  		<select class="foot-select">
           <option value="en-US">USA</option>
           <option value="zh-CN">China</option>
        </select>
  	</div>
  	<div class="foot-right">
  		<ul>
  			<li><span>Copyright © 2017 IMooc All Rights Reserved.</span></li>
  			<li>
  				<a href="#">
              	About Us
   				</a>
   			</li>
  			<li>
  				<a href="#">
              	Terms &amp; Conditions
            	</a>
  			</li>
  			<li>
  				<a href="#">
              	Privacy Policy
            	</a>
  			</li>
  		</ul>
  	</div>
  </div>
</template>
<script>
	export default {
		name:'NavFooter'
	}
</script>

<style scoped>
  .footer{
	height: 80px;
	width: 95%;
	margin:0 auto;
	/*background:red;*/
	border-top: 1px solid #999;
	/*border-bottom: 5px solid red;*/
	margin-top: 20px;
  }
  .footer .foot-left{
	float: left;
	/*background: blue;*/
	margin-top:40px;
	margin-left: 40px;
  }
  .footer .foot-right{
	float: right;
	/*background: green;*/
	margin-top:40px;
  }
  li{
  	/*list-style: none;*/
  	float: left;
  	margin-left: 20px;
  	color:#666;
  }
  span{
  	color:#999;
  }
</style>
 
            
            
            
            