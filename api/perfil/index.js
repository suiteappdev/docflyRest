var perfil = function(router, args){
	router.get('/perfil', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[7].permisos.R){
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

	router.get('/perfil/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[7].permisos.R){
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
		res.status(401);
		res.end();
		}
	});

	router.post('/perfil', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[7].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
 		var _perfil = new args.schema({
 			nombre 				: req.body.nombre,
 			created				: new Date(),
			metadata			: req.body.metadata
 		});

 		_perfil.save(function(err, value){
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

	router.put('/perfil/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[7].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
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
				}
			})
		}else{
		res.status(401);
		res.end();
		}
	});

	router.delete('/perfil/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[7].permisos.D){
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
		res.status(401);
		res.end();
		}
	});

};

module.exports = perfil;