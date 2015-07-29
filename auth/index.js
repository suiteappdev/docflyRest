var userModel = require('./model');
var app = require('express').Router();
var crypto = require("crypto");

app.post("/usuario", function(req, res){
    res.setHeader('Content-Type', 'application/json');
    userModel.create({
        estado      : req.body.estado,
        perfil      : req.body.perfil,
        cliente     : req.body.cliente,
        usuario     : req.body.usuario,
        password    : req.body.password,
        permiso     : req.body.permiso,
        empresa     : req.body.empresa
    }, function(err, usuario){
        res.send(JSON.stringify(usuario));
    });
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

app.put('/usuario/:id/activado', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    userModel.userSChema.findOne({_id : req.params.id}, function(err, value){
        if(!err){
            value.estado         = { value : true, name : "Activo"};
            value.updated        = new Date();
            value.save(function(err, updated){
                res.send(JSON.stringify(updated));
            });
        }
    })
});

app.put('/usuario/:id/desactivado', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    userModel.userSChema.findOne({_id : req.params.id}, function(err, value){
        if(!err){
            value.estado         = { value : false, name : "Inactivo"};
            value.updated        = new Date();
            value.save(function(err, updated){
                res.send(JSON.stringify(updated));
            });
        }
    })
});

app.put('/usuario/:id', function(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        userModel.userSChema.findById({_id : req.params.id}, function(err, value){
            if(!err){
                value.estado          = req.body.estado,
                value.perfil          = req.body.perfil,
                value.cliente         = req.body.cliente,
                value.usuario         = req.body.usuario,
                value.password        = req.body.password,
                value.permiso         = req.body.permiso,
                value.empresa         = req.body.empresa,
                value.updated         = new Date();

                value.save(function(err, updated){
                    res.send(JSON.stringify(updated));
                });
            }
        })
});

app.get('/usuario/buscar', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

   userModel.userSChema.find(
        {
            'estado.value'    :req.query.estado ? JSON.parse(req.query.estado).value : true,
            'cliente.documento' : req.query.documento ? req.query.documento : {'$ne': null },
        }, function(err, values){
        if(!err){
            res.send(JSON.stringify(values));

        }
    }).or([
            {'cliente.nombreCompleto' : new RegExp(req.query.cliente ? req.query.cliente : '', 'i')},
            {'cliente.representanteLegal' : new RegExp(req.query.cliente ? req.query.cliente : '', 'i')},
            {'cliente.razonSocial' : new RegExp(req.query.cliente ? req.query.cliente : '', 'i')}
            ]);
});

app.get('/usuario/:id', function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    
    userModel.userSChema.findOne({_id : req.params.id}, function(err, value){
        if(!err){
            res.send(JSON.stringify(value));
        }
    });
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

