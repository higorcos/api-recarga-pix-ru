const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

 
class UserModel{

    async new(user){
        try{
            const hash = await bcrypt.hash(user.password,saltRounds); //Criptografia
           
            const resultInset = await knex.insert({matriculation:user.matriculation, name:user.name,email:user.email,password:hash,role:0}).table("users");
            return {err: false, return: {id: resultInset}}

        }catch(err){
            // console.log("\n\n\n - Error: \n",err,"\n\n\n")
            return {err: true, return: err}
        }
    }

    async findEmail(email){
        try{
            const resultSelect = await knex.select("*").from('users').where({email});

            if(resultSelect.length > 0){
                return true; //Já existe
            }else{
                return false;
            }
        }catch(err){
            console.log("\n\n\n - Error: \n",err,"\n\n\n");
            return false;
        }
    }

    async findAll(){
        try{
            const resultSelect = await 
            knex.select('users.matriculation', 'users.name', 'users.email', 'users.role','ru_food_card.*').table('users').fullOuterJoin('ru_food_card','ru_food_card.matriculation','users.matriculation')
            return {err: false, return: resultSelect};

        }catch(err){
            //console.log(err);
            return {err: true, return: err};
        }
    }

    async findById(matriculation){
        
        try{
            const resultSelect = await knex.select('users.matriculation', 'users.name', 'users.email', 'users.role','ru_food_card.*').table('users').fullOuterJoin('ru_food_card','ru_food_card.matriculation','users.matriculation').where({'users.matriculation' :matriculation});

            if(resultSelect.length > 0){
                
                return {err: false, return: resultSelect};

            }else{
                return {err: true, return: []};
            }

        }catch(err){
            //console.log(err);
            return {err: true, return: err};
        }
    }
    async verify(matriculation){
        
        try{
            const resultSelect = await knex.select('matriculation').table('users').where({matriculation});

            if(resultSelect.length > 0){
                
                return {err: false, return: resultSelect};

            }else{
                return {err: true, return: []};
            }

        }catch(err){
            //console.log(err);
            return {err: true, return: err};
        }
    }

    async findByEmail(email){
        try{
            const resultSelect = await knex.select(['matriculation','name','password','email','role']).where({email}).table('users');
            
            if(resultSelect.length > 0){
                return {err: false, return: resultSelect[0]};

            }else{
                return {err: true, return: []};
            }

        }catch(err){
           
            return {err: true, return: err};
        }
    }

    async updateRole(user){
        
            //verificar se usuário existe 
            const checkingExistsUser = await this.findById(user.id);
            
            if(!checkingExistsUser.err){
                let editUser = {}
      

                    if(user.role == undefined){
                        return {err: true, return: {msg: 'Não informado'}};
                    }else{
                        editUser.role = user.role;
                    }
                    
                    try{
                        const resultUpdate = await knex.where({matriculation:user.id}).update(editUser).table('users');
                        return {err: false, return: resultUpdate};
            
                    }catch(err){
                        return {err: true, return: err};
                    }
            }else{
                return  {err:true, return:[], msgErr:'Usuário não existe' }
            }
    }

    async changePassword(newPassword, idUser){
        const hash = await bcrypt.hash(newPassword,saltRounds); //Criptografia

        try{
            await knex.update({
                    password: hash
                }).where({
                    matriculation:idUser
                }).table('users');

            return {err: false, return: []};
            
        }catch(err){
            return {err: true, return: err};

        }
    }
}
module.exports = new UserModel();