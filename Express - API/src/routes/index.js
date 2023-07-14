import express from 'express';
import clients from './clients.route.js';
import addresses from './addresses.route.js';
import accounts from './accounts.route.js';

const routes = app => {
	app.route('/').get((req, res) => {
		res.status(200).json({ message: 'Everything ins working!' })
;	});

	app.use(
		express.json(),
		clients,
		addresses,
		accounts
	);
};

export default routes;
