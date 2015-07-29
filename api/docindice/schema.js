module.exports = function(mongoose){
	var docIndiceSchema = mongoose.Schema({
	    nombre			: String,
	    tipo			: String,
	    longitud		: Number,
	    created 		: { type: Date, default: Date.now }
	});

	return mongoose.model('docIndice', docIndiceSchema, 'docIndice');
}