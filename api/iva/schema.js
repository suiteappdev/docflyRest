module.exports = function(mongoose){
	var ivaSchema = mongoose.Schema({
	    valor  			: String,
	    created 		: { type: Date, default: Date.now },
	    metadata 		: Object
	});

	return mongoose.model('iva', ivaSchema, 'iva');
}