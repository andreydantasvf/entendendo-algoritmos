'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrayVisualization } from './ArrayVisualization';
import { LinearSearchPlaygroundControls } from './LinearSearchPlaygroundControls';
import { LinearSearchStep } from '@/types/playground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateLinearSearchSteps } from '@/utils/linearSearch';

const INITIAL_ARRAY = [5, 2, 8, 1, 9, 3, 7, 4];
const INITIAL_TARGET = 7;

interface LinearSearchPlaygroundState {
  isPlaying: boolean;
  isPaused: boolean;
  currentStep: number;
  steps: LinearSearchStep[];
  array: number[];
  target: number;
  speed: number;
}

export function LinearSearchPlayground() {
  const [state, setState] = useState<LinearSearchPlaygroundState>({
    isPlaying: false,
    isPaused: false,
    currentStep: 0,
    steps: generateLinearSearchSteps(INITIAL_ARRAY, INITIAL_TARGET),
    array: INITIAL_ARRAY,
    target: INITIAL_TARGET,
    speed: 1000
  });

  const updateState = useCallback(
    (newState: Partial<LinearSearchPlaygroundState>) => {
      setState((prev) => ({ ...prev, ...newState }));
    },
    []
  );

  // Control functions
  const handlePlay = () => {
    if (state.currentStep >= state.steps.length - 1) {
      updateState({ currentStep: 0, isPlaying: true, isPaused: false });
    } else {
      updateState({ isPlaying: true, isPaused: false });
    }
  };

  const handlePause = () => {
    updateState({ isPlaying: false, isPaused: true });
  };

  const handleReset = () => {
    updateState({
      currentStep: 0,
      isPlaying: false,
      isPaused: false
    });
  };

  const handleNext = () => {
    if (state.currentStep < state.steps.length - 1) {
      updateState({
        currentStep: state.currentStep + 1,
        isPlaying: false,
        isPaused: true
      });
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (state.isPlaying && state.currentStep < state.steps.length - 1) {
      const timer = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          currentStep: prev.currentStep + 1
        }));
      }, state.speed);

      return () => clearTimeout(timer);
    } else if (state.isPlaying && state.currentStep >= state.steps.length - 1) {
      // Stop playing when reaching the end
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: false
      }));
    }
  }, [state.isPlaying, state.currentStep, state.steps.length, state.speed]);

  const currentStep = state.steps[state.currentStep];

  return (
    <div className="space-y-6">
      {/* Integrated Visualization and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Visualização da Busca Linear
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Acompanhe como o algoritmo verifica cada elemento sequencialmente
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Array Visualization */}
            <ArrayVisualization
              array={state.array}
              currentStep={currentStep}
              target={state.target}
            />

            {/* Integrated Playback Controls */}
            <div className="border-t pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex flex-col sm:flex-row items-center gap-2 order-2 sm:order-1">
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      onClick={state.isPlaying ? handlePause : handlePlay}
                      size="sm"
                      className="px-4 cursor-pointer w-full sm:w-auto"
                    >
                      {state.isPlaying ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" /> Pausar
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" /> Play
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="sm"
                      className="cursor-pointer w-full sm:w-auto"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </motion.div>

                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      onClick={handleNext}
                      variant="outline"
                      size="sm"
                      className="cursor-pointer disabled:cursor-not-allowed w-full sm:w-auto"
                      disabled={state.currentStep >= state.steps.length - 1}
                    >
                      <SkipForward className="h-4 w-4 mr-2" />
                      Próximo
                    </Button>
                  </motion.div>
                </div>

                {/* Progress Info */}
                <div className="text-sm text-muted-foreground order-1 sm:order-2">
                  <span>
                    Passo {state.currentStep + 1} de {state.steps.length}
                  </span>
                  <span className="ml-2">
                    (
                    {Math.round(
                      ((state.currentStep + 1) /
                        Math.max(state.steps.length, 1)) *
                        100
                    )}
                    %)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((state.currentStep + 1) / Math.max(state.steps.length, 1)) * 100}%`
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Current Step Description */}
              {currentStep && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={state.currentStep}
                  className="bg-muted/50 p-4 rounded-lg"
                >
                  <h4 className="font-medium mb-2">Passo Atual:</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {currentStep.description}
                  </p>

                  {currentStep.found && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-3 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🎉</span>
                        <div>
                          <h5 className="font-semibold text-green-800 dark:text-green-200 text-sm">
                            Elemento encontrado!
                          </h5>
                          <p className="text-xs text-green-700 dark:text-green-300">
                            O valor {currentStep.target} foi encontrado na
                            posição {currentStep.currentIndex} após{' '}
                            {currentStep.comparisons} comparação(ões).
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Configuration Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <LinearSearchPlaygroundControls
          state={state}
          onStateChange={updateState}
        />
      </motion.div>
    </div>
  );
}
