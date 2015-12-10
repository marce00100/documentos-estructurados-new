var mongoose = require('mongoose');

    var documentoSchema = new mongoose.Schema({
        nombre: String,
        plantilla: String,
        plantilla_id: String,        
        componentes: String,
        usuario_crea: String,
        usuario_modifica: String,
        fecha_crea: {type: Date },
        fecha_modifica: {type: Date, default: Date.now}
    },
    {versionKey: false});

    mongoose.model('Documento', documentoSchema);
