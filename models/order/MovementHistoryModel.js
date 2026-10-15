const knex = require('../../database/connection');

const moneyOperations = require('../../utils/moneyOperations/math')
const convertMonetaryValue = require('../../utils/moneyOperations/convertMonetaryValue');



class MovementHistoryModel{
    async transactionRecharge(devedor_txid){
        try{
            return await knex.transaction(async trans=>{
                //Busca a ordem pendente e trava a linha até o fim da transação (SELECT ... FOR UPDATE).
                //Se outra chamada tentar creditar o mesmo txid ao mesmo tempo, ela espera aqui e,
                //quando seguir, já encontra a ordem paga (status 1) e não credita de novo.
                const dataPurchaseOrder = await trans.select('matriculation', 'devedor_valor').where({devedor_txid, status: 0}).table("ru_purchase_order").forUpdate();
                if(dataPurchaseOrder.length === 0){
                    return {err: false, credited: false, return: 'Ordem inexistente ou já creditada'};
                }
                const matriculation = dataPurchaseOrder[0].matriculation;
                const recharge_value = convertMonetaryValue.stringToNumber(dataPurchaseOrder[0].devedor_valor); //Valor da operação para adicionar

                //Busca o cartão, também travado, para o saldo não ser alterado por outra operação no meio
                const dataCard = await trans.select('cod_ru', 'value').where({matriculation}).table("ru_food_card").forUpdate();
                if(dataCard.length === 0){
                    throw new Error('Cartão não encontrado para a matrícula ' + matriculation);
                }
                const currentValueCard = convertMonetaryValue.stringToNumber(dataCard[0].value);

                const newValue = moneyOperations.sum(recharge_value.return, currentValueCard.return)
                const value = convertMonetaryValue.numberToString(newValue.return)

                //adicionar valor recebido pelo pix ao cartão
                await trans.update({value:value.return, updated_on: knex.fn.now()}).where({cod_ru:dataCard[0].cod_ru}).table("ru_food_card");

                //salvar a movimentação
                const valuePurchaseOrder = convertMonetaryValue.numberToString(recharge_value.return); //Valor da operação
                await trans.insert({
                    idPurchaseOrder: devedor_txid,
                    idfoodcard:	dataCard[0].cod_ru,
                    value:	valuePurchaseOrder.return,
                    typemove:1,
                }).table("ru_movement_history");

                //Mudar status para pago
                await trans.update({status:1}).where({devedor_txid}).table("ru_purchase_order");

                return {err: false, credited: true, return: {matriculation, newValue: value.return}};
            })

        }catch(err){

            return {err: true, return: err}
        }
    }
}
module.exports = new MovementHistoryModel();
