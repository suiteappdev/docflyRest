var barrio = function(router, args){
	router.get('/barrio', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 				var _acl = req.credential;
		if(_acl.formularios[4].permisos.R){
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

	router.get('/barrio/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[4].permisos.R){
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

	router.get('/localizacion/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[4].permisos.R){
			args.schema.find({}, function(err, values){
				if(!err){
					args.schema.find({code: req.params.id}, function(err, value){
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

	router.post('/barrio', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[4].permisos.W){

			var _barrio = new args.schema({
	 			code 				: req.body.code,
	 			nombre 				: req.body.nombre,
	 			created				: new Date(),
				metadata			: req.body.metadata
			});

 			_barrio.save(function(err, value){
	 			if(!err){
	 				res.send(JSON.stringify(value));
	 			}
 			});
		}else{
				res.status(401);
				res.end();
		}
	});

	router.put('/barrio/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[4].permisos.W){
			args.schema.findById({_id : req.params.id}, function(err, value){
	 			if(!err){
	 				value.code 			= req.body.code,
	 				value.nombre 		= req.body.nombre,
					value.metadata		= req.body.metadata;
					value.updated		= new Date();

	 				value.save(function(err, updated){
	 					var cliente = args.instance.model('cliente');
						cliente.update({"metadata.localizacion.barrio._id" : req.params.id} , { "metadata.localizacion.barrio.nombre" : updated.nombre} , {multi: true}, function(err, doc){});
						var usuario = args.instance.model('usuario');
						usuario.update({"cliente.metadata.localizacion.barrio._id" : req.params.id} , { "cliente.metadata.localizacion.barrio.nombre" : updated.nombre} , {multi: true}, function(err, doc){});
						var usuario = args.instance.model('docDocumentacion');
						docDocumentacion.update({"cliente.metadata.localizacion.barrio._id" : req.params.id} , { "cliente.metadata.localizacion.barrio.nombre" : updated.nombre} , {multi: true}, function(err, doc){});
	 					res.send(JSON.stringify(updated));
	 				});
	 			}
 		})
		}else{
			res.status(401);
			res.end();
		}
	});

	router.delete('/barrio/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[4].permisos.D){
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

module.exports = barrio;