<template>
	<view class="coupon-detail-container">
		<view class="inner-wrapper">
			<view class="header flex-box-column flex-v-center flex-h-center">
				<view class="title">{{ couponInfo.name || '优惠券' }}</view>
				<view>请在结算时出示此码</view>
			</view>
			<view class="content flex-box-column flex-v-center">
				<canvas class="bar-code" canvas-id="barCanvas" />
				<canvas class="qr-code" canvas-id="qrCanvas" />
				<view class="bill-no">{{ couponInfo.billNo }}</view>
				<view class="coupon-info">
					<view class="coupon-info-item flex-box">
						<view class="label">活动方式:</view>
						<viwe class="flex-item-1">{{ couponInfo.modelworking ? couponInfo.modelworking : '-' }}</viwe>
					</view>
					<view class="coupon-info-item flex-box">
						<view class="label">有效时间:</view>
						<view class="flex-item-1" v-if="couponInfo"
							>{{ couponInfo.enableDate }} 至 {{ couponInfo.disableDate }}</view
						>
						<view class="flex-item-1" v-else>-</view>
					</view>
					<view class="flex-box">
						<view class="label">使用说明:</view>
						<view class="flex-item-1">{{
							couponInfo.directionForUse ? couponInfo.directionForUse : '-'
						}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import QR from '@/common/utils/qrcode';
import BarCode from '@/common/utils/barcode';
import PlatformService from '@/services/common/platformService';
export default {
	data() {
		return {
			couponInfo: null
		};
	},
	async onLoad(options) {
		if (options.couponNo) {
			this.couponNo = options.couponNo;
			PlatformService.showLoading({ title: '加载中...' });
			// 获取优惠券详情
			// ...

			// 绘制优惠券码
			this.createQrCode(options.couponNo, 'qrCanvas', 200, 200);
			this.createBarCode(options.couponNo, 'barCanvas', 300, 75);
			PlatformService.hideLoading();
		}
	},
	methods: {
		// 绘制二维码
		createQrCode: function(content, canvasId, cavW, cavH) {
			QR.api.draw(content, canvasId, cavW, cavH);
		},
		// 绘制条形码
		createBarCode: function(content, canvasId, cavW, cavH) {
			BarCode.code128(wx.createCanvasContext(canvasId), content, cavW, cavH);
		}
	}
};
</script>

<style lang="scss">
.coupon-detail-container {
	background-color: #f5f5f5;

	.inner-wrapper {
		margin: 20rpx;
		background: #ffffff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
		position: relative;

		&::before {
			content: '';
			display: block;
			width: 50rpx;
			height: 50rpx;
			background-color: #f5f5f5;
			border-radius: 50rpx;
			border-right: 1px solid rgba(0, 0, 0, 0.1);
			position: absolute;
			top: 205rpx;
			left: -25rpx;
		}

		&::after {
			content: '';
			display: block;
			width: 50rpx;
			height: 50rpx;
			background-color: #f5f5f5;
			border-radius: 50rpx;
			border-left: 1px solid rgba(0, 0, 0, 0.1);
			position: absolute;
			top: 205rpx;
			right: -25rpx;
		}
	}

	.header {
		height: 230rpx;
		border-bottom: 2rpx dashed #f5f5f5;
		font-size: 24rpx;

		.title {
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 18rpx;
		}
	}

	.content {
		padding-top: 56rpx;

		.bar-code {
			width: 300px;
			height: 75px;
			padding: 0;
			margin-bottom: 40rpx;
		}

		.qr-code {
			width: 200px;
			height: 200px;
			padding: 0;
		}

		.bill-no {
			font-size: 36rpx;
			font-weight: 400;
			margin-top: 28rpx;
		}

		.coupon-info {
			width: 100%;
			font-size: 24rpx;
			padding: 50rpx 60rpx;
			box-sizing: border-box;

			&-item {
				margin-bottom: 18rpx;
			}

			.label {
				margin-right: 10rpx;
			}
		}
	}
}
</style>
