const {pixRequest} = require('../../apis/apiPix/credentials')
const {createBilling} = require('../../apis/apiPix/featuresApiPix')

//Pegar Novo Token quando a aplicação for startada 
const apiPixA = pixRequest();

class billingPixController{

async createBilling (req,res){

    console.log('111')

    /*
    @@
    Buscar CPF E NOME DO ALUNO
    @@
    */

    const result = await createBilling({nome:'teste',cpf:'12345678909', valor: '10.00'})
    return res.json({res:result})
    // return res.send(`<div class="boxQrcode">
    // <h3>QRCODE</h3>
    // <img src=${result.data.QRcode} alt="" srcset="">
    // </div>`)

}

webhook(req,res){
    console.log(req.body);
    res.send('200');
}
}

module.exports = new billingPixController();


