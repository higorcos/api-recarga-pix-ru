const {pixRequest} = require('../../apis/apiPix/credentials')

//Pegar Novo Token quando a aplicação for startada 
// const apiPixA = pixRequest();
const yup = require('yup')

class apiPixFeatures{

async createBilling(data){
    //data
        //Nome
        //CPF
        //Valor

    const schema = yup.object({
        nome: 
            yup.string()
            .required(), 
        cpf: 
            yup.string()
            .required(),
        valor: 
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
    
    try{
        await schema.validate(data)
    }catch(err){
        return {
            error: true,
            msg:'Erro no envio dos parâmetros (validação)',
            dataError: err.errors
        }
    }

    const apiPix = await pixRequest(); //Pegar Novo Token 
    // const apiPix = await apiPixA;

    const dataCob = {
        calendario: {
            expiracao: 3600
        },
        devedor: {
            cpf: data.cpf,
            nome: data.nome
        },
        valor: {
            original: data.valor
        },
        chave: "00000000-0000-0000-0000-000000000000", 
        solicitacaoPagador: "Recarga RU-UFMA"
    }
    
    try{
    
        const responseNewCob = await apiPix.post('/v2/cob',dataCob);
        const idLocCob = responseNewCob.data.loc.id; 
        const responseQRcode = await apiPix.get(`/v2/loc/${idLocCob}/qrcode`,dataCob);
        
        console.log('Nova cobrança');

        return {
            error: false, 
            msg: 'Sucesso',
            importantData: { 
                devedor_txid:responseNewCob['data']['txid'],
                devedor_cpf:responseNewCob['data']['devedor']['cpf'],
                devedor_nome:responseNewCob['data']['devedor']['nome'],
                devedor_loc:responseNewCob['data']['loc']['id'],
                devedor_location:responseNewCob['data']['loc']['location'],
                devedor_valor:responseNewCob['data']['valor']['original'],
                expiration:responseNewCob['data']['calendario']['expiracao'],
                devedor_data_criacao:responseNewCob['data']['calendario']['criacao'],
            },
             
            allData: {...responseNewCob.data,QRcode:responseQRcode.data.imagemQrcode}
        }
            
    }catch(err){
        return {
            error: false, 
            msgErro: `Erro na criação de nova cobrança`, 
            err:err}
    }
}
async listBilling (req,res){
    const apiPix = await pixRequest();
    try{
        
        const listCob = await apiPix.get('/v2/cob?inicio=2023-08-22T00:00:00Z&fim=2023-12-30T00:00:00Z');
        res.json(listCob.data);
            
    }catch(err){
        res.json({err:true, msgErro: `Erro na listagem das cobrança`,err:err});
    }

}
webhook(req,res){
    console.log(req.body);
    res.send('200');
}
}

module.exports = new apiPixFeatures();


