export interface BinarySearchStep {
  left: number;
  right: number;
  mid: number;
  target: number;
  found: boolean;
  comparison: 'less' | 'greater' | 'equal' | null;
  description: string;
}

export interface LinearSearchStep {
  currentIndex: number;
  target: number;
  found: boolean;
  comparison: 'equal' | 'not-equal' | null;
  description: string;
  comparisons: number;
}

export interface PlaygroundState {
  isPlaying: boolean;
  isPaused: boolean;
  currentStep: number;
  steps: BinarySearchStep[] | LinearSearchStep[];
  array: number[];
  target: number;
  speed: number;
}

export interface VisualizationProps {
  array: number[];
  currentStep?: BinarySearchStep | LinearSearchStep;
  target: number;
}
