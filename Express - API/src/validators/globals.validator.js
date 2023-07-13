import mongoose from 'mongoose';

mongoose.Schema.Types.String.set('validate', {
	validate: value => value !== '',
	message: ({ path }) => `The field ${path} was provided blank!`
});
