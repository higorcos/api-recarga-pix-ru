const FoodValueModel = require('../models/FoodValueModel');

const moneyOperations = require('../utils/moneyOperations/math')
const convertMonetaryValue = require('../utils/moneyOperations/convertMonetaryValue');

const yup = require('yup');

class FoodValueController{
    async showData(req,res){


        try{
            const dataFood = await FoodValueModel.showData();
            console.log(dataFood)
           
            if(!dataFood.err){
                return res.status(200).json({
                    error: false,
                    msg:'Sucesso na listagem',
                    data: dataFood.return
                });
            }else{
                return res.status(404).json({
                    error: true,
                    msg:'Erro na Listagem dos dados - ru_food_ru',
                });
            }

        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro na Listagem dos dados - ru_food_ru',
                msgErr: err
            });
        }
           
    }
    async updated(req,res){

        try{
            const newDataFood = await FoodValueModel.updated('1','Comida 00','-0','12,00');
            
                console.log(newDataFood)
            if(!newDataFood.err){
                return res.status(200).json({
                    error: false,
                    msg:'Sucesso no update',
                    // data: newDataFood.return
                });
            }else{
                return res.status(404).json({
                    error: true,
                    msg:'Erro no update dos dados - ru_food_ru',
                });
            }

        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro no update dos dados - ru_food_ru',
                msgErr: err
            });
        }
          
    }
}
module.exports = new FoodValueController();