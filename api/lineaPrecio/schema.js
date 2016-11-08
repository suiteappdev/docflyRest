module.exports = function(mongoose){
	var lineaPrecioSchema = mongoose.Schema({
	    nombre			: String,
	    created 		: { type: Date, default: Date.now },
	    metadata 		: Object
	});

	return mongoose.model('lineaPrecio', lineaPrecioSchema, 'lineaPrecio');
}