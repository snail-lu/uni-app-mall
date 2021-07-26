<script>
export default {
	onLaunch: function() {
		console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！');
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*页面公共css */
page {
	min-height: 100%;
	background-color: #f5f5f5;
}
.flex-box {
	display: flex;
}
.flex-h-between {
	justify-content: space-between;
}
.flex-h-center {
	justify-content: center;
}
.flex-h-end {
	justify-content: flex-end;
}
.flex-box-v {
	display: flex;
	flex-direction: column;
}
.flex-v-center {
	align-items: center;
}
.flex-v-end {
	align-items: flex-end;
}

.flex-wrap {
	flex-wrap: wrap;
}
.flex-item-1 {
	flex: 1;
}
.flex-item-2 {
	flex: 2;
}
.flex-item-3 {
	flex: 3;
}
.flex-item-4 {
	flex: 4;
}
.flex-item-5 {
	flex: 5;
}
.flex-shrink-0 {
	flex-shrink: 0;
}
.flex-box-column {
	display: flex;
	flex-direction: column;
}
/* 单行文本，超出省略 */
.singleline-text {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
