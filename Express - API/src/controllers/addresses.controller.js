import { addresses, clients } from '../models/index.model.js';
import ClientsController from '../controllers/clients.controller.js';

class AddressesController {

	static async listAddresses(req, res, next) {
		try {
			const addressesList = await addresses
				.find()
				.select({
					_id: 0, id: 0,
					createdAt: 0,
					updatedAt: 0
				})
			;

			res.status(200).json(addressesList);
		}catch(error) {
			next(error);
		}
	}

	static async createAddress(req, res, next) {
		try {
			const address = new addresses(req.body);

			req.body = { address: address._id };

			await address.save();
			ClientsController.updateCustomer(req, res, next);

			res.status(201).json({ message: 'Address registered successfully!' });
		}catch(error) {
			next(error);
		}
	}

	static async updateAddress(req, res, next) {
		let client;
		let addressId;

		try {
			const { cpf, email } = req.headers;

			if(cpf) {
				client = await clients.findOne({ cpf: cpf });
			}else if(email) {
				client = await clients.findOne({ email: email });
			}

			addressId = client.address._id;
			await addresses.findByIdAndUpdate(addressId, req.body, { new: true });
			
			res.status(201).json({ message: 'Address updated successfully!' });
		}catch(error) {
			next(error);
		}
	}
}

export default AddressesController;
