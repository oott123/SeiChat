try{
	var ipc = require('ipc');
}catch(e){
	var ipc = {
		send:function(chn, data){console.log('sent ' + chn, data)},
		debug:1
	};
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
		},
		sendChat: function(originMessage){
			console.log(this);
			var data = {
				call: 'logic',
				sub: 'sendMsg',
				method: 'sendText',
				data: {
					Msg: {
						FromUserName: originMessage.ToUserName,
						ToUserName: originMessage.FromUserName,
						Type: 1,
						Content: originMessage.reply.slice(0, -1)
					}
				}
			};
			ipc.send('call-webmm', data);
			originMessage.reply = '';
			originMessage.doReply = false;
		},
		cancelReply: function(item){
			item.doReply = false;
		},
		doReply: function(item, that){
			var row = that.$el;
			item.doReply = true;
			Vue.nextTick(function(){
				var textArea = row.querySelector('.reply textarea');
				textArea.focus();
				var length = textArea.value.length;
				textArea.setSelectionRange(length,length);
				textArea.onblur = function(){
					item.doReply = false;
				}
			});
		}
	}
});

if(ipc.debug){
	vm.$data.messages.push({"MsgId":1021030099,"FromUserName":"gh_d87b052810ca","ToUserName":"oott123","MsgType":1,"Content":"亲爱的园友您好，感谢您关注中南大学云麓园BBS，请回复菜单编号或关键字进入菜单。<br/>1.实时资讯/电影/讲座<br/>2.校园资讯/新闻/通知<br/>3.云麓百科<br/>4.工具<br/>发送 @hello 进行中英互译<br/>发送 长沙天气 获取天气信息<br/>发送 新闻 看最新新闻<br/>任何时候回复0000返回主菜单。","Status":3,"ImgStatus":1,"CreateTime":1411474372,"VoiceLength":0,"PlayLength":0,"FileName":"","FileSize":"","MediaId":"","Url":"","AppMsgType":0,"StatusNotifyCode":0,"StatusNotifyUserName":"","RecommendInfo":{"UserName":"","NickName":"","QQNum":0,"Province":"","City":"","Content":"","Signature":"","Alias":"","Scene":0,"VerifyFlag":0,"AttrStatus":0,"Sex":0,"Ticket":"","OpCode":0},"ForwardFlag":0,"AppInfo":{"AppID":"","Type":0},"HasProductId":0,"Ticket":"","isSend":false,"actualSender":"gh_d87b052810ca","LocalID":1021030099,"ClientMsgId":1021030099,"digest":"亲爱的园友您好，感谢您关注中南大学云麓园BBS，请回复菜单编号或关键字进入菜单。<br/>1.实时资讯/电影/讲座<br/>2.校园资讯/新闻/通知<br/>3.云麓百科<br/>4.工具<br/>发送 @hello 进行中英互译<br/>发送 长沙天气 获取天气信息<br/>发送 新闻 看最新新闻<br/>任何时候回复0000返回主菜单。","actualContent":"亲爱的园友您好，感谢您关注中南大学云麓园BBS，请回复菜单编号或关键字进入菜单。<br/>1.实时资讯/电影/讲座<br/>2.校园资讯/新闻/通知<br/>3.云麓百科<br/>4.工具<br/>发送 @hello 进行中英互译<br/>发送 长沙天气 获取天气信息<br/>发送 新闻 看最新新闻<br/>任何时候回复0000返回主菜单。","unread":false,"avatarTitle":"中南大学云麓园BBS","avatarId":"gh_d87b052810ca","avatar":"/cgi-bin/mmwebwx-bin/webwxgeticon?seq=1727599&username=gh_d87b052810ca&skey=@crypt_d352177e_6d02c764756469ffa1b1bd4b170ed8bf","displayTime":1411474369,"time":"","isChatRoom":0,"DisplayName":"中南大学云麓园BBS"})
}
