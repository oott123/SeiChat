
var vm = new Vue({
	el: 'body',
	data: {
		configItems: [{
			type: 'separator',
			title: '主窗口设置'
		},{
			type: 'checkbox',
			key: 'hideOnClose',
			title: '点击关闭按钮时隐藏主窗口',
			value: true
		},{
			type: 'separator',
			title: '右下角浮框设置'
		},{
			type: 'select',
			key: 'tipWinCondition',
			title: '浮框显示时机',
			options: [{
				key: 'always',
				title: '始终显示'
			},{
				key: 'none',
				title: '始终不显示'
			},{
				key: 'auto',
				title: '仅当主窗口隐藏时显示'
			}],
			value: 'auto'
		},{
			type: 'text',
			key: 'hideTimeout',
			title: '浮窗显示时间（毫秒）',
			value: '8000'
		}]
	}
});