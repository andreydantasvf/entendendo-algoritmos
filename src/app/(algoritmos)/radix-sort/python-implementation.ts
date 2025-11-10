import { type CodesBlock } from '@/types/code-block';

const pythonCode = `
  def get_digit(num, place):
      return (abs(num) // (10 ** place)) % 10

  def get_max_digits(arr):
      if not arr:
          return 0
      max_num = max(abs(x) for x in arr)
      if max_num == 0:
          return 1
      import math
      return math.floor(math.log10(max_num)) + 1

  def radix_sort(arr):
      if not arr:
          return arr

      max_digits = get_max_digits(arr)

      # Processar cada dígito, da direita para a esquerda
      for digit in range(max_digits):
          # Criar 10 buckets (0-9)
          buckets = [[] for _ in range(10)]

          # Distribuir elementos nos buckets baseado no dígito atual
          for num in arr:
              digit_value = get_digit(num, digit)
              buckets[digit_value].append(num)

          # Coletar elementos dos buckets na ordem
          arr = []
          for bucket in buckets:
              arr.extend(bucket)

      return arr

  # Exemplo de Uso em Python
  dados = [170, 45, 75, 90, 802, 24, 2, 66]
  ordenados = radix_sort(dados.copy())
  print(f"Lista original: {dados}")
  print(f"Lista ordenada: {ordenados}")

  # Exemplo com números menores
  dados2 = [329, 457, 657, 839, 436, 720, 355]
  ordenados2 = radix_sort(dados2.copy())
  print(f"Lista original: {dados2}")
  print(f"Lista ordenada: {ordenados2}")
`;

export const pythonImplementations = [
  {
    code: pythonCode,
    language: 'python',
    tabTitle: 'Python',
    tabValue: 'python-basic',
    title: 'Implementação do Radix Sort - Python',
    description:
      'Implementação completa e didática do algoritmo Radix Sort. Este código demonstra como distribuir elementos em buckets baseado em cada dígito e depois coletar os elementos na ordem. O algoritmo processa os dígitos da direita para a esquerda (LSD - Least Significant Digit).'
  }
] as CodesBlock[];
