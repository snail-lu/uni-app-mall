import config from '@/config';
import PlatformService from '@/services/common/platformService';

export default {
	data() {
		return {};
	},
	computed: {},
	methods: {
		getConfig() {
			return config;
		},
		// 批量数据更新
		batchUpdate(data) {
			for (let key in data) {
				this[key] = data[key];
			}
		},
		pushUrl(url, params = null) {
			PlatformService.pushUrl(url, params);
		},
		// 根据tabbar自动选择切换url的方式
		smartPushUrl(url, params = null) {
			const { tabBarList } = config.pageUrl;
			let inTabBar = tabBarList.some(tabBar => url.includes(tabBar));
			if (inTabBar) {
				return PlatformService.switchUrl(url, params);
			} else {
				return PlatformService.pushUrl(url, params);
			}
		},
		redirectUrl(url, params = null) {
			PlatformService.redirectUrl(url, params);
		},
		switchUrl(url, params = null) {
			PlatformService.switchUrl(url, params);
		},
		back(delta = 1) {
			PlatformService.back(delta);
		},
		tips(msg, duration) {
			PlatformService.showTips(msg, 'none', duration);
		},
		confirm(content, title = '提示', cancelText = '取消') {
			return PlatformService.confirm(content, title, cancelText);
		}
	}
};
