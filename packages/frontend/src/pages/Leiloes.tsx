
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Eye } from "lucide-react";

const Leiloes = () => {
  const leiloes = [
    {
      id: 1,
      titulo: "Leilão de Veículos Premium",
      data: "15/08/2025",
      horario: "14:00",
      local: "São Paulo - SP",
      tipo: "Veículos",
      status: "Ao Vivo",
      participantes: 45,
      lanceMinimo: "R$ 15.000,00",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      titulo: "Apartamentos em Copacabana",
      data: "22/08/2025",
      horario: "10:00",
      local: "Rio de Janeiro - RJ",
      tipo: "Imóveis",
      status: "Agendado",
      participantes: 32,
      lanceMinimo: "R$ 250.000,00",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      titulo: "Equipamentos Industriais",
      data: "30/08/2025",
      horario: "15:30",
      local: "Campinas - SP",
      tipo: "Equipamentos",
      status: "Inscrições Abertas",
      participantes: 18,
      lanceMinimo: "R$ 5.000,00",
      image: "/placeholder.svg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ao Vivo": return "bg-red-100 text-red-800";
      case "Agendado": return "bg-blue-100 text-blue-800";
      case "Inscrições Abertas": return "bg-green-100 text-green-800";
      case "Encerrado": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary-blue">
              Leilões Disponíveis
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore nossa seleção de leilões em andamento e programados. 
              Encontre oportunidades únicas e participe das melhores ofertas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {leiloes.map((leilao) => (
              <Card key={leilao.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-r from-primary-blue to-secondary-blue relative">
                  <img 
                    src={leilao.image} 
                    alt={leilao.titulo}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getStatusColor(leilao.status)}>
                      {leilao.status}
                    </Badge>
                  </div>
                  {leilao.status === "Ao Vivo" && (
                    <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>AO VIVO</span>
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-primary-blue">
                    {leilao.titulo}
                  </CardTitle>
                  <CardDescription>
                    Lance mínimo: {leilao.lanceMinimo}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary-blue" />
                      <span className="text-sm text-gray-600">{leilao.data}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary-blue" />
                      <span className="text-sm text-gray-600">{leilao.horario}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary-blue" />
                      <span className="text-sm text-gray-600">{leilao.local}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-primary-blue" />
                      <span className="text-sm text-gray-600">{leilao.participantes} participantes</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                    {leilao.status === "Ao Vivo" && (
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Participar Agora
                      </Button>
                    )}
                    {leilao.status === "Agendado" && (
                      <Button size="sm" className="bg-primary-blue hover:bg-primary-blue/90">
                        Se Inscrever
                      </Button>
                    )}
                    {leilao.status === "Inscrições Abertas" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Inscrever-se
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <Card className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4">
                  Quer ser notificado sobre novos leilões?
                </h3>
                <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                  Cadastre-se em nossa plataforma e receba alertas sobre leilões que 
                  correspondem ao seu perfil de interesse.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="secondary" className="bg-white text-primary-blue hover:bg-gray-100">
                    Criar Conta
                  </Button>
                  <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-primary-blue">
                    Saiba Mais
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
      <WhatsappFloat />
    </div>
  );
};

export default Leiloes;
