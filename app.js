var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://local_user:123qwe@du-1-wdmcx.gcp.mongodb.net/Report?retryWrites=true', { useNewUrlParser: true });

var clientsSchema = new mongoose.Schema({
  mes: String,
  clients: [{
    name: String,
    value: Number
  }]
}, { collection: 'ClientsByMonth' });

var clients = mongoose.model('ClientsByMonth', clientsSchema, 'ClientsByMonth');

app.post('/', function(req, res){
  var clientToCompute = req.body;
  var client = new clients(clientToCompute);

    client.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
      }
      else {
          console.log("Post saved");
      }
  });
  res.send('Finish');
});

app.get('/', function (req, res) {

  clients.find({}).lean().exec(
     function (e, docs) {
      res.send(docs);
  });
});

app.listen(3000, function () {
  console.log('http://localhost:3000');
});