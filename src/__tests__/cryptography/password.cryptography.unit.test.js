import { describe, beforeEach, it } from '@jest/globals';
import PasswordCryptography from '../../cryptography/password.cryptography.js';

describe(PasswordCryptography.name, () => {
	let crypto;
	let anyPassword;

	beforeEach(() => {
		crypto = new PasswordCryptography();
		anyPassword = Math.floor(Math.random() * 1000000);
	});

	it('Should be created', () => {
		expect(crypto).toBeTruthy();
	});

	it(`#${PasswordCryptography.prototype.encrypt.name} should result in a object`, () => {
		const infoCrypto = crypto.encrypt(anyPassword);

		expect(typeof infoCrypto).toBe('object');
	});

	it(`#${PasswordCryptography.prototype.encrypt.name} 
		should result in an object that contains the salt property and the hash property, both strings`, () => {
		const infoCrypto = crypto.encrypt(anyPassword);
		const infroCryptoKeys = Object.keys(infoCrypto);

		expect(infroCryptoKeys).toContain('salt');
		expect(infroCryptoKeys).toContain('hash');
	});
});
