import { RadixSortStep } from '@/types/playground';

function getDigit(num: number, place: number): number {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function getMaxDigits(arr: number[]): number {
  let maxNum = 0;
  for (let i = 0; i < arr.length; i++) {
    maxNum = Math.max(maxNum, Math.abs(arr[i]));
  }
  return maxNum === 0 ? 1 : Math.floor(Math.log10(maxNum)) + 1;
}

export function generateRadixSortSteps(inputArray: number[]): RadixSortStep[] {
  const steps: RadixSortStep[] = [];
  const n = inputArray.length;

  if (n === 0) return steps;

  // Clonar array para não modificar o original
  const array = [...inputArray];
  const maxDigits = getMaxDigits(array);

  // Estado inicial
  steps.push({
    type: 'distribute',
    array: [...array],
    buckets: Array.from({ length: 10 }, () => []),
    currentDigit: 0,
    currentIndex: -1,
    currentValue: -1,
    maxDigits,
    description: `Iniciando Radix Sort. Array: [${array.join(', ')}]. Número de dígitos: ${maxDigits}`
  });

  // Processar cada dígito, da direita para a esquerda
  for (let digit = 0; digit < maxDigits; digit++) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);

    // Fase 1: Distribuir nos buckets
    steps.push({
      type: 'distribute',
      array: [...array],
      buckets: buckets.map((b) => [...b]),
      currentDigit: digit,
      currentIndex: -1,
      currentValue: -1,
      maxDigits,
      description: `Processando dígito ${digit + 1} (posição ${digit}). Distribuindo elementos nos buckets.`
    });

    for (let i = 0; i < array.length; i++) {
      const digitValue = getDigit(array[i], digit);
      buckets[digitValue].push(array[i]);

      steps.push({
        type: 'distribute',
        array: [...array],
        buckets: buckets.map((b) => [...b]),
        currentDigit: digit,
        currentIndex: i,
        currentValue: array[i],
        maxDigits,
        description: `Elemento ${array[i]}: dígito na posição ${digit} é ${digitValue}. Colocando no bucket ${digitValue}.`,
        highlightArray: [i],
        highlightBucket: digitValue
      });
    }

    // Fase 2: Coletar dos buckets
    steps.push({
      type: 'collect',
      array: [...array],
      buckets: buckets.map((b) => [...b]),
      currentDigit: digit,
      currentIndex: -1,
      currentValue: -1,
      maxDigits,
      description: `Coletando elementos dos buckets na ordem para formar novo array.`
    });

    let arrayIndex = 0;
    for (let bucketIndex = 0; bucketIndex < 10; bucketIndex++) {
      for (let i = 0; i < buckets[bucketIndex].length; i++) {
        array[arrayIndex] = buckets[bucketIndex][i];

        steps.push({
          type: 'collect',
          array: [...array],
          buckets: buckets.map((b) => [...b]),
          currentDigit: digit,
          currentIndex: arrayIndex,
          currentValue: buckets[bucketIndex][i],
          maxDigits,
          description: `Coletando ${buckets[bucketIndex][i]} do bucket ${bucketIndex} para posição ${arrayIndex}.`,
          highlightArray: [arrayIndex],
          highlightBucket: bucketIndex
        });

        arrayIndex++;
      }
    }

    steps.push({
      type: 'collect',
      array: [...array],
      buckets: Array.from({ length: 10 }, () => []),
      currentDigit: digit,
      currentIndex: -1,
      currentValue: -1,
      maxDigits,
      description: `Dígito ${digit + 1} processado. Array atual: [${array.join(', ')}]`
    });
  }

  // Estado final
  steps.push({
    type: 'complete',
    array: [...array],
    buckets: Array.from({ length: 10 }, () => []),
    currentDigit: maxDigits - 1,
    currentIndex: -1,
    currentValue: -1,
    maxDigits,
    description: `Ordenação completa! Array ordenado: [${array.join(', ')}]`
  });

  return steps;
}
