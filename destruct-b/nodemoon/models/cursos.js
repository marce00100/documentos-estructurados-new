var mongoose = require('mongoose');

var cursoSchema = new mongoose.Schema({
    nombre: String,
    content:String,
    updated_at : {type: Date, default:Date.now }
},
{versionKey: false });

mongoose.model('Curso',cursoSchema);
