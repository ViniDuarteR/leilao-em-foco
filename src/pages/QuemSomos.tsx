
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Telescope, Shield, Users, TrendingUp, Award, DollarSign } from "lucide-react";

const QuemSomos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-leilao-azul to-leilao-azul-claro bg-clip-text text-transparent">
              A força por trás de cada arremate
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              O Leilão em Foco nasceu da necessidade de conectar leiloeiros e arrematantes 
              através de uma plataforma moderna e confiável. Com anos de experiência no 
              mercado de leilões, nossa equipe desenvolveu uma solução completa que oferece 
              transparência, segurança e facilidade para todos os envolvidos.
            </p>
          </div>

          {/* Cards MVV (Missão, Visão, Valores) */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-leilao-azul to-leilao-azul-claro rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-leilao-azul">Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Democratizar o acesso aos leilões, oferecendo uma plataforma tecnológica 
                  que conecta pessoas e oportunidades, sempre com foco na transparência, 
                  segurança e excelência no atendimento.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-leilao-azul to-leilao-azul-claro rounded-full flex items-center justify-center mx-auto mb-4">
                  <Telescope className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-leilao-azul">Nossa Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Ser a principal referência em leilões online no Brasil, reconhecida pela 
                  inovação tecnológica, confiabilidade e pela capacidade de gerar 
                  oportunidades únicas para nossos usuários.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-leilao-azul to-leilao-azul-claro rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-leilao-azul">Nossos Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2 text-left">
                  <li className="flex items-center"><span className="w-2 h-2 bg-leilao-laranja rounded-full mr-3"></span>Transparência em todos os processos</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-leilao-laranja rounded-full mr-3"></span>Segurança e confiabilidade</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-leilao-laranja rounded-full mr-3"></span>Inovação tecnológica constante</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-leilao-laranja rounded-full mr-3"></span>Excelência no atendimento</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-leilao-laranja rounded-full mr-3"></span>Compromisso com resultados</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-leilao-laranja rounded-full mr-3"></span>Ética e responsabilidade</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Seção de Números */}
          <div className="bg-gradient-to-r from-leilao-azul to-leilao-azul-claro rounded-2xl p-12 text-white mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Resultados que Falam por Si</h2>
              <p className="text-xl opacity-90">Nossa trajetória de sucesso em números</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold">+1.000</div>
                <div className="text-lg opacity-90">Leilões Realizados</div>
              </div>
              
              <div className="space-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold">+5.000</div>
                <div className="text-lg opacity-90">Compradores Satisfeitos</div>
              </div>
              
              <div className="space-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold">95%</div>
                <div className="text-lg opacity-90">Taxa de Sucesso</div>
              </div>
              
              <div className="space-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold">+R$ 10Mi</div>
                <div className="text-lg opacity-90">Em Lotes Vendidos</div>
              </div>
            </div>
          </div>

          {/* Seção Por que escolher */}
          <div className="bg-gradient-to-r from-leilao-azul to-leilao-azul-claro text-white rounded-2xl p-8">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Por que escolher o Leilão em Foco?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3 text-xl">Experiência Comprovada</h3>
                <p className="opacity-90 leading-relaxed">
                  Anos de atuação no mercado de leilões com milhares de negócios realizados.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-xl">Tecnologia Avançada</h3>
                <p className="opacity-90 leading-relaxed">
                  Plataforma moderna e intuitiva, desenvolvida para facilitar sua experiência.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-xl">Suporte Especializado</h3>
                <p className="opacity-90 leading-relaxed">
                  Equipe especializada pronta para auxiliar em todas as etapas do processo.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-xl">Segurança Garantida</h3>
                <p className="opacity-90 leading-relaxed">
                  Processos seguros e transparentes para proteger seus investimentos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <WhatsappFloat />
    </div>
  );
};

export default QuemSomos;
