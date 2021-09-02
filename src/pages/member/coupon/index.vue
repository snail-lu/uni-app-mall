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
		<view class="coupon-list" v-if="couponList.length > 0">
			<view class="coupon-item flex-box" v-for="(item, index) in couponList" :key="index">
				<view class="item-left">
					<view>{{ item.couponName }}</view>
					<view class="flex-box" style="align-items: baseline;">
						<view>￥</view>
						<view style="font-size: 44rpx">{{ item.couponMoney }}</view>
					</view>
					<view>{{ '满' + item.couponLimit + '元可用' }}</view>
				</view>
				<view class="item-right">
					<view>{{ item.effectTime }}</view>
					<view>至</view>
					<view>{{ item.expireTime }}</view>
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
					expireTime: '2021-09-02 23:59:59'
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
	onLoad() {},
	beforeDestroy() {},
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

			.item-left {
				width: 65%;
			}
			.item-right {
				font-size: 26rpx;
				width: 35%;
				text-align: center;
			}
		}
	}
	.empty-tips {
		height: 80%;
	}
}
</style>
