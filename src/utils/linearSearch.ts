import { LinearSearchStep } from '@/types/playground';

export function generateLinearSearchSteps(
  array: number[],
  target: number
): LinearSearchStep[] {
  const steps: LinearSearchStep[] = [];

  // Primeiro passo: inicialização
  steps.push({
    currentIndex: -1,
    target,
    found: false,
    comparison: null,
    comparisons: 0,
    description: `Iniciando busca linear. Array: [${array.join(', ')}]. Procurando por ${target}. Vamos verificar cada elemento da esquerda para a direita.`
  });

  // Percorre o array elemento por elemento
  for (let i = 0; i < array.length; i++) {
    const currentValue = array[i];

    if (currentValue === target) {
      // Encontrou o elemento
      steps.push({
        currentIndex: i,
        target,
        found: true,
        comparison: 'equal',
        comparisons: i + 1,
        description: `Encontrado! O elemento ${currentValue} na posição ${i} é igual ao valor procurado ${target}. Total de comparações: ${i + 1}.`
      });
      break;
    } else {
      // Não é o elemento procurado
      steps.push({
        currentIndex: i,
        target,
        found: false,
        comparison: 'not-equal',
        comparisons: i + 1,
        description: `Posição ${i}: ${currentValue} ≠ ${target}. Continuando para o próximo elemento...`
      });
    }
  }

  // Se não encontrou
  const lastStep = steps[steps.length - 1];
  if (!lastStep.found) {
    steps.push({
      currentIndex: array.length,
      target,
      found: false,
      comparison: null,
      comparisons: array.length,
      description: `Valor ${target} não encontrado no array. Todos os ${array.length} elementos foram verificados.`
    });
  }

  return steps;
}

export function parseArrayInput(input: string): number[] {
  try {
    return input
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '')
      .map((s) => parseInt(s, 10))
      .filter((n) => !isNaN(n));
  } catch {
    return [];
  }
}

export function generateRandomArray(
  size: number = 10,
  max: number = 100
): number[] {
  const array: number[] = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * max) + 1);
  }
  return array; // Não ordenamos para busca linear
}
