var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '108.59.82.198',
  user     : 'adminpz',
  password : 'adminpz',
  database : 'plaza_sur'
});

connection.connect(function(err) {
  if (err) {
    console.error('error al conectar: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

/*
 * Consultas 
 */
//connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//  if (error) throw error;
//  console.log('The solution is: ', results[0].solution);
//});

