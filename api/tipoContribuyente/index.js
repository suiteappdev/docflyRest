var tipoContribuyente = function(router, args){
	router.get('/tipoContribuyente', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');

 		args.schema.find({}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));	 				
 			}
		});

	});

	router.get('/tipoContribuyente/:id', function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		
 		args.schema.findOne({_id : req.param('id')}, function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.post('/tipoContribuyente', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _tipoContribuyente = new args.schema({
 			
 			nombre 				: req.body.nombre,
 			created				: new Date(),
			metadata			: req.body.metadata
			
 		});

 		_tipoContribuyente.save(function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.put('/tipoContribuyente/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findById({_id : req.param('id')}, function(err, value){
 			if(!err){

				value.updated				= new Date();

 				value.save(function(err, updated){
 					res.send(JSON.stringify(updated));
 				});
 			}
 		})
	});

	router.delete('/tipoCcontribuyente/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findById({_id : req.param('id')}, function(err, value){
 			if(!err){
 				value.remove();
				res.sendStatus(200);
				return;
 			}

 			res.sendStatus(500);
 		})
	});

};

module.exports = tipoContribuyente;