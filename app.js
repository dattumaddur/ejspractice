
const express=require("express");

const ejs=require("ejs");

const bodyParser=require("body-parser");
const _=require("lodash");
const md5=require("md5");

const app=express();

const mongoose=require("mongoose");
app.use(express.static("public"));

app.set('view-engine','ejs');


const items=[];

app.use(bodyParser.urlencoded({
    extended: false
}));

// MongoDB connection

mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
 console.log("Mongodb connection started successfully");
});


const userSchema=new mongoose.Schema({
    uname: {
      type: String,
      required: true
      
    } ,
    email: {
        type: String,
        required: true,
        unique:true
       
    },
    password: String,

});

const User=mongoose.model('User',userSchema);

// GET calls

app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/login",function(req,res){
    res.render("login.ejs")
});

app.get("/register",function(req,res){
   
res.render("register.ejs");
});


//POST calls

app.post("/register",function(req,res){

    const user=new User({
        uname:req.body.username,
        email: req.body.email,
        password:req.body.password
     } );
    user.save();
    res.redirect("/");
});

app.post("/login",function(req,res){
    const name=req.body.username;
    const pwd=req.body.password;
  User.findOne({uname:name,password:pwd},function(err,foundUser){
      if(!err){
          console.log("login success");
          res.redirect("/");
      }
      else{
          console.log("login failed");
      }
  })

});

app.listen(3000,function(){
    console.log("server started on port:3000");
})