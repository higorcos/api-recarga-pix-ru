const MovementHistoryModel = require('../../models/order/MovementHistoryModel');
const UserModel = require('../../models/UserModel');
const {createBilling} = require('../../apis/apiPix/featuresApiPix')



const moneyOperations = require('../../utils/moneyOperations/math')
const convertMonetaryValue = require('../../utils/moneyOperations/convertMonetaryValue');


class MovementHistoryController{
    async recharge(req,res){
        const txid =  'b4031342699d475094a760e902ea03ef'
        try{
            const newData = await MovementHistoryModel.transactionRecharge(txid);
            return res.json({res:newData,'1':'1'}) 

        }catch(err){
            return res.status(400).json({
                error: true,
                msg:'Erro no envio dos parâmetros',
                dataError: err.errors
            });
        }

    }
}
module.exports = new MovementHistoryController();
