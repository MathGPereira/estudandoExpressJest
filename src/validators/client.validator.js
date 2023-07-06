import { clients } from '../models/index.js';

class ClientValidator {

	static regexValidator = (regex, testValue) => {
		return regex.test(testValue);
	}

	static fieldValidator = async (value, field) => {
		const listCustomers = await clients.find();
		const isValidField = listCustomers.map(client => {
			field === 'email' ? client.email === value : client.cpf === value
		})[0];
		console.log(isValidField)
		return isValidField;
	}

	static validateCpf = value => {
	    if(this.validatesRepeatedNumbers(value) || this.validatesFirstDigit(value) || this.validatesSecondDigit(value)) {
	        return true;
	    }

	    return false;
	}

	static validatesFirstDigit = value => {
		let sum = 0;
	    let multiplier = 10;

	    for(let size = 0; size < 9; size++) {
	        sum += value[size] * multiplier;
	        multiplier--;
	    }
	    sum = (sum * 10) % 11;

	    if(sum == 10 || sum == 11) {
	        sum = 0;
	    }

	    return sum != value[9];
	}

	static validatesSecondDigit = value => {
		let sum = 0;
	    let multiplier = 11;

	    for(let size = 0; size < 10; size++) {
	        sum += value[size] * multiplier;
	        multiplier--;
	    }
	    sum = (sum * 10) % 11;

	    if(sum == 10 || sum == 11) {
	        sum = 0;
	    }

	    return sum != value[10];
	}

	static validatesRepeatedNumbers = value => {
		const repeatedNumbers = [
	        "00000000000",
	        "11111111111",
	        "22222222222",
	        "33333333333",
	        "44444444444",
	        "55555555555",
	        "66666666666",
	        "77777777777",
	        "88888888888",
	        "99999999999"
	    ]
    	return repeatedNumbers.includes(value);
	}
}

export default ClientValidator;
