'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, HardDrive, Zap, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BinarySearchPlayground } from '@/components/playground/BinarySearchPlayground';

export default function BinarySearchPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                <BookOpen className="h-3 w-3 mr-1" />
                Capítulo 1
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tight">Busca Binária</h1>
            <p className="text-xl text-muted-foreground">
              Um algoritmo eficiente para encontrar elementos em arrays
              ordenados
            </p>

            {/* Algorithm Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">
                  Complexidade temporal:
                </span>
                <code className="font-mono bg-muted px-2 py-1 rounded">
                  O(log n)
                </code>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <HardDrive className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">
                  Complexidade espacial:
                </span>
                <code className="font-mono bg-muted px-2 py-1 rounded">
                  O(1)
                </code>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-muted-foreground">Dificuldade:</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Iniciante
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Explanation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Como funciona a Busca Binária?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  A busca binária é um algoritmo eficiente para encontrar um
                  elemento específico em um <strong>array ordenado</strong>. Em
                  vez de verificar cada elemento um por um (como na busca
                  linear), ela usa uma estratégia de &ldquo;dividir para
                  conquistar&rdquo;.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      ✅ Como funciona:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • Compara o elemento do meio com o valor procurado
                      </li>
                      <li>• Se for igual, encontrou!</li>
                      <li>• Se for menor, busca na metade direita</li>
                      <li>• Se for maior, busca na metade esquerda</li>
                      <li>• Repete até encontrar ou esgotar possibilidades</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      ⚡ Por que é eficiente:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Elimina metade das possibilidades a cada passo</li>
                      <li>• Para 1.000 elementos: máximo 10 comparações</li>
                      <li>• Para 1.000.000 elementos: máximo 20 comparações</li>
                      <li>• Crescimento logarítmico = muito eficiente!</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    💡 Requisito importante:
                  </h4>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    O array <strong>deve estar ordenado</strong> para que a
                    busca binária funcione. Caso contrário, o algoritmo pode não
                    encontrar elementos que estão presentes no array.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interactive Playground */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎮</span>
                  Playground Interativo
                </CardTitle>
                <p className="text-muted-foreground">
                  Experimente a busca binária em tempo real. Configure os dados
                  e acompanhe cada passo do algoritmo.
                </p>
              </CardHeader>
              <CardContent>
                <BinarySearchPlayground />
              </CardContent>
            </Card>
          </motion.div>

          {/* Implementation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Implementação em JavaScript</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`function buscaBinaria(array, target) {
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
const numeros = [1, 3, 5, 7, 9, 11, 13, 15];
const resultado = buscaBinaria(numeros, 7);
console.log(resultado); // 3 (índice do elemento 7)`}</code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
