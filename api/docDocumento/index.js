var mongoose = require("mongoose");

var docDocumento = function(router, args, io){
	router.get('/docDocumento', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		
 		var _acl = req.credential;

		if(_acl.formularios[13].permisos.R){
			args.schema.find({}).populate("cliente").exec(function(err, values){
				if(!err){
					res.send(JSON.stringify(values));	 				
				}
			});
		}else{
			res.status(401);
			res.end();
		}
	});

	router.get('/docDocumento/buscar', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
 		
		if(_acl.formularios[13].permisos.R){
			args.schema.find({}, function(err, values){
				if(!err){
 					var _criteria = new Object();

		 			if(req.query.id){
		 				_criteria = {
		 					'plantilla._id' : req.query.id || {'$ne': null }
		 				};
		 			}

		 			if(req.query.estado){
		 				_criteria = {
		 					'estado._id' : req.query.estado || {'$ne': null }
		 				};
		 			}

		 			if(req.query.consecutivo){
		 				_criteria = {
		 					'plantilla.metadata.consecutivo._id' : req.query.consecutivo
		 				}
		 			}

		 			if(req.query.sucursal){
		 				_criteria = {
		 					'usuario.metadata.empresa._id' : req.query.sucursal
		 				}
		 			}

		 			if(req.query.valorConsecutivo){
		 				_criteria = {
		 					'consecutivo' : req.query.valorConsecutivo
		 				}
		 			}

		 			if(req.query.criteria){
		 				_criteria = {
		 					'plantilla.indice' : { $elemMatch:{value:new RegExp(req.query.criteria ? req.query.criteria : '','i')}}
		 				}
		 			}

		 			if(req.query.cliente){
		 				_criteria = {
		 					$or: [
		 						{'plantilla.cliente.nombreCompleto' : new RegExp(req.query.cliente, 'i')},
		 						{'plantilla.cliente.representanteLegal' : new RegExp(req.query.cliente, 'i')},
		 						{'plantilla.cliente.razonSocial' : new RegExp(req.query.cliente, 'i')}
							]
		 				};
		 			}

		 			if(req.query.ini && req.query.end){
		 				_criteria.created = {$gte: req.query.ini ? new Date(req.query.ini) : {'$ne' : null}, $lte: req.query.end ? new Date(req.query.end) : {'$ne': null}};
		 			}

		 			if(req.query.indiceIni && req.query.indiceEnd){
		 				_criteria = {"plantilla.indice.value" : { $gte : req.query.indiceIni, $lte :req.query.indiceEnd}};
		 			}

	 				args.schema.find(_criteria).populate("plantilla.cliente", null, 'cliente').exec( function(err, values){
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

	router.post('/docDocumento', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[12].permisos.R){

			if(req.body.plantilla.metadata){
				var counter = args.instance.model('consecutivo');
				counter.increment(req.body.plantilla.metadata.consecutivo._id, function(err, result){
					  if(err){
					        console.error('Counter on photo save error: ' + err); return;
					    }

					    req.body.plantilla.cliente = req.body.plantilla.cliente ? mongoose.Types.ObjectId(req.body.plantilla.cliente) : null;
				 		var _docDocumento = new args.schema({
				 			estado				: req.body.estado,
				 			ruta				: req.body.ruta,
				 			hash				: req.body.hash,
				 			usuario				: req.body.usuario ? mongoose.Types.ObjectId(req.body.usuario) : null,
				 			directorio			: req.body.directorio,
				 			archivo				: req.body.archivo,
				 			plantilla			: req.body.plantilla,
				 			metadata			: req.body.metadata,
				 			enUso				: false,
				 			consecutivo			: result.valor,
				 			created 			: new Date()
				 		});

				 		_docDocumento.save(function(err, value){
				 			if(!err){
				 				res.send(JSON.stringify(value));
				 				io.emit(value.estado.nombre, value);
				 			}
				 		});
				});				
			}else{

			    req.body.plantilla.cliente = req.body.plantilla.cliente ? mongoose.Types.ObjectId(req.body.plantilla.cliente) : null;

		 		var _docDocumento = new args.schema({
		 			estado				: req.body.estado,
		 			ruta				: req.body.ruta,
		 			hash				: req.body.hash,
				 	usuario				: req.body.usuario ? mongoose.Types.ObjectId(req.body.usuario) : null,
		 			usuario				: mongoose.Types.ObjectId(req.body.usuario),
		 			directorio			: req.body.directorio,
		 			archivo				: req.body.archivo,
		 			plantilla			: req.body.plantilla,
		 			metadata			: req.body.metadata,
		 			enUso				: false,
		 			created 			: new Date()
		 		});

		 		_docDocumento.save(function(err, value){
		 			if(!err){
		 				res.send(JSON.stringify(value));
		 				io.emit(value.estado.nombre, value);
		 			}
		 		});
			}
		}else{
			res.status(401);
			res.end();
		}
	});

	router.put('/docDocumento/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;

		if(_acl.formularios[13].permisos.R){
	 		args.schema.findById({_id : req.params.id}, function(err, value){
	 			if(!err){
	 				value.estado					= req.body.estado;
		 			value.ruta						= req.body.ruta,
		 			value.hash						= req.body.hash,
				 	value.usuario				    = req.body.usuario ? mongoose.Types.ObjectId(req.body.usuario) : null,
		 			value.directorio				= req.body.directorio,
		 			value.archivo					= req.body.archivo,
		 			value.plantilla					= req.body.plantilla,
		 			value.metadata					= req.body.metadata,
		 			value.enUso 					= false;
					value.updated				= new Date();

	 				value.save(function(err, updated){
	 					res.send(JSON.stringify(updated));
 						io.emit(updated.estado.nombre, updated);
	 				});
	 			}
	 		})
		}else{
			res.status(401);
			res.end();
		}
	});

	router.put('/docDocumento/:id/enUso', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;

		if(_acl.formularios[13].permisos.R){
	 		args.schema.findById({_id : req.params.id}, function(err, value){
	 			if(!err){
	 				value.enUso					= true;
					value.updated				= new Date();
	 				value.save(function(err, updated){
	 					res.send(JSON.stringify(updated));
	 				});
	 			}
	 		})
		}else{
			res.status(401);
			res.end();
		}
	});

	router.put('/docDocumento/:id/sinUso', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;

		if(_acl.formularios[13].permisos.R){
	 		args.schema.findById({_id : req.params.id}, function(err, value){
	 			if(!err){
		 			value.enUso 				= false;
					value.updated				= new Date();

	 				value.save(function(err, updated){
	 					res.send(JSON.stringify(updated));
	 				});
	 			}
	 		})
		}else{
			res.status(401);
			res.end();
		}
	});

	router.get('/docDocumento/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
		var _acl = req.credential;
			if(_acl.formularios[13].permisos.R){
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

	router.delete('/docDocumento/:id', args.security.Auth, function(req, res, next) {
 		res.setHeader('Content-Type', 'application/json');
 		var _acl = req.credential;
		if(_acl.formularios[13].permisos.R){
	 		args.schema.findById({_id : req.params.id}, function(err, value){
	 			if(!err){
	 				value.remove();
					res.status(200);
					return;
	 			}

	 			res.status(500);
	 		})
		}else{
			res.status(401);
			res.end();
		}

	});
};

module.exports = docDocumento;