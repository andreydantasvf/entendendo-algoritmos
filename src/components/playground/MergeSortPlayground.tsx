'use client';

import { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMergeSortSteps } from '@/utils/mergeSort';
import { MergeSortStep, MergeTreeNode } from '@/types/playground';
import { cn } from '@/lib/utils';
import { MergeSortPlaygroundControls } from './MergeSortPlaygroundControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward } from 'lucide-react';

const MAX_VALUE = 100;
const MIN_VALUE = 5;
const INITIAL_ARRAY_SIZE = 8;

const PlaygroundContext = createContext<{
  currentStep: MergeSortStep | null;
}>({
  currentStep: null
});

const usePlayground = () => useContext(PlaygroundContext);

function findNodeInTree(
  node: MergeTreeNode | null,
  id: number
): MergeTreeNode | null {
  if (!node) return null;
  if (node.id === id) return node;
  for (const child of node.children) {
    const found = findNodeInTree(child, id);
    if (found) return found;
  }
  return null;
}

function ArrayBars({
  array,
  level,
  isComparing,
  isMerging,
  isSorted
}: {
  array: number[];
  level: number;
  isComparing?: boolean;
  isMerging?: boolean;
  isSorted?: boolean;
}) {
  const max = Math.max(...array, 1);

  const levelColors = [
    '#3b82f6', // blue-500
    '#84cc16', // lime-500
    '#ef4444', // red-500
    '#f97316', // orange-500
    '#8b5cf6' // violet-500
  ];

  return (
    <div className="flex items-end justify-center gap-1 h-32">
      {array.map((value, index) => {
        const color = isSorted
          ? '#22c55e' // green-500
          : isMerging
            ? '#eab308' // yellow-500
            : isComparing
              ? '#f43f5e' // rose-500
              : levelColors[level % levelColors.length];

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
            className="w-8 rounded-t-sm flex items-center justify-center"
          >
            <span className="text-black font-bold text-sm">{value}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

const TreeNode = ({
  node,
  fullTree
}: {
  node: MergeTreeNode;
  fullTree: MergeTreeNode;
}) => {
  const { currentStep } = usePlayground();

  const isNodeInvolved =
    currentStep?.description.includes(`nó ${node.id} `) ||
    currentStep?.description.includes(`Nó ${node.id} `);

  const isComparing = currentStep?.type === 'compare' && isNodeInvolved;
  const isMerging = currentStep?.type === 'merge' && isNodeInvolved;
  const isNodeSorted =
    currentStep?.type === 'sorted' && currentStep.sortedNodeId === node.id;

  // Encontra o nó na árvore completa para obter os filhos
  const nodeFromFullTree = findNodeInTree(fullTree, node.id);
  let children = nodeFromFullTree ? nodeFromFullTree.children : [];

  if (node.isSorted && !isMerging) {
    children = [];
  }

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center space-y-2"
    >
      <AnimatePresence>
        {isNodeInvolved && currentStep?.description && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-xs px-2 py-1 bg-muted rounded-full text-center"
          >
            {currentStep.description}
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={cn(
          'p-2 border rounded-lg transition-all duration-300',
          isNodeInvolved ? 'border-primary shadow-lg' : 'border-border'
        )}
      >
        <ArrayBars
          array={node.array}
          level={node.level}
          isComparing={isComparing}
          isMerging={isMerging}
          isSorted={isNodeSorted}
        />
      </div>
      {children.length > 0 && (
        <div className="flex justify-center gap-4 pt-4 relative">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-px bg-border"
            style={{ top: '-8px' }}
          />
          {children.map((child) => (
            <div key={child.id} className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-px bg-border" />
              <TreeNode node={child} fullTree={fullTree} />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function MergeSortPlayground() {
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<MergeSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const generateArray = (size: number) => {
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
    );
    setArray(newArray);
    const newSteps = generateMergeSortSteps(newArray);
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

  const currentStepData = useMemo(
    () => (steps[currentStep] ? steps[currentStep] : null),
    [steps, currentStep]
  );

  const currentTree = useMemo(
    () => (steps[currentStep] ? steps[currentStep].tree : null),
    [steps, currentStep]
  );

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsPlaying(false);
    }
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
                Visualização do Merge Sort
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Acompanhe o processo de divisão e conquista em tempo real.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="min-h-[400px] flex items-center justify-center overflow-x-auto bg-muted/30 p-4 rounded-lg">
                {currentTree && (
                  <AnimatePresence>
                    <TreeNode node={currentTree} fullTree={currentTree} />
                  </AnimatePresence>
                )}
              </div>

              <div className="border-t pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 order-2 sm:order-1">
                    <Button
                      onClick={() => setIsPlaying(!isPlaying)}
                      size="sm"
                      className="px-4"
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
          <MergeSortPlaygroundControls
            onReset={() => generateArray(array.length)}
            onSpeedChange={setSpeed}
            onSizeChange={(size: number) => generateArray(size)}
            speed={speed}
            size={array.length}
          />
        </motion.div>
      </div>
    </PlaygroundContext.Provider>
  );
}
