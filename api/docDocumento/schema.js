module.exports = function(mongoose){
	var mongoose = require("mongoose");
	var schema = mongoose.Schema;
	
	var docDocumentacionSchema = mongoose.Schema({
	    estado			: Object,
	    ruta			: Object,
	    hash			: String,
	    usuario			: { type : schema.Types.ObjectId , ref : 'cliente'},
	    directorio		: String,
	    archivo			: Number,
	    plantilla		: Object,
	    enUso			: Boolean, 
	    consecutivo		: Number,
	    empresa			: { type : schema.Types.ObjectId , ref : 'empresa'},
	    created 		: { type: Date, default: Date.now },
	    metadata		: Object
	});

	docDocumentacionSchema.pre('save', function (next) {
	    var self = this;
	    next();

	});

	return mongoose.model('docDocumentacion', docDocumentacionSchema, 'docDocumentacion');
}

