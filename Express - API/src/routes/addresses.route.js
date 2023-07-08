import express from 'express';
import AddressesController from '../controllers/addresses.controller.js';

const router = express.Router();

router
	.post('/addresses', AddressesController.createAddress)

export default router;
