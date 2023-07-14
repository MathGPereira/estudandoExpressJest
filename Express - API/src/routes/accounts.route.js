import express from 'express';
import AccountsController from '../controllers/accounts.controller.js';

const router = express.Router();

router
    .get('/accounts', AccountsController.listAccounts)

export default router;
