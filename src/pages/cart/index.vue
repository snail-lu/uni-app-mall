<template>
	<view class="cart-container flex-box-column" v-if="cartList.length">
		<!-- ================购物车主内容=============== -->
		<view class="cart-main flex-item-1 overflow-y-scroll">
			<view class="cart-header flex-box flex-h-between flex-v-center">
				<text>共{{ totalNum }}件宝贝</text>
				<text class="edit-btn" @click="bindCartModeChange(cartShipItem.checkStatus)"
					>{{ isEditMode ? '完成' : '管理' }}
				</text>
			</view>
			<view class="cart-goods-list" v-for="(cartItem, cartIndex) in cartList" :key="cartIndex">
				<!-- 商品列表 -->
				<checkbox-group bindchange="bindCheckBoxChange">
					<!-- 普通商品 -->
					<view class="goods-box">
						<checkbox
							class="cart-checkbox"
							color="#fff"
							:value="item.id"
							:checked="item.status == 1"
							@click="bindSelectCartItem"
						/>
						<view class="flex-box">
							<image src="" class="goods-img flex-shrink-0" />
							<view class="goods-info flex-item-1 flex-box-column flex-h-between">
								<view>
									<view class="goods-name singleline-text">{{ cartItem.goodsName }}</view>
									<view class="goods-spec">{{ cartItem.goodsSpec }}</view>
								</view>
								<view class="flex-box flex-h-between flex-v-center">
									<view class="goods-price">¥{{ cartItem.salePrice }}</view>
									<number-box v-model="cartItem.goodsNum"></number-box>
								</view>
							</view>
						</view>
					</view>

					<!-- 失效商品 -->
					<view class="cart-invalid-list" v-if="invalidCartList.length > 0">
						<view class="cart-invalid-header flex-box flex-box-h-between">
							<view>失效商品{{ invalidCartList.length }}件</view>
							<view class="invalid-actions">
								<text @click="moveInvalidToCollect">移到收藏夹</text>
								<text @click="clearInvalidCartItem">清空</text>
							</view>
						</view>
						<view
							class="invalid-goods-item"
							v-for="(invalidGoodsItem, index) in invalidCartList"
							:key="index"
						>
							<view>失效商品</view>
						</view>
					</view>
				</checkbox-group>
			</view>
		</view>

		<!--================ 编辑操作=============== -->
		<view v-if="isEditMode" class="cart-settle-area flex-box flex-h-between flex-v-center">
			<view class="radio-btn flex-box flex-v-center flex-item-1">
				<radio color="#000" class="cart-checkbox" :checked="isSelectAll == 1" @click="bindSelectCartShipItem" />
				<span style="line-height: 1;">全选</span>
			</view>
			<text class="collect-btn" @click="bindBatchAddCollect">移入收藏夹</text>
			<text class="del-btn" @click="bindDelMenu">删除</text>
		</view>
		<view v-else class="cart-settle-area flex-box flex-h-between flex-v-center">
			<view class="radio-btn flex-box flex-v-center flex-item-1">
				<radio color="#000" class="cart-checkbox" :checked="isSelectAll == 1" @click="bindSelectCartShipItem" />
				<span style="line-height: 1;">全选</span>
			</view>
			<view class="amount-info">
				<text>合计：</text>
				<text class="total-price">￥{{ totalPrice }}</text>
			</view>
			<view :class="['settle-btn', totalNum > 0 ? '' : 'disabled']" bindtap="bindSettle"
				>结算 <text v-if="totalNum">({{ totalNum > 99 ? '99+' : totalNum }})</text></view
			>
		</view>
	</view>
	<!-- 购物车无商品 -->
	<view class="empty-tips flex-box-column flex-h-center flex-v-center" v-else>
		<text>购物车还是空的呢~</text>
		<button class="nav-btn" @click="bindSwitchToIndex">继续购物</button>
	</view>
</template>
<script>
import { NumberBox } from '@/common/components/number-box.vue';
export default {
	components: {
		NumberBox
	},
	data() {
		return {
			cartList: [
				{
					goodsName: '测试商品1，名字超长测试测试测试测试测试',
					marketPrice: '599.00',
					salePrice: '342.00',
					goodsNum: 1,
					goodsSpec: '黑色，XXL'
				}
			],
			isEditMode: false, // 编辑模式
			totalNum: 10,
			totalPrice: 1899.0
		};
	},
	methods: {
		navigateTo() {
			this.pushUrl('/pages/order/create');
		}
	}
};
</script>
<style lang="scss">
page {
	height: 100%;
	box-sizing: border-box;
	padding-bottom: env(safe-area-inset-bottom);
}

.cart-container {
	height: 100%;
	box-sizing: border-box;
	background-color: #f5f5f5;
	padding-bottom: env(safe-area-inset-bottom);

	.cart-main {
		margin-bottom: 32rpx;
	}

	//多选框选中时
	.cart-checkbox {
		.wx-checkbox-input,
		.wx-radio-input {
			margin-right: 20rpx;
			width: 34rpx;
			height: 34rpx;
			border-radius: 50%;
			border: 2px solid #c0c0c0;
			&.wx-checkbox-input-checked {
				background: #070707;
				border: 2px solid #070707;
			}
		}
	}

	.cart-header {
		padding: 0 32rpx;
		height: 104rpx;
		font-size: 28rpx;
		color: #333;

		.edit-btn {
			text-decoration: underline;
		}
	}

	.cart-settle-area {
		height: 104rpx;
		font-size: 26rpx;
		padding: 16rpx 32rpx;
		background: #ffffff;
		border-top: 1px solid #dadada;
		box-sizing: border-box;

		.amount-info {
			font-size: 28rpx;
			margin-right: 19rpx;
			.total-price {
				color: #f4333c;
			}
		}
		//结算按钮
		.settle-btn {
			width: 180rpx;
			height: 72rpx;
			line-height: 72rpx;
			color: #fff;
			font-size: 28rpx;
			text-align: center;
			border-radius: 72rpx;
			background-color: #000;

			&.disabled {
				background: #999999;
			}
		}

		.collect-btn,
		.del-btn {
			border: 2rpx solid #000;
			border-radius: 6rpx;
			padding: 0 32rpx;
			height: 49rpx;
			line-height: 49rpx;
			font-size: 24rpx;
			box-sizing: border-box;
		}

		.collect-btn {
			margin-right: 48rpx;
		}
	}

	//----------------商品列表---------------
	.cart-goods-list {
		padding: 0 32rpx;
		border-radius: 10rpx;

		// 失效商品
		.goods-item.invalid-item {
			background: #f2f3f4;
			color: #ababab;
		}
		.goods-box {
			border-radius: 6rpx;
			padding: 32rpx 40rpx 32rpx 0;
			background-color: #fff;

			padding-left: 98rpx;
			position: relative;

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
			.cart-checkbox {
				position: absolute;
				top: 50%;
				left: 49rpx;
				margin-top: -18rpx;
				margin-left: -18rpx;
			}
		}
	}
}

.cart-invalid-list {
	padding: 0 32rpx;
	.cart-invalid-header {
		// padding: 0 36rpx;
		height: 92rpx;
		line-height: 92rpx;
		font-size: 28rpx;
		color: #333;

		.invalid-actions {
			font-size: 28rpx;
			color: #fd7404;
			text {
				margin-left: 40rpx;
			}
		}
	}
	.invalid-goods-item {
		padding: 32rpx 40rpx;
		background-color: #fff;
		border-radius: 6rpx;
	}
	.invalid-label {
		width: 90rpx;
		height: 44rpx;
		background: #d8d8d8;
		border-radius: 22rpx;
		line-height: 44rpx;
		text-align: center;
		font-size: 28rpx;
		color: #fff;
	}
	.goods-img {
		width: 235rpx;
		height: 235rpx;
		margin-right: 28rpx;
	}
	.goods-name {
		font-size: 28rpx;
	}
}

//没有数据时提示
.empty-tips {
	height: 100%;
	position: relative;
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: border-box;
	background-color: #f5f5f5;
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
