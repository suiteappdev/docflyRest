var docIndice = function(router, args){
	router.get('/docIndice', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[1].permisos.R){
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

	router.get('/docIndice/buscar', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
		var _acl = req.credential;
		if(_acl.formularios[1].permisos.R){
			args.schema.find({}, function(err, values){
				if(!err){
 		args.schema.find({
 			}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));
 			}
		}).or([
			{nombre : new RegExp(req.query.indice ? req.query.indice : '', 'i')},
 			]);
				}
			})
		}else{
			res.status(401);
			res.end();
		}

	});

	router.get('/docIndice/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[1].permisos.R){
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

	router.post('/docIndice', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[1].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
 		var _docIndice = new args.schema({
 			nombre				: req.body.nombre,
 			tipo				: req.body.tipo,
 			longitud			: req.body.longitud,
 			created 			: new Date(),
 		});

 		_docIndice.save(function(err, value){
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

	router.put('/docIndice/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[1].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
 		args.schema.findById({_id : req.params.id}, function(err, value){
 			if(!err){
 			value.nombre			= req.body.nombre,
 			value.tipo				= req.body.tipo,
 			value.longitud			= req.body.longitud,
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

	router.delete('/docIndice/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[1].permisos.W){
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

module.exports = docIndice;