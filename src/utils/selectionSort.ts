import { SelectionSortStep } from '@/types/playground';

export function generateSelectionSortSteps(
  array: number[]
): SelectionSortStep[] {
  const steps: SelectionSortStep[] = [];
  const sortedIndices = new Set<number>();
  const workingArray = [...array];

  function selectionSort(arr: number[]): void {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      steps.push({
        type: 'select',
        array: [...arr],
        currentIndex: i,
        minIndex: i,
        comparingIndex: i,
        description: `Iniciando busca pelo menor elemento a partir da posição ${i}`,
        highlight: [i],
        sortedIndices: Array.from(sortedIndices)
      });

      // Busca pelo menor elemento
      for (let j = i + 1; j < n; j++) {
        steps.push({
          type: 'compare',
          array: [...arr],
          currentIndex: i,
          minIndex: minIndex,
          comparingIndex: j,
          description: `Comparando ${arr[j]} com ${arr[minIndex]} (menor atual)`,
          highlight: [i, minIndex, j],
          sortedIndices: Array.from(sortedIndices)
        });

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          steps.push({
            type: 'select',
            array: [...arr],
            currentIndex: i,
            minIndex: minIndex,
            comparingIndex: j,
            description: `Novo menor elemento encontrado: ${arr[minIndex]} na posição ${minIndex}`,
            highlight: [i, minIndex],
            sortedIndices: Array.from(sortedIndices)
          });
        }
      }

      // Troca se necessário
      if (minIndex !== i) {
        swap(arr, i, minIndex);
        steps.push({
          type: 'swap',
          array: [...arr],
          currentIndex: i,
          minIndex: minIndex,
          comparingIndex: i,
          description: `Trocando ${arr[i]} (posição ${i}) com ${arr[minIndex]} (posição ${minIndex})`,
          highlight: [i, minIndex],
          sortedIndices: Array.from(sortedIndices)
        });
      } else {
        steps.push({
          type: 'swap',
          array: [...arr],
          currentIndex: i,
          minIndex: minIndex,
          comparingIndex: i,
          description: `Elemento ${arr[i]} já está na posição correta`,
          highlight: [i],
          sortedIndices: Array.from(sortedIndices)
        });
      }

      // Marca como ordenado
      sortedIndices.add(i);
      steps.push({
        type: 'sorted',
        array: [...arr],
        currentIndex: i,
        minIndex: i,
        comparingIndex: i,
        description: `Posição ${i} ordenada com elemento ${arr[i]}`,
        highlight: [i],
        sortedIndices: Array.from(sortedIndices)
      });
    }

    // Marca o último elemento como ordenado
    sortedIndices.add(n - 1);
    steps.push({
      type: 'sorted',
      array: [...arr],
      currentIndex: n - 1,
      minIndex: n - 1,
      comparingIndex: n - 1,
      description: `Último elemento ${arr[n - 1]} já está ordenado`,
      highlight: [n - 1],
      sortedIndices: Array.from(sortedIndices)
    });
  }

  function swap(arr: number[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  // Adiciona passo inicial
  steps.push({
    type: 'select',
    array: [...workingArray],
    currentIndex: 0,
    minIndex: 0,
    comparingIndex: 0,
    description: `Iniciando Selection Sort com array: [${workingArray.join(', ')}]`,
    highlight: [],
    sortedIndices: []
  });

  selectionSort(workingArray);

  // Adiciona passo final
  steps.push({
    type: 'sorted',
    array: [...workingArray],
    currentIndex: 0,
    minIndex: 0,
    comparingIndex: 0,
    description: `Array completamente ordenado!`,
    highlight: [],
    sortedIndices: Array.from({ length: workingArray.length }, (_, i) => i)
  });

  return steps;
}
