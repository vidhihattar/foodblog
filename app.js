const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: "blahblah",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-vidhi:todolist@todolist.70mcz8g.mongodb.net/recipeBlogDB");

const recipeSchema = new mongoose.Schema({
  email: String,
  title: String,
  content: String,
  ingredients: Array,
  category: String,
  image: String
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

const Recipe = mongoose.model("Recipe", recipeSchema);

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
  if( req.isAuthenticated() ){
    res.render("index", {loggedin: "Logout"});
  } else{
    res.render("index", {loggedin: "Login"});
  }
});

app.get("/submit", function(req, res){
  if( req.isAuthenticated() ){
      console.log("recieved");
    res.render("submit", {loggedin: "Logout"});
  } else{
    res.render("login", {loggedin: "Login"});
  }

});

app.get("/recipes", function(req, res){

  if( req.isAuthenticated() ){
    Recipe.find({}, function(err, foundRecipes){
      if(!err){
        res.render("recipes", {recipes: foundRecipes, loggedin: "Logout"});
      }
      else{
        console.log(err);
      }
    });
  } else{
    Recipe.find({}, function(err, foundRecipes){
      if(!err){
        res.render("recipes", {recipes: foundRecipes, loggedin: "Login"});
      }
      else{
        console.log(err);
      }
    });
  }

});

app.get("/login", function(req, res){


  res.render("login", {loggedin: "Login"});
});

app.post("/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if(err){
      console.log(err);
    }
    else{
      passport.authenticate("local")(req, res, function(){
        res.redirect("/submit");
      });
    }
  });
});

app.get("/signup", function(req, res){
  res.render("signup", {loggedin: "Login"});
});

app.post("/signup", function(req, res){
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if(err){
      console.log(err);
      res.redirect("/signup");
    }
    else{
      passport.authenticate("local")(req, res, function(){
        res.redirect("/submit");
      });
    }
  });
});

app.post("/submit", function(req, res){
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;
  const ingredients = req.body.ingredient;
  const category = req.body.category;
  const image = req.body.image;

  const newRecipe = new Recipe({
    email : email,
    title: title,
    content: content,
    ingredients: ingredients,
    category: category,
    image: image
  });

  newRecipe.save();
  res.redirect("/recipes");
});


app.get("/logout", function(req, res){
  req.logout(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.redirect("/");
    }
  });
});

app.get("/:category", function(req, res){
  const category = req.params.category;
  if(req.isAuthenticated()){
    if(category === "thai"){
      Recipe.find({category: "Thai"}, function(err, foundRecipes){
        if(!err){
          res.render("category", {category : "Thai", recipes: foundRecipes, loggedin: "Logout"});
        }
      });
    }else if(category === "spanish"){
      Recipe.find({category: "Spanish"}, function(err, foundRecipes){
        if(!err){
          res.render("category", {category : "Spanish", recipes: foundRecipes, loggedin: "Logout"});
        }
      });
    }else if(category === "mexican"){
      Recipe.find({category: "Mexican"}, function(err, foundRecipes){
        if(!err){
          res.render("category", {category : "Mexican", recipes: foundRecipes, loggedin: "Logout"});
        }
      });
    }else if(category === "indian"){
      Recipe.find({category: "Indian"}, function(err, foundRecipes){
        if(!err){
          res.render("category", {category : "Indian", recipes: foundRecipes, loggedin: "Logout"});
        }
      });
    }else if(category === "chinese"){
      Recipe.find({category: "Chinese"}, function(err, foundRecipes){
        if(!err){
          res.render("category", {category : "Chinese", recipes: foundRecipes, loggedin: "Logout"});
        }
      });
    }else if(category === "american"){
      Recipe.find({category: "American"}, function(err, foundRecipes){
        if(!err){
          res.render("category", {category : "American", recipes: foundRecipes, loggedin: "Logout"});
        }
      });
    }
  }else{
    if(category === "thai"){
      Recipe.find({category: "Thai"}, function(err, foundRecipes){
        if(!err){
          res.render("category", {category : "Thai", recipes: foundRecipes, loggedin: "Login"});
        }
      });
    }else if(category === "spanish"){
      Recipe.find({category: "Spanish"}, function(err, foundRecipes){
        if(!err){
          res.render("category", {category : "Spanish", recipes: foundRecipes, loggedin: "Login"});
        }
      });
    }else if(category === "mexican"){
      Recipe.find({category: "Mexican"}, function(err, foundRecipes){
        if(!err){
          res.render("category", {category : "Mexican", recipes: foundRecipes, loggedin: "Login"});
        }
      });
    }else if(category === "indian"){
      Recipe.find({category: "Indian"}, function(err, foundRecipes){
        if(!err){
          res.render("category", {category : "Indian", recipes: foundRecipes, loggedin: "Login"});
        }
      });
    }else if(category === "chinese"){
      Recipe.find({category: "Chinese"}, function(err, foundRecipes){
        if(!err){
          res.render("category", {category : "Chinese", recipes: foundRecipes, loggedin: "Login"});
        }
      });
    }else if(category === "american"){
      Recipe.find({category: "American"}, function(err, foundRecipes){
        if(!err){
          res.render("category", {category : "American", recipes: foundRecipes, loggedin: "Login"});
        }
      });
    }
  }

});


app.listen("3000", function(){
  console.log("server is up");
});
