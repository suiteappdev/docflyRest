var connection = function(setup){
	var mongoose = require('mongoose');
	return mongoose.connect('mongodb://'+ setup.user +':'+setup.pwd+'@'+setup.host+':'+setup.port+'/'+setup.database+'');	
};

module.exports = connection 
