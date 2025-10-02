import { type CodesBlock } from '@/types/code-block';

const javascriptCode = `
  function bubbleSort(arr) {
      const n = arr.length;
      let swapped;

      for (let i = 0; i < n - 1; i++) {
          swapped = false;

          // Compara elementos adjacentes
          for (let j = 0; j < n - i - 1; j++) {
              // Se o elemento atual é maior que o próximo, troca
              if (arr[j] > arr[j + 1]) {
                  swap(arr, j, j + 1);
                  swapped = true;
              }
          }

          // Se não houve trocas nesta passada, o array está ordenado
          if (!swapped) {
              break;
          }
      }

      return arr;
  }

  function swap(arr, i, j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  }

  // Exemplo de Uso em JavaScript
  const dados = [64, 34, 25, 12, 22, 11, 90];
  const ordenados = bubbleSort([...dados]);
  console.log(\`Lista original: [\${dados.join(', ')}]\`);
  console.log(\`Lista ordenada: [\${ordenados.join(', ')}]\`);
`;

export const javascriptImplementations = [
  {
    code: javascriptCode,
    language: 'javascript',
    tabTitle: 'JavaScript',
    tabValue: 'js-basic',
    title: 'Implementação do Bubble Sort - JavaScript',
    description:
      'Implementação completa e didática do algoritmo Bubble Sort com otimização. Este código demonstra como comparar elementos adjacentes e trocá-los quando necessário, com parada antecipada quando não há mais trocas.'
  }
] as CodesBlock[];
