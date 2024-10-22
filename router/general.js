const express = require('express');
const { getAllBooks, getBookDetailsByISBN, getBookDetailsByAuthor, getBookDetailsByTitle, getBookReviewsByISBN } = require('../controller/books.js');
const { registerUser } = require('../controller/auth.js');
const public_users = express.Router();


public_users.post("/register",registerUser);

// Get the book list available in the shop
public_users.get('/',getAllBooks);

// Get book details based on ISBN
public_users.get('/isbn/:isbn',getBookDetailsByISBN);
  
// Get book details based on author
public_users.get('/author/:author',getBookDetailsByAuthor);

// Get all books based on title
public_users.get('/title/:title',getBookDetailsByTitle);

//  Get book review
public_users.get('/review/:isbn',getBookReviewsByISBN);

module.exports.general = public_users;
