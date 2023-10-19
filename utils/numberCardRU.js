class NumberCardRU{
    new(){
           
        //Criar Regra para gerar Codigo do RU
        const data = new Date();
        const cod_ru = data.getTime();
        
        return cod_ru


    }
    

}
module.exports = new NumberCardRU()