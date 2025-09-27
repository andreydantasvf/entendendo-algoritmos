import { type CodesBlock } from '@/types/code-block';

const javascriptCode = `
  function quickSort(arr, low = 0, high = arr.length - 1) {
      if (low < high) {
          // Particiona o array e obtém o índice do pivô
          const pivotIndex = partition(arr, low, high);

          // Ordena recursivamente os subarrays
          quickSort(arr, low, pivotIndex - 1);
          quickSort(arr, pivotIndex + 1, high);
      }
      return arr;
  }

  function partition(arr, low, high) {
      // Escolhe o último elemento como pivô
      const pivot = arr[high];
      let i = low - 1; // Índice do menor elemento

      for (let j = low; j < high; j++) {
          // Se o elemento atual é menor ou igual ao pivô
          if (arr[j] <= pivot) {
              i++;
              swap(arr, i, j);
          }
      }

      // Coloca o pivô na posição correta
      swap(arr, i + 1, high);
      return i + 1;
  }

  function swap(arr, i, j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  }

  // Exemplo de Uso em JavaScript
  const dados = [38, 27, 43, 3, 9, 82, 10];
  const ordenados = quickSort([...dados]);
  console.log(\`Lista original: [\${dados.join(', ')}]\`);
  console.log(\`Lista ordenada: [\${ordenados.join(', ')}]\`);
`;

export const javascriptImplementations = [
  {
    code: javascriptCode,
    language: 'javascript',
    tabTitle: 'JavaScript',
    tabValue: 'js-basic',
    title: 'Implementação do Quick Sort - JavaScript',
    description:
      'Implementação completa e didática do algoritmo Quick Sort usando a estratégia "dividir para conquistar". Este código demonstra como particionar o array usando um pivô e ordenar recursivamente os subarrays resultantes, garantindo complexidade O(n log n) no caso médio.'
  }
] as CodesBlock[];
