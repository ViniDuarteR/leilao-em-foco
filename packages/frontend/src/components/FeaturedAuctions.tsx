
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export const FeaturedAuctions = () => {
  const featuredAuctions = [
    {
      id: 1,
      title: "Leilão de Veículos - São Paulo",
      description: "Mais de 200 veículos diversos, incluindo carros, motos e caminhões.",
      date: "15/01/2025",
      time: "14:00",
      location: "São Paulo - SP",
      status: "Aberto",
      lots: 215,
      leiloeiro: "Leiloeiro São Paulo LTDA"
    },
    {
      id: 2,
      title: "Leilão de Imóveis - Rio de Janeiro",
      description: "Apartamentos, casas e terrenos em diversas regiões do Rio de Janeiro.",
      date: "20/01/2025",
      time: "10:00",
      location: "Rio de Janeiro - RJ",
      status: "Aberto",
      lots: 45,
      leiloeiro: "RJ Leilões"
    },
    {
      id: 3,
      title: "Leilão de Equipamentos Industriais",
      description: "Máquinas e equipamentos industriais de diversos segmentos.",
      date: "25/01/2025",
      time: "09:00",
      location: "Campinas - SP",
      status: "Em Breve",
      lots: 120,
      leiloeiro: "Industrial Leilões"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Leilões em Destaque
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Confira os leilões mais relevantes e não perca as melhores oportunidades.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAuctions.map((auction) => (
            <Card key={auction.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant={auction.status === "Aberto" ? "default" : "secondary"}
                    className={auction.status === "Aberto" ? "bg-green-500" : ""}
                  >
                    {auction.status}
                  </Badge>
                  <span className="text-sm text-gray-500">{auction.lots} lotes</span>
                </div>
                <CardTitle className="text-xl">{auction.title}</CardTitle>
                <CardDescription className="text-base">
                  {auction.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {auction.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {auction.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {auction.location}
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600 mb-3">
                    Leiloeiro: <span className="font-medium">{auction.leiloeiro}</span>
                  </p>
                  <Button className="w-full" asChild>
                    <Link to={`/leilao/${auction.id}`}>Ver Detalhes</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link to="/leiloes">Ver Todos os Leilões</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
