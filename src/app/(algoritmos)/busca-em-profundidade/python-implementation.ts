export const pythonImplementation = `# Implementação de Busca em Profundidade (DFS)
from collections import defaultdict

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

    def dfs_iterative(self, start, target):
        """
        Busca em Profundidade (DFS) - Versão Iterativa

        Args:
            start: Nó inicial
            target: Nó alvo

        Returns:
            Lista com o caminho do início ao alvo, ou None se não encontrado
        """
        # Pilha para processar os nós (LIFO)
        stack = [start]

        # Conjunto de nós visitados
        visited = set()

        # Dicionário para rastrear o caminho (parent tracking)
        parent = {start: None}

        # Processa enquanto houver nós na pilha
        while stack:
            # Remove o último nó da pilha (LIFO)
            current = stack.pop()

            # Se já foi visitado, continua
            if current in visited:
                continue

            # Marca como visitado
            visited.add(current)
            print(f"Visitando: {current}")

            # Se encontrou o alvo, reconstrói o caminho
            if current == target:
                return self._reconstruct_path(parent, start, target)

            # Explora todos os vizinhos (em ordem reversa para manter ordem)
            neighbors = self.adjacency_list[current]
            for neighbor in reversed(neighbors):
                # Se o vizinho ainda não foi visitado
                if neighbor not in visited:
                    if neighbor not in parent:
                        parent[neighbor] = current
                    stack.append(neighbor)
                    print(f"  Adicionando {neighbor} à pilha")

        # Se chegou aqui, o alvo não foi encontrado
        return None

    def dfs_recursive(self, start, target):
        """
        Busca em Profundidade (DFS) - Versão Recursiva

        Args:
            start: Nó inicial
            target: Nó alvo

        Returns:
            Lista com o caminho do início ao alvo, ou None se não encontrado
        """
        visited = set()
        parent = {start: None}

        def dfs_helper(current):
            visited.add(current)
            print(f"Visitando: {current}")

            # Se encontrou o alvo
            if current == target:
                return True

            # Explora todos os vizinhos
            for neighbor in self.adjacency_list[current]:
                if neighbor not in visited:
                    parent[neighbor] = current
                    print(f"  Explorando {neighbor}")

                    # Chama recursivamente
                    if dfs_helper(neighbor):
                        return True

            return False

        # Inicia a busca
        found = dfs_helper(start)

        if found:
            return self._reconstruct_path(parent, start, target)

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

    print("=== DFS Iterativo ===")
    print("Buscando caminho de A até G:")
    path_iterative = graph.dfs_iterative('A', 'G')

    if path_iterative:
        print(f"\\nCaminho encontrado: {' → '.join(path_iterative)}")
        print(f"Distância: {len(path_iterative) - 1} arestas")
    else:
        print("\\nCaminho não encontrado")

    print("\\n=== DFS Recursivo ===")
    print("Buscando caminho de A até G:")
    path_recursive = graph.dfs_recursive('A', 'G')

    if path_recursive:
        print(f"\\nCaminho encontrado: {' → '.join(path_recursive)}")
        print(f"Distância: {len(path_recursive) - 1} arestas")
    else:
        print("\\nCaminho não encontrado")

# Saída (Iterativo):
# Visitando: A
#   Adicionando B à pilha
#   Adicionando C à pilha
# Visitando: C
#   Adicionando F à pilha
#   Adicionando G à pilha
# Visitando: G
#
# Caminho encontrado: A → C → G
# Distância: 2 arestas
`;
