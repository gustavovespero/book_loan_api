const express = require('express');

const BookAuthorController = require('./controller/BookAuthorController');
const BookController = require('./controller/BookController');
const LoanController = require('./controller/LoanController');
const LoanBookController = require('./controller/LoanBookController');
const UserController = require('./controller/UserController');
const SessionController = require('./controller/SessionController');
const AuthorController = require('./controller/AuthorController');

const routes = express.Router();

routes.post('/loan', LoanController.store);
routes.get('/loan', LoanController.index);
routes.post('/loan/user', LoanController.indexByUser);
routes.get('/loan/:id', LoanController.indexOne);
routes.delete('/loan/', LoanController.delete);
routes.delete('/loan/:id', LoanController.deleteOne);
routes.put('/loan/', LoanController.update);
routes.put('/loan/:id', LoanController.updateOne);

routes.post('/book', BookController.store);
routes.get('/book', BookController.index);
routes.get('/book/:id', BookController.indexOne);
routes.delete('/book/', BookController.delete);
routes.delete('/book/:id', BookController.deleteOne);
routes.put('/book/', BookController.update);
routes.put('/book/:id', BookController.updateOne);

routes.post('/user', UserController.store);
routes.post('/user/login', UserController.login);
routes.get('/user', UserController.index);
routes.post('/user/index-one', UserController.indexOne);
routes.delete('/user/', UserController.delete);
routes.delete('/user/:id', UserController.deleteOne);
routes.put('/user/', UserController.update);
routes.put('/edit/user', UserController.updateOne);

routes.post('/author', AuthorController.store);
routes.get('/author', AuthorController.index);
routes.get('/author/:id', AuthorController.indexOne);
routes.delete('/author/', AuthorController.delete);
routes.delete('/author/:id', AuthorController.deleteOne);
routes.put('/author/', AuthorController.update);
routes.put('/author/:id', AuthorController.updateOne);

routes.post('/loan/:loan_id/loan_book/:id', LoanBookController.store);
routes.post('/loan/items', LoanBookController.indexLoanItems);
routes.get('/loan_book', LoanBookController.index);
routes.get('/loan_book/:id', LoanBookController.indexOne);
routes.delete('/loan_book/', LoanBookController.delete);
routes.delete('/loan/:order_id/loan_book/:id', LoanBookController.deleteOne);
routes.put('/loan_book/', LoanBookController.update);
routes.put('/loan/:loan_id/loan_book/:id', LoanBookController.updateOne);

routes.post('/book/:book_id/book_author/:id', BookAuthorController.store);
routes.get('/book_author', BookAuthorController.index);
routes.get('/book_author/:id', BookAuthorController.indexOne);
routes.delete('/book_author/', BookAuthorController.delete);
routes.delete('/book/:book_id/book_author/:id', BookAuthorController.deleteOne);
routes.put('/book_author/', BookAuthorController.update);
routes.put('/book/:book_id/book_author/:id', BookAuthorController.updateOne);

routes.post('/session', SessionController.store);
routes.get('/session', SessionController.index);
routes.get('/session/:id', SessionController.indexOne);
routes.delete('/session/', SessionController.delete);
routes.delete('/session/:id', SessionController.deleteOne);
routes.put('/session/', SessionController.update);
routes.put('/session/:id', SessionController.updateOne);

module.exports = routes;