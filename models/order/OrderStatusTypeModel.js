const knex = require('../../database/connection');

const moneyOperations = require('../../utils/moneyOperations/math')
const convertMonetaryValue = require('../../utils/moneyOperations/convertMonetaryValue');


class OrderStatusTypeModel{
    async created(name,description){

        try{

            const result = await knex.insert({name,description}).table("ru_order_status_type");
            
            return {err: false , return: result};  
            
        }catch(err){

            return {err: true, return: err}
        }
    }
    async updated(id_order_status_type,name,description){
        try{

            const result = await knex.update({name,description})
                    .where({id_order_status_type})
                    .table("ru_order_status_type");
            
            return {err: false , return: result};  
            
        }catch(err){

            return {err: true, return: err}
        }
    }
    async listAll(){
        try{

            let result = await knex.select().table("ru_order_status_type");
        

            if(!result.err){
                    return {err: false, return: result};  
                }else{
                    return {err: true, return: []};  
                }
        }catch(err){
            return {err: true, return: err}
        }
    }
    async listById(id_order_status_type){
        console.log(id_order_status_type)
        try{

            let result = await knex.select().where({id_order_status_type}).table("ru_order_status_type");
        

            if(!result.err){
                    return {err: false, return: result};  
                }else{
                    return {err: true, return: []};  
                }
        }catch(err){
            return {err: true, return: err}
        }
    }
}
module.exports = new OrderStatusTypeModel();