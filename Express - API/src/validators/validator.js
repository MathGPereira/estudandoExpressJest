import clients from '../models/clients.model.js';
import accounts from '../models/accounts.model.js';

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

	static async validateUniqueness(field, fieldValue, schema) {
		const list = await Validator.#verifySchema(schema);
		const isItUniqueField =  Validator.#validateField(field, fieldValue, list)
			.find(boolean => boolean === false)
		;

		return isItUniqueField === undefined ? true: false;
	}

	static #validateField(field, fieldValue, list) {
		let responseList;

		if(field === 'cpf') {
			responseList = list.map(client => client.cpf !== fieldValue);
		}else if(field === 'email') {
			responseList = list.map(client => client.email !== fieldValue);
		}else if(field === 'accountNumber') {
			responseList - list.map(account => account.accountNumber !== fieldValue);
		}else {
			return [false];
		}

		return responseList;
	}

	static async #verifySchema(schema) {
		if(schema === 'clients') {
			return await clients.find().select(Validator.#viewOptions('clients'));
		}else if(schema === 'accounts') {
			return await accounts.find().select(Validator.#viewOptions('accounts'));
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
		}else if(schema === 'accounts') {
			return ({
				_id: 0, id: 0,
				accountNumber: 0
			});
		}
	}
}

export default Validator;
