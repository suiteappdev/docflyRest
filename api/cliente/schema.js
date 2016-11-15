module.exports = function(mongoose){
	var mongoose = require("mongoose");
	var schema = mongoose.Schema;
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
    	empresa		    : { type : schema.Types.ObjectId , ref : 'empresa'},
	    created 			: { type: Date, default: Date.now },
	    metadata 			: Object,
	    updated				:{ type: Date, default: Date.now }
	});

	return mongoose.model('cliente', clienteSchema, 'cliente');
}