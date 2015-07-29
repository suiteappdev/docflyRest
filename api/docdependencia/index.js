var docdependencia = function(router, args){
	router.get('/docdependencia', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');

 		args.schema.find({}, function(err, values){
 			if(!err){
				res.send(JSON.stringify(values));	 				
 			}
		});

	});

	router.get('/docdependencia/:id', function(req, res, next){
 		res.setHeader('Content-Type', 'application/json');
 		
 		args.schema.find({parent:req.param('id')}, function(err, value){
 			if(!err){
 				res.send(JSON.stringify(value));
 			}
 		});
	});

	router.post('/docdependencia', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
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
	});

	router.put('/docdependencia/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
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
	});

	router.delete('/docdependencia/:id', function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
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
	});

};

module.exports = docdependencia;