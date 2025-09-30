import { type CodesBlock } from '@/types/code-block';

const javascriptCode = `
  function selectionSort(arr) {
      const n = arr.length;

      for (let i = 0; i < n - 1; i++) {
          // Encontra o índice do menor elemento no array não ordenado
          let minIndex = i;

          for (let j = i + 1; j < n; j++) {
              if (arr[j] < arr[minIndex]) {
                  minIndex = j;
              }
          }

          // Troca o menor elemento com o primeiro elemento não ordenado
          if (minIndex !== i) {
              swap(arr, i, minIndex);
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
  const dados = [64, 25, 12, 22, 11];
  const ordenados = selectionSort([...dados]);
  console.log(\`Lista original: [\${dados.join(', ')}]\`);
  console.log(\`Lista ordenada: [\${ordenados.join(', ')}]\`);
`;

export const javascriptImplementations = [
  {
    code: javascriptCode,
    language: 'javascript',
    tabTitle: 'JavaScript',
    tabValue: 'js-basic',
    title: 'Implementação do Selection Sort - JavaScript',
    description:
      'Implementação completa e didática do algoritmo Selection Sort. Este código demonstra como encontrar repetidamente o menor elemento não ordenado e colocá-lo na posição correta, garantindo complexidade O(n²) em todos os casos.'
  }
] as CodesBlock[];
