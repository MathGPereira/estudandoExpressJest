import clients from '../models/clients.model.js';

class Validator {

	constructor() {
		if(this.constructor === Validator) {
			throw new Error('You must not instantiate this class!');
		}
	}

	static regexValidator(regex, valueToBeTested) {
		const isItValid = regex.test(valueToBeTested);

		return isItValid;
	}

	static async validateUniqueness(fieldValue, schema) {
		const list = await Validator.#verifySchema(schema);
		const isItUniqueField =  Validator.#validateField(fieldValue, list)[0];

		return isItUniqueField;
	}

	static #validateField(fieldValue, list) {
		let responseList;

		if(fieldValue === 'cpf') {
			responseList = list.map(client => client.cpf !== fieldValue);
		}else if(fieldValue === 'email') {
			responseList = list.map(client => client.email !== fieldValue);
		}else {
			return [false];
		}

		return responseList;
	}

	static async #verifySchema(schema) {
		if(schema === 'clients') {
			return await clients.find().select(Validator.#viewOptions('clients'));
		}
	}

	static #viewOptions(schema) {
		if(schema === 'clients') {
			return ({
				_id: 0, id: 0,
				password: 0,
				salt: 0,
				createdAt: 0,
				updateAt: 0,
				addressId: 0, 
				accountId : 0
			});
		}
	}
}

export default Validator;
