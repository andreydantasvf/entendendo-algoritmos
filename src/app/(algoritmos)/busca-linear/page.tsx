'use client';

import { AlgorithmHeader } from '@/components/layout/AlgorithmHeader';
import { CodeImplementation } from '@/components/layout/CodeImplementation';
import { Header } from '@/components/layout/Header';
import { LinearSearchPlayground } from '@/components/playground/linear-search/LinearSearchPlayground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { javascriptImplementations } from './js-implementation';
import { pythonImplementations } from './python-implementation';

export default function LinearSearch() {
  return (
    <div className="min-h-screen bg-background">
      <Header isAlgorithmPage />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AlgorithmHeader
            title="Busca Linear"
            description="Um algoritmo simples para encontrar elementos em arrays"
            temporalComplexity="O(n)"
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
                  O que é a Busca Linear?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  A busca linear é o algoritmo de busca mais simples e
                  intuitivo. Ela percorre um array{' '}
                  <strong>elemento por elemento</strong>, do início ao fim,
                  comparando cada item com o valor procurado até encontrá-lo ou
                  chegar ao final do array.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      ✅ Como funciona:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Começa no primeiro elemento do array</li>
                      <li>• Compara com o valor procurado</li>
                      <li>• Se encontrou, retorna a posição</li>
                      <li>• Se não encontrou, vai para o próximo elemento</li>
                      <li>• Repete até encontrar ou terminar o array</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      💡 Características:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Funciona com arrays ordenados e não ordenados</li>
                      <li>• Simples de implementar e entender</li>
                      <li>• Não requer memória extra</li>
                      <li>• Garante encontrar o elemento se ele existir</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    ✨ Vantagem principal:
                  </h4>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    <strong>Simplicidade total!</strong> Não requer que o array
                    esteja ordenado e é muito fácil de implementar. É ideal para
                    arrays pequenos ou quando a simplicidade é mais importante
                    que a performance.
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    ⚠️ Limitação:
                  </h4>
                  <p className="text-amber-800 dark:text-amber-200 text-sm">
                    Para arrays grandes, pode ser lenta. No pior caso (elemento
                    no final ou inexistente), precisa verificar todos os
                    elementos. Para 1 milhão de elementos, pode fazer até 1
                    milhão de comparações!
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
                  Experimente a busca linear em tempo real. Veja como o
                  algoritmo verifica cada elemento sequencialmente.
                </p>
              </CardHeader>
              <CardContent>
                <LinearSearchPlayground />
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
              extraComponent={<ImplementationComparison />}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function ImplementationComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ Busca Linear vs Busca Binária
        </h5>
        <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
          <li>
            • <strong>Simplicidade:</strong> Muito mais simples de implementar
          </li>
          <li>
            • <strong>Flexibilidade:</strong> Funciona com arrays não ordenados
          </li>
          <li>
            • <strong>Memória:</strong> Usa O(1) de espaço extra
          </li>
          <li>
            • <strong>Casos pequenos:</strong> Pode ser mais rápida para arrays
            pequenos
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          📊 Quando usar cada uma
        </h5>
        <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>
            • <strong>Linear:</strong> Arrays pequenos, não ordenados,
            simplicidade
          </li>
          <li>
            • <strong>Binária:</strong> Arrays grandes, ordenados, performance
            crítica
          </li>
          <li>
            • <strong>Dica:</strong> Se já está ordenado, sempre use binária!
          </li>
        </ul>
      </div>
    </div>
  );
}
