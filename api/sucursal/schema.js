module.exports = function(mongoose){
	var sucursalSchema = mongoose.Schema({
	    descripcion		: String,
	    created 		: { type: Date, default: Date.now },
	    metadata 		: Object
	});

	return mongoose.model('tipoCliente', tipoClienteSchema, 'tipoCliente');
}