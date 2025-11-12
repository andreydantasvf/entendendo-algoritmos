'use client';

import { AlgorithmHeader } from '@/components/layout/AlgorithmHeader';
import { Header } from '@/components/layout/Header';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeImplementation } from '@/components/layout/CodeImplementation';
import { jsImplementation } from './js-implementation';
import { pythonImplementation } from './python-implementation';
import BFSPlayground from '@/components/playground/breadth-first-search/BFSPlayground';

export default function BuscaEmLarguraPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isAlgorithmPage />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AlgorithmHeader
            title="Busca em Largura (BFS)"
            description="Um algoritmo de busca em grafos que explora todos os nós vizinhos antes de avançar para o próximo nível."
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
                  O que é a Busca em Largura (BFS)?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  A Busca em Largura (Breadth-First Search - BFS) é um algoritmo
                  fundamental para explorar grafos. Ele visita todos os nós em
                  um nível antes de avançar para o próximo nível, garantindo
                  encontrar o caminho mais curto em grafos não ponderados.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      ⚡ Como funciona:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Passo 1:</strong> Começa no nó inicial e o
                        adiciona à fila
                      </li>
                      <li>
                        • <strong>Passo 2:</strong> Remove o primeiro nó da fila
                        (FIFO)
                      </li>
                      <li>
                        • <strong>Passo 3:</strong> Visita todos os vizinhos não
                        visitados
                      </li>
                      <li>
                        • <strong>Passo 4:</strong> Adiciona os vizinhos à fila
                      </li>
                      <li>
                        • <strong>Repete:</strong> Até encontrar o alvo ou
                        esvaziar a fila
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-base">
                      🎯 Características:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>FIFO:</strong> Usa fila (First In, First Out)
                      </li>
                      <li>
                        • <strong>Nível por nível:</strong> Explora por camadas
                      </li>
                      <li>
                        • <strong>Caminho mais curto:</strong> Em grafos não
                        ponderados
                      </li>
                      <li>
                        • <strong>Completo:</strong> Encontra solução se existir
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    💡 Aplicações práticas:
                  </h4>
                  <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                    <li>
                      <strong>• Redes sociais:</strong> Encontrar conexões entre
                      pessoas
                    </li>
                    <li>
                      <strong>• GPS:</strong> Menor caminho entre dois pontos
                    </li>
                    <li>
                      <strong>• Web Crawlers:</strong> Explorar páginas web
                    </li>
                    <li>
                      <strong>• Jogos:</strong> Pathfinding em mapas sem pesos
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    ⚖️ BFS vs DFS:
                  </h4>
                  <ul className="text-purple-800 dark:text-purple-200 text-sm space-y-1">
                    <li>
                      <strong>• BFS:</strong> Usa fila, explora em largura,
                      caminho mais curto
                    </li>
                    <li>
                      <strong>• DFS:</strong> Usa pilha, explora em
                      profundidade, usa menos memória
                    </li>
                    <li>
                      <strong>• Escolha:</strong> BFS para menor caminho, DFS
                      para grafos grandes
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
                  Experimente a Busca em Largura em tempo real. Visualize como o
                  algoritmo explora o grafo nível por nível, usando uma fila
                  para controlar a ordem de visitação dos nós.
                </p>
              </CardHeader>
              <CardContent>
                <BFSPlayground />
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
                    'Versão iterativa usando uma fila (array) para controlar a ordem de visitação. Implementa BFS com lista de adjacências e rastreamento de caminho.'
                },
                {
                  code: pythonImplementation,
                  language: 'python',
                  tabTitle: 'Python',
                  tabValue: 'py-iterative',
                  title: 'Implementação Iterativa - Python',
                  description:
                    'Versão iterativa usando deque para operações eficientes na fila. Utiliza defaultdict para a lista de adjacências e conjunto para visitados.'
                }
              ]}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
