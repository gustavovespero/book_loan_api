const express = require('express');

const BookController = require('./controller/BookController');
const LoanController = require('./controller/LoanController');
const LoanBookController = require('./controller/LoanBookController');
const UserController = require('./controller/UserController');
const SessionController = require('./controller/SessionController');

const routes = express.Router();

routes.post('/loan', LoanController.store);
routes.get('/loan', LoanController.index);
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
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.indexOne);
routes.delete('/user/', UserController.delete);
routes.delete('/user/:id', UserController.deleteOne);
routes.put('/user/', UserController.update);
routes.put('/user/:id', UserController.updateOne);

routes.post('/orders/:order_id/loan_book/:id', LoanBookController.store);
routes.get('/loan_book', LoanBookController.index);
routes.get('/loan_book/:id', LoanBookController.indexOne);
routes.delete('/loan_book/', LoanBookController.delete);
routes.delete('/orders/:order_id/loan_book/:id', LoanBookController.deleteOne);
routes.put('/loan_book/', LoanBookController.update);
routes.put('/orders/:order_id/loan_book/:id', LoanBookController.updateOne);

routes.post('/session', SessionController.store);
routes.get('/session', SessionController.index);
routes.get('/session/:id', SessionController.indexOne);
routes.delete('/session/', SessionController.delete);
routes.delete('/session/:id', SessionController.deleteOne);
routes.put('/session/', SessionController.update);
routes.put('/session/:id', SessionController.updateOne);

module.exports = routes;