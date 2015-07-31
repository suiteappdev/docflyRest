var retencion = function(router, args){
	router.get('/retencion', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[9].permisos.R){
			args.schema.find({}, function(err, values){
				if(!err){
 		args.schema.find({}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));	 				
 			}
		});
				}
			})
		}else{
		res.status(401);
		res.end();
		}


	});

	router.get('/retencion/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[9].permisos.R){
			args.schema.find({}, function(err, values){
				if(!err){
 		args.schema.find({_id : req.params.id}, function(err, value){
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

	router.post('/retencion', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[9].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
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
				}
			})
		}else{
		res.status(401);
		res.end();
		}

	});

		router.put('/retencion/:id/activado', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[9].permisos.W){
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
		res.status(401);
		res.end();
		}

	});

	router.put('/retencion/:id/desactivado', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[9].permisos.W){
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
		res.status(401);
		res.end();
		}

	});


	router.put('/retencion/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[9].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
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
				}
			})
		}else{
		res.status(401);
		res.end();
		}

	});

	router.delete('/retencion/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[9].permisos.D){
			args.schema.find({}, function(err, values){
				if(!err){
 		args.schema.findById({_id : req.params.id}, function(err, value){
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
		res.status(401);
		res.end();
		}

	});

};

module.exports = retencion;