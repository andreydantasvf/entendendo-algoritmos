'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Algorithm } from '@/types/algorithms';
import { categories, getDifficultyColor } from '@/data/algorithms';
import { Clock, HardDrive, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface AlgorithmGridProps {
  algorithms: Algorithm[];
}

export function AlgorithmGrid({ algorithms }: AlgorithmGridProps) {
  const getCategoryInfo = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId);
  };

  const getAlgorithmUrl = (algorithmId: string) => {
    // Map specific algorithm IDs to their routes
    const algorithmRoutes: Record<string, string> = {
      'binary-search': '/algoritmos/busca-binaria',
      'linear-search': '/algoritmos/busca-linear'
      // Add more routes as you create them
    };

    return algorithmRoutes[algorithmId] || '#';
  };

  if (algorithms.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">
          Nenhum algoritmo encontrado
        </h3>
        <p className="text-muted-foreground">
          Tente ajustar os filtros ou termos de busca
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {algorithms.map((algorithm, index) => {
        const categoryInfo = getCategoryInfo(algorithm.category);
        const algorithmUrl = getAlgorithmUrl(algorithm.id);

        return (
          <motion.div
            key={algorithm.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <Link href={algorithmUrl} className="block h-full">
              <Card className="h-full cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-2xl"
                        role="img"
                        aria-label={categoryInfo?.name}
                      >
                        {categoryInfo?.icon}
                      </span>
                      <div>
                        <CardTitle className="text-lg leading-tight">
                          {algorithm.title}
                        </CardTitle>
                      </div>
                    </div>
                    <Badge
                      className={getDifficultyColor(algorithm.difficulty)}
                      variant="secondary"
                    >
                      {algorithm.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {algorithm.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Complexity Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Tempo</p>
                        <p className="font-mono font-medium">
                          {algorithm.timeComplexity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Espaço</p>
                        <p className="font-mono font-medium">
                          {algorithm.spaceComplexity}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Tags
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {algorithm.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="pt-2 border-t">
                    <Badge variant="secondary" className="text-xs">
                      {categoryInfo?.name}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
