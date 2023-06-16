const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented....."});
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {

  const getBooks = new Promise((resolve, reject) => {  

      resolve(
        res.send (JSON.stringify(books, null, 4))
      );

  });

  getBooks.then(() => console.log("The Task 10 has been resolved!")); //call back.

});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let iisbn = req.params.isbn; 

  function outcome () {
      const isbnValid = (key) =>{ //returns  boolean
          return books.hasOwnProperty(key); //El método "hasOwnProperty" devuelve true o false si el objeto contiene la clave dada como argumento.
        }
  
      
      if (!isbnValid(iisbn)) {  
              return res.status(404).json({message:`Entry an isbn valid. The isbn ${iisbn} Not Found`}); 
              
      } else {
  

          for (var i = 0; i < keys.length; i++) { //Se crea una ciclo para iterar el objeto. El mensaje con status 400 No found, debe quedar fuera de esta iteración.
     
              if  ( keys[i] === iisbn ) {  //Cuando encuentra coincidencia exacta con el isbn solicitado entonces ejecuta:        
              
                  //Showing all details of book by isbn:
                  const a=[]; //Preparando un arreglo vacío.
                  const outArray = entries[i]; //Extrae el arreglo(antes propiedad) según el índice, pero de esta forma no se puede transformar en un objeto ya que lo debemos anidar en el arreglo vacío "a".
                  a.push(outArray); //Agregando al arreglo vacío "a" el arreglo(antes propiedad) para hacerlo apto a fin de convertirlo a un objeto.
                  const out = Object.fromEntries(a); //Convierte el arreglo cargado en "a" en un objeto.
                  res.send(out); //Muestra la propiedad del objeto tratada.
            
                  }
        
              } 
          }

      } // closing outcome function


// CALLBACK PROMISE:

          const getBooks = new Promise((resolve, reject) => {  

              resolve(
                outcome ()
              );

          });

          getBooks.then(() => console.log("The Task 11 has been resolved!")); //Call back.
   
  
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
