let express = require("express");
let app = express();
let mongoose = require("mongoose");
let morgan = require("morgan");
let bodyPaser = require("body-parser");
let port = 8080;
let book = require("./app/routes/book");
let config = require("config") 
const db = config.get("DBHost");


//=========================================================================parse appilication/json and look for the raw text ;
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended:true}));
app.use(bodyPaser.text());
app.use(bodyPaser.json({type:"application/json"}));
app.use(bodyPaser.json({text:"application/json"}));
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.get('/',(req,res)=> res.json({message:"Welcome to our Bookstore!"}));

// book object with its corresponding methods ;
app.route("/book")
   .get(book.getBooks)
   .post(book.postBook)
app.route("/book/:id")
   .get(book.getBook)
   .delete(book.deleteBook)
   .put(book.updateBook);
// ======================================================================connect to the database
const connectDB = async ()=>{
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify: false
      }; 
    
     try {
        await mongoose.connect(db,options)
        console.log("the databse connected successfuly")
     } catch (error) {
     console.log(error);
     process.exist(1);    
     }
}

connectDB();

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing ;