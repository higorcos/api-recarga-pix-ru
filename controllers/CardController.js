const CardModel = require('../models/CardModel');
const UserModel = require('../models/UserModel');
const FoodValueModel = require('../models/FoodValueModel');

const moneyOperations = require('../utils/moneyOperations/math')
const convertMonetaryValue = require('../utils/moneyOperations/convertMonetaryValue');

const yup = require('yup');

class CardController{
    async created(req,res){
        const {matriculation} = req.body;

        if(matriculation !== undefined){
           
            const validationUser = await UserModel.findById(matriculation);
           
            if(!validationUser.err){
                //Erro AQUI
                const resultInsert = await CardModel.insert(matriculation);
                
                
                if(!resultInsert.err){
                    return res.status(200).json({
                        error: false,
                        msg:'Cartão criado com sucesso',
                        data: req.body, 
                    });
                }else{
                    return res.status(400).json({
                        error: true,
                        msg:'Erro na criação do cartão',
                        data: req.body,
                        msgErr:
                        {sqlState: resultInsert.return.sqlState,
                        sqlMessage: resultInsert.return.sqlMessage,}
                    });
                }
            }else{
                return res.status(409).json({
                    error: true,
                    msg:'Erro na criação do card\n Matricula não encontrada, Conflict',
                    data: {matriculation}
                });
            }
                
          

        }else{
            return res.status(422).json({
                error: true,
                msg:'Validation Failed',
                field : ["matriculation"]
                
            });
        }
    }
    //@@@ Validar pagamento
    async addAndUpdate(req,res){
            const data = req.body;
            const {matriculation, cod_ru,recharge_value} = data

            const schema = yup.object({
                matriculation: 
                    yup.string()
                    .required(), 
                cod_ru: 
                    yup.string()
                    .required(),
                recharge_value: 
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
            //converter valor
            const newFormatRecharge_value = convertMonetaryValue.stringToNumber(recharge_value)
            
            console.log(newFormatRecharge_value)
        try{

            //buscar valor atual do cartão
            const currentCardValue = await CardModel.showValueCard(matriculation,cod_ru);
 

            
            console.log(currentCardValue ,'EEE')
            if(!currentCardValue.err){
                

                const resultOfTheOperation = moneyOperations.sum(currentCardValue.return, newFormatRecharge_value.return); //somar os valo atual com a recarga

                if(resultOfTheOperation.err){
                    return res.status(404).json({
                        error: true,
                        msg:'Erro na operação',
                        msgErr:resultOfTheOperation
                    });
                    
                }else{
  
                    const valueToSendToDB = convertMonetaryValue.numberToString(resultOfTheOperation.return);
                    
                    const resultUpdated = await CardModel.updatedValue(matriculation, cod_ru,valueToSendToDB.return);
                    // console.log(resultUpdated)
                    if(!resultUpdated.err){
                        return res.status(200).json({
                            error: false,
                            msg:'Suceeso no updated',
                            data: {newValue:valueToSendToDB.return}
                        });
                    }else{
                        return res.status(404).json({
                            error: true,
                            msg:'Erro no updateValue, valor não encontrado',
                            
                        });
                    }
                }
            }else{
                return res.status(404).json({
                    error: true,
                    msg:'Erro no updateValue',
                    
                });
            }

           
        }catch{
            return res.status(400).json({
                error: true,
                msg:'Erro, updateValue',
                
            });
        }
        
           
           
                
    }
    async subtractAndUpdate(req,res){
        const data = req.body;
        const {matriculation, cod_ru} = data

        const schema = yup.object({
            matriculation: 
                yup.string()
                .required(), 
            cod_ru: 
                yup.string()
                .required(),
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

        //buscar valor atual do cartão
        const currentCardValue = await CardModel.showValueCard(matriculation,cod_ru);
        // console.log(currentCardValue,'Valor  Card atual')    


        const currentFoodValue = await FoodValueModel.checkValue(); 
        // console.log(currentFoodValue,'Valor  Comida atual')    

        
        if(!currentCardValue.err){
            

            if(currentFoodValue.err){
                return res.status(404).json({
                    error: true,
                    msg:'Erro na leitura do valor comida',                        
                });
            }
            const resultOfTheOperation = moneyOperations.sub(currentCardValue.return, currentFoodValue.return); //subtrair os valo atual da refeição com o valor da carteira

            if(resultOfTheOperation.err){
                return res.status(404).json({
                    error: true,
                    msg:'Erro na operação',
                    msgErr:resultOfTheOperation
                });
                
            }else{

                const valueToSendToDB = convertMonetaryValue.numberToString(resultOfTheOperation.return);
                
                const resultUpdated = await CardModel.updatedValue(matriculation, cod_ru,valueToSendToDB.return);
                // console.log(resultUpdated)
                if(!resultUpdated.err){
                    return res.status(200).json({
                        error: false,
                        msg:'Suceeso no updated',
                        data: {newValue:valueToSendToDB.return}
                    });
                }else{
                    return res.status(404).json({
                        error: true,
                        msg:'Erro no updateValue, valor não encontrado',
                        
                    });
                }
            }
        }else{
            return res.status(404).json({
                error: true,
                msg:'Erro no updateValue, Valor do Cartão apresentou erro',
                
            });
        }

       
    }catch{
        return res.status(400).json({
            error: true,
            msg:'Erro, updateValue',
            
        });
    }
    
       
       
            
    }
    async show(req,res){
        const {cod_ru, matriculation} = req.body

        if(cod_ru !== undefined){
           
            const result = await CardModel.showDataCard(matriculation,cod_ru);
                
            
            if(!result.err){
                return res.status(200).json({
                    error: false,
                    msg:'Sucesso na listagem',
                    data: result.return, 
                });
            }else{
                return res.status(400).json({
                    error: true,
                    msg:'Erro na listagem',
                    data: req.body,
                    msgErr:
                    {sqlState: result.return.sqlState,
                    sqlMessage: result.return.sqlMessage,}
                });
            }
           
        }else{
            return res.status(422).json({
                error: true,
                msg:'Validation Failed',
                field : ["cod_ru" , "matricula"]
                
            });
        }
    }
}
module.exports = new CardController();