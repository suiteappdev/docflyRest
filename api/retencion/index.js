var retencion = function(router, args){
	router.get('/retencion', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');

 		args.schema.find({}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));	 				
 			}
		});

	});

	router.get('/retencion/:id', function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		
 		args.schema.find({_id : req.params.id}, function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.post('/retencion', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _retencion = new args.schema({
 			estado 				: req.body.estado,
 			nombre				: req.body.nombre,
 			valor				: req.body.valor,
 			base				: req.body.base,
 			created 			: new Date(),
			metadata			: req.body.metadata
 		});

 		_retencion.save(function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

		router.put('/retencion/:id/activado', function(req, res, next) {
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

	router.put('/retencion/:id/desactivado', function(req, res, next) {
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


	router.put('/retencion/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findById({_id : req.params.id}, function(err, value){
 			if(!err){
	 			value.estado 		= req.body.estado,
	 			value.nombre		= req.body.nombre,
	 			value.valor			= req.body.valor,
	 			value.base			= req.body.base,
				value.updated		= new Date();

 				value.save(function(err, updated){
 					res.send(JSON.stringify(updated));
 				});
 			}
 		})
	});

	router.delete('/retencion/:id', function(req, res, next) {
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

module.exports = retencion;