import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'crypto';

class PasswordCriptography {

	verifyPassword(password) {
		const firstRound = this.#encrypt64(password, 10);
		const secondRound = this.#cipherCaesar(firstRound, 10, 10);
		const thirdRound = this.#hash(secondRound);
		const testHash = scryptSync(thirdRound, this.bd[0].sal, 128);
		const realHash = Buffer.from(this.bd[0].hash, 'hex');
		const correspondence = timingSafeEqual(testHash, realHash);
		console.log(correspondence);
	}

	encrypt(password) {
		const firstRound = this.#encrypt64(password, 10);
		const secondRound = this.#cipherCaesar(firstRound, 10, 10);
		const thirdRound = this.#hash(secondRound);
		const quartaRodada = this.#hashWithSalt(thirdRound);

		return quartaRodada;
	}

	#encrypt64(password, rounds) {
		for(let i = 0; i < rounds; i++) {
			password = btoa(password);
		}

		return password;
	}

	#cipherCaesar(password, moves, rounds) {
		let passwordCifrada;

		for(let i = 0; i < rounds; i++) {
			passwordCifrada = password.split('').map(char => {
				const codes = char.charCodeAt(0);
				return String.fromCharCode(codes + moves);
			});

			password = passwordCifrada.join('');
		}

		return password;
	}

	#hash(password) {
		return createHash('sha512').update(password).digest('hex');
	}

	#hashWithSalt(password) {
		const salt = randomBytes(128).toString('hex');
		const hash = scryptSync(password, salt, 128).toString('hex');

		return { salt: salt, hash: hash };
	}
}

export default PasswordCriptography;
