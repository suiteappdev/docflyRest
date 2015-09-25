module.exports = function(mongoose){
	var docRutaSchema = mongoose.Schema({
	    estado			: Boolean,
	    plantilla  		: Object,
	    path			: Array,
	    created 		: { type: Date, default: Date.now }
	});
	
	var model = mongoose.model('docRuta', docRutaSchema, 'docRuta');
	return model;
}