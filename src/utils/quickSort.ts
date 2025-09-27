import { QuickSortStep, PivotStrategy } from '@/types/playground';

export function generateQuickSortSteps(
  array: number[],
  pivotStrategy: PivotStrategy = 'last'
): QuickSortStep[] {
  const steps: QuickSortStep[] = [];
  const sortedIndices = new Set<number>();
  const workingArray = [...array]; // Array que será modificado durante a ordenação

  function quickSort(arr: number[], low: number, high: number): void {
    if (low < high) {
      // Escolhe o pivô baseado na estratégia
      const pivotIndex = choosePivot(arr, low, high, pivotStrategy);

      // Move o pivô para o final se necessário
      if (pivotIndex !== high) {
        swap(arr, pivotIndex, high);
        steps.push({
          type: 'swap',
          array: [...arr],
          low,
          high,
          pivotIndex: high,
          i: pivotIndex,
          j: high,
          description: `Movendo pivô ${arr[high]} para o final`,
          highlight: [pivotIndex, high]
        });
      }

      // Particiona o array
      const partitionIndex = partition(arr, low, high, steps);

      // Marca o pivô como ordenado
      sortedIndices.add(partitionIndex);

      steps.push({
        type: 'sorted',
        array: [...arr],
        low,
        high,
        pivotIndex: partitionIndex,
        i: partitionIndex,
        j: partitionIndex,
        description: `Pivô ${arr[partitionIndex]} na posição final`,
        sortedIndices: Array.from(sortedIndices)
      });

      // Ordena recursivamente os subarrays
      quickSort(arr, low, partitionIndex - 1);
      quickSort(arr, partitionIndex + 1, high);
    } else if (low === high) {
      // Array de tamanho 1 está ordenado
      sortedIndices.add(low);
      steps.push({
        type: 'sorted',
        array: [...arr],
        low,
        high,
        pivotIndex: low,
        i: low,
        j: low,
        description: `Elemento ${arr[low]} já está ordenado`,
        sortedIndices: Array.from(sortedIndices)
      });
    }
  }

  function partition(
    arr: number[],
    low: number,
    high: number,
    steps: QuickSortStep[]
  ): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      type: 'partition',
      array: [...arr],
      low,
      high,
      pivotIndex: high,
      i: i,
      j: low,
      description: `Iniciando partição com pivô ${pivot}`,
      highlight: [high]
    });

    for (let j = low; j < high; j++) {
      steps.push({
        type: 'compare',
        array: [...arr],
        low,
        high,
        pivotIndex: high,
        i: i,
        j: j,
        description: `Comparando ${arr[j]} com pivô ${pivot}`,
        highlight: [j, high]
      });

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          swap(arr, i, j);
          steps.push({
            type: 'swap',
            array: [...arr],
            low,
            high,
            pivotIndex: high,
            i: i,
            j: j,
            description: `Trocando ${arr[i]} e ${arr[j]}`,
            highlight: [i, j]
          });
        }
      }
    }

    // Coloca o pivô na posição correta
    swap(arr, i + 1, high);
    steps.push({
      type: 'swap',
      array: [...arr],
      low,
      high,
      pivotIndex: i + 1,
      i: i + 1,
      j: high,
      description: `Colocando pivô ${pivot} na posição ${i + 1}`,
      highlight: [i + 1, high]
    });

    return i + 1;
  }

  function choosePivot(
    arr: number[],
    low: number,
    high: number,
    strategy: PivotStrategy
  ): number {
    let mid = -1;
    let values: number[] = [];
    switch (strategy) {
      case 'first':
        return low;
      case 'last':
        return high;
      case 'random':
        return Math.floor(Math.random() * (high - low + 1)) + low;
      case 'median':
        mid = Math.floor((low + high) / 2);
        values = [arr[low], arr[mid], arr[high]];
        values.sort((a, b) => a - b);
        if (values[1] === arr[low]) return low;
        if (values[1] === arr[mid]) return mid;
        return high;
      default:
        return high;
    }
  }

  function swap(arr: number[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  // Adiciona passo inicial
  steps.push({
    type: 'partition',
    array: [...array],
    low: 0,
    high: array.length - 1,
    pivotIndex: array.length - 1,
    i: -1,
    j: 0,
    description: `Iniciando Quick Sort com array: [${array.join(', ')}]`,
    highlight: []
  });

  quickSort(workingArray, 0, array.length - 1);

  // Adiciona passo final
  steps.push({
    type: 'sorted',
    array: [...workingArray],
    low: 0,
    high: array.length - 1,
    pivotIndex: 0,
    i: 0,
    j: array.length - 1,
    description: `Array completamente ordenado!`,
    sortedIndices: Array.from({ length: array.length }, (_, i) => i)
  });

  return steps;
}
