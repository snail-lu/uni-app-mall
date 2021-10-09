<template>
	<view class="home-container">
		<!-- 搜索栏 -->
		<uni-search-bar
			:radius="100"
			@confirm="onSearch"
			placeholder="搜索商品名称/款号"
			bgColor="#f5f5f5"
			v-model="searchKey"
		></uni-search-bar>

		<!-- 轮播 -->
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

		<!-- 推荐 -->
		<view class="recommand-box">
			<view class="title">推荐</view>
			<scroll-view class="recommand-list" scroll-x="true">
				<view class="recommand-item" v-for="recommandItem in 5" :key="recommandItem"
					>推荐内容{{ recommandItem }} <view class="buy-btn">购买</view></view
				>
			</scroll-view>
		</view>

		<!-- 尖货专区 -->
		<view class="recommand-box">
			<view class="title hot-title">尖货专区</view>
			<!-- 商品列表 -->
			<view class="goods-list flex-box flex-wrap flex-h-between">
				<view v-for="goodsItem in 15" :key="goodsItem" class="goods-item" @click="navigateTo(goodsItem)">
					<image
						class="goods-image"
						src="https://img12.360buyimg.com/n7/jfs/t1/194554/15/8513/235520/60cabc50Eb5cd12b8/1707e79dffe568d4.jpg"
						alt="goodsImage"
					/>
					<view class="goods-name singleline-text">亲肤棉商务短袖衬衫测试测试测试测试测试测试</view>
					<view class="goods-price-box flex-box flex-h-between flex-v-center">
						<view class="goods-price">¥199.00<view class="label">轻定制</view></view>
						<i class="add-cart-icon iconfont icon-add-cart" />
					</view>
				</view>
			</view>
		</view>

		<!-- 悬浮按钮 -->
		<view class="floating-box">
			<button class="floating-btn flex-box flex-h-center flex-v-center" open-type="contact">
				<i class="iconfont icon-service"></i>
			</button>
			<view class="floating-btn flex-box flex-h-center flex-v-center" @click="backToTop">
				<i class="iconfont icon-top"></i>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import pageUrl from '@/config/page';
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
				backgroundColor: 'rgba(216,216,216,0.50);',
				selectedBackgroundColor: '#d8d8d8',
				border: 'none',
				selectedBorder: 'none'
			},
			searchKey: ''
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.userInfo
		})
	},
	onLoad() {},
	methods: {
		navigateTo() {
			this.pushUrl('/pages/goods/detail');
		},
		change(e) {
			this.current = e.detail.current;
		},
		// 回到顶部
		backToTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
		},

		// 搜索
		onSearch() {
			const { searchKey } = this;
			this.pushUrl(pageUrl.goodsList, { key: searchKey });
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.uni-searchbar__box {
	border: none !important;
}
.uni-searchbar {
	background-color: #fff !important;
}
.uni-swiper__dots-item {
	width: 24rpx !important;
	height: 8rpx !important;
}
.home-container {
	.swiper-box {
		overflow: hidden;
		height: 750rpx;
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

	.recommand-box {
		.title {
			font-size: 50rpx;
			color: #000000;
			font-weight: 500;
			margin: 39rpx 0 0 32rpx;
			position: relative;
			display: inline-block;
		}

		.hot-title::after {
			content: 'HOT';
			display: block;
			width: 68rpx;
			height: 34rpx;
			font-size: 20rpx;
			line-height: 34rpx;
			background: #ef3030;
			border-bottom-right-radius: 100rpx;
			text-align: center;
			color: #fff;
			position: absolute;
			top: 50%;
			right: -78rpx;
			transform: translateY(-50%);
		}

		.recommand-list {
			white-space: nowrap;
		}

		.recommand-item {
			display: inline-block;
			width: 492rpx;
			height: 924rpx;
			background: #ffffff;
			box-shadow: 0rpx 5rpx 34rpx 0rpx rgba(120, 120, 120, 0.5);
			border-radius: 20rpx;
			margin: 53rpx 30rpx 30rpx 0;
			position: relative;

			.buy-btn {
				width: 166rpx;
				height: 58rpx;
				background: #f2f2f6;
				border-radius: 34rpx;
				position: absolute;
				bottom: 30rpx;
				right: 47rpx;
				font-size: 26rpx;
				color: #e24e4e;
				text-align: center;
				line-height: 58rpx;
			}
		}

		.goods-list {
			padding: 20rpx 32rpx 0;

			.goods-item {
				width: 335rpx;
				height: 450rpx;
				background-color: #fff;
				margin-bottom: 20rpx;
				border-radius: 20rpx;
				overflow: hidden;

				.goods-image {
					width: 335rpx;
					height: 335rpx;
				}

				.goods-name {
					height: 33rpx;
					line-height: 33rpx;
					font-size: 24rpx;
					color: #333333;
					font-weight: 400;
					margin-top: 13rpx;
					padding: 0 8rpx;
				}

				.goods-price-box {
					padding: 0 8rpx;
					margin-top: 12rpx;
					font-size: 24rpx;
					color: #000;
					font-weight: 400;
				}

				.goods-price {
					position: relative;
					.label {
						position: absolute;
						top: 50%;
						right: -76rpx;
						transform: translateY(-50%);
						width: 66rpx;
						height: 22rpx;
						line-height: 22rpx;
						text-align: center;
						background: #eeeeee;
						border-radius: 11rpx;
						font-size: 12rpx;
						color: #ef3030;
					}
				}

				.add-cart-icon {
					width: 32rpx;
					height: 34rpx;
				}
			}
		}
	}

	.floating-box {
		position: fixed;
		bottom: 250rpx;
		right: 52rpx;

		.floating-btn {
			background-color: rgba(255, 255, 255, 0.5);
			border-radius: 100%;
			width: 82rpx;
			height: 82rpx;
			padding: 0;
			margin: 0;

			&::after {
				border: none;
			}

			.iconfont {
				// width: 60rpx;
				// height: 60rpx;
				font-size: 44rpx;
			}
			&:last-child {
				margin-top: 20rpx;
			}
		}
	}
}
</style>
