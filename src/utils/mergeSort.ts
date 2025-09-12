import { MergeSortStep, MergeTreeNode } from '@/types/playground';

export function generateMergeSortSteps(array: number[]): MergeSortStep[] {
  const steps: MergeSortStep[] = [];

  // Função para criar uma árvore de divisão
  function createMergeTree(arr: number[], level: number = 0): MergeTreeNode {
    const node: MergeTreeNode = {
      array: [...arr],
      level,
      isActive: false,
      isComplete: false
    };

    if (arr.length <= 1) {
      node.isComplete = true;
      return node;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    node.left = createMergeTree(left, level + 1);
    node.right = createMergeTree(right, level + 1);

    return node;
  }

  // Função para gerar os passos de divisão
  function generateSplitSteps(node: MergeTreeNode, tree: MergeTreeNode) {
    if (node.array.length <= 1) return;

    // Marcar o nó atual como ativo
    const activeTree = JSON.parse(JSON.stringify(tree));
    markNodeActive(activeTree, node.array);

    steps.push({
      type: 'split',
      level: node.level,
      leftArray: node.left?.array,
      rightArray: node.right?.array,
      description: `Dividindo array [${node.array.join(', ')}] em dois sub-arrays: [${node.left?.array.join(', ')}] e [${node.right?.array.join(', ')}]`,
      isComplete: false,
      tree: activeTree
    });

    if (node.left) generateSplitSteps(node.left, tree);
    if (node.right) generateSplitSteps(node.right, tree);
  }

  // Função para gerar os passos de mesclagem
  function generateMergeSteps(
    node: MergeTreeNode,
    tree: MergeTreeNode
  ): number[] {
    if (node.array.length <= 1) {
      return node.array;
    }

    // Recursão para os filhos primeiro
    const leftSorted = node.left ? generateMergeSteps(node.left, tree) : [];
    const rightSorted = node.right ? generateMergeSteps(node.right, tree) : [];

    // Agora mesclar os arrays ordenados
    return merge(leftSorted, rightSorted, tree, node.level);
  }

  // Função para mesclar dois arrays ordenados
  function merge(
    left: number[],
    right: number[],
    tree: MergeTreeNode,
    level: number
  ): number[] {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Passo inicial da mesclagem
    steps.push({
      type: 'merge',
      level,
      currentMerge: {
        left: [...left],
        right: [...right],
        result: [],
        leftIndex: 0,
        rightIndex: 0,
        comparing: false
      },
      description: `Iniciando mesclagem dos arrays [${left.join(', ')}] e [${right.join(', ')}]`,
      isComplete: false,
      tree: JSON.parse(JSON.stringify(tree))
    });

    while (leftIndex < left.length && rightIndex < right.length) {
      // Passo de comparação
      steps.push({
        type: 'compare',
        level,
        currentMerge: {
          left: [...left],
          right: [...right],
          result: [...result],
          leftIndex,
          rightIndex,
          comparing: true
        },
        description: `Comparando ${left[leftIndex]} (esquerda) com ${right[rightIndex]} (direita)`,
        isComplete: false,
        tree: JSON.parse(JSON.stringify(tree))
      });

      // Passo de movimento
      if (left[leftIndex] <= right[rightIndex]) {
        result.push(left[leftIndex]);
        steps.push({
          type: 'move',
          level,
          currentMerge: {
            left: [...left],
            right: [...right],
            result: [...result],
            leftIndex: leftIndex + 1,
            rightIndex,
            comparing: false
          },
          description: `${left[leftIndex]} é menor ou igual. Movendo para o resultado.`,
          isComplete: false,
          tree: JSON.parse(JSON.stringify(tree))
        });
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        steps.push({
          type: 'move',
          level,
          currentMerge: {
            left: [...left],
            right: [...right],
            result: [...result],
            leftIndex,
            rightIndex: rightIndex + 1,
            comparing: false
          },
          description: `${right[rightIndex]} é menor. Movendo para o resultado.`,
          isComplete: false,
          tree: JSON.parse(JSON.stringify(tree))
        });
        rightIndex++;
      }
    }

    // Adicionar elementos restantes
    while (leftIndex < left.length) {
      result.push(left[leftIndex]);
      steps.push({
        type: 'move',
        level,
        currentMerge: {
          left: [...left],
          right: [...right],
          result: [...result],
          leftIndex: leftIndex + 1,
          rightIndex,
          comparing: false
        },
        description: `Adicionando elemento restante ${left[leftIndex]} da esquerda`,
        isComplete: false,
        tree: JSON.parse(JSON.stringify(tree))
      });
      leftIndex++;
    }

    while (rightIndex < right.length) {
      result.push(right[rightIndex]);
      steps.push({
        type: 'move',
        level,
        currentMerge: {
          left: [...left],
          right: [...right],
          result: [...result],
          leftIndex,
          rightIndex: rightIndex + 1,
          comparing: false
        },
        description: `Adicionando elemento restante ${right[rightIndex]} da direita`,
        isComplete: false,
        tree: JSON.parse(JSON.stringify(tree))
      });
      rightIndex++;
    }

    return result;
  }

  // Função auxiliar para marcar um nó como ativo na árvore
  function markNodeActive(tree: MergeTreeNode, targetArray: number[]) {
    if (arraysEqual(tree.array, targetArray)) {
      tree.isActive = true;
      return;
    }
    if (tree.left) markNodeActive(tree.left, targetArray);
    if (tree.right) markNodeActive(tree.right, targetArray);
  }

  // Função auxiliar para comparar arrays
  function arraysEqual(a: number[], b: number[]): boolean {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  }

  // Gerar a árvore completa
  const tree = createMergeTree(array);

  // Gerar passos de divisão
  generateSplitSteps(tree, tree);

  // Gerar passos de mesclagem
  generateMergeSteps(tree, tree);

  // Marcar o último passo como completo
  if (steps.length > 0) {
    steps[steps.length - 1].isComplete = true;
    steps[steps.length - 1].description =
      'Algoritmo concluído! Array completamente ordenado.';
  }

  return steps;
}

// Função utilitária para executar merge sort (sem visualização)
export function mergeSort(array: number[]): number[] {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
