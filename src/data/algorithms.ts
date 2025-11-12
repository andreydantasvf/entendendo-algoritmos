import { Algorithm, Category } from '@/types/algorithms';

export const categories: Category[] = [
  {
    id: 'search',
    name: 'Algoritmos de Busca',
    description: 'Algoritmos para encontrar elementos em estruturas de dados',
    icon: '🔍',
    color: 'bg-blue-500'
  },
  {
    id: 'sort',
    name: 'Algoritmos de Ordenação',
    description: 'Algoritmos para organizar dados em ordem específica',
    icon: '📊',
    color: 'bg-green-500'
  },
  {
    id: 'graph',
    name: 'Algoritmos de Grafos',
    description: 'Algoritmos para trabalhar com estruturas de grafos',
    icon: '🌐',
    color: 'bg-purple-500'
  },
  {
    id: 'dynamic',
    name: 'Programação Dinâmica',
    description: 'Técnicas de otimização para problemas complexos',
    icon: '⚡',
    color: 'bg-yellow-500'
  },
  {
    id: 'greedy',
    name: 'Algoritmos Gulosos',
    description: 'Algoritmos que fazem escolhas localmente ótimas',
    icon: '🎯',
    color: 'bg-red-500'
  },
  {
    id: 'divide',
    name: 'Dividir e Conquistar',
    description: 'Estratégia de divisão de problemas em subproblemas',
    icon: '🔗',
    color: 'bg-indigo-500'
  }
];

export const algorithms: Algorithm[] = [
  // Algoritmos de Busca
  {
    id: 'binary-search',
    title: 'Busca Binária',
    description:
      'Algoritmo eficiente para buscar elementos em arrays ordenados',
    category: 'search',
    difficulty: 'Iniciante',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    tags: ['busca', 'array', 'ordenado'],
    url: 'busca-binaria'
  },
  {
    id: 'linear-search',
    title: 'Busca Linear',
    description: 'Busca sequencial através de todos os elementos',
    category: 'search',
    difficulty: 'Iniciante',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['busca', 'array', 'sequencial'],
    url: 'busca-linear'
  },

  {
    id: 'mergesort',
    title: 'Merge Sort',
    description: 'Algoritmo estável de ordenação por divisão e conquista',
    category: 'sort',
    difficulty: 'Intermediário',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    tags: ['ordenação', 'dividir-conquistar', 'estável'],
    url: 'merge-sort'
  },
  {
    id: 'quicksort',
    title: 'Quick Sort',
    description: 'Algoritmo eficiente de ordenação por divisão e conquista',
    category: 'sort',
    difficulty: 'Intermediário',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    tags: ['ordenação', 'dividir-conquistar', 'recursão'],
    url: 'quick-sort'
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort',
    description: 'Algoritmo simples de ordenação por seleção',
    category: 'sort',
    difficulty: 'Iniciante',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['ordenação', 'seleção', 'simples'],
    url: 'selection-sort'
  },
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    description: 'Algoritmo simples de ordenação por bolha',
    category: 'sort',
    difficulty: 'Iniciante',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['ordenação', 'bolha', 'simples'],
    url: 'bubble-sort'
  },
  {
    id: 'insertion-sort',
    title: 'Insertion Sort',
    description: 'Algoritmo simples de ordenação por inserção',
    category: 'sort',
    difficulty: 'Iniciante',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['ordenação', 'inserção', 'simples'],
    url: 'insertion-sort'
  },
  {
    id: 'counting-sort',
    title: 'Counting Sort',
    description:
      'Algoritmo de ordenação não comparativo que utiliza contagem de ocorrências',
    category: 'sort',
    difficulty: 'Intermediário',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(k)',
    tags: ['ordenação', 'contagem', 'não-comparativo'],
    url: 'counting-sort'
  },
  {
    id: 'radix-sort',
    title: 'Radix Sort',
    description:
      'Algoritmo de ordenação não comparativo que ordena elementos processando dígitos individuais',
    category: 'sort',
    difficulty: 'Intermediário',
    timeComplexity: 'O(d × n)',
    spaceComplexity: 'O(n + k)',
    tags: ['ordenação', 'dígitos', 'não-comparativo'],
    url: 'radix-sort'
  },
  {
    id: 'breadth-first-search',
    title: 'Busca em Largura (BFS)',
    description: 'Algoritmo para explorar grafos nivel por nivel',
    category: 'graph',
    difficulty: 'Intermediário',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    tags: ['grafo', 'busca', 'fila'],
    url: 'busca-em-largura'
  }
  // {
  //   id: 'depth-first-search',
  //   title: 'Busca em Profundidade (DFS)',
  //   description: 'Algoritmo para explorar grafos em profundidade',
  //   category: 'graph',
  //   difficulty: 'Intermediário',
  //   timeComplexity: 'O(V + E)',
  //   spaceComplexity: 'O(V)',
  //   tags: ['grafo', 'busca', 'pilha']
  // },

  // // Algoritmos de Ordenação

  // // Algoritmos de Grafos
  // {
  //   id: 'dijkstra',
  //   title: 'Algoritmo de Dijkstra',
  //   description: 'Encontra o menor caminho em grafos com pesos positivos',
  //   category: 'graph',
  //   difficulty: 'Avançado',
  //   timeComplexity: 'O(V²)',
  //   spaceComplexity: 'O(V)',
  //   tags: ['grafo', 'menor-caminho', 'peso']
  // },
  // {
  //   id: 'topological-sort',
  //   title: 'Ordenação Topológica',
  //   description: 'Ordena vértices de um grafo direcionado acíclico',
  //   category: 'graph',
  //   difficulty: 'Intermediário',
  //   timeComplexity: 'O(V + E)',
  //   spaceComplexity: 'O(V)',
  //   tags: ['grafo', 'ordenação', 'DAG']
  // },

  // // Programação Dinâmica
  // {
  //   id: 'knapsack',
  //   title: 'Problema da Mochila',
  //   description: 'Otimização de itens com peso e valor limitados',
  //   category: 'dynamic',
  //   difficulty: 'Avançado',
  //   timeComplexity: 'O(nW)',
  //   spaceComplexity: 'O(nW)',
  //   tags: ['otimização', 'mochila', 'peso']
  // },
  // {
  //   id: 'longest-common-subsequence',
  //   title: 'Maior Subsequência Comum',
  //   description: 'Encontra a maior subsequência comum entre duas sequências',
  //   category: 'dynamic',
  //   difficulty: 'Avançado',
  //   timeComplexity: 'O(mn)',
  //   spaceComplexity: 'O(mn)',
  //   tags: ['subsequência', 'strings', 'comparação']
  // },

  // // Algoritmos Gulosos
  // {
  //   id: 'greedy-set-cover',
  //   title: 'Cobertura de Conjunto',
  //   description: 'Problema de cobertura usando estratégia gulosa',
  //   category: 'greedy',
  //   difficulty: 'Avançado',
  //   timeComplexity: 'O(n²)',
  //   spaceComplexity: 'O(n)',
  //   tags: ['cobertura', 'conjunto', 'aproximação']
  // },
  // {
  //   id: 'classroom-scheduling',
  //   title: 'Agendamento de Salas',
  //   description: 'Otimiza o uso de recursos limitados',
  //   category: 'greedy',
  //   difficulty: 'Intermediário',
  //   timeComplexity: 'O(n log n)',
  //   spaceComplexity: 'O(1)',
  //   tags: ['agendamento', 'otimização', 'recursos']
  // }
];

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'Iniciante':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Intermediário':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'Avançado':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};
