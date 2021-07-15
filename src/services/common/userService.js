import { apiUrl } from '@/config/api';
import { post } from '@/common/utils/request';
export default class UserService {
	static async login(code) {
		let url = apiUrl.user.login;
		let params = { code };
		try {
			let res = await post(url, params);
			if (res.token) {
				this.setAuthInfo(res);
				this.getUserBaseInfo();
			}
			return [true, res];
		} catch (e) {
			return [false, e];
		}
	}
}
