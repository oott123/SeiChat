try{
	var ipc = require('ipc');
}catch(e){
	
}

var vm = new Vue({
	el: 'body',
	data: {
		messages: []
	},
	methods: {
		close: function(index){
			vm.$data.messages.$remove(index);
			ipc.send('message-close', vm.$data.messages.length);
		},
		mEnter: function(){
			ipc.send('message-do-not-close');
		},
		mLeave: function(){
			ipc.send('message-delay');
		}
	}
});
