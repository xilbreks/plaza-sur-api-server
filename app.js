'use strict'
// ===============================================
// Importamos paquetes que necesitamos ===========
// ===============================================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan'); ///// LOG
var jwt         = require('jsonwebtoken'); 
var path 	= require('path');
// ===============================================
// Configuracion =================================
// ===============================================
var port = 3000; 
app.set('superSecret', 'llaveParaFirmar'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/cocoro', express.static(path.join(__dirname + '/scr')));

// Permitimos acceso a todos otros servidores (Solo debe permitirse en fase de Desarrollo)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// ===============================================
// Rutas =========================================
// ===============================================
// Ruta de prueba
app.get('/:id', function(req, res) {
  var msg = {
    msg : "bienvenido al mundo del api :v",
    datos : req.query.id,
    datos2 : req.params.id
  };

  res.send(JSON.stringify(msg));
});

app.get('/products',function(req, res){
	res.send(JSON.stringify('jajaja salu2'));
})

app.post('/post',function(req,res){
	res.send('holis')
})

app.put('/put', function(req,res){
	const name = req.body.produc.name
	var max=25
	if(name.length>max)
	res.send(403,'esto es un put es anti calebs \n')
	else 
	res.send(200,'jjojojoj')
})
// API ROUTES -------------------
/*
// Tomamos una instancia del router para nuestra rutas de api
var apiRoutes = express.Router(); 

// TODO: route to authenticate a user (POST http://localhost:3000/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
          // para mostrar:
          console.log('username:',req.body.username,' password:',req.body.password);
  // find the user
  User.findOne({
    name: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});
// TODO: route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

// route to show a random message (GET http://localhost:3000/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:3000/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   


// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
*/


// =======================
// Iniciar el servidor ======
// =======================
app.listen(port);
console.log('Se inicio el servidor en el puerto ' + port);
