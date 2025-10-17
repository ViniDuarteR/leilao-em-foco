
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, FileText, Download } from "lucide-react";

const Editais = () => {
  const editais = [
    {
      id: 1,
      titulo: "Leilão de Veículos - Lote 001/2025",
      data: "15/08/2025",
      local: "São Paulo - SP",
      tipo: "Veículos",
      status: "Aberto",
      descricao: "Leilão de veículos apreendidos com lance inicial a partir de R$ 5.000,00"
    },
    {
      id: 2,
      titulo: "Leilão de Imóveis Residenciais",
      data: "22/08/2025",
      local: "Rio de Janeiro - RJ",
      tipo: "Imóveis",
      status: "Em breve",
      descricao: "Apartamentos e casas em diversos bairros do Rio de Janeiro"
    },
    {
      id: 3,
      titulo: "Leilão de Máquinas Industriais",
      data: "30/08/2025",
      local: "Campinas - SP",
      tipo: "Equipamentos",
      status: "Em breve",
      descricao: "Equipamentos industriais de alta qualidade para diversos setores"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aberto": return "bg-green-100 text-green-800";
      case "Em breve": return "bg-yellow-100 text-yellow-800";
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
              Editais de Leilão
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Confira todos os editais disponíveis e participe dos melhores leilões. 
              Baixe os documentos e fique por dentro de todas as informações.
            </p>
          </div>

          <div className="grid gap-6">
            {editais.map((edital) => (
              <Card key={edital.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-primary-blue mb-2">
                        {edital.titulo}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {edital.descricao}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(edital.status)}>
                      {edital.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary-blue" />
                      <span className="text-sm text-gray-600">{edital.data}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary-blue" />
                      <span className="text-sm text-gray-600">{edital.local}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-primary-blue" />
                      <span className="text-sm text-gray-600">{edital.tipo}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Edital
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                    {edital.status === "Aberto" && (
                      <Button size="sm" className="bg-primary-blue hover:bg-primary-blue/90">
                        Participar do Leilão
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">
                  Não encontrou o que procura?
                </h3>
                <p className="mb-6 opacity-90">
                  Entre em contato conosco para receber informações sobre próximos leilões
                  ou esclarecer dúvidas sobre nossos editais.
                </p>
                <Button variant="secondary" className="bg-white text-primary-blue hover:bg-gray-100">
                  Falar Conosco
                </Button>
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

export default Editais;
