var tipoCliente = function(router, args){
	router.get('/tipoCliente', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 				var _acl = req.credential;
		if(_acl.formularios[6].permisos.R){
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

	router.get('/tipoCliente/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[6].permisos.R){
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

	router.post('/tipoCliente', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[6].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
 		var _tipoCliente = new args.schema({
 			estado 				: req.body.estado,
 			descripcion 		: req.body.descripcion,
 			created				: new Date()
 		});

 		_tipoCliente.save(function(err, value){
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

	router.put('/tipoCliente/:id/activado', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[6].permisos.W){
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

	router.put('/tipoCliente/:id/desactivado', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[6].permisos.W){
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

	router.put('/tipoCliente/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[6].permisos.W){
	 		args.schema.findById({_id : req.params.id}, function(err, value){
	 			if(!err){
		 			value.estado 			= req.body.estado,
		 			value.descripcion 		= req.body.descripcion,
		 			value.created			= new Date(),
					value.metadata			= req.body.metadat
					value.updated			= new Date();

	 				value.save(function(err, updated){
	 					if(!err){
		 					var cliente = args.instance.model('cliente');
							cliente.update({"tipoCliente._id" : req.params.id} , { "tipoCliente.descripcion" : updated.descripcion} , {multi: true}, function(err, doc){});
							var usuario = args.instance.model('usuario');
							usuario.update({"cliente.tipoCliente._id" : req.params.id} , { "cliente.tipoCliente.descripcion" : updated.descripcion} , {multi: true}, function(err, doc){});
							var docDocumentacion = args.instance.model('docDocumentacion');
							docDocumentacion.update({"cliente.tipoCliente._id" : req.params.id} , { "cliente.tipoCliente.descripcion" : updated.descripcion} , {multi: true}, function(err, doc){});
							res.send(JSON.stringify(updated))	 						
	 					}
	 				});
	 			}
	 		})
		}else{
			res.status(401);
			res.end();
		}
	});

	router.delete('/tipoCliente/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[6].permisos.D){
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

module.exports = tipoCliente;