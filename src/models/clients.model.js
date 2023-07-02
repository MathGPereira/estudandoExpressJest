import mongoose from 'mongoose';
import ClientController from '../controllers/client.controller.js';
import ClientValidator from '../validators/client.validator.js'

const clientSchema = mongoose.Schema(
	{
		id: { type: String },
		name: {
			type: String,
			required: [true, 'Customer name is required!'],
			minlength: [3, 'Customer name must be no less than 3 digits!'],
			maxlength: [15, 'Customer name must not exceed 15 digits!'],
			trim: true
		},
		surname: {
			type: String,
			required: [true, 'Customer surname is required!'],
			minlength: [3, 'Customer surname must be no less than 3 digits!'],
			maxlength: [15, 'Customer surname must not exceed 15 digits!'],
			trim: true
		},
		rg: {
			type: String,
			required: [true, 'Customer RG is required!'],
			trim: true,
			validate: {
				validator: async value => {
					const regex = /\d{9}/;
					const isValidRegex = ClientValidator.regexValidator(regex, value);
					const isValidField = await ClientValidator.fieldValidator(value);

					return isValidField && isValidRegex;
				},
				message: 'The customer RG is invalid or already registered!'
			}
		},
		password: {
			type: String,
			required: [true, 'Customer password is required!'],
			minlength: [15, 'Customer password must be at least 14 characters long'],
			maxlength: [256, 'Customer password must be a maximum of 256 characters'],
			trim: true
		},
		email: {
			type: String,
			required: [true, 'Customer e-mail is required!'],
			unique: true,
			trim: true,
			validate: {
				validator: async value => {
					const regex = /^\w+@\w+?\.[a-zA-Z]{2,3}$/;
					const isValidRegex = ClientValidator.regexValidator(regex, value);
					const isValidField = await ClientValidator.fieldValidator(value);

					return isValidField && isValidRegex;

				},
				message: 'The customer email is invalid or already registered!'
			}
		},
		cpf: {
			type: String,
			required: [true, 'Customer CPF is required!'],
			unique: true,
			trim: true,
			validate: {
				validator: async value => {
					const regex = /\d{11}/;
					const isValidRegex = ClientValidator.regexValidator(regex, value);
					const isValidField = await ClientValidator.fieldValidator(value);

					return isValidField && isValidRegex;

				},
				message: 'The customer CPF is invalid or already registered!'
			}
		},
		addressId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'addresses'
		},
		accountId: {
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
				values: ['client', 'admin'],
				message: '{VALUE} is not supported!'
			}
		},
		salt: {
			type: String
		},
		createdAt: {
			type: Date,
			default: new Date().now
		},
		updatedAt: {
			type: Date,
			default: new Date().now
		}
	},
	{ versionKey: false }
);
const clients = mongoose.model('clients', clientSchema);

export default clients;
