<template>
	<view>
		<button type="default" @click="navigateTo">商品列表</button>
	</view>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		navigateTo() {
			this.pushUrl('/pages/goods/list');
		}
	}
};
</script>
