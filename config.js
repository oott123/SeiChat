var fs = require('fs');
var path = require('path');
var configFile = path.join(__dirname, 'config.json');
if(!fs.existsSync(configFile)){
	configFile = path.join(__dirname, 'default-config.json');
}
fs.readFile(configFile, function(err, data){
	if(err){
		return false;
	}
	var data = data.toString();
	if(!data){
		return false;
	}
	exports.items = JSON.parse(data);
});
exports.save = function(data){
	var data = JSON.stringify(data);
	exports.items = JSON.parse(data);
	fs.writeFile(path.join(__dirname, 'config.json'), data);
}
