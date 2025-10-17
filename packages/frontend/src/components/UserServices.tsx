
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Mail } from "lucide-react";

interface UserServicesProps {
  userType: string;
}

export const UserServices = ({ userType }: UserServicesProps) => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [contactForm, setContactForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: ""
  });

  const services = [
    {
      id: 1,
      nome: "Avaliação de Veículos",
      descricao: "Avaliação completa de veículos para leilão com laudo técnico",
      preco: "R$ 150,00",
      categoria: "Avaliação",
      tiposUsuario: ["Pessoa Física", "Leiloeiro"],
      detalhes: "Inclui vistoria completa, fotos, laudo técnico e estimativa de valor de mercado."
    },
    {
      id: 2,
      nome: "Consultoria Jurídica",
      descricao: "Consultoria especializada em legislação de leilões",
      preco: "R$ 300,00",
      categoria: "Consultoria",
      tiposUsuario: ["Pessoa Jurídica", "Leiloeiro"],
      detalhes: "Orientação jurídica sobre regulamentações, contratos e procedimentos legais."
    },
    {
      id: 3,
      nome: "Transporte Especializado",
      descricao: "Transporte seguro para veículos e equipamentos",
      preco: "R$ 250,00",
      categoria: "Transporte",
      tiposUsuario: ["Pessoa Física", "Pessoa Jurídica"],
      detalhes: "Transporte com guincho especializado, seguro incluso e rastreamento."
    },
    {
      id: 4,
      nome: "Documentação Completa",
      descricão: "Regularização de documentos para leilão",
      preco: "R$ 200,00",
      categoria: "Documentação",
      tiposUsuario: ["Pessoa Física", "Pessoa Jurídica", "Leiloeiro"],
      detalhes: "Preparação de toda documentação necessária para participar de leilões."
    }
  ];

  const availableServices = services.filter(service => 
    service.tiposUsuario.includes(userType)
  );

  const handleContactService = () => {
    if (!selectedService) return;
    
    toast({
      title: "Solicitação enviada!",
      description: `Sua solicitação para ${selectedService.nome} foi enviada. Entraremos em contato em breve.`
    });
    
    setSelectedService(null);
    setContactForm({
      nome: "",
      email: "",
      telefone: "",
      mensagem: ""
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Serviços Disponíveis
        </CardTitle>
        <CardDescription>
          Contrate serviços especializados para suas necessidades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableServices.map((service) => (
            <Card key={service.id} className="border">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.nome}</CardTitle>
                    <Badge variant="outline" className="mt-1">{service.categoria}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary-blue">{service.preco}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-neutral-gray mb-4">{service.descricao}</p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white"
                      onClick={() => setSelectedService(service)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contratar Serviço
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contratar: {service.nome}</DialogTitle>
                      <DialogDescription>
                        {service.detalhes}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="font-medium text-primary-blue">Valor: {service.preco}</p>
                        <p className="text-sm text-neutral-gray mt-1">
                          Prazo de execução: 2-5 dias úteis
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="nome">Nome Completo</Label>
                          <Input
                            id="nome"
                            value={contactForm.nome}
                            onChange={(e) => setContactForm({...contactForm, nome: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                              id="email"
                              type="email"
                              value={contactForm.email}
                              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input
                              id="telefone"
                              value={contactForm.telefone}
                              onChange={(e) => setContactForm({...contactForm, telefone: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="mensagem">Detalhes da Solicitação</Label>
                          <Textarea
                            id="mensagem"
                            value={contactForm.mensagem}
                            onChange={(e) => setContactForm({...contactForm, mensagem: e.target.value})}
                            rows={3}
                            placeholder="Descreva suas necessidades específicas..."
                          />
                        </div>
                      </div>
                      
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setSelectedService(null)}>
                          Cancelar
                        </Button>
                        <Button 
                          onClick={handleContactService}
                          className="bg-primary-blue hover:bg-primary-blue/90 text-white"
                        >
                          Enviar Solicitação
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {availableServices.length === 0 && (
          <div className="text-center py-8">
            <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-neutral-gray">Nenhum serviço disponível para seu tipo de conta.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
