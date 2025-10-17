import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { LeiloeiroPanel } from "@/components/LeiloeiroPanel";
import { UserLeilaoForm } from "@/components/UserLeilaoForm";
import { UserServices } from "@/components/UserServices";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Gavel, Heart, User, Bell, FileText, Plus } from "lucide-react";

const Dashboard = () => {
  // Simular tipo de usuário logado - pode vir do contexto de autenticação
  const [userType] = useState("Pessoa Física"); // "Pessoa Física", "Pessoa Jurídica", "leiloeiro"
  const [showLeilaoForm, setShowLeilaoForm] = useState(false);

  const mockLeiloes = [
    {
      id: 1,
      titulo: "Leilão de Veículos - Lote 001",
      data: "2024-07-15",
      hora: "14:00",
      status: "Em andamento",
      lance: "R$ 15.000"
    },
    {
      id: 2,
      titulo: "Leilão de Imóveis - Casa Comercial",
      data: "2024-07-20",
      hora: "10:00",
      status: "Agendado",
      lance: "-"
    }
  ];

  const mockFavoritos = [
    {
      id: 1,
      titulo: "Apartamento 2 quartos - Centro",
      tipo: "Imóvel",
      valor: "R$ 180.000"
    },
    {
      id: 2,
      titulo: "Honda Civic 2018",
      tipo: "Veículo",
      valor: "R$ 45.000"
    }
  ];

  // Renderizar painel específico baseado no tipo de usuário
  const renderUserSpecificContent = () => {
    switch (userType) {
      case "leiloeiro":
        return <LeiloeiroPanel />;
      case "Pessoa Jurídica":
        return renderPJContent();
      case "Pessoa Física":
      default:
        return renderPFContent();
    }
  };

  const renderPFContent = () => (
    <div className="space-y-6">
      {/* Cards de Resumo para PF */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leilões Participando</CardTitle>
            <Gavel className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-blue">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            <Heart className="h-4 w-4 text-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange">8</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lances Dados</CardTitle>
            <Clock className="h-4 w-4 text-secondary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary-blue">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notificações</CardTitle>
            <Bell className="h-4 w-4 text-neutral-gray" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-gray">2</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs do Dashboard PF */}
      <Tabs defaultValue="leiloes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="leiloes">Meus Leilões</TabsTrigger>
          <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
          <TabsTrigger value="criar">Criar/Solicitar</TabsTrigger>
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="leiloes">
          <Card>
            <CardHeader>
              <CardTitle>Leilões que Estou Participando</CardTitle>
              <CardDescription>
                Acompanhe seus leilões ativos e agendados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeiloes.map((leilao) => (
                  <div key={leilao.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{leilao.titulo}</h4>
                      <p className="text-sm text-neutral-gray">
                        {leilao.data} às {leilao.hora}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={leilao.status === "Em andamento" ? "default" : "secondary"}>
                        {leilao.status}
                      </Badge>
                      <p className="text-sm mt-1">
                        {leilao.lance !== "-" ? `Meu lance: ${leilao.lance}` : "Sem lances"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favoritos">
          <Card>
            <CardHeader>
              <CardTitle>Itens Favoritos</CardTitle>
              <CardDescription>
                Seus itens marcados como favoritos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFavoritos.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.titulo}</h4>
                      <Badge variant="outline">{item.tipo}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary-blue">{item.valor}</p>
                      <Button size="sm" className="mt-2">Ver Detalhes</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="criar">
          {showLeilaoForm ? (
            <UserLeilaoForm 
              onClose={() => setShowLeilaoForm(false)}
              userType={userType}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Solicitar Leilão</CardTitle>
                  <CardDescription>
                    Solicite a criação de um leilão para seus itens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setShowLeilaoForm(true)}
                    className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Solicitação
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Criar Edital</CardTitle>
                  <CardDescription>
                    Publique um edital para seus leilões
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Criar Edital
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="servicos">
          <UserServices userType={userType} />
        </TabsContent>

        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle>Meus Dados</CardTitle>
              <CardDescription>
                Informações da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome Completo</Label>
                  <Input value="João Silva Santos" readOnly />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input value="joao@email.com" readOnly />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input value="(11) 99999-9999" />
                </div>
                <div>
                  <Label>CPF</Label>
                  <Input value="***.***.***-**" readOnly />
                </div>
              </div>
              <Button className="bg-primary-blue hover:bg-primary-blue/90 text-white">
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Atividades</CardTitle>
              <CardDescription>
                Suas atividades recentes na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border-l-4 border-primary-blue bg-blue-50">
                  <Gavel className="h-4 w-4 text-primary-blue" />
                  <div>
                    <p className="text-sm">Lance dado no Leilão de Veículos</p>
                    <p className="text-xs text-neutral-gray">Hoje às 14:30</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border-l-4 border-orange bg-orange-50">
                  <Heart className="h-4 w-4 text-orange" />
                  <div>
                    <p className="text-sm">Item adicionado aos favoritos</p>
                    <p className="text-xs text-neutral-gray">Ontem às 16:20</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border-l-4 border-secondary-blue bg-cyan-50">
                  <User className="h-4 w-4 text-secondary-blue" />
                  <div>
                    <p className="text-sm">Perfil atualizado</p>
                    <p className="text-xs text-neutral-gray">2 dias atrás</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderPJContent = () => (
    <div className="space-y-6">
      {/* Cards específicos para PJ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leilões Corporativos</CardTitle>
            <Gavel className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-blue">7</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
            <FileText className="h-4 w-4 text-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Investido</CardTitle>
            <Clock className="h-4 w-4 text-secondary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary-blue">R$ 2.5M</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <Bell className="h-4 w-4 text-neutral-gray" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-gray">5</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leiloes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="leiloes">Leilões</TabsTrigger>
          <TabsTrigger value="criar">Criar</TabsTrigger>
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="servicos">
          <UserServices userType={userType} />
        </TabsContent>

        <TabsContent value="criar">
          {showLeilaoForm ? (
            <UserLeilaoForm 
              onClose={() => setShowLeilaoForm(false)}
              userType={userType}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Solicitar Leilão Corporativo</CardTitle>
                  <CardDescription>
                    Solicite leilões para ativos da empresa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setShowLeilaoForm(true)}
                    className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Solicitação
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Personalizados</CardTitle>
                  <CardDescription>
                    Gere relatórios de suas atividades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="leiloes">
          <Card>
            <CardHeader>
              <CardTitle>Painel Pessoa Jurídica</CardTitle>
              <CardDescription>
                Funcionalidades específicas para empresas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-gray">Dashboard específico para Pessoa Jurídica em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-blue mb-2">
            {userType === "leiloeiro" ? "Painel do Leiloeiro" : 
             userType === "Pessoa Jurídica" ? "Dashboard Corporativo" : "Meu Dashboard"}
          </h1>
          <p className="text-neutral-gray">
            {userType === "leiloeiro" ? "Gerencie seus leilões e participantes" :
             userType === "Pessoa Jurídica" ? "Controle empresarial de leilões" : "Bem-vindo ao seu painel de controle"}
          </p>
        </div>

        {renderUserSpecificContent()}
      </div>
      <Footer />
      <WhatsappFloat />
    </div>
  );
};

export default Dashboard;
