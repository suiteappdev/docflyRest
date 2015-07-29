var tipoCliente = function(router, args){
	router.get('/tipoCliente', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');

 		args.schema.find({}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));	 				
 			}
		});

	});

	router.get('/tipoCliente/:id', function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		
 		args.schema.findOne({_id : req.params.id}, function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.post('/tipoCliente', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _tipoCliente = new args.schema({
 			estado 				: req.body.estado,
 			descripcion 		: req.body.descripcion,
 			created				: new Date()
 		});

 		_tipoCliente.save(function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.put('/tipoCliente/:id/activado', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findOne({_id : req.params.id}, function(err, value){
 			if(!err){
	 			value.estado 		 = true;
				value.updated		 = new Date();

 				value.save(function(err, updated){
 					res.send(JSON.stringify(updated));
 				});
 			}
 		})
	});

	router.put('/tipoCliente/:id/desactivado', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
  		args.schema.findOne({_id : req.params.id}, function(err, value){
 			if(!err){
	 			value.estado 		 = false;
				value.updated		 = new Date();

 				value.save(function(err, updated){
 					res.send(JSON.stringify(updated));
 				});
 			}
 		})
	});

	router.put('/tipoCliente/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findById({_id : req.params.id}, function(err, value){
 			if(!err){
	 			value.estado 			= req.body.estado,
	 			value.descripcion 		= req.body.descripcion,
	 			value.created			= new Date(),
				value.metadata			= req.body.metadat
				value.updated			= new Date();

 				value.save(function(err, updated){
 					res.send(JSON.stringify(updated));
 				});
 			}
 		})
	});

	router.delete('/tipoCliente/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findById({_id : req.params.id}, function(err, value){
 			if(!err){
 				value.remove();
				res.sendStatus(200);
				return;
 			}

 			res.sendStatus(500);
 		})
	});

};

module.exports = tipoCliente;