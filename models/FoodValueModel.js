const knex = require('../database/connection');

const moneyOperations = require('../utils/moneyOperations/math')
const convertMonetaryValue = require('../utils/moneyOperations/convertMonetaryValue');


class FoodValueModel{

    async checkValue(){
        try{

            const result = await knex.select('value').table("ru_food_value");
            
             //Converter para forma adequada para trabalhar com dinheiro
             const newFormatValue = convertMonetaryValue.stringToNumber(result[0].value);

            if(!newFormatValue.err){
                    return {err: false, return: newFormatValue.return};  

                }else{
                    return {err: true, return: []};  
                }
        }catch(err){
            return {err: true, return: err}
        }
    }
    async updated(id,name,description,value){
        try{
            
            const result = await knex.update({name,description,value}).where({id}).table("ru_food_value");
            
            return {err: false , return: result};  
            
        }catch(err){

            return {err: true, return: err}
        }
    }
    async showData(){
        try{

            let result = await knex.select().table("ru_food_value");
        
            const resultConvertValue = convertMonetaryValue.stringToNumber(result[0]["value"]);
            result[0]["value"] = resultConvertValue.return

            if(!result.err){
                    return {err: false, return: result[0]};  
                }else{
                    return {err: true, return: []};  
                }
        }catch(err){
            return {err: true, return: err}
        }
    }
    
}
module.exports = new FoodValueModel();