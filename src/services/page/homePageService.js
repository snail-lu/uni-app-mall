import apiUrl from '@/config/api';
import { request } from '@/common/utils/index';

export default class HomePageService {
	// 接口测试
	static apiTest() {
		return request({ url: apiUrl.common.test, data: { deep: 0, photoKey: '' } });
	}
}
