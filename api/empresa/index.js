var empresa = function(router, args){
	router.get('/empresa', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
 			if(_acl.formularios[11].permisos.R){
				args.schema.find({}, function(err, values){
		 			if(!err){
						return res.send(JSON.stringify(values));	 				
		 			}
				})
 			}else{
				res.status(401)
 			}
	});

	router.get('/empresa/buscar', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;

 			if(_acl.formularios[11].permisos.R){
				args.schema.find({
		 			}, function(err, values){
		 			if(!err){
						res.send(JSON.stringify(values));
		 			}
				}).or([
					{nombre : new RegExp(req.query.empresa ? req.query.empresa : '', 'i')},
					{representanteLegal : new RegExp(req.query.empresa ? req.query.empresa : '', 'i')},
					{razonSocial : new RegExp(req.query.empresa ? req.query.empresa : '', 'i')},
					{nit : new RegExp(req.query.empresa ? req.query.empresa : '', 'i')}
		 			]);
 			}else{
				res.status(401)
 			}

 		
	});

	router.get('/empresa/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;

 			if(_acl.formularios[11].permisos.R){
				args.schema.find({}, function(err, values){
		 			if(!err){
	 					args.schema.findOne({_id : req.param('id')}, function(err, value){
 						if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
		 			}
				})
 			}else{
				res.status(401)
 			}
 
	});



	router.post('/empresa', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;

 			if(_acl.formularios[11].permisos.W){
				args.schema.find({}, function(err, values){
		 			if(!err){
				 		var _empresa = new args.schema({
			 			estado				: req.body.estado,
			 			nombre 				: req.body.nombre,
			 			nit					: req.body.nit,
			 			direccion			: req.body.direccion,
			 			representanteLegal 	: req.body.representanteLegal,
						razonSocial			: req.body.razonSocial,
						sucursal			: req.body.sucursal,
						localizacion		: req.body.localizacion, 
						metadata			: req.body.metadata
			 		});

			 		_empresa.save(function(err, value){
			 			if(!err){
			 				res.send(JSON.stringify(value));
			 			}
			 		});
					 			}
				})
 			}else{
				res.status(401)
 			}
 		
	});

router.put('/empresa/:id/activado', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;

		if(_acl.formularios[11].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
					args.schema.findOne({_id : req.params.id}, function(err, value){
		 			if(!err){
			 			value.estado 		 = true;
						value.updated		 = new Date();

		 				value.save(function(err, updated){
		 					res.send(JSON.stringify(updated));
		 				});
		 			}
		 			})
				}
			})
		}else{
		res.status(401)
		}

	});

	router.put('/empresa/:id/desactivado', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;

		if(_acl.formularios[11].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
					args.schema.findOne({_id : req.params.id}, function(err, value){
		 				if(!err){
				 			value.estado 		 = false;
							value.updated		 = new Date();

			 				value.save(function(err, updated){
			 					res.send(JSON.stringify(updated));
			 				});
			 			}
		 			})
				}
			})
		}else{
		res.status(401)
		}

	});

	router.put('/empresa/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;

		if(_acl.formularios[11].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
				args.schema.findById({_id : req.param('id')}, function(err, value){
		 			if(!err){
		 			value.estado				= req.body.estado,
		 			value.nombre 				= req.body.nombre,
		 			value.nit					= req.body.nit,
		 			value.direccion				= req.body.direccion,
		 			value.representanteLegal 	= req.body.representanteLegal,
					value.razonSocial			= req.body.razonSocial,
					value.sucursal				= req.body.sucursal,
					value.localizacion			= req.body.localizacion,
					value.metadata				= req.body.metadata

		 				value.save(function(err, updated){
		 					res.send(JSON.stringify(updated));
		 				});
		 			}
	 		})
					}
			})
				}else{
				res.status(401)
				}

	});

	router.delete('/empresa/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;

		if(_acl.formularios[11].permisos.R){
			args.schema.find({}, function(err, values){
				if(!err){
				args.schema.findById({_id : req.param('id')}, function(err, value){
		 			if(!err){
		 				value.remove();
						res.sendStatus(200);
						return;
		 			}

	 			res.sendStatus(500);
	 			})
				}
			})
			}else{
			res.status(401)
			}

	});

};

module.exports = empresa;