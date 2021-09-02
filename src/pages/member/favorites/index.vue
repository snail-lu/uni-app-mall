<template>
	<view class="favorites-container">
		<!-- 普通商品 -->
		<block v-if="goodsList.length > 0">
			<view class="goods-box" v-for="goodsItem in goodsList" :key="goodsItem.id">
				<view class="flex-box">
					<view class="goods-img-box">
						<image src="" class="goods-img flex-shrink-0" />
						<view v-if="goodsItem.status == 0" class="invalid-label">已下架</view>
					</view>
					<view class="goods-info flex-item-1 flex-box-column flex-h-between">
						<view>
							<view class="goods-name singleline-text">{{ goodsItem.goodsName }}</view>
							<view class="goods-spec">{{ goodsItem.goodsSpec }}</view>
						</view>
						<view class="flex-box flex-h-between flex-v-center">
							<view :class="{ 'goods-price': true, 'invalid-goods-price': goodsItem.status == 0 }"
								>¥{{ goodsItem.salePrice }}</view
							>
							<view class="iconfont icon-heart-a" @click="onDelete(goodsItem.id)"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="end-tips">已经到底了:)</view>
		</block>
		<!-- 无商品 -->
		<block v-else>
			<view class="empty-tips flex-box-column flex-h-center flex-v-center">
				<text>收藏夹还是空的哦~</text>
			</view>
		</block>
	</view>
</template>
<script>
export default {
	data() {
		return {
			goodsList: [
				{
					id: 1,
					goodsName: '测试商品1，名字超长测试测试测试测试测试',
					marketPrice: '599.00',
					salePrice: '342.00',
					goodsNum: 1,
					goodsSpec: '黑色，XXL',
					status: 1 // 0 已下架  1 正常
				},
				{
					id: 2,
					goodsName: '测试商品2，名字超长测试测试测试测试测试',
					marketPrice: '499.00',
					salePrice: '299.00',
					goodsNum: 1,
					goodsSpec: '藏青色，XXL',
					status: 0
				},
				{
					id: 3,
					goodsName: '测试商品3，名字超长测试测试测试测试测试',
					marketPrice: '459.00',
					salePrice: '399.00',
					goodsNum: 1,
					goodsSpec: '灰色，XXL',
					status: 1
				},
				{
					id: 4,
					goodsName: '测试商品4，名字超长测试测试测试测试测试',
					marketPrice: '359.00',
					salePrice: '299.00',
					goodsNum: 1,
					goodsSpec: '白色，XXL',
					status: 0
				}
			]
		};
	},
	methods: {
		// 取消收藏
		async onDelete(id) {
			const { goodsList } = this;
			let confirm = await this.confirm('确认取消收藏该商品?');
			if (confirm) {
				this.goodsList = goodsList.filter(goodsItem => goodsItem.id != id);
				this.tips('取消收藏成功~');
			}
		}
	},
	onLoad() {},
	onReachBottom() {
		// 滚动触底，处理分页
	}
};
</script>
<style lang="scss">
page {
	height: 100%;
}
.favorites-container {
	height: 100%;
	padding: 40rpx 32rpx 0;
}
.goods-box {
	border-radius: 6rpx;
	padding: 32rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
}

.goods-img-box {
	position: relative;
}

.invalid-label {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90rpx;
	height: 44rpx;
	background: #d8d8d8;
	border-radius: 22rpx;
	line-height: 44rpx;
	text-align: center;
	font-size: 26rpx;
	color: #fff;
	padding: 0 16rpx;
}

.goods-img {
	width: 200rpx;
	height: 200rpx;
	background-color: #f6f6f6;
}

.goods-info {
	margin-left: 20rpx;
	overflow: hidden;
}

.goods-name {
	font-size: 26rpx;
	font-weight: 500;
}

.goods-spec {
	font-size: 24rpx;
	color: #888;
	margin-top: 18rpx;
}

.goods-price {
	color: #f4333c;
	font-size: 30rpx;
}

.icon-heart-a {
	color: #f4333c;
	font-size: 40rpx;
}

.invalid-goods-price {
	color: #d8d8d8;
	font-size: 30rpx;
}

.end-tips {
	font-size: 24rpx;
	text-align: center;
}

// 没有数据时提示
.empty-tips {
	height: 100%;
	background-color: #fff;
	font-size: 26rpx;

	.nav-btn {
		width: 80%;
		height: 85rpx;
		line-height: 85rpx;
		font-size: 30rpx;
		color: #fff;
		border-radius: 6rpx;
		margin-top: 30rpx;
		background-color: $uni-color-primary;
	}
}
</style>
