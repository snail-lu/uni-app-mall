import config from '@/config/index.js';
import PlatformService from '@/services/common/platformService.js';

// 请求
export const request = async ({ method = 'POST', url, data = {}, option = {}, trim = true }) => {
	let apiUrl = config.baseUrl + url;

	// 入参中加入openid
	let openid = PlatformService.getStorageSync('openid');
	if (openid) {
		data.openid = openid;
	}

	return new Promise((resolve, reject) => {
		PlatformService.fetch(apiUrl, data, { method, ...option })
			.then(res => {
				let result = res.data;
				if (isOk(result)) {
					resolve(trim ? result.result : result);
				} else {
					if (typeof result == 'string') {
						reject({ apiUrl, data, result });
					} else {
						reject({ ...result, apiUrl, data });
					}
				}
			})
			.catch(e => {
				reject({ apiUrl, data, error: e });
				PlatformService.showTips(e.errMsg);
			});
	});
};

// 判断请求是否ok
export const isOk = res => res && res.success;
