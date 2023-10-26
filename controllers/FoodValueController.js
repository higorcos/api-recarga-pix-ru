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
        const id = req.params.id
        const data = req.body;
        const {name, description, value} = data;

        const schema = yup.object({
            name: 
                yup.string()
                .required(), 
            description: 
                yup.string()
                .required(),
            value: 
                yup.string()
                .required()
                .test("success", "Erro, o parâmetro '${path}' está fora do formato. Exemplo:'${path}': '1.123,00'. O valor deve ser uma string e casa decimal deve ser separado por vírgula", (value) =>{

                    const regex = /,\d{2}$/;
                    const resultString = regex.test(value);
                    console.log(resultString)
                    if(resultString){
                        return true;
                    }else{
                        return false;
                    }
                })
        });

        try{
            await schema.validate(data)
          
        }catch(err){
            console.log(err)
            return res.status(400).json({
                error: true,
                msg:'Erro no envio dos parâmetros',
                dataError: err.errors
                
            });
        }

        try{
            const newDataFood = await FoodValueModel.updated(id,name,description,value);
            
                console.log(newDataFood)
            if(!newDataFood.err){
                return res.status(200).json({
                    error: false,
                    msg:'Sucesso no update',
                    data: {id,...data}
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