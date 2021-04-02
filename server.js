const express = require("express");
const cors = require("cors");
require('dotenv').config();
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
app.use(cors());


app.get('/',(req,res)=>{
    console.log("Got a request");
   res.send("Successfully !");
});

app.post('/compiler/java',(req,res)=>{
    
fetch('https://' + endpoint + '/api/v4/submissions?access_token=' + accessToken, {
   method: 'POST', 
   mode: "no-cors",
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(req.body),
 })
 .then(response => response.json())
 .then( data => {
   console.log('Success:', data);
   submissionId=  data.id;
 })
 .catch((error) => {
   console.error('Error:', error);
 });
 
 
  
 setTimeout(() => {
     fetch('https://' + endpoint + '/api/v4/submissions/' + submissionId +  '?access_token=' + accessToken)
 .then(res=>res.json())
 .then(response => {
   // console.log('Success:', response.result);
   var out= response.result.streams;
   if(out.output){stream='output'}
   else if(out.cmpinfo){stream='cmpinfo'}
   else if(out.error){stream='error'}
 
   console.log(stream);
 })
 .catch((error) => {
   console.error('Error:', error);
 }).then(()=>{
     fetch('https://' + endpoint + '/api/v4/submissions/' + submissionId + '/'+stream+ '?access_token=' + accessToken)
 .then(res=>res.text())
 .then(response => {
  console.log('Success:', response);
   res.send(response);
 })
 .catch((error) => {
   console.error('Error:', error);
 }); })
 },9000);  
   
});


app.listen(process.env.PORT,()=>console.log(`server is listening on port:${PORT}`));  