'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shuffle, Settings } from 'lucide-react';
import { LinearSearchStep } from '@/types/playground';
import {
  generateLinearSearchSteps,
  parseArrayInput,
  generateRandomArray
} from '@/utils/linearSearch';

interface LinearSearchPlaygroundState {
  isPlaying: boolean;
  isPaused: boolean;
  currentStep: number;
  steps: LinearSearchStep[];
  array: number[];
  target: number;
  speed: number;
}

interface LinearSearchPlaygroundControlsProps {
  state: LinearSearchPlaygroundState;
  onStateChange: (newState: Partial<LinearSearchPlaygroundState>) => void;
}

export function LinearSearchPlaygroundControls({
  onStateChange
}: LinearSearchPlaygroundControlsProps) {
  const [arrayInput, setArrayInput] = useState('5, 2, 8, 1, 9, 3, 7, 4');
  const [targetInput, setTargetInput] = useState('7');
  const [speedInput, setSpeedInput] = useState('1000');

  const handleGenerate = () => {
    const array = parseArrayInput(arrayInput);
    const target = parseInt(targetInput, 10);
    const speed = parseInt(speedInput, 10);

    if (array.length === 0 || isNaN(target) || isNaN(speed)) {
      return;
    }

    const steps = generateLinearSearchSteps(array, target);

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
    const randomArray = generateRandomArray(8, 20);
    const randomTarget =
      randomArray[Math.floor(Math.random() * randomArray.length)];

    setArrayInput(randomArray.join(', '));
    setTargetInput(randomTarget.toString());

    const steps = generateLinearSearchSteps(randomArray, randomTarget);

    onStateChange({
      array: randomArray,
      target: randomTarget,
      steps,
      currentStep: 0,
      isPlaying: false,
      isPaused: false
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configurações do Playground
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure o array e o elemento a ser procurado. O array pode estar em
          qualquer ordem.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Array (separado por vírgulas)
            </label>
            <Input
              value={arrayInput}
              onChange={(e) => setArrayInput(e.target.value)}
              placeholder="5, 2, 8, 1, 9, 3, 7, 4"
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Elemento procurado</label>
            <Input
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="7"
              type="number"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Velocidade (ms)</label>
            <Input
              value={speedInput}
              onChange={(e) => setSpeedInput(e.target.value)}
              placeholder="1000"
              type="number"
              min="100"
              max="3000"
              step="100"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGenerate} className="cursor-pointer">
            Aplicar Configurações
          </Button>
          <Button
            onClick={handleRandomGenerate}
            variant="outline"
            className="cursor-pointer"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Gerar Aleatório
          </Button>
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">
            💡 Dica
          </h4>
          <p className="text-blue-800 dark:text-blue-200 text-xs">
            Na busca linear, a ordem dos elementos no array não importa! O
            algoritmo verifica cada elemento sequencialmente até encontrar o
            valor desejado ou chegar ao final do array.
          </p>
        </div>

        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 text-sm mb-1">
            ⚡ Performance
          </h4>
          <p className="text-amber-800 dark:text-amber-200 text-xs">
            Complexidade: O(n) no pior caso - quando o elemento está no final do
            array ou não existe. O melhor caso é O(1) quando o elemento está na
            primeira posição.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
