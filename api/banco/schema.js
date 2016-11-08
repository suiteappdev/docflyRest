module.exports = function(mongoose){
	var bancoSchema = mongoose.Schema({
	    nombre			: String,
	    created 		: { type: Date, default: Date.now },
	    metadata 		: Object
	});

	return mongoose.model('banco', bancoSchema, 'banco');
}