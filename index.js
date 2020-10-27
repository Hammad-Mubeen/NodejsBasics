var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/test", {autoIndex: false});
// connecting to the database
connect.then((db) => {
    console.log("Connected to the MongoDB server\n\n");
}, (err) => { console.log(err); });



//Schema (table structue)
var Schema=mongoose.Schema;
var userdataSchema= new Schema({
  title: { type: String, required: true},
  content: { type: String},
  author: { type: String}
  
});

//Model (table)
var UserData= mongoose.model('UserData',userdataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//Get endpoint
router.get('/get', function(req, res, next) {
  UserData.find()
  .then(function(doc){
    //res.render('index', {items: doc});
    res.status(200).json({success: true, data:doc });
  });

});

//post endpoint
router.post('/insert', async function(req, res, next) {
  
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  }
  var data= new UserData(item);
  await data.save();
  res.redirect('/');
});

//update endpoint
router.put('/update',async function(req, res, next) {
  var id = req.body.id;

  var result = await UserData.findById(id);
  result.title = req.body.title,
  result.content = req.body.content,
  result.author = req.body.author
  await result.save();
  res.redirect('/');
  res.status(200).json({success: true, message :result });
});

//delete endpoint
router.delete('/delete', async function(req, res, next) {
  var id = req.body.id;
  var result = await UserData.findByIdAndDelete(id);
  res.status(200).json({success: true, message :result });
  res.redirect('/');
});


module.exports = router;

//Endpoints
// router.get('/test/:id', function(req, res, next) {
//   res.render('testGet', { output: req.params.id});
// });

// router.post('/test/submit', function(req, res, next) {
//   var id = req.body.id;
//   res.redirect('/test/'+id);
// });