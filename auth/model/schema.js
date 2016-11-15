var crypto = require("crypto");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    estado			: Object,
    perfil			: Object,
    cliente			: { type : Schema.Types.ObjectId , ref : 'cliente'},
    usuario			: String,
    password		: String,
    permiso			: Object,
    created 		: { type: Date, default: Date.now },
    metadata        : Object,
    misPlantillas   : [{ type : Schema.Types.ObjectId , ref : 'docRuta'}],
    misEstados   : [{ type : Schema.Types.ObjectId , ref : 'docEstado'}],
    update			: Date,
});
		
module.exports = mongoose.model('usuario', usuarioSchema, 'usuario');
