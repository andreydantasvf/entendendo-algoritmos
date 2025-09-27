'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BinarySearchPlayground } from '@/components/playground/binary-search/BinarySearchPlayground';
import { ComplexityAnalysis } from './ComplexityAnalysis';
import { CodeImplementation } from '@/components/layout/CodeImplementation';
import { Header } from '@/components/layout/Header';
import { AlgorithmHeader } from '@/components/layout/AlgorithmHeader';
import { javascriptImplementations } from './js-implementation';
import { pythonImplementations } from './python-implementation';

export default function BinarySearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isAlgorithmPage />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AlgorithmHeader
            title="Busca Binária"
            description="Um algoritmo eficiente para encontrar elementos em arrays ordenados"
            temporalComplexity="O(log n)"
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
                  O que é a Busca Binária?
                </CardTitle>
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

          {/* Complexity Analysis Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ComplexityAnalysis />
          </motion.div>

          {/* Implementation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <CodeImplementation
              codes={[...javascriptImplementations, ...pythonImplementations]}
              extraComponent={<ImplementationComparative />}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function ImplementationComparative() {
  return (
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
  );
}
