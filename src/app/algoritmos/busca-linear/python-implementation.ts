import { type CodesBlock } from '@/components/layout/CodeImplementation';

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

const pythonDetailedCode = `def busca_linear_detalhada(array, target):
    """
    Busca linear com informações detalhadas sobre o processo.

    Args:
        array: Lista de elementos
        target: Elemento a ser procurado

    Returns:
        dict: Dicionário com detalhes da busca
    """
    detalhes = {
        'elemento': None,
        'indice': -1,
        'comparacoes': 0,
        'encontrado': False
    }

    for i in range(len(array)):
        detalhes['comparacoes'] += 1

        if array[i] == target:
            detalhes['elemento'] = array[i]
            detalhes['indice'] = i
            detalhes['encontrado'] = True
            break  # Para a busca quando encontra

    return detalhes

# Exemplo de uso:
frutas = ['maçã', 'banana', 'laranja', 'uva', 'manga']
resultado = busca_linear_detalhada(frutas, 'laranja')

print(resultado)
# {
#     'elemento': 'laranja',
#     'indice': 2,
#     'comparacoes': 3,
#     'encontrado': True
# }

# Versão que funciona com qualquer tipo de dados:
def busca_linear_generica(array, target, key_func=None):
    """
    Busca linear genérica que pode usar uma função de comparação.

    Args:
        array: Lista de elementos
        target: Elemento a ser procurado
        key_func: Função opcional para extrair chave de comparação

    Returns:
        int: Índice do elemento se encontrado, -1 caso contrário
    """
    for i, elemento in enumerate(array):
        if key_func:
            if key_func(elemento) == key_func(target):
                return i
        else:
            if elemento == target:
                return i
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
  },
  {
    code: pythonDetailedCode,
    language: 'python',
    tabTitle: 'Python Detalhado',
    tabValue: 'python-detailed',
    title: 'Implementação Detalhada - Python',
    description:
      'Versão avançada com informações detalhadas da busca e suporte a funções de comparação personalizadas.'
  }
] as CodesBlock[];
