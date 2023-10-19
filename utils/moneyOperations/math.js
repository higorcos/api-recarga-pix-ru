const Decimaljs = require('decimal.js'); //biblioteca Decimal.js

class Math{
  sum(value0,value1){
    const result = Decimaljs.sum(value0, value1);

    return {err: false, return: result};  

  }
  sub(value0,value1){
        const result = Decimaljs.sub(value0, value1);

        if(result >= 0){
            
            return {err: false, return: result};  
            
        }else{
            
            return {err: true, return: []};  

        }

  }
}
module.exports = new Math()
