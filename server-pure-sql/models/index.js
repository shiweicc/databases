var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * from messages', (error, results) => {
        if (error) {
          console.log('GET messages failed!', error);
        } else {
          callback(null, results);
        }
      });
    }, // a function which produces all the messages

    post: function (body, callback) {

      var queryStr = `INSERT INTO messages (messageText, roomname, userID) VALUES ("${body.text}", "${body.roomname}", (SELECT id FROM users WHERE username = "${body.username}"))`;
      db.query(queryStr, (error, results) => {
        if (error) {
          console.log('POST messages failed!', error);
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
          console.log('GET users failed!', error);
        } else {
          callback(null, results);
        }
      });
    },

    post: function (body, callback) {
      var queryStr = `INSERT INTO users (username) VALUES ("${body.username}")`;
      // var queryStr = `INSERT INTO users (username) SELECT ("${body.username}") WHERE NOT EXISTS (SELECT id FROM users WHERE username = "${body.username}" )`;
      db.query(queryStr, (error, results) => {
        if (error) {
          console.log('POST users failed!', error);
        } else {
          callback(null, results);
        }
      });
    }
  }
};

