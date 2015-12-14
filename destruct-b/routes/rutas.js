    var express = require('express');
    var router = express.Router();
    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', {title: 'Titulo FFFFFF'});
    });
    module.exports = router;
    var dominio = "/v2",
        usuario_crea = "100",
        usuario_modifica = "201";
    var mongoose = require('mongoose');
    /****************************  PLANTILLAS **********************************************/

    var Plantilla = mongoose.model('Plantilla');
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

    var Documento = mongoose.model('Documento');
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
//    /********************* ejemplo  ******************* */
//
//
//    var Curso = mongoose.model('Curso');
//
////http://localhost:3000/create
//    router.post('/create', function(req, res, next)
//    {
//        new Curso({
//            nombre: req.body.nombre,
//            contenido: req.body.contenido,
//            updated_at: Date.now()
//        }).save(function(err, curso, count)
//        {
//            res.send(curso);
//        });
//    });
//
////http://localhost:3000/all
//    router.get('/all', function(req, res, next)
//    {
//        Curso.find(function(err, cursos, count)
//        {
//            res.send(cursos);
//        });
//    });
//
////http://localhost:3000/curso/Phalcon
//    router.get('/curso/:name', function(req, res, next)
//    {
//        Curso.findOne({nombre: req.params.name}, function(err, curso)
//        {
//            res.send(curso);
//        });
//    });
//
////http://localhost:3000/update/544cdf1b412c1ba537848002
//    router.put('/update/:id', function(req, res, next)
//    {
//        Curso.findOneAndUpdate({_id: req.params.id}, {nombre: req.body.nombre, contenido: req.body.contenido})
//            .exec(function(err, curso, count)
//            {
//                res.send(curso);
//            });
//    });
//
//
////http://localhost:3000/delete/544ce99d4b29efcf3a7e26d5
//    router.delete('/delete/:id', function(req, res, next)
//    {
//        Curso.findOneAndRemove({_id: req.params.id})
//            .exec(function(err, curso, count)
//            {
//                res.send({res: "Success"});
//            });
//    });

