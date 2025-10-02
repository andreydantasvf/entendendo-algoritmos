import { InsertionSortStep } from '@/types/playground';

export function generateInsertionSortSteps(
  array: number[]
): InsertionSortStep[] {
  const steps: InsertionSortStep[] = [];
  const sortedIndices = new Set<number>();
  const workingArray = [...array];

  function insertionSort(arr: number[]): void {
    const n = arr.length;

    // O primeiro elemento já está "ordenado"
    sortedIndices.add(0);

    for (let i = 1; i < n; i++) {
      const key = arr[i];

      steps.push({
        type: 'select',
        array: [...arr],
        currentIndex: i,
        key: key,
        comparingIndex: i,
        description: `Selecionando elemento ${key} na posição ${i} para inserir na parte ordenada`,
        highlight: [i],
        sortedIndices: Array.from(sortedIndices)
      });

      let j = i - 1;

      // Move elementos maiores que key para uma posição à frente
      while (j >= 0 && arr[j] > key) {
        steps.push({
          type: 'compare',
          array: [...arr],
          currentIndex: i,
          key: key,
          comparingIndex: j,
          description: `Comparando ${key} com ${arr[j]} - ${arr[j]} > ${key}, deslocando ${arr[j]} para direita`,
          highlight: [j, j + 1],
          sortedIndices: Array.from(sortedIndices)
        });

        arr[j + 1] = arr[j];

        steps.push({
          type: 'shift',
          array: [...arr],
          currentIndex: i,
          key: key,
          comparingIndex: j,
          description: `Deslocando ${arr[j]} da posição ${j} para ${j + 1}`,
          highlight: [j, j + 1],
          sortedIndices: Array.from(sortedIndices)
        });

        j--;
      }

      // Se j >= 0, mostra a comparação que não resultou em deslocamento
      if (j >= 0) {
        steps.push({
          type: 'compare',
          array: [...arr],
          currentIndex: i,
          key: key,
          comparingIndex: j,
          description: `Comparando ${key} com ${arr[j]} - ${arr[j]} <= ${key}, encontramos a posição!`,
          highlight: [j, j + 1],
          sortedIndices: Array.from(sortedIndices)
        });
      }

      // Insere a chave na posição correta
      arr[j + 1] = key;

      steps.push({
        type: 'insert',
        array: [...arr],
        currentIndex: i,
        key: key,
        comparingIndex: j + 1,
        description: `Inserindo ${key} na posição ${j + 1}`,
        highlight: [j + 1],
        sortedIndices: Array.from(sortedIndices)
      });

      // Marca elemento como ordenado
      sortedIndices.add(i);

      steps.push({
        type: 'sorted',
        array: [...arr],
        currentIndex: i,
        key: key,
        comparingIndex: j + 1,
        description: `Primeiros ${i + 1} elementos agora estão ordenados`,
        highlight: [],
        sortedIndices: Array.from(sortedIndices)
      });
    }
  }

  // Adiciona passo inicial
  steps.push({
    type: 'sorted',
    array: [...workingArray],
    currentIndex: 0,
    key: workingArray[0],
    comparingIndex: 0,
    description: `Iniciando Insertion Sort com array: [${workingArray.join(', ')}] - Primeiro elemento já está "ordenado"`,
    highlight: [0],
    sortedIndices: [0]
  });

  insertionSort(workingArray);

  // Adiciona passo final
  steps.push({
    type: 'sorted',
    array: [...workingArray],
    currentIndex: workingArray.length - 1,
    key: workingArray[workingArray.length - 1],
    comparingIndex: workingArray.length - 1,
    description: `Array completamente ordenado!`,
    highlight: [],
    sortedIndices: Array.from({ length: workingArray.length }, (_, i) => i)
  });

  return steps;
}
