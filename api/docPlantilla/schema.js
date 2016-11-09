module.exports = function(mongoose){
	var schema = mongoose.Schema;
	var docPlantillaSchema = mongoose.Schema({
	    estado  		: Boolean,
	    nombre			: String,
	    indice			: [{ type : schema.Types.ObjectId , ref : 'docIndice'}],
	    cliente			: Boolean,
	    expira			: Object,
	    metadata		: Object,
	    created 		: { type: Date, default: Date.now }
	});

	return mongoose.model('docPlantilla', docPlantillaSchema, 'docPlantilla');
}