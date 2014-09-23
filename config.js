var fs = require('fs');
var path = require('path');
var configFile = path.join(__dirname, 'config.json');
var defaultConfigFile = path.join(__dirname, 'default-config.json');
fs.readFile(defaultConfigFile, function(err, defaultData){
	var defaultData = defaultData.toString();
	fs.readFile(configFile, function(err, data){
		if(err){
			return false;
		}
		var data = data.toString();
		if(!data){
			return false;
		}
		var userItems = JSON.parse(data);
		var items = JSON.parse(defaultData);
		for(var x in items){
			if(userItems[x]){
				items[x] = userItems[x];
			}
		}
		exports.items = items;
	});
});

exports.save = function(data){
	var data = JSON.stringify(data);
	exports.items = JSON.parse(data);
	fs.writeFile(configFile, data);
}
