import { describe, it, beforeEach } from '@jest/globals';
import request from 'supertest';
import BaseError from '../../errors/base.error.js';
import app from '../../app.js';

describe(BaseError.name, () => {
	let classError;

	beforeEach(() => {
		classError = new BaseError();
	});

	it('Should be created', () => {
		expect(classError).toBeTruthy();
	});

	it('Should be instantiated with the message property not null', () => {
		expect(classError.message).not.toBeNull();
	});

	it('Should be instantiated with the status property not null', () => {
		expect(classError.status).not.toBeNull();
	});

	it('Should be instantiated with a default message', () => {
		expect(classError.message).toBe('There was a server failure');
	});

	it('Should be instantiated with status 500', () => {
		expect(classError.status).toBe(500);
	});
});
