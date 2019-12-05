import { Router }  from 'express';

const UsersController = require('./controllers/UsersController');
const CodesController = require('./controllers/CodesController');

const routes = new Router();

routes.get('/users', UsersController.index); 
routes.post('/code', CodesController.index); 

module.exports = routes