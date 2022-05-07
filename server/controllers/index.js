var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((error, messages)=> {
        if (error) {
          res.status(404).send('Sorry, we cannot find that!');
        } else {
          res.send(messages);
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, (error, messages)=> {
        if (error) {
          res.status(404).send('Sorry, we cannot find that!');
        } else {
          res.status(201);
          res.send('Success!');
        }
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

/*
app.get("/page/:id",function(request, response){
    var id = request.params.id;
    // do something with id
    // send a response to user based on id
    var obj = { id : id, Content : "content " +id };

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(obj));
});
*/