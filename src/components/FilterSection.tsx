'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';
import { Algorithm } from '@/types/algorithms';
import { categories } from '@/data/algorithms';
import { motion } from 'framer-motion';

interface FilterSectionProps {
  algorithms: Algorithm[];
  onFilterChange: (filtered: Algorithm[]) => void;
}

export function FilterSection({
  algorithms,
  onFilterChange
}: FilterSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  const difficulties = ['Iniciante', 'Intermediário', 'Avançado'];

  const filterAlgorithms = (
    search: string,
    category: string | null,
    difficulty: string | null
  ) => {
    let filtered = algorithms;

    if (search) {
      filtered = filtered.filter(
        (algo) =>
          algo.title.toLowerCase().includes(search.toLowerCase()) ||
          algo.description.toLowerCase().includes(search.toLowerCase()) ||
          algo.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    if (category) {
      filtered = filtered.filter((algo) => algo.category === category);
    }

    if (difficulty) {
      filtered = filtered.filter((algo) => algo.difficulty === difficulty);
    }

    onFilterChange(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    filterAlgorithms(value, selectedCategory, selectedDifficulty);
  };

  const handleCategoryFilter = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newCategory);
    filterAlgorithms(searchTerm, newCategory, selectedDifficulty);
  };

  const handleDifficultyFilter = (difficulty: string) => {
    const newDifficulty = selectedDifficulty === difficulty ? null : difficulty;
    setSelectedDifficulty(newDifficulty);
    filterAlgorithms(searchTerm, selectedCategory, newDifficulty);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    onFilterChange(algorithms);
  };

  return (
    <Card className="p-6 mb-8">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar algoritmos, tags ou descrições..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Options */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtros:</span>
            {(selectedCategory || selectedDifficulty || searchTerm) && (
              <button
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Limpar filtros
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div>
            <h4 className="text-sm font-medium mb-2">Categorias</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={
                      selectedCategory === category.id ? 'default' : 'secondary'
                    }
                    className="cursor-pointer transition-colors"
                    onClick={() => handleCategoryFilter(category.id)}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Difficulty Filters */}
          <div>
            <h4 className="text-sm font-medium mb-2">Dificuldade</h4>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <motion.div
                  key={difficulty}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={
                      selectedDifficulty === difficulty
                        ? 'default'
                        : 'secondary'
                    }
                    className="cursor-pointer transition-colors"
                    onClick={() => handleDifficultyFilter(difficulty)}
                  >
                    {difficulty}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
