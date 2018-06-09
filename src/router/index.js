import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '@/views/GoodList.vue'
import Cart from '@/views/Cart.vue'
import Address from '@/views/Address.vue'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'GoodList',
      component: GoodList,
    },
    {
    	path:'/cart',
    	name:'Cart',
    	component:Cart,
    },
    {
      path:'/address',
      name:'Address',
      component:Address,
    } 
  ]
})
