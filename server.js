const express = require("express");
const cors = require("cors");
// require('dotenv').config();
// const {compiler,result}=require('./compiler');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
var accessToken = process.env.ACCESSTOKEN ;
var endpoint = process.env.ENDPOINT;
var stream,submissionId;
const app = express();
const PORT=process.env.PORT;
app.use(express.json());


const whitelist = ['https://www.errortechnologies.com', 'https://javaonlineide.netlify.app']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

app.use(cors(corsOptions));


app.get('/',(req,res)=>{
    console.log("Got a request");
   res.send("Successfully !");
});

app.post('/compiler/java',(req,res)=>{
    
// fetch('https://' + endpoint + '/api/v4/submissions?access_token=' + accessToken, {
//    method: 'POST', 
//    mode: "no-cors",
//    headers: {
//      'Content-Type': 'application/json',
//    },
//    body: JSON.stringify(req.body),
//  })
//  .then(response => response.json())
//  .then( data => {
//    console.log('Success:', data);
//    submissionId=  data.id;
//  })
//  .catch((error) => {
//    console.error('Error:', error);
//  });
 
 
  
//  setTimeout(() => {
//      fetch('https://' + endpoint + '/api/v4/submissions/' + submissionId +  '?access_token=' + accessToken)
//  .then(res=>res.json())
//  .then(response => {
//    // console.log('Success:', response.result);
//    var out= response.result.streams;
//    if(out.output){stream='output'}
//    else if(out.cmpinfo){stream='cmpinfo'}
//    else if(out.error){stream='error'}
 
//    console.log(stream);
//  })
//  .catch((error) => {
//    console.error('Error:', error);
//  }).then(()=>{
//      fetch('https://' + endpoint + '/api/v4/submissions/' + submissionId + '/'+stream+ '?access_token=' + accessToken)
//  .then(res=>res.text())
//  .then(response => {
//   console.log('Success:', response);
//    res.send(response);
//  })
//  .catch((error) => {
//    console.error('Error:', error);
//  }); })
//  },5000);  
res.send(req.body.input)
   
});


app.listen(process.env.PORT,()=>console.log(`server is listening on port:${PORT}`));  