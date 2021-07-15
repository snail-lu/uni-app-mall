// 回调转promise
export const _toPromise = api => param =>
	new Promise((resolve, reject) => {
		api
			? api({
					...param,
					success: resolve,
					fail: reject
			  })
			: reject();
	});

export default class PlatformService {
	// 获取服务供应商
	static getProvider = _toPromise(uni.getProvider);

	// 获取系统信息
	static getSystemInfo = _toPromise(uni.getSystemInfo);
	static getSystemInfoSync = uni.getSystemInfoSync;

	// 存储操作
	static getStorage = _toPromise(uni.getStorage);
	static getStorageSync = uni.getStorageSync;
	static setStorage = _toPromise(uni.setStorage);
	static setStorageSync = uni.setStorageSync;
	static removeStorage = _toPromise(uni.removeStorage);
	static removeStorageSync = uni.removeStorageSync;
	static clearStorage = _toPromise(uni.clearStorage);
	static clearStorageSync = uni.clearStorageSync;

	// 网络请求
	static request = _toPromise(uni.request);
	static fetch(url, data, option = {}) {
		let requestParam = {
			...option,
			url,
			data
		};

		return this.request(requestParam);
	}
	// 页面跳转
	static navigateTo = _toPromise(uni.navigateTo);
	static navigateBack = _toPromise(uni.navigateBack);
	static redirectTo = _toPromise(uni.redirectTo);
	static switchTab = _toPromise(uni.switchTab);
	static reLaunch = _toPromise(uni.reLaunch);
	// 添加访问堆栈
	static pushUrl(url, params = null) {
		let paramArr = this._serialize(params, true);
		let pageUrl = url;
		if (paramArr.length) {
			pageUrl = url + (url.indexOf('?') > -1 ? '&' : '?') + paramArr.join('&');
		}
		return this.navigateTo({
			url: pageUrl
		});
	}

	// 重定向页面
	static redirectUrl(url, params = null) {
		let paramArr = this._serialize(params, true);
		let pageUrl = url;
		if (paramArr.length) {
			pageUrl = url + (url.indexOf('?') > -1 ? '&' : '?') + paramArr.join('&');
		}
		return this.redirectTo({
			url: pageUrl
		});
	}
	// 切换tab
	static switchUrl(url, params = null) {
		let paramArr = this._serialize(params, true);
		let pageUrl = url;
		if (paramArr.length) {
			pageUrl = url + (url.indexOf('?') > -1 ? '&' : '?') + paramArr.join('&');
		}
		return this.switchTab({
			url: pageUrl
		});
	}
	// 回退到上一页
	static back(delta = 1) {
		return this.navigateBack({
			delta
		});
	}

	// 序列化参数
	static _serialize(params = null, encode = false) {
		let paramArr = [];
		if (params) {
			for (let key in params) {
				let value = encode ? encodeURIComponent(params[key]) : params[key];
				paramArr.push(`${key}=${value}`);
			}
		}
		return paramArr;
	}

	// 设置tabbar右上角文字
	static setTabBarBadge = _toPromise(uni.setTabBarBadge);
	static removeTabBarBadge = _toPromise(uni.removeTabBarBadge);

	// 隐藏tabbar
	static hideTabBar = _toPromise(uni.hideTabBar);

	// 加载
	static showLoading = _toPromise(uni.showLoading);
	static hideLoading = _toPromise(uni.hideLoading);
	// 消息提示框api
	static showToast = _toPromise(uni.showToast);
	static hideToast = _toPromise(uni.hideToast);
	//消息提示框  无图标
	static showTips(msg, icon = 'none', duration = 2000) {
		return this.showToast({
			title: msg,
			icon,
			duration
		});
	}
	//消息提示框  成功
	static showSuccessTips(msg, duration = 2000) {
		return this.showToast({
			title: msg,
			icon: 'success',
			duration
		});
	}
	// 显示带图标loading
	static showIconLoading(params) {
		let defaultParam = {
			icon: 'loading',
			msg: '',
			duration: 5000
		};
		params = {
			...defaultParam,
			...params
		};
		return this.showToast(params);
	}

	// 隐藏带图标loading
	static hideIconLoading() {
		return this.hideToast().catch(() => {});
	}
	// 模态对话框
	static showModal = _toPromise(uni.showModal);
	static showModalCb = uni.showModal;
	static async confirm(content, title = '', cancelText = '取消') {
		let params = {
			content
		};
		if (title) {
			params['title'] = title;
		}
		if (cancelText) {
			params['showCancel'] = true;
			params['cancelText'] = cancelText;
		}
		let res = await this.showModal(params);
		return res.confirm;
	}

	// 设置导航栏标题
	static setNavigationBarTitle = uni.setNavigationBarTitle;
	static setTitle(title) {
		return this.setNavigationBarTitle({
			title
		});
	}

	// 支付接口
	static requestPayment = _toPromise(uni.requestPayment);

	// 发起微信支付
	static requestPay(timeStamp, nonceStr, pkg, signType, paySign) {
		return this.requestPayment({
			timeStamp: timeStamp,
			nonceStr: nonceStr,
			package: pkg,
			signType: signType,
			paySign: paySign
		});
	}

	// 获取图片信息
	static getImageInfo = _toPromise(uni.getImageInfo);

	static async getImageSize(imageUrl) {
		let src = (imageUrl.match(/^http/) == null ? 'http:' : '') + imageUrl;
		let res = await this.getImageInfo({
			src
		});
		return {
			width: res.width,
			height: res.height
		};
	}
}
