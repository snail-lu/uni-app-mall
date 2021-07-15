<template>
	<view class="login-container flex-box-v">
		<view class="flex-item-1">
			<view class="head-background"> </view>
			<view class="form-box" v-if="loginType == 'mobile'">
				<view class="form-item flex-box">
					<text class="label">手机号</text>
					<input type="number" class="input1 flex-item-1" placeholder="请输入手机号" v-model="mobileNo" />
				</view>
				<view class="form-item flex-box flex-v-center">
					<text class="label">图片验证码</text>
					<input type="text" class="input1 flex-item-1" placeholder="请输入图片验证码" v-model="verifyCode" />
					<image @click="refreshVerifyImage" class="verify-img" :src="verifyImageUrl" mode="widthFix" />
				</view>
				<view class="form-item flex-box">
					<text class="label">短信验证码</text>
					<input type="text" class="input1 flex-item-1" placeholder="请输入短信验证码" v-model="smsCode" />
					<countdown-button
						ref="sendBtn"
						text="发送验证码"
						send-text="(#s#)重新获取"
						@buttonClick="sendMobileCode"
					/>
					<!-- <button type="default" class="send-btn">发送验证码</button> -->
				</view>
				<view class="btn-box">
					<button
						type="default"
						class="submit-btn"
						:class="{ disable: disableSubmit }"
						@click="submitFormHandler"
					>
						登录
					</button>
				</view>
			</view>
			<view class="form-box flex-box flex-h-center flex-v-center" v-else-if="loginType == 'weixin'">
				<view class="btn-box">
					<button
						type="default"
						class="submit-btn"
						open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumberHandler"
					>
						微信快捷登录
					</button>
				</view>
			</view>
			<view class="switch-login-type-btn" @click="switchLoginType">{{
				loginType == 'weixin' ? '手机验证码登录' : '微信快捷登录'
			}}</view>
		</view>
	</view>
</template>

<script>
import config from '@/config';
import apiUrl from '@/config/api';
import { trim, checkMobile } from '@/common/utils/index';
import UserService from '@/services/common/userService';
import CountdownButton from '@/common/components/countdownButton.vue';

export default {
	components: { CountdownButton },
	data() {
		return {
			loginType: 'weixin',
			verifyCode: '', // 图片验证码
			verifyKey: '', // 图片验证码key
			mobileNo: '', // 手机号
			smsCode: '', // 短信验证码
			returnUrl: ''
		};
	},
	computed: {
		verifyImageUrl() {
			let url = '';
			if (this.verifyKey) {
				url = config.baseUrl + '/' + apiUrl.common.verifyImage + '/' + this.verifyKey;
			}
			return url;
		},
		disableSubmit() {
			return !this.mobileNo || !this.smsCode || !this.verifyCode;
		}
	},
	onLoad(options) {
		// 校验session_key，若过期,调登录
		uni.checkSession({
			fail(e) {
				uni.login({ provider: 'weixin' });
			}
		});
		if (options.returnUrl) {
			this.returnUrl = decodeURIComponent(options.returnUrl);
		}
		this.refreshVerifyImage();
	},
	onUnload() {
		this.verifyKey = '';
	},
	methods: {
		// 切换登录方式
		switchLoginType() {
			const { loginType } = this;
			this.loginType = loginType === 'weixin' ? 'mobile' : 'weixin';
		},
		// 刷新图片验证码
		refreshVerifyImage() {
			this.verifyKey = Math.random();
		},

		// 手机验证码
		async sendMobileCode() {
			let { mobileNo, verifyCode } = this;
			let formData = {
				mobileNo: trim(mobileNo),
				verifyCode: trim(verifyCode)
			};
			let errMsg = this.validateForm(formData);
			if (errMsg) {
				this.tips(errMsg[0]);
				return;
			}
			let [success, data] = await UserService.sendLoginMobileCode(
				this.verifyKey,
				formData.verifyCode,
				formData.mobileNo
			);
			if (success) {
				this.$refs['sendBtn'].startCountdown();
				this.tips('短信发送成功');
			} else {
				let msg = data.msg || '短信发送失败，请稍后再试';
				this.tips(msg);
				this.refreshVerifyImage();
			}
		},

		/**
		 * 表单校验
		 * @param {Object} type 表单类型
		 * @param {Object} formData 表单数据
		 */
		validateForm(formData) {
			let errMsg = [];
			let { mobileNo, verifyCode } = formData;
			if (!mobileNo) {
				errMsg.push('手机号不能为空');
			}

			if (!checkMobile(mobileNo) && mobileNo != 'continue') {
				errMsg.push('手机号格式不正确');
			}
			if (!verifyCode) {
				errMsg.push('图片验证码不能为空');
			}
			return errMsg.length ? errMsg : null;
		},

		/**
		 * 表单提交
		 */
		async submitFormHandler() {
			let { mobileNo, verifyCode, smsCode, verifyKey } = this;
			// 禁用状态
			if (this.disableSubmit) return;

			let params = {
				mobileNo, // 手机号
				verifyKey, // 图片验证码key
				verifyCode, // 图片验证码
				smsCode // 手机验证码
			};
			let [success, data] = await UserService.login(params);
			if (success) {
				this.tips('登录成功');
			} else {
				let msg = data || '登录失败';
				this.tips(msg);
			}
		},

		/**
		 * 微信手机号授权登录
		 * @param {Object} e
		 */
		async getPhoneNumberHandler(e) {
			if (e.detail.errMsg.match(/:ok$/) != null) {
				// 获取授权加密数据
				let { encryptedData, iv } = e.detail;

				// 利用code和加密数据登录
				let [success, data] = await UserService.wxLogin({
					encryptedData,
					iv
				});
				if (success) {
					this.back();
				} else {
					this.tips(data.msg);
				}
			}
		}
	}
};
</script>

<style lang="scss">
.top-box {
	padding: 18rpx 0;
	margin: 0 28rpx;
	.login-type {
		color: #fff;
		font-size: 26rpx;
	}
}
.login-container {
	height: 100%;
	.head-background {
		height: 348rpx;
		background-color: #fa3534;
	}
	.form-box {
		width: 694rpx;
		height: 552rpx;
		margin: 0 auto;
		margin-top: -142rpx;
		border-radius: 16rpx;
		background-color: #fff;
		box-shadow: 0 0 20rpx 0 rgba(black, 0.15);
	}
	.form-item {
		border-bottom: 2rpx solid #e5e5e5;
		padding: 32rpx 0;
		margin: 0 38rpx;
		font-size: 28rpx;
		line-height: 48rpx;
		&:first-child {
			padding-top: 52rpx;
			// border-top: none;
		}
		.label {
			width: 180rpx;
			font-size: #333;
		}
		.input1 {
			height: 48rpx;
			line-height: 48rpx;
			padding: 0;
			border: none;
			font-size: 28rpx;
		}
		.verify-img {
			width: 180rpx;
			height: 48rpx;
		}
		.send-btn {
			height: 48rpx;
			line-height: 48rpx;
			padding: 0 16rpx;
			color: #fff;
			font-size: 24rpx;
			background-color: #f42424;
			&.disable {
				background-color: #ccc;
			}
		}
	}
	.btn-box {
		padding: 56rpx 38rpx;
		width: 100%;
		box-sizing: border-box;
	}
	.submit-btn {
		color: #fff;
		border: none;
		height: 78rpx;
		font-size: 28rpx;
		line-height: 78rpx;
		border-radius: 39rpx;
		background-color: #f42424;
		&:after {
			border: none;
		}
	}
	.disable {
		background-color: #fcb8b9;
	}
	.links {
		padding: 35rpx 38rpx;
		font-size: 24rpx;
		color: #818181;
	}
	.third-login {
		min-height: 160rpx;
		.login-link-box {
			padding: 32rpx 0;
		}
		.icon-placeholder {
			width: 70rpx;
			height: 70rpx;
			border-radius: 35rpx;
			background-color: #b1b1b1;
			&:first-child {
				margin-right: 74rpx;
			}
		}
		.login-link {
			width: 70rpx;
			height: 70rpx;
			padding: 0;
			border: none;
			image {
				width: 100%;
				height: 100%;
			}
			&:after {
				border: none;
			}
		}
	}
	.third-login-title {
		margin: 0 138rpx;
		.title {
			margin: 0 20rpx;
			display: inline-block;
			color: #b1b1b1;
			line-height: 40rpx;
			font-size: 24rpx;
		}
		.split-line {
			height: 20rpx;
			border-bottom: 1rpx solid #d7d7d7;
		}
	}
	.user-mobile-popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
		background-color: rgba(black, 0.5);
		.content-box {
			width: 750rpx;
			height: 500rpx;
			position: relative;
			border-radius: 12rpx 12rpx 0 0;
			background-color: #fff;
		}
		.icon-box {
			width: 60rpx;
			height: 40rpx;
			position: absolute;
			right: 0;
			top: 0;
			// background-color: #CCC;
			text-align: center;
			line-height: 40rpx;
			font-size: 40rpx;
		}
		.popup-title {
			margin-top: 20rpx;
			line-height: 40rpx;
			font-size: 28rpx;
			text-indent: 40rpx;
		}
		.get-mobile-btn {
			color: #fff;
			border: none;
			height: 78rpx;
			font-size: 28rpx;
			line-height: 78rpx;
			border-radius: 39rpx;
			margin: 180rpx 40rpx 0;
			background-color: #f42424;
			&:after {
				border: none;
			}
		}
		.other-link {
			margin-top: 40rpx;
			text-align: center;
			font-size: 28rpx;
			color: #666;
		}
	}
}
.switch-login-type-btn {
	text-align: center;
	text-decoration: underline;
	margin-top: 100rpx;
}
.tips-top {
	background-color: rgba(0, 0, 0, 0.4);
	width: 325rpx;
	padding: 25rpx;
	position: fixed;
	top: 60rpx;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 10rpx;
	color: #fff;
	font-size: 26rpx;
	text-align: center;
}
</style>
