    var express = require('express');
    var router = express.Router();

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', {title: 'Express'});
    });

    module.exports = router;

    var mongoose = require('mongoose');
    var Curso = mongoose.model('Curso');

//http://localhost:3000/create
    router.post('/create', function(req, res, next)
    {
        new Curso({
            nombre: req.body.nombre,
            content: req.body.content,
            updated_at: Date.now()
        }).save(function(err, curso, count)
        {
            res.send(curso);
        });
    });

//http://localhost:3000/all
    router.get('/all', function(req, res, next)
    {
        Curso.find(function(err, cursos, count)
        {
            res.send(cursos);
        });
    });

//http://localhost:3000/curso/Phalcon
    router.get('/curso/:name', function(req, res, next)
    {
        Curso.findOne({nombre: req.params.name}, function(err, curso)
        {
            res.send(curso);
        });
    });

//http://localhost:3000/update/544cdf1b412c1ba537848002
    router.put('/update/:id', function(req, res, next)
    {
        Curso.findOneAndUpdate({_id: req.params.id}, {nombre: req.body.nombre, content: req.body.content})
        .exec(function(err, curso, count)
        {
            res.send(curso);
        });
    });


//http://localhost:3000/delete/544ce99d4b29efcf3a7e26d5
    router.delete('/delete/:id', function(req, res, next)
    {
        Curso.findOneAndRemove({_id: req.params.id})
        .exec(function(err, curso, count)
        {
            res.send({res: "Success"});
        });
    });
