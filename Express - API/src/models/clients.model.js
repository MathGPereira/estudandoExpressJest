import mongoose from 'mongoose';
import { ClientsValidator } from '../validators/index.validator.js';

const clientsSchema = mongoose.Schema(
	{
		id: {
			type: String
		},
		name: {
			type: String,
			required: [true, 'The field name is required!'],
			minlength: [3, 'The name field must be at least 3 characters long!'],
			trim: true,
			validate: {
				validator: value => {
					const regex = /[!@#$$%&*()<>|\/\\?;.]/gm;
					const isItValidRegex = ClientsValidator.regexValidator(regex, value);
					
					return !isItValidRegex;
				},
				message: 'The name cannot have special characters!'
			}
		},
		surname: {
			type: String,
			required: [true, 'The field surname is required!'],
			minlength: [3, 'The surname field must be at least 3 characters long!'],
			trim: true,
			validate: {
				validator: value => {
					const regex = /[!@#$$%&*()<>|\/\\?;.]/gm;
					const isItValidRegex = ClientsValidator.regexValidator(regex, value);

					return !isItValidRegex;
				},
				message: 'The surname cannot have special characters'
			}
		},
		password: {
			type: String,
			required: [true, 'The field password is required!'],
			minlength: [256, 'There was an error with the password field!'],
			maxlength: [256, 'There was an error with the password field!'],
			trim: true
		},
		email: {
			type: String,
			required: [true, 'The field email is required!'],
			minlength: [8, 'The email field must have at least 8 characters!'],
			trim: true,
			unique: true,
			validate: [
				{
					validator: async value => {
						const isItUniqueField = await ClientsValidator.validateUniqueness('email', value, 'clients');

						return isItUniqueField;
					},
					message: 'The {PATH} {VALUE} is already registered!'
				},
				{
					validator: value => {
						const regex = /^\w+@\w+?\.[a-zA-Z]{2,3}$/gm;
						const isItValidRegex = ClientsValidator.regexValidator(regex, value);

						return isItValidRegex;
					},
					message: 'The {PATH} {VALUE} is invalid!'
				}
			]
		},
		cpf: {
			type: String,
			required: [true, 'The field CPF is required!'],
			minlength: [11, 'The CPF field must be at least 11 characters long!'],
			maxlength: [11, 'The CPF field must have a maximum of 11 characters!'],
			trim: true,
			unique: true,
			validate: [
				{
					validator: value => {
						const regex = /\d{11}/gm;
						const isItValidRegex = ClientsValidator.regexValidator(regex, value);
						const isItValidCpf = ClientsValidator.validateCpf(value);

						return isItValidCpf && isItValidRegex;
					},
					message: `The {PATH} {VALUE} is invalid!`
				},
				{
					validator: async value => {
						const isItUniqueField = await ClientsValidator.validateUniqueness('cpf', value, 'clients');

						return isItUniqueField;
					},
					message: `The {PATH} {VALUE} is already registered!`
				}
			]
		},
		address: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'addresses'
		},
		account: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'accounts'
		},
		picture: {
			type: String,
			default: 'client.png'
		},
		role: {
			type: String,
			default: 'client',
			enum: {
				values: ['admin', 'client'],
				message: '{VALUE} is not supported!'
			}
		},
		salt: {
			type: String,
			minlength: [256, 'The salt must be at least 256 characters!'],
			maxlength: [256, 'The salt must be a maximum 256 characters!']
		},
		createdAt: {
			type: Date,
			default: new Date
		},
		updatedAt: {
			type: Date,
			default: new Date()
		}
	},
	{ versionKey: false }
);
const clients = mongoose.model('clients', clientsSchema);

export default clients;
