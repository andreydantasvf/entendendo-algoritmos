import { Graph, DFSStep } from '@/types/playground';

// Grafos pré-definidos (mesmos da BFS para comparação)
export const predefinedGraphs: Record<'tree' | 'cycle' | 'complex', Graph> = {
  tree: {
    nodes: [
      { id: 'A', label: 'A', x: 250, y: 50 },
      { id: 'B', label: 'B', x: 150, y: 150 },
      { id: 'C', label: 'C', x: 350, y: 150 },
      { id: 'D', label: 'D', x: 100, y: 250 },
      { id: 'E', label: 'E', x: 200, y: 250 },
      { id: 'F', label: 'F', x: 300, y: 250 },
      { id: 'G', label: 'G', x: 400, y: 250 }
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'B', to: 'E' },
      { from: 'C', to: 'F' },
      { from: 'C', to: 'G' }
    ]
  },
  cycle: {
    nodes: [
      { id: 'A', label: 'A', x: 250, y: 50 },
      { id: 'B', label: 'B', x: 100, y: 150 },
      { id: 'C', label: 'C', x: 400, y: 150 },
      { id: 'D', label: 'D', x: 150, y: 300 },
      { id: 'E', label: 'E', x: 350, y: 300 },
      { id: 'F', label: 'F', x: 250, y: 200 }
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'E' },
      { from: 'D', to: 'F' },
      { from: 'E', to: 'F' },
      { from: 'F', to: 'B' } // Cria ciclo
    ]
  },
  complex: {
    nodes: [
      { id: 'A', label: 'A', x: 250, y: 50 },
      { id: 'B', label: 'B', x: 100, y: 150 },
      { id: 'C', label: 'C', x: 250, y: 150 },
      { id: 'D', label: 'D', x: 400, y: 150 },
      { id: 'E', label: 'E', x: 150, y: 280 },
      { id: 'F', label: 'F', x: 300, y: 280 },
      { id: 'G', label: 'G', x: 450, y: 280 }
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'A', to: 'D' },
      { from: 'B', to: 'E' },
      { from: 'C', to: 'E' },
      { from: 'C', to: 'F' },
      { from: 'D', to: 'F' },
      { from: 'D', to: 'G' },
      { from: 'E', to: 'F' }
    ]
  }
};

// Constrói lista de adjacências a partir do grafo
function buildAdjacencyList(graph: Graph): Map<string, string[]> {
  const adjacencyList = new Map<string, string[]>();

  // Inicializa com todos os nós
  graph.nodes.forEach((node) => {
    adjacencyList.set(node.id, []);
  });

  // Adiciona as arestas (grafo não-direcionado)
  graph.edges.forEach((edge) => {
    adjacencyList.get(edge.from)?.push(edge.to);
    adjacencyList.get(edge.to)?.push(edge.from);
  });

  return adjacencyList;
}

// Reconstrói o caminho do início ao alvo
function reconstructPath(
  parent: Map<string, string | null>,
  start: string,
  target: string
): string[] {
  const path: string[] = [];
  let current: string | null = target;

  while (current !== null) {
    path.unshift(current);
    current = parent.get(current) || null;
  }

  return path[0] === start ? path : [];
}

// Gera os passos da busca em profundidade
export function generateDFSSteps(
  graph: Graph,
  start: string,
  target: string
): DFSStep[] {
  const steps: DFSStep[] = [];
  const adjacencyList = buildAdjacencyList(graph);
  const visited = new Set<string>();
  const stack: string[] = [start];
  const parent = new Map<string, string | null>();
  parent.set(start, null);

  // Passo inicial
  steps.push({
    type: 'start',
    currentNode: start,
    stack: [...stack],
    visited: [],
    exploring: [],
    path: [],
    targetFound: false,
    description: `Iniciando DFS no nó ${start}. Pilha inicializada com o nó inicial.`
  });

  while (stack.length > 0) {
    // Remove o último nó da pilha (LIFO)
    const current = stack.pop()!;

    // Se já foi visitado, backtrack
    if (visited.has(current)) {
      steps.push({
        type: 'backtrack',
        currentNode: current,
        stack: [...stack],
        visited: Array.from(visited),
        exploring: [],
        path: [],
        targetFound: false,
        description: `Nó ${current} já foi visitado. Fazendo backtrack.`
      });
      continue;
    }

    // Marca como visitado
    visited.add(current);

    steps.push({
      type: 'pop',
      currentNode: current,
      stack: [...stack],
      visited: Array.from(visited),
      exploring: [],
      path: [],
      targetFound: false,
      description: `Removendo ${current} da pilha (LIFO) e visitando.`
    });

    // Verifica se encontrou o alvo
    if (current === target) {
      const finalPath = reconstructPath(parent, start, target);
      steps.push({
        type: 'found',
        currentNode: current,
        stack: [...stack],
        visited: Array.from(visited),
        exploring: [],
        path: finalPath,
        targetFound: true,
        description: `Alvo ${target} encontrado! Caminho: ${finalPath.join(' → ')}`
      });
      break;
    }

    // Explora os vizinhos (em ordem reversa para manter a ordem esperada na pilha)
    const neighbors = adjacencyList.get(current) || [];
    const unvisitedNeighbors = neighbors.filter((n) => !visited.has(n));

    if (unvisitedNeighbors.length > 0) {
      steps.push({
        type: 'explore',
        currentNode: current,
        stack: [...stack],
        visited: Array.from(visited),
        exploring: unvisitedNeighbors,
        path: [],
        targetFound: false,
        description: `Explorando vizinhos de ${current}: ${unvisitedNeighbors.join(', ')}`
      });

      // Adiciona os vizinhos não visitados à pilha (em ordem reversa)
      for (let i = unvisitedNeighbors.length - 1; i >= 0; i--) {
        const neighbor = unvisitedNeighbors[i];
        if (!parent.has(neighbor)) {
          parent.set(neighbor, current);
          stack.push(neighbor);
        }
      }

      steps.push({
        type: 'push',
        currentNode: current,
        stack: [...stack],
        visited: Array.from(visited),
        exploring: unvisitedNeighbors,
        path: [],
        targetFound: false,
        description: `Adicionando vizinhos à pilha: ${unvisitedNeighbors.join(', ')}`
      });
    } else {
      steps.push({
        type: 'visit',
        currentNode: current,
        stack: [...stack],
        visited: Array.from(visited),
        exploring: [],
        path: [],
        targetFound: false,
        description: `Nó ${current} não possui vizinhos não visitados. Continuando...`
      });
    }
  }

  // Se não encontrou o alvo
  if (!visited.has(target)) {
    steps.push({
      type: 'complete',
      currentNode: null,
      stack: [],
      visited: Array.from(visited),
      exploring: [],
      path: [],
      targetFound: false,
      description: `Busca completa. Alvo ${target} não encontrado no grafo.`
    });
  }

  return steps;
}
