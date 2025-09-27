import { type CodesBlock } from '@/types/code-block';

const pythonCode = `def busca_linear(array, target):
    """
    Busca linear em um array.

    Args:
        array: Lista de elementos
        target: Elemento a ser procurado

    Returns:
        int: Índice do elemento se encontrado, -1 caso contrário
    """
    # Percorre todo o array elemento por elemento
    for i in range(len(array)):
        if array[i] == target:
            return i  # Encontrou! Retorna o índice

    return -1  # Não encontrou

# Exemplo de uso:
numeros = [5, 2, 8, 1, 9, 3]
resultado = busca_linear(numeros, 8)
print(resultado)  # 2 (índice do elemento 8)

# Testando com elemento que não existe:
nao_existe = busca_linear(numeros, 7)
print(nao_existe)  # -1 (não encontrado)

# Versão pythônica usando enumerate:
def busca_linear_enumerate(array, target):
    """Versão mais pythônica usando enumerate."""
    for indice, elemento in enumerate(array):
        if elemento == target:
            return indice
    return -1`;

export const pythonImplementations = [
  {
    code: pythonCode,
    language: 'python',
    tabTitle: 'Python',
    tabValue: 'python-basic',
    title: 'Implementação Básica - Python',
    description:
      'Versão simples e pythônica da busca linear, incluindo uma variante usando enumerate para melhor legibilidade.'
  }
] as CodesBlock[];
