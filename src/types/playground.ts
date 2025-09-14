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

export interface MergeTreeNode {
  id: number;
  array: number[];
  level: number;
  children: MergeTreeNode[];
  isSorted: boolean;
  isActive: boolean;
  parent: number | null;
}

export type MergeSortStepType = 'split' | 'compare' | 'merge' | 'sorted';

export interface MergeSortStep {
  type: MergeSortStepType;
  tree: MergeTreeNode;
  description: string;
  sortedNodeId?: number;
  highlight?: number[];
}

export interface PlaygroundState {
  isPlaying: boolean;
  isPaused: boolean;
  currentStep: number;
  steps: (BinarySearchStep | LinearSearchStep | MergeSortStep)[];
  array: number[];
  target: number | null;
  speed: number;
}

export interface VisualizationProps {
  array: number[];
  currentStep?: BinarySearchStep | LinearSearchStep | MergeSortStep;
  target: number | null;
}
