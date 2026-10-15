const {confirmPayment} = require('../../services/paymentConfirmation')

class billingPixController{

//Webhook da Efí: recebe {pix: [{txid, endToEndId, valor, horario}, ...]} quando um Pix é pago.
//O corpo serve só para saber quais txids conferir; o crédito depende da consulta à Efí em confirmPayment.
async webhook(req,res){
    const pixList = Array.isArray(req.body?.pix) ? req.body.pix : []; //A notificação de teste da Efí não traz "pix"
    let failed = false;

    for(const pix of pixList){
        if(!pix.txid){
            continue; //Pix recebido sem cobrança vinculada (ex.: enviado direto para a chave)
        }
        const result = await confirmPayment(pix.txid);
        console.log(`Webhook Pix txid=${pix.txid}: ${result.msg}`);
        if(result.err){
            failed = true;
        }
    }

    //Com erro, responde 500 para a Efí reenviar a notificação depois
    return res.status(failed ? 500 : 200).send(failed ? 'erro' : '200');
}
}

module.exports = new billingPixController();
