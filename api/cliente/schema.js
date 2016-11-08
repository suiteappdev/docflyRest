module.exports = function(mongoose){
	var clienteSchema = mongoose.Schema({
	    estado				: Object,
	    tipoDocumento		: String,
	    documento			: {type: String, index: {unique: true, required:true}},
	    nombre				: String,
	    apellido			: String,
	    nombreCompleto		: String,
	    razonSocial			: String,
	    representanteLegal	: String,
	    tipoCliente			: Object,
	    created 			: { type: Date, default: Date.now },
	    metadata 			: Object,
	    updated				:{ type: Date, default: Date.now }
	});

	return mongoose.model('cliente', clienteSchema, 'cliente');
}