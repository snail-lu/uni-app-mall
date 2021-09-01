<template>
	<view class="address-container flex-box-v">
		<view class="flex-item-1 address-list">
			<view v-if="addressList.length">
				<view class="address-item flex-box" v-for="addressItem in addressList" :key="addressItem.id">
					<view class="flex-item-1" @click="selectAddressHandler(addressItem)">
						<view class="flex-box">
							<view class="username">{{ addressItem.consignee }}</view>
							<view class="mobile">{{ addressItem.mobile }}</view>
							<view class="default" v-if="addressItem.isDefault">默认</view>
						</view>
						<view class="address-text">
							{{
								`${addressItem.province}${addressItem.city}${addressItem.district}${addressItem.detailAddress}`
							}}</view
						>
					</view>
					<view class="flex-box-v flex-v-center">
						<view class="edit-icon flex-box flex-h-between">
							<uni-icons type="compose" size="20" color="#666" @click="onEdit(addressItem.id)" />
							<uni-icons type="trash" size="20" color="#666" @click="onDelete(addressItem.id)" />
						</view>
					</view>
				</view>
			</view>
			<view v-else class="empty-tips flex-box-v flex-v-center flex-h-center">
				<view class="tips">暂无收货地址</view>
			</view>
		</view>
		<view class="btn-box">
			<button type="default" class="add-btn" @click="onAdd">新建收货地址</button>
		</view>
	</view>
</template>
<script>
import pageUrl from '@/config/page';
export default {
	data() {
		return {
			selectMode: false,
			addressList: [
				{
					id: 1,
					consignee: '路先生',
					mobile: '13112341234',
					isDefault: 1,
					province: '上海市',
					city: '上海市',
					district: '浦东新区',
					detailAddress: '世纪大道2001号'
				},
				{
					id: 2,
					consignee: '张小姐',
					mobile: '15112341234',
					isDefault: 0,
					province: '上海市',
					city: '上海市',
					district: '浦东新区',
					detailAddress: '世纪大道2002号'
				}
			],
			params: {
				roleUserId: '',
				distributionRole: ''
			}
		};
	},
	onShow() {
		// this.fetchAddressList();
	},
	onLoad(options) {
		if (options.selectMode) {
			this.selectMode = true;
		}
		if (options.userId || options.distributionRole) {
			this.params.roleUserId = options.userId || '';
			this.params.distributionRole = options.distributionRole || '';
		}
	},

	methods: {
		async fetchAddressList() {
			let { addressPageService } = this;
			let addressListData = await addressPageService.getAddressList(this.params);
			this.addressList = addressListData || [];
			this.isShow = true;
		},

		// 删除地址
		async onDelete(addressId) {
			const { addressList } = this;
			let confirm = await this.confirm('确认删除改地址?');
			if (confirm) {
				this.addressList = addressList.filter(cartItem => cartItem.id !== addressId);
				this.tips('删除成功!');
			}
		},

		// 编辑地址
		onEdit(addressId) {
			let page = `${pageUrl.addressDetail}?id=${addressId}`;
			this.pushUrl(page);
		},

		onAdd() {
			this.pushUrl(pageUrl.addressDetail);
		}
	}
};
</script>
<style lang="scss">
page {
	height: 100%;
}
.address-container {
	height: 100%;
	background-color: #f5f5f5;
	padding: 40rpx 32rpx 0;
	box-sizing: border-box;

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
	}
	.btn-box {
		padding: 16rpx 30rpx;
	}
	.add-btn {
		height: 78rpx;
		line-height: 78rpx;
		color: #fff;
		border-radius: 39rpx;
		font-size: 26rpx;
		background-image: linear-gradient(to right, #fa3534, #ff712e);
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
			color: #666;
			text-align: center;
		}
	}
}
</style>
