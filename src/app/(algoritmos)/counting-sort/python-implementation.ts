import { type CodesBlock } from '@/types/code-block';

const pythonCode = `
  def counting_sort(arr):
      n = len(arr)
      if n == 0:
          return arr

      # Encontrar valores mínimo e máximo
      min_value = min(arr)
      max_value = max(arr)
      range_size = max_value - min_value + 1

      # Criar array de contagem
      count = [0] * range_size
      output = [0] * n

      # Fase 1: Contar ocorrências de cada elemento
      for i in range(n):
          count[arr[i] - min_value] += 1

      # Fase 2: Acumular contagens (soma prefixada)
      for i in range(1, range_size):
          count[i] += count[i - 1]

      # Fase 3: Construir array de saída (de trás para frente para estabilidade)
      for i in range(n - 1, -1, -1):
          value = arr[i]
          index = value - min_value
          output[count[index] - 1] = value
          count[index] -= 1

      return output

  # Exemplo de Uso em Python
  dados = [4, 2, 2, 8, 3, 3, 1]
  ordenados = counting_sort(dados.copy())
  print(f"Lista original: {dados}")
  print(f"Lista ordenada: {ordenados}")

  # Exemplo com valores negativos
  dados_negativos = [5, -2, 3, -1, 0, 4]
  ordenados_negativos = counting_sort(dados_negativos.copy())
  print(f"Lista com negativos: {dados_negativos}")
  print(f"Lista ordenada: {ordenados_negativos}")
`;

export const pythonImplementations = [
  {
    code: pythonCode,
    language: 'python',
    tabTitle: 'Python',
    tabValue: 'python-basic',
    title: 'Implementação do Counting Sort - Python',
    description:
      'Implementação completa e didática do algoritmo Counting Sort. Este código demonstra as três fases principais: contagem de ocorrências, acumulação de contagens e construção do array ordenado. O algoritmo é estável e funciona com valores negativos.'
  }
] as CodesBlock[];
