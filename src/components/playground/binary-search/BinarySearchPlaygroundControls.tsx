'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shuffle, Settings } from 'lucide-react';
import { PlaygroundState } from '@/types/playground';
import {
  generateBinarySearchSteps,
  parseArrayInput,
  generateRandomArray
} from '@/utils/binarySearch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface BinarySearchPlaygroundControlsProps {
  state: PlaygroundState;
  onStateChange: (newState: Partial<PlaygroundState>) => void;
}

export function BinarySearchPlaygroundControls({
  onStateChange
}: BinarySearchPlaygroundControlsProps) {
  const [arrayInput, setArrayInput] = useState(
    '1, 3, 5, 7, 9, 11, 13, 15, 17, 19'
  );
  const [targetInput, setTargetInput] = useState('7');
  const [speedInput, setSpeedInput] = useState('1000');

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configurações do Algoritmo
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Configure os dados de entrada e a velocidade da animação
        </p>
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Velocidade</label>
            <Select
              value={speedInput}
              onValueChange={(value) => setSpeedInput(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2000">0.5x</SelectItem>
                <SelectItem value="1000">1x</SelectItem>
                <SelectItem value="500">2x</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-2">
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
      </CardContent>
    </Card>
  );
}
