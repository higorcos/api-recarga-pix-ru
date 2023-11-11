const knex = require('../../database/connection');

const moneyOperations = require('../../utils/moneyOperations/math')
const convertMonetaryValue = require('../../utils/moneyOperations/convertMonetaryValue');


class PurchaseOrderModel{
    async created(
        matriculation,
        devedor_txid,	
        devedor_loc,
        devedor_cpf,
        devedor_location,	
        devedor_valor,	
        devedor_data_criacao,	
        expiration,
        ){
        const type = 1;
        const status = 0;	

        try{
            let newFormatValue = convertMonetaryValue.numberToString(devedor_valor)
            if(newFormatValue.err){
                return {err: true , return: result};  
            }
            newFormatValue = newFormatValue.return 
            console.log(newFormatValue)
           

            const result = await knex.insert({
                matriculation,
                devedor_txid,	
                devedor_loc,
                devedor_cpf,
                devedor_location,	
                devedor_valor:newFormatValue,	
                devedor_data_criacao,	
                expiration,
                status,
                type
            }).table("ru_purchase_order");
            
            return {err: false , return: result};  
            
        }catch(err){

            return {err: true, return: err}
        }
    }
}
module.exports = new PurchaseOrderModel();