import { motion } from 'framer-motion';
import { Clock, HardDrive, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AlgorithmHeaderProps {
  title: string;
  description: string;
  temporalComplexity: string;
  spatialComplexity: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
}

const DIFFICULTY_COLORS = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  middle:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Iniciante':
      return DIFFICULTY_COLORS.beginner;
    case 'Intermediário':
      return DIFFICULTY_COLORS.middle;
    case 'Avançado':
      return DIFFICULTY_COLORS.advanced;
    default:
      return '';
  }
}

export function AlgorithmHeader({
  title,
  description,
  temporalComplexity,
  spatialComplexity,
  difficulty
}: AlgorithmHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-4"
    >
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-xl text-muted-foreground">{description}</p>

      {/* Algorithm Stats */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="h-4 w-4 text-blue-500" />
          <span className="text-muted-foreground">Complexidade temporal:</span>
          <code className="font-mono bg-muted px-2 py-1 rounded">
            {temporalComplexity}
          </code>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <HardDrive className="h-4 w-4 text-green-500" />
          <span className="text-muted-foreground">Complexidade espacial:</span>
          <code className="font-mono bg-muted px-2 py-1 rounded">
            {spatialComplexity}
          </code>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span className="text-muted-foreground">Dificuldade:</span>
          <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
        </div>
      </div>
    </motion.div>
  );
}
