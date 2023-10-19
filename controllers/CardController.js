const CardModel = require('../models/CardModel');
const UserModel = require('../models/UserModel');

const moneyOperations = require('../utils/moneyOperations/math')
const convertMonetaryValue = require('../utils/moneyOperations/convertMonetaryValue')

class CardController{
    async created(req,res){
        const {matriculation} = req.body;

        if(matriculation !== undefined){
           
            const validationUser = await UserModel.findById(matriculation);
           
            if(!validationUser.err){

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
    async show(req,res){
        const users = await CardModel.findAll();
      
        if(!users.err){
            return res.status(200).json({
                error: false,
                msg:'Sucesso, Lista de Usuário',
                data: users,
            });
        }else{
            return res.status(400).json({
                error: false,
                msg:'Erro, Lista de Usuário',
                data: req.body,
                msgErr:
                {sqlState: users.return.sqlState,
                sqlMessage: users.return.sqlMessage,}
            });
        }   
    }
    async addAndUpdate(req,res){
            const {matriculation, cod_ru,recharge_value} = req.body
           
        try{
            //buscar valor atual do cartão
            const currentCardValue = await CardModel.showValueCard(matriculation,cod_ru);
            console.log(currentCardValue)
            
            
            if(!currentCardValue.err){
                const newValueCard = currentCardValue.return
                const resultOfTheOperation = moneyOperations.sum(newValueCard, 1.25); //somar os valo atual com a recarga
                if(resultOfTheOperation.err){
                    return res.status(304).json({
                        error: false,
                        msg:'Erro na operação',
                        
                    });
                    
                }else{
  
                    const valueToSendToDB = convertMonetaryValue.numberToString(resultOfTheOperation.return);
                    
                    const resultUpdated = await CardModel.updatedValue(matriculation, cod_ru,valueToSendToDB.return);
                    console.log(resultUpdated)
                    if(!resultUpdated.err){
                        return res.status(200).json({
                            error: false,
                            msg:'Suceeso no updated',
                            
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
    async delete(req,res){
    }  
}
module.exports = new CardController();