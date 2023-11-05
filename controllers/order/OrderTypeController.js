const OrderTypeModel = require('../../models/order/OrderTypeModel');

const yup = require('yup');

const moneyOperations = require('../../utils/moneyOperations/math')
const convertMonetaryValue = require('../../utils/moneyOperations/convertMonetaryValue');



class OrderStatusTypeController{
    async created(req,res){

        const data = req.body;
       

        const schema = yup.object({
            name: 
                yup.string()
                .required(), 
            description: 
                yup.string()
                .required(),
            percentage_rate:
                yup.string()
                .required()
                .test("success", "Erro, o parâmetro '${path}' está fora do formato. Exemplo:'${path}': '1.123,00'. O valor deve ser uma string e casa decimal deve ser separado por vírgula", (value) =>{

                    const regex = /,\d{2}$/;
                    const resultString = regex.test(value);
                    // console.log(resultString)
                    if(resultString){
                        return true;
                    }else{
                        return false;
                    }
                }),
            flat_rate:
                yup.string()
                .required()
                .test("success", "Erro, o parâmetro '${path}' está fora do formato. Exemplo:'${path}': '1.123,00'. O valor deve ser uma string e casa decimal deve ser separado por vírgula", (value) =>{

                    const regex = /,\d{2}$/;
                    const resultString = regex.test(value);
                    // console.log(resultString)
                    if(resultString){
                        return true;
                    }else{
                        return false;
                    }
                })
        });

        const {name, description, percentage_rate, flat_rate} = data;

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
            const new_percentage_rate = convertMonetaryValue.stringToNumber(percentage_rate);

            const newData = await OrderTypeModel.created(name, description, new_percentage_rate.return, flat_rate);
            
                // console.log(newData)
            if(!newData.err){
                return res.status(200).json({
                    error: false,
                    msg:'Sucesso no update',
                    data
                });
            }else{
                return res.status(404).json({
                    error: true,
                    msg:'Erro no update dos dados - ru_order_type',
                });
            }

        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro no update dos dados - ru_order_type',
                msgErr: err
            });
        }
          
    }
    async updated(req,res){
        const {id} = req.params;

        const data = req.body;
        

        const schema = yup.object({
            name: 
                yup.string()
                .required(), 
            description: 
                yup.string()
                .required(),
            percentage_rate:
                yup.string()
                .required()
                .test("success", "Erro, o parâmetro '${path}' está fora do formato. Exemplo:'${path}': '1.123,00'. O valor deve ser uma string e casa decimal deve ser separado por vírgula", (value) =>{

                    const regex = /,\d{2}$/;
                    const resultString = regex.test(value);
                    // console.log(resultString)
                    if(resultString){
                        return true;
                    }else{
                        return false;
                    }
                }),
            flat_rate:
                yup.string()
                .required()
                .test("success", "Erro, o parâmetro '${path}' está fora do formato. Exemplo:'${path}': '1.123,00'. O valor deve ser uma string e casa decimal deve ser separado por vírgula", (value) =>{

                    const regex = /,\d{2}$/;
                    const resultString = regex.test(value);
                    // console.log(resultString)
                    if(resultString){
                        return true;
                    }else{
                        return false;
                    }
                })
        });
        const {name, description,percentage_rate,flat_rate} = data;
       

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
            
            const newData = await OrderTypeModel.updated(id,name,description,percentage_rate,flat_rate);
            
                console.log(newData)
            if(!newData.err){
                return res.status(200).json({
                    error: false,
                    msg:'Sucesso no update',
                    data
                });
            }else{
                return res.status(404).json({
                    error: true,
                    msg:'Erro no update dos dados - ru_order_type',
                });
            }

        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro no update dos dados - ru_order_type',
                msgErr: err
            });
        }
          
    }
    async listAll(req,res){

        
        try{
            const data = await OrderTypeModel.listAll();
            
           
            if(!data.err){
                return res.status(200).json({
                    error: false,
                    msg:'Sucesso na listagem',
                    data: data.return
                });
            }else{
                return res.status(404).json({
                    error: true,
                    msg:'Erro na Listagem dos dados - ru_order_type',
                });
            }

        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro na Listagem dos dados - ru_order_type',
                msgErr: err
            });
        }
           
    }
    async listById(req,res){
        const {id} = req.params;

        
        try{
            const data = await OrderTypeModel.listById(id);
            
           
            if(!data.err){
                return res.status(200).json({
                    error: false,
                    msg:'Sucesso na listagem',
                    data: data.return
                });
            }else{
                return res.status(404).json({
                    error: true,
                    msg:'Erro na Listagem dos dados - ru_order_type',
                });
            }

        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro na Listagem dos dados - ru_order_type',
                msgErr: err
            });
        }
           
    }
}
module.exports = new OrderStatusTypeController();
