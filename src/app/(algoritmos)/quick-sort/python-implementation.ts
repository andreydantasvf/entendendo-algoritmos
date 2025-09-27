import { type CodesBlock } from '@/types/code-block';

const pythonCode = `
  def quick_sort(arr, low=0, high=None):
      if high is None:
          high = len(arr) - 1

      if low < high:
          # Particiona o array e obtém o índice do pivô
          pivot_index = partition(arr, low, high)

          # Ordena recursivamente os subarrays
          quick_sort(arr, low, pivot_index - 1)
          quick_sort(arr, pivot_index + 1, high)

      return arr

  def partition(arr, low, high):
      # Escolhe o último elemento como pivô
      pivot = arr[high]
      i = low - 1  # Índice do menor elemento

      for j in range(low, high):
          # Se o elemento atual é menor ou igual ao pivô
          if arr[j] <= pivot:
              i += 1
              swap(arr, i, j)

      # Coloca o pivô na posição correta
      swap(arr, i + 1, high)
      return i + 1

  def swap(arr, i, j):
      arr[i], arr[j] = arr[j], arr[i]

  # Exemplo de Uso em Python
  dados = [38, 27, 43, 3, 9, 82, 10]
  ordenados = quick_sort(dados.copy())
  print(f"Lista original: {dados}")
  print(f"Lista ordenada: {ordenados}")
`;

export const pythonImplementations = [
  {
    code: pythonCode,
    language: 'python',
    tabTitle: 'Python',
    tabValue: 'python-basic',
    title: 'Implementação do Quick Sort - Python',
    description:
      'Implementação completa e didática do algoritmo Quick Sort usando a estratégia "dividir para conquistar". Este código demonstra como particionar o array usando um pivô e ordenar recursivamente os subarrays resultantes, garantindo complexidade O(n log n) no caso médio.'
  }
] as CodesBlock[];
