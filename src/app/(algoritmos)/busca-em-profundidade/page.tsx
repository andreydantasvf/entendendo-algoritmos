'use client';

import { AlgorithmHeader } from '@/components/layout/AlgorithmHeader';
import { Header } from '@/components/layout/Header';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeImplementation } from '@/components/layout/CodeImplementation';
import { jsImplementation } from './js-implementation';
import { pythonImplementation } from './python-implementation';
import DFSPlayground from '@/components/playground/depth-first-search/DFSPlayground';

export default function BuscaEmProfundidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isAlgorithmPage />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AlgorithmHeader
            title="Busca em Profundidade (DFS)"
            description="Um algoritmo de busca em grafos que explora o máximo possível em cada ramo antes de retroceder."
            temporalComplexity="O(V + E)"
            spatialComplexity="O(V)"
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
                  O que é a Busca em Profundidade (DFS)?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  A Busca em Profundidade (Depth-First Search - DFS) é um
                  algoritmo fundamental para explorar grafos. Ele explora o
                  máximo possível em cada ramo antes de retroceder, usando uma
                  pilha (stack) para controlar a ordem de visitação dos nós.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      ⚡ Como funciona:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Passo 1:</strong> Começa no nó inicial e o
                        adiciona à pilha
                      </li>
                      <li>
                        • <strong>Passo 2:</strong> Remove o último nó da pilha
                        (LIFO)
                      </li>
                      <li>
                        • <strong>Passo 3:</strong> Marca o nó como visitado
                      </li>
                      <li>
                        • <strong>Passo 4:</strong> Adiciona vizinhos não
                        visitados à pilha
                      </li>
                      <li>
                        • <strong>Repete:</strong> Até encontrar o alvo ou
                        esvaziar a pilha
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      🎯 Características:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>LIFO:</strong> Usa pilha (Last In, First Out)
                      </li>
                      <li>
                        • <strong>Profundidade primeiro:</strong> Explora um
                        ramo até o fim
                      </li>
                      <li>
                        • <strong>Menos memória:</strong> Usa menos memória que
                        BFS
                      </li>
                      <li>
                        • <strong>Backtracking:</strong> Retrocede quando não há
                        mais nós
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    💡 Aplicações práticas:
                  </h4>
                  <ul className="text-purple-800 dark:text-purple-200 text-sm space-y-1">
                    <li>
                      <strong>• Detecção de ciclos:</strong> Encontrar ciclos em
                      grafos
                    </li>
                    <li>
                      <strong>• Ordenação topológica:</strong> Ordenar tarefas
                      com dependências
                    </li>
                    <li>
                      <strong>• Labirintos:</strong> Resolver labirintos e
                      quebra-cabeças
                    </li>
                    <li>
                      <strong>• Componentes conectados:</strong> Encontrar
                      componentes em grafos
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    ⚖️ DFS vs BFS:
                  </h4>
                  <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                    <li>
                      <strong>• DFS:</strong> Usa pilha, explora em
                      profundidade, usa menos memória
                    </li>
                    <li>
                      <strong>• BFS:</strong> Usa fila, explora em largura,
                      caminho mais curto
                    </li>
                    <li>
                      <strong>• Escolha:</strong> DFS para grafos grandes e
                      detecção de ciclos, BFS para menor caminho
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
                  Experimente a Busca em Profundidade em tempo real. Visualize
                  como o algoritmo explora o grafo em profundidade, usando uma
                  pilha para controlar a ordem de visitação dos nós.
                </p>
              </CardHeader>
              <CardContent>
                <DFSPlayground />
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
              codes={[
                {
                  code: jsImplementation,
                  language: 'javascript',
                  tabTitle: 'JavaScript',
                  tabValue: 'js-iterative',
                  title: 'Implementação Iterativa - JavaScript',
                  description:
                    'Versão iterativa usando uma pilha (array) para controlar a ordem de visitação. Implementa DFS com lista de adjacências e rastreamento de caminho.'
                },
                {
                  code: pythonImplementation,
                  language: 'python',
                  tabTitle: 'Python',
                  tabValue: 'py-iterative',
                  title: 'Implementação Iterativa - Python',
                  description:
                    'Versão iterativa usando lista para a pilha. Utiliza defaultdict para a lista de adjacências e conjunto para visitados.'
                }
              ]}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
