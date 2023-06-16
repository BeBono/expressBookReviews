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
  var iisbn = req.params.isbn; // Carga el nombre del title del parámetro "isbn" enviada con la solicitud GET.
  var reV = req.query.reviews; // Hace referencia a la query string o parámetros dinámicos que pasemos en la url.
  
  const isbnValid = (indice) =>{ //returns  boolean
      return books.hasOwnProperty(indice); //El método "hasOwnProperty" devuelve true o false si el objeto contiene la clave dada como argumento.
    }

  
  if (!isbnValid(iisbn)) {  
          return res.status(404).json({message:`Entry an isbn valid. The isbn ${iisbn} Not Found`}); 
          
  } else {

      for (var i = 0; i < keys.length; i++) { //Se crea una ciclo para iterar el objeto. El mensaje con status 400 No found, debe quedar fuera de esta iteración.
         
          if  ( keys[i] === iisbn ) {  //Cuando encuentra coincidencia exacta con el isbn solicitado entonces ejecuta:        
           
              (entries[i][1]["reviews"])[global] = reV; // No es posible utilizar el método push porque el comentario debe ir dentro de un objeto {}, por tal razón hay que utilizar la notacón para agregar propiedades a objetos (y no para arreglos). Observar que la ruta del objeto debe ir entre parénteis "(entries[i][1]["reviews"])" para que pueda funcionar la creación de la clave(key) dinámica [global].
         

              //Showing all details of book with reviews:
              const a=[]; //Preparando un arreglo vacío.
              const outArray = entries[i]; //Extrae el arreglo(antes propiedad) según el índice, pero de esta forma no se puede transformar en un objeto ya que lo debemos anidar en el arreglo vacío "a".
              a.push(outArray); //Agregando al arreglo vacío "a" el arreglo(antes propiedad) para hacerlo apto a fin de convertirlo a un objeto.
              const out = Object.fromEntries(a); //Convierte el arreglo cargado en "a" en un objeto.
              res.send(out); //Muestra la propiedad del objeto tratada.
        
              }
    
          } 
   
      }

  });




module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
