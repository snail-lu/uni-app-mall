<template>
	<view>
		<!-- 顶部轮播 -->
		<uni-swiper-dot
			:info="goodsMainImages"
			:current="current"
			field="content"
			mode="round"
			:dotsStyles="dotsStyles"
		>
			<swiper class="swiper-box" @change="onSwiperChange" :circular="true" :autoplay="true">
				<swiper-item
					v-for="(item, index) in goodsMainImages"
					:key="index"
					:class="['swiper-item', `swiper-item-${index}`]"
				>
					<view>
						<image :src="item" class="swiper-img" mode="widthFix" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<!-- 商品基础信息 -->
		<view class="goods-info">
			<view class="goods-name">HLA/海澜之家易打理弹力套装西服 深蓝色深蓝</view>
			<view class="label">促销</view>
			<view class="flex-box flex-h-between flex-v-center" style="margin-top: 22rpx;">
				<view class="flex-box flex-v-center">
					<view class="sale-price">¥499</view>
					<view class="market-price">¥599.00</view>
				</view>
				<view class="sales">销量：200</view>
			</view>
		</view>

		<!-- 商品详情 -->
		<view class="goods-detail">
			<block v-for="(item, index) in goodsDetailImages" :key="index">
				<image :src="item" class="detail-img" mode="widthFix" />
			</block>
		</view>

		<!-- 底部导航 -->
		<view class="goods-nav-btn flex-box flex-h-between">
			<view class="box-l flex-box flex-h-around flex-v-center">
				<button class="menu-item first-menu-item" open-type="contact">
					<i class="iconfont icon-service"></i>
					<view>客服</view>
				</button>
				<view class="menu-item" @click="navigateTo('cart')">
					<uni-badge class="num_b" size="small" type="error" text="3"></uni-badge>
					<i class="iconfont icon-add-cart"></i>
					<view>购物车</view>
				</view>
			</view>
			<view class="box-r flex-box flex-v-center flex-h-end">
				<view class="add-cart-btn" @click="onAddCart(false)">加入购物车</view>
				<view class="buy-btn" @click="onAddCart(true)">立即购买</view>
			</view>
		</view>

		<!-- 商品属性弹窗 -->
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="popup-box">
				<view class="close-btn" @click="changePopupVisible(false)">×</view>
				<view class="title">颜色分类</view>
				<scroll-view class="color-list flex-box" scroll-x="true">
					<view
						v-for="color in 10"
						:key="color"
						:class="{ 'color-item': true, 'color-item-active': color === addCartInfo.color }"
						@click="clickToSelectedAttr('color', color)"
					>
						<image
							class="color-img"
							src="https://img14.360buyimg.com/n4/jfs/t1/191922/27/14687/124506/60f997ecE179afa7b/1bb11a94439cd17f.jpg"
						/>
						<view>黑色</view>
					</view>
				</scroll-view>

				<view class="title">尺码</view>
				<view class="size-list flex-box flex-wrap">
					<view
						v-for="size in 10"
						:key="size"
						:class="{ 'size-item': true, 'size-item-active': size === addCartInfo.size }"
						@click="clickToSelectedAttr('size', size)"
						>{{ size }}</view
					>
				</view>
				<view class="flex-box flex-h-between flex-v-center" style="margin-bottom: 30rpx;">
					<view class="numbox-title">数量</view>
					<uni-number-box v-model="addCartInfo.goodsNum"></uni-number-box>
				</view>
				<view class="confirm-btn" @click="onConfirm">确认</view></view
			>
		</uni-popup>
	</view>
</template>
<script>
import pageUrl from '@/config/page';
export default {
	data() {
		return {
			options: [
				{
					icon: 'headphones',
					text: '客服'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: 2
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			],
			// 商品主图
			goodsMainImages: [
				'https://m.360buyimg.com/mobilecms/s843x843_jfs/t1/165064/19/13291/177381/60501634Efa367d12/7baa92ebf0382fbd.jpg!q70.dpg.webp',
				'https://m.360buyimg.com/mobilecms/s843x843_jfs/t1/155661/8/16135/174546/60501634E410573f5/db95b968570de121.jpg!q70.dpg.webp',
				'https://m.360buyimg.com/mobilecms/s843x843_jfs/t1/166955/36/12978/210572/60501635E49fd4b73/2344d437280dad08.jpg!q70.dpg.webp'
			],
			// 商品详情图
			goodsDetailImages: [
				'https://img30.360buyimg.com/popWareDetail/jfs/t1/170128/15/14997/158525/605ed84dE59a7c340/cd89849879dafc1d.jpg!q70.dpg.webp',
				'https://img30.360buyimg.com/popWareDetail/jfs/t1/191127/8/12062/53768/60e56f4cE4b20319d/5b91d1c9a1d218b2.jpg!q70.dpg.webp',
				'https://img30.360buyimg.com/popWareDetail/jfs/t1/161082/5/15279/157862/605ed84eE67488e47/5aa0d93d98264490.jpg!q70.dpg.webp',
				'https://img30.360buyimg.com/popWareDetail/jfs/t1/174314/35/18543/52518/60e56b27E03038edc/3f7b32b60fcacbd3.jpg!q70.dpg.webp',
				'https://img30.360buyimg.com/popWareDetail/jfs/t1/175628/23/18608/40335/60e56b27Eff528e6a/1f7b64f7395aa3ec.jpg!q70.dpg.webp'
			],
			current: 0,
			// 轮播指示器样式
			dotsStyles: {
				backgroundColor: 'rgba(0,0,0,0.30);',
				selectedBackgroundColor: '#333',
				border: 'none',
				selectedBorder: 'none'
			},
			// 加购参数
			addCartInfo: {
				goodsNum: 1,
				color: '',
				size: ''
			},
			isQuickBuy: false // 是否立即购买
		};
	},
	methods: {
		// 页面跳转
		navigateTo(pageName) {
			const url = pageUrl[pageName];
			if (url) {
				this.smartPushUrl(url);
			} else {
				this.tips('页面不存在');
			}
		},

		// 切换轮播
		onSwiperChange(e) {
			this.current = e.detail.current;
		},

		// 显示/隐藏弹窗
		changePopupVisible(show = true) {
			if (show) {
				this.$refs.popup.open();
			} else {
				this.$refs.popup.close();
			}
		},

		// 选择商品属性
		clickToSelectedAttr(attrName, attrValue) {
			this.addCartInfo[attrName] = attrValue;
		},

		// 是否立即购买
		onAddCart(isQuickBuy = false) {
			this.isQuickBuy = isQuickBuy;
			this.changePopupVisible();
		},

		// 确认
		onConfirm() {
			const { addCartInfo } = this;
			if (!addCartInfo.size || !addCartInfo.color) {
				this.tips('请先选择颜色和尺码:)');
				return;
			}
			if (this.isQuickBuy) {
				this.pushUrl(pageUrl.createOrder);
			} else {
				this.tips('加入购物车成功!');
				this.changePopupVisible(false);
			}
		}
	}
};
</script>
<style lang="scss">
.goods-nav-btn {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 120rpx;
	background: #ffffff;
	box-shadow: 0rpx -1px 4rpx 0rpx rgba(125, 125, 125, 0.5);
	padding-bottom: env(safe-area-inset-bottom);

	.box-l {
		.menu-item {
			position: relative;
			font-size: 24rpx;
			text-align: center;
			margin: 0 40rpx;
			.num_b {
				position: absolute;
				right: -10rpx;
				top: -10rpx;
			}

			&:last-child {
				&::before {
					content: '';
					display: block;
					width: 1px;
					height: 32rpx;
					background-color: #e7e7e7;
					position: absolute;
					left: -39rpx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		.first-menu-item {
			padding: 0;
			margin: 0 40rpx;
			background-color: #fff;
			line-height: 1.5;

			&::after {
				border: none;
			}
		}

		.iconfont {
			display: inline-block;
			width: 50rpx;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 48rpx;
		}
		.icon-gouwuche1 {
			font-size: 40rpx;
		}
	}

	.box-r {
		.add-cart-btn {
			width: 188rpx;
			height: 60rpx;
			border: 1px solid #000;
			box-sizing: border-box;
			line-height: 60rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 30rpx;
		}
		.buy-btn {
			width: 188rpx;
			height: 60rpx;
			line-height: 60rpx;
			color: #fff;
			background-color: #000;
			text-align: center;
			border-radius: 30rpx;
			margin: 0 25rpx;
			font-size: 28rpx;
		}
	}
}
.uni-swiper__dots-item {
	width: 8rpx !important;
	height: 8rpx !important;
}
.swiper-box {
	overflow: hidden;
	height: 750rpx;

	.swiper-img {
		width: 100%;
	}
}

.goods-info {
	background-color: #fff;
	padding: 47rpx 30rpx;
	.label {
		width: 135rpx;
		height: 34rpx;
		background: #eeeeee;
		border-radius: 17rpx;
		text-align: center;
		font-size: 24rpx;
		color: #ef3030;
	}

	.goods-name {
		font-size: 26rpx;
		margin-bottom: 17rpx;
	}

	.sale-price {
		font-size: 40rpx;
		color: #000000;
	}

	.market-price,
	.sales {
		font-size: 24rpx;
		color: #999999;
		margin-left: 16rpx;
		text-decoration: line-through;
	}

	.sales {
		text-decoration: none;
	}
}

.goods-detail {
	margin-top: 20rpx;
	margin-bottom: calc(env(safe-area-inset-bottom) + 128rpx);
	.detail-img {
		width: 100%;
		display: block;
	}
}

.popup-box {
	padding: 80rpx 39rpx 48rpx;
	position: relative;
	.close-btn {
		width: 36rpx;
		height: 36rpx;
		line-height: 1;
		text-align: center;
		border-radius: 18rpx;
		color: #000;
		border: 2rpx solid #000;
		box-sizing: border-box;
		position: absolute;
		right: 22rpx;
		top: 42rpx;
	}

	.color-list {
		white-space: nowrap;
	}

	.color-item {
		display: inline-block;
		margin: 0 18rpx 30rpx 0;
		text-align: center;
		font-size: 24rpx;
		color: #333;
		box-sizing: border-box;

		&-active {
			border: 1px solid #000;
		}
	}

	.color-img {
		width: 120rpx;
		height: 120rpx;
		border: 1px solid #e8e8e8;
		margin-bottom: 19rpx;
	}

	.size-list {
		margin-bottom: 30rpx;
	}

	.size-item {
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border: 1px solid #e8e8e8;
		margin: 0px -1px -1px 0px;
		box-sizing: border-box;

		&-active {
			// border: 1px solid #000;
			background-color: #000;
			color: #fff;
		}
	}

	.title {
		font-size: 30rpx;
		color: #333333;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.numbox-title {
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
	}

	.confirm-btn {
		height: 88rpx;
		background-color: #000;
		color: #fff;
		font-size: 30rpx;
		line-height: 88rpx;
		text-align: center;
		border-radius: 44rpx;
		margin: 0 28rpx;
	}
}
</style>
