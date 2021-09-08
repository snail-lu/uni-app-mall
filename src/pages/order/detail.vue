<template>
	<view class="member-order-detail-frame">
		<!-- 订单状态 -->
		<view class="detail-status">
			<!-- <uni-icons class="status-icon" type="info-filled" size="20" color="#fff"/> -->
			<view class="status-text">{{ orderStatusList[orderInfo.orderStatus] || '待发货' }}</view>
			<view class="status-info" v-if="orderInfo.orderStatus == 1"
				>剩余：{{ surplusTime.hour }} 小时 {{ surplusTime.minute }} 分 {{ surplusTime.second }}秒</view
			>
		</view>

		<!-- 收货地址 -->
		<view class="flex-box detail-address">
			<view><uni-icons class="address-icon" type="location-filled" size="25" color="#1483cb"/></view>
			<view>
				<view class="flex-box address-people">
					<view>{{ orderInfo.receiver }}</view>
					<view>{{ orderInfo.mobile }}</view>
				</view>
				<view class="flex-box address-detail">{{ orderInfo.shippingAddress }}</view>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="detail-goodsList">
			<view class="goodsList-title">商品列表</view>
			<view
				class="goods-item flex-box"
				v-for="(item, index) in orderGoodsList"
				:key="index"
				@click="toGoodsDetail(item.goodsSn)"
			>
				<view class="flex-box">
					<image :src="getImgUrl(item.goodsUrl)" class="goods-image flex-shrink-0" />
					<view class="item-goodsInfo">
						<view class="item-name-prop">
							<view class="item-goodsName">
								<view class="item-goodsGift" v-if="item.extensionCode == 'gift'">赠品</view
								>{{ item.goodsName }}
							</view>
							<view class="item-goodsProp flex-box flex-wrap">
								<view class="item-goodsProp" v-for="(propitem, index) of item.showProps" :key="index">
									{{ propitem + (item.showProps[index + 1] ? '，' : '') }}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="item-price-num">
					<view class="item-goodsPrice"
						><view>￥</view> {{ (item.goodsPrice + '').split('.')[0]
						}}<view>{{ '.' + ((item.goodsPrice + '').split('.')[1] || '00') }}</view></view
					>
					<view class="item-goodsNum">{{ '×' + item.goodsNum }}</view>
				</view>
			</view>
			<view class="goodsList-btn flex-box">
				<view class="link-item flex-box" @click="toCall">
					<view class="icon-phone"><uni-icons type="phone" size="17" color="#666"/></view>
					<view>联系客服</view>
				</view>
				<view class="link-item" @click="toHome">返回首页</view>
			</view>
		</view>
		<view class="detail-orderInfo">
			<view class="orderInfo-item">
				<view class="flex-box">
					<view>订单编号：{{ orderInfo.orderSn }}</view
					><view class="copy-btn" @click="copy(orderInfo.orderSn)">复制</view>
				</view>
				<view class="flex-box">下单时间：{{ orderInfo.createTime }} </view>
				<view class="flex-box">订单备注：{{ orderInfo.postScript || '无备注' }} </view>
				<view class="flex-box">配送方式：{{ deliveryTypeList[orderInfo.deliveryType] }} </view>
			</view>
			<view
				class="orderInfo-item"
				:class="{ 'orderInfo-item2': orderInfo.expectedShipDate }"
				v-if="orderInfo.payStatus > 0"
			>
				<view class="flex-box"
					><view>支付方式：</view><view>{{ orderInfo.paymentMethod }}</view></view
				>
				<view class="flex-box" v-if="orderInfo.payStatus > 1"
					><view>支付时间：</view><view>{{ orderInfo.orderPayTime }}</view></view
				>
				<view class="flex-box" v-if="orderInfo.expectedShipDate"
					><view>预计发货时间：</view><view>{{ orderInfo.expectedShipDate }}</view></view
				>
			</view>
		</view>
		<view class="detail-payInfo">
			<view class="payInfo-item1 flex-box">
				<view>总价：</view>
				<view class="price-wrapper"
					><view>￥</view> {{ (orderInfo.goodsAmount + '').split('.')[0]
					}}<view>{{ '.' + ((orderInfo.goodsAmount + '').split('.')[1] || '00') }}</view></view
				>
			</view>
			<view class="payInfo-item1 flex-box">
				<view>优惠：</view>
				<view class="price-wrapper"
					><view>￥</view> {{ (orderInfo.discount + '').split('.')[0]
					}}<view>{{ '.' + ((orderInfo.discount + '').split('.')[1] || '00') }}</view></view
				>
			</view>
			<view v-if="orderInfo.integralMoney" class="payInfo-item1 flex-box">
				<view>积分抵扣：</view>
				<view class="price-wrapper"
					><view>￥</view> {{ (orderInfo.integralMoney + '').split('.')[0]
					}}<view>{{ '.' + ((orderInfo.integralMoney + '').split('.')[1] || '00') }}</view></view
				>
			</view>
			<view class="payInfo-item1 flex-box">
				<view>运费：</view>
				<view class="price-wrapper"
					><view>￥</view> {{ (orderInfo.postage + '').split('.')[0]
					}}<view>{{ '.' + ((orderInfo.postage + '').split('.')[1] || '00') }}</view></view
				>
			</view>
			<view class="payInfo-item1 flex-box">
				<view>实际支付：</view>
				<view class="item-Price2"
					><view>￥</view> {{ (orderInfo.payPrice + '').split('.')[0]
					}}<view>{{ '.' + ((orderInfo.payPrice + '').split('.')[1] || '00') }}</view></view
				>
			</view>
		</view>
		<view class="detail-btn" v-if="!noButton">
			<!-- <view class="link-item" @click="toCall">
          <view class="icon-msg"><uni-icons type="headphones" size="20" color="#666"/></view>
          <view>客服</view>
        </view> -->
			<view v-if="orderInfo.payStatus == 0 && orderInfo.orderStatus == 6" class="cancle" @click="deleteOrder"
				>删除订单</view
			>
			<view v-if="orderInfo.orderStatus == 1" class="toPay" @click="toPay">去付款</view>
			<view v-if="orderInfo.orderStatus == 1" class="cancle" @click="openCancelPopup">取消订单</view>
			<view
				v-if="orderInfo.orderStatus > 1 && orderInfo.orderStatus < 5 && orderInfo.isCancel != 1"
				class="cancle"
				@click="toafterSale(orderItem)"
				>售后申请</view
			>
			<view v-if="orderInfo.orderStatus == 3" class="toPay" @click="toConfirmInvoice">确认收货</view>
			<view v-if="orderInfo.shipStatus > 1" class="cancle" @click.stop="toLogistics(orderInfo.orderSn)"
				>物流查询</view
			>
			<view v-if="orderInfo.orderStatus > 1" class="toPay" @click="buyAgain">再来一单</view>
		</view>
		<!-- 订单取消弹层 -->
		<uni-popup ref="popup_cancle" type="bottom" @touchmove.stop.prevent="moveHandle">
			<view class="popup_content">
				<view class="popup-title">取消订单</view>
				<view class="popup-close" @click="closeCancelPopup">×</view>
				<view class="popup-cancleList-title">请选择取消订单的原因</view>
				<view class="uni-list">
					<view
						class="flex-box"
						v-for="item in cancelReasonList"
						:key="item.code"
						@click="onChangeCancelReason(item.code)"
					>
						<uni-icons v-if="item.checked" type="checkbox-filled" size="20" color="#ff3900" />
						<uni-icons v-else type="circle" size="20" color="#908f93" />
						<view class="reason-name">{{ item.name }}</view>
					</view>
				</view>
				<view class="popup-remark-title">请填写备注</view>
				<textarea class="canale-remark" v-model="cancelRemark"></textarea>
				<view class="toCancle" @click="toCancle">提交</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
import config from '@/config';
import PlatformService from '@/services/common/platformService';
import { formatTimeCountdown } from '@/common/utils';
import Clipboard from 'clipboard';
export default {
	data() {
		return {
			orderInfo: {
				orderSn: '202109060001',
				orderStatus: 1,
				receiver: '路',
				mobile: '13112341234',
				shippingAddress: '上海市浦东新区世纪大道2001号',
				createTime: '2021-09-05 13:34:34',
				postScript: '尽快发货',
				goodsAmount: '779.97',
				discount: '79.97',
				postage: '0',
				payPrice: '700',
				deliveryType: 2,
				payLastTime: 143243243, // 剩余支付时间'
				shopTel: '123456'
			},
			orderGoodsList: [
				{
					goodsSn: '123456',
					goodsName: '测试商品1',
					showProps: ['黑色', 'XXL'],
					goodsPrice: 259.99,
					goodsNum: 2
				},
				{
					goodsSn: '123457',
					goodsName: '测试商品2',
					showProps: ['白色', 'XXL'],
					goodsPrice: 259.99,
					goodsNum: 1
				}
			],
			orderTotal: 0,
			orderSn: '',
			orderStatusList: {
				1: '待付款',
				2: '待发货',
				3: '待收货',
				4: '已收货',
				6: '已取消'
			},
			deliveryTypeList: {
				0: '未分配',
				1: '无需物流',
				2: '快递',
				3: '自提'
			},
			cancelReasonList: [
				{
					code: '1',
					name: '拍错了',
					checked: false
				},
				{
					code: '2',
					name: '不想要了',
					checked: false
				},
				{
					code: '3',
					name: '收货地址填写错误',
					checked: false
				}
			],
			cancelCode: '',
			cancelRemark: '',
			surplusTime: {
				hour: '00',
				minute: '00',
				second: '00'
			},
			timeSign: null, //待付款定时器
			currentTime: '',
			surplusValue: '',
			showMoreInvoice: false, //发票信息展示更多
			isShow: false,
			canToPay: true,
			noButton: false
		};
	},
	onLoad(option) {
		this.orderSn = option.orderSn;
	},
	onShow() {
		this.getOrderInfo();
	},
	onUnload: function() {
		if (this.timeSign) {
			clearInterval(this.timeSign);
			this.timeSign = null;
		}
	},
	onHide() {
		if (this.timeSign) {
			clearInterval(this.timeSign);
			this.timeSign = null;
		}
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
		async getOrderInfo() {
			// 获取订单详情

			//如果订单待支付，展示取消订单按钮和倒计时
			if (true) {
				this.countdown();
			}
		},
		//倒计时
		countdown() {
			this.surplusValue = this.orderInfo.payLastTime;
			if (this.surplusValue < 1000) {
				this.orderInfo.orderStatus = 6;
				return;
			}
			this.timeSign = setInterval(() => {
				let time = formatTimeCountdown(this.surplusValue, 'hh:mm:ss');
				let timeArr = time.split(':');
				this.surplusTime = {
					hour: timeArr[0],
					minute: timeArr[1],
					second: timeArr[2]
				};
				this.surplusValue = this.surplusValue - 1000;
				if (this.surplusValue < 1000) {
					clearInterval(this.timeSign);
					this.timeSign = null;
					this.getOrderInfo();
				}
			}, 1000);
		},

		//跳转商品详情
		toGoodsDetail(sn) {
			const url = config.pageUrl.goodsDetail;
			this.pushUrl(`${url}?code=${sn}`);
		},

		//二次付款
		async toPay() {
			if (!this.canToPay) return;
			this.canToPay = false;
			PlatformService.showLoading({ title: '支付处理中' });
			let params = {
				orderSn: this.orderInfo.orderSn
			};
			let { orderPageService } = this;
			let res = await orderPageService.getNoPayOrderInfo(params);
			if (!(res && res.paySn)) return;
			let payInfoParams = {
				orderSn: this.orderInfo.orderSn,
				channel: 2
			};
			let payRes = await orderPageService.h5OrderPayTwice(payInfoParams);
			if (payRes.isOk == 1) {
				this.tips(payRes.msg);
				return;
			}
			let { nonceStr, paySign, signType, timeStamp } = payRes;
			let payParams = {
				timeStamp: timeStamp,
				nonceStr: nonceStr,
				package: payRes['package'],
				signType: signType,
				paySign: paySign
			};
			PlatformService.requestPay(timeStamp, nonceStr, payRes['package'], signType, paySign)
				.then(() => {
					this.paySuccess();
				})
				.catch(e => {
					this.payFailure();
				});

			params.appId = config.wechatAppId;
			await PlatformService.waitWeixinJSBridge();
			if (typeof WeixinJSBridge) {
				WeixinJSBridge.invoke('getBrandWCPayRequest', params, res => {
					if (res.err_msg == 'get_brand_wcpay_request:ok') {
						this.paySuccess();
						// 使用以上方式判断前端返回,微信团队郑重提示：
						//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
					} else {
						this.payFailure();
					}
				});
			}
		},
		//支付成功
		async paySuccess(payOrderSn = '') {
			let { orderPayPageService } = this;
			let { orderSn } = this.orderInfo;
			let [success, data] = await orderPayPageService.payCallback(orderSn, payOrderSn);
			this.canToPay = true;
			PlatformService.hideLoading();
			this.tips(data.msg);
			if (success) {
				this.getOrderInfo();
			}
			console.log('pay success');
		},
		//支付失败
		async payFailure() {
			PlatformService.hideLoading();
			this.canToPay = true;
			this.tips('支付失败');
			console.log('pay failure');
		},
		//跳转物流信息
		toLogistics(orderSn) {
			let pageUrl = '/pages/member/order/package?orderSn=' + orderSn;
			this.pushUrl(pageUrl);
		},
		//确认收货
		toConfirmInvoice() {
			let _this = this;
			uni.showModal({
				title: '提示',
				content: '确认收货？',
				success: async res => {
					if (res.confirm) {
						let params = {
							orderSn: _this.orderInfo.orderSn
						};
						let { orderPageService } = _this;
						let res = await orderPageService.confirmInvoice(params);
						if (res === true) {
							_this.tips('收货成功');
							_this.getOrderInfo();
						}
						console.log(res, 'res');
					} else if (res.cancel) {
					}
				}
			});
		},
		//获取取消原因
		async getCancelReason() {
			let params = {
				style: 1,
				moduleId: 1
			};
			let { orderPageService } = this;
			let res = await orderPageService.getOrderCustomDefineInfo(params);
			res.forEach(item => {
				item.checked = false;
			});
			this.cancaleReasonList = res;
		},

		//切换取消原因
		onChangeCancelReason(value) {
			const { cancelReasonList } = this;
			let checkedValue = Number(value) == this.cancelCode ? '' : Number(value);
			cancelReasonList.forEach((item, index) => {
				if (item.code != checkedValue) {
					this.$set(cancelReasonList[index], 'checked', false);
				} else {
					this.$set(cancelReasonList[index], 'checked', true);
				}
			});
			this.cancelCode = checkedValue;
		},
		//打开订单取消弹框
		openCancelPopup() {
			this.$refs.popup_cancle.open();
		},

		//关闭订单取消弹框
		closeCancelPopup() {
			this.$refs.popup_cancle.close();
		},
		//订单取消
		async toCancle() {
			if (!this.cancelCode) {
				this.tips('请先选择取消原因');
				return;
			}
			let params = {
				orderSn: this.orderInfo.orderSn,
				// fromId: '',
				cancelCode: this.cancelCode,
				remark: this.cancelRemark
			};
			let { orderPageService } = this;
			let res = await orderPageService.cancelOrder(params);
			if (res.isOk == '0') {
				this.tips(res.msg);
				this.closeCancelPopup();
				this.getOrderInfo();
			}
		},
		//再次购买
		async buyAgain() {
			let [success, data] = await this.addToCart();
			if (success) {
				let page = config.pageUrl.common.createOrder;
				this.pushUrl(page, { quickBuy: 1 });
			} else {
				let msg = data.msg || '购买失败，请稍后再试';
				this.tips(msg);
			}
		},
		//加入购物车
		async addToCart() {
			let { goodsPageService } = this;
			let params = [];
			this.orderGoodsList.forEach((item, index) => {
				if (item.extensionCode == 'gift') return;
				let { goodsSn, skuSn, orderFrom, goodsNum } = item;
				let obj = { sku: skuSn, productSysCode: goodsSn, count: goodsNum, shopNumber: orderFrom };
				params.push(obj);
			});
			return goodsPageService.addToCart(1, params);
		},
		//删除订单
		deleteOrder() {
			let _this = this;
			uni.showModal({
				title: '提示',
				content: '确认删除该订单？',
				success: async res => {
					if (res.confirm) {
						let params = {
							orderSn: _this.orderInfo.orderSn
						};
						let { orderPageService } = _this;
						let res = await orderPageService.deleteMasterOrder(params);
						if (res) {
							_this.tips('删除成功');
							let pageUrl = '/pages/member/order/index?orderType=' + (this.orderInfo.orderType || 0);
							this.redirectUrl(pageUrl);
						}
					} else if (res.cancel) {
					}
				}
			});
		},
		// 联系客服
		toCall() {
			if (!this.orderInfo.shopTel) {
				this.tips('暂无客服电话');
				return;
			}
			uni.makePhoneCall({
				phoneNumber: this.orderInfo.shopTel //仅为示例
			});
		},

		//复制文本
		copy(value) {
			new Clipboard(value);
			uni.showToast({
				title: '复制成功',
				icon: 'none'
			});

			uni.setClipboardData({
				//准备复制的数据
				data: value,
				success: function(res) {
					uni.showToast({
						title: '复制成功'
					});
				}
			});
		},
		//返回首页
		toHome() {
			this.switchUrl(config.pageUrl.home);
		},
		//售后申请
		toafterSale() {
			let type = 1;
			if (this.orderInfo.orderStatus > 2) {
				type = 2;
			}
			let pageUrl = '/pages/member/afterSale/applyRefund?orderSn=' + this.orderInfo.orderSn + '&type=' + type;
			this.pushUrl(pageUrl);
		}
	}
};
</script>
<style lang="scss" scoped>
.member-order-detail-frame {
	padding-bottom: 65px;
	.flex-box {
		display: flex;
	}
	.detail-status {
		background: #ff3900;
		text-align: center;
		color: #fff;
		padding: 30rpx;
		.status-icon {
			position: relative;
			top: 4rpx;
			margin-right: 10rpx;
		}
		.status-info {
			margin-top: 20rpx;
			font-size: 28rpx;
		}
	}
	.detail-address {
		padding: 60rpx;
		background: #fff;
		align-items: center;
		border-radius: 0 0 10rpx 10rpx;
		.address-icon {
			margin-right: 24rpx;
		}
		.address-people {
			font-weight: bold;
			view {
				margin-right: 30rpx;
			}
		}
		.address-detail {
			margin-top: 10rpx;
			font-size: 28rpx;
			white-space: normal;
			word-break: break-all;
		}
	}
	.detail-goodsList {
		margin-top: 30rpx;
		background: #fff;
		padding: 30rpx 36rpx 0;
		border-radius: 10rpx 10rpx 20rpx 20rpx;
		.goodsList-title {
			font-size: 28rpx;
			line-height: 60rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		.goods-image {
			height: 200rpx;
			width: 200rpx;
			background-color: #ccc;
		}
		.goods-item {
			justify-content: space-between;
			padding: 20rpx 0;
			border-bottom: 1px solid #e4e4e4;
			.item-goodsInfo {
				width: 100%;
				font-size: 28rpx;
				margin: 0 16rpx;
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
			}
			.item-price-num {
				.item-goodsPrice {
					color: #ff350d;
					display: flex;
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
		.goodsList-btn {
			.link-item {
				font-size: 14px;
				width: 50%;
				text-align: center;
				justify-content: center;
				line-height: 80rpx;
				.icon-phone {
					margin-right: 10rpx;
				}
			}
			.link-item:nth-child(1) {
				border-right: 1px solid #e4e4e4;
			}
		}
	}
	.detail-orderInfo {
		margin-top: 20rpx;
		background: #fff;
		border-radius: 10rpx;
		font-size: 28rpx;
		padding: 0 36rpx;
		.orderInfo-item {
			padding: 30rpx 0;
			line-height: 60rpx;
			border-bottom: 1px solid #f6f6f4;
			> view {
				view:nth-child(1) {
					min-width: 160rpx;
				}
				view:nth-child(2) {
					font-weight: bold;
					white-space: normal;
					word-break: break-all;
				}
			}
			.draw-bill,
			.copy-btn {
				margin-left: 20rpx;
				font-size: 28rpx;
				padding: 0 20rpx;
				line-height: 40rpx;
				height: 40rpx;
				text-align: center;
				border: 1px solid #ccc;
				border-radius: 30rpx;
				text-align: center;
				position: relative;
				top: 4px;
			}
		}
		.orderInfo-item2 {
			> view {
				view:nth-child(1) {
					min-width: 196rpx;
				}
			}
		}
		.orderInfo-item:nth-last-child(1) {
			border: none;
		}
		.invoice-icon {
			line-height: 40rpx;
			text-align: center;
		}
	}
	.detail-payInfo {
		margin-top: 20rpx;
		padding: 30rpx 36rpx;
		background: #fff;
		border-radius: 10rpx;
		.payInfo-item1 {
			justify-content: space-between;
			// line-height: 2;
			> view {
				font-size: 28rpx;
			}
			.price-wrapper {
				display: flex;
				font-size: 28rpx;
				font-weight: bold;
				view {
					font-size: 24rpx;
					line-height: 40rpx;
				}
			}
			.item-Price2 {
				margin-left: 20prx;
				color: #ff350d;
				display: flex;
				font-size: 34rpx;
				font-weight: bold;
			}
		}
	}
	.detail-btn {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 110rpx;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid #f6f6f4;
		background: #fff;
		align-items: center;
		padding: 0 20rpx 10rpx 100rpx;
		box-sizing: border-box;
		view {
			margin-left: 20rpx;
			font-size: 26rpx;
			width: 155rpx;
			line-height: 50rpx;
			text-align: center;
			border: 1px solid #ccc;
			border-radius: 30rpx;
			text-align: center;
		}
		.link-item {
			position: absolute;
			left: 0;
			border: none;
			width: 60rpx;
			view {
				margin-left: 0rpx;
				border: none;
				line-height: 30rpx;
				width: 60rpx;
				font-size: 24rpx;
			}
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
		padding: 30rpx 30rpx 50rpx;
		font-size: 28rpx;
		border-radius: 20rpx 20rpx 0 0;
		.popup-title {
			text-align: center;
			font-weight: bold;
			font-size: 32rpx;
		}
		.popup-close {
			position: absolute;
			top: 22rpx;
			right: 30rpx;
			font-size: 36rpx;
		}
		.popup-cancleList-title,
		.popup-remark-title {
			margin-top: 20rpx;
			font-size: 28rpx;
			font-weight: bold;
		}
		.canale-remark {
			margin-top: 20rpx;
			width: 100%;
			border: 1px solid #ccc;
			height: 200rpx;
			font-size: 28rpx;
		}
		.uni-list {
			margin-top: 20rpx;
			line-height: 60rpx;
			.reason-name {
				margin-left: 10rpx;
			}
		}
		.toCancle {
			background: #ff3900;
			line-height: 60rpx;
			border-radius: 30rpx;
			text-align: center;
			color: #fff;
			margin-top: 30rpx;
		}
	}
}
</style>
