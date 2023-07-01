import mongoose from 'mongoose';

const clientSchema = mongoose.Schema(
	{
		id: { type: String },
		name: {
			type: String,
			required: [true, 'Customer name is required!']
		},
		surname: {
			type: String,
			required: [true, 'Customer surname is required!']
		},
		rg: {
			type: String,
			required: [true, 'Customer RG is required!'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Customer password is required!'],
			min: [14, 'Customer password must be at least 14 characters long'],
			max: [25, 'Customer password must be a maximum of 25 characters'],
		},
		email: {
			type: String,
			required: [true, 'Customer e-mail is required!'],
			unique: true,
			validate: {
				validator: (value) => {
					const regex = /^\w+@\w+?\.[a-zA-Z]{2,3}$/;
					return regex.test(value);
				},
				message: 'The customer email is invalid!'
			}
		},
		cpf: {
			type: String,
			required: [true, 'Customer CPF is required!'],
			unique: true,
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
