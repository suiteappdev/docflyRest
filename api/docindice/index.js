var docIndice = function(router, args){
	router.get('/docIndice', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[1].permisos.R){
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

	router.get('/docIndice/buscar', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
		var _acl = req.credential;
		if(_acl.formularios[1].permisos.R){
	 		args.schema.find({}, function(err, values){
	 			if(!err){
					res.send(JSON.stringify(values));
	 			}
			}).or([{nombre : new RegExp(req.query.indice ? req.query.indice : '', 'i')}]);
		}else{
			res.status(401);
			res.end();
		}
	});

	router.get('/docIndice/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[1].permisos.R){
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

	router.post('/docIndice', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[1].permisos.W){
	 		var _docIndice = new args.schema({
	 			nombre				: req.body.nombre,
	 			tipo				: req.body.tipo,
	 			editable			: req.body.editable,
	 			requerido			: req.body.requerido,
	 			unico				: req.body.unico,
	 			opciones			: req.body.opciones,
	 			longitud			: req.body.longitud,
	 			created 			: new Date(),
	 		});

	 		_docIndice.save(function(err, value){
	 			if(!err){
	 				res.send(JSON.stringify(value));
	 			}
	 		});
		}else{
			res.status(401);
			res.end();
		}
	});

	router.put('/docIndice/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[1].permisos.W){
	 		args.schema.findById({_id : req.params.id}, function(err, value){
	 			if(!err){
		 			value.nombre			= req.body.nombre,
		 			value.tipo				= req.body.tipo,
		 			value.editable			= req.body.editable,
		 			value.requerido			= req.body.requerido,
		 			value.unico				= req.body.unico,
	 				value.opciones			= req.body.opciones,
		 			value.longitud			= req.body.longitud,
					value.updated			= new Date();

	 				value.save(function(err, updated){
	 					if(!err){
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

	router.delete('/docIndice/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[1].permisos.W){
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

module.exports = docIndice;