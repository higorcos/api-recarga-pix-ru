//Usar depois do DefaultAuth: só deixa passar se a matrícula da requisição for a do usuário logado
//ou se ele for administrador (role 1). Evita que um estudante consulte o cartão ou as recargas de outro.
module.exports = function(req,res,next){
    const matriculation = req.params.matriculation ?? req.params.id ?? req.body.matriculation;

    if(req.user.role == 1 || (matriculation !== undefined && String(matriculation) === String(req.user.idUser))){
        return next();
    }
    return res.status(403).json({ error: 'Sem autorização para acessar dados de outra matrícula' });
}
