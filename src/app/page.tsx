'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { FilterSection } from '@/components/FilterSection';
import { AlgorithmGrid } from '@/components/AlgorithmGrid';
import { algorithms } from '@/data/algorithms';
import { Algorithm } from '@/types/algorithms';

export default function Home() {
  const [filteredAlgorithms, setFilteredAlgorithms] =
    useState<Algorithm[]>(algorithms);

  const handleFilterChange = (filtered: Algorithm[]) => {
    setFilteredAlgorithms(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight"
            >
              Explore o Mundo dos Algoritmos
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Descubra, aprenda e domine os algoritmos fundamentais da ciência
              da computação. Cada algoritmo é apresentado com complexidade,
              exemplos práticos e implementações detalhadas.
            </motion.p>
          </div>

          {/* Filters */}
          <FilterSection
            algorithms={algorithms}
            onFilterChange={handleFilterChange}
          />

          {/* Results Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between"
          >
            <h3 className="text-2xl font-semibold">
              Algoritmos
              <span className="text-muted-foreground ml-2">
                ({filteredAlgorithms.length} de {algorithms.length})
              </span>
            </h3>
          </motion.div>

          {/* Algorithm Grid */}
          <AlgorithmGrid algorithms={filteredAlgorithms} />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>
              Baseado no livro &ldquo;Entendendo Algoritmos&rdquo; de Aditya
              Bhargava
            </p>
            <p className="text-sm mt-2">Desenvolvido por Andrey Dantas</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
