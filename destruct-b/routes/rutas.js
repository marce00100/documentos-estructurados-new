    var express = require('express');
    var router = express.Router();

    var mongoose = require('mongoose');
    var Plantilla = mongoose.model('Plantilla');
    var Documento = mongoose.model('Documento');
    var dominio = "/v2",
    usuario_crea = "100",
    usuario_modifica = "201";
    /****************************  PLANTILLAS **********************************************/

    router.get(dominio + '/plantillas', function(req, res, next)
    {
        Plantilla.find(function(err, plantillasRes, count)
        {
            res.json({
                mensaje: "Encontradas " + plantillasRes.length,
                plantillas: plantillasRes
            }, 200);
        });
    });

    router.get(dominio + '/plantillas/:id', function(req, res, next)
    {
        Plantilla.findById(req.params.id, function(err, plantillaRes)
        {
            res.json({
                mensaje: "Encontrada",
                plantilla: plantillaRes
            }, 200);
        });
    });

    router.get(dominio + '/plantillasvigentes', function(req, res, next)
    {
        plantillaRes =Plantilla.where("vigente", "=", true);//.orderBy('nombre', 'ASC').get();
        console.log(plantillaRes);  
//        res.json({
//                mensaje: "Encontradax",
//                plantilla: plantillaRes
//            }, 200);

    });

    router.post(dominio + '/plantillas', function(req, res, next)
    {
        var comp = req.body.componentes;
        var componentesJson = typeof (comp) === "string" ? JSON.parse(comp) : comp;
        plantilla = new Plantilla();
        plantilla.nombre = (typeof req.body.nombre === "undefined") ? "" : req.body.nombre;
        plantilla.descripcion = (typeof req.body.descripcion === "undefined") ? "" : req.body.descripcion;
        plantilla.vigente = parseInt(req.body.vigente);
        plantilla.componentes = componentesJson;
        plantilla.usuario_crea = usuario_crea;
        plantilla.usuario_modifica = usuario_crea;
        plantilla.fecha_crea = Date.now();
        plantilla.fecha_modifica = Date.now();
        plantilla.save(function(err, plantillaRes, count)
        {
            res.json({
                mensaje: "Plantilla Creada",
                plantilla: plantillaRes
            }, 201);
        });
    });
    router.put(dominio + '/plantillas/:id', function(req, res, next)
    {
        var comp = req.body.componentes;
        var componentesJson = typeof (comp) === "string" ? JSON.parse(comp) : comp;
        Plantilla.findById(req.params.id, function(err, plantilla)
        {
            plantilla.nombre = (typeof req.body.nombre === "undefined") ? "" : req.body.nombre;
            plantilla.descripcion = (typeof req.body.descripcion === "undefined") ? "" : req.body.descripcion;
            plantilla.vigente = parseInt(req.body.vigente);
            plantilla.componentes = componentesJson;
            plantilla.usuario_modifica = usuario_modifica;
            plantilla.fecha_modifica = Date.now();
            plantilla.save(function(err, plantillaRes, count)
            {
                res.json({
                    mensaje: "Plantilla Modificada",
                    plantilla: plantillaRes
                }, 200);
            });
        });
    });
    /****************************  DOCUMENTOS **********************************************/

    router.get(dominio + '/documentos', function(req, res, next)
    {
        Documento.find(function(err, docRes, count)
        {
            res.json({
                mensaje: "Encontradas " + docRes.length,
                documentos: docRes
            }, 200);
        });
    });
    router.get(dominio + '/documentos/:id', function(req, res, next)
    {
        Documento.findById(req.params.id, function(err, docRes)
        {
            res.json({
                mensaje: "Encontrado",
                documento: docRes
            }, 200);
        });
    });
    router.post(dominio + '/documentos', function(req, res, next)
    {
        var comp = req.body.componentes;
        var componentesJson = typeof (comp) === "string" ? JSON.parse(comp) : comp;
        new Documento({
            nombre: req.body.nombre,
            plantilla: req.body.plantilla,
            plantilla_id: req.body.plantilla_id,
            componentes: componentesJson,
            usuario_crea: usuario_crea,
            usuario_modifica: usuario_crea,
            fecha_crea: Date.now(),
            fecha_modifica: Date.now()
        }).save(function(err, docRes, count)
        {
            res.json({
                mensaje: "Documento Creado",
                documento: docRes
            }, 201);
        });
    });
    router.put(dominio + '/documentos/:id', function(req, res, next)
    {
        var comp = req.body.componentes;
        var componentesJson = typeof (comp) === "string" ? JSON.parse(comp) : comp;
        Documento.findById(req.params.id, function(err, documento)
        {
            documento.nombre = req.body.nombre;
            documento.componentes = componentesJson;
            documento.usuario_modifica = usuario_modifica;
            documento.fecha_modifica = Date.now();
            documento.save(function(err, docRes, count)
            {
                res.json({
                    mensaje: "Documento Modificado",
                    documento: docRes
                }, 200);
            });
        });
    });
    /*++++++++++++++++++++++++++++++++++++++*/
    router.get('/', function(req, res, next) {
        res.render('index', {title: 'Titulo FFFFFF'});
    });
    module.exports = router;