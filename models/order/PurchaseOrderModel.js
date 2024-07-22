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
        pagamento_cod_pix,
        devedor_data_criacao,	
        expiration
        ){
        const type = 1;
        const status = 0;	

        try{
            let newFormatValue = convertMonetaryValue.numberToString(devedor_valor)
            console.log(newFormatValue)
            if(newFormatValue.err){
                return {err: true , return: result};  
            }
            newFormatValue = newFormatValue.return 
           

            const result = await knex.insert({
                matriculation,
                devedor_txid,	
                devedor_loc,
                devedor_cpf,
                devedor_location,	
                devedor_valor:newFormatValue,
                pagamento_cod_pix,	
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
    async findById(matriculation, devedor_txid){
     
        try{
            const result = await knex.select('*').where({matriculation, devedor_txid }).table("ru_purchase_order").innerJoin('ru_order_status_type', { 'status': 'id_order_status_type' });
            
            return {err: false , return: result};  
            
        }catch(err){

            return {err: true, return: err}
        }
    }
    async listAllMatriculation(matriculation){
     
        try{
            const result = await knex
            .select('*')
            .where({ matriculation })
            .table("ru_purchase_order")
            .innerJoin('ru_order_status_type', { 'status': 'id_order_status_type' })
            .orderBy('ru_purchase_order.created_on', 'desc'); 
            
            return {err: false , return: result};  
            
        }catch(err){

            return {err: true, return: err}
        }
    }

}
module.exports = new PurchaseOrderModel();