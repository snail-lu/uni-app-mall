<template>
	<view class="category-container flex-box-column">
		<view class="content flex-box flex-item-1">
			<!-- 左侧一级类目 -->
			<scroll-view class="first-cate" :scroll-y="true" :scroll-top="scrollHeight" :scroll-with-animation="true">
				<view
					v-for="(item, index) in categoryList"
					:key="item.id"
					:class="['cate-item', currentCateIndex === index ? 'current-cate' : '']"
					@click="changeCate($event, index)"
				>
					{{ item.label }}
				</view>
			</scroll-view>

			<!-- 右侧二级目录 -->
			<view class="second-cate flex-item-1">
				<scroll-view :scroll-y="true" class="second-cate-scroll" :scroll-top="scrollTop">
					<view class="cate-banner">{{ categoryList[currentCateIndex].label }}</view>
					<view class="cate-item" v-for="secondCateItem in 10" :key="secondCateItem">
						<view class="title">二级类目{{ secondCateItem }}</view>
						<view class="third-cate">
							<view
								class="third-cate-item"
								v-for="thirdCateItem in 8"
								:key="thirdCateItem"
								bindtap="toGoodsList"
							>
								<view class="item-image"></view>
								<view class="item-name">三级类目{{ thirdCateItem }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>
<script>
import { getNavigationBarHeight } from '@/common/utils/index';
export default {
	data() {
		return {
			// mock数据
			categoryList: [
				{
					id: '0',
					label: '热搜推荐'
				},
				{
					id: '1',
					label: '食品酒水'
				},
				{
					id: '2',
					label: '生鲜果蔬'
				},
				{
					id: '3',
					label: '美妆护肤'
				},
				{
					id: '4',
					label: '个护清洁'
				},
				{
					id: '5',
					label: '精品男装'
				},
				{
					id: '6',
					label: '精品女装'
				},
				{
					id: '7',
					label: '内衣配饰'
				},
				{
					id: '8',
					label: '鞋靴箱包'
				},
				{
					id: '9',
					label: '手机数码'
				},
				{
					id: '10',
					label: '家用电器'
				},
				{
					id: '11',
					label: '电脑办公'
				},
				{
					id: '12',
					label: '运动户外'
				},
				{
					id: '13',
					label: '母婴童装'
				},
				{
					id: '14',
					label: '玩具乐器'
				},
				{
					id: '15',
					label: '家具厨具'
				},
				{
					id: '16',
					label: '计生情趣'
				},
				{
					id: '17',
					label: '图书音像'
				},
				{
					id: '18',
					label: '钟表珠宝'
				},
				{
					id: '19',
					label: '奢侈品'
				},
				{
					id: '20',
					label: '京东国际'
				},
				{
					id: '21',
					label: '家具建材'
				},
				{
					id: '22',
					label: '礼品鲜花'
				},
				{
					id: '23',
					label: '生活充值'
				}
			],
			currentCateIndex: 0,
			scrollHeight: 0, // 左侧菜单需要滚动的高度
			scrollTop: 0, // 右侧菜单滚动归零
			hotWords: ['iPhone', '荣耀手机', '充电宝', '毛呢大衣']
		};
	},
	onLoad() {},
	methods: {
		navigateTo() {
			this.pushUrl('/pages/goods/list');
		},
		//点击切换分类
		async changeCate(e, index) {
			this.batchUpdate({
				currentCateIndex: index,
				scrollTop: 0
			});

			// 分类滚动至中间位置
			let systemInfo = uni.getSystemInfoSync();
			let { windowHeight, windowWidth } = systemInfo;
			const radio = 750 / windowWidth;
			const { offsetTop } = e.currentTarget;
			const cateHeight = 100 / radio;
			const scrollHeight = offsetTop + cateHeight / 2 - windowHeight / 2;
			if (scrollHeight > 0) {
				this.scrollHeight = parseInt(scrollHeight);
			}
		},

		// 跳转搜索页面
		toSearch() {
			wx.navigateTo({
				url: '/pages/search/search'
			});
		},

		// 滑动切换分类
		swiperCate(index) {
			this.currentCateIndex = index;
		},

		// 跳转商品列表
		toGoodsList() {
			wx.navigateTo({ url: '/pages/goodsList/goodsList' });
		}
	}
};
</script>
<style lang="scss">
page {
	height: 100%;
	background-color: #fff;
}
.category-container {
	height: 100%;

	.content {
		border-top: 1px solid #eee;
		overflow-y: hidden;
	}
}

.first-cate {
	height: 100%;
	background-color: #f5f5f5;
	width: 180rpx;
	font-size: 26rpx;
	text-align: center;
	color: #666;

	.cate-item {
		height: 100rpx;
		line-height: 100rpx;
	}

	.current-cate {
		background-color: #fff;
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		position: relative;
	}
	.current-cate::before {
		position: absolute;
		content: '';
		display: block;
		width: 8rpx;
		height: 34rpx;
		background-color: #f42424;
		top: 50%;
		left: 0;
		margin-top: -17rpx;
	}
}

.second-cate {
	height: 100%;
	overflow-y: auto;
	box-sizing: border-box;

	.second-cate-scroll {
		height: 100%;
		padding-top: 20rpx;
		box-sizing: border-box;
	}

	.cate-banner {
		background-color: #f42424;
		border-radius: 6rpx;
		height: 100rpx;
		color: #fff;
		text-align: center;
		line-height: 100rpx;
		margin: 0 20rpx;
	}

	.cate-item {
		box-shadow: -6px 6px 9px -14rpx #eee;
		margin: 30rpx 20rpx 30rpx 20rpx;
		border-radius: 8rpx;
		padding: 20rpx;

		.title {
			font-size: 26rpx;
			margin-bottom: 20rpx;
		}
	}

	.third-cate {
		display: grid;
		grid-template-columns: repeat(3, 130rpx);
		justify-content: space-between;

		.third-cate-item {
			font-size: 24rpx;
			margin-bottom: 20rpx;
			text-align: center;
		}
		.item-image {
			width: 130rpx;
			height: 130rpx;
			background-color: #f5f5f5;
		}
		.item-name {
			width: 130rpx;
		}
	}
}
</style>
