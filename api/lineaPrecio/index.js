var lineaPrecio = function(router, args){
	router.get('/lineaPrecio', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');

 		args.schema.find({}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));	 				
 			}
		});

	});

	router.get('/lineaPrecio/:id', function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		
 		args.schema.findOne({_id : req.param('id')}, function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.post('/lineaPrecio', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _lineaPrecio = new args.schema({
 			nombre 				: req.body.nombre,
 			created				: new Date(),
			metadata			: req.body.metadata
 		});

 		_lineaPrecio.save(function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.put('/lineaPrecio/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findById({_id : req.param('id')}, function(err, value){
 			if(!err){
	 			value.nombre 				= req.body.nombre;
				value.metadata				= req.body.metadata;
				value.updated				= new Date();

 				value.save(function(err, updated){
 					res.send(JSON.stringify(updated));
 				});
 			}
 		})
	});

	router.delete('/lineaPrecio/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findById({_id : req.param('id')}, function(err, value){
 			if(!err){
 				value.remove();
				res.sendStatus(200);
				return;
 			}

 			res.sendStatus(500);
 		})
	});

};

module.exports = lineaPrecio;