'use client';

import { AlgorithmHeader } from '@/components/layout/AlgorithmHeader';
import { CodeImplementation } from '@/components/layout/CodeImplementation';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { pythonImplementations } from './python-implementation';
import { javascriptImplementations } from './js-implementation';
import SelectionSortPlayground from '@/components/playground/selection-sort/SelectionSortPlayground';

export default function SelectionSortPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isAlgorithmPage />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AlgorithmHeader
            title="Selection Sort"
            description="Um algoritmo simples de ordenação que encontra o menor elemento e o coloca na posição correta"
            temporalComplexity="O(n²)"
            spatialComplexity="O(1)"
            difficulty="Iniciante"
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
                  O que é o Selection Sort?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  O Selection Sort é um algoritmo de ordenação simples que
                  funciona encontrando repetidamente o menor elemento não
                  ordenado e colocando-o na posição correta. É um dos algoritmos
                  mais intuitivos de entender e implementar.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      ⚡ Como funciona:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Busca:</strong> Encontra o menor elemento no
                        array não ordenado
                      </li>
                      <li>
                        • <strong>Troca:</strong> Move o menor elemento para a
                        posição atual
                      </li>
                      <li>
                        • <strong>Avança:</strong> Move para a próxima posição
                        não ordenada
                      </li>
                      <li>
                        • <strong>Repete:</strong> Continua até ordenar todo o
                        array
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      🎯 Características:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Simples:</strong> Fácil de entender e
                        implementar
                      </li>
                      <li>
                        • <strong>In-place:</strong> Usa apenas O(1) espaço
                        extra
                      </li>
                      <li>
                        • <strong>Instável:</strong> Pode alterar ordem de
                        elementos iguais
                      </li>
                      <li>
                        • <strong>Previsível:</strong> Sempre O(n²) comparações
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
                      <strong>• Lento:</strong> O(n²) em todos os casos, mesmo
                      arrays já ordenados
                    </li>
                    <li>
                      <strong>• Muitas comparações:</strong> Sempre faz n(n-1)/2
                      comparações
                    </li>
                    <li>
                      <strong>• Não adaptável:</strong> Não melhora com arrays
                      parcialmente ordenados
                    </li>
                    <li>
                      <strong>• Instável:</strong> Não preserva ordem relativa
                      de elementos iguais
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
                  Experimente o Selection Sort em tempo real. Veja como o
                  algoritmo encontra o menor elemento e o coloca na posição
                  correta passo a passo.
                </p>
              </CardHeader>
              <CardContent>
                <SelectionSortPlayground />
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
              extraComponent={<SelectionSortComparison />}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function SelectionSortComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ Selection Sort vs Outros Algoritmos
        </h5>
        <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
          <li>
            • <strong>vs Merge Sort:</strong> Mais simples, mas muito mais lento
          </li>
          <li>
            • <strong>vs Quick Sort:</strong> Mais previsível, mas sempre O(n²)
          </li>
          <li>
            • <strong>vs Bubble Sort:</strong> Menos trocas, mesmo número de
            comparações
          </li>
          <li>
            • <strong>vs Insertion Sort:</strong> Mais trocas, menos comparações
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🔄 Variações do Selection Sort
        </h5>
        <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>
            • <strong>Double Selection:</strong> Encontra min e max
            simultaneamente
          </li>
          <li>
            • <strong>Heap Sort:</strong> Usa heap para encontrar o mínimo
          </li>
          <li>
            • <strong>Tournament:</strong> Usa torneio para encontrar o mínimo
          </li>
          <li>
            • <strong>Stable:</strong> Versão estável preservando ordem relativa
          </li>
        </ul>
      </div>
    </div>
  );
}
