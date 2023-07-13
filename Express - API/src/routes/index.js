import express from 'express';
import clients from './clients.route.js';
import addresses from './addresses.route.js';

const routes = app => {
	app.route('/').get((req, res) => {
		res.status(200).json({ message: 'Everything ins working!' })
;	});

	app.use(
		express.json(),
		clients,
		addresses
	);
};

export default routes;
