const knex = require('../../database/connection');

const moneyOperations = require('../../utils/moneyOperations/math')
const convertMonetaryValue = require('../../utils/moneyOperations/convertMonetaryValue');

const PurchaseOrderModel = require('../../models/order/PurchaseOrderModel');



class MovementHistoryModel{
    async transactionRecharge(devedor_txid){
       

        try{
            await knex.transaction(async trans=>{
                //Busca ordem de compra
                const dataPurchaseOrder = await trans.select('ru_purchase_order.matriculation', 'ru_purchase_order.devedor_valor').where({devedor_txid, status: 0}).table("ru_purchase_order");
                const matriculation = dataPurchaseOrder[0].matriculation;
                let recharge_value = dataPurchaseOrder[0].devedor_valor; //Valor da operção para adicionar
                recharge_value = convertMonetaryValue.stringToNumber(recharge_value);

                // Pega id cartão
                let dataCard = await trans.select('ru_food_card.*').table('users').fullOuterJoin('ru_food_card','ru_food_card.matriculation','users.matriculation').where({'users.matriculation' : matriculation});
                let currentValueCard = dataCard[0].value; //Valor atual
                dataCard = dataCard[0];
                currentValueCard = convertMonetaryValue.stringToNumber(currentValueCard);
    
                let nemValue = moneyOperations.sum(recharge_value.return,currentValueCard.return)
                let value = convertMonetaryValue.numberToString(nemValue.return)

                //adicionar valor recebido pelo pix ao cartão
                const updated = await trans.update({value:value.return}).where({matriculation,cod_ru:dataCard.cod_ru}).table("ru_food_card");
                //salvar a movimentação
                const valuePurchaseOrder = convertMonetaryValue.numberToString(recharge_value.return); //Valor da operação
                const insertMove = await trans.insert({
                    idPurchaseOrder: devedor_txid,
                    idfoodcard:	dataCard.cod_ru,
                    value:	valuePurchaseOrder.return,
                    typemove:1,
                }).table("ru_movement_history");

                //Mudar status
                const updatedStatus = await trans.update({status:1}).where({devedor_txid}).table("ru_purchase_order");

               
                return {err: false , return: {
                    //matriculation:dataPurchaseOrder[0].matriculation,
                    //dataCard: dataCard
                }};  
            })
            
        }catch(err){

            return {err: true, return: err}
        }
    }
}
module.exports = new MovementHistoryModel();