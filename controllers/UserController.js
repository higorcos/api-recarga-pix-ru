const UsersModel = require('../models/UserModel');
const TokenModel = require('../models/PasswordTokenModel');
const servicesEmail = require('../utils/servicesEmail');

require('dotenv').config()
const secret = process.env.SECRET_JWT;
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserController{
    async login(req,res){
        const {email,password} = req.body;
        console.log(email,password)
        if(email != undefined && password != undefined){

            const user = await UsersModel.findByEmail(email);
            // console.log(user)
            if(!user.err){
               const resultComparePassword = await bcrypt.compare(password,user.return.password);
               if(resultComparePassword){

                var token = JWT.sign({ 
                    email: email, 
                    name: user.return.name, 
                    idUser: user.return.matriculation, 
                    role: user.return.role 
                }, secret,{ expiresIn: '24h' });
                console.log('sucesso')
                   return res.status(202).json({
                       error: false,
                       msg:'Login realizado com Sucesso',
                        token
                   }); 

               }else{
                   return res.status(401 ).json({
                       error: true,
                       msg:'Senha incorreta',    
                   }); 

               }

            }else{
                return res.status(404).json({
                    error: true,
                    msg:'User Not Found',    
                });
            }

        }else{
            return res.status(422).json({
                error: true,
                msg:'Validation Failed, Os parametros necessários não foram passados',    
            });
        }
    }
    async index(req,res){
        const users = await UsersModel.findAll();
      
        if(!users.err){
            return res.status(200).json({
                error: false,
                msg:'Sucesso, Lista de Usuário',
                data: users,
            });
        }else{
            return res.status(400).json({
                error: false,
                msg:'Erro, Lista de Usuário',
                data: req.body,
                msgErr:
                {sqlState: users.return.sqlState,
                sqlMessage: users.return.sqlMessage,}
            });
        }   
    }
    async create(req,res){
        const {matriculation, email,name,password} = req.body;

        if(email !== undefined && name !== undefined && password !== undefined){
           
            const validationEmail = await UsersModel.findEmail(email);
            console.log(validationEmail)
            if(!validationEmail){
                const resultInsert = await UsersModel.new({matriculation,name,email,password});
                
                if(!resultInsert.err){
                    return res.status(200).json({
                        error: false,
                        msg:'Usuário Criado com sucesso',
                        data: req.body,
                    });
                }else{
                    return res.status(400).json({
                        error: true,
                        msg:'Erro na criação do usuário',
                        data: req.body,
                        msgErr:
                        {sqlState: resultInsert.return.sqlState,
                        sqlMessage: resultInsert.return.sqlMessage,}
                    });
                }
            }else{
                return res.status(409).json({
                    error: true,
                    msg:'Erro na criação do usuário, Email já foi cadastrato, Email Conflict',
                    data: {email:email}
                });
            }
                
          

        }else{
            return res.status(422).json({
                error: true,
                msg:'Validation Failed',
                field : ["name","email","password"]
                
            });
        }
    }
    async updateRole(req,res){
        const {role} = req.body;
        const {id} = req.params; 
           
                const resultUpdate = await UsersModel.updateRole({id,role});
                // console.log(resultUpdate)


                if(!resultUpdate.err){
                    return res.status(200).json({
                        error: false,
                        msg:'Update role',
                        data: req.body,
                    });
                }else{
                    return res.status(409).json({
                        error: true,
                        msg:'Erro no update de role',
                        msgErr:resultUpdate
                    });
                       
                }
           
                
    }
    async findById(req,res){
        const {id} = req.params;

        const resultFind = await UsersModel.findById(id);
        
        if(!resultFind.err){
            return res.status(200).json({
                error: false,
                msg:'Pesquisa pelo ID realizada com sucesso',
                data: resultFind.return,
            });
        }else{
            return res.status(404).json({
                error: true,
                msg:'Usuário Não encontrado',
                msgErr:
                {sqlState: resultFind.return.sqlState,
                sqlMessage: resultFind.return.sqlMessage,}
            });
        }
    
                
    }
    async recoveryPassword(req,res){
        const email = req.body.email;
    
        if(email != undefined){
            
            const resultToken = await TokenModel.create(email);
          
       
            if(!resultToken.err){

                /* 
                    Enviar Email para o usuário

                    Vou mandar o token direto (Perigoso mandar o token Solto dessa forma)
                */
                   
                    servicesEmail.submit(email,resultToken.return)
                return res.status(200).json({
                    error: false,
                    msg:'Token para recuperação criado com sucesso',
                    token: resultToken.return
                    
                });
            }else{
                return res.status(400).json({
                    error: true,
                    msg:'Error,token para recuperação não foi gerado',
                    msgErr:resultToken.return
                });
            }
        }else{
            return res.status(404).json({
                error: true,
                msg:'Email Not Found',    
                msgErr:resultToken.return
            });
        }
    }
    async changePassword(req,res){
        const {password} = req.body;
        const {token} = req.params;
    
        if(password != undefined){
            const validateToken = await TokenModel.validate(token);
           
            if(!validateToken.err){
                const {idUser, token} = validateToken.return
               
                const resultChangePassword = 
                await UsersModel.changePassword(password, idUser);
                await TokenModel.setTokenSituation(token);

                

                return res.status(200).json({
                    error: false,
                    msg:'sucesso',
                    
                });
            }else{
                return res.status(409).json({
                    error: true,
                    msg:'Error, Token inválido',
                });
            }
        }else{
            return res.status(422).json({
                error: true,
                msg:'Validation Failed, Os parametros necessários não foram passados',    
            });
        }
    }
}

module.exports = new UserController();