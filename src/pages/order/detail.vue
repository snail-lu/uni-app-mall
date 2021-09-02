<template>
	<view>
		<button type="default" @click="navigateTo">回首页</button>
	</view>
</template>
<script>
import PlatformService from "@/services/common/platformService.js";
export default {
	data() {
		return {};
	},
	methods: {
		navigateTo() {
			PlatformService.switchUrl("/pages/index/index");
		}
	}
};
</script>
