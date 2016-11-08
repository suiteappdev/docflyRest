var docRuta = function(router, args){
	router.get('/docRuta', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[3].permisos.R){
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

	router.get('/docRuta/:id', args.security.Auth, function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 				var _acl = req.credential;
		if(_acl.formularios[3].permisos.R){
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

	router.post('/docRuta', args.security.Auth, function(req, res, next) {
		res.setHeader('Content-Type', 'application/json');
		var _acl = req.credential;
		if(_acl.formularios[3].permisos.W){
	 		var _docRuta = new args.schema({
	 			estado 				: req.body.estado,
	 			plantilla			: req.body.plantilla,
	 			path				: req.body.path,
	 			created 			: new Date(),
	 		});

 		_docRuta.save(function(err, value){
 			if(err){
 				res.sendStatus(409);
 			}

 			res.send(JSON.stringify(value));
 		});
		}else{
			res.status(401);
			res.end();
		}

	});

	router.put('/docRuta/:id/activado', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[3].permisos.W){
	 		args.schema.update({_id : req.params.id}, {$set : { estado : true }}, function(err, value){
	 			res.send(JSON.stringify(value));
	 		});
		}else{
			res.status(401);
			res.end();
		}
	});

	router.put('/docRuta/:id/desactivado', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[3].permisos.W){
	 		args.schema.update({_id : req.params.id}, {$set : { estado : false }}, function(err, value){
	 			res.send(JSON.stringify(value));
	 		});
		}else{
			res.status(401);
			res.end();
		}
	});

	router.put('/docRuta/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[3].permisos.W){
	 		args.schema.findOneAndUpdate({_id : req.params.id },{
		 			estado : req.body.estado,
		 			plantilla : req.body.plantilla,
		 			path : req.body.path,
		 			updated : new Date()
	 		}, { new : true }, function(err, value){
				res.send(JSON.stringify(value));
	 		});
	 		
		}else{
			res.status(401);
			res.end();
		}
	});

	router.delete('/docRuta/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[3].permisos.W){
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

module.exports = docRuta;