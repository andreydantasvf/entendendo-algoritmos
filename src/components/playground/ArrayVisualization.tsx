'use client';

import { VisualizationProps } from '@/types/playground';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ArrayVisualization({
  array,
  currentStep,
  target
}: VisualizationProps) {
  const sortedArray = [...array].sort((a, b) => a - b);

  const getItemStyle = (index: number) => {
    if (!currentStep) return 'bg-card border-border';

    const { left, right, mid, comparison, found } = currentStep;

    // Item encontrado
    if (found && index === mid) {
      return 'bg-green-500 text-white border-green-600 shadow-lg scale-110';
    }

    // Item atual sendo comparado (mid)
    if (index === mid && !found) {
      if (comparison === 'equal') {
        return 'bg-green-500 text-white border-green-600';
      } else if (comparison === 'less') {
        return 'bg-orange-500 text-white border-orange-600';
      } else if (comparison === 'greater') {
        return 'bg-red-500 text-white border-red-600';
      }
      return 'bg-blue-500 text-white border-blue-600';
    }

    // Itens dentro do range atual
    if (index >= left && index <= right) {
      return 'bg-primary/20 border-primary/50 text-foreground';
    }

    // Itens fora do range (descartados)
    return 'bg-muted/50 border-muted text-muted-foreground opacity-50';
  };

  const getTargetIndicator = (value: number) => {
    if (value === target) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center"
        >
          <span className="text-xs text-white font-bold">🎯</span>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Array principal */}
      <div className="flex flex-wrap gap-2 justify-center p-6 bg-muted/30 rounded-lg space-y-6">
        {sortedArray.map((value, index) => (
          <motion.div
            key={`${value}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              'relative min-w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm transition-all duration-500',
              getItemStyle(index)
            )}
          >
            {value}
            {getTargetIndicator(value)}

            {/* Indicador de posição */}
            <div className="absolute -bottom-6 text-xs text-muted-foreground">
              {index}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Indicadores de left, mid, right */}
      {currentStep && (
        <div className="flex justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Left: {currentStep.left}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Mid: {currentStep.mid}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Right: {currentStep.right}</span>
          </div>
        </div>
      )}

      {/* Legenda */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary/20 border border-primary/50 rounded"></div>
          <span>Em busca</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Meio atual</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Encontrado</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-muted/50 border border-muted rounded opacity-50"></div>
          <span>Descartado</span>
        </div>
      </div>
    </div>
  );
}
