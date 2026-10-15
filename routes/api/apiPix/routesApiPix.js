const express = require("express")
const router = express.Router();
const apiPixController = require('../../../controllers/apiPix/apiPixController')


router.post('/webhook(/pix)?',apiPixController.webhook) //WebHook para comprovação de pagamento

module.exports = router;
