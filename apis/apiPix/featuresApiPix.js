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

        const devedor_data_criacao = responseNewCob['data']['calendario']['criacao']
        // Horário de expiração (Convertendo)
        let expiration = responseNewCob['data']['calendario']['expiracao']
        const horarioOriginal = new Date(responseNewCob['data']['calendario']['criacao']);
        horarioOriginal.setSeconds(horarioOriginal.getSeconds() + expiration);
        expiration = horarioOriginal.toISOString();
        

        return {
            error: false, 
            msg: 'Sucesso',
            data: { 
                devedor_txid:responseNewCob['data']['txid'],
                devedor_cpf:responseNewCob['data']['devedor']['cpf'],
                devedor_nome:responseNewCob['data']['devedor']['nome'],
                devedor_loc:responseNewCob['data']['loc']['id'],
                devedor_location:responseNewCob['data']['loc']['location'],
                devedor_valor:responseNewCob['data']['valor']['original'],
                pagamento_cod_pix:responseNewCob['data']['pixCopiaECola'],
                pagamento_qrcode:responseNewCob['data']['pixCopiaECola'],
                expiration:expiration,
                devedor_data_criacao: devedor_data_criacao,
                qrcode:responseQRcode.data.imagemQrcode,
            },
             
            // allData: {...responseNewCob.data}
        }
            
    }catch(err){
        return {
            error: true, 
            msgErro: `Erro na criação de nova cobrança`, 
            err:err}
    }
}
//Consulta a cobrança na Efí. O status "CONCLUIDA" indica que o Pix foi pago.
async searchBilling(txid){
    try{
        const apiPix = await pixRequest(); //Pegar Novo Token
        const {data} = await apiPix.get(`/v2/cob/${encodeURIComponent(txid)}`)
        return {
            error: false,
            msg: 'Sucesso',
            data,
        }
    }catch(err){
        return {
            error: true,
            msg:'Erro, consulta da cobrança na api de pagamento',
            dataError: err.message
        }
    }
}
async searchQRcode(idLocCob){
    try{
        const apiPix = await pixRequest(); //Pegar Novo Token 

        const {data} = await apiPix.get(`/v2/loc/${idLocCob}/qrcode`)
        return {
            error: false, 
            msg: 'Sucesso',
            data,
        }
    }catch(err){
        return {
            error: true,
            msg:'Erro, acesso a api de pagamento',
            dataError: err.errors
        }
    }
}

}

module.exports = new apiPixFeatures();


