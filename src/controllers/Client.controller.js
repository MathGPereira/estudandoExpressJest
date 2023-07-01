import clients from '../models/clients.model.js';
import NotFoundError from '../errors/Not-found.error.js';
import PasswordCryptography from '../cryptography/password.cryptography.js';

class ClientController {

	constructor() {
		const crypto = new PasswordCryptography();
	}

	static listCustomers = async (req, res, next) => {
		try {
			const listCustomers = await clients.find();

			res.status(200).json(listCustomers);
		}catch(error) {
			next(error);
		}
	}

	static listCustomerById = async (req, res, next) => {
		const { id } = req.params;

		try {
			const customer = await clients.findById(id);

			if(customer) {
				res.status(200).json(customer);
			}else {
				next(new NotFoundError('Customer not found!'));
			}
		}catch(error) {
			next(error);
		}
	}

	static createNewCustomer = async (req, res, next) => {
		try {
			const { password: clientPassword } = req.body;
			const client = new clients(req.body);
			const encryptedPassword = new PasswordCryptography().encrypt(clientPassword);
	
			client.password = encryptedPassword.hash;
			client.salt = encryptedPassword.salt;
			
			await client.save();
			res.status(201).json({ message: 'Successfully registered customer!' });
		}catch(error) {
			next(error);
		}
	}

	static updateCustomer = async (req, res, next) => {
		const { id } = req.params;

		try {
			await clients.findByIdAndUpdate(id, req.body, { new: true });

			res.status(200).json({ message: 'Successfully updated customer!' });
		}catch(error) {
			next(error);
		}
	}

	static deleteCustomer = async (req, res, next) => {
		const { id } = req.params;

		try {
			await clients.findByIdAndDelete(id);

			res.status(200).json({ message: 'Successfully deleted customer!' });
		}catch(error) {
			next(error);
		}
	}
}

export default ClientController;
