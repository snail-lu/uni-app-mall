<template>
	<view class="coupon-container">
		<view class="tab-box flex-box">
			<view @click="onChangeTab('1')" :class="{ 'tab-item': true, 'tab-item-active': status == '1' }"
				>待使用</view
			>
			<view @click="onChangeTab('2')" :class="{ 'tab-item': true, 'tab-item-active': status == '2' }"
				>已使用</view
			>
			<view @click="onChangeTab('3')" :class="{ 'tab-item': true, 'tab-item-active': status == '3' }"
				>已过期</view
			>
		</view>
		<view class="coupon-list" v-if="showCouponList.length > 0">
			<view
				:class="['coupon-item flex-box flex-v-center', item.status != 1 ? 'coupon-item-disabled' : '']"
				v-for="(item, index) in showCouponList"
				:key="index"
			>
				<view class="flex-box" style="align-items: baseline;">
					<view>¥</view>
					<view style="font-size: 48rpx">{{ item.couponMoney }}</view>
				</view>
				<view class="coupon-info flex-item-1">
					<view class="coupon-name">{{ item.couponName }}</view>
					<view class="coupon-desc">{{ '满' + item.couponLimit + '元可用' }}</view>
					<view class="coupon-date">{{ item.effectTime }} 至 {{ item.expireTime }}</view>
					<view
						:class="[
							'iconfont',
							item.status === 2 ? 'icon-yishiyong' : '',
							item.status === 3 ? 'icon-yiguoqi' : ''
						]"
					></view>
				</view>
			</view>
		</view>
		<view v-else class="empty-tips flex-box-column flex-h-center flex-v-center">暂无优惠券</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			couponList: [
				{
					couponName: '618满减券',
					couponMoney: 50,
					couponLimit: 199,
					effectTime: '2021-09-02 00:00:00',
					expireTime: '2021-09-02 23:59:59',
					status: 1
				},
				{
					couponName: '618满减券',
					couponMoney: 50,
					couponLimit: 199,
					effectTime: '2021-09-02 00:00:00',
					expireTime: '2021-09-02 23:59:59',
					status: 2
				},
				{
					couponName: '618满减券',
					couponMoney: 50,
					couponLimit: 199,
					effectTime: '2021-09-02 00:00:00',
					expireTime: '2021-09-02 23:59:59',
					status: 3
				}
			],
			total: 0,
			status: '1',
			params: {
				pageNo: 1,
				limit: 10,
				status: '1'
			}
		};
	},
	computed: {
		// 测试用
		showCouponList() {
			return this.couponList.filter(item => item.status == this.status);
		}
	},
	onLoad() {},
	onReachBottom: function() {
		// 页面滚动到底部的事件
		this.handleScroll();
	},
	methods: {
		async getCouponList() {
			//
		},

		// 切换tab
		onChangeTab(status) {
			this.status = status;
		},

		//滚动加载
		handleScroll() {
			const { total, params } = this;
			if (total <= params.pageNo * params.limit) return;
			this.params.pageNo++;
			this.getCouponList();
		}
	}
};
</script>
<style lang="scss">
page {
	height: 100%;
}
.coupon-container {
	height: 100%;

	.tab-box {
		background-color: #fff;
		justify-content: space-around;
		position: sticky;
		top: 0;
		left: 0;
		.tab-item {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 30rpx;
		}

		.tab-item-active {
			border-bottom: 3px solid #fa3534;
			color: #fa3534;
		}
	}

	.coupon-list {
		padding: 10px 32rpx;
		.coupon-item {
			margin-bottom: 15px;
			background: #f76c6c;
			padding: 15px;
			color: #fff;
			border-radius: 10rpx;

			&-disabled {
				background-color: #ccc;
			}
		}
		.coupon-info {
			margin-left: 20rpx;
			position: relative;
		}
		.coupon-desc {
			font-size: 24rpx;
			margin-top: 10rpx;
		}
		.coupon-date {
			font-size: 20rpx;
			margin-top: 6rpx;
		}

		.iconfont {
			position: absolute;
			top: 0;
			right: 0;
			font-size: 120rpx;
		}
	}
	.empty-tips {
		height: 80%;
	}
}
</style>
