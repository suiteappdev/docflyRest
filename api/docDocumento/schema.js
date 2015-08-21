module.exports = function(mongoose){
	var docDocumentacionSchema = mongoose.Schema({
	    estado			: Object,
	    ruta			: Object,
	    hash			: String,
	    cliente			: Object,
	    directorio		: String,
	    archivo			: Number,
	    plantilla		: Object, 
	    created 		: { type: Date, default: Date.now },
	});

	return mongoose.model('docDocumentacion', docDocumentacionSchema, 'docDocumentacion');
}