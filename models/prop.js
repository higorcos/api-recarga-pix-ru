// String de exemplo
var numero = "1.000.000.000,00";

// Remover pontos e substituir a vírgula por ponto
var numeroFormatado1 = numero.replace(/\./g, '').replace(',', '.');

console.log(numeroFormatado1); // Saída: "1000000.00"



function formatarNumero(numero) {
  // Converter número para string e dividir parte inteira e parte decimal
  var numeroString = numero.toString();
  var partes = numeroString.split('.');
  
  // Formatando a parte inteira com pontos como separadores de milhares
  partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Juntar novamente a parte inteira e a parte decimal com vírgula
  var numeroFormatado = partes.join(',');

  return numeroFormatado;
}

var numero = 1000000.00;
var numeroFormatado = formatarNumero(numeroFormatado1);
console.log(numeroFormatado); // Saída: "1.000.000,00"