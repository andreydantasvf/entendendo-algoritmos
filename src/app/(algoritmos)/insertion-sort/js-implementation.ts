import { type CodesBlock } from '@/types/code-block';

const javascriptCode = `
  function insertionSort(arr) {
      const n = arr.length;

      // Começa do segundo elemento (índice 1)
      for (let i = 1; i < n; i++) {
          const key = arr[i];
          let j = i - 1;

          // Move elementos maiores que key uma posição à frente
          while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j];
              j--;
          }

          // Insere a chave na posição correta
          arr[j + 1] = key;
      }

      return arr;
  }

  // Exemplo de Uso em JavaScript
  const dados = [64, 34, 25, 12, 22, 11, 90];
  const ordenados = insertionSort([...dados]);
  console.log(\`Lista original: [\${dados.join(', ')}]\`);
  console.log(\`Lista ordenada: [\${ordenados.join(', ')}]\`);
`;

export const javascriptImplementations = [
  {
    code: javascriptCode,
    language: 'javascript',
    tabTitle: 'JavaScript',
    tabValue: 'js-basic',
    title: 'Implementação do Insertion Sort - JavaScript',
    description:
      'Implementação completa e didática do algoritmo Insertion Sort. Este código demonstra como selecionar cada elemento e inseri-lo na posição correta da parte já ordenada, deslocando os elementos maiores para a direita.'
  }
] as CodesBlock[];
