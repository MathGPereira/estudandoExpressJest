import mongoose from 'mongoose';

const addressesSchema = mongoose.Schema(
	{
		id: {
			type: String
		},
		zipCode: {
			type: String,
			required: [true, 'The field zip code is required!'],
			maxlength: [8, 'The zip code field must have a maximum of 8 characters!'],
			minlength: [8, 'The zip code field must be at least 8 characters long!'],
			trim: true,
			validate: {
				validator: async value => {
					const url = `http://www.viacep.com.br/ws/${value}/json/`;
					const response = await fetch(url);
					const jsonResponse = response.json();

					return jsonResponse.erro ? false : jsonResponse.erro;
				},
				message: 'The zip code entered does not exist!'
			}
		},
		publicPlace: {
			type: String,
			required: [true, 'The field public place is required!'],
			trim: true
		},
		complement: {
			type: String,
			trim: true
		},
		district: {
			type: String,
			required: [true, 'The field district is required!'],
			trim: true
		},
		city: {
			type: String,
			required: [true, 'The field city is required!'],
			trim: true
		},
		uf: {
			type: String,
			required: [true, 'The field UF is required!'],
			trim: true,
			enum: {
				values: ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF'],
				message: '{VALUE} is not supported!'
			}
		},
		ddd: {
			type: Number,
			required: true,
			enum: {
				values: [11, 12, 13, 14, 15, 16, 17, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 35, 41, 42, 43, 50, 51, 52, 53],
				message: '{VALUE} is not supported!'
			}
		},	
		createdAt: {
			type: Date,
			default: new Date()
		},
		updatedAt: {
			type: Date,
			default: new Date()
		}
	}
);