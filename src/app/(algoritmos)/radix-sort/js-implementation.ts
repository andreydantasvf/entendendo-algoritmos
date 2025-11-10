import { type CodesBlock } from '@/types/code-block';

const javascriptCode = `
  function getDigit(num, place) {
      return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
  }

  function getMaxDigits(arr) {
      let maxNum = 0;
      for (let i = 0; i < arr.length; i++) {
          maxNum = Math.max(maxNum, Math.abs(arr[i]));
      }
      return maxNum === 0 ? 1 : Math.floor(Math.log10(maxNum)) + 1;
  }

  function radixSort(arr) {
      const maxDigits = getMaxDigits(arr);

      // Processar cada dígito, da direita para a esquerda
      for (let digit = 0; digit < maxDigits; digit++) {
          // Criar 10 buckets (0-9)
          const buckets = Array.from({ length: 10 }, () => []);

          // Distribuir elementos nos buckets baseado no dígito atual
          for (let i = 0; i < arr.length; i++) {
              const digitValue = getDigit(arr[i], digit);
              buckets[digitValue].push(arr[i]);
          }

          // Coletar elementos dos buckets na ordem
          arr = buckets.flat();
      }

      return arr;
  }

  // Exemplo de Uso em JavaScript
  const dados = [170, 45, 75, 90, 802, 24, 2, 66];
  const ordenados = radixSort([...dados]);
  console.log(\`Lista original: [\${dados.join(', ')}]\`);
  console.log(\`Lista ordenada: [\${ordenados.join(', ')}]\`);

  // Exemplo com números menores
  const dados2 = [329, 457, 657, 839, 436, 720, 355];
  const ordenados2 = radixSort([...dados2]);
  console.log(\`Lista original: [\${dados2.join(', ')}]\`);
  console.log(\`Lista ordenada: [\${ordenados2.join(', ')}]\`);
`;

export const javascriptImplementations = [
  {
    code: javascriptCode,
    language: 'javascript',
    tabTitle: 'JavaScript',
    tabValue: 'js-basic',
    title: 'Implementação do Radix Sort - JavaScript',
    description:
      'Implementação completa e didática do algoritmo Radix Sort. Este código demonstra como distribuir elementos em buckets baseado em cada dígito e depois coletar os elementos na ordem. O algoritmo processa os dígitos da direita para a esquerda (LSD - Least Significant Digit).'
  }
] as CodesBlock[];
