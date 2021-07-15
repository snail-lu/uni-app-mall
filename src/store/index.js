import Vue from "vue";
import Vuex from "vuex";
import PlatformService from "@/services/common/platformService";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		cartNum: 0,
		userInfo: null
	},
	mutations: {
		setCartNum(state, cartNum = 0) {
			state.cartNum = cartNum;
		},
		setUserInfo(state, userInfo = null) {
			state.userInfo = userInfo;
		}
	},
	actions: {
		refreshCartNum(context, payload) {
			PlatformService.setTabBarBadge({
				index: 2,
				text: payload.cartNum + ""
			});
			context.commit("setCartNum", payload.cartNum);
		}
	}
});
export default store;
