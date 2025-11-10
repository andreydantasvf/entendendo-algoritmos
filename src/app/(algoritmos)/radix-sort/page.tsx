'use client';

import { AlgorithmHeader } from '@/components/layout/AlgorithmHeader';
import { CodeImplementation } from '@/components/layout/CodeImplementation';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { pythonImplementations } from './python-implementation';
import { javascriptImplementations } from './js-implementation';
import RadixSortPlayground from '@/components/playground/radix-sort/RadixSortPlayground';

export default function RadixSortPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isAlgorithmPage />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AlgorithmHeader
            title="Radix Sort"
            description="Um algoritmo de ordenação não comparativo que ordena elementos processando dígitos individuais."
            temporalComplexity="O(d × n)"
            spatialComplexity="O(n + k)"
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
                  O que é o Radix Sort?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  O Radix Sort é um algoritmo de ordenação não comparativo que
                  funciona processando os dígitos dos números individualmente.
                  Ele distribui os elementos em &quot;buckets&quot; (baldes)
                  baseado em cada dígito, começando do dígito menos
                  significativo (LSD - Least Significant Digit) até o mais
                  significativo.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      ⚡ Como funciona:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Passo 1:</strong> Identifica o número máximo
                        de dígitos
                      </li>
                      <li>
                        • <strong>Passo 2:</strong> Para cada dígito (da direita
                        para esquerda):
                      </li>
                      <li>
                        &nbsp;&nbsp;→ Distribui elementos em 10 buckets (0-9)
                      </li>
                      <li>
                        &nbsp;&nbsp;→ Coleta elementos na ordem dos buckets
                      </li>
                      <li>
                        • <strong>Resultado:</strong> Array completamente
                        ordenado
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
                        • <strong>Estável:</strong> Preserva ordem de elementos
                        iguais
                      </li>
                      <li>
                        • <strong>Linear:</strong> O(d × n) onde d é o número de
                        dígitos
                      </li>
                      <li>
                        • <strong>Usa Counting Sort:</strong> Internamente para
                        cada dígito
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    💡 Quando usar:
                  </h4>
                  <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                    <li>
                      <strong>• Inteiros:</strong> Ideal para ordenar números
                      inteiros
                    </li>
                    <li>
                      <strong>• Poucos dígitos:</strong> Eficiente quando d é
                      pequeno
                    </li>
                    <li>
                      <strong>• Grandes volumes:</strong> Excelente para muitos
                      elementos
                    </li>
                    <li>
                      <strong>• Dados uniformes:</strong> Quando números têm
                      tamanhos similares
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    🔍 Variações:
                  </h4>
                  <ul className="text-purple-800 dark:text-purple-200 text-sm space-y-1">
                    <li>
                      <strong>• LSD (Least Significant Digit):</strong> Da
                      direita para esquerda
                    </li>
                    <li>
                      <strong>• MSD (Most Significant Digit):</strong> Da
                      esquerda para direita
                    </li>
                    <li>
                      <strong>• Base variável:</strong> Pode usar base diferente
                      de 10
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
                  Experimente o Radix Sort em tempo real. Veja como os elementos
                  são distribuídos em buckets por dígito e depois coletados para
                  formar o array ordenado.
                </p>
              </CardHeader>
              <CardContent>
                <RadixSortPlayground />
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
              extraComponent={<RadixSortComparison />}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function RadixSortComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ Radix Sort vs Outros Algoritmos
        </h5>
        <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
          <li>
            • <strong>vs Counting Sort:</strong> Usa Counting Sort internamente,
            funciona com números maiores
          </li>
          <li>
            • <strong>vs Quick Sort:</strong> Pode ser mais rápido com inteiros
            e d pequeno
          </li>
          <li>
            • <strong>vs Merge Sort:</strong> Não comparativo, mas usa mais
            memória
          </li>
          <li>
            • <strong>vs Bucket Sort:</strong> Similar, mas focado em dígitos
          </li>
        </ul>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
        <h5 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
          ⚡ Complexidade Detalhada
        </h5>
        <ul className="text-amber-800 dark:text-amber-200 text-sm space-y-1">
          <li>
            • <strong>Tempo:</strong> O(d × (n + k)) onde d = nº de dígitos
          </li>
          <li>
            • <strong>Espaço:</strong> O(n + k) para buckets
          </li>
          <li>
            • <strong>n:</strong> Número de elementos
          </li>
          <li>
            • <strong>k:</strong> Range de valores (geralmente 10 para base 10)
          </li>
        </ul>
      </div>
    </div>
  );
}
