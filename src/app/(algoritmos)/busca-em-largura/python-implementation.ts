export const pythonImplementation = `# Implementação de Busca em Largura (BFS)
from collections import deque, defaultdict

class Graph:
    def __init__(self):
        """Inicializa um grafo vazio usando lista de adjacências"""
        self.adjacency_list = defaultdict(list)

    def add_vertex(self, vertex):
        """Adiciona um vértice ao grafo"""
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, vertex1, vertex2):
        """Adiciona uma aresta entre dois vértices (grafo não-direcionado)"""
        self.adjacency_list[vertex1].append(vertex2)
        self.adjacency_list[vertex2].append(vertex1)

    def bfs(self, start, target):
        """
        Busca em Largura (BFS)

        Args:
            start: Nó inicial
            target: Nó alvo

        Returns:
            Lista com o caminho do início ao alvo, ou None se não encontrado
        """
        # Fila para processar os nós (usando deque para O(1) nas operações)
        queue = deque([start])

        # Conjunto de nós visitados
        visited = {start}

        # Dicionário para rastrear o caminho (parent tracking)
        parent = {start: None}

        # Processa enquanto houver nós na fila
        while queue:
            # Remove o primeiro nó da fila (FIFO)
            current = queue.popleft()

            print(f"Visitando: {current}")

            # Se encontrou o alvo, reconstrói o caminho
            if current == target:
                return self._reconstruct_path(parent, start, target)

            # Explora todos os vizinhos
            for neighbor in self.adjacency_list[current]:
                # Se o vizinho ainda não foi visitado
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
                    parent[neighbor] = current
                    print(f"  Adicionando {neighbor} à fila")

        # Se chegou aqui, o alvo não foi encontrado
        return None

    def _reconstruct_path(self, parent, start, target):
        """Reconstrói o caminho do início ao alvo"""
        path = []
        current = target

        while current is not None:
            path.append(current)
            current = parent[current]

        # Inverte o caminho para ir do início ao fim
        path.reverse()
        return path


# Exemplo de uso
if __name__ == "__main__":
    graph = Graph()

    # Adiciona vértices
    vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    for vertex in vertices:
        graph.add_vertex(vertex)

    # Adiciona arestas (grafo em árvore)
    edges = [
        ('A', 'B'),
        ('A', 'C'),
        ('B', 'D'),
        ('B', 'E'),
        ('C', 'F'),
        ('C', 'G')
    ]
    for vertex1, vertex2 in edges:
        graph.add_edge(vertex1, vertex2)

    # Busca o caminho de A até G
    print("Buscando caminho de A até G:")
    path = graph.bfs('A', 'G')

    if path:
        print(f"\\nCaminho encontrado: {' → '.join(path)}")
        print(f"Distância: {len(path) - 1} arestas")
    else:
        print("\\nCaminho não encontrado")

# Saída:
# Visitando: A
#   Adicionando B à fila
#   Adicionando C à fila
# Visitando: B
#   Adicionando D à fila
#   Adicionando E à fila
# Visitando: C
#   Adicionando F à fila
#   Adicionando G à fila
# Visitando: D
# Visitando: E
# Visitando: F
# Visitando: G
#
# Caminho encontrado: A → C → G
# Distância: 2 arestas
`;
