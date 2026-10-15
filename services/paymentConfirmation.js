const Decimaljs = require('decimal.js');
const PurchaseOrderModel = require('../models/order/PurchaseOrderModel');
const MovementHistoryModel = require('../models/order/MovementHistoryModel');
const {searchBilling} = require('../apis/apiPix/featuresApiPix');
const convertMonetaryValue = require('../utils/moneyOperations/convertMonetaryValue');

//Credita a recarga só depois de confirmar na Efí que a cobrança foi paga.
//Usado pelo webhook e pela consulta da cobrança (caso alguma notificação do webhook se perca).
async function confirmPayment(devedor_txid){
    const order = await PurchaseOrderModel.findByTxid(devedor_txid);
    if(order.err){
        return {err: true, credited: false, msg: 'Erro ao buscar a ordem de compra'};
    }
    if(!order.return){
        return {err: false, credited: false, msg: 'Ordem de compra não encontrada'};
    }
    if(order.return.status !== 0){
        return {err: false, credited: false, msg: 'Recarga já creditada'};
    }

    //Não confia no corpo do webhook: consulta a cobrança direto na Efí
    const billing = await searchBilling(devedor_txid);
    if(billing.error){
        return {err: true, credited: false, msg: billing.msg};
    }
    if(billing.data.status !== 'CONCLUIDA'){
        return {err: false, credited: false, msg: `Pagamento não concluído (status ${billing.data.status})`};
    }

    //O valor cobrado na Efí precisa ser o mesmo da ordem gravada no banco
    const orderValue = convertMonetaryValue.stringToNumber(order.return.devedor_valor).return;
    if(!new Decimaljs(orderValue).equals(new Decimaljs(billing.data.valor.original))){
        return {err: true, credited: false, msg: 'Valor da cobrança diferente do valor da ordem'};
    }

    const result = await MovementHistoryModel.transactionRecharge(devedor_txid);
    if(result.err){
        return {err: true, credited: false, msg: 'Erro ao creditar a recarga'};
    }
    return {err: false, credited: result.credited, msg: result.credited ? 'Recarga creditada' : result.return};
}

module.exports = {confirmPayment};
