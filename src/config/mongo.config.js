import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://matheusgpestudos:GTVSyCc0BKmrxPSp@bitbank.q6abo5p.mongodb.net/BitBank');

const mongo = mongoose.connection;

export default mongo;
