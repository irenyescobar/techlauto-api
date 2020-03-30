const { Router } = require('express');

const UsersController = require('./controllers/UsersController');
const CodesController = require('./controllers/CodesController');

const routes = new Router();

routes.get('/users', UsersController.index); 
routes.post('/users/auth', UsersController.request_authorization); 
routes.post('/code', CodesController.index); 

module.exports = routes