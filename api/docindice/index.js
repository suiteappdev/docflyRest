var docIndice = function(router, args){
	router.get('/docIndice', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');

 		args.schema.find({}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));	 				
 			}
		});

	});

	router.get('/docIndice/buscar', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');

 		args.schema.find({
 			}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));
 			}
		}).or([
			{nombre : new RegExp(req.query.indice ? req.query.indice : '', 'i')},
 			]);
	});

	router.get('/docIndice/:id', function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		
 		args.schema.find({_id : req.params.id}, function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.post('/docIndice', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
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
	});

	router.put('/docIndice/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
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
	});

	router.delete('/docIndice/:id', function(req, res, next) {
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

module.exports = docIndice;