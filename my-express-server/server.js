//jshint esversion:6

const express = require('express');

const app= express();

app.listen(3000,function(){
  console.log("server started");
});
app.get("/",function(req,res){
  res.send("Hello this is home page");
});

app.get("/contact",function(req,res){
  res.send("contact me at farhan.s0107@gmail.com");
});

app.get("/about",function(req,res){
  res.send("name =farhan ");

});
