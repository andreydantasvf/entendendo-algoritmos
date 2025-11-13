export const jsImplementation = `// Implementação de Busca em Profundidade (DFS)

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

  // Busca em Profundidade (DFS) - Versão Iterativa
  dfsIterative(start, target) {
    // Pilha para processar os nós (LIFO)
    const stack = [start];

    // Conjunto de nós visitados
    const visited = new Set();

    // Mapa para rastrear o caminho (parent tracking)
    const parent = new Map();
    parent.set(start, null);

    // Processa enquanto houver nós na pilha
    while (stack.length > 0) {
      // Remove o último nó da pilha (LIFO)
      const current = stack.pop();

      // Se já foi visitado, continua
      if (visited.has(current)) continue;

      // Marca como visitado
      visited.add(current);
      console.log(\`Visitando: \${current}\`);

      // Se encontrou o alvo, reconstrói o caminho
      if (current === target) {
        return this.reconstructPath(parent, start, target);
      }

      // Explora todos os vizinhos (em ordem reversa para manter ordem)
      const neighbors = this.adjacencyList.get(current) || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const neighbor = neighbors[i];
        // Se o vizinho ainda não foi visitado
        if (!visited.has(neighbor)) {
          if (!parent.has(neighbor)) {
            parent.set(neighbor, current);
          }
          stack.push(neighbor);
          console.log(\`  Adicionando \${neighbor} à pilha\`);
        }
      }
    }

    // Se chegou aqui, o alvo não foi encontrado
    return null;
  }

  // Busca em Profundidade (DFS) - Versão Recursiva
  dfsRecursive(start, target) {
    const visited = new Set();
    const parent = new Map();
    parent.set(start, null);

    const dfsHelper = (current) => {
      visited.add(current);
      console.log(\`Visitando: \${current}\`);

      // Se encontrou o alvo
      if (current === target) {
        return true;
      }

      // Explora todos os vizinhos
      const neighbors = this.adjacencyList.get(current) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          parent.set(neighbor, current);
          console.log(\`  Explorando \${neighbor}\`);

          // Chama recursivamente
          if (dfsHelper(neighbor)) {
            return true;
          }
        }
      }

      return false;
    };

    // Inicia a busca
    const found = dfsHelper(start);

    if (found) {
      return this.reconstructPath(parent, start, target);
    }

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

console.log('=== DFS Iterativo ===');
console.log('Buscando caminho de A até G:');
const pathIterative = graph.dfsIterative('A', 'G');

if (pathIterative) {
  console.log(\`\\nCaminho encontrado: \${pathIterative.join(' → ')}\`);
  console.log(\`Distância: \${pathIterative.length - 1} arestas\`);
} else {
  console.log('\\nCaminho não encontrado');
}

console.log('\\n=== DFS Recursivo ===');
console.log('Buscando caminho de A até G:');
const pathRecursive = graph.dfsRecursive('A', 'G');

if (pathRecursive) {
  console.log(\`\\nCaminho encontrado: \${pathRecursive.join(' → ')}\`);
  console.log(\`Distância: \${pathRecursive.length - 1} arestas\`);
} else {
  console.log('\\nCaminho não encontrado');
}

// Saída (Iterativo):
// Visitando: A
//   Adicionando B à pilha
//   Adicionando C à pilha
// Visitando: C
//   Adicionando F à pilha
//   Adicionando G à pilha
// Visitando: G
//
// Caminho encontrado: A → C → G
// Distância: 2 arestas
`;
