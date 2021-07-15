<template>
	<view>
		<button type="default" @click="navigateTo">商品详情页</button>
	</view>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		navigateTo() {
			this.pushUrl('/pages/goods/detail');
		}
	}
};
</script>
