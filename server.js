/***********************************/
/*           Librerías             */
/***********************************/
var express     = require('express'),
    path        = require('path'),
    bodyParser  = require('body-parser');
/***********************************/
/*            Imports              */
/***********************************/
var index = require('./routes/index'),
    tasks = require('./routes/tasks');
/***********************************/
/*            Variables            */
/***********************************/
var port = 3000,
    app = express();
/***********************************/
/*       Motor de Renderizado      */
/***********************************/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
/***********************************/
/*        Carpeta pública          */
/***********************************/
app.use(express.static(path.join(__dirname, 'client')));
/***********************************/
/*          Body Parser MW         */
/***********************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);
/***********************************/
/*            Inicio               */
/***********************************/
app.listen(port, function()
{
    console.log('Server started on port: ' + port);
});