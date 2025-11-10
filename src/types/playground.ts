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
  steps: (BinarySearchStep | LinearSearchStep)[];
  array: number[];
  target: number | null;
  speed: number;
}

export interface VisualizationProps {
  array: number[];
  currentStep?: BinarySearchStep | LinearSearchStep;
  target: number | null;
}

export type QuickSortStepType =
  | 'partition'
  | 'compare'
  | 'swap'
  | 'pivot'
  | 'sorted';

export interface QuickSortStep {
  type: QuickSortStepType;
  array: number[];
  low: number;
  high: number;
  pivotIndex: number;
  i: number;
  j: number;
  description: string;
  highlight?: number[];
  sortedIndices?: number[];
}

export type PivotStrategy = 'first' | 'last' | 'random' | 'median';

export type SelectionSortStepType = 'compare' | 'select' | 'swap' | 'sorted';

export interface SelectionSortStep {
  type: SelectionSortStepType;
  array: number[];
  currentIndex: number;
  minIndex: number;
  comparingIndex: number;
  description: string;
  highlight?: number[];
  sortedIndices?: number[];
}

export type BubbleSortStepType = 'compare' | 'swap' | 'pass' | 'sorted';

export interface BubbleSortStep {
  type: BubbleSortStepType;
  array: number[];
  pass: number;
  currentIndex: number;
  nextIndex: number;
  description: string;
  highlight?: number[];
  sortedIndices?: number[];
}

export type InsertionSortStepType =
  | 'select'
  | 'compare'
  | 'shift'
  | 'insert'
  | 'sorted';

export interface InsertionSortStep {
  type: InsertionSortStepType;
  array: number[];
  currentIndex: number;
  key: number;
  comparingIndex: number;
  description: string;
  highlight?: number[];
  sortedIndices?: number[];
}

export type CountingSortStepType =
  | 'count'
  | 'accumulate'
  | 'place'
  | 'complete';

export interface CountingSortStep {
  type: CountingSortStepType;
  inputArray: number[];
  countArray: number[];
  outputArray: number[];
  currentIndex: number;
  currentValue: number;
  minValue: number;
  maxValue: number;
  description: string;
  highlightInput?: number[];
  highlightCount?: number[];
  highlightOutput?: number[];
}

export type RadixSortStepType = 'distribute' | 'collect' | 'complete';

export interface RadixSortStep {
  type: RadixSortStepType;
  array: number[];
  buckets: number[][];
  currentDigit: number;
  currentIndex: number;
  currentValue: number;
  maxDigits: number;
  description: string;
  highlightArray?: number[];
  highlightBucket?: number;
}
