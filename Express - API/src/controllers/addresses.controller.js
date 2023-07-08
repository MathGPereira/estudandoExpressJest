import addresses from '../models/addresses.model.js';
import ClientsController from '../controllers/clients.controller.js';

class AddressesController {

	static async createAddress(req, res, next) {
		try {
			const address = new addresses(req.body);

			req.body = { addressId: address._id };

			await address.save();
			ClientsController.updateCustomer(req, res, next);

			res.status(201).json({ message: 'Address registered successfully!' });
		}catch(error) {
			next(error);
		}
	}
}

export default AddressesController;
