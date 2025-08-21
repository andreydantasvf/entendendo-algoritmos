'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrayVisualization } from './ArrayVisualization';
import { PlaygroundControls } from './PlaygroundControls';
import { PlaygroundState } from '@/types/playground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function BinarySearchPlayground() {
  const [state, setState] = useState<PlaygroundState>({
    isPlaying: false,
    isPaused: false,
    currentStep: 0,
    steps: [],
    array: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
    target: 7,
    speed: 1000
  });

  const updateState = useCallback((newState: Partial<PlaygroundState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);

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
    <div className="space-y-8">
      {/* Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Visualização da Busca Binária
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Acompanhe como o algoritmo divide o array pela metade a cada
              iteração
            </p>
          </CardHeader>
          <CardContent>
            <ArrayVisualization
              array={state.array}
              currentStep={currentStep}
              target={state.target}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <PlaygroundControls state={state} onStateChange={updateState} />
      </motion.div>
    </div>
  );
}
