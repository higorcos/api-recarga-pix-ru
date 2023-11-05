const knex = require('../database/connection');

const moneyOperations = require('../utils/moneyOperations/math')
const convertMonetaryValue = require('../utils/moneyOperations/convertMonetaryValue');


class OrderTypeModel{
    async created(name, description, percentage_rate, flat_rate){
        try{

            const result = await knex.insert({name, description, percentage_rate, flat_rate}).table("ru_type_order");
            
            return {err: false , return: result};  
            
        }catch(err){

            return {err: true, return: err}
        }
    }
    async updated(id_type_order,name, description, percentage_rate, flat_rate){
        console.log(name, description, percentage_rate, flat_rate)
        console.log('qwqw')
        try{

            const result = await knex.update({name,description})
                    .where({id_type_order})
                    .table("ru_type_order");
            
            return {err: false , return: result};  
            
        }catch(err){

            return {err: true, return: err}
        }
    }
    async listAll(){
        try{

            let result = await knex.select().table("ru_type_order");

            result.forEach(element => {
                    const resultConvertValue = convertMonetaryValue.stringToNumber(element["flat_rate"]);
                    element["flat_rate_new_form"] = resultConvertValue.return;
            });
        

            if(!result.err){
                    return {err: false, return: result};  
                }else{
                    return {err: true, return: []};  
                }
        }catch(err){
            return {err: true, return: err}
        }
    }
    async listById(id_type_order){
        try{

            let result = await knex.select().where({id_type_order}).table("ru_type_order");

            const resultConvertValue = convertMonetaryValue.stringToNumber(result[0]["flat_rate"]);
            result[0]["flat_rate_new_form"] = resultConvertValue.return;
        

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
module.exports = new OrderTypeModel();