var iva = function(router, args){
	router.get('/iva', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[8].permisos.R){
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

	router.get('/iva/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[8].permisos.R){
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

	router.post('/iva', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[8].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
 		var _iva = new args.schema({
 			valor 				: req.body.valor,
 			created 			: new Date()
 		});

 		_iva.save(function(err, value){
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

	router.put('/iva/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[8].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
 		args.schema.findById({_id : req.param('id')}, function(err, value){
 			if(!err){
	 			value.valor 				= req.body.valor;
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

	router.delete('/iva/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[8].permisos.D){
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

module.exports = iva;