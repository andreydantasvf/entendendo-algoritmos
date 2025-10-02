import { type CodesBlock } from '@/types/code-block';

const pythonCode = `
  def insertion_sort(arr):
      n = len(arr)

      # Começa do segundo elemento (índice 1)
      for i in range(1, n):
          key = arr[i]
          j = i - 1

          # Move elementos maiores que key uma posição à frente
          while j >= 0 and arr[j] > key:
              arr[j + 1] = arr[j]
              j -= 1

          # Insere a chave na posição correta
          arr[j + 1] = key

      return arr

  # Exemplo de Uso em Python
  dados = [64, 34, 25, 12, 22, 11, 90]
  ordenados = insertion_sort(dados.copy())
  print(f"Lista original: {dados}")
  print(f"Lista ordenada: {ordenados}")
`;

export const pythonImplementations = [
  {
    code: pythonCode,
    language: 'python',
    tabTitle: 'Python',
    tabValue: 'python-basic',
    title: 'Implementação do Insertion Sort - Python',
    description:
      'Implementação completa e didática do algoritmo Insertion Sort. Este código demonstra como selecionar cada elemento e inseri-lo na posição correta da parte já ordenada, deslocando os elementos maiores para a direita.'
  }
] as CodesBlock[];
