// 转化首字母为小写
export const firstCharToUpper = (str) => str.replace(/^[a-z]/, (char) => char.toUpperCase());

// 字符串去首尾空格
export const trim = (str) => {
	return str.replace(/^\s|\s$/g, '');
}

// 检测手机号码
export const checkMobile = (mobile) => mobile.match(/^1\d{10}$/) != null

// 检测密码
export const checkPwd = (value) => {
	const reg = /^[A-Za-z0-9_!@-]{6,20}$/;
	return reg.test(value)
}
