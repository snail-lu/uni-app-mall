<template>
	<view>
		支付成功
		<button type="default" @click="navigateTo">查看订单</button>
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
			PlatformService.pushUrl("/pages/member/order/index");
		}
	}
};
</script>
