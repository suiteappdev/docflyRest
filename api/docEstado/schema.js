module.exports = function(mongoose){
	var docEstadoSchema = mongoose.Schema({
	    nombre 			: String,
	    gestion			: Boolean,
	    created 		: { type: Date, default: Date.now },
	});

	return mongoose.model('docEstado', docEstadoSchema, 'docEstado');
}