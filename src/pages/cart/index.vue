<template>
	<view class="cart-container flex-box-column" v-if="cartList.length">
		<!-- ================购物车主内容=============== -->
		<view class="cart-main flex-item-1">
			<view class="cart-header flex-box flex-h-between flex-v-center">
				<text>共{{ totalNum }}件宝贝</text>
				<text class="edit-btn" @click="onEditModeChange">{{ isEditMode ? '完成' : '管理' }} </text>
			</view>
			<!-- 正常商品 -->
			<view class="cart-goods-list">
				<!-- 商品列表 -->
				<checkbox-group @change="onCheckBoxChange">
					<!-- 普通商品 -->
					<view class="goods-box" v-for="cartItem in cartList" :key="cartItem.id">
						<checkbox
							class="cart-checkbox"
							color="#fff"
							:value="cartItem.id"
							:checked="cartItem.selected"
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
				</checkbox-group>
			</view>

			<!-- 失效商品 -->
			<view class="cart-goods-list" v-if="invalidCartList.length > 0">
				<view class="cart-invalid-header flex-box flex-h-between">
					<view>失效商品{{ invalidCartList.length }}件</view>
					<view class="invalid-actions">
						<text @click="onAddInvalidToCollect">移到收藏夹</text>
						<text @click="onClearInvalidCart">清空</text>
					</view>
				</view>
				<view class="invalid-goods-box" v-for="(invalidGoodsItem, index) in invalidCartList" :key="index">
					<view class="flex-box">
						<image src="" class="goods-img flex-shrink-0" />
						<view class="goods-info flex-item-1 flex-box-column flex-h-between">
							<view>
								<view class="goods-name singleline-text">{{ invalidGoodsItem.goodsName }}</view>
								<view class="goods-spec">{{ invalidGoodsItem.goodsSpec }}</view>
							</view>
							<view class="flex-box flex-h-between flex-v-center">
								<view class="invalid-goods-price">¥{{ invalidGoodsItem.salePrice }}</view>
								<view class="invalid-label">已失效</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!--================ 编辑操作=============== -->
		<view class="cart-settle-area flex-box flex-h-between flex-v-center">
			<view class="radio-btn flex-box flex-v-center flex-item-1">
				<radio color="#000" class="cart-checkbox" :checked="isSelectAll" @click="onSelectAll" />
				<span style="line-height: 1;">全选</span>
			</view>
			<!-- 编辑模式 -->
			<block v-if="isEditMode">
				<text class="collect-btn" @click="onAddCollect">移入收藏夹</text>
				<text class="del-btn" @click="onDelete">删除</text>
			</block>
			<!-- 普通模式 -->
			<block v-else>
				<view class="amount-info">
					<text>合计：</text>
					<text class="total-price">￥{{ totalPrice }}</text>
				</view>
				<view :class="['settle-btn', selectedGoodsNum > 0 ? '' : 'disabled']" @click="bindSettle"
					>结算
					<text v-if="selectedGoodsNum">({{ selectedGoodsNum > 99 ? '99+' : selectedGoodsNum }})</text></view
				>
			</block>
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
import pageUrl from '@/config/page';
export default {
	components: {
		NumberBox
	},
	data() {
		return {
			cartList: [
				{
					id: 1,
					goodsName: '测试商品1，名字超长测试测试测试测试测试',
					marketPrice: '599.00',
					salePrice: '342.00',
					goodsNum: 1,
					goodsSpec: '黑色，XXL',
					selected: false
				},
				{
					id: 2,
					goodsName: '测试商品2，名字超长测试测试测试测试测试',
					marketPrice: '499.00',
					salePrice: '299.00',
					goodsNum: 1,
					goodsSpec: '藏青色，XXL',
					selected: false
				},
				{
					id: 3,
					goodsName: '测试商品3，名字超长测试测试测试测试测试',
					marketPrice: '459.00',
					salePrice: '399.00',
					goodsNum: 1,
					goodsSpec: '灰色，XXL',
					selected: false
				},
				{
					id: 4,
					goodsName: '测试商品4，名字超长测试测试测试测试测试',
					marketPrice: '359.00',
					salePrice: '299.00',
					goodsNum: 1,
					goodsSpec: '白色，XXL',
					selected: false
				}
			],
			invalidCartList: [
				{
					id: 1,
					goodsName: '测试商品1，名字超长测试测试测试测试测试',
					marketPrice: '599.00',
					salePrice: '342.00',
					goodsNum: 1,
					goodsSpec: '黑色，XXL',
					selected: false
				},
				{
					id: 2,
					goodsName: '测试商品2，名字超长测试测试测试测试测试',
					marketPrice: '499.00',
					salePrice: '299.00',
					goodsNum: 1,
					goodsSpec: '藏青色，XXL',
					selected: false
				}
			],
			isEditMode: false, // 编辑模式
			totalNum: 4, // 购物车商品数量
			selectedGoodsNum: 0, // 已选商品数量
			totalPrice: '1899.0',
			isSelectAll: false
		};
	},
	watch: {
		isSelectAll: function(newValue) {
			this.cartList.forEach(cartItem => {
				cartItem.selected = newValue;
			});
		},
		cartList: {
			handler(newValue) {
				let selectedGoodsNum = 0;
				let isSelectAll = true;
				newValue.forEach(cartItem => {
					if (!cartItem.selected) {
						isSelectAll = false;
					} else {
						selectedGoodsNum += cartItem.goodsNum;
					}
				});
				this.selectedGoodsNum = selectedGoodsNum;
				this.isSelectAll = isSelectAll;
			},
			deep: true
		}
	},
	methods: {
		// 页面跳转
		navigateTo() {
			this.pushUrl('/pages/order/create');
		},

		// 全选/取消全选
		onSelectAll() {
			const { isSelectAll } = this;
			this.isSelectAll = !isSelectAll;
		},

		// 选中状态修改
		onCheckBoxChange(e) {
			const selectedCartItemIds = e.detail.value;
			this.cartList.forEach(cartItem => {
				if (selectedCartItemIds.includes(cartItem.id + '')) {
					cartItem.selected = true;
				} else {
					cartItem.selected = false;
				}
			});
		},

		// 编辑模式修改
		onEditModeChange() {
			const { isEditMode } = this;
			this.isEditMode = !isEditMode;
		},

		// 收藏商品
		onAddCollect() {
			const { cartList, isSelectAll } = this;
			if (isSelectAll) {
				this.cartList = [];
			} else {
				this.cartList = cartList.filter(cartItem => !cartItem.selected);
			}
			this.tips('收藏成功~');
		},

		// 删除购物车
		onDelete() {
			const { cartList, isSelectAll } = this;
			this.confirm('确认删除已选商品?')
				.then(confirm => {
					if (confirm) {
						if (isSelectAll) {
							this.cartList = [];
						} else {
							this.cartList = cartList.filter(cartItem => !cartItem.selected);
						}
					}
				})
				.catch(e => {
					console.log(e, 'error');
				});
		},

		// 失效商品移至收藏夹
		onAddInvalidToCollect() {
			this.invalidCartList = [];
			this.tips('收藏成功~');
		},

		// 清空失效商品
		onClearInvalidCart() {
			this.confirm('确认清空所有失效商品?').then(confirm => {
				if (confirm) {
					this.invalidCartList = [];
				}
			});
		},

		// 结算
		bindSettle() {
			if (this.selectedGoodsNum <= 0) {
				return;
			}
			this.pushUrl(pageUrl.createOrder);
		}
	}
};
</script>
<style lang="scss">
page {
	height: 100%;
}

.cart-container {
	height: 100%;
	background-color: #f5f5f5;

	.cart-main {
		padding-bottom: 30rpx;
		overflow-y: scroll;
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
		border-top: 1px solid #eee;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;

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
			border-radius: 50rpx;
			padding: 0 32rpx;
			height: 50rpx;
			line-height: 50rpx;
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
		}

		.invalid-goods-box {
			border-radius: 6rpx;
			padding: 32rpx 40rpx;
			background-color: #fff;
			position: relative;
		}

		.invalid-label {
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

		.invalid-goods-price {
			color: #d8d8d8;
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
