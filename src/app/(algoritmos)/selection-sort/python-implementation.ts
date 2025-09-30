import { type CodesBlock } from '@/types/code-block';

const pythonCode = `
  def selection_sort(arr):
      n = len(arr)

      for i in range(n - 1):
          # Encontra o índice do menor elemento no array não ordenado
          min_index = i

          for j in range(i + 1, n):
              if arr[j] < arr[min_index]:
                  min_index = j

          # Troca o menor elemento com o primeiro elemento não ordenado
          if min_index != i:
              swap(arr, i, min_index)

      return arr

  def swap(arr, i, j):
      arr[i], arr[j] = arr[j], arr[i]

  # Exemplo de Uso em Python
  dados = [64, 25, 12, 22, 11]
  ordenados = selection_sort(dados.copy())
  print(f"Lista original: {dados}")
  print(f"Lista ordenada: {ordenados}")
`;

export const pythonImplementations = [
  {
    code: pythonCode,
    language: 'python',
    tabTitle: 'Python',
    tabValue: 'python-basic',
    title: 'Implementação do Selection Sort - Python',
    description:
      'Implementação completa e didática do algoritmo Selection Sort. Este código demonstra como encontrar repetidamente o menor elemento não ordenado e colocá-lo na posição correta, garantindo complexidade O(n²) em todos os casos.'
  }
] as CodesBlock[];
