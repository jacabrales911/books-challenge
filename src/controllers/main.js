const bcryptjs = require('bcryptjs');
const db = require('../database/models');

const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        console.log(JSON.stringify(books, null, 2));
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: (req, res) => {
    // Implement look for details in the database
    db.Book.findByPk(req.params.id,{include: [{ association: 'authors' }]})
    .then((book) => {
       //console.log(JSON.stringify(book, null, 2));
      res.render('bookDetail', { book });
    })
    .catch((error) => console.log(error));

    //res.render('bookDetail');
  },
  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: (req, res) => {
    // Implement search by title
    let title = req.body.title;
    var condition = title ? {  [db.Sequelize.Op.like]: `%${title}%`  } : null;
    //console.log(condition);
    db.Book.findAll({
      include: [{ association: 'authors' }],
   
       where: {title:condition}
      })
      
      .then(books => {
          if (books.length > 0) {
        
          res.render('search', {books})    
          }
          else {
            res.render('search', { books: [] }) 
          }
        })
    //res.render('search');
  },
  deleteBook: (req, res) => {
    // Implement delete book
    res.render('home');
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: (req, res) => {
    // Implement books by author
    let ide=req.params.id
    var condition = ide ? {  [db.Sequelize.Op.like]: `%${ide}%`  } : null;
    db.Author.findAll({
      include: [{ association: 'books' }],
   
      where: {id:condition}
    })
      .then((authors) => {
        console.log(JSON.stringify(authors, null, 2));
        
        res.render('authorBooks', { authors });
      })
      .catch((error) => console.log(error));
   // res.render('authorBooks');
  },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  },
  edit: (req, res) => {
    // Implement edit book
    res.render('editBook', {id: req.params.id})
  },
  processEdit: (req, res) => {
    // Implement edit book
    res.render('home');
  }
};

module.exports = mainController;
