var consecutivo = function(router, args){
	router.get('/consecutivo', args.security.Auth, function(req, res, next) {
		res.setHeader('Content-Type', 'application/json');
		var _acl = req.credential;
		if(_acl.formularios[14].permisos.R){
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

	router.get('/consecutivo/:id', args.security.Auth, function(req, res, next){
		res.setHeader('Content-Type', 'application/json');
		var _acl = req.credential;
		if(_acl.formularios[14].permisos.R){
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

	router.post('/consecutivo', args.security.Auth, function(req, res, next) {
		res.setHeader('Content-Type', 'application/json');
		var _acl = req.credential;
		if(_acl.formularios[14].permisos.W){
			var _consecutivo = new args.schema({
				nombre 				: req.body.nombre,
				valor				: req.body.valor,
				created 			: new Date()
			});

			_consecutivo.save(function(err, value){
				if(!err){
					res.send(JSON.stringify(value));
				}
			});
		}else{
			res.status(401);
			res.end();
		}

	});

	router.put('/consecutivo/:id', args.security.Auth, function(req, res, next) {
		res.setHeader('Content-Type', 'application/json');
		var _acl = req.credential;
		if(_acl.formularios[14].permisos.W){
			args.schema.findById({_id : req.params.id}, function(err, value){
				value.nombre				= req.body.nombre;
				value.valor				= req.body.valor,
				value.updated				= new Date();

				value.save(function(err, updated){
					if(!err){
						res.send(JSON.stringify(updated));						
					}
				});
			})
		}else{
			res.status(401);
			res.end();
		}
	});
	router.delete('/consecutivo/:id',args.security.Auth, function(req, res, next) {
		res.setHeader('Content-Type', 'application/json');
		var _acl = req.credential;
		if(_acl.formularios[14].permisos.W){
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

module.exports = consecutivo;