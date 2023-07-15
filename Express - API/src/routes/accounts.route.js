import express from 'express';
import AccountsController from '../controllers/accounts.controller.js';

const router = express.Router();

router
    .get('/accounts', AccountsController.listAccounts)
    .post('/account', AccountsController.createAccount)
    
export default router;
