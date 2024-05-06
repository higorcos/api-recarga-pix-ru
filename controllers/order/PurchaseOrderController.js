const PurchaseOrderModel = require('../../models/order/PurchaseOrderModel');
const UserModel = require('../../models/UserModel');
const {createBilling,searchQRcode} = require('../../apis/apiPix/featuresApiPix')



const moneyOperations = require('../../utils/moneyOperations/math')
const convertMonetaryValue = require('../../utils/moneyOperations/convertMonetaryValue');
const yup = require('yup'); 

class PurchaseOrderController{
    async created(req,res){
        //Verificar se tem Pedidos em aberto

        const data = req.body;
        let dataResponse = {}
       

        const schema = yup.object({
            matriculation: 
                yup.string()
                .required(), 
            recharge_value:
                yup.string()
                .required()
                .test("success", "Erro, o parâmetro '${path}' está fora do formato. Exemplo:'${path}': '1123.00'. O valor deve ser uma string e casa decimal deve ser separado por ponto", (value) =>{
                
                    const regex = /^[0-9]{1,10}\.[0-9]{2}$/;
                    const resultString = regex.test(value);
                  
                    if(resultString){
                        return true;
                    }else{
                        return false;
                    }
            })
        });

        
        //@@Validação
        try{
            await schema.validate(data)        
        }catch(err){
            return res.status(400).json({
                error: true,
                msg:'Erro no envio dos parâmetros',
                dataError: err.errors
            });
        }

        const {matriculation, recharge_value} = data;
        //@@buscar nome e cpf
        

        try{
            const newData = await UserModel.findById(matriculation);

            if(newData.err){
                return res.status(404).json({
                    error: true,
                    msg:'Erro, Na verificação do usuário',
                    err: newData
                });
            }
            dataResponse = {
                'user': { 'nome': newData.return[0].name, 
                'cpf': newData.return[0].cpf
            }}


        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro, Acesso a API PIX',
                msgErr: err
            });
        }
        
        //@@ Acessar Api PIX e criar cobrança
        try{

            const nome = dataResponse.user.nome;
            const cpf = dataResponse.user.cpf;
            

            const newData = await createBilling({nome,cpf, valor: recharge_value})
            
            if(newData.error){
                return res.status(404).json({
                    error: true,
                    msg:'Erro, Criação de Cobrança API PIX',
                    err: newData
                });
            }
            dataResponse = {...dataResponse, dataBilling:newData.data}

        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro, Acesso a API PIX',
                msgErr: err
            });
        }

        //@@Salvar Ordem de compra 
        try{
           
            const newData = await PurchaseOrderModel.created(
                matriculation,
                dataResponse.dataBilling.devedor_txid,	
                dataResponse.dataBilling.devedor_loc,
                dataResponse.dataBilling.devedor_cpf,
                dataResponse.dataBilling.devedor_location,	
                dataResponse.dataBilling.devedor_valor,	
                dataResponse.dataBilling.pagamento_cod_pix,
                dataResponse.dataBilling.devedor_data_criacao,	
                dataResponse.dataBilling.expiration

            );
          
            if(newData.err){
                return res.status(404).json({
                    error: true,
                    msg:'Erro, insert cobrança no bando de dados',
                    err: newData.return
                });
            }
        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro, sql insert cobrança no bando de dados',
                msgErr: err
            });
        }
          
        return res.json({
            error: false,
            msg:'Sucesso',
            data:dataResponse
        })      
    }
    async findQRcodeById(req,res){

        const {matriculation, txid} = req.params;
        
        try{

            const resultFindById = await PurchaseOrderModel.findById(matriculation,txid);
            if(!resultFindById.err){
                if(resultFindById.return.length !== 0){

                    const loc = resultFindById.return[0]["devedor_loc"]
                    const statusDB = resultFindById.return[0]["devedor_loc"]
                    const resultSearchQRcode = await searchQRcode(loc);
                    

                    return res.status(200).json({
                        error: false,
                        msg:'Sucesso, listagem das cobranças',
                        data: {...resultFindById.return[0],...resultSearchQRcode.data}
                    });

                }else{
                    throw new Error("Nenhum Resultado");
                }
            }else{
                throw new Error("Não foi encontrado o txid");
            }
            
        }catch(error){
            return res.status(404).json({
                error: true,
                msg:'Erro, listagem das cobranças',
                msgErr: error.message
            });
        }
                
    }
    async listAll(req,res){
        
        console.log("____")
        const {matriculation} = req.params;
        let dataResponse = {}

        //@@List
        try{
            
            const newData = await PurchaseOrderModel.listAllMatriculation(matriculation)
          
            if(!newData.err){
                return res.status(200).json({
                    error: false,
                    msg:'Sucesso, listagem das cobranças',
                    data: newData.return
                });
            }
        }catch(err){
            return res.status(404).json({
                error: true,
                msg:'Erro, listagem das cobranças',
                msgErr: err
            });
        }
          
    }
}
module.exports = new PurchaseOrderController();
