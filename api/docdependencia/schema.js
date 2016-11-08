module.exports = function(mongoose){
	var docDependenciaSchema = mongoose.Schema({
	    id			: {type: String, index: {unique: true, required:true}},
	    parent		: String,
	    text		: String,
	    metadata 	: Object,
	    created 	: { type: Date, default: Date.now }
	});

	return mongoose.model('docDependencias', docDependenciaSchema);
}
