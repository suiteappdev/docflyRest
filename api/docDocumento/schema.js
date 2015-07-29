module.exports = function(mongoose){
	var docDocumentacionSchema = mongoose.Schema({
	    estado			: Object,
	    ruta			: Object,
	    cliente			: Object,
	    directorio		: String,
	    archivo			: Number,
	    plantilla		: Object, 
	    created 		: { type: Date, default: Date.now },
	});

	return mongoose.model('docDocumentacion', docDocumentacionSchema, 'docDocumentacion');
}