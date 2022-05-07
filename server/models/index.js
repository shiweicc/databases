var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * from messages', (error, results) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
    }, // a function which produces all the messages
    post: function (body, callback) {
      var queryStr = 'INSERT INTO messages (messageText, roomname, userID) VALUES (?, ?, ?)';
      var queryArgs = [body.message, body.roomname, body.username];
      db.query(queryStr, queryArgs, (error, results) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      db.query('SELECT * from users', (error, results) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
    },
    post: function (body, callback) {
      var queryStr = 'INSERT INTO messages (messageText, roomname, username) VALUES (?, ?, ?)';
      var queryArgs = [body.message, body.roomname, body.username];
      db.query(queryStr, queryArgs, (error, results) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
    }
  }
};

// SELECT *
// FROM `beneficiary`
// WHERE `lastname`
// IN (

//   SELECT `lastname`
//   FROM `beneficiary`
//   GROUP BY `lastname`
//   HAVING COUNT( `lastname` ) >1
// )

