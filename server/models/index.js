var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * from messages', (error, results) => {
        if (error) {
          console.log('GET messages failed!');
          throw error;
        } else {
          callback(null, results);
        }
      });
    }, // a function which produces all the messages

    post: function (body, callback) {
      // var queryStr = 'INSERT INTO messages (messageText, roomname, userID) VALUES (?, ?, ?)';
      // var queryArgs = [body.message, body.roomname, body.userID];
      // var findUserID = `SELECT messages.userID from messages INNER JOIN users ON users.userID = messages.userID`;
      // db.query(findUserID, (error, results) => {
      //   if (error) {
      //     console.log('POST messages failed!');
      //     throw error;
      //   } else {
      //     console.log('Result: ', results);
      //     console.log('type of Result: ', typeof results);
      //     callback(null, results);
      //   }
      // });

      // var queryStr = `INSERT INTO messages (messageText, roomname, userID)
      // VALUES ("${body.message}", "${body.roomname}", SELECT userID FROM users INNER JOIN ON users.username = "${body.username}")`;

      var queryStr = `INSERT INTO messages (messageText, roomname, userID)
      VALUES ("${body.message}", "${body.roomname}", 1)`;

      db.query(queryStr, (error, results) => {
        if (error) {
          console.log('POST messages failed!');
          throw error;
        } else {
          callback(null, results[0]);
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      db.query('SELECT * from users', (error, results) => {
        if (error) {
          console.log('GET users failed!');
          throw error;
        } else {
          callback(null, results);
        }
      });
    },

    post: function (body, callback) {
      var queryStr = `INSERT INTO users (username) VALUES ("${body.username}")`;
      // INSERT INTO users (username) WHERE NOT EXISTS (SELECT userID from users WHERE username = "mary")
      db.query(queryStr, (error, results) => {
        if (error) {
          console.log('POST users failed!');
          throw error;
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

/*
`INSERT INTO messages (messageText, roomname, userID)
  VALUES ("${body.text}", "{body.roomname}, SELECT id from users WHERE username = "${body.username}")`;

`INSERT INTO users (username) VALUES ("${user}")`;
*/