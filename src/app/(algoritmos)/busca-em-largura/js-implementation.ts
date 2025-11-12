export const jsImplementation = `// Implementação de Busca em Largura (BFS)

// Classe para representar um grafo
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  // Adiciona um vértice ao grafo
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  // Adiciona uma aresta entre dois vértices (grafo não-direcionado)
  addEdge(vertex1, vertex2) {
    this.adjacencyList.get(vertex1).push(vertex2);
    this.adjacencyList.get(vertex2).push(vertex1);
  }

  // Busca em Largura (BFS)
  bfs(start, target) {
    // Fila para processar os nós
    const queue = [start];

    // Conjunto de nós visitados
    const visited = new Set([start]);

    // Mapa para rastrear o caminho (parent tracking)
    const parent = new Map();
    parent.set(start, null);

    // Processa enquanto houver nós na fila
    while (queue.length > 0) {
      // Remove o primeiro nó da fila (FIFO)
      const current = queue.shift();

      console.log(\`Visitando: \${current}\`);

      // Se encontrou o alvo, reconstrói o caminho
      if (current === target) {
        return this.reconstructPath(parent, start, target);
      }

      // Explora todos os vizinhos
      const neighbors = this.adjacencyList.get(current) || [];
      for (const neighbor of neighbors) {
        // Se o vizinho ainda não foi visitado
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          parent.set(neighbor, current);
          console.log(\`  Adicionando \${neighbor} à fila\`);
        }
      }
    }

    // Se chegou aqui, o alvo não foi encontrado
    return null;
  }

  // Reconstrói o caminho do início ao alvo
  reconstructPath(parent, start, target) {
    const path = [];
    let current = target;

    while (current !== null) {
      path.unshift(current);
      current = parent.get(current);
    }

    return path;
  }
}

// Exemplo de uso
const graph = new Graph();

// Adiciona vértices
['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach(vertex => {
  graph.addVertex(vertex);
});

// Adiciona arestas (grafo em árvore)
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('C', 'G');

// Busca o caminho de A até G
console.log('Buscando caminho de A até G:');
const path = graph.bfs('A', 'G');

if (path) {
  console.log(\`\\nCaminho encontrado: \${path.join(' → ')}\`);
  console.log(\`Distância: \${path.length - 1} arestas\`);
} else {
  console.log('\\nCaminho não encontrado');
}

// Saída:
// Visitando: A
//   Adicionando B à fila
//   Adicionando C à fila
// Visitando: B
//   Adicionando D à fila
//   Adicionando E à fila
// Visitando: C
//   Adicionando F à fila
//   Adicionando G à fila
// Visitando: D
// Visitando: E
// Visitando: F
// Visitando: G
//
// Caminho encontrado: A → C → G
// Distância: 2 arestas
`;
