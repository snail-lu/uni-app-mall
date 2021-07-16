<template>
	<view class="container">
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode" :dotsStyles="dotsStyles">
			<swiper class="swiper-box" @change="change" :circular="true" :autoplay="true">
				<swiper-item
					v-for="(item, index) in info"
					:key="index"
					:class="['swiper-item', `swiper-item-${index}`]"
				>
					<view>
						{{ item.content }}
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
import store from '@/store/index';
import { mapState } from 'vuex';
import HomePageService from '@/services/page/homePageService';
export default {
	data() {
		return {
			info: [
				{
					content: '内容 A'
				},
				{
					content: '内容 B'
				},
				{
					content: '内容 C'
				}
			],
			current: 0,
			mode: 'round',
			dotsStyles: {
				backgroundColor: '#fff',
				selectedBackgroundColor: '#9dc825',
				border: 'none',
				selectedBorder: 'none'
			}
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.userInfo
		})
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		apiTest() {
			HomePageService.apiTest();
		}
	},
	mounted() {
		store.dispatch('refreshCartNum', {
			cartNum: 10
		});
		// this.apiTest();
	}
};
</script>

<style lang="scss">
.container {
	padding: 20rpx;

	.swiper-box {
		border-radius: 10rpx;
		overflow: hidden;
	}

	.swiper-item {
		color: #fff;
		text-align: center;
	}

	.swiper-item-0 {
		background-color: rgb(20, 228, 200);
	}
	.swiper-item-1 {
		background-color: rgb(224, 55, 55);
	}
	.swiper-item-2 {
		background-color: rgb(28, 97, 226);
	}
}
</style>
