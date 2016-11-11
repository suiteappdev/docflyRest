var docdependencia = function(router, args){
	router.get('/docdependencia', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[0].permisos.R){
			args.schema.find({}, function(err, values){
				if(!err){
					res.send(JSON.stringify(values));	 				
 				}
			})
		}else{
			res.status(401);
			res.end();
		}
	});

	router.get('/docdependencia/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[0].permisos.R){
			args.schema.find({parent:req.param('id')}, function(err, value){
	 			if(!err){
	 				res.send(JSON.stringify(value));
	 			}
 			});
		}else{
			res.status(401);
			res.end();
		}
	});

	router.post('/docdependencia', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[0].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
 		var _docdependencia = new args.schema({
 			id 					: req.body.id,
 			parent				: req.body.parent ? req.body.parent : '#',
 			text				: req.body.id,
 			created 			: new Date(),
			metadata			: req.body.metadata
 		});

 		_docdependencia.save(function(err, value){
 			if(err){
 				res.status(500);
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

	router.put('/docdependencia/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[0].permisos.W){
			args.schema.find({}, function(err, values){
				if(!err){
				 		args.schema.findOne({id : req.params.id}, function(err, value){
				 			if(!err){
				 				console.log(req.body);
				 				value.text = req.body.text;

				 				value.save(function(err, updated){
				 					res.status(200);
				 					res.send(updated);
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

	router.delete('/docdependencia/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[0].permisos.D){
			args.schema.find({}, function(err, values){
				if(!err){
 		args.schema.findOne({id : req.params.id}, function(err, value){
 			if(value){
 				value.remove(function(err){
 					if(err){
 						res.send(500);
 					}
 				});

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

module.exports = docdependencia;