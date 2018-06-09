<template>
	<div>
    <!-- 首部 -->
    <nav-header :isShowCart="true"></nav-header>
    <!-- 面包屑 -->
    <nav-bread>Goods</nav-bread>
    <!-- 中间商品价格排序 -->
    <div :class="{showPrice:showPrice}" class="sortPrice">
      <ul>
          <li><span>PRICE:</span></li>
          <li :class="{checked:priceChecked=='all'}" @click="priceChecked='all'"><a href="javascript:void(0)">ALL</a></li>
          <li v-for="(item,index) in pricefilter" v-bind:class="{checked:index==priceChecked}" @click="priceChecked=index"><a href="javascript:void(0)">{{item.startPrice+'-'+item.endPrice}}</a></li>
      </ul>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button @click="showPrice=(!showPrice);showShade=(!showShade)">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button @click="showPrice=(!showPrice);showShade=(!showShade)">取消</button>
    </div>
    <!-- 商品展示区域 -->
    <div class="content">
      <div class="content-TopNav">
        <div class="content-priceNav">         
          <ul>
            <!-- 价格过滤 -->
            <li><span>PRICE:</span></li>
            <li :class="{checked:priceChecked=='all'}" @click="priceSection('all')"><a href="javascript:void(0)">ALL</a></li>
            <li v-for="(item,index) in pricefilter" v-bind:class="{checked:index==priceChecked}" @click="priceSection(index)"><a href="javascript:void(0)">{{item.startPrice+'-'+item.endPrice}}</a></li>
          </ul>
        </div>
        <!-- 价格排序 -->
        <div class="content-TopNav-right">
        <div><a href="javascript:void(0)">Default</a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="changeSort">Price&nbsp;<span :class="{uparrow:sort==1,downarrow:sort==-1}"></span></a></div>
        <div><a href="javascript:void(0)" @click="showPrice=(!showPrice);showShade=(!showShade)">Sort by</a></div>
      </div>
      </div>
      <div class="content-bottNav"> 
         <!-- 商品细节 -->
        <div class="content-bottNav-productList">
          <ul>
            <li v-for="item in goodlists">
              <img v-lazy="'@/'+ item.productImg" alt="加载失败">
              <p>{{item.productName}}</p>
              <p>{{item.productPrice|currency('￥')}}</p>
              <p><a href="javascript:void(0);" @click="addCart(item.productId)">加入购物车</a></p>
            </li>
          </ul>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
            <!-- 底部加载图 -->
              <img src="@/../static/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="showLoading">
          </div>
        </div>
      </div>
    </div>
    <!-- 底部信息 -->
    <nav-footer/>
    <!-- <div :class="{showShade:showShade}"></div> -->
  </div>
</template>

<script>
  //样式导入
  import '@/assets/css/base.css'
  import '@/assets/css/product.css'
  //组件导入
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import axios from 'axios'
  export default {
    name:'GoodList',
    data(){
      return {
          goodlists:[],
          pricefilter:[
            {
              "startPrice":0,
              "endPrice":500
            },
            {
              "startPrice":501,
              "endPrice":1500
            },
            {
              "startPrice":1501,
              "endPrice":9000
            }
          ],
          priceChecked:'all',//价格过滤标志
          showPrice:false,   //页面缩小后价格筛选页面显示/隐藏
          showShade:false,   //侧面价格选择时添加蒙版
          page:1,            //初始显示页面
          pageSize:8,        //每页商品数量
          sort:1,            //排序标志，1为升，-1为降
          busy:false,        //是否允许滚动加载，默认允许
          index:null,        //价格区间标志
          showLoading:false  //底部加载动图是否显示，默认不显示
      }
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread
    },
    mounted(){
      this.getGoodList();
    },
    methods:{
      //获取商品数据
      getGoodList(){
        let startPrice=(this.index==undefined)?null:this.pricefilter[this.index].startPrice;
        let endPrice=(this.index==undefined)?null:this.pricefilter[this.index].endPrice;
        let param={
          sort:this.sort,
          page:this.page,
          pageSize:this.pageSize,
          startPrice,
          endPrice
        };
        axios.get('/goods',{
          params:param
        }).then(res=>{
          if(res.data.length==0)return this.showLoading=false;
          if(this.page!=1){
            //加载更多数据
            this.goodlists.push(...res.data);
            this.busy=false;
            return;
          }
          this.goodlists=res.data; 
          this.page++; 
          this.busy=false;        
        });
      },
      //升降序改变
      changeSort(){
        this.sort=(this.sort==1)?-1:1;
        this.page=1;
        this.getGoodList();
      },
      //滚动加载
      loadMore(){
        this.showLoading=true;
        this.busy = true;
        setTimeout(()=>{
          this.page++;
          this.getGoodList();
        },300); 
      },
      //价格区间过滤
      priceSection(index){
        this.priceChecked=index;
        if(index=='all'){
          this.index=index=null;
        }
        this.page=1;
        this.index=index;
        this.getGoodList();
      },
      //添加商品进购物车
      addCart(productId){
        axios.post('/goods/addCart',{
          productId:productId
        }).then(res=>{
            if(res.data.status==0)alert('加入成功！');
            //更新购物车数据    
        }).catch(err=>{
          console.log(err);
        });
      }
    }
  }
</script>