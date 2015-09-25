module.exports = function(mongoose){
	var docDocumentacionSchema = mongoose.Schema({
	    estado			: Object,
	    ruta			: Object,
	    hash			: String,
	    usuario			: Object,
	    directorio		: String,
	    archivo			: Number,
	    plantilla		: Object,
	    enUso			: Boolean, 
	    consecutivo		: Number,
	    created 		: { type: Date, default: Date.now },
	    metadata		: Object
	});

	return mongoose.model('docDocumentacion', docDocumentacionSchema, 'docDocumentacion');
}

