
const express=require("express");

const ejs=require("ejs");

const bodyParser=require("body-parser");
const _=require("lodash");

const app=express();
app.use(express.static("public"));

app.set('view-engine','ejs');

const items=[];

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/login",function(req,res){
    res.render("login.ejs")
});

app.get("/register",function(req,res){
   
res.render("register.ejs");
});


app.post("/register",function(req,res){

    
})

app.listen(3000,function(){
    console.log("server started on port:3000");
})