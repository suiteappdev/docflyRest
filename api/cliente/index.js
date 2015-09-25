var cliente = function(router, args){
	router.get('/cliente', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[10].permisos.R){
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

	router.get('/cliente/buscar', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[10].permisos.R){
			args.schema.find(
 			{
 				'tipoCliente._id' :req.query.tipoCliente ? JSON.parse(req.query.tipoCliente)._id : {'$ne': null }, 
 				'estado.value'    :req.query.estado ? JSON.parse(req.query.estado).value : true,
 				documento : req.query.documento ? req.query.documento : {'$ne': null },
 			}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));
 			}
		}).or([
				{nombreCompleto : new RegExp(req.query.cliente ? req.query.cliente : '', 'i')},
				{representanteLegal : new RegExp(req.query.cliente ? req.query.cliente : '', 'i')},
				{razonSocial : new RegExp(req.query.cliente ? req.query.cliente : '', 'i')}
				]);
		}else{
			res.status(401);
			res.end();
		}
	});

	router.get('/cliente/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[10].permisos.R){
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

	router.post('/cliente', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[10].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
			 		var _cliente = new args.schema({
			 			estado 				: req.body.estado,
			 			tipoDocumento 		: req.body.tipoDocumento,
			 			documento 			: req.body.documento,
			 			nombre 				: req.body.nombre,
			 			apellido 			: req.body.apellido,
			 			nombreCompleto		: req.body.nombre && req.body.apellido ? req.body.nombre + ' ' + req.body.apellido : undefined,
			 			razonSocial 		: req.body.razonSocial,
			 			representanteLegal 	: req.body.representanteLegal,
			 			tipoCliente 		: req.body.tipoCliente,
			 			metadata			: req.body.metadata,
			 			created				: new Date()
			 		});

			 		_cliente.save(function(err, value){
			 			if(err){
			 				res.status(409),
			 				res.send(err);
			 				return;
			 			}

			 			res.send(JSON.stringify(value));
			 		});
				}
			})
		}else{
			res.status(401);
			res.end();
		}

	});

	router.put('/cliente/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[10].permisos.W){
			args.schema.findById({_id : req.params.id}, function(err, value){
	 			if(!err){
		 			value.estado 				 = req.body.estado,
		 			value.tipoDocumento 		 = req.body.tipoDocumento,
		 			value.documento 			 = req.body.documento,
		 			value.nombre 				 = req.body.nombre,
		 			value.apellido 			 	 = req.body.apellido,
		 			value.nombreCompleto		 = req.body.nombre && req.body.apellido ? req.body.nombre + ' ' + req.body.apellido : undefined,
		 			value.razonSocial 		     = req.body.razonSocial,
		 			value.representanteLegal 	 = req.body.representanteLegal,
		 			value.tipoCliente 		     = req.body.tipoCliente,
					value.metadata		 		 = req.body.metadata;
					value.updated		 		 = new Date();

	 				value.save(function(err, updated){
						if(!err){
							//actualizar cliente en la coleccion docDocumentacion
							var docDocumentacion = args.instance.model('docDocumentacion');
							docDocumentacion.update({"cliente._id" : updated._id} , {"cliente":updated} , {multi: true}, function(err, doc){
								console.log("Cliente en documentacion", doc);
							});
							
							//actualizar el cliente en coleccion usuario
							var usuario = args.instance.model('usuario');
							usuario.update({"cliente._id" : updated._id} , {"cliente":updated} , {multi: true}, function(err, doc){
								console.log("cliente en usuario", doc);
							});

							res.send(JSON.stringify(updated));						
						}
	 				});
	 			}
 			})
		}else{
			res.status(401);
			res.end();
		}

	});

	router.put('/cliente/:id/activado', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[10].permisos.W){
			args.schema.findOne({_id : req.params.id}, function(err, value){
	 			if(!err){
		 			value.estado 		 = { value : true, name : "Activo"};
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

	router.put('/cliente/:id/desactivado', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[10].permisos.W){
			args.schema.findOne({_id : req.params.id}, function(err, value){
	 			if(!err){
		 			value.estado 		 = { value : false, name : "Inactivo"};
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

	router.delete('/cliente/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[10].permisos.D){
			args.schema.findById({_id : req.param('id')}, function(err, value){
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

module.exports = cliente;