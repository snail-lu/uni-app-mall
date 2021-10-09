<template>
	<view class="goodslist-container">
		<!-- 排序栏 -->
		<view class="sort-box flex-box flex-h-between">
			<view
				class="sort-item flex-item-1 flex-box flex-v-center flex-h-center"
				v-for="item in sortList"
				:key="item.prop"
				@click="changeSortField(item.prop, fieldValue)"
			>
				<text :class="{ 'item-active': currentField == item.prop }">{{ item.label }}</text>
				<block v-if="currentField == item.prop">
					<view :class="{ 'triangle-up-active': fieldValue == 2 }"></view>
					<view :class="{ 'triangle-down-active': fieldValue == 1 }"></view>
				</block>
				<block wx:else>
					<view class="triangle-down"></view>
				</block>
			</view>
			<view class="sort-item flex-item-1 flex-box flex-v-center flex-h-center">
				<view
					class="list-mode flex-box flex-v-center flex-h-center flex-item-1"
					@click="switchListMode(listMode)"
				>
					<view :class="['iconfont', listMode == 1 ? 'icon-liebiaomoshi' : 'icon-zhongtumoshi']"></view>
				</view>
				<view class="flex-box flex-v-center flex-h-center flex-item-1" @click="showDrawer">
					筛选
				</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="goods-list flex-box flex-wrap flex-h-between">
			<block v-if="listMode == 1">
				<view
					v-for="goodsItem in 15"
					:key="goodsItem"
					class="goods-item-1 flex-box"
					@click="navigateTo(goodsItem)"
				>
					<image
						class="goods-image flex-shrink-0"
						src="https://img12.360buyimg.com/n7/jfs/t1/194554/15/8513/235520/60cabc50Eb5cd12b8/1707e79dffe568d4.jpg"
						alt="goodsImage"
					/>
					<view class="flex-item-1 goods-info">
						<view class="goods-name doubleline-text"
							>亲肤棉商务短袖衬衫测试测试测试测试测试测试测试测试测试测试测试测试测试</view
						>
						<view class="flex-box">
							<view class="label">特惠</view>
							<view class="label">满300减30</view>
						</view>
						<view class="flex-box flex-v-center">
							<view class="goods-price">¥199.00</view>
							<view class="goods-origin-price">¥299.00</view>
						</view>
					</view>
				</view>
			</block>
			<block v-else-if="listMode == 2">
				<view v-for="goodsItem in 15" :key="goodsItem" class="goods-item-2" @click="navigateTo(goodsItem)">
					<image
						class="goods-image"
						src="https://img12.360buyimg.com/n7/jfs/t1/194554/15/8513/235520/60cabc50Eb5cd12b8/1707e79dffe568d4.jpg"
						alt="goodsImage"
					/>
					<view class="goods-info">
						<view class="goods-name singleline-text">亲肤棉商务短袖衬衫测试测试测试测试测试测试</view>
						<view class="flex-box">
							<view class="label">特惠</view>
							<view class="label">满300减30</view>
						</view>
						<view class="flex-box flex-v-center">
							<view class="goods-price">¥199.00</view>
							<view class="goods-origin-price">¥299.00</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 筛选抽屉 -->
		<uni-drawer ref="showRight" mode="right">
			<scroll-view style="height: 100%;" scroll-y="true">
				<button @click="closeDrawer" type="primary">关闭Drawer</button>
				<view v-for="item in 60" :key="item">可滚动内容 {{ item }}</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>
<script>
import PlatformService from '@/services/common/platformService';
export default {
	data() {
		return {
			words: '',
			sortList: [
				{ prop: 'sales', label: '销量' },
				{ prop: 'date', label: '上市时间' },
				{ prop: 'price', label: '价格' }
			],
			currentField: 'sales', // 当前排序字段
			fieldValue: 1, // 当前排序值 1：降序   2： 升序
			listMode: 1, // 列表模式   1: 单列   2：双列
			goodsList: []
		};
	},
	onLoad(options) {
		if (options.key) {
			PlatformService.setTitle(decodeURIComponent(options.key));
		}
	},
	methods: {
		// 页面跳转
		navigateTo(sn) {
			this.pushUrl(`/pages/goods/detail?sn=${sn}`);
		},
		// tab栏切换
		changeSortField(field, type) {
			this.batchUpdate({
				currentField: field,
				fieldValue: type == 1 ? 2 : 1
			});
		},

		// 切换列表模式
		switchListMode(mode) {
			this.batchUpdate({
				listMode: mode == 1 ? 2 : 1
			});
		},
		showDrawer() {
			this.$refs.showRight.open();
		},
		closeDrawer() {
			this.$refs.showRight.close();
		}
	}
};
</script>
<style lang="scss">
.sort-box {
	padding: 20rpx 0;
	font-size: 26rpx;
	background-color: #fff;
	position: sticky;
	top: 0;
	z-index: 100;

	.item-active {
		color: #f80707;
	}

	.triangle-up {
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-bottom: 6px solid #aaa;
	}

	.triangle-up-active {
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-bottom: 6px solid #f80707;
	}

	.triangle-down {
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-top: 6px solid #aaa;
	}

	.triangle-down-active {
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-top: 6px solid #f80707;
	}

	.sort-item {
		.list-img,
		.filter-img {
			width: 48rpx;
			height: 48rpx;
		}
	}

	.list-mode {
		position: relative;
	}

	.list-mode::after {
		position: absolute;
		content: '';
		display: flex;
		width: 2rpx;
		height: 30rpx;
		background-color: #888;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}
}

.goods-list {
	padding: 20rpx 32rpx 0;
	.goods-item-1 {
		width: 100%;
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 10rpx;

		.goods-image {
			width: 280rpx;
			height: 280rpx;
		}
	}

	.goods-item-2 {
		width: 335rpx;
		// height: 450rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 20rpx;
		overflow: hidden;

		.goods-image {
			width: 335rpx;
			height: 335rpx;
		}
	}

	.goods-info {
		overflow: hidden;
		padding: 20rpx;
	}

	.goods-name {
		font-size: 24rpx;
		color: #333333;
		font-weight: 400;
	}

	.label {
		// width: 66rpx;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
		background: #eeeeee;
		border-radius: 15rpx;
		font-size: 20rpx;
		color: #ef3030;
		padding: 0 10rpx;
		margin: 20rpx 20rpx 0 0;
	}

	.goods-price {
		padding: 0 8rpx;
		margin-top: 20rpx;
		font-size: 30rpx;
		color: #000;
		font-weight: 400;
	}
	.goods-origin-price {
		padding: 0 8rpx;
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #999;
		text-decoration: line-through;
	}
}
.icon-liebiaomoshi {
	font-size: 32rpx;
	color: #000;
}
</style>
