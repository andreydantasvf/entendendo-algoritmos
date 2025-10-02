'use client';

import { AlgorithmHeader } from '@/components/layout/AlgorithmHeader';
import { CodeImplementation } from '@/components/layout/CodeImplementation';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { pythonImplementations } from './python-implementation';
import { javascriptImplementations } from './js-implementation';
import BubbleSortPlayground from '@/components/playground/bubble-sort/BubbleSortPlayground';

export default function BubbleSortPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isAlgorithmPage />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AlgorithmHeader
            title="Bubble Sort"
            description="Um algoritmo simples de ordenação que compara e troca elementos adjacentes se estiverem na ordem errada"
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
                  O que é o Bubble Sort?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  O Bubble Sort é um algoritmo de ordenação simples que funciona
                  comparando elementos adjacentes e trocando-os se estiverem na
                  ordem errada. O nome vem do fato de que os elementos maiores
                  &quot;borbulham&quot; para o final do array, como bolhas
                  subindo na água.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      ⚡ Como funciona:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Compara:</strong> Compara elementos adjacentes
                        no array
                      </li>
                      <li>
                        • <strong>Troca:</strong> Troca elementos se estiverem
                        na ordem errada
                      </li>
                      <li>
                        • <strong>Passa:</strong> Faz uma passada completa pelo
                        array
                      </li>
                      <li>
                        • <strong>Repete:</strong> Repete até não haver mais
                        trocas
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      🎯 Características:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Simples:</strong> Muito fácil de entender e
                        implementar
                      </li>
                      <li>
                        • <strong>Estável:</strong> Preserva ordem relativa de
                        elementos iguais
                      </li>
                      <li>
                        • <strong>In-place:</strong> Usa apenas O(1) espaço
                        extra
                      </li>
                      <li>
                        • <strong>Adaptável:</strong> Pode parar cedo se array
                        já ordenado
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
                      <strong>• Lento:</strong> O(n²) no pior caso, mesmo com
                      otimizações
                    </li>
                    <li>
                      <strong>• Muitas trocas:</strong> Pode fazer muitas trocas
                      desnecessárias
                    </li>
                    <li>
                      <strong>• Ineficiente:</strong> Não é prático para arrays
                      grandes
                    </li>
                    <li>
                      <strong>• Comparações:</strong> Sempre faz n(n-1)/2
                      comparações no pior caso
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
                  Experimente o Bubble Sort em tempo real. Veja como o algoritmo
                  compara elementos adjacentes e os troca quando necessário
                  passo a passo.
                </p>
              </CardHeader>
              <CardContent>
                <BubbleSortPlayground />
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
              extraComponent={<BubbleSortComparison />}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function BubbleSortComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ Bubble Sort vs Outros Algoritmos
        </h5>
        <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
          <li>
            • <strong>vs Merge Sort:</strong> Mais simples, mas muito mais lento
          </li>
          <li>
            • <strong>vs Quick Sort:</strong> Mais estável, mas sempre O(n²)
          </li>
          <li>
            • <strong>vs Selection Sort:</strong> Mais trocas, mesmo número de
            comparações
          </li>
          <li>
            • <strong>vs Insertion Sort:</strong> Mais simples, mas menos
            eficiente
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🔄 Variações do Bubble Sort
        </h5>
        <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>
            • <strong>Cocktail Shaker:</strong> Vai e volta pelo array
          </li>
          <li>
            • <strong>Optimized:</strong> Para quando não há trocas
          </li>
          <li>
            • <strong>Comb Sort:</strong> Usa gaps maiores que 1
          </li>
          <li>
            • <strong>Gnome Sort:</strong> Versão mais simples do Bubble Sort
          </li>
        </ul>
      </div>
    </div>
  );
}
