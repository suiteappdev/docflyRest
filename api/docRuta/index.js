var docRuta = function(router, args){
	router.get('/docRuta', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');

 		args.schema.find({}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));	 				
 			}
		});

	});

	router.get('/docRuta/:id', function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		
 		args.schema.find({_id : req.params.id}, function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.post('/docRuta', function(req, res, next) {
		res.setHeader('Content-Type', 'application/json');

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
	});

	router.put('/docRuta/:id/activado', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		
 		args.schema.update({_id : req.params.id}, {$set : { estado : true }}, function(err, value){
 			res.send(JSON.stringify(value));
 		});
	});

	router.put('/docRuta/:id/desactivado', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		
 		args.schema.update({_id : req.params.id}, {$set : { estado : false }}, function(err, value){
 			res.send(JSON.stringify(value));
 		});
	});

	router.put('/docRuta/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		
 		args.schema.findOneAndUpdate({_id : req.params.id },{
	 			estado : req.body.estado,
	 			plantilla : req.body.plantilla,
	 			path : req.body.path,
	 			updated : new Date()
 		}, { new : true }, function(err, value){
			res.send(JSON.stringify(value));
 		});
	});

	router.delete('/docRuta/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findById({_id : req.params.id}, function(err, value){
 			if(!err){
 				value.remove();
				res.sendStatus(200);
			return;
 			}

 			res.sendStatus(500);
 		})
	});

};

module.exports = docRuta;