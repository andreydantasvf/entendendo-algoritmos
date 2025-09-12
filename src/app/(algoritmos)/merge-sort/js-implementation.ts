import { type CodesBlock } from '@/types/code-block';

const javascriptCode = `function mergeSort(array) {
  // Caso base: arrays com 1 ou 0 elementos já estão ordenados
  if (array.length <= 1) {
    return array;
  }

  // Dividir o array ao meio
  const meio = Math.floor(array.length / 2);
  const esquerda = array.slice(0, meio);
  const direita = array.slice(meio);

  // Recursão: ordenar as duas metades
  const esquerdaOrdenada = mergeSort(esquerda);
  const direitaOrdenada = mergeSort(direita);

  // Mesclar as duas metades ordenadas
  return merge(esquerdaOrdenada, direitaOrdenada);
}

function merge(esquerda, direita) {
  const resultado = [];
  let indiceEsquerda = 0;
  let indiceDireita = 0;

  // Comparar elementos e mesclar em ordem
  while (indiceEsquerda < esquerda.length && indiceDireita < direita.length) {
    if (esquerda[indiceEsquerda] <= direita[indiceDireita]) {
      resultado.push(esquerda[indiceEsquerda]);
      indiceEsquerda++;
    } else {
      resultado.push(direita[indiceDireita]);
      indiceDireita++;
    }
  }

  // Adicionar elementos restantes (se houver)
  while (indiceEsquerda < esquerda.length) {
    resultado.push(esquerda[indiceEsquerda]);
    indiceEsquerda++;
  }

  while (indiceDireita < direita.length) {
    resultado.push(direita[indiceDireita]);
    indiceDireita++;
  }

  return resultado;
}

// Exemplo de uso
const numeros = [64, 34, 25, 12, 22, 11, 90, 5];
console.log("Array original:", numeros);

const arrayOrdenado = mergeSort(numeros);
console.log("Array ordenado:", arrayOrdenado);

// Teste com diferentes cenários
console.log("Array vazio:", mergeSort([]));
console.log("Um elemento:", mergeSort([42]));
console.log("Já ordenado:", mergeSort([1, 2, 3, 4, 5]));
console.log("Ordem reversa:", mergeSort([5, 4, 3, 2, 1]));`;

export const javascriptImplementations = [
  {
    code: javascriptCode,
    language: 'javascript',
    tabTitle: 'JavaScript',
    tabValue: 'js-basic',
    title: 'Implementação do Merge Sort - JavaScript',
    description:
      'Implementação completa e didática do algoritmo Merge Sort usando a estratégia "dividir para conquistar". Este código demonstra como dividir recursivamente o array em sub-arrays menores e depois mesclá-los de forma ordenada, garantindo complexidade O(n log n) em todos os casos.'
  }
] as CodesBlock[];
