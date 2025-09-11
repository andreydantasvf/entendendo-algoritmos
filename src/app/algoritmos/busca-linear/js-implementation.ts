import { type CodesBlock } from '@/types/code-block';

const javascriptCode = `function buscaLinear(array, target) {
  // Percorre todo o array elemento por elemento
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i; // Encontrou! Retorna o índice
    }
  }

  return -1; // Não encontrou
}

// Exemplo de uso:
const numeros = [5, 2, 8, 1, 9, 3];
const resultado = buscaLinear(numeros, 8);
console.log(resultado); // 2 (índice do elemento 8)

// Testando com elemento que não existe:
const naoExiste = buscaLinear(numeros, 7);
console.log(naoExiste); // -1 (não encontrado)

// Versão que retorna o elemento em vez do índice:
function buscaLinearElemento(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return array[i]; // Retorna o elemento
    }
  }

  return null; // Não encontrou
}`;

const javascriptWithIndexCode = `function buscaLinearComDetalhes(array, target) {
  const detalhes = {
    elemento: null,
    indice: -1,
    comparacoes: 0,
    encontrado: false
  };

  for (let i = 0; i < array.length; i++) {
    detalhes.comparacoes++;

    if (array[i] === target) {
      detalhes.elemento = array[i];
      detalhes.indice = i;
      detalhes.encontrado = true;
      break; // Para a busca quando encontra
    }
  }

  return detalhes;
}

// Exemplo de uso:
const frutas = ['maçã', 'banana', 'laranja', 'uva', 'manga'];
const resultado = buscaLinearComDetalhes(frutas, 'laranja');

console.log(resultado);
// {
//   elemento: 'laranja',
//   indice: 2,
//   comparacoes: 3,
//   encontrado: true
// }`;

export const javascriptImplementations = [
  {
    code: javascriptCode,
    language: 'javascript',
    tabTitle: 'JavaScript',
    tabValue: 'js-basic',
    title: 'Implementação Básica - JavaScript',
    description:
      'Versão simples da busca linear que percorre o array elemento por elemento até encontrar o valor desejado.'
  },
  {
    code: javascriptWithIndexCode,
    language: 'javascript',
    tabTitle: 'JavaScript Detalhado',
    tabValue: 'js-detailed',
    title: 'Implementação Detalhada - JavaScript',
    description:
      'Versão que retorna informações adicionais sobre a busca, incluindo número de comparações realizadas.'
  }
] as CodesBlock[];
