'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DFSPlaygroundControlsProps {
  graphType: 'tree' | 'cycle' | 'complex';
  startNode: string;
  targetNode: string;
  speed: number;
  availableNodes: string[];
  onGraphTypeChange: (type: 'tree' | 'cycle' | 'complex') => void;
  onStartNodeChange: (node: string) => void;
  onTargetNodeChange: (node: string) => void;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
}

export function DFSPlaygroundControls({
  graphType,
  startNode,
  targetNode,
  speed,
  availableNodes,
  onGraphTypeChange,
  onStartNodeChange,
  onTargetNodeChange,
  onSpeedChange,
  onReset
}: DFSPlaygroundControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configurações da Visualização
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Selecione o grafo, os nós de início e alvo, e a velocidade da
          animação.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tipo de Grafo */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Grafo</label>
            <Select
              value={graphType}
              onValueChange={(value) =>
                onGraphTypeChange(value as 'tree' | 'cycle' | 'complex')
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tree">Árvore</SelectItem>
                <SelectItem value="cycle">Com Ciclos</SelectItem>
                <SelectItem value="complex">Complexo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Nó Inicial */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Nó Inicial</label>
            <Select value={startNode} onValueChange={onStartNodeChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableNodes.map((node) => (
                  <SelectItem key={node} value={node}>
                    {node}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Nó Alvo */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Nó Alvo</label>
            <Select value={targetNode} onValueChange={onTargetNodeChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableNodes.map((node) => (
                  <SelectItem key={node} value={node}>
                    {node}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Velocidade */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Velocidade</label>
            <Select
              value={speed.toString()}
              onValueChange={(value) => onSpeedChange(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5x</SelectItem>
                <SelectItem value="1">1x</SelectItem>
                <SelectItem value="2">2x</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center md:justify-start">
          <Button onClick={onReset} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recalcular Busca
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
