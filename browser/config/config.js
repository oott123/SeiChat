try{
	var ipc = require('ipc');
}catch(e){
	
}

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
		}],
		configNotChanged: true
	},
	methods: {
		setValue: function(data){
			for(var x in data){
				this.$data.configItems[x].value = data[x];
			}
		},
		closeWindow: function(){
			ipc.send('close-config-window');
		},
		saveConfig: function(){
			var data = {};
			for(var i =0; i < this.$data.configItems.length; i++){
				var datum = this.$data.configItems[i];
				data[datum.key] = datum.value;
			}
			ipc.send('save-config', data);
			this.$data.configNotChanged = true;
		},
		saveAndClose: function(){
			this.saveConfig();
			this.closeWindow();
		}
	}
});
vm.$watch('configItems', function(){
	this.$data.configNotChanged = false;
});
window.onbeforeunload = function(e){
	if(!vm.$data.configNotChanged)
		return confirm('配置已改动但尚未保存。\n是否放弃你的修改？');
};