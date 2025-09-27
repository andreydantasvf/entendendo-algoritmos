import { type CodesBlock } from '@/types/code-block';

const javascriptCode = `
  function mergeSort(arr) {
      if (arr.length <= 1) {
          return arr;
      }

      const meio = Math.floor(arr.length / 2);
      const esquerda = arr.slice(0, meio);
      const direita = arr.slice(meio);

      const esquerdaOrdenada = mergeSort(esquerda);
      const direitaOrdenada = mergeSort(direita);

      return merge(esquerdaOrdenada, direitaOrdenada);
  }

  function merge(esquerda, direita) {
      let resultado = [];
      let i = 0;
      let j = 0;

      while (i < esquerda.length && j < direita.length) {
          if (esquerda[i] < direita[j]) {
              resultado.push(esquerda[i]);
              i++;
          } else {
              resultado.push(direita[j]);
              j++;
          }
      }

      // Adiciona os elementos restantes (se houver)
      return resultado.concat(esquerda.slice(i)).concat(direita.slice(j));
  }

  // Exemplo de Uso em JavaScript
  const dados = [38, 27, 43, 3, 9, 82, 10];
  const ordenados = mergeSort(dados);
  console.log(\`Lista original: [38, 27, 43, 3, 9, 82, 10]\`);
  console.log(\`Lista ordenada: \${ordenados}\`);
`;

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
