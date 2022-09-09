const express = require('express');
const Route = express.Router();
const auth = require("../controllers/middleware/auth");
const web = require("../controllers/middleware/web");
Route.use(web);

Route.use('/', express.static('public'));
// Route.use('/storage', express.static('storage'));

// Public
Route.get('/', (req, res) => {
    res.send(view('index'));
});

// Auth
const AuthController = require('../controllers/http/AuthController');
Route.post('/login', AuthController.login);
Route.post('/register/email', AuthController.registerWithEmail);
Route.post('/refresh', auth, AuthController.refresh);
Route.post('/logout', auth, AuthController.logout);

// Users
const UserController = require('../controllers/http/UserController');
Route.post('/user/current', auth, UserController.currentUser);
Route.post('/user/list', auth, UserController.list);
Route.post('/user/get', auth, UserController.get);
Route.post('/user/update', auth, UserController.update);
Route.post('/user/upload-avatar', auth, UserController.uploadAvatar);

// File
const FileController = require('../controllers/http/FileController');
Route.post('/file/list', auth, FileController.list);
Route.get('/file/:id', FileController.get);
Route.get('/file/:id/:filename', FileController.newGet);
Route.post('/file/upload', auth, FileController.upload);
Route.post('/file/upload-files', auth, FileController.uploadFiles);
Route.post('/file/create-folder', auth, FileController.createFolder);

// Addressess
const AddressController = require('../controllers/http/AddressController');
Route.post('/address/list', auth, AddressController.list);

// Transactions
const TransactionController = require('../controllers/http/TransactionController');
Route.post('/transactions/list', auth, TransactionController.list);

// Business
const BusinessController = require('../controllers/http/lgu/BusinessController');
Route.post('/lgu/business/list', BusinessController.list);
Route.post('/lgu/business/get', BusinessController.get);
Route.post('/lgu/business/add', auth, BusinessController.add);
Route.post('/lgu/business/save', auth, BusinessController.save);
Route.post('/lgu/business/pay-fee', auth, BusinessController.payFee);

// Complaints
const ComplaintController = require('../controllers/http/lgu/ComplaintController');
Route.post('/lgu/complaint/list', ComplaintController.list);
Route.post('/lgu/complaint/create', ComplaintController.create);

module.exports = Route;