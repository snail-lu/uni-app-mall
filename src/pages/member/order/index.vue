<template>
	<view>
		<button type="default" @click="navigateTo">订单详情</button>
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
			PlatformService.pushUrl("/pages/member/order/detail");
		}
	}
};
</script>
