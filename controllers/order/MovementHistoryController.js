const MovementHistoryModel = require('../../models/order/MovementHistoryModel');
const UserModel = require('../../models/UserModel');
const {createBilling} = require('../../apis/apiPix/featuresApiPix')



const moneyOperations = require('../../utils/moneyOperations/math')
const convertMonetaryValue = require('../../utils/moneyOperations/convertMonetaryValue');


class MovementHistoryController{
    async recharge(req,res){
        const {txid} =  req.params
        console.log('aa')
        try{
            const newData = await MovementHistoryModel.transactionRecharge(txid);
            return res.json({res:newData,"PAGAMENTO REALIZADO":""}) 

        }catch(err){
            return res.status(400).json({
                error: true,
                msg:'Error transaction',
                dataError: err.errors
            });
        }

    }
}
module.exports = new MovementHistoryController();
