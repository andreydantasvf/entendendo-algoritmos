'use client';

import { useState, useEffect, useMemo, createContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateQuickSortSteps } from '@/utils/quickSort';
import { QuickSortStep, PivotStrategy } from '@/types/playground';
import { QuickSortPlaygroundControls } from './QuickSortPlaygroundControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, RotateCcw, SkipBack } from 'lucide-react';

const MAX_VALUE = 100;
const MIN_VALUE = 5;
const INITIAL_ARRAY_SIZE = 8;

const PlaygroundContext = createContext<{
  currentStep: QuickSortStep | null;
}>({
  currentStep: null
});

function ArrayBars({
  array,
  currentStep,
  barWidth
}: {
  array: number[];
  currentStep: QuickSortStep | null;
  barWidth: number;
}) {
  const max = Math.max(...array, 1);

  const getBarColor = (index: number) => {
    if (!currentStep) return '#3b82f6'; // blue-500

    const { type, pivotIndex, i, j, highlight, sortedIndices } = currentStep;

    // Elementos já ordenados
    if (sortedIndices?.includes(index)) {
      return '#22c55e'; // green-500
    }

    // Pivô
    if (index === pivotIndex) {
      return '#8b5cf6'; // violet-500
    }

    // Elementos sendo comparados ou destacados
    if (highlight?.includes(index)) {
      if (type === 'compare') {
        return '#f43f5e'; // rose-500
      }
      if (type === 'swap') {
        return '#eab308'; // yellow-500
      }
    }

    // Ponteiros i e j
    if (index === i || index === j) {
      return '#f97316'; // orange-500
    }

    // Cor padrão
    return '#3b82f6'; // blue-500
  };

  return (
    <div
      className="flex items-end justify-center gap-1 h-32"
      style={{ gap: array.length > 12 ? '2px' : '4px' }}
    >
      {array.map((value, index) => {
        const color = getBarColor(index);

        return (
          <motion.div
            key={index}
            layout
            initial={{ height: 0 }}
            animate={{
              height: `${(value / max) * 100}%`,
              backgroundColor: color
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ width: `${barWidth}px` }}
            className="rounded-t-sm flex items-center justify-center"
          >
            <span
              className="text-black font-bold"
              style={{ fontSize: array.length > 8 ? '10px' : '12px' }}
            >
              {value}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function QuickSortPlayground() {
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<QuickSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [pivotStrategy, setPivotStrategy] = useState<PivotStrategy>('last');
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  const generateArray = (size: number) => {
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
    );
    setArray(newArray);
    const newSteps = generateQuickSortSteps(newArray, pivotStrategy);
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

  const { scale, barWidth } = useMemo(() => {
    if (!containerWidth || !array.length) return { scale: 1, barWidth: 28 };

    const baseBarWidth = array.length > 12 ? 20 : 28;
    const gap = array.length > 12 ? 2 : 4;
    const requiredWidth =
      array.length * baseBarWidth + (array.length - 1) * gap;

    let scale = 1;
    if (requiredWidth > containerWidth) {
      scale = containerWidth / (requiredWidth + 48);
    }

    return { scale: Math.max(scale, 0.3), barWidth: baseBarWidth };
  }, [containerWidth, array.length]);

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

  const handlePivotStrategyChange = (strategy: PivotStrategy) => {
    setPivotStrategy(strategy);
    generateArray(array.length);
  };

  return (
    <PlaygroundContext.Provider value={{ currentStep: currentStepData }}>
      <div className="w-full mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Visualização do Quick Sort
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Acompanhe o processo de particionamento e ordenação em tempo
                real.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                ref={containerRef}
                className="min-h-[400px] flex items-center justify-center overflow-x-auto bg-muted/30 p-4 rounded-lg"
              >
                <motion.div
                  animate={{ scale }}
                  transition={{ duration: 0.5 }}
                  className="origin-center min-w-full flex justify-center"
                >
                  <AnimatePresence>
                    <ArrayBars
                      array={currentStepData?.array || array}
                      currentStep={currentStepData}
                      barWidth={barWidth}
                    />
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="border-t pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 order-2 sm:order-1">
                    <Button
                      onClick={() => setIsPlaying(!isPlaying)}
                      size="sm"
                      className="cursor-pointer px-4"
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
                      disabled={currentStep <= 0}
                    >
                      <SkipBack className="h-4 w-4 mr-2" /> Voltar
                    </Button>

                    <Button
                      onClick={handleNext}
                      variant="outline"
                      size="sm"
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
          <QuickSortPlaygroundControls
            onReset={() => generateArray(array.length)}
            onSpeedChange={setSpeed}
            onSizeChange={(size: number) => generateArray(size)}
            onPivotStrategyChange={handlePivotStrategyChange}
            speed={speed}
            size={array.length}
            pivotStrategy={pivotStrategy}
          />
        </motion.div>
      </div>
    </PlaygroundContext.Provider>
  );
}
