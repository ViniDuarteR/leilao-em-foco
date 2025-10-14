
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";

const Noticias = () => {
  const noticias = [
    {
      id: 1,
      titulo: "Record de Participação em Leilões Online Cresce 150% em 2025",
      resumo: "O setor de leilões digitais registra crescimento histórico com maior participação de novos investidores e diversificação de categorias.",
      data: "10/07/2025",
      autor: "Equipe Leilão em Foco",
      categoria: "Mercado",
      destaque: true,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      titulo: "Nova Legislação Facilita Participação em Leilões Judiciais",
      resumo: "Mudanças nas regras tornam mais simples o processo de cadastro e participação em leilões do poder judiciário.",
      data: "08/07/2025",
      autor: "Dr. Carlos Silva",
      categoria: "Legislação",
      destaque: false,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      titulo: "Dicas Essenciais para Iniciantes em Leilões de Veículos",
      resumo: "Guia completo com tudo que você precisa saber antes de participar do seu primeiro leilão de automóveis.",
      data: "05/07/2025",
      autor: "Marina Santos",
      categoria: "Educacional",
      destaque: false,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      titulo: "Leilões de Imóveis: Oportunidades em Alta no Mercado Atual",
      resumo: "Análise do mercado imobiliário através de leilões mostra tendências positivas para investidores.",
      data: "02/07/2025",
      autor: "Roberto Oliveira",
      categoria: "Imóveis",
      destaque: false,
      image: "/placeholder.svg"
    }
  ];

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Mercado": return "bg-blue-100 text-blue-800";
      case "Legislação": return "bg-purple-100 text-purple-800";
      case "Educacional": return "bg-green-100 text-green-800";
      case "Imóveis": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const noticiaDestaque = noticias.find(n => n.destaque);
  const outrasNoticias = noticias.filter(n => !n.destaque);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary-blue">
              Notícias e Artigos
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fique por dentro das últimas novidades do mercado de leilões, 
              mudanças na legislação e dicas valiosas para investidores.
            </p>
          </div>

          {/* Notícia Destaque */}
          {noticiaDestaque && (
            <Card className="mb-12 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-[4/3] lg:aspect-auto">
                  <img 
                    src={noticiaDestaque.image} 
                    alt={noticiaDestaque.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={getCategoriaColor(noticiaDestaque.categoria)}>
                      {noticiaDestaque.categoria}
                    </Badge>
                    <Badge variant="outline" className="border-red-200 text-red-700">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Destaque
                    </Badge>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 text-primary-blue">
                    {noticiaDestaque.titulo}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {noticiaDestaque.resumo}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{noticiaDestaque.data}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{noticiaDestaque.autor}</span>
                      </div>
                    </div>
                    <Button className="bg-primary-blue hover:bg-primary-blue/90">
                      Ler Mais
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Outras Notícias */}
          <div className="grid lg:grid-cols-2 gap-8">
            {outrasNoticias.map((noticia) => (
              <Card key={noticia.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video">
                  <img 
                    src={noticia.image} 
                    alt={noticia.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoriaColor(noticia.categoria)}>
                      {noticia.categoria}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-primary-blue line-clamp-2">
                    {noticia.titulo}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {noticia.resumo}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{noticia.data}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{noticia.autor}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ler Mais
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4">
                  Receba nossas notícias em primeira mão
                </h3>
                <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                  Assine nossa newsletter e fique sempre atualizado com as principais 
                  novidades do mercado de leilões.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Seu e-mail"
                    className="flex-1 px-4 py-2 rounded-md text-gray-900"
                  />
                  <Button variant="secondary" className="bg-white text-primary-blue hover:bg-gray-100">
                    Assinar
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

export default Noticias;
