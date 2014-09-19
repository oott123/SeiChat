var app = require('app');
var BrowserWindow = require('browser-window');
var path = require('path');
var fs = require('fs');

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        "web-preferences": {
            "web-security": false,
            "direct-write": true
        }
    });
    mainWindow.loadUrl('http://wx.qq.com');
    mainWindow.toggleDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
    var initJs = path.join(__dirname, 'browser', 'init.js');
    var web = mainWindow.webContents;
    web.on('did-finish-load', function(){
        fs.readFile(initJs, function(err, data){
            var js = data.toString();
            web.executeJavaScript(js);
        });
    });
    var protocol = require('protocol');
    protocol.registerProtocol('seichat', function(request) {
        var url = require('url');
        var querystring = require('querystring');
        var parsed = url.parse(request.url);
        var query = querystring.parse(parsed.query);
        var dialog = require('dialog');
        dialog.showMessageBox(null , {
            message: 'url',
            buttons: ['OK']
        });
        return new protocol.RequestStringJob({
            data: ''
        });
    });
});