module.exports = function(mongoose){
	var empresaSchema = mongoose.Schema({
		estado 				: Object,
	    nombre				: String,
	    razonSocial			: String,
	    nit					: String,
	    representanteLegal	: String,
	    direccion			: String,
	    localizacion		: Object,
	    metadata 			: Object,
	    created 			: { type: Date, default: Date.now },

	});

	return mongoose.model('empresa', empresaSchema, 'empresa');
}


