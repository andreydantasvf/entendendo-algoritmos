'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  HardDrive
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ComplexityCase {
  type: 'best' | 'average' | 'worst';
  timeComplexity: string;
  spaceComplexity: string;
  scenario: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export function ComplexityAnalysis() {
  const cases: ComplexityCase[] = [
    {
      type: 'best',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      scenario: 'Elemento está no meio do array',
      description:
        'O melhor caso ocorre quando o elemento procurado está exatamente no meio do array na primeira tentativa. Isso acontece quando temos sorte e o primeiro chute é certeiro.',
      icon: <TrendingDown className="h-5 w-5" />,
      color: 'text-green-500'
    },
    {
      type: 'average',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      scenario: 'Elemento está em qualquer posição',
      description:
        'Na média, precisamos dividir o array aproximadamente log₂(n) vezes para encontrar o elemento. Este é o caso mais comum e representa o comportamento típico do algoritmo.',
      icon: <Minus className="h-5 w-5" />,
      color: 'text-yellow-500'
    },
    {
      type: 'worst',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      scenario: 'Elemento não existe ou está nas extremidades',
      description:
        'O pior caso acontece quando o elemento não existe no array ou está em uma das extremidades, forçando o algoritmo a fazer o máximo de divisões possíveis.',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-red-500'
    }
  ];

  const getCaseTitle = (type: string) => {
    switch (type) {
      case 'best':
        return 'Melhor Caso';
      case 'average':
        return 'Caso Médio';
      case 'worst':
        return 'Pior Caso';
      default:
        return '';
    }
  };

  const getCaseBadgeColor = (type: string) => {
    switch (type) {
      case 'best':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'average':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'worst':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Complexidade</CardTitle>
        <p className="text-muted-foreground text-sm">
          Entenda como a busca binária se comporta em diferentes cenários
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overview */}
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            🎯 Por que O(log n) é tão eficiente?
          </h4>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            A cada comparação, eliminamos metade dos elementos restantes. Para
            um array de 1.000 elementos, precisamos de no máximo 10 comparações
            (2¹⁰ = 1.024). Para 1 milhão de elementos, apenas 20 comparações!
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {cases.map((case_, index) => (
            <motion.div
              key={case_.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={getCaseBadgeColor(case_.type)}
                      variant="secondary"
                    >
                      {getCaseTitle(case_.type)}
                    </Badge>
                    <div className={case_.color}>{case_.icon}</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Complexities */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Tempo:</span>
                      </div>
                      <code className="font-mono bg-muted px-2 py-1 rounded text-xs">
                        {case_.timeComplexity}
                      </code>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span>Espaço:</span>
                      </div>
                      <code className="font-mono bg-muted px-2 py-1 rounded text-xs">
                        {case_.spaceComplexity}
                      </code>
                    </div>
                  </div>

                  {/* Scenario */}
                  <div>
                    <h5 className="font-medium text-sm mb-1">
                      Quando acontece:
                    </h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      {case_.scenario}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed">{case_.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="space-y-3">
          <h4 className="font-semibold">Comparação com Busca Linear</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Tamanho do Array</th>
                  <th className="text-left p-2">Busca Linear (O(n))</th>
                  <th className="text-left p-2">Busca Binária (O(log n))</th>
                  <th className="text-left p-2">Vantagem</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b">
                  <td className="p-2 font-mono">100</td>
                  <td className="p-2">50 comparações (média)</td>
                  <td className="p-2">7 comparações (máximo)</td>
                  <td className="p-2 text-green-600">7x mais rápido</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">1.000</td>
                  <td className="p-2">500 comparações (média)</td>
                  <td className="p-2">10 comparações (máximo)</td>
                  <td className="p-2 text-green-600">50x mais rápido</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">1.000.000</td>
                  <td className="p-2">500.000 comparações (média)</td>
                  <td className="p-2">20 comparações (máximo)</td>
                  <td className="p-2 text-green-600">25.000x mais rápido</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
