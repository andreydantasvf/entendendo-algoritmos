'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/layout/CodeBlock';
import { type CodesBlock } from '@/types/code-block';

interface CodeImplementationProps {
  codes: CodesBlock[];
  extraComponent?: React.ReactNode;
}

export function CodeImplementation({
  codes,
  extraComponent
}: CodeImplementationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Implementações</CardTitle>
        <p className="text-muted-foreground text-sm">
          Exemplos práticos do algoritmo em diferentes linguagens e abordagens
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={codes[0].tabValue} className="w-full">
          <TabsList className="w-full gap-1 flex items-center justify-start md:justify-center overflow-x-auto">
            {codes.map((code) => (
              <TabsTrigger
                key={code.tabValue}
                value={code.tabValue}
                className="flex-shrink-0"
              >
                {code.tabTitle}
              </TabsTrigger>
            ))}
          </TabsList>

          {codes.map((code) => (
            <TabsContent
              key={code.tabValue}
              value={code.tabValue}
              className="mt-4"
            >
              <div className="space-y-3">
                <h4 className="font-semibold">{code.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {code.description}
                </p>
                <CodeBlock code={code.code} language={code.language} />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Additional Notes */}
        {!!extraComponent && (
          <div className="mt-6 space-y-4">{extraComponent}</div>
        )}
      </CardContent>
    </Card>
  );
}
