
class ConverterMoney{
    stringToNumber(value){
        
        if(value == undefined){
            return {err: true, return: []};  
        }else{
            // Remover pontos e substituir a vírgula por ponto
            const newValue = 
                value.replace('R$','')
                    .replace(/\s/g, '')
                    .replace(/\./g, '')
                    .replace(',', '.');
            return {err: false, return: newValue};  
        }
    }
    numberToString(value){
        if(value == undefined){
            return {err: true, return: []};  
        }else{
        // Converter número para string e dividir parte inteira e parte decimal
        var valueString = value.toString();
        var parts = valueString.split('.');

        // Formatando a parte inteira com pontos como separadores de milhares
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        // Juntar novamente a parte inteira e a parte decimal com vírgula
        var newValue = parts.join(',');
        return {err: false, return: newValue};  
        }
    }
}
module.exports = new ConverterMoney()
