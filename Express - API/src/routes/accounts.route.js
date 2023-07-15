import express from 'express';
import AccountsController from '../controllers/accounts.controller.js';

const router = express.Router();

router
    .get('/accounts', AccountsController.listAccounts)
    .post('/accounts', AccountsController.createAccount)
;

export default router;
