var mongoose = require('mongoose');

var cursoSchema = new mongoose.Schema({
    nombre: String,
    contenido:String,
    updated_at : {type: Date, default:Date.now }
},
{versionKey: false });

mongoose.model('Curso',cursoSchema);
