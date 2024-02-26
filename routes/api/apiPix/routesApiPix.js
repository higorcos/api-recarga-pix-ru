const express = require("express")
const router = express.Router();
const apiPixController = require('../../../controllers/apiPix/apiPixController')
const MovementHistoryController = require('../../../controllers/order/MovementHistoryController')


router.get('/api-pix/:txid',MovementHistoryController.recharge) 
router.post('/webhook(/pix)?',apiPixController.webhook) //WebHook para omprovação de pagamento

module.exports = router;
