import { type CodesBlock } from '@/types/code-block';

const pythonCode = `
  def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    meio = len(arr) // 2
    esquerda = arr[:meio]
    direita = arr[meio:]

    esquerda = merge_sort(esquerda)
    direita = merge_sort(direita)

    return merge(esquerda, direita)

def merge(esquerda, direita):
    resultado = []
    i = j = 0

    while i < len(esquerda) and j < len(direita):
        if esquerda[i] < direita[j]:
            resultado.append(esquerda[i])
            i += 1
        else:
            resultado.append(direita[j])
            j += 1

    resultado.extend(esquerda[i:])
    resultado.extend(direita[j:])
    return resultado

# Exemplo de Uso em Python
dados = [38, 27, 43, 3, 9, 82, 10]
ordenados = merge_sort(dados)
print(f"Lista original: {dados}")
print(f"Lista ordenada: {ordenados}")
`;

export const pythonImplementations = [
  {
    code: pythonCode,
    language: 'python',
    tabTitle: 'Python',
    tabValue: 'python-basic',
    title: 'Implementação do Merge Sort - Python',
    description:
      'Implementação completa e didática do algoritmo Merge Sort usando a estratégia "dividir para conquistar". Este código demonstra como dividir recursivamente o array em sub-arrays menores e depois mesclá-los de forma ordenada, garantindo complexidade O(n log n) em todos os casos.'
  }
] as CodesBlock[];
