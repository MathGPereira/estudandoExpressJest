import express from 'express';
import ClientsController from '../controllers/clients.controller.js';

const router = express.Router();

router
	.get('/clients', ClientsController.listCustomers)
	.post('/clients', ClientsController.createCustomer)
	.put('/clients', ClientsController.updateCustomer)
	.delete('/clients', ClientsController.deleteCustomer)

export default router;
