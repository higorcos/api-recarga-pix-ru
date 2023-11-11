const {pixRequest} = require('../../apis/apiPix/credentials')
const {createBilling} = require('../../apis/apiPix/featuresApiPix')
const MovementHistoryModel = require('../../models/order/MovementHistoryModel')

//Pegar Novo Token quando a aplicação for startada 
const apiPixA = pixRequest();

class billingPixController{

async createBilling (req,res){
    /*
    const result = await createBilling({nome:'teste',cpf:'12345678909', valor: '10.00'})
    return res.send(`<div class="boxQrcode">
    <h3>QRCODE</h3>
    <img src=${result.data.qrcode} alt="" srcset="">
    </div>`)
    */

    const result = await MovementHistoryModel.transactionRecharge()

     
}

webhook(req,res){
    console.log(req.body);
    res.send('200');
}
}

module.exports = new billingPixController();


