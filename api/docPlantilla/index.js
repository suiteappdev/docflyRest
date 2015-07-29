var docPlantilla = function(router, args){
	router.get('/docPlantilla', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');

 		args.schema.find({}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));	 				
 			}
		});

	});

	router.get('/docPlantilla/:id', function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		
 		args.schema.find({_id : req.params.id}, function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.post('/docPlantilla', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _docPlantilla = new args.schema({
 			estado 				: req.body.estado,
 			nombre				: req.body.nombre,
 			indice				: req.body.indice,
 			created 			: new Date(),
			metadata			: req.body.metadata
 		});

 		_docPlantilla.save(function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

		router.put('/docPlantilla/:id/activado', function(req, res, next) {
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

	router.put('/docPlantilla/:id/desactivado', function(req, res, next) {
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


	router.put('/docPlantilla/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findById({_id : req.params.id}, function(err, value){
 			if(!err){
	 			value.estado 		= req.body.estado,
	 			value.nombre		= req.body.nombre,
	 			value.indice			= req.body.indice,
				value.updated		= new Date();

 				value.save(function(err, updated){
 					res.send(JSON.stringify(updated));
 				});
 			}
 		})
	});

	router.delete('/docPlantilla/:id', function(req, res, next) {
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

module.exports = docPlantilla;