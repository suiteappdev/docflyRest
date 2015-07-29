module.exports = function(mongoose){
	var rolSchema = mongoose.Schema({
	    perfil			: Object,
	    permiso 		: Object,
	    created 		: { type: Date, default: Date.now },
	});

	return mongoose.model('rol', rolSchema, 'rol');
}