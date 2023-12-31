import clients from '../models/clients.model.js';
import PasswordCriptography from '../cryptographys/password.cryptography.js';

class ClientsController {

	static async listCustomers(req, res, next) {
		try {
			const customersList = await clients
				.find()
				.select(
					{
						_id: 0, id: 0,
						password: 0,
						salt: 0,
						createdAt: 0,
						updatedAt: 0,
						accountId : 0
					}
				)
				.populate('address', 
					{ 
						_id: 0, id: 0,
						createdAt: 0,
						updatedAt: 0,
					}
				)
				.exec()
			;

			res.status(200).json(customersList);
		}catch(error) {
			next(error);
		}
	}

	static async createCustomer(req, res, next) {
		try {
			const { password } = req.body;
			const client = new clients(req.body);
			const encryptedPassword = new PasswordCriptography().encrypt(password);

			client.password = encryptedPassword.hash;
			client.salt = encryptedPassword.salt;

			await client.save()

			res.status(201).json({ message: 'Successfully registered customer!' });
		}catch(error) {
			next(error);
		}
	}

	static async updateCustomer(req, res, next) {
		try {
			const { cpf, email } = req.headers;
			req.body.updatedAt = new Date();

			if(cpf) {
				await clients.findOneAndUpdate({ cpf: cpf }, req.body, { new: true });
			}else if(email) {
				await clients.findOneAndUpdate({ email: email }, req.body, { new: true });
			}

			if(!req.body.addressId || !req.body.accountId) {
				res.status(200).json({ message: 'Successfully updated customer!' });
			}
		}catch(error) {
			next(error);
		}
	}

	static async deleteCustomer(req, res, next) {
		try {
			const { cpf, email } = req.headers;

			if(cpf) {
				await clients.findOneAndDelete({ cpf: cpf });
			}else if(email) {
				await clients.findOneAndDelete({ email: email });
			}
			res.status(200).json({ message: 'Successfully updated customer!' });
		}catch(error) {
			next(error);
		}
	}
}

export default ClientsController;
