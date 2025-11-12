import { Graph, BFSStep } from '@/types/playground';

// Grafos pré-definidos
export const predefinedGraphs: { [key: string]: Graph } = {
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
      { id: 'B', label: 'B', x: 400, y: 150 },
      { id: 'C', label: 'C', x: 350, y: 300 },
      { id: 'D', label: 'D', x: 150, y: 300 },
      { id: 'E', label: 'E', x: 100, y: 150 },
      { id: 'F', label: 'F', x: 250, y: 200 }
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'D' },
      { from: 'D', to: 'E' },
      { from: 'E', to: 'A' },
      { from: 'A', to: 'F' },
      { from: 'F', to: 'C' }
    ]
  },
  complex: {
    nodes: [
      { id: 'A', label: 'A', x: 100, y: 100 },
      { id: 'B', label: 'B', x: 250, y: 50 },
      { id: 'C', label: 'C', x: 400, y: 100 },
      { id: 'D', label: 'D', x: 100, y: 250 },
      { id: 'E', label: 'E', x: 250, y: 200 },
      { id: 'F', label: 'F', x: 400, y: 250 },
      { id: 'G', label: 'G', x: 250, y: 350 }
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'D' },
      { from: 'B', to: 'C' },
      { from: 'B', to: 'E' },
      { from: 'C', to: 'F' },
      { from: 'D', to: 'E' },
      { from: 'E', to: 'F' },
      { from: 'E', to: 'G' },
      { from: 'F', to: 'G' }
    ]
  }
};

// Construir lista de adjacências
function buildAdjacencyList(graph: Graph): Map<string, string[]> {
  const adj = new Map<string, string[]>();

  // Inicializar todos os nós
  graph.nodes.forEach((node) => {
    adj.set(node.id, []);
  });

  // Adicionar arestas (grafo não-direcionado)
  graph.edges.forEach((edge) => {
    adj.get(edge.from)?.push(edge.to);
    adj.get(edge.to)?.push(edge.from);
  });

  return adj;
}

// Reconstruir caminho do início ao alvo
function reconstructPath(
  parent: Map<string, string | null>,
  start: string,
  target: string
): string[] {
  const path: string[] = [];
  let current: string | null = target;

  while (current !== null) {
    path.unshift(current);
    if (current === start) break;
    current = parent.get(current) || null;
  }

  return path;
}

export function generateBFSSteps(
  graph: Graph,
  startNode: string,
  targetNode: string
): BFSStep[] {
  const steps: BFSStep[] = [];
  const adj = buildAdjacencyList(graph);

  const queue: string[] = [];
  const visited = new Set<string>();
  const parent = new Map<string, string | null>();

  // Passo inicial
  steps.push({
    type: 'start',
    currentNode: null,
    queue: [],
    visited: [],
    exploring: [],
    path: [],
    targetFound: false,
    description: `Iniciando BFS do nó ${startNode} em busca do nó ${targetNode}.`
  });

  // Enfileirar nó inicial
  queue.push(startNode);
  parent.set(startNode, null);

  steps.push({
    type: 'enqueue',
    currentNode: startNode,
    queue: [...queue],
    visited: [],
    exploring: [startNode],
    path: [],
    targetFound: false,
    description: `Adicionando nó inicial ${startNode} à fila.`
  });

  // Processar fila
  while (queue.length > 0) {
    const current = queue.shift()!;
    visited.add(current);

    steps.push({
      type: 'dequeue',
      currentNode: current,
      queue: [...queue],
      visited: Array.from(visited),
      exploring: [],
      path: [],
      targetFound: false,
      description: `Removendo ${current} da fila e marcando como visitado.`
    });

    // Verificar se encontrou o alvo
    if (current === targetNode) {
      const path = reconstructPath(parent, startNode, targetNode);

      steps.push({
        type: 'found',
        currentNode: current,
        queue: [...queue],
        visited: Array.from(visited),
        exploring: [],
        path,
        targetFound: true,
        description: `Alvo ${targetNode} encontrado! Caminho: ${path.join(' → ')}`
      });

      break;
    }

    // Explorar vizinhos
    const neighbors = adj.get(current) || [];
    const newNeighbors: string[] = [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor) && !queue.includes(neighbor)) {
        queue.push(neighbor);
        parent.set(neighbor, current);
        newNeighbors.push(neighbor);
      }
    }

    if (newNeighbors.length > 0) {
      steps.push({
        type: 'explore',
        currentNode: current,
        queue: [...queue],
        visited: Array.from(visited),
        exploring: newNeighbors,
        path: [],
        targetFound: false,
        description: `Explorando vizinhos de ${current}: ${newNeighbors.join(', ')}. Adicionando à fila.`
      });
    } else {
      steps.push({
        type: 'visit',
        currentNode: current,
        queue: [...queue],
        visited: Array.from(visited),
        exploring: [],
        path: [],
        targetFound: false,
        description: `Nó ${current} não tem vizinhos não visitados.`
      });
    }
  }

  // Se não encontrou
  if (!visited.has(targetNode)) {
    steps.push({
      type: 'complete',
      currentNode: null,
      queue: [],
      visited: Array.from(visited),
      exploring: [],
      path: [],
      targetFound: false,
      description: `Busca concluída. Nó ${targetNode} não é alcançável a partir de ${startNode}.`
    });
  }

  return steps;
}
