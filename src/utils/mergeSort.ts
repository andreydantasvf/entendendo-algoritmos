import { MergeSortStep, MergeTreeNode } from '@/types/playground';

function cloneTree(node: MergeTreeNode): MergeTreeNode {
  const newNode: MergeTreeNode = { ...node, children: [] };
  if (node.children) {
    newNode.children = node.children.map(cloneTree);
  }
  return newNode;
}

function findNode(tree: MergeTreeNode, id: number): MergeTreeNode | undefined {
  if (tree.id === id) return tree;
  for (const child of tree.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return undefined;
}

export function generateMergeSortSteps(array: number[]): MergeSortStep[] {
  const steps: MergeSortStep[] = [];
  let nodeIdCounter = 0;

  const root: MergeTreeNode = {
    id: nodeIdCounter++,
    array: [...array],
    level: 0,
    children: [],
    isSorted: false,
    isActive: false,
    parent: null
  };

  steps.push({
    type: 'split',
    tree: cloneTree(root),
    description: `Array inicial: [${array.join(', ')}]`
  });

  function split(node: MergeTreeNode) {
    const { array, level } = node;
    if (array.length <= 1) {
      node.isSorted = true;
      return;
    }

    const mid = Math.floor(array.length / 2);
    const leftArray = array.slice(0, mid);
    const rightArray = array.slice(mid);

    const leftChild: MergeTreeNode = {
      id: nodeIdCounter++,
      array: leftArray,
      level: level + 1,
      children: [],
      isSorted: leftArray.length === 1,
      isActive: false,
      parent: node.id
    };

    const rightChild: MergeTreeNode = {
      id: nodeIdCounter++,
      array: rightArray,
      level: level + 1,
      children: [],
      isSorted: rightArray.length === 1,
      isActive: false,
      parent: node.id
    };

    node.children = [leftChild, rightChild];

    const newTree = cloneTree(root);
    const activeNode = findNode(newTree, node.id);
    if (activeNode) {
      activeNode.isActive = true;
    }

    steps.push({
      type: 'split',
      tree: newTree,
      description: `Dividindo nó ${node.id} : [${array.join(
        ', '
      )}] em [${leftArray.join(', ')}] e [${rightArray.join(', ')}]`
    });

    split(leftChild);
    split(rightChild);
  }

  function merge(node: MergeTreeNode): number[] {
    if (node.isSorted) {
      return node.array;
    }

    const [leftChild, rightChild] = node.children;
    const left = merge(leftChild);
    const right = merge(rightChild);

    const merged: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    steps.push({
      type: 'compare',
      tree: cloneTree(root),
      description: `Comparando para mesclar para o nó ${node.id} `
    });

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] <= right[rightIndex]) {
        merged.push(left[leftIndex]);
        leftIndex++;
      } else {
        merged.push(right[rightIndex]);
        rightIndex++;
      }
    }

    const result = merged
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
    node.array = result;
    node.isSorted = true;

    const newTreeMerge = cloneTree(root);
    const mergedNode = findNode(newTreeMerge, node.id);
    if (mergedNode) {
      mergedNode.array = result;
      mergedNode.isSorted = true;
      mergedNode.isActive = true;
    }

    steps.push({
      type: 'merge',
      tree: newTreeMerge,
      description: `Nó ${node.id} mesclado para: [${result.join(', ')}]`
    });

    steps.push({
      type: 'sorted',
      tree: cloneTree(root),
      description: `Nó ${node.id} ordenado.`,
      sortedNodeId: node.id
    });

    return result;
  }

  split(root);
  merge(root);

  steps.push({
    type: 'sorted',
    tree: cloneTree(root),
    description: `Array final ordenado! Array Original: [${array.join(', ')}]`,
    sortedNodeId: root.id
  });

  return steps;
}
