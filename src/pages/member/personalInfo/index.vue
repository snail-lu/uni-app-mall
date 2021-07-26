<template>
	<view class="personalInfo-container">
		<uni-list>
			<uni-list-item title="我的账号" rightText="2143**4342"></uni-list-item>
			<uni-list-item title="姓名" rightText="山中做妖怪"></uni-list-item>
			<uni-list-item title="性别">
				<template slot="footer">
					<picker @change="bindPickerChange" :value="userInfo.gender" :range="genderArr">
						<view class="my-picker flex-box flex-h-end flex-v-center">
							<view>{{ genderArr[userInfo.gender] }}</view>
							<uni-icons type="arrowright" size="14" color="#999"></uni-icons
						></view>
					</picker>
				</template>
			</uni-list-item>
			<uni-list-item title="出生日期">
				<template slot="footer">
					<picker @change="bindPickerChange" :value="userInfo.birthday" mode="date">
						<view class="my-picker flex-box flex-h-end flex-v-center">
							<view>{{ userInfo.birthday }}</view>
							<uni-icons type="arrowright" size="14" color="#999"></uni-icons>
						</view>
					</picker>
				</template>
			</uni-list-item>
			<uni-list-item title="所在城市">
				<template slot="footer">
					<picker @change="bindPickerChange" :value="userInfo.city" mode="region">
						<view class="my-picker flex-box flex-h-end flex-v-center">
							<view>{{ userInfo.city }}</view>
							<uni-icons type="arrowright" size="14" color="#999"></uni-icons>
						</view>
					</picker>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="save-btn" @click="clickToSave">保存</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			genderArr: ['男', '女'],
			userInfo: {
				gender: 0,
				birthday: '2008-08-08',
				city: '上海市'
			}
		};
	},
	methods: {
		// 保存
		clickToSave() {
			this.tips('保存成功~');
			setTimeout(() => {
				this.back();
			}, 1000);
		}
	}
};
</script>
<style lang="scss">
.personalInfo-container {
	padding-top: 20rpx;
}
.my-picker {
	width: 260rpx;
	height: 40rpx;
	font-size: 24rpx;
	color: #999;
}
.save-btn {
	width: 80%;
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 40rpx;
	background-color: #000;
	color: #fff;
	text-align: center;
	position: fixed;
	bottom: 40rpx;
	left: 10%;
}
</style>
