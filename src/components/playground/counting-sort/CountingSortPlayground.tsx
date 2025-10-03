'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCountingSortSteps } from '@/utils/countingSort';
import { CountingSortStep } from '@/types/playground';
import { CountingSortPlaygroundControls } from './CountingSortPlaygroundControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, RotateCcw, SkipBack } from 'lucide-react';

const MAX_VALUE = 20;
const MIN_VALUE = 1;
const INITIAL_ARRAY_SIZE = 8;

function ArrayMemory({
  array,
  title,
  highlightIndices = [],
  showEmpty = false,
  minIndex = 0
}: {
  array: number[];
  title: string;
  highlightIndices?: number[];
  showEmpty?: boolean;
  minIndex?: number;
}) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-center">{title}</h4>
      <div className="flex flex-wrap gap-1 justify-center">
        {array.map((value, index) => {
          const isEmpty = value === -1 || value === 0;
          const isHighlighted = highlightIndices.includes(index);

          return (
            <motion.div
              key={index}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isHighlighted ? 1.1 : 1,
                opacity: 1,
                backgroundColor: isHighlighted
                  ? '#3b82f6'
                  : isEmpty && !showEmpty
                    ? '#6b7280'
                    : '#f3f4f6'
              }}
              transition={{ duration: 0.3 }}
              className={`
                min-w-[50px] h-12 rounded-lg border-2
                flex flex-col items-center justify-center
                ${isHighlighted ? 'border-blue-500 shadow-lg' : 'border-gray-300'}
              `}
            >
              <div
                className={`text-[10px] text-gray-500 font-mono ${isHighlighted && 'text-slate-300'}`}
              >
                [{minIndex + index}]
              </div>
              <div
                className={`text-sm font-bold ${
                  isHighlighted
                    ? 'text-white'
                    : isEmpty && !showEmpty
                      ? 'text-white'
                      : 'text-gray-800'
                }`}
              >
                {isEmpty && !showEmpty ? '-' : value}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function AnimatedValue({
  value,
  fromArray,
  toArray,
  show
}: {
  value: number;
  fromArray: string;
  toArray: string;
  show: boolean;
}) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <div className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg font-bold">
        {value}
        <div className="text-xs text-purple-100">
          {fromArray} → {toArray}
        </div>
      </div>
    </motion.div>
  );
}

export default function CountingSortPlayground() {
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<CountingSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const generateArray = (size: number) => {
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
    );
    setArray(newArray);
    const newSteps = generateCountingSortSteps(newArray);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    generateArray(INITIAL_ARRAY_SIZE);
  }, []);

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

  const getPhaseColor = (type: string) => {
    switch (type) {
      case 'count':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'accumulate':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'place':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'complete':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPhaseLabel = (type: string) => {
    switch (type) {
      case 'count':
        return '📊 Fase 1: Contagem';
      case 'accumulate':
        return '📈 Fase 2: Acumulação';
      case 'place':
        return '📍 Fase 3: Posicionamento';
      case 'complete':
        return '✅ Completo';
      default:
        return 'Iniciando...';
    }
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
              Visualização do Counting Sort
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Acompanhe as três fases: contagem, acumulação e posicionamento dos
              elementos.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Phase Indicator */}
            <div className="flex justify-center">
              <div
                className={`px-6 py-3 rounded-lg border-2 font-semibold ${getPhaseColor(currentStepData.type)}`}
              >
                {getPhaseLabel(currentStepData.type)}
              </div>
            </div>

            {/* Visualization */}
            <div className="min-h-[400px] flex items-center justify-center bg-muted/30 p-4 rounded-lg">
              <div className="w-full space-y-8 relative">
                <AnimatePresence>
                  {currentStepData.type === 'place' &&
                    currentStepData.currentValue !== -1 && (
                      <AnimatedValue
                        value={currentStepData.currentValue}
                        fromArray="Input"
                        toArray="Output"
                        show={true}
                      />
                    )}
                </AnimatePresence>

                {/* Input Array */}
                <ArrayMemory
                  array={currentStepData.inputArray}
                  title="Array de Entrada"
                  highlightIndices={currentStepData.highlightInput || []}
                />

                {/* Count Array */}
                <ArrayMemory
                  array={currentStepData.countArray}
                  title={`Array de Contagem (índices ${currentStepData.minValue} a ${currentStepData.maxValue})`}
                  highlightIndices={currentStepData.highlightCount || []}
                  showEmpty={true}
                  minIndex={currentStepData.minValue}
                />

                {/* Output Array */}
                {currentStepData.type !== 'count' &&
                  currentStepData.type !== 'accumulate' && (
                    <ArrayMemory
                      array={currentStepData.outputArray}
                      title="Array de Saída (Ordenado)"
                      highlightIndices={currentStepData.highlightOutput || []}
                      showEmpty={false}
                    />
                  )}
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
        <CountingSortPlaygroundControls
          onReset={() => generateArray(array.length)}
          onSpeedChange={setSpeed}
          onSizeChange={(size: number) => generateArray(size)}
          speed={speed}
          size={array.length}
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
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Elemento Ativo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-500 rounded border-2 border-gray-300"></div>
                <span>Vazio/Zero</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>Em Movimento</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded border-2 border-gray-300"></div>
                <span>Célula Normal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
