import mongoose from 'mongoose';
import { AccountsValidator } from '../validators/index.validator.js';

const accountsSchema = mongoose.Schema(
   {
      id: {
         type: String
      },
      accountNumber: {
         type: String,
         trim: true,
         required: [true, 'The account number is required!'],
         minlength: [4, 'Account number must be at least 4 digits!'],
         maxlength: [11, 'Account number must be a maximum of 11 digits!'],
         validate: [
            {
               validator: async value => {
                  const isItUniqueField = await AccountsValidator.validateUniqueness('accountNumber', value, 'accounts');
                  return isItUniqueField;
               },
               message: 'Generated account number already exists!'
            },
            {
               validator: value => {
                  const regex = /^\d{4,11}[A-Za-z]?$/gm;
                  const isItValidRegex = AccountsValidator.regexValidator(regex, value);
                  
                  return isItValidRegex;
               },
               message: 'The account number {VALUE} is invalid!'
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
               const isItValidRegex = AccountsValidator.regexValidator(regex, value);
               
               return isItValidRegex;
            },
            message: 'The {PATH} {VALUE} is invalid!'
         }
      },
      card: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'cards',
      },
      balance: {
         type: mongoose.Decimal128,
         min: [0, 'Balance cannot be less than zero!'],
         default: 0,
         validate: {
            validator: value => {
               const regex = /^(\d{0,})[,.]?(\d{0,})$/gm;
               const isItValidRegex = AccountsValidator.regexValidator(regex, value);
               
               return isItValidRegex;
            }
         }
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
   const accounts = mongoose.model('accounts', accountsSchema);
   
   export default accounts;
   