// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import InfiniteScroll from 'vue-infinite-scroll'
import {currency} from '@/util/currency'
import Vuex from 'vuex'


Vue.config.productionTip = false;
Vue.filter('currency',currency);

Vue.use(VueLazyLoad,{
	loading:"../static/loading-svg/loading-bars.svg"
});
Vue.use(InfiniteScroll);

const store = new Vuex.Store({
	state:{
		count:0,

	},
	getters:{

	},
	mutations:{}
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
