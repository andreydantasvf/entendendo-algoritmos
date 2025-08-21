'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Algorithm } from '@/types/algorithms';
import { categories } from '@/data/algorithms';
import { BookOpen, Target, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsProps {
  algorithms: Algorithm[];
}

export function Stats({ algorithms }: StatsProps) {
  const totalAlgorithms = algorithms.length;
  const totalCategories = categories.length;

  const difficultyStats = algorithms.reduce(
    (acc, algo) => {
      acc[algo.difficulty] = (acc[algo.difficulty] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const chaptersWithContent = new Set(
    algorithms.filter((algo) => algo.chapter).map((algo) => algo.chapter)
  ).size;

  const stats = [
    {
      icon: BookOpen,
      label: 'Algoritmos',
      value: totalAlgorithms,
      description: 'Algoritmos implementados',
      color: 'text-blue-500'
    },
    {
      icon: Target,
      label: 'Categorias',
      value: totalCategories,
      description: 'Tipos de algoritmos',
      color: 'text-green-500'
    },
    {
      icon: Zap,
      label: 'Capítulos',
      value: chaptersWithContent,
      description: 'Capítulos com conteúdo',
      color: 'text-yellow-500'
    },
    {
      icon: Users,
      label: 'Dificuldades',
      value: Object.keys(difficultyStats).length,
      description: 'Níveis de complexidade',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-2">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm font-medium">{stat.label}</div>
                <div className="text-xs text-muted-foreground text-center">
                  {stat.description}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
