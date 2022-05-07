/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();

    var messagesTable = 'messages'; // TODO: fill this out
    var usersTable = 'users';

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    // SET FOREIGN_KEY_CHECKS = 0;
    // TRUNCATE table $table_name;
    // SET FOREIGN_KEY_CHECKS = 1;
    dbConnection.query('SET FOREIGN_KEY_CHECKS = 0');
    dbConnection.query('truncate ' + messagesTable);
    dbConnection.query('truncate ' + usersTable);
    dbConnection.query('SET FOREIGN_KEY_CHECKS = 1', done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];


        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          console.log('RESULTS ---', results[0]);
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          console.log('RESULTS', results[0]);
          expect(results[0].messageText).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
    // done();
  });

  it('Should output all messages from the DB', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Javert' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Javert',
          message: 'Men like you can never change!',
          roomname: 'main'
        }
      }, function() {
        // Let's insert a message into the db
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];
        // TODO - The exact query string and query args to use
        // here depend on the schema you design, so I'll leave
        // them up to you. */

        dbConnection.query(queryString, queryArgs, function (err) {
          if (err) { throw err; }

          // Now query the Node chat server and see if it returns
          // the message we just inserted:
          request('http://127.0.0.1:3000/classes/messages', function (error, response, body) {
            var messageLog = JSON.parse(body);
            console.log('MESSAGE LOG', messageLog[0]);
            expect(messageLog[0].messageText).to.equal('Men like you can never change!');
            expect(messageLog[0].roomname).to.equal('main');

            done();
          });
        });
      });
    });
    // // Let's insert a message into the db
    // var queryString = 'SELECT * from messages';
    // var queryArgs = [];
    // // TODO - The exact query string and query args to use
    // // here depend on the schema you design, so I'll leave
    // // them up to you. */

    // dbConnection.query(queryString, queryArgs, function(err) {
    //   if (err) { throw err; }

    //   // Now query the Node chat server and see if it returns
    //   // the message we just inserted:
    //   request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
    //     var messageLog = JSON.parse(body);
    //     console.log('MESSAGE LOG', messageLog[0]);
    //     expect(messageLog[0].messageText).to.equal('Men like you can never change!');
    //     expect(messageLog[0].roomname).to.equal('main');
    //     done();
    //   });
    // });
    // done();
  });


  it('Should add more than one message', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Betty' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Betty',
          message: 'How are you?',
          roomname: 'Chilling'
        }
      }, function () {
        // Post a message to the node chat server:
        request({
          method: 'POST',
          uri: 'http://127.0.0.1:3000/classes/messages',
          json: {
            username: 'Betty',
            message: 'yeahyeah',
            roomname: 'main'
          }
        }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

          // TODO: You might have to change this test to get all the data from
          // your message table, since this is schema-dependent.
          var queryString = 'SELECT * FROM messages';
          var queryArgs = [];


          dbConnection.query(queryString, queryArgs, function(err, results) {
            // Should have one result:
            console.log('RESULTS ---', results[1]);
            expect(results.length).to.equal(2);

            // TODO: If you don't have a column named text, change this test.
            console.log('RESULTS', results[1]);
            expect(results[1].messageText).to.equal('yeahyeah');

            done();
          });
        });
      });
      // done();
    });
  });
});