var userModel = require('./model');
var app = require('express').Router();
var crypto = require("crypto");
var mongoose = require("mongoose");

app.post("/usuario", userModel.Auth, function(req, res){
    res.setHeader('Content-Type', 'application/json');
        var _acl = req.credential;
        if(_acl.formularios[15].permisos.W){

            if(req.body.misPlantillas){
                for(x in req.body.misPlantillas){
                    req.body.misPlantillas[x] = mongoose.Types.ObjectId(req.body.misPlantillas[x]);
                }
            }

            if(req.body.misEstados){
                for(x in req.body.misEstados){
                    req.body.misEstados[x] = mongoose.Types.ObjectId(req.body.misEstados[x]);
                }
            }

            userModel.create({
                estado      : req.body.estado,
                perfil      : req.body.perfil,
                cliente     : mongoose.Types.ObjectId(req.body.cliente._id),
                usuario     : req.body.usuario,
                password    : req.body.password,
                permiso     : req.body.permiso,
                misPlantillas : req.body.misPlantillas,
                misEstados : req.body.misEstados,
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
                        return res.status(404).json({err : "user not found"});
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
                        value.permiso         = req.body.permiso
                        
                        if(req.body.misPlantillas){
                            for(x in req.body.misPlantillas){
                                req.body.misPlantillas[x] = mongoose.Types.ObjectId(req.body.misPlantillas[x]);
                            }
                        }

                        if(req.body.misEstados){
                            for(x in req.body.misEstados){
                                req.body.misEstados[x] = mongoose.Types.ObjectId(req.body.misEstados[x]);
                            }
                        }

                        value.misEstados = req.body.misEstados,
                        value.misPlantillas = req.body.misPlantillas,
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
                        value.permiso         = req.body.permiso
                        
                        if(req.body.misPlantillas){
                            for(x in req.body.misPlantillas){
                                req.body.misPlantillas[x] = mongoose.Types.ObjectId(req.body.misPlantillas[x]);
                            }
                        }

                        if(req.body.misEstados){
                            for(x in req.body.misEstados){
                                req.body.misEstados[x] = mongoose.Types.ObjectId(req.body.misEstados[x]);
                            }
                        }
                        
                        value.misEstados = req.body.misEstados
                        value.misPlantillas = req.body.misPlantillas,
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

                    var options = {
                      path: 'misPlantillas',
                      model: 'docRuta'
                    }

                    userModel.userSChema.populate(value, options, function (err, user) {

                    var optionsIndice = [{
                      path: 'misPlantillas.plantilla',
                      model: 'docPlantilla'
                    },
                    {
                      path: 'misEstados',
                      model: 'docEstado'
                    }
                    ]
                    

                    userModel.userSChema.populate(user, optionsIndice, function(err, user){
                        if(!err){
                            res.status(200).json(user);
                        }
                    })
                    
                    });
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
        res.status(401).json({err: 'Must specify a username'});
        return;
    }

    if (!req.body.password) {
        res.status(401).json({err : 'ust specify a password'});
        return;
    }

    userModel.findByUsername(req.body.usuario, function(err, usuario){

        if(err){
            res.status(400).json({err: "user not found"});
            return;
        }

        if(!usuario){
            res.status(404).json({err: "user not found"});
            return;
        }

        if(crypto.createHmac('sha1', "house1989*").update(req.body.password).digest("hex") !== usuario.password){
             res.status(400).json({err: "password not match"});
            return;
        }

        require('crypto').randomBytes(48, function(ex, buf) {
            var _token = buf.toString('hex');
            userModel.createSession({token : _token, user : usuario }, function(err, userToken){
                res.setHeader('Content-Type', 'application/json');
                userToken.user.password = undefined;


                var options = {
                  path: 'misPlantillas.plantilla',
                  model: 'docPlantilla'
                }

                userModel.userSChema.populate(usuario, options, function (err, user) {

                var optionsIndice = {
                  path: 'misPlantillas.plantilla.indice',
                  model: 'docIndice'
                }
                

                userModel.userSChema.populate(user, optionsIndice, function(err, user){
                    userToken.user = user;  
                    res.status(200).json(userToken);
                })
                
                });

            });            
        });
    });
});

module.exports = app;

