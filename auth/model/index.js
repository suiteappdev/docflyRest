var mongoose = require("mongoose");
var crypto = require("crypto");
var usuarioSchema = require('./schema');
var sessionSchema = require('./sessionSchema');

var usuario = {
	userSChema : usuarioSchema,
	sessionSchema : sessionSchema,
	
	create  : function(data, callback){
		var _usuario = new usuarioSchema(data);

		_usuario.password = crypto.createHmac('sha1', "house1989*").update(data.password).digest("hex");
		
		_usuario.save(function(err, usuario){
			if(err) return callback(err, null);
			
			return callback(null, usuario);			
		});
	},

	findByUsername  : function(username, callback){
		usuarioSchema.findOne({ usuario : username}, callback);
	},

	Auth : function(req, res, next){
		  if (req.headers.authorization) {
		    var authInfo = req.headers.authorization.split(' ');

		    if (authInfo[0] === 'Bearer') {
	      		var token = authInfo[1];
		        sessionSchema.getToken(token, function(err, token) {
		        	if(!token){
		    			res.status(404);
		    			return res.send("user no found");
		        	}

		        	req.credential = token.user.permiso;
			        next();
		      });
		    } else {
		    	res.status(401);
		    	res.send("no se han enviado las credenciales");
		    }
		  } else {
		    	res.status(400);
		    	res.send("su peticion no es correcta")
		  }
	},

	createSession : function(session, callback){
		var _session = new sessionSchema(session)
		_session.save(callback);
	},

	Logout : function(){
		sessionSchema.findOne({token : token} , function(err, session){
			if(session){
				session.remove();
			}
		});
	}
}

module.exports = usuario;