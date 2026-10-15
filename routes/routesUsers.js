const express = require("express")
const router = express.Router();
const AdminAuth = require('../middleware/admin/AdminAuth');
const AllAuth = require('../middleware/secondary/allAuth');
const OwnerOrAdmin = require('../middleware/secondary/OwnerOrAdmin');
const TokenVerification = require('../middleware/secondary/DefaultAuth');
const UserController = require('../controllers/UserController')


router.post('/login', UserController.login);
router.get('/user', AdminAuth, UserController.index);
router.post('/user', UserController.create);
router.get('/user/:id', TokenVerification, OwnerOrAdmin, UserController.findById);
router.patch('/user/role/:id', AdminAuth, UserController.updateRole);

router.post('/recovery-password', UserController.recoveryPassword);
router.put('/recovery-password/:token', UserController.changePassword);
router.get('/recovery-password/:token', (req,res)=>{
    return res.send("Redirect para rota de formulário para nova senha");
});


router.get('/', (req,res)=>{
    res.status(200).json({
        error: false,
        msg:'Sucesso, Home',
    })
});

module.exports = router;