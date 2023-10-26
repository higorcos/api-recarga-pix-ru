const knex = require('../database/connection');
const numberCardRU = require('../utils/numberCardRU')
const UserModel = require('./UserModel')


const moneyOperations = require('../utils/moneyOperations/math')
const convertMonetaryValue = require('../utils/moneyOperations/convertMonetaryValue');


class CardModel{

    async updatedValue(matriculation,cod_ru,newValue){
        try{
                await knex.update({value:newValue}).where({matriculation,cod_ru}).table("ru_food_card");
                
                return {err: false, return: []};  
            
            }catch(err){
                return {err: true, return: err};
            }
    }
    async showValueCard(matriculation,cod_ru){

        try{
            const currentCardValue = await knex.select("value").where({matriculation,cod_ru}).table("ru_food_card");
            
            if(currentCardValue.length == 0 ){
                return {err: true, return: [], msg:"Não encontrado"};  
            }
            
            
            //Converter para forma adequada para trabalhar com dinheiro
            const newFormatValueCard = convertMonetaryValue.stringToNumber(currentCardValue[0].value);

            if(!newFormatValueCard.err){
                    return {err: false, return: newFormatValueCard.return};  

                }else{
                    return {err: true, return: []};  
                }

        }catch{
            return {err: true, return: err};  

        }
    }
    async showDataCard(matriculation,cod_ru){

        try{
            const dataCard = await knex.select().where({matriculation,cod_ru}).table("ru_food_card");
            if(dataCard.length == 0 ){
                return {err: true, return: [], msg:"Não encontrado"};  
            }

            if(!dataCard.err){
                    return {err: false, return: dataCard[0]};  

                }else{
                    return {err: true, return: []};  
                }

        }catch{
            return {err: true, return: err};  

        }
    }
}
module.exports = new CardModel();