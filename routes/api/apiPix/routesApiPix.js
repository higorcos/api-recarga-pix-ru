const express = require("express")
const router = express.Router();
const apiPixController = require('../../../controllers/apiPix/apiPixController')


router.get('/api-pix',apiPixController.createBilling) 
router.post('/webhook(/pix)?',apiPixController.webhook) //WebHook para omprovação de pagamento

module.exports = router;
