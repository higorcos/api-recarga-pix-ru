const express = require("express")
const router = express.Router();
const AdminAuth = require('../middleware/admin/AdminAuth');
const AllAuth = require('../middleware/secondary/allAuth');
const OwnerOrAdmin = require('../middleware/secondary/OwnerOrAdmin');
const TokenVerification = require('../middleware/secondary/DefaultAuth');
const CardController = require('../controllers/CardController')


router.post('/card', AdminAuth, CardController.created);
router.post('/card/info', TokenVerification, OwnerOrAdmin, CardController.show);
router.patch('/card/add', AdminAuth, CardController.addAndUpdate); //crédito manual no balcão
router.patch('/card/subtract', AdminAuth, CardController.subtractAndUpdate); //débito da refeição

module.exports = router;