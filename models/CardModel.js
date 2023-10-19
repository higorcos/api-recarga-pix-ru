const knex = require('../database/connection');
const numberCardRU = require('../utils/numberCardRU')
const UserModel = require('./UserModel')


const moneyOperations = require('../utils/moneyOperations/math')
const convertMonetaryValue = require('../utils/moneyOperations/convertMonetaryValue');
const { cloudfunctions } = require('googleapis/build/src/apis/cloudfunctions');

class CardModel{

    async insert(matriculation){
        try{
            const verifyUser = await UserModel.verify(matriculation);
            const cod_ru = numberCardRU.new();

            await knex.insert({matriculation, cod_ru}).table("ru_food_card");
            return {err: false, return: {cod_ru}}

        }catch(err){
            // console.log("\n\n\n - Error: \n",err,"\n\n\n")
            return {err: true, return: err}
        }
    }
    async selectById(email){
        try{
            const resultSelect = await knex.select("*").from('users').where({email});

            if(resultSelect.length > 0){
                return true; //Já existe
            }else{
                return false;
            }
        }catch(err){
            console.log("\n\n\n - Error: \n",err,"\n\n\n");
            return false;
        }
    }
      //#Vai sair
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
    async showCard(matriculation,cod_ru){

        try{
            const currentCardValue = await knex.select("value").where({matriculation,cod_ru}).table("ru_food_card");
            
            //Converter para forma adequada para trabalhar com dinheiro
            if(currentCardValue.length == 0 ){
                return {err: true, return: [], msg:"Não encontrado"};  
             }
             
            
            const newFormatValueCard = convertMonetaryValue.stringToNumber(currentCardValue[0].value);
            if(!newFormatValueCard.err){
               

               const newValueCard = newFormatValueCard.return
               const resultOfTheOperation = moneyOperations.sub(newValueCard, 1.25);
                
   
               console.log('Resultado da sub:', resultOfTheOperation);
                if(!resultOfTheOperation.err){
                    const valueToSendToDB = convertMonetaryValue.numberToString(resultOfTheOperation.return);
                    console.log(valueToSendToDB)
                    return {err: false, return: valueToSendToDB.return};  

                }else{
                    return {err: true, return: []};  
                }

           }else{
                return {err: true, return: []};  
           } 

        }catch{
            return {err: true, return: err};  

        }
    }
    
    async delete(user){

    //verificar se usuário existe 

    const checkingExistsUser = await this.findById(user.id);
    if(!checkingExistsUser.err){


            if(user.card == undefined){
                return {err: true, return: {msg: 'Não informado'}};
            }else{

            try{
                
                const resultUpdate = await knex.where({matriculation:user.id}).update({cod_ru:user.card}).table('users');
                return {err: false, return: resultUpdate};

            }catch(err){
                return {err: true, return: err};
            }
        }
    }else{
        return  {err:true, return:[], msgErr:'Usuário não existe' }
    }
    }
}
module.exports = new CardModel();