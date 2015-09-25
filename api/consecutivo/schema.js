module.exports = function(mongoose){
	var consecutivoSchema = mongoose.Schema({
	    nombre			: String,
	    valor			: Number,
	    created 		: { type: Date, default: Date.now },
	    metadata 		: Object
	});

	consecutivoSchema.statics.increment = function (counter, callback) {
	    return this.findByIdAndUpdate(counter, { $inc: { valor: 1 } }, {new: true, upsert: true, select: {valor: 1}}, callback);
	};

	return mongoose.model('consecutivo', consecutivoSchema, 'consecutivo');
}