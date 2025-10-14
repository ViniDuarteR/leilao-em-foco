
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Gavel, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Zap,
  Target,
  FileText
} from "lucide-react";

export const ServicesSection = () => {
  const arrematanteServices = [
    {
      icon: <Target className="h-8 w-8 text-orange-500" />,
      title: "Assessoria para Arrematação",
      description: "Consultoria especializada para maximizar suas chances de sucesso em leilões."
    },
    {
      icon: <FileText className="h-8 w-8 text-cyan-600" />,
      title: "Despachante",
      description: "Serviços completos de documentação e transferência de bens arrematados."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-500" />,
      title: "Curso de Arrematação",
      description: "Aprenda estratégias e técnicas para arrematar com segurança e eficiência."
    }
  ];

  const leiloeiroServices = [
    {
      icon: <Zap className="h-8 w-8 text-cyan-600" />,
      title: "Integração Automática",
      description: "API para sincronização automática de lotes entre seu site e nossa plataforma."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      title: "Marketing para Leilões",
      description: "Estratégias de divulgação e marketing digital para seus leilões."
    },
    {
      icon: <Shield className="h-8 w-8 text-cyan-600" />,
      title: "Credenciamento",
      description: "Suporte completo para processos de credenciamento e regulamentação."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluções completas para arrematantes e leiloeiros, com tecnologia avançada e expertise do mercado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Serviços para Arrematantes */}
          <div>
            <div className="flex items-center mb-8">
              <Users className="h-6 w-6 text-cyan-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Para Arrematantes</h3>
            </div>
            <div className="space-y-6">
              {arrematanteServices.map((service, index) => (
                <Card key={index} className="border-l-4 border-l-cyan-600 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      {service.icon}
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Serviços para Leiloeiros */}
          <div>
            <div className="flex items-center mb-8">
              <Gavel className="h-6 w-6 text-orange-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Para Leiloeiros</h3>
            </div>
            <div className="space-y-6">
              {leiloeiroServices.map((service, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      {service.icon}
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-orange-500 hover:from-cyan-700 hover:to-orange-600">
            Conhecer Todos os Serviços
          </Button>
        </div>
      </div>
    </section>
  );
};
