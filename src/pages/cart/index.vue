<template>
	<view>
		<button type="default" @click="navigateTo">去结算</button>
	</view>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		navigateTo() {
			this.pushUrl('/pages/order/create');
		}
	}
};
</script>
