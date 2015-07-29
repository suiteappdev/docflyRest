module.exports = function(mongoose){
	var tipoClienteSchema = mongoose.Schema({
	    estado			: Boolean,
	    descripcion		: {type: String, index: {unique: true, required:true}},
	    created 		: { type: Date, default: Date.now }
	});

	return mongoose.model('tipoCliente', tipoClienteSchema, 'tipoCliente');
}