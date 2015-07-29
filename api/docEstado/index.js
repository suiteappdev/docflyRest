var docEstado = function(router, args){
	router.get('/docEstado', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');

 		args.schema.find({}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));	 				
 			}
		});

	});

	router.get('/docEstado/:id', function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		
 		args.schema.findOne({_id : req.params.id}, function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.post('/docEstado', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _docEstado = new args.schema({
 			nombre 				: req.body.nombre,
 			gestion				: req.body.gestion,
 			created 			: new Date()
 		});

 		_docEstado.save(function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.put('/docEstado/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findById({_id : req.params.id}, function(err, value){
 			if(!err){
	 			value.nombre				= req.body.nombre;
	 			value.gestion				= req.body.gestion,
				value.updated				= new Date();

 				value.save(function(err, updated){
 					res.send(JSON.stringify(updated));
 				});
 			}
 		})
	});

		router.put('/docEstado/:id/activado', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findOne({_id : req.params.id}, function(err, value){
 			if(!err){
	 			value.gestion 		 = true;
				value.updated		 = new Date();

 				value.save(function(err, updated){
 					res.send(JSON.stringify(updated));
 				});
 			}
 		})
	});

	router.put('/docEstado/:id/desactivado', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findOne({_id : req.params.id}, function(err, value){
 			if(!err){
	 			value.gestion 		 = false;
				value.updated		 = new Date();

 				value.save(function(err, updated){
 					res.send(JSON.stringify(updated));
 				});
 			}
 		})
	});

	router.delete('/docEstado/:id', function(req, res, next) {
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

module.exports = docEstado;