'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Shuffle,
  Settings
} from 'lucide-react';
import { PlaygroundState } from '@/types/playground';
import {
  generateBinarySearchSteps,
  parseArrayInput,
  generateRandomArray
} from '@/utils/binarySearch';
import { motion } from 'framer-motion';

interface PlaygroundControlsProps {
  state: PlaygroundState;
  onStateChange: (newState: Partial<PlaygroundState>) => void;
}

export function PlaygroundControls({
  state,
  onStateChange
}: PlaygroundControlsProps) {
  const [arrayInput, setArrayInput] = useState(
    '1, 3, 5, 7, 9, 11, 13, 15, 17, 19'
  );
  const [targetInput, setTargetInput] = useState('7');
  const [speedInput, setSpeedInput] = useState('1000');

  const handlePlay = () => {
    if (state.currentStep >= state.steps.length - 1) {
      // If at the end, restart
      onStateChange({ currentStep: 0, isPlaying: true, isPaused: false });
    } else {
      onStateChange({ isPlaying: true, isPaused: false });
    }
  };

  const handlePause = () => {
    onStateChange({ isPlaying: false, isPaused: true });
  };

  const handleReset = () => {
    onStateChange({
      currentStep: 0,
      isPlaying: false,
      isPaused: false
    });
  };

  const handleNext = () => {
    if (state.currentStep < state.steps.length - 1) {
      onStateChange({
        currentStep: state.currentStep + 1,
        isPlaying: false,
        isPaused: true
      });
    }
  };

  const handleGenerate = () => {
    const array = parseArrayInput(arrayInput);
    const target = parseInt(targetInput, 10);
    const speed = parseInt(speedInput, 10);

    if (array.length === 0 || isNaN(target) || isNaN(speed)) {
      return;
    }

    const steps = generateBinarySearchSteps(array, target);

    onStateChange({
      array,
      target,
      speed,
      steps,
      currentStep: 0,
      isPlaying: false,
      isPaused: false
    });
  };

  const handleRandomGenerate = () => {
    const randomArray = generateRandomArray(10, 50);
    const randomTarget =
      randomArray[Math.floor(Math.random() * randomArray.length)];

    setArrayInput(randomArray.join(', '));
    setTargetInput(randomTarget.toString());

    // Trigger generation with new values
    setTimeout(() => {
      const steps = generateBinarySearchSteps(randomArray, randomTarget);
      onStateChange({
        array: randomArray,
        target: randomTarget,
        speed: parseInt(speedInput, 10),
        steps,
        currentStep: 0,
        isPlaying: false,
        isPaused: false
      });
    }, 100);
  };

  const getCurrentStep = () => {
    return state.steps[state.currentStep];
  };

  return (
    <div className="space-y-6">
      {/* Input Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Array (números separados por vírgula)
              </label>
              <Input
                value={arrayInput}
                onChange={(e) => setArrayInput(e.target.value)}
                placeholder="1, 3, 5, 7, 9"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Valor a buscar
              </label>
              <Input
                type="number"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="7"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Velocidade (ms)
              </label>
              <Input
                type="number"
                value={speedInput}
                onChange={(e) => setSpeedInput(e.target.value)}
                placeholder="1000"
                min="100"
                max="5000"
                step="100"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} variant="outline">
              Aplicar Configurações
            </Button>
            <Button onClick={handleRandomGenerate} variant="outline">
              <Shuffle className="h-4 w-4 mr-2" />
              Gerar Aleatório
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Playback Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Controles de Reprodução</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                onClick={state.isPlaying ? handlePause : handlePlay}
                size="lg"
                className="px-6"
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

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button onClick={handleReset} variant="outline" size="lg">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleNext}
                variant="outline"
                size="lg"
                disabled={state.currentStep >= state.steps.length - 1}
              >
                <SkipForward className="h-4 w-4 mr-2" />
                Próximo
              </Button>
            </motion.div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Passo {state.currentStep + 1} de {state.steps.length}
              </span>
              <span>
                {Math.round(
                  ((state.currentStep + 1) / state.steps.length) * 100
                )}
                %
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((state.currentStep + 1) / Math.max(state.steps.length, 1)) * 100}%`
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Step Info */}
      {getCurrentStep() && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={state.currentStep}
        >
          <Card>
            <CardHeader>
              <CardTitle>Passo Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {getCurrentStep().description}
              </p>

              {getCurrentStep().found && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-200">
                        Elemento encontrado!
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        O valor {getCurrentStep().target} foi encontrado na
                        posição {getCurrentStep().mid}.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
