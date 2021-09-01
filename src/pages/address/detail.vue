<template>
	<view class="address-frame flex-box-v">
		<view class="flex-item-1 address-form">
			<view class="form-item flex-box">
				<view class="label">收货人</view>
				<view class="flex-item-1">
					<input
						type="text"
						class="input1"
						:maxlength="15"
						v-model="addressInfo.consignee"
						placeholder="请输入收货人姓名"
					/>
				</view>
			</view>
			<view class="form-item flex-box">
				<view class="label">手机号码</view>
				<view class="flex-item-1">
					<input type="number" class="input1" v-model="addressInfo.mobile" placeholder="请输入收货人手机号" />
				</view>
			</view>
			<view class="form-item flex-box">
				<view class="label">所在地区</view>
				<view class="flex-item-1 flex-shrink-0 flex-box" style="overflow: hidden;">
					<picker mode="region" :value="regionValue" @change="onRegionChange" class="flex-item-1">
						<view class="input1">{{
							regionValue.length
								? `${addressInfo.province},${addressInfo.city},${addressInfo.district}`
								: '省、市、区'
						}}</view>
					</picker>
					<uni-icons class="arrow-right" color="#909399" size="18" type="arrowright" />
				</view>
			</view>
			<view class="form-item flex-box address-form-item">
				<view class="label">详细地址</view>
				<view class="flex-item-1 flex-box">
					<textarea
						class="address-input"
						placeholder="请输入详细地址"
						v-model="addressInfo.detailAddress"
						placeholder-class="address-input-placeholder"
					></textarea>
					<view class="location-box flex-box-column flex-h-center flex-v-center" @click="getMyLocation">
						<uni-icons type="location-filled" color="#ff6600" size="20" />
						<view>定位</view>
					</view>
				</view>
			</view>
			<view class="form-item flex-box">
				<view class="label">设为默认</view>
				<view class="flex-item-1 flex-box flex-v-center">
					<switch
						:checked="addressInfo.isDefault == 1 ? true : false"
						style="zoom: 0.7"
						@change="onSetDefault"
					/>
				</view>
			</view>
		</view>
		<view class="btn-box">
			<button type="default" class="save-btn" @click="onSave">
				保存
			</button>
		</view>
	</view>
</template>
<script>
import PlatformService from '@/services/common/platformService';
export default {
	data() {
		return {
			type: '',
			addressInfo: {
				consignee: '',
				mobile: '',
				isDefault: 0,
				province: '',
				city: '',
				district: '',
				detailAddress: ''
			},
			regionValue: []
		};
	},
	onLoad: function(option) {
		if (option.id) {
			PlatformService.setTitle('修改收货地址');
			// 模拟使用
			this.addressInfo = {
				id: 1,
				consignee: '路先生',
				mobile: '13112341234',
				isDefault: 1,
				province: '上海市',
				city: '上海市',
				district: '浦东新区',
				detailAddress: '浦东新区世纪大道2001号'
			};
			this.regionValue = ['上海市', '上海市', '浦东新区'];
			this.type = 'edit';
		} else {
			PlatformService.setTitle('新增收货地址');
			this.type = 'add';
		}
	},
	methods: {
		// 保存
		async onSave() {
			this.tips('保存成功');
		},
		//切换默认状态
		onSetDefault(item) {
			this.addressInfo.isDefault = item.detail.value ? 1 : 0;
		},

		//获取当前位置
		getMyLocation() {
			let _this = this;
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					if (_this.type == 'edit') {
						_this.location.longitude = _this.addInfo.longitude || res.longitude;
						_this.location.latitude = _this.addInfo.latitude || res.latitude;
					} else {
						_this.location.longitude = res.longitude;
						_this.location.latitude = res.latitude;
					}

					_this.openAddressMap();
				},
				fail: function(res) {
					console.log(res, 'res');
					_this.openSetting();
				}
			});
		},

		// 省市区切换
		onRegionChange(e) {
			console.log(e);
			const { value } = e.detail;
			this.regionValue = value;
			this.addressInfo.province = value[0];
			this.addressInfo.city = value[1];
			this.addressInfo.district = value[2];
		}
	}
};
</script>
<style lang="scss">
page {
	height: 100%;
}
.address-frame {
	background-color: #fff;
	height: 100%;
	.form-item {
		position: relative;
		padding: 26rpx 30rpx;
		border-bottom: 1px solid #e4e4e4;
		.arrow-right {
			position: absolute;
			right: 30rpx;
			top: 30rpx;
		}
	}
	.address-form-item {
		height: 100rpx;
	}
	.label {
		color: #333;
		width: 166rpx;
		font-size: 26rpx;
		line-height: 54rpx;
		padding-left: 30rpx;
	}
	.input1 {
		font-size: 26rpx;
		padding: 0;
		margin: 0;
		height: 54rpx;
		line-height: 54rpx;
		color: #333;
	}
	.address-name {
		overflow: hidden;
		text-overflow: ellipsis;
		margin-right: 30rpx;
		white-space: nowrap;
	}
	.address-input {
		font-size: 26rpx;
		padding: 0;
		margin: 0;
		line-height: 54rpx;
		height: 100rpx;
		color: #333;
		width: 100%;
	}
	.address-input-placeholder {
		line-height: 54rpx;
		font-size: 26rpx;
	}

	.location-box {
		width: 100rpx;
		font-size: 24rpx;
	}

	.input1-placeholder {
		color: #808080;
	}
	.tag {
		color: #909399;
		font-size: 26rpx;
		height: 42rpx;
		line-height: 42rpx;
		padding: 0 30rpx;
		border: 2rpx solid #c8c9cc;
		border-radius: 22rpx;
		margin-right: 20rpx;
		margin-top: 4rpx;
	}
	.activeTag {
		color: #fa3534;
		border-color: #fa3534;
	}
	.btn-box {
		padding: 16rpx 30rpx;
	}
	.save-btn {
		height: 78rpx;
		line-height: 78rpx;
		color: #fff;
		border-radius: 39rpx;
		font-size: 26rpx;
		background-image: linear-gradient(to right, #fa3534, #ff712e);
	}
	.btn-disabled {
		background-image: linear-gradient(to right, #ccc, #ccc);
	}
}
</style>
