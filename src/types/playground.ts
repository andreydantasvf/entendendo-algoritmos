export interface BinarySearchStep {
  left: number;
  right: number;
  mid: number;
  target: number;
  found: boolean;
  comparison: 'less' | 'greater' | 'equal' | null;
  description: string;
}

export interface PlaygroundState {
  isPlaying: boolean;
  isPaused: boolean;
  currentStep: number;
  steps: BinarySearchStep[];
  array: number[];
  target: number;
  speed: number;
}

export interface VisualizationProps {
  array: number[];
  currentStep?: BinarySearchStep;
  target: number;
}
