import { type CodesBlock } from '@/types/code-block';

const pythonCode = `
  def bubble_sort(arr):
      n = len(arr)

      for i in range(n - 1):
          swapped = False

          # Compara elementos adjacentes
          for j in range(n - i - 1):
              # Se o elemento atual é maior que o próximo, troca
              if arr[j] > arr[j + 1]:
                  swap(arr, j, j + 1)
                  swapped = True

          # Se não houve trocas nesta passada, o array está ordenado
          if not swapped:
              break

      return arr

  def swap(arr, i, j):
      arr[i], arr[j] = arr[j], arr[i]

  # Exemplo de Uso em Python
  dados = [64, 34, 25, 12, 22, 11, 90]
  ordenados = bubble_sort(dados.copy())
  print(f"Lista original: {dados}")
  print(f"Lista ordenada: {ordenados}")
`;

export const pythonImplementations = [
  {
    code: pythonCode,
    language: 'python',
    tabTitle: 'Python',
    tabValue: 'python-basic',
    title: 'Implementação do Bubble Sort - Python',
    description:
      'Implementação completa e didática do algoritmo Bubble Sort com otimização. Este código demonstra como comparar elementos adjacentes e trocá-los quando necessário, com parada antecipada quando não há mais trocas.'
  }
] as CodesBlock[];
