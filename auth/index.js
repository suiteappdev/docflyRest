var userModel = require('./model');
var app = require('express').Router();
var crypto = require("crypto");
var mongoose = require("mongoose");

app.post("/usuario", userModel.Auth, function(req, res){
    res.setHeader('Content-Type', 'application/json');
        var _acl = req.credential;
        if(_acl.formularios[15].permisos.W){
            userModel.create({
                estado      : req.body.estado,
                perfil      : req.body.perfil,
                cliente     : mongoose.Types.ObjectId(req.body.cliente._id),
                usuario     : req.body.usuario,
                password    : req.body.password,
                permiso     : req.body.permiso,
                metadata    : req.body.metadata,
                empresa     : req.body.empresa
            }, function(err, usuario){
                res.send(JSON.stringify(usuario));
            });
        }else{
            res.status(401);
            res.end();
        }

});

app.get('/logout', function(req, res){
    res.setHeader('Content-Type', 'application/json');
      if (req.headers.authorization) {
        var authInfo = req.headers.authorization.split(' ');

        if (authInfo[0] === 'Bearer') {
                var token = authInfo[1];
                userModel.sessionSchema.getToken(token, function(err, token){
                    if(!token){
                        res.status(404);
                        return res.send("user no found");
                    }

                    token.remove();
                    res.status(200);
                    res.end();
                });
        } else {
            res.status(401);
            res.send("no se han enviado las credenciales");
        }
      } else {
            res.status(400);
            res.send("su peticion no es correcta")
      }
});

app.put('/usuario/:id/activado', userModel.Auth, function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
        var _acl = req.credential;
        if(_acl.formularios[15].permisos.W){
            userModel.userSChema.findOne({_id : req.params.id}, function(err, value){
                if(!err){
                    value.estado         = { value : true, name : "Activo"};
                    value.updated        = new Date();

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

app.put('/usuario/:id/desactivado', userModel.Auth, function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
        var _acl = req.credential;
        if(_acl.formularios[15].permisos.W){
            userModel.userSChema.findOne({_id : req.params.id}, function(err, value){
                if(!err){
                    value.estado         = { value : false, name : "Inactivo"};
                    value.updated        = new Date();
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

app.put('/usuario/:id', userModel.Auth, function(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        var _acl = req.credential;
        if(_acl.formularios[15].permisos.W){
            userModel.userSChema.findById({_id : req.params.id}, function(err, value){
                if(!err){
                    if(req.body.password){
                        value.estado          = req.body.estado,
                        value.perfil          = req.body.perfil,
                        value.cliente         = mongoose.Types.ObjectId(req.body.cliente._id),
                        value.usuario         = req.body.usuario,
                        value.password        =  crypto.createHmac('sha1', "house1989*").update(req.body.password).digest("hex"),
                        value.permiso         = req.body.permiso,
                        value.metadata        = req.body.metadata,
                        value.empresa         = req.body.empresa,
                        value.updated         = new Date();

                        value.save(function(err, updated){
                            updated.password = undefined;
                            res.send(JSON.stringify(updated));
                        });                    
                    }else{
                        value.estado          = req.body.estado,
                        value.perfil          = req.body.perfil,
                        value.cliente         = mongoose.Types.ObjectId(req.body.cliente._id),
                        value.usuario         = req.body.usuario,
                        value.permiso         = req.body.permiso,
                        value.metadata        = req.body.metadata,
                        value.empresa         = req.body.empresa,
                        value.updated         = new Date(); 

                        value.save(function(err, updated){
                            updated.password = undefined;
                            res.send(JSON.stringify(updated));
                        }); 
                    }
                }
            })
        }else{
            res.status(401);
            res.end();
        }
});

app.get('/usuario/buscar', userModel.Auth, function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
        var _acl = req.credential;
        if(_acl.formularios[15].permisos.R){

               userModel.userSChema.find().populate({  
                    path: 'cliente',
                    match: {
                        documento : req.query.documento ? req.query.documento : {'$ne': null },
                        nombreCompleto : new RegExp(req.query.cliente ? req.query.cliente : '', 'i')
                    } }).exec(function(err, values){
                    if(!err){
                        var _filters = values.filter(function(doc){
                                if(doc.cliente){
                                    return true;
                                }

                                return false;
                        })

                        res.status(200).json(_filters);
                    }
                });


               /*userModel.userSChema.find(
                    {
                        'estado.value'    :req.query.estado ? JSON.parse(req.query.estado).value : true,
                        'cliente.documento' : req.query.documento ? req.query.documento : {'$ne': null },
                    }
                ).or([
                    {'cliente.nombreCompleto' : new RegExp(req.query.cliente ? req.query.cliente : '', 'i')},
                    {'cliente.representanteLegal' : new RegExp(req.query.cliente ? req.query.cliente : '', 'i')},
                    {'cliente.razonSocial' : new RegExp(req.query.cliente ? req.query.cliente : '', 'i')}
                ]).populate("").exec(function(err, values){
                    if(!err){
                        res.status(200).json(values);
                    }
                });*/
        }else{
            res.status(401);
            res.end();
        }
});

app.get('/usuario/:id', userModel.Auth, function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    var _acl = req.credential;
        if(_acl.formularios[15].permisos.R){
            userModel.userSChema.findOne({_id : req.params.id}).populate("cliente").exec(function(err, value){
                if(!err){
                    value.password = undefined;
                    console.log(value);
                    res.send(JSON.stringify(value));
                }
            });
        }else{
            res.status(401);
            res.end();
        }
});

app.get("/grant", function(req, res){
  res.send("/grant")
});

app.get('/dashboard', userModel.Auth, function(req, res){
  res.send('admin restrict area');
});

app.post("/login", function(req, res){
    res.setHeader('Content-Type', 'application/json');
    if (!req.body.usuario) {
        res.status(401);
        res.send('Must specify a username');
        return;
    }

    if (!req.body.password) {
        res.status(401);
        res.send('Must specify a password');
        return;
    }

    userModel.findByUsername(req.body.usuario, function(err, usuario){
        if(err){
            res.status(400);
            res.end("user not found");
            return;
        }

        if(!usuario){
            res.status(404);
            res.end("user not found");
            return;
        }

        if(crypto.createHmac('sha1', "house1989*").update(req.body.password).digest("hex") !== usuario.password){
            res.status(400)
            res.end("password not match");
            return;
        }

        require('crypto').randomBytes(48, function(ex, buf) {
            var _token = buf.toString('hex');
            userModel.createSession({token : _token, user : usuario }, function(err, userToken){
                res.setHeader('Content-Type', 'application/json');
                userToken.user.password = undefined;
                res.send(JSON.stringify(userToken));
            });            
        });
    });
});

module.exports = app;

