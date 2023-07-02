import clients from '../models/clients.model.js';

class ClientValidator {

	static regexValidator = (regex, testValue) => {
		return regex.test(testValue);
	}

	static fieldValidator = async value => {
		const listCustomers = await clients.find();
		const isValidField = listCustomers.map(client => client.rg === value)[0];

		return isValidField;
	}
}

export default ClientValidator;
