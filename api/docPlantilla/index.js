var docPlantilla = function(router, args){
	router.get('/docPlantilla', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[2].permisos.R){
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

	router.get('/docPlantilla/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[2].permisos.R){
			args.schema.find({_id : req.params.id}, function(err, value){
	 			if(!err){
	 				res.send(JSON.stringify(value));
	 			}
	 		});
		}else{
			res.status(401);
			res.end();
		} 		
	});

	router.post('/docPlantilla', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[2].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
 		var _docPlantilla = new args.schema({
 			estado 				: req.body.estado,
 			nombre				: req.body.nombre,
 			indice				: req.body.indice,
 			cliente				: req.body.cliente,
 			expira				: {expira : req.body.expira , value : ''},
 			created 			: new Date(),
			metadata			: req.body.metadata
 		});

 		_docPlantilla.save(function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
				}
			})
		}else{
			res.status(401);
			res.end();
		}
	});

	router.put('/docPlantilla/:id/activado', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[2].permisos.W){
	 		args.schema.findOne({_id : req.params.id}, function(err, value){
	 			if(!err){
		 			value.estado 		 = true;
					value.updated		 = new Date();

	 				value.save(function(err, updated){
	 					res.send(JSON.stringify(updated));
	 				});
	 			}
			})
		}else{
			res.status(401);
			res.end();
		}
	});

	router.put('/docPlantilla/:id/desactivado', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[2].permisos.W){
	  		args.schema.findOne({_id : req.params.id}, function(err, value){
	 			if(!err){
		 			value.estado 		 = false;
					value.updated		 = new Date();

	 				value.save(function(err, updated){
	 					res.send(JSON.stringify(updated));
	 				});
	 			}
	 		})
		}else{
			res.status(401);
			res.end();
		}
	});


	router.put('/docPlantilla/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[2].permisos.W){
	 		args.schema.findById({_id : req.params.id}, function(err, value){
	 			if(!err){
		 			value.estado 		= req.body.estado,
		 			value.nombre		= req.body.nombre,
		 			value.indice		= req.body.indice,
		 			value.expira 		= req.body.expira,
		 			value.cliente 		= req.body.cliente,
		 			value.metadata 		= req.body.metadata,
					value.updated		= new Date();

	 				value.save(function(err, updated){
	 					res.send(JSON.stringify(updated));
	 				});
	 			}
	 		})
		}else{
			res.status(401);
			res.end();
		}
	});

	router.delete('/docPlantilla/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[2].permisos.W){
	 		args.schema.findById({_id : req.params.id}, function(err, value){
	 			if(!err){
	 				value.remove();
					res.sendStatus(200);
				return;
	 			}

	 			res.sendStatus(500);
	 		})
		}else{
			res.status(401);
			res.end();
		}

	});
};

module.exports = docPlantilla;