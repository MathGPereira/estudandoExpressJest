import Validator from './validator.js';

class ClientsValidator extends Validator {

	constructor() {
		super();
	}

	static validateCpf(cpfValue) {
		if(ClientsValidator.#validatesRepeatedNumbers(cpfValue) || ClientsValidator.#validatesFirstDigit(cpfValue) || ClientsValidator.#validatesSecondDigit(cpfValue)) {
	        return false;
	    }

	    return true;
	}

	static #validatesFirstDigit(cpfValue) {
		let sum = 0;
	    let multiplier = 10;

	    for(let size = 0; size < 9; size++) {
	        sum += cpfValue[size] * multiplier;
	        multiplier--;
	    }
	    sum = (sum * 10) % 11;

	    if(sum == 10 || sum == 11) {
	        sum = 0;
	    }

	    return sum != cpfValue[9];
	}

	static #validatesSecondDigit(cpfValue) {
		let sum = 0;
	    let multiplier = 11;

	    for(let size = 0; size < 10; size++) {
	        sum += cpfValue[size] * multiplier;
	        multiplier--;
	    }
	    sum = (sum * 10) % 11;

	    if(sum == 10 || sum == 11) {
	        sum = 0;
	    }

	    return sum != cpfValue[10];
	}

	static #validatesRepeatedNumbers(cpfValue) {
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

    	return repeatedNumbers.includes(cpfValue);
	}
}

export default ClientsValidator;
