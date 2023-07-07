import clients from '../models/clients.model.js';
import PasswordCriptography from '../cryptographys/password.cryptography.js';

class ClientsController {

	static async listCustomers(req, res, next) {
		try {
			const customersList = await clients.find().select({
				_id: 0, id: 0,
				password: 0,
				salt: 0,
				createdAt: 0,
				updateAt: 0,
				addressId: 0, 
				accountId : 0
			});

			res.status(200).json(customersList);
		}catch(error) {
			next(error)
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
			if(error.code === 11000) {
				res.status(500).json({ message: 'There are one or more fields already registered in the system!' });
			}else {
				next(error)
			}
		}
	}

	static async updateCustomer(req, res, next) {
		try {
			const { cpf, email } = req.headers;

			if(cpf) {
				await clients.findOneAndUpdate({ cpf: cpf }, req.body, { new: true });
			}else if(email) {
				await clients.findOneAndUpdate({ email: email }, req.body, { new: true });
			}
			res.status(200).json({ message: 'Client updated successfully!' });
		}catch(error) {
			next(error)
		}
	}
}

export default ClientsController;
