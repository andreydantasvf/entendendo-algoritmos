import { type CodesBlock } from '@/types/code-block';

const javascriptCode = `
  function countingSort(arr) {
      const n = arr.length;
      if (n === 0) return arr;

      // Encontrar valores mínimo e máximo
      const minValue = Math.min(...arr);
      const maxValue = Math.max(...arr);
      const range = maxValue - minValue + 1;

      // Criar array de contagem
      const count = new Array(range).fill(0);
      const output = new Array(n);

      // Fase 1: Contar ocorrências de cada elemento
      for (let i = 0; i < n; i++) {
          count[arr[i] - minValue]++;
      }

      // Fase 2: Acumular contagens (soma prefixada)
      for (let i = 1; i < range; i++) {
          count[i] += count[i - 1];
      }

      // Fase 3: Construir array de saída (de trás para frente para estabilidade)
      for (let i = n - 1; i >= 0; i--) {
          const value = arr[i];
          const index = value - minValue;
          output[count[index] - 1] = value;
          count[index]--;
      }

      return output;
  }

  // Exemplo de Uso em JavaScript
  const dados = [4, 2, 2, 8, 3, 3, 1];
  const ordenados = countingSort([...dados]);
  console.log(\`Lista original: [\${dados.join(', ')}]\`);
  console.log(\`Lista ordenada: [\${ordenados.join(', ')}]\`);
  
  // Exemplo com valores negativos
  const dadosNegativos = [5, -2, 3, -1, 0, 4];
  const ordenadosNegativos = countingSort([...dadosNegativos]);
  console.log(\`Lista com negativos: [\${dadosNegativos.join(', ')}]\`);
  console.log(\`Lista ordenada: [\${ordenadosNegativos.join(', ')}]\`);
`;

export const javascriptImplementations = [
  {
    code: javascriptCode,
    language: 'javascript',
    tabTitle: 'JavaScript',
    tabValue: 'js-basic',
    title: 'Implementação do Counting Sort - JavaScript',
    description:
      'Implementação completa e didática do algoritmo Counting Sort. Este código demonstra as três fases principais: contagem de ocorrências, acumulação de contagens e construção do array ordenado. O algoritmo é estável e funciona com valores negativos.'
  }
] as CodesBlock[];
