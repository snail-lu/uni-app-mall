// 时间格式化
export const dateFormat = (current, format) => {
	if (!current) return
	let currentDate = current
	if (typeof current == 'number') {
		currentDate = new Date()
		currentDate.setTime(current)
	}
	var o = {
		"M+": currentDate.getMonth() + 1, //month
		"d+": currentDate.getDate(), //day
		"h+": currentDate.getHours(), //hour
		"m+": currentDate.getMinutes(), //minute
		"s+": currentDate.getSeconds(), //second
		"q+": Math.floor((currentDate.getMonth() + 3) / 3), //quarter
		"S": currentDate.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(currentDate.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

export const formatTimeCountdown = (diffTime, format) => {
	var o = {
		"d+": Math.floor(diffTime / 3600000 / 24), //day
		"h+": Math.floor(diffTime % (3600000 * 24) / 3600000), //hour
		"m+": Math.floor(diffTime % 3600000 / 60000), //minute
		"s+": Math.floor(diffTime % 60000 / 1000), //second
		"S": diffTime % 1000 //millisecond
	};
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
				((("" + o[k]).length == 3 ? '000' : "00") + o[k]).substr(("" + o[k]).length));
	return format;
}

// 日期时间反向格式化
export const reverseDate = (date) => {
	let result = null;
	let match = date.match(/^(\d{2,4})\-(\d{1,2})\-(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})/);
	if (match != null) {
		let year = match[1];
		let month = parseInt(match[2]) - 1;
		let day = match[3];
		let hour = match[4];
		let minute = match[5];
		let second = match[6];
		result = new Date(year, month, day, hour, minute, second);
	}
	return result;
}

export const formatTimestamp = (timestamp) => {
	return {
		"d": Math.floor(timestamp / 3600000 / 24), // day
		"h": Math.floor(timestamp % (3600000 * 24) / 3600000), //hour
		"m": Math.floor(timestamp % 3600000 / 60000), // minute
		"s": Math.floor(timestamp % 60000 / 1000), // second
	};
}

// 返回时间格式y/m/d
export const transformDate = (timestamp) => {
	if (timestamp) {
		let time = new Date(timestamp);
		let y = time.getFullYear();
		let m = time.getMonth() + 1;
		let d = time.getDate();
		return y + '/' + m + '/' + d;
	} else {
		return '';
	}
}
