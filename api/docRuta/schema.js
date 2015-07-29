module.exports = function(mongoose){
	var docRutaSchema = mongoose.Schema({
	    estado			: Boolean,
	    plantilla  		: Object,
	    path			: Array,
	    created 		: { type: Date, default: Date.now }
	});
	
	var model = mongoose.model('docRuta', docRutaSchema, 'docRuta');
	
	docRutaSchema.pre("save", function(next) {
	    var _self = this;

		model.findOne({'plantilla.nombre' : this.plantilla.nombre}, function(err, value){
			if(value){
				next(new Error("La ruta ya se encuentra registrada."));
				return;
			}

			next()
		});

	});
	
	return model;
}