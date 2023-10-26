const express = require("express")
const router = express.Router();
const AdminAuth = require('../middleware/admin/AdminAuth');
const AllAuth = require('../middleware/secondary/allAuth');
const TokenVerification = require('../middleware/secondary/DefaultAuth');
const FoodValueController = require('../controllers/FoodValueController')


router.get('/food-value', FoodValueController.showData);
router.put('/food-value', FoodValueController.updated);



module.exports = router;