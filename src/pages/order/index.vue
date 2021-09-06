<template>
	<view class="member-order-list-frame">
		<view class="order-tab flex-box">
			<view @click="changeStatus(-1)" :class="{ active: params.orderStatus == -1 }">全部</view>
			<view @click="changeStatus(1)" :class="{ active: params.orderStatus == 1 }">待付款</view>
			<view @click="changeStatus(2)" :class="{ active: params.orderStatus == 2 }">待发货</view>
			<view @click="changeStatus(3)" :class="{ active: params.orderStatus == 3 }">待收货</view>
			<view @click="changeStatus(4)" :class="{ active: params.orderStatus == 4 }">已收货</view>
		</view>
		<view
			class="order-item"
			v-for="orderItem in orderList"
			:key="orderItem.orderSn"
			@click="toDetail(orderItem.orderSn)"
		>
			<view class="item-title">
				<view>{{ orderItem.orderSn }}</view>
				<view>{{ orderStatusList[orderItem.orderStatus] }}</view>
			</view>
			<view
				class="item-content flex-box"
				:class="{ noborder: goodsIndex == 0 }"
				v-for="(goodsItem, goodsIndex) in orderItem.goodsList"
				:key="goodsIndex"
			>
				<image
					class="goods-image flex-shrink-0"
					@tap.stop="toGoodsDetail(goodsItem)"
					:src="getImgUrl(goodsItem.goodsUrl)"
				/>
				<view class="item-name-prop">
					<view class="item-goodsName">
						<view class="item-goodsGift" v-if="goodsItem.extensionCode == 'gift'">赠品</view>
						{{ goodsItem.goodsName }}
					</view>
					<view class="item-goodsProp flex-box flex-wrap">
						<view class="item-goodsProp" v-for="(propitem, index) of goodsItem.showProps" :key="index">
							{{ propitem + (goodsItem.showProps[index + 1] ? '，' : '') }}
						</view>
					</view>
				</view>
				<view class="item-price-num">
					<view class="item-goodsPrice flex-box"
						><view>￥</view> {{ (goodsItem.goodsPrice + '').split('.')[0]
						}}<view>{{ '.' + ((goodsItem.goodsPrice + '').split('.')[1] || '00') }}</view></view
					>
					<view class="item-goodsNum">{{ '×' + goodsItem.goodsNum }}</view>
				</view>
			</view>
			<view class="item-prise">
				<view class="item-totalfee"
					>总价: <view>￥</view> {{ (numFilter(orderItem.goodsAmount) + '').split('.')[0]
					}}<view>{{ '.' + ((numFilter(orderItem.goodsAmount) + '').split('.')[1] || '00') }}</view></view
				>
				<view class="item-discount"
					>优惠: <view>￥</view> {{ (numFilter(orderItem.discount) + '').split('.')[0]
					}}<view>{{ '.' + ((numFilter(orderItem.discount) + '').split('.')[1] || '00') }}</view></view
				>
				<view v-if="orderItem.integralMoney" class="item-discount"
					>积分抵扣: <view>￥</view> {{ (numFilter(orderItem.integralMoney) + '').split('.')[0]
					}}<view>{{ '.' + ((numFilter(orderItem.integralMoney) + '').split('.')[1] || '00') }}</view></view
				>
				<view v-if="orderItem.shippingTotalFee" class="item-discount"
					>运费: <view>￥</view> {{ (numFilter(orderItem.shippingTotalFee) + '').split('.')[0]
					}}<view>{{
						'.' + ((numFilter(orderItem.shippingTotalFee) + '').split('.')[1] || '00')
					}}</view></view
				>
			</view>
			<view class="item-showPrice"
				>在线支付: <view>￥</view> {{ (numFilter(orderItem.showPrice) + '').split('.')[0]
				}}<view>{{ '.' + ((numFilter(orderItem.showPrice) + '').split('.')[1] || '00') }}</view></view
			>
			<view class="item-btn" @tap.stop="() => {}" v-if="!noButton">
				<view
					v-if="orderItem.totalOrderStatus == 1 && orderItem.source == sourceFrom"
					class="toPay"
					@click="toPay(orderItem.orderSn)"
					>去付款</view
				>
				<view v-if="orderItem.totalOrderStatus == 1" class="cancle" @click="openCancelPopup(orderItem.orderSn)"
					>取消订单</view
				>
				<!-- <view v-if="orderItem.totalOrderStatus > 1 && orderItem.totalOrderStatus < 5 && orderItem.isCancel != 1" class="cancle" @click="toafterSale(orderItem)">售后申请</view> -->
				<view v-if="orderItem.totalOrderStatus == 3" class="toPay" @click="toConfirmInvoice(orderItem.orderSn)"
					>确认收货</view
				>
				<view v-if="orderItem.shipStatus > 1" class="cancle" @click="toLogistics(orderItem.orderSn)"
					>物流查询</view
				>
				<view
					v-if="orderItem.totalOrderStatus > 1"
					class="toPay"
					@click="buyAgain(orderItem.showOrderGoodsList)"
					>再来一单</view
				>
			</view>
		</view>
		<!-- 空提示 -->
		<view v-if="orderList.length == 0" class="empty-tips flex-box-v flex-v-center flex-h-center">
			<view class="tips">当前列表为空！</view>
		</view>
	</view>
</template>
<script>
import config from '@/config';
import PlatformService from '@/services/common/platformService';
export default {
	data() {
		return {
			orderList: [
				{
					orderSn: '202109060001',
					orderStatus: 1,
					goodsList: [
						{
							goodsName: '测试商品1',
							showProps: ['黑色', 'XXL'],
							goodsPrice: 259.99,
							goodsNum: 2
						}
					],
					goodsAmount: 519.98,
					discount: 19.98,
					showPrice: 500
				}
			],
			orderTotal: 0,
			params: {
				orderStatus: -1, // 订单状态1为待付款，2为待发货，3为待收货，4为已收货，5为待评价，6为已取消,
				pageNum: 1,
				pageSize: 10
			},
			orderStatusList: {
				1: '待付款',
				2: '待发货',
				3: '待收货',
				4: '已收货',
				6: '已取消'
			}
		};
	},
	onLoad(option) {
		this.params.orderStatus = option.orderStatus || -1;
		// this.fetchOrderList();
	},
	onShow() {},
	onReachBottom: function() {
		// 页面滚动到底部的事件
		this.handleScroll();
	},
	computed: {
		numFilter() {
			return value => {
				// 截取当前数据到小数点后两位
				let realVal = Math.round(value * 100) / 100;
				return realVal.toFixed(2);
			};
		},
		getImgUrl() {
			return value => {
				let url = config.imageDomain + value;
				return url;
			};
		}
	},
	methods: {
		// 改变选中状态
		changeStatus(orderStatus) {
			if (this.orderStatus == orderStatus) return;
			this.orderStatus = orderStatus;
			this.params.orderStatus = orderStatus;
			this.params.pageNum = 1;
			this.fetchOrderList();
		},
		async fetchOrderList() {
			// 接口获取商品列表
		},

		//跳转详情
		toDetail(orderSn) {
			let pageUrl = '/pages/order/detail?orderSn=' + orderSn;
			this.pushUrl(pageUrl);
		},

		//跳转物流信息
		toLogistics(orderSn) {
			let pageUrl = '/pages/member/order/logistics?orderSn=' + orderSn;
			this.pushUrl(pageUrl);
		},

		//滚动加载
		handleScroll() {
			if (this.orderTotal <= this.orderList.length) return;
			this.params.pageNum++;
			this.fetchOrderList();
		},

		// 付款
		async toPay(orderSn) {
			// 付款接口
		},

		//确认收货
		toConfirmInvoice(orderSn) {
			// 确认收货
		},

		//订单取消
		async toCancle() {},
		//再次购买
		async buyAgain(goodsList) {
			let [success, data] = await this.addToCart(goodsList);
			if (success) {
				let page = config.pageUrl.common.createOrder;
				this.pushUrl(page, { quickBuy: 1 });
			} else {
				let msg = data.msg || '购买失败，请稍后再试';
				this.tips(msg);
			}
		},
		//加入购物车
		async addToCart(goodsList) {
			let { goodsPageService } = this;
			let params = [];
			goodsList.forEach((item, index) => {
				if (item.extensionCode == 'gift') return;
				let { goodsSn, skuSn, orderFrom, goodsNum } = item;
				let obj = { sku: skuSn, productSysCode: goodsSn, count: goodsNum, shopNumber: orderFrom };
				params.push(obj);
			});
			return goodsPageService.addToCart(1, params);
		},
		//售后申请
		toafterSale(orderItem) {
			let pageUrl = '/pages/member/afterSale/applyRefund?orderSn=' + orderItem.orderSn;
			this.pushUrl(pageUrl);
		}
	}
};
</script>
<style lang="scss" scoped>
.member-order-list-frame {
	padding: 42px 0 20px;
	.order-tab {
		position: fixed;
		top: 0;
		width: 100%;
		background-color: #fff;
		justify-content: space-around;
		z-index: 999;
		> view {
			height: 74rpx;
			line-height: 74rpx;
			font-size: 28rpx;
		}
		.active {
			border-bottom: 3px solid #fa3534;
			color: #fa3534;
		}
	}
	.order-item {
		background-color: #fff;
		border-radius: 8rpx;
		margin: 20rpx;
		padding: 20rpx 0;
		> view {
			padding: 0 20rpx;
		}
		.item-title {
			display: flex;
			justify-content: space-between;
			padding: 0 20rpx 10rpx;
			line-height: 60rpx;
			font-size: 28rpx;
			view:nth-child(2) {
				color: #ff350d;
			}
		}
		.item-content {
			padding: 20rpx 0;
			border-top: 1px solid #e4e4e4;
			margin: 0 20rpx;
			.goods-image {
				width: 200rpx;
				height: 200rpx;
				background-color: #f5f5f5;
			}
			.item-name-prop {
				width: 100%;
				margin: 0 16rpx;
				.item-goodsName {
					font-size: 28rpx;
					height: 80rpx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
					.item-goodsGift {
						margin-right: 10rpx;
						font-size: 24rpx;
						line-height: 28rpx;
						padding: 0 6rpx;
						display: inline;
						color: #fff;
						background: #ff5611;
						border-radius: 8rpx;
					}
				}
				.item-goodsProp {
					font-size: 24rpx;
					color: #ccccca;
				}
			}

			.item-price-num {
				.item-goodsPrice {
					color: #ff350d;
					font-size: 28rpx;
					font-weight: bold;
					view {
						font-size: 24rpx;
						line-height: 40rpx;
					}
				}
				.item-goodsNum {
					text-align: right;
					color: #9a9ca1;
					font-size: 28rpx;
				}
			}
		}
		.noborder {
			border-top: none;
		}
		.item-prise {
			display: flex;
			justify-content: flex-end;
			flex-wrap: wrap;
			.item-totalfee,
			.item-discount {
				margin-left: 10rpx;
				color: #949499;
				display: flex;
				font-size: 28rpx;
				view {
					font-size: 24rpx;
					line-height: 40rpx;
				}
			}
		}
		.item-showPrice {
			color: #333;
			display: flex;
			font-size: 28rpx;
			font-weight: bold;
			justify-content: flex-end;
			view {
				font-size: 24rpx;
				line-height: 40rpx;
			}
		}
		.item-integral {
			color: #949499;
		}
	}
	.item-btn {
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-end;
		view {
			margin-left: 20rpx;
			font-size: 26rpx;
			width: 164rpx;
			line-height: 50rpx;
			text-align: center;
			border: 1px solid #ccc;
			border-radius: 30rpx;
			text-align: center;
		}
		.toPay {
			color: #fa3534;
			border-color: #fa3534;
		}
		.wuliu {
			color: #eb6a1b;
			border-color: #eb6a1b;
		}
	}
	.popup_content {
		position: relative;
		background: #fff;
		padding: 15px 15px 25px;
		font-size: 14px;
		border-radius: 10px 10px 0 0;
		.popup-title {
			text-align: center;
			font-weight: bold;
			font-size: 16px;
		}
		.popup-close {
			position: absolute;
			top: 11px;
			right: 15px;
			font-size: 18px;
		}
		.popup-cancleList-title,
		.popup-remark-title {
			margin-top: 10px;
			font-size: 14px;
			font-weight: bold;
		}
		.canale-remark {
			margin-top: 10px;
			width: 100%;
			border: 1px solid #ccc;
			height: 100px;
			font-size: 14px;
		}
		.uni-list {
			margin-top: 10px;
			line-height: 30px;
			.reason-name {
				margin-left: 5px;
			}
		}
		.toCancle {
			background: #ff3900;
			line-height: 30px;
			border-radius: 15px;
			text-align: center;
			color: #fff;
			margin-top: 15px;
		}
	}
}
.empty-tips {
	padding-top: 218rpx;
	.empty-img {
		width: 92rpx;
	}
	.tips {
		margin: 28rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #999;
		text-align: center;
	}
}
</style>
