const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

var entries = Object.entries(books);
var keys = Object.keys(books);


 //Register user
public_users.post("/register", (req,res) => {
 
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password}); //"users" es una variable local, por lo que si queremos ver los usuarios creados, debemos consultarlos dentro de esta función, ya que si lo hacemos en el ábito global nos mostrará el arreglo vacío "users = []" como inicialmente se creó globalmente. Para solucionarlo, debemos exponer la variable en el ambito global (que no hacemos aqui).
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user. Enter all data required for registration."});

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
public_users.get('/author/:author',function (req, res) { //Rout de una solicitud GET
  var iAuthor = req.params.author; // Carga el nombre del author del parámetro "author" enviada con la solicitud GET.

      
function outcome () {

const authorValid = (inAuthor)=>{ //returns  boolean

      for (var i = 0; i < keys.length; i++) { //Se crea una ciclo para iterar el objeto. El mensaje con status 400 Not found, debe quedar fuera de esta iteración.
     
           if  ( books[keys[i]].author === inAuthor ) { //Para validar si existe el nombre del author dentro del objeto. Si el nombre del author coincide, entonces filtar toda la información relacionada a ese author:
                   
                 return true;
           }     
     
       }

                 return false;
   }

  
     if (!authorValid(iAuthor)) {  //If it's false then show negative response.
                  return res.status(404).json({message:`Entry an author valid. Not Found`}); 
                  
       } else {
                 
                  const filteredElements = Object.entries(books).filter(([key, value]) => value.author === iAuthor); //Entries pasa el objeto a un arreglo, luego se aplica el filtro bajo una función en la "key" o el "value", pero solo necesitaremos "value" y el criterio que es "author" con el condicional. 
                  const filteredObject = Object.fromEntries(filteredElements); //Convierte el arreglo nuevamente a un objeto.
                  res.send(filteredObject); //Muestra el filtrado como objeto.
 
      
          }

} //closing outcome function 


// CALLBACK PROMISE:

          const getBooks = new Promise((resolve, reject) => {  

              resolve(
                outcome ()
              );

          });

          getBooks.then(() => console.log("The Task 12 has been resolved!")); //Call back.
  
});



// Get book details based on title:
public_users.get('/title/:title',function (req, res) { //Rout de una solicitud GET
  var ititle = req.params.title; // Carga el nombre del title del parámetro "title" enviada con la solicitud GET.
 


 function outcome () {

   const titleValid = (intitle)=>{ //returns  boolean

       for (var i = 0; i < keys.length; i++) { //Se crea una ciclo para iterar el objeto. El mensaje con status 400 No found, debe quedar fuera de esta iteración.
      
            if  ( books[keys[i]].title === intitle ) { //Para validar si existe el nombre del título dentro del objeto. Si el nombre del author coincide, entonces filtar toda la información relacionada a ese author:
                    
                  return true;
            }     
      
        }

                  return false;
    }

   
      if (!titleValid(ititle)) {  //If it's false then show negative response.
                   return res.status(404).json({message:`Entry an title valid. Not Found`}); 
                   
        } else {
                  
                   const filteredElements = Object.entries(books).filter(([key, value]) => value.title === ititle); //Entries pasa el objeto a un arreglo, luego se aplica el filtro bajo una función en la "key" o el "value", pero solo necesitaremos "value" y el criterio que es "title" con el condicional. 
                   const filteredObject = Object.fromEntries(filteredElements); //Convierte el arreglo nuevamente a un objeto.
                   res.send(filteredObject); //Muestra el filtrado como objeto.
  
       
           }



} // closing outcome function 


// CALLBACK PROMISE:

           const getBooks = new Promise((resolve, reject) => {  

               resolve(
                 outcome ()
               );

           });

           getBooks.then(() => console.log("The Task 13 has been resolved!")); //Call back.
   
});


// Get book reviews under isbn:
public_users.get('/review/:isbn',function (req, res) {

  var iisbn = req.params.isbn; // Carga el nombre del title del parámetro "isbn" enviada con la solicitud GET.
  
  const isbnValid = (indice) =>{ //returns  boolean
      return books.hasOwnProperty(indice); //El método "hasOwnProperty" devuelve true o false si el objeto contiene la clave dada como argumento.
    }

  
     if (!isbnValid(iisbn)) {  
                  return res.status(404).json({message:`Entry an isbn valid. The isbn ${iisbn} Not Found`}); 
                  
       } else {

              for (var i = 0; i < keys.length; i++) { //Se crea una ciclo para iterar el objeto. El mensaje con status 400 No found, debe quedar fuera de esta iteración.
     
                  if  ( keys[i] === iisbn ) { 
                                        
                      // res.send(entries[i][1]["reviews"]);

                      const review = (entries[i][1]["reviews"]);
                      const title = (entries[i][1]["title"]);
                      const revObject = {review, title};
                      res.send(revObject);
                
                  }              
              }
          }
});



module.exports.general = public_users;
