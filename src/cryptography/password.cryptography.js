import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'crypto';

class PasswordCriptography {

	verifyPassword(senha) {
		const primeiraRodada = this.#encrypt64(senha, 10);
		const segundaRodada = this.#cipherCaesar(primeiraRodada, 10, 10);
		const terceiraRodada = this.#hash(segundaRodada);
		const testeHash = scryptSync(terceiraRodada, this.bd[0].sal, 128);
		const hashReal = Buffer.from(this.bd[0].hash, 'hex');
		const correspondencia = timingSafeEqual(testeHash, hashReal);
		console.log(correspondencia);
	}

	encrypt(senha) {
		const primeiraRodada = this.#encrypt64(senha, 10);
		const segundaRodada = this.#cipherCaesar(primeiraRodada, 10, 10);
		const terceiraRodada = this.#hash(segundaRodada);
		const quartaRodada = this.#hashWithSalt(terceiraRodada);

		return quartaRodada;
	}

	#encrypt64(senha, rodadas) {
		for(let i = 0; i < rodadas; i++) {
			senha = btoa(senha);
		}

		return senha;
	}

	#cipherCaesar(senha, movimentos, rodadas) {
		let senhaCifrada;

		for(let i = 0; i < rodadas; i++) {
			senhaCifrada = senha.split('').map(char => {
				const codigo = char.charCodeAt(0);
				return String.fromCharCode(codigo + movimentos);
			});

			senha = senhaCifrada.join('');
		}

		return senha;
	}

	#hash(senha) {
		return createHash('sha512').update(senha).digest('hex');
	}

	#hashWithSalt(senha) {
		const salt = randomBytes(128).toString('hex');
		const hash = scryptSync(senha, salt, 128).toString('hex');

		return { salt: salt, hash: hash };
	}
}

export default PasswordCriptography;
