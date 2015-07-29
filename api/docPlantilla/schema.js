module.exports = function(mongoose){
	var docPlantillaSchema = mongoose.Schema({
	    estado  		: Boolean,
	    nombre			: String,
	    indice			: Object,
	    created 		: { type: Date, default: Date.now }
	});

	return mongoose.model('docPlantilla', docPlantillaSchema, 'docPlantilla');
}