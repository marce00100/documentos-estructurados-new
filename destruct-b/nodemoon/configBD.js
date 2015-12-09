var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newDOCE', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

require('./models/cursos');
    
