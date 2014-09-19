var ipc = require('ipc');
$(document).ready(function(){
	setTimeout(function(){
		WebMM.addEventListener('messageAdded', function(msg){
			console.log(msg);
			ipc.send('new-message', msg);
		});
	}, 3000);
});
$('body').css('overflow', 'hidden');

/*
messageAdded(msg){
	msg.DisplayName = 发件人名字
	msg.Content = 发信内容
	msg.avatar = 头像URL
}
*/