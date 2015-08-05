var crypto = require("crypto");
var mongoose = require("mongoose");
var schema = mongoose.Schema;

var usuarioSchema = new schema({
    estado			: Object,
    perfil			: Object,
    cliente			: Object,
    usuario			: String,
    password		: String,
    permiso			: Object,
    created 		: { type: Date, default: Date.now },
    metadata		: Object,
    update			: Date,
});
		
module.exports = mongoose.model('usuario', usuarioSchema, 'usuario');
