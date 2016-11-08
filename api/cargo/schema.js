module.exports = function(mongoose){
	var cargoSchema = mongoose.Schema({
	    nombre			: String,
	    created 		: { type: Date, default: Date.now },
	    metadata 		: Object
	});

	return mongoose.model('cargo', cargoSchema, 'cargo');
}