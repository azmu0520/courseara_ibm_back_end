const books = require("../router/booksdb")

exports.getAllBooks = async(req,res)=>{
    try {
        res.json({books})
    } catch (error) {
    res.status(500).json({message:'Something Went Wrong'})
        console.log(error)
    }
}


exports.getBookDetailsByISBN = async(req,res)=>{
try {
    const {isbn}= req.params;
    res.json(books[isbn])
} catch (error) {
    res.status(500).json({message:'Something Went Wrong'})
    console.log(error)
}
}

exports.getBookDetailsByAuthor = async(req,res)=>{
try {
    const {author}= req.params;
    for (const book in books) {
        if(books[book].author === author){
          return  res.json({booksbyauthor:books[book]})
        }
    }
    return res.json({message:'Author not found'})
    
} catch (error) {
    res.status(500).json({message:'Something Went Wrong'})
    console.log(error)
}
}

exports.getBookDetailsByTitle = (req, res) => {
    const { title } = req.params;

    new Promise((resolve, reject) => {
        const book = Object.values(books).find(b => b.title === title);  
        if (book) {
            resolve(book);
        } else {
            reject({ message: 'Title not found' });
        }
    })
    .then(book => {
        return res.json({ booksbytitle: book });
    })
    .catch(err => {
        if (err.message === 'Title not found') {
            return res.status(404).json(err);
        }
        res.status(500).json({ message: 'Something went wrong' });
        console.error(err);
    });
};
exports.getBookReviewsByISBN = async(req,res)=>{
    try {
        const {isbn}= req.params;
        const selected = books[isbn].reviews
        
        return selected ? res.json(selected) : res.json({message:'Review Not Found'})
        
    } catch (error) {
        res.status(500).json({message:'Something Went Wrong'})
        console.log(error)
    }
}

exports.addBookReview = async(req,res)=>{
    try {
        let username = req.session.username
        const {isbn}= req.params;
        const {review} = req.query;
        console.log(review, username, isbn)
        let isExist = books[isbn]
        if (username) {
           if(isExist){
           for (const key in books) {
         if(key == isbn){
            books[key].reviews[username] = review;
            return res.json({review:books[key]})
         }
           } 
           } 
          } else {
            res.send('Please log in first');
          } 
        
      
        
    } catch (error) {
        res.status(500).json({message:'Something Went Wrong'})
        console.log(error)
    }
}

exports.deleteReview = async(req,res)=>{
    try {
        let username = req.session.username
        const {isbn}= req.params;
        let isExist = books[isbn]
        if (username) {
           if(isExist){
           for (const key in books) {
         if(key == isbn){
            books[key].reviews[username] = null;
            return res.json({review:books[key]})
         }
           } 
           } 
          } else {
            res.send('Please log in first');
          }         
    } catch (error) {
        res.status(500).json({message:'Something Went Wrong'})
        console.log(error)
    }
}