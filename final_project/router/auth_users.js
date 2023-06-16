const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

//common variables to filter:
var keys = Object.keys(books); // Obtiene los llaves/claves/keys de cada propiedad del objeto. 
var entries = Object.entries(books); //Convierte el objeto en un array.

var global; //Variable global que tomará el valor de la variable username (local) trabajado dentro de la router login.



const isValid = (username)=>{ //returns boolean to validate is user already exist.

    let userswithsamename = users.filter((user)=>{
        return user.username === username;
      });
      if(userswithsamename.length > 0){
        return true;
      } else {
        return false;
      }

}


const authenticatedUser = (username,password)=>{ //returns boolean


  let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }

}


//only registered users can login
regd_users.post("/login", (req,res) => { // "regiter/login"
  const username = req.body.username;
  const password = req.body.password;
  global = username; //Pasa el valor local de la vabiable username al ámbito global.

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
 if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 }); //1 hour.

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).json({message:"User successfully logged in"});
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }});
  

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
