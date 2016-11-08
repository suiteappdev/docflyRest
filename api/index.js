var router = require('express').Router();
var mongoose = require('mongoose');
var auth = require('../auth/model');

var io = require('socket.io').listen(8080);

//Empresas 
var empresa = require('./empresa');
var empresaSchema = require('./empresa/schema')(mongoose);

//Tipo de usuarios
var tipoCliente = require('./tipoCliente');
var tipoClienteSchema = require('./tipoCliente/schema')(mongoose);

//Barrios
var barrio = require('./barrio');
var barrioSchema = require('./barrio/schema')(mongoose);

//bancos
var banco = require('./banco');
var bancoSchema = require('./banco/schema')(mongoose);

//Puntos
var punto = require('./punto');
var puntoSchema = require('./punto/schema')(mongoose);

//Perfil
var perfil = require('./perfil');
var perfilSchema = require('./perfil/schema')(mongoose);

//Lineas de Precios
var lineaPrecio = require('./lineaPrecio');
var lineaPrecioSchema = require('./lineaPrecio/schema')(mongoose);

//Creditos
var credito = require('./credito');
var creditoSchema = require('./credito/schema')(mongoose);

//Cargo
var cargo = require('./cargo');
var cargoSchema = require('./cargo/schema')(mongoose);

//Cargo
var docdependencia = require('./docdependencia');
var docdependenciaSchema = require('./docdependencia/schema')(mongoose);

//Cliente
var cliente = require('./cliente');
var clienteSchema = require('./cliente/schema')(mongoose);

//tipoContribuyente
var tipoContribuyente = require('./tipoContribuyente');
var tipoContribuyenteSchema = require('./tipoContribuyente/schema')(mongoose);

//iva
var iva = require('./iva');
var ivaSchema = require('./iva/schema')(mongoose);

//retencion
var retencion = require('./retencion');
var retencionSchema = require('./retencion/schema')(mongoose);

//docIndice
var docIndice = require('./docindice');
var docIndiceSchema = require('./docindice/schema')(mongoose);

//docplantilla
var docPlantilla = require('./docPlantilla');
var docPlantillaSchema = require('./docPlantilla/schema')(mongoose);

//docRuta
var docRuta = require('./docRuta');
var docRutaSchema = require('./docRuta/schema')(mongoose);

//docEstado
var docEstado = require('./docEstado');
var docEstadoSchema = require('./docEstado/schema')(mongoose);

//docDocumento
var docDocumento = require('./docDocumento');
var docDocumentoSchema = require('./docDocumento/schema')(mongoose);

//rol
var rol = require('./rol');
var rolSchema = require('./rol/schema')(mongoose);

//Consecutivo
var consecutivo = require('./consecutivo');
var consecutivoSchema = require('./consecutivo/schema')(mongoose);

var file = require('./file');

var cnx = require('../connection')({
	  user  : "armitage",
	  pwd   : "house1989*",
	  host  : "192.168.1.21",
	  database : "dbposerver",
	  port : 27017
});

//Map Route
empresa(router, {schema : empresaSchema, instance : mongoose, security : auth});
tipoCliente(router, {schema : tipoClienteSchema, instance : mongoose, security : auth});
barrio(router, {schema : barrioSchema, instance : mongoose, security : auth});
banco(router, {schema : bancoSchema, instance : mongoose, security : auth});
punto(router, {schema : puntoSchema, instance : mongoose});
perfil(router, {schema : perfilSchema, instance : mongoose, security : auth});
lineaPrecio(router, {schema : lineaPrecioSchema, instance : mongoose});
credito(router, {schema : creditoSchema, instance : mongoose});
cargo(router, {schema : cargoSchema, instance : mongoose, security : auth});
docdependencia(router, {schema : docdependenciaSchema, instance : mongoose, security : auth});
cliente(router, {schema : clienteSchema, instance : mongoose, security : auth});
tipoContribuyente(router, {schema : tipoContribuyenteSchema, instance : mongoose});
iva(router,{schema : ivaSchema, instance : mongoose, security : auth});
retencion(router,{schema : retencionSchema, instance : mongoose, security : auth});
docIndice(router,{schema : docIndiceSchema, instance : mongoose, security : auth});
docPlantilla(router,{schema : docPlantillaSchema, instance : mongoose, security : auth});
docRuta(router,{schema : docRutaSchema, instance : mongoose, security : auth});
docEstado(router,{schema : docEstadoSchema, instance : mongoose, security : auth});
docDocumento(router,{schema : docDocumentoSchema, instance : mongoose, security : auth}, io);
consecutivo(router,{schema : consecutivoSchema, instance : mongoose, security : auth});
rol(router,{schema : rolSchema, rol : mongoose});
file(router, {security : auth});

module.exports = router;