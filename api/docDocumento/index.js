var docDocumento = function(router, args, io){

	router.get('/docDocumento', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		
 		var _acl = req.credential;

		if(_acl.formularios[13].permisos.R){
			args.schema.find({}, function(err, values){
				if(!err){
					res.send(JSON.stringify(values));	 				
				}
			});
		}else{
			res.status(401);
			res.end();
		}
	});

	router.get('/docDocumento/buscar', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
 		
		if(_acl.formularios[13].permisos.R){
			args.schema.find({}, function(err, values){
				if(!err){
 					var _criteria = new Object();

		 			if(req.query.id){
		 				_criteria = {
		 					'plantilla._id' : req.query.id || {'$ne': null }
		 				};
		 			}

		 			if(req.query.estado){
		 				_criteria = {
		 					'estado._id' : req.query.estado || {'$ne': null }
		 				};
		 			}

		 			if(req.query.criteria){
		 				_criteria = {
		 					'plantilla.indice' : { $elemMatch:{value:new RegExp(req.query.criteria ? req.query.criteria : '','i')}}
		 				}
		 			}

		 			if(req.query.cliente){
		 				_criteria = {
		 					$or: [
		 						{'cliente.nombreCompleto' : new RegExp(req.query.cliente, 'i')},
		 						{'cliente.representanteLegal' : new RegExp(req.query.cliente, 'i')},
		 						{'cliente.razonSocial' : new RegExp(req.query.cliente, 'i')}
							]
		 				};
		 			}

		 			if(req.query.ini && req.query.end){
		 				_criteria.created = {$gte: req.query.ini ? new Date(req.query.ini) : {'$ne' : null}, $lte: req.query.end ? new Date(req.query.end) : {'$ne': null}};
		 			}

	 				args.schema.find(_criteria, function(err, values){
			 			if(!err){
							res.send(JSON.stringify(values));
			 			}
					})
				}
			})
		}else{
			res.status(401);
			res.end();
		}
	});

	router.post('/docDocumento', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;

		if(_acl.formularios[12].permisos.R){
			args.schema.find({}, function(err, values){
			if(!err){
		 		var _docDocumento = new args.schema({
		 			estado				: req.body.estado,
		 			ruta				: req.body.ruta,
		 			hash				: req.body.hash,
		 			cliente				: req.body.cliente,
		 			directorio			: req.body.directorio,
		 			archivo				: req.body.archivo,
		 			plantilla			: req.body.plantilla,
		 			created 			: new Date()
		 		});

		 		_docDocumento.save(function(err, value){
		 			if(!err){
		 				res.send(JSON.stringify(value));
		 				io.emit(value.estado.nombre, value);
		 			}
		 		});

			}
		})

		}else{
			res.status(401);
			res.end();
		}
	});

	router.put('/docDocumento/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;

		if(_acl.formularios[13].permisos.R){
			args.schema.find({}, function(err, values){
				if(!err){
			 		args.schema.findById({_id : req.params.id}, function(err, value){
			 			if(!err){
			 				value.estado				= req.body.estado;
				 			ruta						= req.body.ruta,
				 			hash						= req.body.hash,
				 			cliente						= req.body.cliente,
				 			directorio					= req.body.directorio,
				 			archivo						= req.body.archivo,
				 			plantilla					= req.body.plantilla,
				 			
							value.updated				= new Date();

			 				value.save(function(err, updated){
			 					res.send(JSON.stringify(updated));
		 						io.emit(updated.estado.nombre, updated);
			 				});
			 			}
			 		})
				}
			})
		}else{
			res.status(401);
			res.end();
		}
	});


	router.get('/docDocumento/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
		var _acl = req.credential;
			if(_acl.formularios[13].permisos.R){
				args.schema.findOne({_id : req.params.id}, function(err, value){
		 			if(!err){
		 				res.send(JSON.stringify(value));
		 			}
	 			});
			}else{
				res.status(401);
				res.end();
			}
	});

	router.delete('/docDocumento/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[13].permisos.R){
	 		args.schema.findById({_id : req.params.id}, function(err, value){
	 			if(!err){
	 				value.remove();
					res.status(200);
					return;
	 			}

	 			res.status(500);
	 		})
		}else{
			res.status(401);
			res.end();
		}

	});
};

module.exports = docDocumento;