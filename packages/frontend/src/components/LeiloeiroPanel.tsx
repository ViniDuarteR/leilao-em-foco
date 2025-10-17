
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Gavel, Users, BarChart3, Calendar, Edit, Trash2 } from "lucide-react";

export const LeiloeiroPanel = () => {
  const mockLeiloes = [
    {
      id: 1,
      titulo: "Leilão de Veículos - Lote Especial",
      data: "2024-07-15",
      status: "Ativo",
      participantes: 45,
      lances: 128,
      valorAtual: "R$ 125.000"
    },
    {
      id: 2,
      titulo: "Leilão de Imóveis Comerciais",
      data: "2024-07-20",
      status: "Agendado",
      participantes: 12,
      lances: 0,
      valorAtual: "R$ 0"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cards de Resumo para Leiloeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leilões Ativos</CardTitle>
            <Gavel className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-blue">5</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participantes</CardTitle>
            <Users className="h-4 w-4 text-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange">234</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita do Mês</CardTitle>
            <BarChart3 className="h-4 w-4 text-secondary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary-blue">R$ 45.2K</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos Leilões</CardTitle>
            <Calendar className="h-4 w-4 text-neutral-gray" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-gray">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs específicas do Leiloeiro */}
      <Tabs defaultValue="meus-leiloes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="meus-leiloes">Meus Leilões</TabsTrigger>
          <TabsTrigger value="criar-leilao">Criar Leilão</TabsTrigger>
          <TabsTrigger value="participantes">Participantes</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="meus-leiloes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Meus Leilões</CardTitle>
                <CardDescription>
                  Gerencie todos os seus leilões
                </CardDescription>
              </div>
              <Button className="bg-primary-blue hover:bg-primary-blue/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Novo Leilão
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeiloes.map((leilao) => (
                  <div key={leilao.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-lg">{leilao.titulo}</h4>
                        <p className="text-sm text-neutral-gray">Data: {leilao.data}</p>
                      </div>
                      <Badge variant={leilao.status === "Ativo" ? "default" : "secondary"}>
                        {leilao.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <p className="text-sm text-neutral-gray">Participantes</p>
                        <p className="text-xl font-bold text-primary-blue">{leilao.participantes}</p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded">
                        <p className="text-sm text-neutral-gray">Lances</p>
                        <p className="text-xl font-bold text-orange">{leilao.lances}</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <p className="text-sm text-neutral-gray">Valor Atual</p>
                        <p className="text-xl font-bold text-green-600">{leilao.valorAtual}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                      <Button size="sm" className="bg-primary-blue hover:bg-primary-blue/90 text-white">
                        Ver Detalhes
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="criar-leilao">
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Leilão</CardTitle>
              <CardDescription>
                Configure um novo leilão para sua plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-gray">Formulário de criação de leilão em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participantes">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Participantes</CardTitle>
              <CardDescription>
                Visualize e gerencie participantes dos seus leilões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-gray">Lista de participantes em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Performance</CardTitle>
              <CardDescription>
                Analise o desempenho dos seus leilões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-gray">Relatórios em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
