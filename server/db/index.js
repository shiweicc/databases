var mysql = require('mysql');
var { Sequelize } = require('sequelize');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var sequelize = new Sequelize('chat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;


/**********************************************/
// var dbConnection = mysql.createConnection({
//   user: 'root',
//   password: '',
//   database: 'chat'
// });
// dbConnection.connect();

// module.exports = dbConnection;