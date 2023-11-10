const knex = require('../../database/connection');

const moneyOperations = require('../../utils/moneyOperations/math')
const convertMonetaryValue = require('../../utils/moneyOperations/convertMonetaryValue');


class OrderStatusTypeModel{
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
        const status = 1;	

        try{

            const result = await knex.insert({
                matriculation,
                devedor_txid,	
                devedor_loc,
                devedor_cpf,
                devedor_location,	
                devedor_valor,	
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
    // async updated(id_order_status_type,name,description){
    //     try{

    //         const result = await knex.update({name,description})
    //                 .where({id_order_status_type})
    //                 .table("ru_purchase_order");
            
    //         return {err: false , return: result};  
            
    //     }catch(err){

    //         return {err: true, return: err}
    //     }
    // }
    // async listAll(){
    //     try{

    //         let result = await knex.select().table("ru_purchase_order");
        

    //         if(!result.err){
    //                 return {err: false, return: result};  
    //             }else{
    //                 return {err: true, return: []};  
    //             }
    //     }catch(err){
    //         return {err: true, return: err}
    //     }
    // }
    // async listById(id_order_status_type){
    //     console.log(id_order_status_type)
    //     try{

    //         let result = await knex.select().where({id_order_status_type}).table("ru_purchase_order");
        

    //         if(!result.err){
    //                 return {err: false, return: result};  
    //             }else{
    //                 return {err: true, return: []};  
    //             }
    //     }catch(err){
    //         return {err: true, return: err}
    //     }
    // }
}
module.exports = new OrderStatusTypeModel();