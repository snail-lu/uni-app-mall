<template>
	<view class="member-container">
		<view class="header flex-box flex-v-center">
			<view class="avatar-box">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<view class="username-box">
				<open-data type="userNickName"></open-data>
			</view>
			<view style="position: absolute;right: 40rpx;top: 126rpx;">
				<view @click="toPersonal">
					<uni-icons type="gear-filled" size="25" color="#fff" />
				</view>
			</view>
		</view>
		<view class="block">
			<uni-list class="title" :border="false">
				<uni-list-item
					title="我的订单"
					link
					to="/pages/member/order/index"
					rightText="查看全部"
				></uni-list-item>
			</uni-list>
			<view class="flex-box order">
				<view style="position: relative;" class="flex-item-1">
					<view class="item" @click="pushUrl('/pages/member/order/index?orderStatus=1')">
						<uni-badge class="num_b" size="small" type="error" text="10"></uni-badge>
						<uni-icons type="cart" size="25" color="#666" />
						<view>待付款</view>
					</view>
				</view>
				<view style="position: relative;" class="flex-item-1">
					<view class="item" @click="pushUrl('/pages/member/order/index?orderStatus=2')">
						<uni-badge class="num_b" size="small" type="error" text="8"></uni-badge>
						<uni-icons type="shop" size="25" color="#666" />
						<view>待发货</view>
					</view>
				</view>
				<view style="position: relative;" class="flex-item-1">
					<view class="item" @click="pushUrl('/pages/member/order/index?orderStatus=3')">
						<uni-badge class="num_b" size="small" type="error" text="6"></uni-badge>
						<uni-icons type="paperplane" size="25" color="#666" />
						<view>待收货</view>
					</view>
				</view>
				<view style="position: relative;" class="flex-item-1">
					<view class="item" @click="pushUrl('/pages/member/order/index?orderStatus=4')">
						<uni-badge class="num_b" size="small" type="error" text="3"></uni-badge>
						<uni-icons type="download" size="25" color="#666" />
						<view>已收货</view>
					</view>
				</view>
				<view style="position: relative;" class="flex-item-1">
					<view class="item" @click="pageNavigate()">
						<uni-badge class="num_b" size="small" type="error" text="188"></uni-badge>
						<uni-icons type="bars" size="25" color="#666" />
						<view>退款/退货</view>
					</view>
				</view>
			</view>
		</view>
		<view class="block">
			<uni-list class="title" :border="false">
				<uni-list-item title="其他服务"></uni-list-item>
			</uni-list>
			<view class="flex-box server flex-wrap">
				<view class="item" @click="pageNavigate('address')">
					<uni-icons type="location-filled" size="25" color="#666" />
					<view>收货地址</view>
				</view>
				<view class="item" @click="pageNavigate('favorites')">
					<uni-icons type="heart-filled" size="25" color="#666" />
					<view>我的收藏</view>
				</view>
				<view class="item" @click="pageNavigate('personnalInfo')">
					<uni-icons type="person-filled" size="25" color="#666" />
					<view>个人信息</view>
				</view>
				<view class="item" @click="clickToMakeCall">
					<uni-icons type="phone-filled" size="25" color="#666" />
					<view>客服</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import pageUrl from '@/config/page';
import { mapState } from 'vuex';
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
		// 打电话
		clickToMakeCall() {
			uni.makePhoneCall({
				phoneNumber: '123456' //仅为示例
			});
		}
	}
};
</script>
<style lang="scss">
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
	position: relative;
	width: 100%;
	&::before {
		position: absolute;
		content: '';
		height: 50rpx;
		width: 10rpx;
		left: 0;
		top: 20rpx;
		background: red;
		z-index: 999;
	}
}
.order,
.server {
	text-align: center;
	font-size: -30rpx;
	line-height: 50rpx;
	padding: 30rpx 0 10rpx;
}
.server {
	.item {
		width: 25%;
		margin-bottom: 30rpx;
		> view {
			line-height: 30rpx;
		}
	}
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
</style>
