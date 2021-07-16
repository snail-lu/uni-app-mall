/**
 * 自定义导航栏情况下，获取导航栏高度
 *
 * @return {Object} 返回状态栏高度和导航栏高度
 */
export const getNavigationBarHeight = () => {
	//  设备信息
	const systemInfo = uni.getSystemInfoSync();

	// 状态栏高度
	const { statusBarHeight } = systemInfo;

	// 右上角胶囊按钮位置信息
	const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	console.log(menuButtonInfo, 'menuButtonInfo');

	const { top, height } = menuButtonInfo;

	// 计算公式
	// 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度，这里是最小高度
	return {
		navigationBarHeight: 2 * (top - statusBarHeight) + height,
		statusBarHeight
	};
};

/**
 * px转rpx
 */
export const pxToRpx = value => {
	const systemInfo = wx.getSystemInfoSync();
	const { screenWidth } = systemInfo;

	return (value * 750) / screenWidth;
};

/**
 * rpx转px
 */
export const rpxToPx = value => {
	const systemInfo = wx.getSystemInfoSync();
	const { screenWidth } = systemInfo;

	return (value * screenWidth) / 750;
};
