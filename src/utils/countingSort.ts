import { CountingSortStep } from '@/types/playground';

export function generateCountingSortSteps(
  inputArray: number[]
): CountingSortStep[] {
  const steps: CountingSortStep[] = [];
  const n = inputArray.length;

  if (n === 0) return steps;

  // Encontrar valores mínimo e máximo
  const minValue = Math.min(...inputArray);
  const maxValue = Math.max(...inputArray);
  const range = maxValue - minValue + 1;

  // Inicializar arrays
  const countArray = new Array(range).fill(0);
  const outputArray = new Array(n).fill(-1);

  // Estado inicial
  steps.push({
    type: 'count',
    inputArray: [...inputArray],
    countArray: [...countArray],
    outputArray: [...outputArray],
    currentIndex: -1,
    currentValue: -1,
    minValue,
    maxValue,
    description: `Iniciando Counting Sort. Array de entrada: [${inputArray.join(', ')}]. Range: ${minValue} a ${maxValue}`
  });

  // Fase 1: Contar ocorrências
  for (let i = 0; i < n; i++) {
    const value = inputArray[i];
    const countIndex = value - minValue;
    countArray[countIndex]++;

    steps.push({
      type: 'count',
      inputArray: [...inputArray],
      countArray: [...countArray],
      outputArray: [...outputArray],
      currentIndex: i,
      currentValue: value,
      minValue,
      maxValue,
      description: `Contando ${value}: incrementando posição ${countIndex} do array de contagem (count[${countIndex}] = ${countArray[countIndex]})`,
      highlightInput: [i],
      highlightCount: [countIndex]
    });
  }

  // Fase 2: Acumular contagens (prefixo)
  steps.push({
    type: 'accumulate',
    inputArray: [...inputArray],
    countArray: [...countArray],
    outputArray: [...outputArray],
    currentIndex: -1,
    currentValue: -1,
    minValue,
    maxValue,
    description:
      'Iniciando fase de acumulação: transformando contagens em posições finais'
  });

  for (let i = 1; i < range; i++) {
    countArray[i] += countArray[i - 1];

    steps.push({
      type: 'accumulate',
      inputArray: [...inputArray],
      countArray: [...countArray],
      outputArray: [...outputArray],
      currentIndex: i,
      currentValue: -1,
      minValue,
      maxValue,
      description: `Acumulando: count[${i}] = count[${i}] + count[${i - 1}] = ${countArray[i]}`,
      highlightCount: [i - 1, i]
    });
  }

  // Fase 3: Construir array de saída (de trás para frente para estabilidade)
  steps.push({
    type: 'place',
    inputArray: [...inputArray],
    countArray: [...countArray],
    outputArray: [...outputArray],
    currentIndex: -1,
    currentValue: -1,
    minValue,
    maxValue,
    description:
      'Iniciando fase de colocação: inserindo elementos no array ordenado'
  });

  for (let i = n - 1; i >= 0; i--) {
    const value = inputArray[i];
    const countIndex = value - minValue;
    const outputIndex = countArray[countIndex] - 1;
    outputArray[outputIndex] = value;
    countArray[countIndex]--;

    steps.push({
      type: 'place',
      inputArray: [...inputArray],
      countArray: [...countArray],
      outputArray: [...outputArray],
      currentIndex: i,
      currentValue: value,
      minValue,
      maxValue,
      description: `Colocando ${value} na posição ${outputIndex} do array de saída. Decrementando count[${countIndex}] para ${countArray[countIndex]}`,
      highlightInput: [i],
      highlightCount: [countIndex],
      highlightOutput: [outputIndex]
    });
  }

  // Estado final
  steps.push({
    type: 'complete',
    inputArray: [...inputArray],
    countArray: [...countArray],
    outputArray: [...outputArray],
    currentIndex: -1,
    currentValue: -1,
    minValue,
    maxValue,
    description: `Ordenação completa! Array ordenado: [${outputArray.join(', ')}]`
  });

  return steps;
}
