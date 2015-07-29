var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
	token : String,
	user  : Object,
	expire : {type : Date, default : Date.now},
});

sessionSchema.methods.hasExpired = function(){
	var _now = new Date();

	return Math.round((Date.now() - expire ) / 1000) > 43200 // segundos;
}

sessionSchema.statics.getToken = function(token, callback){
	return this.model('session').findOne({ token : token }, callback);
}

sessionSchema.statics.removeToken = function(token, callback){
	return this.model('session').findOne({ token : token}, callback);
}

sessionSchema.statics.refresh = function(token, callback){
	return this.model('session').update({ token : token }, {expire : Date.now}, callback)
}

module.exports =  mongoose.model('session', sessionSchema, 'session');
