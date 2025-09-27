'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Shuffle } from 'lucide-react';
import { Button } from '../ui/button';

interface MergeSortPlaygroundControlsProps {
  onReset: (size: number) => void;
  onSpeedChange: (speed: number) => void;
  onSizeChange: (size: number) => void;
  speed: number;
  size: number;
}

export function MergeSortPlaygroundControls({
  onReset,
  onSpeedChange,
  onSizeChange,
  speed,
  size
}: MergeSortPlaygroundControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configurações da Visualização
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Ajuste o tamanho do array e a velocidade da animação.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end flex-wrap justify-center md:justify-start gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Velocidade</label>
            <Select
              value={speed.toString()}
              onValueChange={(value) => onSpeedChange(Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5x</SelectItem>
                <SelectItem value="1">1x</SelectItem>
                <SelectItem value="2">2x</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tamanho do Array</label>
            <Select
              value={size.toString()}
              onValueChange={(value) => onSizeChange(Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="12">12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <Button onClick={() => onReset(size)} variant="outline">
              <Shuffle className="h-4 w-4 mr-2" />
              Gerar Novo Array
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
