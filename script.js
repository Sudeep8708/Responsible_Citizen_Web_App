require('dotenv').config();
const express = require('express');
const path = require('path');

const server = express();
let bodyparser = require('body-parser');
server.use(bodyparser.urlencoded({ extended:false }));

server.set('view engine','ejs');

var db,collection;
var day = 'Day 1';    //Initially set to Day 1
var numdigit;

//Connectinng to the Database//

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, (error,client) =>{

 if(error){
    return console.log("There was an error in connecting.." + error);
  }
   db = client.db(process.env.db);
   collection = db.collection(process.env.collection);
  console.log("Connection Established !");
});

//The Below is the general route, that is whenever someone requests in root '/' url, these processes will be carried out.

server.get('/', (req,res) =>{

  if(numdigit>3){                           //Checks whether all the days are done.
    res.setHeader('content-type','text/html');
    res.send('<h2>Congratulations! You had completed all the levels ! <br><br>Thank you for joining us to protect the environment! Hope you loved it and learnt a lot from this ! <br> We would like you to not stop here, but continue contributing to protect the Earth ! Thanks !! </h2>');
  }
  else{

    var arr  =  collection.find({$and:[{status:'pending'},{day:day}]},{projection:{status:false,_id:false}}).toArray();
    arr.then( (msg) =>{
     var len = msg.length;
    res.render('main',{msg:msg});
    server.use( express.static('public') );

  }).catch( (err) =>{
     console.log("There is an error in retrieving the data from the DB",err);
   });
  }
});

//This Route is written to change the day, after completion of prev day tasks.

server.get('/change', (req,res) =>{

  day = req.query.day;
  var num = day.replace(/[^0-9]/g,'');
  numdigit = parseInt(num);
  if(numdigit>3){
    res.setHeader('content-type','text/html');
    res.send('<h2>Congratulations! 	&#129395;You had completed all the levels ! Thank you for joining us to protect the Environment!</h2>');
  }
  else{
  numdigit+=1;
  day = "Day "+ numdigit;
  res.redirect('/');
  }
})

server.listen(process.env.PORT,() =>{
    console.log("Listening, waiting for your request!");
});
