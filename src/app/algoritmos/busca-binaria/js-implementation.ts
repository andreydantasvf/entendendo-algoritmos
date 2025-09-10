import { type CodesBlock } from '@/components/layout/CodeImplementation';

const javascriptCode = `function buscaBinaria(array, target) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] === target) {
      return mid; // Encontrou! Retorna o índice
    } else if (array[mid] < target) {
      left = mid + 1; // Busca na metade direita
    } else {
      right = mid - 1; // Busca na metade esquerda
    }
  }

  return -1; // Não encontrou
}

// Exemplo de uso:
const numeros = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const resultado = buscaBinaria(numeros, 7);
console.log(resultado); // 3 (índice do elemento 7)

// Testando com elemento que não existe:
const naoExiste = buscaBinaria(numeros, 4);
console.log(naoExiste); // -1 (não encontrado)`;

const javascriptRecursiveCode = `function buscaBinariaRecursiva(array, target, left = 0, right = array.length - 1) {
  // Caso base: elemento não encontrado
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);

  // Caso base: elemento encontrado
  if (array[mid] === target) {
    return mid;
  }

  // Busca recursiva na metade apropriada
  if (array[mid] < target) {
    return buscaBinariaRecursiva(array, target, mid + 1, right);
  } else {
    return buscaBinariaRecursiva(array, target, left, mid - 1);
  }
}

// Exemplo de uso:
const numeros = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const resultado = buscaBinariaRecursiva(numeros, 7);
console.log(resultado); // 3`;

export const javascriptImplementations = [
  {
    code: javascriptCode,
    language: 'javascript',
    tabTitle: 'JavaScript',
    tabValue: 'js-iterative',
    title: 'Implementação Iterativa - JavaScrip',
    description:
      'Versão iterativa usando um loop while. Mais eficiente em termos de memória.'
  },
  {
    code: javascriptRecursiveCode,
    language: 'javascript',
    tabTitle: 'JavaScript Recursivo',
    tabValue: 'js-recursive',
    title: 'Implementação Recursiva - JavaScript',
    description:
      'Versão recursiva mais elegante, mas usa mais memória devido à pilha de chamadas.'
  }
] as CodesBlock[];
