'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/CodeBlock';

const javascriptCode = `function buscaBinaria(array, target) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] === target) {
      return mid; // Encontrou! Retorna o índice
    } else if (array[mid] < target) {
      left = mid + 1; // Busca na metade direita
    } else {
      right = mid - 1; // Busca na metade esquerda
    }
  }

  return -1; // Não encontrou
}

// Exemplo de uso:
const numeros = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const resultado = buscaBinaria(numeros, 7);
console.log(resultado); // 3 (índice do elemento 7)

// Testando com elemento que não existe:
const naoExiste = buscaBinaria(numeros, 4);
console.log(naoExiste); // -1 (não encontrado)`;

const pythonCode = `def busca_binaria(array, target):
    """
    Realiza busca binária em um array ordenado.

    Args:
        array: Lista ordenada de elementos
        target: Elemento a ser procurado

    Returns:
        int: Índice do elemento se encontrado, -1 caso contrário
    """
    left = 0
    right = len(array) - 1

    while left <= right:
        mid = (left + right) // 2

        if array[mid] == target:
            return mid  # Encontrou! Retorna o índice
        elif array[mid] < target:
            left = mid + 1  # Busca na metade direita
        else:
            right = mid - 1  # Busca na metade esquerda

    return -1  # Não encontrou

# Exemplo de uso:
numeros = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
resultado = busca_binaria(numeros, 7)
print(resultado)  # 3 (índice do elemento 7)

# Testando com elemento que não existe:
nao_existe = busca_binaria(numeros, 4)
print(nao_existe)  # -1 (não encontrado)`;

const javascriptRecursiveCode = `function buscaBinariaRecursiva(array, target, left = 0, right = array.length - 1) {
  // Caso base: elemento não encontrado
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);

  // Caso base: elemento encontrado
  if (array[mid] === target) {
    return mid;
  }

  // Busca recursiva na metade apropriada
  if (array[mid] < target) {
    return buscaBinariaRecursiva(array, target, mid + 1, right);
  } else {
    return buscaBinariaRecursiva(array, target, left, mid - 1);
  }
}

// Exemplo de uso:
const numeros = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const resultado = buscaBinariaRecursiva(numeros, 7);
console.log(resultado); // 3`;

const pythonRecursiveCode = `def busca_binaria_recursiva(array, target, left=0, right=None):
    """
    Versão recursiva da busca binária.

    Args:
        array: Lista ordenada de elementos
        target: Elemento a ser procurado
        left: Índice inicial (padrão: 0)
        right: Índice final (padrão: len(array) - 1)

    Returns:
        int: Índice do elemento se encontrado, -1 caso contrário
    """
    if right is None:
        right = len(array) - 1

    # Caso base: elemento não encontrado
    if left > right:
        return -1

    mid = (left + right) // 2

    # Caso base: elemento encontrado
    if array[mid] == target:
        return mid

    # Busca recursiva na metade apropriada
    if array[mid] < target:
        return busca_binaria_recursiva(array, target, mid + 1, right)
    else:
        return busca_binaria_recursiva(array, target, left, mid - 1)

# Exemplo de uso:
numeros = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
resultado = busca_binaria_recursiva(numeros, 7)
print(resultado)  # 3`;

export function CodeImplementation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Implementações</CardTitle>
        <p className="text-muted-foreground text-sm">
          Exemplos práticos do algoritmo em diferentes linguagens e abordagens
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="js-iterative" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="js-iterative">JavaScript</TabsTrigger>
            <TabsTrigger value="python-iterative">Python</TabsTrigger>
            <TabsTrigger value="js-recursive">JS Recursivo</TabsTrigger>
            <TabsTrigger value="python-recursive">Python Recursivo</TabsTrigger>
          </TabsList>

          <TabsContent value="js-iterative" className="mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold">
                Implementação Iterativa - JavaScript
              </h4>
              <p className="text-sm text-muted-foreground">
                Versão iterativa usando um loop while. Mais eficiente em termos
                de memória.
              </p>
              <CodeBlock code={javascriptCode} language="javascript" />
            </div>
          </TabsContent>

          <TabsContent value="python-iterative" className="mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold">
                Implementação Iterativa - Python
              </h4>
              <p className="text-sm text-muted-foreground">
                Versão Python com documentação completa e tipagem clara.
              </p>
              <CodeBlock code={pythonCode} language="python" />
            </div>
          </TabsContent>

          <TabsContent value="js-recursive" className="mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold">
                Implementação Recursiva - JavaScript
              </h4>
              <p className="text-sm text-muted-foreground">
                Versão recursiva mais elegante, mas usa mais memória devido à
                pilha de chamadas.
              </p>
              <CodeBlock code={javascriptRecursiveCode} language="javascript" />
            </div>
          </TabsContent>

          <TabsContent value="python-recursive" className="mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold">
                Implementação Recursiva - Python
              </h4>
              <p className="text-sm text-muted-foreground">
                Implementação recursiva em Python com tratamento de parâmetros
                opcionais.
              </p>
              <CodeBlock code={pythonRecursiveCode} language="python" />
            </div>
          </TabsContent>
        </Tabs>

        {/* Additional Notes */}
        <div className="mt-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                ✅ Versão Iterativa
              </h5>
              <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                <li>• Usa O(1) de memória extra</li>
                <li>• Mais eficiente para arrays grandes</li>
                <li>• Não há risco de stack overflow</li>
                <li>• Geralmente mais rápida na prática</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                📚 Versão Recursiva
              </h5>
              <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                <li>• Mais elegante e legível</li>
                <li>• Usa O(log n) de memória (pilha)</li>
                <li>• Boa para fins educacionais</li>
                <li>• Pode causar stack overflow em arrays muito grandes</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
