//jshint esversion:6
const express = require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;



  const data ={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };


const jsonData= JSON.stringify(data);

const url="https://us19.api.mailchimp.com/3.0/lists/1e34c79558";

const options={
  method:"POST",
  auth:"farhan17:ef89580b2cb38f7458bd86916e48d441-us19"
};


const requ= https.request(url, options, function(response){

if (response.statusCode===200){
  res.sendFile(__dirname+"/success.html");
}else{
  res.sendFile(__dirname+"/failure.html");
}

  response.on("data",function(data){
    console.log(JSON.parse(data));
  });
});
requ.write(jsonData);
requ.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000,function() {
  console.log("server started at 3000 port");
});



// APi key
// ef89580b2cb38f7458bd86916e48d441-us19

//unique id
// 1e34c79558
