let mongoose = require("mongoose");
let Book = require("../models/book");


// GET /book route to retrieve all the books 

function getBooks (req,res){
    // Querry the DB and in no erros , send all the boods 
    let querry = Book.find({});
    querry.exec((err,books)=>{
        if(err) res.send(err);
        // if no errors,send them back to the client ;
        res.json(books)
    });
}

// POST /book to save a new book .

function postBook(req,res){
    // create new books 
    let newBook = new Book(req.body);
    // save into DB. 
    newBook.save((err,book)=>{
        if(err){
            res.send(err);
        }
        else{ // if no errors , send it back to the client 
         res.json({message:"Book successully added",book});
        }
    })
}

//GET /book/:id route to retrieve a book given its id .
function getBook(req,res){
    Book.findbyId(req.params.id,(err,book)=>{
        if(err) res.send(err);
        // if no errors , send it back to the client 
        res.json(book);
    })
}

// DELETE /book:id to delete a book given its id.

function deleteBook (req,res){
    Book.remove({_id:req.params.id},(err,result)=>{
      res.json({message:"Book successully deleted !",result})  
    })
}

// PUT /book:id to update a book diven its id 

function updateBook(req,res){
    Book.findbyId({_id:req.params.id},(err,book)=>{
        if(err) res.send(err);
        Object.assign(book,req.body).save((err,book)=>{
            if(err) res.send(err);
            res.json({message:"Book updated!",book});
        })
    })
}

// export all the functions 
module.exports = {getBooks,postBook,getBook,deleteBook,updateBook}