<template>
	<view class="order-box">
		<!-- 有地址 -->
		<view class="address-item" v-if="address.id">
			<view class="address-cent flex-box flex-v-center flex-h-between">
				<view class="address-left">
					<view class="address-top flex-box flex-v-center flex-h-between">
						<view class="address-name">{{ address.recevier }}</view>
						<view class="address-mobile">{{ address.recevierPhoneNumber }}</view>
					</view>
					<view class="address-bot">{{ address.recevierAddress }}</view>
				</view>
				<image
					src="/static/checkbox/right.png"
					class="right-jian"
					style="margin-left:20rpx"
					@click="goAddress"
				></image>
			</view>
		</view>
		<!-- 地址无 -->
		<view class="address-item" v-else>
			<view class="address-k">
				<view class="address-k-text" style="font-size:26rpx;color:#666">暂无地址</view>
				<view class="address-k-bot flex-box flex-v-center" @click="goAddress"
					><span>请新建收货地址</span><image src="/static/checkbox/right.png" class="right-jian"></image
				></view>
			</view>
		</view>
		<!-- 订单商品 -->
		<view class="goodsList">
			<block v-for="item in cartGoods.goodsList" :key="item.id">
				<view class="cart-goodsitem flex-box flex-v-center flex-h-between">
					<image :src="imgIp + item.goodsImgAddress" class="goodsimg"></image>
					<view class="goods-right">
						<view class="goodsname over-dian">{{ item.goodsName }}</view>
						<view class="goods-cent flex-box flex-h-between">
							<view class="sizename over-dian">尺寸：{{ item.goodsSize }}</view>
							<view class="codename over-dian">颜色：{{ item.goodsColor }}</view>
						</view>
						<view class="goods-bot flex-box flex-h-between">
							<view class="goods-price">￥{{ item.goodsPrice }}</view>
							<view class="count flex-box flex-v-center">
								<span class="input-num">×{{ item.goodsQuantity }}</span>
							</view>
						</view>
					</view>
				</view>
				<view class="outbox">
					<uni-collapse id="alicoll" v-model="value">
						<uni-collapse-item name="key1" title="定制详情">
							<view class="detail-box flex-box flex-v-center" style="flex-wrap:wrap;">
								<view
									class="detail-item"
									style="width:50%"
									v-for="DotItem in item.goodsPartSubDtoOtherList"
									:key="DotItem.id"
									>{{ DotItem.goodsPartName }}:{{ DotItem.goodsPartsDescribe }}</view
								>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</view>
			</block>
			<!-- <view class="redtip">注：订单支付成功之后不支持取消订单</view> -->
		</view>
		<!-- 订单结算 -->
		<view class="order-bot">
			<view class="title" style="margin:20rpx 0 40rpx 0;">价格明细</view>
			<view class="flex-box flex-v-center flex-h-between">
				<span>商品总价</span>
				<span>￥{{ goodsAmount }}</span>
			</view>
			<view class="flex-box color-666 flex-v-center flex-h-between" v-if="freightAmount">
				<span>运费</span>
				<span>￥{{ freightAmount }}</span>
			</view>
			<view class="flex-box color-666 flex-v-center flex-h-between">
				<span>优惠</span>
				<!-- <picker @change="bindPickerChange" mode="selector" :value="index" :range="couponList" range-key='voucherName'> -->
				<view class="flex-box color-666 flex-v-center flex-h-between" @click="showPopup">
					<span>{{ reducePrice ? '-' + reducePrice : Nullcoupon ? '暂无优惠券可用' : '不使用优惠券' }}</span
					><image src="/static/checkbox/right.png" class="rightimg"></image>
				</view>
				<!-- </picker> -->
			</view>
		</view>
		<!-- 商品属性弹窗 -->
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="popup-box">
				<view class="header flex-box flex-h-between flex-v-center">
					<viwe>请选择您的优惠券</viwe>
					<view @click="onConfirmCoupon">确定</view>
				</view>
				<scroll-view class="size-list" scroll-y="true">
					<view
						v-for="coupon in couponList"
						:key="coupon.id"
						:class="[
							'size-item flex-box flex-h-between flex-v-center',
							selectedCoupon == coupon.voucherSubId ? 'size-item-selected' : '',
							!coupon.recommended ? 'size-item-disabled' : ''
						]"
						@click="clickToSelectCoupon(coupon)"
					>
						<image
							:src="
								selectedCoupon == coupon.voucherSubId
									? '/static/checkbox/address-active.png'
									: '/static/checkbox/address-check.png'
							"
							class="add-check"
						></image>
						<view
							class="couponItem flex-box flex-h-between flex-v-center"
							style="width:100%"
							v-if="coupon.voucherName"
						>
							<view class="coupon-left">
								<view class="coupon-top">{{
									coupon.voucherInfoDto.voucherType == '2'
										? coupon.voucherInfoDto.discount + '折'
										: '￥' + coupon.voucherInfoDto.voucherAmount
								}}</view>
								<view class="coupon-bottom" v-if="coupon.voucherInfoDto.voucherType == '2'">{{
									'满' + coupon.voucherInfoDto.initialAmount + '元'
								}}</view>
								<view class="coupon-bottom" v-if="coupon.voucherInfoDto.voucherType == '1'">{{
									'满' +
										coupon.voucherInfoDto.initialAmount +
										'减' +
										coupon.voucherInfoDto.deductAmount
								}}</view>
								<view class="coupon-bottom" v-if="coupon.voucherInfoDto.voucherType == '3'">{{
									'每' +
										coupon.voucherInfoDto.initialAmount +
										'减' +
										coupon.voucherInfoDto.deductAmount
								}}</view>
							</view>
							<view class="coupon-right" v-if="!coupon.recommended">
								暂不可用
							</view>
						</view>
						<view class="couponItem" style="width:100%" v-else>
							<view class="coupon-top">不使用优惠券</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<!-- 底部付款 -->
		<view class="pay-box flex-box flex-v-center flex-h-between">
			<view class="pay-left">
				<view class="pay-top color-666" style="font-size:24rpx">共计{{ cartGoods.goodsList.length }}件</view>
				<view class="pay-bottom">合计￥{{ orderPaidAmount }}</view>
			</view>
			<button class="alibutton btn-width" :disabled="aliDisabled" @click="addorder">立即付款</button>
		</view>
	</view>
</template>
<script>
import PlatformService from '@/services/common/platformService.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			address: {
				// name:'czl',
				// mobile:'19825215151',
				// address:'公司官方建安施工发稿时间发噶几十个发健康公司法施工法官法借古讽今案高发'
			},
			cartGoods: [],
			reducePrice: 0,
			selectedCoupon: '',
			Nullcoupon: true,
			voucherSubId: '',
			FromOrderDetail: {},
			freightAmount: '',
			imgIp: '',
			goodsAmount: '',
			orderPaidAmount: '',
			couponList: [],
			aliDisabled: false,
			fromPage: 'cart',
			couponForm: {
				memberId: PlatformService.getStorageSync('userInfo').id,
				voucherStatus: 1
			}
		};
	},
	computed: {
		...mapState({
			cartNum: state => state.cartNum
		})
	},
	methods: {
		navigateTo() {
			PlatformService.pushUrl('/pages/order/payComplete');
		},
		goAddress() {
			PlatformService.pushUrl('/pages/address/index?page=order');
		},
		// 显示弹窗
		showPopup() {
			if (!this.Nullcoupon) {
				this.$refs.popup.open();
			} else {
				uni.showToast({
					title: '暂无可使用的优惠券',
					icon: 'none'
				});
			}
		},

		// 隐藏弹窗
		hidePopup() {
			this.$refs.popup.close();
		},
		onConfirmCoupon() {
			this.hidePopup();
		}
	},
	onShow() {
		// 监听地址页返回
		this.imgIp = this.DOMAIN;
		uni.$on('handClickItem', res => {
			console.log(res, '1111');
			this.address = res.data;
			// 清除监听
			uni.$off('handClickItem');
		});
	},
	onLoad(options) {
		console.log(options);
	}
};
</script>
<style lang="scss">
page {
	height: calc(100%-240rpx);
	height: -webkit-calc(100% - 240rpx);
	height: calc(100% - 240rpx);
	background-color: #f8f8f8;
}
.add-check {
	width: 42rpx;
	height: 42rpx;
	margin-right: 50rpx;
}
.popup-box {
	.header {
		padding: 40rpx;
		border-bottom: 2rpx solid #eee;
	}

	.size-list {
		height: 700rpx;
		overflow-y: auto;
	}

	.size-item {
		padding: 80rpx 40rpx;
		border-bottom: 1px solid #eee;
		font-size: 28rpx;
		color: #171718;
		&:last-child {
			border-bottom: none;
		}
		&-selected {
			color: #000;
			font-weight: bold;
		}
		&-disabled {
			color: rgba(23, 23, 24, 0.44) !important;
			pointer-events: none;
		}
	}
}
.detail-box {
	padding: 0 30rpx;
}
.rightimg {
	width: 20rpx;
	height: 20rpx;
	margin-left: 15rpx;
}
.detail-item {
	text-align: center;
	margin-bottom: 10rpx;
}
.pay-box {
	position: fixed;
	left: 0;
	bottom: 0;
	padding: 0 30rpx;
	width: 690rpx;
	height: 200rpx;
	background: #ffffff;
	box-shadow: inset 0px 2px 0px 0px rgba(238, 238, 238, 1);
	.pay-bottom {
		font-size: 32rpx;
		color: #000;
	}
	.alibutton {
		border: none;
		justify-content: center;
		width: 360rpx;
		height: 100rpx;
		line-height: 100rpx;
		margin: 0;
		text-align: center;
		background: #000000;
		border-radius: 50rpx;
		color: #fff;
		font-size: 36rpx;
		margin-left: 40rpx;
	}
}
.order-bot {
	padding: 30rpx 20rpx;
	background: #ffffff;
	margin-top: 30rpx;
	padding-bottom: 220rpx;
	font-size: 28rpx;
	view {
		margin-bottom: 20rpx;
	}
}
.detail-item {
	line-height: 34rpx;
	font-size: 24rpx;
	color: #666;
}
.address-k-bot {
	font-size: 26rpx;
	color: #000;
}
.right-jian {
	width: 30rpx;
	height: 30rpx;
	margin-left: 6rpx;
}
.redtip {
	font-size: 28rpx;
	color: #e82a2a;
}
.over-dian {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.color-666 {
	color: #666;
}
#alicoll .uni-collapse-cell.uni-collapse-cell--open {
	background-color: #fff;
}
#alicoll .uni-collapse-cell {
	border-color: #fff;
}
#alicoll .uni-collapse-cell__title {
	background-color: #fff;
	padding: 0;
}
.outbox {
	width: 690rpx;
	margin: 0 auto;
	background: #fff;
	position: relative;
	overflow: hidden;
}
.order-box {
	padding: 0;
	.address-item {
		padding: 40rpx 30rpx;
		background: #fff;
	}
	.address-cent .address-left {
		flex: 1;
		.address-top {
			.address-name {
				color: #000;
				font-size: 32rpx;
			}
			.address-mobile {
				color: #666;
				font-size: 28rpx;
			}
		}
		.address-bot {
			font-size: 26rpx;
			line-height: 44rpx;
			margin-top: 20rpx;
		}
	}
	.goodsList {
		margin-top: 30rpx;
		padding: 20rpx 30rpx;
		background: #fff;
		.redtip {
			padding: 20rpx 20rpx 40rpx 20rpx;
			font-size: 28rpx;
			color: #e82a2a;
		}
		.cart-goodsitem {
			height: 216rpx;
			background: #fff;
			border-bottom: solid #eee 1rpx;
			.checkimg {
				width: 35rpx;
				height: 35rpx;
			}
			.goodsimg {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
				overflow: hidden;
			}
			.goods-right {
				width: 460rpx;
			}
			.outleft {
				padding: 10rpx 20rpx;
				font-size: 26rpx;
				border-radius: 8rpx;
				background: #959697;
				color: #fff;
			}
			.goodsbot {
				font-size: 28rpx;
				color: #959697;
				margin-top: 48rpx;
			}
			.goodsname {
				width: 460rpx;
				margin-bottom: 10rpx;
			}
			.sizename {
				width: 119rpx;
				text-align: center;
				padding: 6rpx 14rpx;
				line-height: 32rpx;
				background: #f5f5f5;
				font-size: 12px;
				border-radius: 16rpx;
				color: #666;
			}
			.codename {
				width: 130rpx;
				text-align: center;
				padding: 6rpx 14rpx;
				line-height: 32rpx;
				color: #666;
				background: #f5f5f5;
				font-size: 12px;
				border-radius: 16rpx;
			}
			.goods-bot {
				margin-top: 40rpx;
				.count {
					overflow: hidden;
					margin: 0 16px 0 -20px;
					.input-num {
						display: inline-block;
						line-height: 38rpx;
						text-align: center;
						font-size: 16px;
						cursor: pointer;
						width: 60rpx;
						height: 38rpx;
						color: #333;
						border-left: 0;
						border-right: 0;
					}
				}
			}
		}
	}
}
</style>
