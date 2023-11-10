const PurchaseOrderModel = require('../../models/order/PurchaseOrderModel');

const yup = require('yup');

const moneyOperations = require('../../utils/moneyOperations/math')
const convertMonetaryValue = require('../../utils/moneyOperations/convertMonetaryValue');

// const { v4: uuidv4 } = require('uuid');
// uuidv4();

class PurchaseOrderController{
    async created(req,res){

        const data = req.body;
       

        const schema = yup.object({
            matriculation: 
                yup.string()
                .required(), 
            recharge_value:
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
        });

        const {matriculation, recharge_value} = data;

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

            //Nome e CPF trazer do DB

            const reqAPI = {
                calendario: {
                    expiracao: 3600 //tempo de expiração em segundos 3600 = 60 minutos
                },
                devedor: {
                    cpf: "12345678909",
                    nome: "Fulano de Tal" 
                },
                valor: {
                    original: "0.05"//Valor Cobrança
                },
                chave: "00000000-0000-0000-0000-000000000000",//chave efi
                solicitacaoPagador: "Cobrança dos serviços prestados." //msg
            }

            //RES_API
            // const new_percentage_rate = convertMonetaryValue.stringToNumber(percentage_rate);
            const devedor_txid = "34y4874g8yg4y8864g8yg4984yg479y8";
            const devedor_loc = 654;
            const devedor_cpf = "12345678909"; //Adicionar do form ou trazer de um select no user        
            //CPF e NOME DO USUÁRIO                                                                                                                       
            const devedor_location = "https://chat.com";	
            const devedor_valor = "20,01";	
            const devedor_data_criacao = "2023-11-03 16:51:25.057";	

            const expiration = "2023-11-03 16:51:25.057"; // pegar os milesegundos e somar com data de criação para pegar data no futuro  

            //O valor vem pelo form mas vai 

            const newData = await PurchaseOrderModel.created(
                matriculation,
                devedor_txid,	
                devedor_loc,
                devedor_cpf,
                devedor_location,	
                devedor_valor,	
                devedor_data_criacao,	
                expiration);
            
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
    // async updated(req,res){
    //     const {id} = req.params;

    //     const data = req.body;
        

    //     const schema = yup.object({
    //         name: 
    //             yup.string()
    //             .required(), 
    //         description: 
    //             yup.string()
    //             .required(),
    //         percentage_rate:
    //             yup.string()
    //             .required()
    //             .test("success", "Erro, o parâmetro '${path}' está fora do formato. Exemplo:'${path}': '1.123,00'. O valor deve ser uma string e casa decimal deve ser separado por vírgula", (value) =>{

    //                 const regex = /,\d{2}$/;
    //                 const resultString = regex.test(value);
    //                 // console.log(resultString)
    //                 if(resultString){
    //                     return true;
    //                 }else{
    //                     return false;
    //                 }
    //             }),
    //         flat_rate:
    //             yup.string()
    //             .required()
    //             .test("success", "Erro, o parâmetro '${path}' está fora do formato. Exemplo:'${path}': '1.123,00'. O valor deve ser uma string e casa decimal deve ser separado por vírgula", (value) =>{

    //                 const regex = /,\d{2}$/;
    //                 const resultString = regex.test(value);
    //                 // console.log(resultString)
    //                 if(resultString){
    //                     return true;
    //                 }else{
    //                     return false;
    //                 }
    //             })
    //     });
    //     const {name, description,percentage_rate,flat_rate} = data;
       

    //     try{
    //         await schema.validate(data)
          
    //     }catch(err){
    //         console.log(err)
    //         return res.status(400).json({
    //             error: true,
    //             msg:'Erro no envio dos parâmetros',
    //             dataError: err.errors
                
    //         });
    //     }

    //     try{
            
    //         const newData = await PurchaseOrderModel.updated(id,name,description,percentage_rate,flat_rate);
            
    //             console.log(newData)
    //         if(!newData.err){
    //             return res.status(200).json({
    //                 error: false,
    //                 msg:'Sucesso no update',
    //                 data
    //             });
    //         }else{
    //             return res.status(404).json({
    //                 error: true,
    //                 msg:'Erro no update dos dados - ru_order_type',
    //             });
    //         }

    //     }catch(err){
    //         return res.status(404).json({
    //             error: true,
    //             msg:'Erro no update dos dados - ru_order_type',
    //             msgErr: err
    //         });
    //     }
          
    // }
    // async listAll(req,res){

        
    //     try{
    //         const data = await PurchaseOrderModel.listAll();
            
           
    //         if(!data.err){
    //             return res.status(200).json({
    //                 error: false,
    //                 msg:'Sucesso na listagem',
    //                 data: data.return
    //             });
    //         }else{
    //             return res.status(404).json({
    //                 error: true,
    //                 msg:'Erro na Listagem dos dados - ru_order_type',
    //             });
    //         }

    //     }catch(err){
    //         return res.status(404).json({
    //             error: true,
    //             msg:'Erro na Listagem dos dados - ru_order_type',
    //             msgErr: err
    //         });
    //     }
           
    // }
    // async listById(req,res){
    //     const {id} = req.params;

        
    //     try{
    //         const data = await PurchaseOrderModel.listById(id);
            
           
    //         if(!data.err){
    //             return res.status(200).json({
    //                 error: false,
    //                 msg:'Sucesso na listagem',
    //                 data: data.return
    //             });
    //         }else{
    //             return res.status(404).json({
    //                 error: true,
    //                 msg:'Erro na Listagem dos dados - ru_order_type',
    //             });
    //         }

    //     }catch(err){
    //         return res.status(404).json({
    //             error: true,
    //             msg:'Erro na Listagem dos dados - ru_order_type',
    //             msgErr: err
    //         });
    //     }
           
    // }
}
module.exports = new PurchaseOrderController();
