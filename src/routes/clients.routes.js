import express from 'express';
import ClientController from '../controllers/client.controller.js';

const router = express.Router();

router
	.get('/clients', ClientController.listCustomers)
	.get('/clients/:id', ClientController.listCustomerById)
	.post('/clients', ClientController.createNewCustomer)
	.put('/clients/:id', ClientController.updateCustomer)
	.delete('/clients/:id', ClientController.deleteCustomer)

export default router;
