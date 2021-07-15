<template>
	<view>
		<button type="default" @click="switchTo">购物车</button>
		<button type="default" @click="navigateTo">下单</button>
	</view>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		switchTo() {
			this.switchUrl('/pages/cart/index');
		},
		navigateTo() {
			this.pushUrl('/pages/order/create');
		}
	}
};
</script>
