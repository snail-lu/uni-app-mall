<template>
	<view class="pay-result-container flex-box-column flex-v-center">
		<view class="iconfont icon-wancheng"></view>
		支付成功
		<view class="flex-box">
			<view class="nav-btn" @click="navigateTo('home')">继续购物</view>
			<view class="nav-btn" @click="navigateTo('orderList')">查看订单</view>
		</view>
	</view>
</template>
<script>
import pageUrl from '@/config/page';
export default {
	data() {
		return {};
	},
	methods: {
		// 页面跳转
		navigateTo(pageName) {
			const url = pageUrl[pageName];
			if (url) {
				this.smartPushUrl(url);
			} else {
				this.tips('页面不存在');
			}
		}
	}
};
</script>
<style lang="scss">
.pay-result-container {
	padding-top: 100rpx;
	font-size: 40rpx;
}
.icon-wancheng {
	color: rgb(13, 238, 99);
	font-size: 100rpx;
	margin-bottom: 30rpx;
}
.nav-btn {
	width: 160rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	margin: 20px 10px;
	border: 1px solid #333;
	font-size: 26rpx;
	border-radius: 100rpx;
}
</style>
