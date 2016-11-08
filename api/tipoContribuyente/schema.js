module.exports = function(mongoose){
	var tipoContribuyenteSchema = mongoose.Schema({
	    nombre		: String,
	    created 		: { type: Date, default: Date.now },
	    metadata 		: Object
	});

	return mongoose.model('tipoContribuyente', tipoContribuyenteSchema, 'tipoContribuyente');
}