'use client';

import { AlgorithmHeader } from '@/components/layout/AlgorithmHeader';
import { CodeImplementation } from '@/components/layout/CodeImplementation';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { pythonImplementations } from './python-implementation';
import { javascriptImplementations } from './js-implementation';
import InsertionSortPlayground from '@/components/playground/insertion-sort/InsertionSortPlayground';

export default function InsertionSortPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isAlgorithmPage />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AlgorithmHeader
            title="Insertion Sort"
            description="Um algoritmo de ordenação simples que constrói a lista ordenada um item por vez, inserindo cada elemento na sua posição correta"
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
                  O que é o Insertion Sort?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  O Insertion Sort é um algoritmo de ordenação intuitivo que
                  funciona de forma similar a como organizamos cartas na mão.
                  Ele constrói a lista ordenada um elemento por vez, pegando
                  cada elemento e inserindo-o na posição correta dentro da parte
                  já ordenada do array.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      ⚡ Como funciona:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Seleciona:</strong> Pega o próximo elemento
                        não ordenado
                      </li>
                      <li>
                        • <strong>Compara:</strong> Compara com elementos da
                        parte ordenada
                      </li>
                      <li>
                        • <strong>Desloca:</strong> Move elementos maiores uma
                        posição à frente
                      </li>
                      <li>
                        • <strong>Insere:</strong> Coloca o elemento na posição
                        correta
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
                        • <strong>Estável:</strong> Mantém ordem relativa de
                        elementos iguais
                      </li>
                      <li>
                        • <strong>In-place:</strong> Usa apenas O(1) espaço
                        extra
                      </li>
                      <li>
                        • <strong>Adaptável:</strong> Eficiente para arrays
                        quase ordenados
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
                      <strong>• Arrays pequenos:</strong> Muito eficiente para
                      listas com poucos elementos
                    </li>
                    <li>
                      <strong>• Quase ordenados:</strong> Excelente para dados
                      já parcialmente ordenados
                    </li>
                    <li>
                      <strong>• Ordenação online:</strong> Pode ordenar dados
                      conforme eles chegam
                    </li>
                    <li>
                      <strong>• Simplicidade:</strong> Quando código simples é
                      mais importante que performance
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
                  Experimente o Insertion Sort em tempo real. Veja como cada
                  elemento é selecionado e inserido na posição correta da parte
                  já ordenada.
                </p>
              </CardHeader>
              <CardContent>
                <InsertionSortPlayground />
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
              extraComponent={<InsertionSortComparison />}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function InsertionSortComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          ✅ Insertion Sort vs Outros Algoritmos
        </h5>
        <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
          <li>
            • <strong>vs Bubble Sort:</strong> Geralmente mais eficiente, menos
            trocas
          </li>
          <li>
            • <strong>vs Selection Sort:</strong> Mais adaptável, melhor para
            dados quase ordenados
          </li>
          <li>
            • <strong>vs Merge Sort:</strong> Muito mais simples, mas O(n²) no
            pior caso
          </li>
          <li>
            • <strong>vs Quick Sort:</strong> Mais estável e previsível, mas
            mais lento
          </li>
        </ul>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
        <h5 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
          ⚡ Complexidade por Caso
        </h5>
        <ul className="text-amber-800 dark:text-amber-200 text-sm space-y-1">
          <li>
            • <strong>Melhor Caso:</strong> O(n) - Array já ordenado
          </li>
          <li>
            • <strong>Caso Médio:</strong> O(n²) - Array aleatório
          </li>
          <li>
            • <strong>Pior Caso:</strong> O(n²) - Array em ordem inversa
          </li>
          <li>
            • <strong>Espaço:</strong> O(1) - Ordenação in-place
          </li>
        </ul>
      </div>
    </div>
  );
}
