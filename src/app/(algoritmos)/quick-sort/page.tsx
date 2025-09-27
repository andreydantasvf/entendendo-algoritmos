'use client';

import { AlgorithmHeader } from '@/components/layout/AlgorithmHeader';
import { CodeImplementation } from '@/components/layout/CodeImplementation';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { pythonImplementations } from './python-implementation';
import { javascriptImplementations } from './js-implementation';
import QuickSortPlayground from '@/components/playground/quick-sort/QuickSortPlayground';

export default function QuickSortPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isAlgorithmPage />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AlgorithmHeader
            title="Quick Sort"
            description="Um algoritmo eficiente para ordenar arrays usando divisão e conquista"
            temporalComplexity="O(n log n)"
            spatialComplexity="O(log n)"
            difficulty="Intermediário"
          />

          {/* Explanation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="gap-4">
              <CardHeader>
                <CardTitle className="text-2xl">
                  O que é o Quick Sort?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  O Quick Sort é um algoritmo de ordenação eficiente que utiliza
                  a técnica de{' '}
                  <strong>&quot;dividir para conquistar&quot;</strong>. Ele
                  escolhe um elemento como pivô, particiona o array em torno do
                  pivô e ordena recursivamente os subarrays resultantes.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      ⚡ Como funciona:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Escolhe pivô:</strong> Seleciona elemento para
                        particionar o array
                      </li>
                      <li>
                        • <strong>Particiona:</strong> Reorganiza elementos
                        menores e maiores que o pivô
                      </li>
                      <li>
                        • <strong>Posiciona pivô:</strong> Coloca pivô em sua
                        posição final correta
                      </li>
                      <li>
                        • <strong>Recursão:</strong> Aplica algoritmo nos
                        subarrays esquerdo e direito
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      🎯 Características:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>In-place:</strong> Ordena sem usar espaço
                        extra significativo
                      </li>
                      <li>
                        • <strong>Rápido:</strong> O(n log n) no caso médio
                      </li>
                      <li>
                        • <strong>Instável:</strong> Pode alterar ordem relativa
                        de elementos iguais
                      </li>
                      <li>
                        • <strong>Adaptável:</strong> Performance varia com
                        escolha do pivô
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    ⚠️ Considerações:
                  </h4>
                  <ul className="text-amber-800 dark:text-amber-200 text-sm space-y-1">
                    <li>
                      <strong>• Pior caso:</strong> O(n²) quando pivô é sempre
                      mínimo ou máximo
                    </li>
                    <li>
                      <strong>• Escolha do pivô:</strong> Crucial para
                      performance
                    </li>
                    <li>
                      <strong>• Arrays pequenos:</strong> Pode ser mais lento
                      que algoritmos simples
                    </li>
                    <li>
                      <strong>• Instabilidade:</strong> Não preserva ordem
                      relativa de elementos iguais
                    </li>
                  </ul>
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
                  Experimente o Quick Sort em tempo real. Veja como o algoritmo
                  particiona o array usando pivôs e ordena recursivamente.
                </p>
              </CardHeader>
              <CardContent>
                <QuickSortPlayground />
              </CardContent>
            </Card>
          </motion.div>

          {/* Implementation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <CodeImplementation
              codes={[...javascriptImplementations, ...pythonImplementations]}
              extraComponent={<QuickSortComparison />}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function QuickSortComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ Quick Sort vs Outros Algoritmos
        </h5>
        <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
          <li>
            • <strong>vs Merge Sort:</strong> Mais rápido no caso médio, usa
            menos memória
          </li>
          <li>
            • <strong>vs Heap Sort:</strong> Geralmente mais rápido, mas menos
            previsível
          </li>
          <li>
            • <strong>vs Bubble/Selection:</strong> Muito mais rápido O(n log n)
            vs O(n²)
          </li>
          <li>
            • <strong>vs Insertion Sort:</strong> Melhor para arrays grandes
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🔄 Variações do Quick Sort
        </h5>
        <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>
            • <strong>Randomized:</strong> Escolhe pivô aleatoriamente
          </li>
          <li>
            • <strong>3-way:</strong> Para arrays com muitos elementos
            duplicados
          </li>
          <li>
            • <strong>Hybrid:</strong> Combina com Insertion Sort para arrays
            pequenos
          </li>
          <li>
            • <strong>Iterative:</strong> Versão sem recursão usando pilha
          </li>
        </ul>
      </div>
    </div>
  );
}
