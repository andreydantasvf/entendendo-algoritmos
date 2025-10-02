import { BubbleSortStep } from '@/types/playground';

export function generateBubbleSortSteps(array: number[]): BubbleSortStep[] {
  const steps: BubbleSortStep[] = [];
  const sortedIndices = new Set<number>();
  const workingArray = [...array];

  function bubbleSort(arr: number[]): void {
    const n = arr.length;
    let swapped;

    for (let pass = 0; pass < n - 1; pass++) {
      swapped = false;

      steps.push({
        type: 'pass',
        array: [...arr],
        pass: pass + 1,
        currentIndex: 0,
        nextIndex: 1,
        description: `Iniciando passada ${pass + 1} de ${n - 1}`,
        highlight: [],
        sortedIndices: Array.from(sortedIndices)
      });

      // Compara elementos adjacentes
      for (let j = 0; j < n - pass - 1; j++) {
        steps.push({
          type: 'compare',
          array: [...arr],
          pass: pass + 1,
          currentIndex: j,
          nextIndex: j + 1,
          description: `Comparando ${arr[j]} com ${arr[j + 1]}`,
          highlight: [j, j + 1],
          sortedIndices: Array.from(sortedIndices)
        });

        // Se o elemento atual é maior que o próximo, troca
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
          swapped = true;

          steps.push({
            type: 'swap',
            array: [...arr],
            pass: pass + 1,
            currentIndex: j,
            nextIndex: j + 1,
            description: `Trocando ${arr[j + 1]} e ${arr[j]} - ${arr[j]} > ${arr[j + 1]}`,
            highlight: [j, j + 1],
            sortedIndices: Array.from(sortedIndices)
          });
        } else {
          steps.push({
            type: 'compare',
            array: [...arr],
            pass: pass + 1,
            currentIndex: j,
            nextIndex: j + 1,
            description: `Não trocando - ${arr[j]} <= ${arr[j + 1]}`,
            highlight: [j, j + 1],
            sortedIndices: Array.from(sortedIndices)
          });
        }
      }

      // Marca o último elemento da passada como ordenado
      const sortedIndex = n - pass - 1;
      sortedIndices.add(sortedIndex);

      steps.push({
        type: 'sorted',
        array: [...arr],
        pass: pass + 1,
        currentIndex: sortedIndex,
        nextIndex: sortedIndex,
        description: `Elemento ${arr[sortedIndex]} na posição final após passada ${pass + 1}`,
        highlight: [sortedIndex],
        sortedIndices: Array.from(sortedIndices)
      });

      // Se não houve trocas nesta passada, o array está ordenado
      if (!swapped) {
        steps.push({
          type: 'pass',
          array: [...arr],
          pass: pass + 1,
          currentIndex: 0,
          nextIndex: 1,
          description: `Nenhuma troca na passada ${pass + 1} - array ordenado!`,
          highlight: [],
          sortedIndices: Array.from(sortedIndices)
        });
        break;
      }
    }

    // Marca todos os elementos restantes como ordenados
    for (let i = 0; i < n; i++) {
      if (!sortedIndices.has(i)) {
        sortedIndices.add(i);
      }
    }
  }

  function swap(arr: number[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  // Adiciona passo inicial
  steps.push({
    type: 'pass',
    array: [...workingArray],
    pass: 0,
    currentIndex: 0,
    nextIndex: 1,
    description: `Iniciando Bubble Sort com array: [${workingArray.join(', ')}]`,
    highlight: [],
    sortedIndices: []
  });

  bubbleSort(workingArray);

  // Adiciona passo final
  steps.push({
    type: 'sorted',
    array: [...workingArray],
    pass: 0,
    currentIndex: 0,
    nextIndex: 0,
    description: `Array completamente ordenado!`,
    highlight: [],
    sortedIndices: Array.from({ length: workingArray.length }, (_, i) => i)
  });

  return steps;
}
