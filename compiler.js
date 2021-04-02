const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
require('dotenv').config();
var accessToken = process.env.ACCESSTOKEN ;
var endpoint = process.env.ENDPOINT;
var stream,submissionId;
var result;


// const code=`
// import java.util.*;
// public class Main {
//   public static void main(String[] args) {
//     Scanner sc=new Scanner(System.in);  
//       int first = sc.nextInt();
//       int second =sc.nextInt();
//       System.out.println("Enter two numbers: " + first + " " + second);
//       int sum = first + second;
//       System.out.println("The sum is: " + sum);
//   }
// }`
// const inputData = '10 20';

// const data = {
//     compilerId: 10,
//     source: code,
//     input:inputData
// };

// hello(data);

module.exports.compiler =function (data){
 
fetch('https://' + endpoint + '/api/v4/submissions?access_token=' + accessToken, {
  method: 'POST', 
  mode: "no-cors",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
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
  module.exports.result=response;
})
.catch((error) => {
  console.error('Error:', error);
}); })
return result;
},9000);  

}









