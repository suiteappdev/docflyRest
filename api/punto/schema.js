module.exports = function(mongoose){
	var puntoSchema = mongoose.Schema({
	    puntos		: String,
	    created 		: { type: Date, default: Date.now },
	    metadata 		: Object
	});

	return mongoose.model('punto', puntoSchema, 'punto');
}