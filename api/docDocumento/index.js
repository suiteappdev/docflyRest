var docDocumento = function(router, args){
	router.get('/docDocumento', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');

 		args.schema.find({}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));	 				
 			}
		});

	});


	router.get('/docDocumento/buscar', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 			var _criteria = new Object();

 			if(req.query.id){
 				_criteria = {
 					'plantilla._id' : req.query.id || {'$ne': null }
 				};
 			}

 			if(req.query.criteria){
 				_criteria = {
 					'plantilla.indice' : { $elemMatch:{value:new RegExp(req.query.criteria ? req.query.criteria : '','i')}}
 				}
 			}

 			if(req.query.cliente){
 				_criteria = {
 					$or: [
 						{'cliente.nombreCompleto' : new RegExp(req.query.cliente, 'i')},
 						{'cliente.representanteLegal' : new RegExp(req.query.cliente, 'i')},
 						{'cliente.razonSocial' : new RegExp(req.query.cliente, 'i')}
					]
 				};
 			}

 			if(req.query.ini && req.query.end){
 				_criteria.created = {$gte: req.query.ini ? new Date(req.query.ini) : {'$ne' : null}, $lte: req.query.end ? new Date(req.query.end) : {'$ne': null}};
 			}

	 		args.schema.find(_criteria, function(err, values){
		 			if(!err){
						res.send(JSON.stringify(values));
		 			}
				})
	});

	router.post('/docDocumento', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _docDocumento = new args.schema({
 			estado				: req.body.estado,
 			ruta				: req.body.ruta,
 			cliente				: req.body.cliente,
 			directorio			: req.body.directorio,
 			archivo				: req.body.archivo,
 			plantilla			: req.body.plantilla,
 			created 			: new Date()
 		});

 		_docDocumento.save(function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.put('/docDocumento/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		args.schema.findById({_id : req.params.id}, function(err, value){
 			if(!err){
 				value.estado				= req.body.estado;
	 			ruta						= req.body.ruta,
	 			cliente						= req.body.cliente,
	 			directorio					= req.body.directorio,
	 			archivo						= req.body.archivo,
	 			plantilla					= req.body.plantilla,
				value.updated				= new Date();

 				value.save(function(err, updated){
 					res.send(JSON.stringify(updated));
 				});
 			}
 		})
	});


		router.get('/docDocumento/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');

			args.schema.findOne({_id : req.params.id}, function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.delete('/docDocumento/:id', function(req, res, next) {
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

module.exports = docDocumento;