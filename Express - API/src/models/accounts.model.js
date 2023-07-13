import mongoose from 'mongoose';
import AccountValidator from '../validators/accounts.validator.js';

const accountsSchema = mongoose.Schema(
    {
        id: {
            type: String
        },
        accountNumber: {
            type: String,
            trim: true,
            required: [ture, 'The account number is required!'],
            minlength: [4, 'Account number must be at least 4 digits!'],
            maxlength: [11, 'Account number must be a maximum of 4 digits!'],
            validate: [
                {
                    validator: async value => {
                        const isItUniqueField = await AccountValidator.validateUniqueness('accountNumber', value, 'accounts');

						return isItUniqueField;
                    },
                    message: 'Generated account number already exists!'
                },
                {
                    validator: value => {
						const regex = /^\d{9}[A-Za-z]?$/gm;
						const isItValidRegex = AccountValidator.regexValidator(regex, value);

						return isItValidRegex;
					},
					message: 'The {PATH} {VALUE} is invalid!'
                }
            ]
        },
        agency: {
            type: String,
            trim: true,
            required: [true, 'The account agency is required!'],
            minlength: [3, 'Agency number must be at least 3 digits!'],
            maxlength: [4, 'Agency number must be a maximum of 4 digits!'],
            validate: {
                validator: value => {
                    const regex = /^\d{3,4}$/gm;
						const isItValidRegex = AccountValidator.regexValidator(regex, value);

						return isItValidRegex;
                },
                message: 'The {PATH} {VALUE} is invalid!'
            }
        }
    },
    { versionKey: false }
);
const accounts = mongoose.model('accounts', accountsSchema);

export default accounts;
