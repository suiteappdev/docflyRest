module.exports = function(mongoose){
	var retencionSchema = mongoose.Schema({
	    estado  		: Boolean,
	    nombre			: String,
	    valor			: String,
	    base			: String,
	    created 		: { type: Date, default: Date.now }
	});

	return mongoose.model('retencion', retencionSchema, 'retencion');
}