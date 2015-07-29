module.exports = function(mongoose){
	var perfilSchema = mongoose.Schema({
	    nombre		: String,
	    created 		: { type: Date, default: Date.now },
	    metadata 		: Object
	});

	return mongoose.model('perfil', perfilSchema, 'perfil');
}