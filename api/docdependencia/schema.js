module.exports = function(mongoose){
	var docDependenciaSchema = mongoose.Schema({
	    id			: String,
	    parent		: String,
	    text		: String,
	    metadata 	: Object,
	    created 	: { type: Date, default: Date.now }
	});

	return mongoose.model('docDependencias', docDependenciaSchema);
}
