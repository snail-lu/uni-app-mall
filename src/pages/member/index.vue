<template>
	<view class="member-container">
		<view class="header flex-box flex-v-center flex-h-between">
			<view class="flex-box flex-v-center" @click="pageNavigate('personalInfo')">
				<view class="avatar-box">
					<open-data type="userAvatarUrl"></open-data>
				</view>
				<view class="username-box">
					<open-data type="userNickName"></open-data>
					<view class="member-label">普通会员</view>
				</view>
			</view>

			<view @click="showPopup">
				<i class="iconfont icon-erweima" style="font-size:50rpx;"></i>
			</view>
		</view>

		<!-- 订单板块 -->
		<view class="block">
			<uni-list class="title" :border="false">
				<uni-list-item title="我的订单" link to="/pages/order/index" rightText="查看全部"></uni-list-item>
			</uni-list>
			<view class="flex-box menu">
				<view style="position: relative;" class="flex-item-1">
					<view class="item" @click="pushUrl('/pages/order/index?orderStatus=1')">
						<uni-badge class="num_b" size="small" type="error" text="10"></uni-badge>
						<i class="iconfont icon-pending"></i>
						<view>待付款</view>
					</view>
				</view>
				<view style="position: relative;" class="flex-item-1">
					<view class="item" @click="pushUrl('/pages/order/index?orderStatus=2')">
						<uni-badge class="num_b" size="small" type="error" text="8"></uni-badge>
						<i class="iconfont icon-bag"></i>
						<view>待发货</view>
					</view>
				</view>
				<view style="position: relative;" class="flex-item-1">
					<view class="item" @click="pushUrl('/pages/order/index?orderStatus=3')">
						<uni-badge class="num_b" size="small" type="error" text="6"></uni-badge>
						<i class="iconfont icon-track"></i>
						<view>待收货</view>
					</view>
				</view>
				<view style="position: relative;" class="flex-item-1">
					<view class="item" @click="pushUrl('/pages/order/index?orderStatus=4')">
						<uni-badge class="num_b" size="small" type="error" text="3"></uni-badge>
						<i class="iconfont icon-completed"></i>
						<view>已收货</view>
					</view>
				</view>
				<view style="position: relative;" class="flex-item-1">
					<view class="item" @click="pageNavigate()">
						<uni-badge class="num_b" size="small" type="error" text="1"></uni-badge>
						<i class="iconfont icon-money"></i>
						<view>退款/退货</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 其他服务板块 -->
		<view class="block">
			<uni-list class="title" :border="false">
				<uni-list-item title="其他服务"></uni-list-item>
			</uni-list>
			<view class="menu flex-box flex-h-around">
				<view class="item" @click="pageNavigate('coupon')">
					<i class="iconfont icon-coupon-deep"></i>
					<view>优惠券</view>
				</view>
				<view class="item" @click="pageNavigate('address')">
					<i class="iconfont icon-address"></i>
					<view>收货地址</view>
				</view>
				<view class="item" @click="pageNavigate('favorites')">
					<i class="iconfont icon-heart-a"></i>
					<view>收藏夹</view>
				</view>
				<button open-type="contact" class="item contact-btn">
					<i class="iconfont icon-service-b" style="font-size:54rpx;"></i>
					<view>客服</view>
				</button>
			</view>
		</view>

		<!-- 弹窗 -->
		<uni-popup ref="popup" type="center" background-color="#fff">
			<view class="pop-box flex-box-column flex-v-center">
				<view class="title">会员二维码</view>
				<canvas class="bar-code" canvas-id="barCanvas" />
				<canvas class="qr-code" canvas-id="qrCanvas" />
				<view class="close-btn" @click="showPopup(false)">关闭</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
import pageUrl from '@/config/page';
import { mapState } from 'vuex';
import QR from '@/common/utils/qrcode';
import BarCode from '@/common/utils/barcode';
export default {
	data() {
		return {};
	},
	computed: {
		...mapState({
			authInfo: state => state.authInfo,
			userInfo: state => state.userInfo
		})
	},
	methods: {
		// 页面跳转
		pageNavigate(target) {
			if (pageUrl[target]) {
				this.smartPushUrl(pageUrl[target]);
			} else {
				this.tips('页面不存在');
			}
		},

		// 显示弹窗
		showPopup(show = false) {
			if (show) {
				this.$refs.popup.open();
				this.createQrCode('https://www.baidu.com', 'qrCanvas', 160, 160);
				this.createBarCode('https://www.baidu.com', 'barCanvas', 260, 70);
			} else {
				this.$refs.popup.close();
			}
		},

		// 绘制二维码
		createQrCode: function(content, canvasId, cavW, cavH) {
			QR.api.draw(content, canvasId, cavW, cavH);
		},

		// 绘制条形码
		createBarCode: function(content, canvasId, cavW, cavH) {
			BarCode.code128(uni.createCanvasContext(canvasId), content, cavW, cavH);
		}
	}
};
</script>
<style lang="scss">
.uni-popup__wrapper {
	border-radius: 20rpx;
}
.header {
	padding: 100rpx 40rpx;
	background-color: #e7493f;
	color: #fff;
	.avatar-box {
		border-radius: 50%;
		width: 50px;
		height: 50px;
		overflow: hidden;
	}
	.username-box {
		margin-left: 20rpx;
		font-size: 40rpx;

		.member-label {
			font-size: 24rpx;
		}
	}
}
.block {
	font-size: 20rpx;
	color: #666;
	background: #fff;
	width: 95%;
	margin: 40rpx auto;
	border-radius: 30rpx;
	overflow: hidden;
}
.uni-list-item {
	border-bottom: 1px solid #f2f2f2;
}
.title {
	width: 100%;
}
.menu {
	text-align: center;
	line-height: 50rpx;
	padding: 30rpx 0 10rpx;
}
.goods-name {
	font-size: 24rpx;
	color: #333;
}
.goods-price {
	font-size: 38rpx;
	color: #e7493f;
}
.num_b {
	position: absolute;
	right: 30rpx;
	top: -10rpx;
}
.iconfont {
	font-size: 50rpx;
}
.contact-btn {
	background-color: #fff;
	line-height: 50rpx;
	font-size: 20rpx;
	color: #666;
	margin: 0;
	padding: 0;

	&::after {
		border: none;
	}
}

.pop-box {
	width: 300px;

	.title {
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
	}

	.bar-code {
		width: 260px;
		height: 70px;
		padding: 0;
		margin-bottom: 20px;
	}

	.qr-code {
		width: 160px;
		height: 160px;
		padding: 0;
	}

	.close-btn {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 24rpx;
		border-top: 1px solid #ccc;
		box-sizing: border-box;
		margin-top: 10px;
	}
}
</style>
