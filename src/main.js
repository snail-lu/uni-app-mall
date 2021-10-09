import Vue from 'vue';
import App from './App';
import store from './store';
import commonMixins from '@/common/mixins/commonMixins';
import './static/iconfont/iconfont.css';
import './static/styles/common.scss';

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.mixin(commonMixins);

App.mpType = 'app';

const app = new Vue({
	store,
	...App
});
app.$mount();
