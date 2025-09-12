'use client';

import { AlgorithmHeader } from '@/components/layout/AlgorithmHeader';
import { CodeImplementation } from '@/components/layout/CodeImplementation';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { pythonImplementations } from './python-implementation';
import { javascriptImplementations } from './js-implementation';

export default function MergeSortPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isAlgorithmPage />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AlgorithmHeader
            title="Merge Sort"
            description="Um algoritmo eficiente para ordenar arrays usando divisão e conquista"
            temporalComplexity="O(n log n)"
            spatialComplexity="O(n)"
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
                  O que é o Merge Sort?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  O Merge Sort é um algoritmo de ordenação eficiente que utiliza
                  a técnica de{' '}
                  <strong>&quot;dividir para conquistar&quot;</strong>. Ele
                  divide o array em subarrays menores, ordena cada um deles
                  recursivamente e, em seguida, os mescla para produzir um array
                  completamente ordenado.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      ⚡ Como funciona:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Divide:</strong> Array é dividido
                        recursivamente ao meio
                      </li>
                      <li>
                        • <strong>Conquista:</strong> Subarrays de 1 elemento
                        são ordenados
                      </li>
                      <li>
                        • <strong>Combina:</strong> Mescla subarrays ordenados
                        em ordem
                      </li>
                      <li>
                        • <strong>Repete:</strong> Processo continua até formar
                        array final
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      🎯 Características:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Estável:</strong> Mantém ordem relativa de
                        elementos iguais
                      </li>
                      <li>
                        • <strong>Consistente:</strong> O(n log n) em todos os
                        casos
                      </li>
                      <li>
                        • <strong>Recursivo:</strong> Utiliza chamadas
                        recursivas
                      </li>
                      <li>
                        • <strong>Divide e conquista:</strong> Estratégia
                        fundamental
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
                      <strong>• Uso de memória:</strong> Precisa de O(n) espaço
                      extra
                    </li>
                    <li>
                      <strong>• Overhead de recursão:</strong> Muitas chamadas
                      de função
                    </li>
                    <li>
                      <strong>• Arrays pequenos:</strong> Pode ser mais lento
                      que algoritmos simples
                    </li>
                    <li>
                      <strong>• Complexidade:</strong> Mais complexo de
                      implementar que Selection/Insertion Sort
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
                  Experimente o Merge Sort em tempo real. Veja como o algoritmo
                  divide e mescla os elementos passo a passo.
                </p>
              </CardHeader>
              <CardContent>
                {/* A visualização do merge sort deve ficar localizada aqui*/}
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
              extraComponent={<MergeSortComparison />}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function MergeSortComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ Merge Sort vs Outros Algoritmos
        </h5>
        <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
          <li>
            • <strong>vs Quick Sort:</strong> Mais estável, mas usa mais memória
          </li>
          <li>
            • <strong>vs Heap Sort:</strong> Estável e mais previsível
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
          🔄 Variações do Merge Sort
        </h5>
        <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>
            • <strong>Bottom-up:</strong> Versão iterativa sem recursão
          </li>
          <li>
            • <strong>In-place:</strong> Variações que usam menos memória
          </li>
          <li>
            • <strong>3-way:</strong> Para arrays com muitos elementos
            duplicados
          </li>
          <li>
            • <strong>External:</strong> Para ordenar arquivos muito grandes
          </li>
        </ul>
      </div>
    </div>
  );
}
