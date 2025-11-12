'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateBFSSteps, predefinedGraphs } from '@/utils/breadthFirstSearch';
import { BFSStep, Graph } from '@/types/playground';
import { BFSPlaygroundControls } from './BFSPlaygroundControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, RotateCcw, SkipBack } from 'lucide-react';

function Queue({ queue }: { queue: string[] }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-center">Fila (Queue)</h4>
      <div className="flex flex-wrap gap-2 justify-center min-h-[60px] items-center bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border-2 border-dashed border-gray-300">
        {queue.length === 0 ? (
          <span className="text-sm text-gray-400">Vazia</span>
        ) : (
          queue.map((nodeId, index) => (
            <motion.div
              key={`${nodeId}-${index}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm border-2 border-blue-600 shadow-md"
            >
              {nodeId}
            </motion.div>
          ))
        )}
      </div>
      <p className="text-xs text-center text-gray-500">
        {queue.length > 0
          ? `Início ← ${queue.join(' ← ')} ← Fim`
          : 'Aguardando elementos...'}
      </p>
    </div>
  );
}

function GraphVisualization({
  graph,
  currentStep,
  startNode,
  targetNode
}: {
  graph: Graph;
  currentStep: BFSStep | null;
  startNode: string;
  targetNode: string;
}) {
  const getNodeColor = (nodeId: string) => {
    if (!currentStep) return '#94a3b8'; // gray-400

    if (currentStep.path.includes(nodeId)) {
      return '#22c55e'; // green-500 - caminho encontrado
    }
    if (currentStep.visited.includes(nodeId)) {
      return '#6b7280'; // gray-500 - visitado
    }
    if (currentStep.exploring.includes(nodeId)) {
      return '#eab308'; // yellow-500 - explorando
    }
    if (currentStep.queue.includes(nodeId)) {
      return '#3b82f6'; // blue-500 - na fila
    }
    if (nodeId === startNode) {
      return '#8b5cf6'; // violet-500 - início
    }
    if (nodeId === targetNode) {
      return '#ec4899'; // pink-500 - alvo
    }

    return '#94a3b8'; // gray-400 - não visitado
  };

  const getNodeBorderColor = (nodeId: string) => {
    if (currentStep?.currentNode === nodeId) {
      return '#f59e0b'; // amber-500 - nó atual
    }
    return '#1e293b'; // gray-800
  };

  const getEdgeColor = (from: string, to: string) => {
    if (!currentStep) return '#cbd5e1'; // gray-300

    // Se estamos explorando um nó, destaca suas conexões
    if (currentStep.currentNode) {
      if (from === currentStep.currentNode || to === currentStep.currentNode) {
        // Se é uma conexão com um nó sendo explorado neste momento
        if (
          currentStep.exploring.includes(from) ||
          currentStep.exploring.includes(to)
        ) {
          return '#eab308'; // yellow-500 - explorando agora
        }
        // Se é uma conexão com um nó que está sendo enfileirado
        if (
          currentStep.queue.includes(from) ||
          currentStep.queue.includes(to)
        ) {
          return '#3b82f6'; // blue-500 - adicionando à fila
        }
      }
    }

    // Se ambos os nós estão no caminho final encontrado
    if (currentStep.path.length > 0) {
      const pathIndex1 = currentStep.path.indexOf(from);
      const pathIndex2 = currentStep.path.indexOf(to);

      // Se ambos estão no caminho e são adjacentes
      if (
        pathIndex1 !== -1 &&
        pathIndex2 !== -1 &&
        Math.abs(pathIndex1 - pathIndex2) === 1
      ) {
        return '#22c55e'; // green-500 - caminho encontrado
      }
    }

    // Se qualquer um dos nós foi visitado, deixa a aresta mais escura
    if (
      currentStep.visited.includes(from) &&
      currentStep.visited.includes(to)
    ) {
      return '#94a3b8'; // gray-400 - ambos visitados
    }

    return '#cbd5e1'; // gray-300 - padrão
  };

  const getEdgeWidth = (from: string, to: string) => {
    if (!currentStep) return 3;

    // Se estamos explorando um nó e esta é uma de suas conexões
    if (currentStep.currentNode) {
      if (from === currentStep.currentNode || to === currentStep.currentNode) {
        // Se é uma conexão sendo explorada
        if (
          currentStep.exploring.includes(from) ||
          currentStep.exploring.includes(to)
        ) {
          return 5; // Mais grossa durante exploração
        }
        if (
          currentStep.queue.includes(from) ||
          currentStep.queue.includes(to)
        ) {
          return 4; // Um pouco mais grossa ao enfileirar
        }
      }
    }

    // Se faz parte do caminho final
    if (currentStep.path.length > 0) {
      const pathIndex1 = currentStep.path.indexOf(from);
      const pathIndex2 = currentStep.path.indexOf(to);

      if (
        pathIndex1 !== -1 &&
        pathIndex2 !== -1 &&
        Math.abs(pathIndex1 - pathIndex2) === 1
      ) {
        return 5; // Mais grossa para o caminho encontrado
      }
    }

    return 3; // Espessura padrão
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-center">Grafo</h4>
      <svg
        viewBox="0 0 500 400"
        className="w-full h-[400px] bg-white dark:bg-gray-950 rounded-lg border border-gray-300"
      >
        {/* Arestas */}
        {graph.edges.map((edge, index) => {
          const fromNode = graph.nodes.find((n) => n.id === edge.from);
          const toNode = graph.nodes.find((n) => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={`${edge.from}-${edge.to}-${index}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={getEdgeColor(edge.from, edge.to)}
              strokeWidth={getEdgeWidth(edge.from, edge.to)}
              animate={{
                stroke: getEdgeColor(edge.from, edge.to),
                strokeWidth: getEdgeWidth(edge.from, edge.to)
              }}
              transition={{ duration: 0.3 }}
            />
          );
        })}

        {/* Nós */}
        {graph.nodes.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="25"
              animate={{
                fill: getNodeColor(node.id),
                stroke: getNodeBorderColor(node.id)
              }}
              strokeWidth="3"
              transition={{ duration: 0.3 }}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-bold text-lg fill-white pointer-events-none"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function BFSPlayground() {
  const [graphType, setGraphType] = useState<'tree' | 'cycle' | 'complex'>(
    'tree'
  );
  const [startNode, setStartNode] = useState('A');
  const [targetNode, setTargetNode] = useState('G');
  const [steps, setSteps] = useState<BFSStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const graph = predefinedGraphs[graphType];

  const generateSteps = () => {
    const newSteps = generateBFSSteps(graph, startNode, targetNode);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    generateSteps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphType, startNode, targetNode]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1000 / speed);
    } else {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps, speed]);

  const currentStepData = useMemo(
    () => (steps[currentStep] ? steps[currentStep] : null),
    [steps, currentStep]
  );

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsPlaying(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  if (!currentStepData) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Visualização da Busca em Largura (BFS)
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Explore o grafo camada por camada até encontrar o nó alvo.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visualization */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Queue - Mobile: acima, Desktop: à esquerda */}
              <div className="md:order-2">
                <Queue queue={currentStepData.queue} />
              </div>

              {/* Graph */}
              <div className="md:order-1 md:col-span-1">
                <GraphVisualization
                  graph={graph}
                  currentStep={currentStepData}
                  startNode={startNode}
                  targetNode={targetNode}
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex flex-col sm:flex-row items-center gap-2 order-2 sm:order-1">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    size="sm"
                    className="cursor-pointer px-4 w-full sm:w-auto"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" /> Pausar
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" /> Play
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="sm"
                    className="cursor-pointer w-full sm:w-auto"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>

                  <Button
                    onClick={handleBack}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    disabled={currentStep <= 0}
                  >
                    <SkipBack className="h-4 w-4 mr-2" /> Voltar
                  </Button>

                  <Button
                    onClick={handleNext}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    disabled={currentStep >= steps.length - 1}
                  >
                    <SkipForward className="h-4 w-4 mr-2" /> Próximo
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground order-1 sm:order-2">
                  Passo {currentStep + 1} de {steps.length}
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  animate={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {currentStepData && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-muted/50 p-4 rounded-lg"
                >
                  <h4 className="font-medium mb-2">Ação Atual:</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {currentStepData.description}
                  </p>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <BFSPlaygroundControls
          graphType={graphType}
          startNode={startNode}
          targetNode={targetNode}
          speed={speed}
          availableNodes={graph.nodes.map((n) => n.id)}
          onGraphTypeChange={setGraphType}
          onStartNodeChange={setStartNode}
          onTargetNodeChange={setTargetNode}
          onSpeedChange={setSpeed}
          onReset={generateSteps}
        />
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold mb-3">Legenda:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-violet-500 rounded-full"></div>
                <span>Nó Inicial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                <span>Nó Alvo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span>Na Fila</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span>Explorando</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                <span>Visitado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Caminho Encontrado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-amber-600"></div>
                <span>Nó Atual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <span>Não Visitado</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
