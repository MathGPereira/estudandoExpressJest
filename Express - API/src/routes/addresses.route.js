import express from 'express';
import AddressesController from '../controllers/addresses.controller.js';

const router = express.Router();

router
	.get('/addresses', AddressesController.listAddresses)
	.post('/addresses', AddressesController.createAddress)
	.put('/addresses', AddressesController.updateAddress)

export default router;
