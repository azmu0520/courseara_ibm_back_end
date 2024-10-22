const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const { loginUser } = require('../controller/auth.js');
const { addBookReview, deleteReview } = require('../controller/books.js');
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}



//only registered users can login
regd_users.post("/login", loginUser);

// Add a book review
regd_users.put("/auth/review/:isbn",addBookReview);
regd_users.delete("/auth/review/:isbn",deleteReview);

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
