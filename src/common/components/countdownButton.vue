<template>
	<button type="default" class="send-btn" :class="{ disable: countdownTime > 0 }" @click="clickHandler">
		{{ currentButtonText }}
	</button>
</template>

<script>
export default {
	props: {
		text: String, // 发送验证码
		sendText: String, // 倒时时文件 #s#秒后重新发送
		time: Number // 倒计时秒数
	},
	data() {
		return {
			countdownTime: 0,
			timeoutHandler: null
		};
	},
	computed: {
		currentButtonText() {
			let { text, sendText, countdownTime } = this;
			if (countdownTime > 0) {
				return sendText.replace(/#s#/g, countdownTime);
			} else {
				return text;
			}
		}
	},
	watch: {
		countdownTime: function(newValue) {
			if (newValue <= 0) {
				clearTimeout(this.timeoutHandler);
			}
		}
	},
	onUnload() {
		clearTimeout(this.timeoutHandler);
	},
	methods: {
		clickHandler() {
			let { countdownTime } = this;
			if (countdownTime <= 0) {
				this.$emit('buttonClick');
			} else {
				this.$emit('moreTime', { time: this.currentTime });
			}
		},
		startCountdown(startTime = 60) {
			let time = startTime;
			let cb = () => {
				time = time -= 1;
				this.countdownTime = time;
				this.timeoutHandler = setTimeout(cb, 1000);
			};
			cb();
		}
	}
};
</script>

<style lang="scss">
.send-btn {
	width: 180rpx;
	height: 48rpx;
	line-height: 48rpx;
	padding: 0 16rpx;
	color: #fff;
	font-size: 24rpx;
	// margin: -6rpx;
	background-color: #f42424;
	&.disable {
		background-color: #ccc;
	}
}
</style>
