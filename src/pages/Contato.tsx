
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

const Contato = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary-blue">
              Fale Conosco
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estamos aqui para ajudar! Entre em contato conosco através dos canais 
              abaixo ou envie uma mensagem diretamente pelo formulário.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Informações de Contato */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary-blue">Nossos Contatos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary-blue mt-1" />
                    <div>
                      <p className="font-medium">E-mail Geral</p>
                      <p className="text-sm text-gray-600">contato@leilaoemfoco.com.br</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary-blue mt-1" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-sm text-gray-600">(11) 9999-9999</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="h-5 w-5 text-primary-blue mt-1" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-gray-600">(11) 9999-9999</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary-blue mt-1" />
                    <div>
                      <p className="font-medium">Endereço</p>
                      <p className="text-sm text-gray-600">São Paulo - SP</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary-blue mt-1" />
                    <div>
                      <p className="font-medium">Horário de Atendimento</p>
                      <p className="text-sm text-gray-600">Segunda a Sexta: 8h às 18h</p>
                      <p className="text-sm text-gray-600">Sábado: 8h às 12h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Suporte Especializado</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Nossa equipe está pronta para auxiliar em todas as etapas do processo de leilão.
                  </p>
                  <Button variant="secondary" className="bg-white text-primary-blue hover:bg-gray-100">
                    Chat Online
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Contato */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary-blue">Envie sua Mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e entraremos em contato em breve
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome">Nome Completo *</Label>
                        <Input id="nome" required />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input id="email" type="email" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input id="telefone" />
                      </div>
                      <div>
                        <Label htmlFor="assunto">Assunto *</Label>
                        <select 
                          id="assunto" 
                          required
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Selecione o assunto</option>
                          <option value="duvidas">Dúvidas sobre leilões</option>
                          <option value="cadastro">Problemas com cadastro</option>
                          <option value="pagamento">Questões de pagamento</option>
                          <option value="suporte">Suporte técnico</option>
                          <option value="parceria">Parcerias</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="mensagem">Mensagem *</Label>
                      <Textarea 
                        id="mensagem" 
                        rows={6}
                        placeholder="Descreva sua dúvida ou solicitação..."
                        required 
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="termos" required />
                      <Label htmlFor="termos" className="text-sm">
                        Concordo com os termos de uso e política de privacidade *
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full md:w-auto bg-primary-blue hover:bg-primary-blue/90"
                    >
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Rápido */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary-blue">Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Como participar de um leilão?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Faça seu cadastro, escolha o leilão, analise o edital e participe online ou presencialmente.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Quais documentos preciso?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    RG, CPF, comprovante de renda e residência. Para empresas: CNPJ e contrato social.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Como funciona o pagamento?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Pagamento à vista ou financiado, conforme condições específicas de cada leilão.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Posso visitar os bens antes?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Sim, há dias de visitação programados. Consulte o edital para datas e horários.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
      <WhatsappFloat />
    </div>
  );
};

export default Contato;
