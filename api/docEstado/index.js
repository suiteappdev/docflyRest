var docEstado = function(router, args){
	router.get('/docEstado',args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[14].permisos.R){
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

	router.get('/docEstado/:id',args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[14].permisos.R){
			args.schema.find({}, function(err, values){
				if(!err){
			args.schema.findOne({_id : req.params.id}, function(err, value){
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

	router.post('/docEstado',args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[14].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
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
				}
			})
		}else{
			res.status(401);
			res.end();
		}

	});

	router.put('/docEstado/:id',args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[14].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
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
				}
			})
		}else{
			res.status(401);
			res.end();
		}

	});

	router.put('/docEstado/:id/activado',args.security.Auth, function(req, res, next) {
		res.setHeader('Content-Type', 'application/json');
		var _acl = req.credential;
		if(_acl.formularios[14].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
			args.schema.findOne({_id : req.params.id}, function(err, value){
			if(!err){
 			value.gestion 		 = true;
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

	router.put('/docEstado/:id/desactivado',args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[14].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
			args.schema.findOne({_id : req.params.id}, function(err, value){
 			if(!err){
	 			value.gestion 		 = false;
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

	router.delete('/docEstado/:id',args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
		var _acl = req.credential;
		if(_acl.formularios[14].permisos.W){
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