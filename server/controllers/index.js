var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((error, messages)=> {
        if (error) {
          res.status(404).send('Sorry, we cannot find message!');
        } else {
          res.send(messages);
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, (error, messages)=> {
        if (error) {
          res.status(404).send('Sorry, we cannot post the message!');
        } else {
          res.status(201);
          res.send('Success!');
        }
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((error, messages)=> {
        if (error) {
          res.status(404).send('Sorry, we cannot find the user!');
        } else {
          res.send(messages);
        }
      });
    },

    post: function (req, res) {
      models.users.post(req.body, (error, messages)=> {
        if (error) {
          res.status(404).send('Sorry, we cannot post the user!');
        } else {
          res.status(201);
          res.send('Success!');
        }
      });
    }
  }
};
