'use client';

import { Button } from '../ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

interface MergeSortPlaygroundControlsProps {
  onPlayPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onSizeChange: (size: number) => void;
  isPlaying: boolean;
  speed: number;
  size: number;
}

export function MergeSortPlaygroundControls({
  onPlayPause,
  onReset,
  onSpeedChange,
  onSizeChange,
  isPlaying,
  speed,
  size
}: MergeSortPlaygroundControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <Button onClick={onPlayPause} variant="outline" size="icon">
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      <Button onClick={onReset} variant="outline" size="icon">
        <RotateCcw className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        <label htmlFor="speed" className="text-sm font-medium">
          Velocidade
        </label>
        <Select
          value={speed.toString()}
          onValueChange={(value) => onSpeedChange(Number(value))}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0.5">0.5x</SelectItem>
            <SelectItem value="1">1x</SelectItem>
            <SelectItem value="2">2x</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="size" className="text-sm font-medium">
          Tamanho
        </label>
        <Select
          value={size.toString()}
          onValueChange={(value) => onSizeChange(Number(value))}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="16">16</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
