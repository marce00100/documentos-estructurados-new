    var mongoose = require('mongoose');

    var plantillaSchema = new mongoose.Schema({
        nombre: String,
        descripcion: String,
        vigente: Boolean,
        componentes: Object,
        usuario_crea: String,
        usuario_modifica: String,
        fecha_crea: {type: Date },
        fecha_modifica: {type: Date, default: Date.now}
    },
    {versionKey: false});

    mongoose.model('Plantilla', plantillaSchema);

  