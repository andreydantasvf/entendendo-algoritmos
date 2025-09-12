export interface Algorithm {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  timeComplexity: string;
  spaceComplexity: string;
  tags: string[];
  url: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}
