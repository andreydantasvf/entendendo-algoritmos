'use client';

import { AlgorithmHeader } from '@/components/layout/AlgorithmHeader';
import { CodeImplementation } from '@/components/layout/CodeImplementation';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { pythonImplementations } from './python-implementation';
import { javascriptImplementations } from './js-implementation';
import CountingSortPlayground from '@/components/playground/counting-sort/CountingSortPlayground';

export default function CountingSortPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isAlgorithmPage />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AlgorithmHeader
            title="Counting Sort"
            description="Um algoritmo de ordenação não comparativo que utiliza contagem de ocorrências para ordenar elementos."
            temporalComplexity="O(n + k)"
            spatialComplexity="O(k)"
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
                  O que é o Counting Sort?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  O Counting Sort é um algoritmo de ordenação não comparativo
                  que funciona contando o número de ocorrências de cada elemento
                  único e usando essa informação para colocar os elementos nas
                  posições corretas. É extremamente eficiente quando o range de
                  valores é pequeno em relação ao número de elementos.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      ⚡ Como funciona:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Fase 1 - Contagem:</strong> Conta as
                        ocorrências de cada valor
                      </li>
                      <li>
                        • <strong>Fase 2 - Acumulação:</strong> Transforma
                        contagens em posições
                      </li>
                      <li>
                        • <strong>Fase 3 - Posicionamento:</strong> Coloca
                        elementos nas posições corretas
                      </li>
                      <li>
                        • <strong>Resultado:</strong> Array ordenado
                        estabilidade preservada
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      🎯 Características:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Não-comparativo:</strong> Não compara
                        elementos entre si
                      </li>
                      <li>
                        • <strong>Estável:</strong> Mantém ordem relativa de
                        elementos iguais
                      </li>
                      <li>
                        • <strong>Linear:</strong> O(n + k) onde k é o range de
                        valores
                      </li>
                      <li>
                        • <strong>Espaço extra:</strong> Requer O(k) de memória
                        adicional
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    💡 Quando usar:
                  </h4>
                  <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                    <li>
                      <strong>• Range pequeno:</strong> Quando o range de
                      valores é conhecido e limitado
                    </li>
                    <li>
                      <strong>• Muitas duplicatas:</strong> Excelente para dados
                      com valores repetidos
                    </li>
                    <li>
                      <strong>• Performance crítica:</strong> Quando O(n + k) é
                      melhor que O(n log n)
                    </li>
                    <li>
                      <strong>• Inteiros:</strong> Ideal para ordenar números
                      inteiros
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    ⚠️ Limitações:
                  </h4>
                  <ul className="text-amber-800 dark:text-amber-200 text-sm space-y-1">
                    <li>
                      <strong>• Memória:</strong> Ineficiente se o range k for
                      muito grande
                    </li>
                    <li>
                      <strong>• Tipo de dados:</strong> Funciona apenas com
                      inteiros ou dados mapeáveis
                    </li>
                    <li>
                      <strong>• Valores esparsos:</strong> Desperdiça memória
                      com ranges muito espaçados
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
                  Experimente o Counting Sort em tempo real. Veja como o
                  algoritmo conta ocorrências, acumula contagens e posiciona
                  elementos no array ordenado usando visualização de memória.
                </p>
              </CardHeader>
              <CardContent>
                <CountingSortPlayground />
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
              extraComponent={<CountingSortComparison />}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function CountingSortComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ Counting Sort vs Outros Algoritmos
        </h5>
        <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
          <li>
            • <strong>vs Quick Sort:</strong> Mais rápido com range pequeno,
            O(n+k) vs O(n log n)
          </li>
          <li>
            • <strong>vs Merge Sort:</strong> Usa mais memória, mas pode ser
            mais rápido
          </li>
          <li>
            • <strong>vs Radix Sort:</strong> Radix usa Counting Sort
            internamente
          </li>
          <li>
            • <strong>vs Bucket Sort:</strong> Similar, mas Bucket é mais
            versátil
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          ⚡ Complexidade Detalhada
        </h5>
        <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>
            • <strong>Tempo:</strong> O(n + k) em todos os casos
          </li>
          <li>
            • <strong>Espaço:</strong> O(n + k) para arrays auxiliares
          </li>
          <li>
            • <strong>n:</strong> Número de elementos no array
          </li>
          <li>
            • <strong>k:</strong> Range de valores (max - min + 1)
          </li>
        </ul>
      </div>
    </div>
  );
}
