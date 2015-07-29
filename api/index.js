var router = require('express').Router();
var mongoose = require('mongoose');
var auth = require('../auth/model');

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

var cnx = require('../connection')({
	  user  : "armitage",
	  pwd   : "house1989*",
	  host  : "localhost",
	  database : "dbposerver",
	  port : 27017
});

//Map Route
empresa(router, {schema : empresaSchema, instance : mongoose, security : auth});
tipoCliente(router, {schema : tipoClienteSchema, instance : mongoose});
barrio(router, {schema : barrioSchema, instance : mongoose, security : auth});
banco(router, {schema : bancoSchema, instance : mongoose, security : auth});
punto(router, {schema : puntoSchema, instance : mongoose});
perfil(router, {schema : perfilSchema, instance : mongoose});
lineaPrecio(router, {schema : lineaPrecioSchema, instance : mongoose});
credito(router, {schema : creditoSchema, instance : mongoose});
cargo(router, {schema : cargoSchema, instance : mongoose});
docdependencia(router, {schema : docdependenciaSchema, instance : mongoose});
cliente(router, {schema : clienteSchema, instance : mongoose});
tipoContribuyente(router, {schema : tipoContribuyenteSchema, instance : mongoose});
iva(router,{schema : ivaSchema, instance : mongoose});
retencion(router,{schema : retencionSchema, instance : mongoose});
docIndice(router,{schema : docIndiceSchema, docIndice : mongoose});
docPlantilla(router,{schema : docPlantillaSchema, docPlantilla : mongoose});
docRuta(router,{schema : docRutaSchema, docRuta : mongoose});
docEstado(router,{schema : docEstadoSchema, docEstado : mongoose});
docDocumento(router,{schema : docDocumentoSchema, docDocumento : mongoose});
rol(router,{schema : rolSchema, rol : mongoose});

module.exports = router;