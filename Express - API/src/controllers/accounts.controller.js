import { accounts, clients } from "../models/index.model.js";
import ClientsController from "./clients.controller.js";

class AccountsController {
  
  static async listAccounts(req, res, next) {
    try {
      const accountsList = await accounts
        .find()
        .select(
            {
              _id: 0, id: 0,
              createdAt: 0, updatedAt: 0
            }
          )
        ;
        
        res.status(200).json(accountsList);
      }catch(error) {
        next(error);
      }
    }
    
  static async createAccount(req, res, next) {
    try {
      const account = new accounts(req.body);

      req.body = { account: account._id };
      
      await account.save();
      ClientsController.updateCustomer(req, res, next);

      res.status(201).json({ message: 'Successfully account registered!' });
    } catch (error) {
      next(error);
    }
  }

  static async updateAccount(req, res, next) {
    let client;
    let accountId;

    try {
      const { cpf, email } = req.headers;

      if(cpf) {
        client = await clients.findOne({ cpf: cpf });
      }else if(email) {
        client = await clients.findOne({ email: email });
      }

      accountId = client.account._id;
      req.body.updatedAt = new Date();

      await accounts.findByIdAndUpdate(accountId, req.body, { new: true });
      
      res.status(201).json({ message: 'Account updated successfully!' });
    }catch(error) {
      next(error);
    }
  }
}
  
export default AccountsController;
  