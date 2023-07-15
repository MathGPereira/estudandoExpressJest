import { accounts } from "../models/index.model.js";

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

         res.status(200).json({accountsList});
      }catch(error) {
         next(error);
      }
   }

   static async createAccount(req, res, next) {
      try {
         const account = new accounts(req.body);

         await account.save();
         res.status(201).json({ message: 'Successfully account registered!' });
      } catch (error) {
         next(error);
      }
   }
}

export default AccountsController;
