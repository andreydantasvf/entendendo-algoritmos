import { BinarySearchStep } from '@/types/playground';

export function generateBinarySearchSteps(
  array: number[],
  target: number
): BinarySearchStep[] {
  const steps: BinarySearchStep[] = [];
  const sortedArray = [...array].sort((a, b) => a - b);

  let left = 0;
  let right = sortedArray.length - 1;

  // Primeiro passo: inicialização
  steps.push({
    left,
    right,
    mid: Math.floor((left + right) / 2),
    target,
    found: false,
    comparison: null,
    description: `Iniciando busca binária. Array ordenado: [${sortedArray.join(', ')}]. Procurando por ${target}.`
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = sortedArray[mid];

    if (midValue === target) {
      steps.push({
        left,
        right,
        mid,
        target,
        found: true,
        comparison: 'equal',
        description: `Encontrado! ${midValue} na posição ${mid} é igual ao valor procurado ${target}.`
      });
      break;
    } else if (midValue < target) {
      steps.push({
        left,
        right,
        mid,
        target,
        found: false,
        comparison: 'less',
        description: `${midValue} é menor que ${target}. Descartamos a metade esquerda e buscamos na direita.`
      });
      left = mid + 1;
    } else {
      steps.push({
        left,
        right,
        mid,
        target,
        found: false,
        comparison: 'greater',
        description: `${midValue} é maior que ${target}. Descartamos a metade direita e buscamos na esquerda.`
      });
      right = mid - 1;
    }
  }

  // Se não encontrou
  if (left > right && steps[steps.length - 1]?.found === false) {
    steps.push({
      left,
      right,
      mid: -1,
      target,
      found: false,
      comparison: null,
      description: `Valor ${target} não encontrado no array. A busca terminou sem sucesso.`
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
  return array.sort((a, b) => a - b);
}
