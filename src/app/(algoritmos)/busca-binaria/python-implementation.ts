import { type CodesBlock } from '@/types/code-block';

export const pythonCode = `def busca_binaria(array, target):
    """
    Realiza busca binária em um array ordenado.

    Args:
        array: Lista ordenada de elementos
        target: Elemento a ser procurado

    Returns:
        int: Índice do elemento se encontrado, -1 caso contrário
    """
    left = 0
    right = len(array) - 1

    while left <= right:
        mid = (left + right) // 2

        if array[mid] == target:
            return mid  # Encontrou! Retorna o índice
        elif array[mid] < target:
            left = mid + 1  # Busca na metade direita
        else:
            right = mid - 1  # Busca na metade esquerda

    return -1  # Não encontrou

# Exemplo de uso:
numeros = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
resultado = busca_binaria(numeros, 7)
print(resultado)  # 3 (índice do elemento 7)

# Testando com elemento que não existe:
nao_existe = busca_binaria(numeros, 4)
print(nao_existe)  # -1 (não encontrado)`;

export const pythonRecursiveCode = `def busca_binaria_recursiva(array, target, left=0, right=None):
    """
    Versão recursiva da busca binária.

    Args:
        array: Lista ordenada de elementos
        target: Elemento a ser procurado
        left: Índice inicial (padrão: 0)
        right: Índice final (padrão: len(array) - 1)

    Returns:
        int: Índice do elemento se encontrado, -1 caso contrário
    """
    if right is None:
        right = len(array) - 1

    # Caso base: elemento não encontrado
    if left > right:
        return -1

    mid = (left + right) // 2

    # Caso base: elemento encontrado
    if array[mid] == target:
        return mid

    # Busca recursiva na metade apropriada
    if array[mid] < target:
        return busca_binaria_recursiva(array, target, mid + 1, right)
    else:
        return busca_binaria_recursiva(array, target, left, mid - 1)

# Exemplo de uso:
numeros = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
resultado = busca_binaria_recursiva(numeros, 7)
print(resultado)  # 3`;

export const pythonImplementations = [
  {
    code: pythonCode,
    language: 'python',
    tabTitle: 'Python',
    tabValue: 'python-iterative',
    title: 'Implementação Iterativa - Python',
    description:
      'Versão iterativa usando um loop while. Mais eficiente em termos de memória.'
  },
  {
    code: pythonRecursiveCode,
    language: 'python',
    title: 'Busca Binária Recursiva',
    tabTitle: 'Python Recursivo',
    tabValue: 'python-recursive',
    description:
      'Versão recursiva mais elegante, mas usa mais memória devido à pilha de chamadas.'
  }
] as CodesBlock[];
