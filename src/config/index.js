const BUILD_ENV = process.env.VUE_APP_BUILD_ENV || process.env.NODE_ENV;
import pageUrl from './page';
import apiUrl from './api';

let config = {
	env: BUILD_ENV,
	imageDomain: 'https://xxx.oss-cn-qingdao.aliyuncs.com', // 图片域名
	appId: 'xxxxxxx',
	apiUrl,
	pageUrl
};

switch (BUILD_ENV) {
	case 'production': // 生产环境配置
		config = {
			...config,
			baseUrl: 'http://xxxx'
		};
		break;
	case 'development': // 本地环境配置
		config = {
			...config,
			baseUrl: 'http://xxxx'
		};
		break;
}

export default config;
