<template>
	<view class="create-order-container">
		<!-- 有地址 -->
		<view v-if="address.id" class="address-item flex-box" @click="chooseAddress">
			<view class="flex-item-1">
				<view class="flex-box">
					<view class="username">{{ address.consignee }}</view>
					<view class="mobile">{{ address.mobile }}</view>
					<view class="default" v-if="address.isDefault">默认</view>
				</view>
				<view class="address-text">
					{{ `${address.province}${address.city}${address.district}${address.detailAddress}` }}</view
				>
			</view>
			<view class="flex-box-v flex-v-center">
				<uni-icons type="arrowright" size="20" color="#666" />
			</view>
		</view>
		<!-- 地址无 -->
		<view v-else class="address-item flex-box flex-v-center flex-h-between" @click="chooseAddress">
			<view class="flex-item-1 empty-address-tips"> 暂无地址，去新建 </view>
			<uni-icons type="arrowright" size="20" color="#666" />
		</view>
		<!-- 订单商品 -->
		<view class="goods-list">
			<block v-for="item in cartGoodsList" :key="item.id">
				<view class="cart-goodsitem flex-box flex-v-center flex-h-between">
					<image :src="imgIp + item.goodsImgAddress" class="goods-img"></image>
					<view class="goods-right">
						<view class="goodsname over-dian">{{ item.goodsName }}</view>
						<view class="goods-cent flex-box flex-h-between">
							<view class="sizename over-dian">{{ item.goodsSpec }}</view>
						</view>
						<view class="goods-bot flex-box flex-h-between">
							<view class="goods-price">￥{{ item.salePrice }}</view>
							<view class="count flex-box flex-v-center">
								<view class="goods-num">×{{ item.goodsNum }}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 订单结算 -->
		<view class="order-bot">
			<view class="title" style="margin:20rpx 0 40rpx 0;">价格明细</view>
			<view class="flex-box flex-v-center flex-h-between">
				<span>商品总价</span>
				<span>￥{{ orderInfo.goodsAmount }}</span>
			</view>
			<view class="flex-box color-666 flex-v-center flex-h-between">
				<span>运费</span>
				<span>￥{{ orderInfo.freightAmount }}</span>
			</view>
			<view class="flex-box color-666 flex-v-center flex-h-between">
				<span>优惠</span>
				<!-- <picker @change="bindPickerChange" mode="selector" :value="index" :range="couponList" range-key='voucherName'> -->
				<view class="flex-box color-666 flex-v-center flex-h-between" @click="showPopup">
					<span>{{
						orderInfo.discount ? '-' + orderInfo.discount : Nullcoupon ? '暂无优惠券可用' : '不使用优惠券'
					}}</span
					><uni-icons type="arrowright" size="20"></uni-icons>
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
				<view class="pay-top color-666" style="font-size:24rpx">共计{{ orderInfo.totalGoods }}件</view>
				<view class="pay-bottom">合计￥{{ orderInfo.orderPaidAmount }}</view>
			</view>
			<button class="alibutton btn-width" :disabled="aliDisabled" @click="clickToPay">去支付</button>
		</view>
	</view>
</template>
<script>
import pageUrl from '@/config/page';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			orderInfo: {
				goodsAmount: '1599.00', // 商品总价
				discount: '200.00', // 优惠价格
				totalGoods: 3, // 商品数量
				orderPaidAmount: '1399.00', // 支付金额
				freightAmount: 0 // 运费
			},
			defaultAddress: {
				id: 1,
				consignee: '路先生',
				mobile: '13112341234',
				isDefault: 1,
				province: '上海市',
				city: '上海市',
				district: '浦东新区',
				detailAddress: '世纪大道2001号'
			},
			cartGoodsList: [
				{
					id: 1,
					goodsName: '测试商品1，名字超长测试测试测试测试测试',
					marketPrice: '599.00',
					salePrice: '342.00',
					goodsNum: 1,
					goodsSpec: '黑色，XXL'
				},
				{
					id: 2,
					goodsName: '测试商品2，名字超长测试测试测试测试测试',
					marketPrice: '499.00',
					salePrice: '299.00',
					goodsNum: 1,
					goodsSpec: '藏青色，XXL'
				},
				{
					id: 3,
					goodsName: '测试商品3，名字超长测试测试测试测试测试',
					marketPrice: '459.00',
					salePrice: '399.00',
					goodsNum: 1,
					goodsSpec: '灰色，XXL'
				},
				{
					id: 4,
					goodsName: '测试商品4，名字超长测试测试测试测试测试',
					marketPrice: '359.00',
					salePrice: '299.00',
					goodsNum: 1,
					goodsSpec: '白色，XXL'
				}
			],
			selectedCoupon: '',
			Nullcoupon: true,
			voucherSubId: '',
			FromOrderDetail: {},
			freightAmount: '',
			imgIp: '',

			couponList: [],
			aliDisabled: false,
			fromPage: 'cart',
			couponForm: {
				memberId: '',
				voucherStatus: 1
			}
		};
	},
	computed: {
		...mapState({ selectAddress: state => state.address }),
		address() {
			return this.selectAddress || this.defaultAddress;
		}
	},
	methods: {
		// 选择地址
		chooseAddress() {
			this.pushUrl('/pages/address/index?selectMode=true');
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

		// 确认弹窗
		onConfirmCoupon() {
			this.hidePopup();
		},

		// 支付
		clickToPay() {
			if (this.address && this.address.id) {
				this.pushUrl(pageUrl.payResult);
			} else {
				this.tips('收货地址不可为空');
			}
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
.create-order-container {
	padding: 0;
	.address-item {
		padding: 32rpx 26rpx;
		background-color: #fff;
		border-radius: 10rpx;
		margin-bottom: 20rpx;

		.edit-icon {
			margin-top: 22rpx;
			width: 100rpx;
			height: 32rpx;
			padding: 6rpx;
		}
		.username,
		.mobile {
			font-size: 28rpx;
			font-weight: 500;
			color: #333;
		}
		.username {
			padding-right: 52rpx;
		}
		.mobile {
			padding-right: 20rpx;
		}
		.default {
			height: 30rpx;
			line-height: 30rpx;
			padding: 0 6rpx;
			border-radius: 6rpx;
			background-color: #ff4554;
			color: #fff;
			font-size: 20rpx;
			margin: 4rpx;
		}
		.address-text {
			margin-top: 28rpx;
			font-size: 22rpx;
			line-height: 22rpx;
			color: #4f5052;
			white-space: normal;
			word-break: break-all;
			line-height: 1.3;
		}

		.empty-address-tips {
			font-size: 28rpx;
			padding: 10rpx 0;
		}
	}
	.goods-list {
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
			.goods-img {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
				overflow: hidden;
				background-color: #eee;
			}
			.goods-right {
				width: 500rpx;
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
				font-size: 26rpx;
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
					.goods-num {
						display: inline-block;
						line-height: 38rpx;
						text-align: center;
						font-size: 26rpx;
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
	height: 120rpx;
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
		height: 80rpx;
		line-height: 80rpx;
		margin: 0;
		text-align: center;
		background: #000000;
		border-radius: 50rpx;
		color: #fff;
		font-size: 28rpx;
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
.outbox {
	width: 690rpx;
	margin: 0 auto;
	background: #fff;
	position: relative;
	overflow: hidden;
}
</style>
