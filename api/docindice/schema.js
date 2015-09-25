module.exports = function(mongoose){
	var docIndiceSchema = mongoose.Schema({
	    nombre			: String,
	    tipo			: String,
	    longitud		: Number,
	    requerido		: Boolean, 
	    editable		: { type : Boolean, default : false},
	    created 		: { type: Date, default: Date.now }
	});

	return mongoose.model('docIndice', docIndiceSchema, 'docIndice');
}