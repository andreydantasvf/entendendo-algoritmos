'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateRadixSortSteps } from '@/utils/radixSort';
import { RadixSortStep } from '@/types/playground';
import { RadixSortPlaygroundControls } from './RadixSortPlaygroundControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, RotateCcw, SkipBack } from 'lucide-react';

const MAX_VALUE = 999;
const MIN_VALUE = 1;
const INITIAL_ARRAY_SIZE = 8;

function ArrayMemory({
  array,
  title,
  highlightIndices = []
}: {
  array: number[];
  title: string;
  highlightIndices?: number[];
}) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-center">{title}</h4>
      <div className="flex flex-wrap gap-1 justify-center">
        {array.map((value, index) => {
          const isHighlighted = highlightIndices.includes(index);

          return (
            <motion.div
              key={index}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isHighlighted ? 1.1 : 1,
                opacity: 1,
                backgroundColor: isHighlighted ? '#3b82f6' : '#f3f4f6'
              }}
              transition={{ duration: 0.3 }}
              className={`
                min-w-[60px] h-12 rounded-lg border-2
                flex items-center justify-center
                ${isHighlighted ? 'border-blue-500 shadow-lg' : 'border-gray-300'}
              `}
            >
              <div
                className={`text-sm font-bold ${
                  isHighlighted ? 'text-white' : 'text-gray-800'
                }`}
              >
                {value}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Buckets({
  buckets,
  highlightBucket
}: {
  buckets: number[][];
  highlightBucket?: number;
}) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-center">Buckets (0-9)</h4>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {buckets.map((bucket, bucketIndex) => {
          const isHighlighted = highlightBucket === bucketIndex;

          return (
            <motion.div
              key={bucketIndex}
              layout
              animate={{
                scale: isHighlighted ? 1.05 : 1,
                borderColor: isHighlighted ? '#3b82f6' : '#d1d5db'
              }}
              transition={{ duration: 0.3 }}
              className={`
                border-2 rounded-lg p-2 min-h-[80px]
                ${isHighlighted ? 'bg-blue-50' : 'bg-gray-50'}
              `}
            >
              <div className="text-xs font-semibold text-center mb-1 text-gray-600">
                {bucketIndex}
              </div>
              <div className="space-y-1">
                {bucket.length === 0 ? (
                  <div className="text-xs text-gray-400 text-center">-</div>
                ) : (
                  bucket.map((value, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs font-medium text-center bg-white rounded px-1 py-0.5 border border-gray-200 text-black"
                    >
                      {value}
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function RadixSortPlayground() {
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<RadixSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const generateArray = (size: number) => {
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
    );
    setArray(newArray);
    const newSteps = generateRadixSortSteps(newArray);
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
              Visualização do Radix Sort
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Acompanhe a distribuição e coleta dos elementos por dígito.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visualization */}
            <div className="min-h-[500px] flex items-center justify-center bg-muted/30 p-4 rounded-lg">
              <div className="w-full space-y-8 relative">
                {/* Array */}
                <ArrayMemory
                  array={currentStepData.array}
                  title="Array Principal"
                  highlightIndices={currentStepData.highlightArray || []}
                />

                {/* Buckets */}
                <Buckets
                  buckets={currentStepData.buckets}
                  highlightBucket={currentStepData.highlightBucket}
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
        <RadixSortPlaygroundControls
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
          <CardContent className="px-4">
            <h4 className="text-sm font-semibold mb-3">Legenda:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Elemento Ativo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 rounded border-2 border-blue-300"></div>
                <span>Bucket Ativo</span>
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
