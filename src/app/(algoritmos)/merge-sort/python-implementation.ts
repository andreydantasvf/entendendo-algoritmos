import { CodesBlock } from '@/types/code-block';

export const pythonImplementations: CodesBlock[] = [
  {
    code: `def merge_sort(arr):
    """
    Implementação recursiva do Merge Sort

    Args:
        arr: Lista de elementos para ordenar

    Returns:
        Nova lista ordenada
    """
    # Caso base: lista com 1 ou 0 elementos já está ordenada
    if len(arr) <= 1:
        return arr

    # Dividir a lista ao meio
    meio = len(arr) // 2
    esquerda = arr[:meio]
    direita = arr[meio:]

    # Recursão: ordenar as duas metades
    esquerda_ordenada = merge_sort(esquerda)
    direita_ordenada = merge_sort(direita)

    # Mesclar as duas metades ordenadas
    return merge(esquerda_ordenada, direita_ordenada)

def merge(esquerda, direita):
    """
    Mescla duas listas ordenadas em uma única lista ordenada

    Args:
        esquerda: Lista ordenada
        direita: Lista ordenada

    Returns:
        Lista mesclada e ordenada
    """
    resultado = []
    i = j = 0

    # Comparar elementos das duas listas e mesclar em ordem
    while i < len(esquerda) and j < len(direita):
        if esquerda[i] <= direita[j]:
            resultado.append(esquerda[i])
            i += 1
        else:
            resultado.append(direita[j])
            j += 1

    # Adicionar elementos restantes (se houver)
    resultado.extend(esquerda[i:])
    resultado.extend(direita[j:])

    return resultado

# Exemplo de uso
if __name__ == "__main__":
    numeros = [64, 34, 25, 12, 22, 11, 90]
    print(f"Array original: {numeros}")

    ordenado = merge_sort(numeros)
    print(f"Array ordenado: {ordenado}")

    # Teste com diferentes tipos de arrays
    print("\\n--- Testes adicionais ---")
    print(f"Array vazio: {merge_sort([])}")
    print(f"Um elemento: {merge_sort([5])}")
    print(f"Já ordenado: {merge_sort([1, 2, 3, 4, 5])}")
    print(f"Ordem reversa: {merge_sort([5, 4, 3, 2, 1])}")
    print(f"Com duplicatas: {merge_sort([3, 1, 4, 1, 5, 9, 2, 6, 5])}")`,
    language: 'python',
    tabTitle: 'Recursiva',
    tabValue: 'py-recursive',
    title: 'Implementação Recursiva (Python)',
    description: `Esta é a implementação clássica do Merge Sort em Python usando recursão:

**Características do Python:**
- **Slicing**: Usa \`arr[:meio]\` e \`arr[meio:]\` para dividir a lista
- **List comprehensions**: Poderia usar, mas mantemos código legível
- **Extend**: Usa \`extend()\` para adicionar elementos restantes eficientemente

**Pontos principais:**
- **Caso base**: Listas com 1 ou 0 elementos já estão ordenadas
- **Divisão**: Lista é dividida usando slicing do Python
- **Recursão**: Cada metade é ordenada recursivamente
- **Mesclagem**: Função \`merge()\` combina duas metades ordenadas

**Vantagens:**
- Código muito legível e pythônico
- Funciona com qualquer tipo comparável
- Algoritmo estável
- Complexidade O(n log n) garantida`
  },
  {
    code: `def merge_sort_optimized(arr):
    """
    Versão otimizada do Merge Sort que modifica a lista in-place
    para reduzir uso de memória
    """
    if not arr:
        return arr

    temp = [0] * len(arr)  # Array auxiliar reutilizado
    _merge_sort_helper(arr, 0, len(arr) - 1, temp)
    return arr

def _merge_sort_helper(arr, inicio, fim, temp):
    """
    Função auxiliar recursiva para o merge sort otimizado
    """
    if inicio >= fim:
        return

    meio = (inicio + fim) // 2

    # Ordenar primeira e segunda metade
    _merge_sort_helper(arr, inicio, meio, temp)
    _merge_sort_helper(arr, meio + 1, fim, temp)

    # Mesclar as metades ordenadas
    _merge_in_place(arr, inicio, meio, fim, temp)

def _merge_in_place(arr, inicio, meio, fim, temp):
    """
    Mescla duas partes ordenadas do array usando array auxiliar
    """
    i = inicio      # Índice para primeira metade
    j = meio + 1    # Índice para segunda metade
    k = inicio      # Índice para array temporário

    # Mesclar elementos em ordem no array temporário
    while i <= meio and j <= fim:
        if arr[i] <= arr[j]:
            temp[k] = arr[i]
            i += 1
        else:
            temp[k] = arr[j]
            j += 1
        k += 1

    # Copiar elementos restantes
    while i <= meio:
        temp[k] = arr[i]
        i += 1
        k += 1

    while j <= fim:
        temp[k] = arr[j]
        j += 1
        k += 1

    # Copiar elementos mesclados de volta para o array original
    for i in range(inicio, fim + 1):
        arr[i] = temp[i]

def merge_sort_immutable(arr):
    """
    Versão que não modifica a lista original
    """
    copia = arr.copy()
    return merge_sort_optimized(copia)

# Exemplo de uso com medição de performance
import time
import random

def benchmark_merge_sort():
    """Compara performance das diferentes implementações"""
    tamanhos = [100, 1000, 5000]

    for tamanho in tamanhos:
        print(f"\\n--- Testando com {tamanho} elementos ---")

        # Gerar array aleatório
        arr = [random.randint(1, 1000) for _ in range(tamanho)]

        # Testar implementação otimizada
        arr_copia = arr.copy()
        inicio = time.time()
        merge_sort_optimized(arr_copia)
        tempo_otimizado = time.time() - inicio

        print(f"Tempo otimizado: {tempo_otimizado:.4f}s")

if __name__ == "__main__":
    numeros = [64, 34, 25, 12, 22, 11, 90]
    print(f"Array original: {numeros}")

    # Versão que modifica o original
    copia1 = numeros.copy()
    merge_sort_optimized(copia1)
    print(f"Versão otimizada: {copia1}")

    # Versão imutável
    ordenado = merge_sort_immutable(numeros)
    print(f"Versão imutável: {ordenado}")
    print(f"Original não modificado: {numeros}")

    # Benchmark
    benchmark_merge_sort()`,
    language: 'python',
    tabTitle: 'Otimizada',
    tabValue: 'py-optimized',
    title: 'Versão Otimizada (Python)',
    description: `Esta é uma versão otimizada do Merge Sort em Python:

**Otimizações implementadas:**
- **Array auxiliar reutilizado**: Um único array temp é reutilizado nas chamadas recursivas
- **Operações in-place**: Modifica o array original para reduzir criação de objetos
- **Menos alocações**: Reduz significativamente o uso de memória

**Características Python:**
- **Underscored functions**: Funções auxiliares privadas com prefixo \`_\`
- **List.copy()**: Método nativo para copiar listas
- **Range indexing**: Usa range(inicio, fim + 1) para iteração

**Benefícios:**
- Menor uso de memória
- Melhor performance para arrays grandes
- Mantém complexidade O(n log n)
- Inclui benchmark para medir performance

**Versões fornecidas:**
- \`merge_sort_optimized\`: Modifica o array original
- \`merge_sort_immutable\`: Retorna novo array ordenado`
  },
  {
    code: `def merge_sort_iterativo(arr):
    """
    Implementação iterativa (bottom-up) do Merge Sort
    Evita recursão usando loops
    """
    if len(arr) <= 1:
        return arr

    resultado = arr.copy()
    n = len(resultado)
    temp = [0] * n

    # Começar com sub-arrays de tamanho 1, depois 2, 4, 8...
    tamanho = 1
    while tamanho < n:
        # Mesclar sub-arrays adjacentes de tamanho 'tamanho'
        inicio = 0
        while inicio < n - 1:
            meio = min(inicio + tamanho - 1, n - 1)
            fim = min(inicio + 2 * tamanho - 1, n - 1)

            # Só mesclar se houver elementos suficientes
            if meio < fim:
                _merge_range(resultado, inicio, meio, fim, temp)

            inicio += 2 * tamanho

        tamanho *= 2

    return resultado

def _merge_range(arr, inicio, meio, fim, temp):
    """
    Mescla uma faixa específica do array
    """
    i = inicio
    j = meio + 1
    k = inicio

    # Mesclar elementos em ordem
    while i <= meio and j <= fim:
        if arr[i] <= arr[j]:
            temp[k] = arr[i]
            i += 1
        else:
            temp[k] = arr[j]
            j += 1
        k += 1

    # Copiar elementos restantes
    while i <= meio:
        temp[k] = arr[i]
        i += 1
        k += 1

    while j <= fim:
        temp[k] = arr[j]
        j += 1
        k += 1

    # Copiar de volta para o array original
    for i in range(inicio, fim + 1):
        arr[i] = temp[i]

def merge_sort_iterativo_com_debug(arr):
    """
    Versão com logging para visualização do processo
    """
    if len(arr) <= 1:
        return arr

    resultado = arr.copy()
    n = len(resultado)
    temp = [0] * n

    print(f"Iniciando Merge Sort iterativo com array: {arr}")

    tamanho = 1
    nivel = 0
    while tamanho < n:
        print(f"\\nNível {nivel} - Tamanho dos sub-arrays: {tamanho}")

        inicio = 0
        while inicio < n - 1:
            meio = min(inicio + tamanho - 1, n - 1)
            fim = min(inicio + 2 * tamanho - 1, n - 1)

            if meio < fim:
                esquerda = resultado[inicio:meio+1]
                direita = resultado[meio+1:fim+1]

                print(f"  Mesclando: {esquerda} + {direita}")

                _merge_range(resultado, inicio, meio, fim, temp)

                mesclado = resultado[inicio:fim+1]
                print(f"  Resultado: {mesclado}")

            inicio += 2 * tamanho

        tamanho *= 2
        nivel += 1

    return resultado

# Classe para Merge Sort com diferentes estratégias
class MergeSortProcessor:
    """
    Classe que encapsula diferentes implementações do Merge Sort
    """

    @staticmethod
    def recursivo(arr):
        """Implementação recursiva padrão"""
        if len(arr) <= 1:
            return arr

        meio = len(arr) // 2
        esquerda = MergeSortProcessor.recursivo(arr[:meio])
        direita = MergeSortProcessor.recursivo(arr[meio:])

        return MergeSortProcessor._merge(esquerda, direita)

    @staticmethod
    def iterativo(arr):
        """Implementação iterativa (bottom-up)"""
        return merge_sort_iterativo(arr)

    @staticmethod
    def _merge(esquerda, direita):
        """Método auxiliar para mesclar duas listas"""
        resultado = []
        i = j = 0

        while i < len(esquerda) and j < len(direita):
            if esquerda[i] <= direita[j]:
                resultado.append(esquerda[i])
                i += 1
            else:
                resultado.append(direita[j])
                j += 1

        resultado.extend(esquerda[i:])
        resultado.extend(direita[j:])

        return resultado

# Exemplo de uso
if __name__ == "__main__":
    numeros = [64, 34, 25, 12, 22, 11, 90]

    print("=== Merge Sort Iterativo ===")
    resultado = merge_sort_iterativo_com_debug(numeros)
    print(f"\\nArray final ordenado: {resultado}")

    print("\\n=== Usando Classe MergeSortProcessor ===")
    print(f"Original: {numeros}")
    print(f"Recursivo: {MergeSortProcessor.recursivo(numeros)}")
    print(f"Iterativo: {MergeSortProcessor.iterativo(numeros)}")`,
    language: 'python',
    tabTitle: 'Iterativa',
    tabValue: 'py-iterative',
    title: 'Versão Iterativa (Python)',
    description: `Esta implementação iterativa do Merge Sort evita recursão:

**Abordagem Bottom-Up:**
- **Sem recursão**: Usa apenas loops while, evitando stack overflow
- **Níveis incrementais**: Começa com sub-arrays de tamanho 1, depois 2, 4, 8...
- **Controle explícito**: Mais controle sobre o processo de mesclagem

**Características Python:**
- **List slicing**: Usa slicing para visualizar partes do array
- **Min function**: Usa \`min()\` para calcular limites seguros
- **Copy method**: Usa \`arr.copy()\` para criar cópias

**Vantagens:**
- Não há limitação de profundidade de recursão
- Melhor para arrays muito grandes
- Facilita debugging e visualização
- Mais previsível em uso de memória

**Recursos extras:**
- **Versão com debug**: Mostra cada passo da mesclagem
- **Classe MergeSortProcessor**: Encapsula diferentes implementações
- **Logging detalhado**: Visualiza o processo completo`
  }
];
