const OrderStatusTypeModel = require('../models/OrderStatusTypeModel');

const moneyOperations = require('../utils/moneyOperations/math')
const convertMonetaryValue = require('../utils/moneyOperations/convertMonetaryValue');
// const { v4: uuidv4 } = require('uuid');
// uuidv4();

const yup = require('yup');

class OrderStatusTypeController{
    async created(req,res){

        const data = req.body;
        const {name, description} = data;

        const schema = yup.object({
            name: 
                yup.string()
                .required(), 
            description: 
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
            
            const newData = await OrderStatusTypeModel.created(name,description);
            
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
                    msg:'Erro no update dos dados - ru_order_status_type',
                });
            }

        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro no update dos dados - ru_order_status_type',
                msgErr: err
            });
        }
          
    }
    async updated(req,res){

        const data = req.body;
        

        const schema = yup.object({
            id: 
                yup.number()
                .required(), 
            name: 
                yup.string()
                .required(), 
            description: 
                yup.string()
                .required(),
        });
        const {id, name, description} = data;
        console.log(id)

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
            
            const newData = await OrderStatusTypeModel.updated(id,name,description);
            
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
                    msg:'Erro no update dos dados - ru_order_status_type',
                });
            }

        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro no update dos dados - ru_order_status_type',
                msgErr: err
            });
        }
          
    }
    async listAll(req,res){

        
        try{
            const data = await OrderStatusTypeModel.listAll();
            
           
            if(!data.err){
                return res.status(200).json({
                    error: false,
                    msg:'Sucesso na listagem',
                    data: data.return
                });
            }else{
                return res.status(404).json({
                    error: true,
                    msg:'Erro na Listagem dos dados - ru_order_status_type',
                });
            }

        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro na Listagem dos dados - ru_order_status_type',
                msgErr: err
            });
        }
           
    }
    async listById(req,res){
        const {id} = req.params;

        
        try{
            const data = await OrderStatusTypeModel.listById(id);
            
           
            if(!data.err){
                return res.status(200).json({
                    error: false,
                    msg:'Sucesso na listagem',
                    data: data.return
                });
            }else{
                return res.status(404).json({
                    error: true,
                    msg:'Erro na Listagem dos dados - ru_order_status_type',
                });
            }

        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro na Listagem dos dados - ru_order_status_type',
                msgErr: err
            });
        }
           
    }
}
module.exports = new OrderStatusTypeController();
