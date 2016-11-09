module.exports = function(mongoose){
	var schema = mongoose.Schema;
	var docRutaSchema = mongoose.Schema({
	    estado			: Boolean,
	    plantilla  		: { type : schema.Types.ObjectId , ref : 'docPlantilla'},
	    path			: Array,
	    created 		: { type: Date, default: Date.now }
	});
	
	var model = mongoose.model('docRuta', docRutaSchema, 'docRuta');
	return model;
}