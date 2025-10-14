
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { useToast } from "@/hooks/use-toast";

const Cadastro = () => {
  const [userType, setUserType] = useState("pf");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Estados para Pessoa Física
  const [pfData, setPfData] = useState({
    nome: "",
    endereco: "",
    email: "",
    telefone: "",
    cpf: "",
    rg: ""
  });

  // Estados para Pessoa Jurídica
  const [pjData, setPjData] = useState({
    nomeFantasia: "",
    endereco: "",
    site: "",
    email: "",
    telefone: "",
    cnpj: "",
    nomeSocio: "",
    emailSocio: "",
    telefoneSocio: "",
    cpfSocio: "",
    rgSocio: ""
  });

  // Estados para Leiloeiro
  const [leiloeiroData, setLeiloeiroData] = useState({
    nome: "",
    juntaComercial: "",
    numero: "",
    email: "",
    telefone: "",
    site: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de cadastro
    setTimeout(() => {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você pode fazer login agora."
      });
      navigate("/login");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Criar Nova Conta</CardTitle>
              <CardDescription>
                Escolha o tipo de cadastro e preencha os dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tipo de Usuário */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Tipo de Cadastro</Label>
                  <RadioGroup 
                    value={userType} 
                    onValueChange={setUserType}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="pf" id="pf" />
                      <Label htmlFor="pf" className="font-medium">Pessoa Física</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="pj" id="pj" />
                      <Label htmlFor="pj" className="font-medium">Pessoa Jurídica</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="leiloeiro" id="leiloeiro" />
                      <Label htmlFor="leiloeiro" className="font-medium">Leiloeiro</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Formulário Pessoa Física */}
                {userType === "pf" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary-blue">Dados Pessoais</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo</Label>
                        <Input
                          id="nome"
                          value={pfData.nome}
                          onChange={(e) => setPfData(prev => ({ ...prev, nome: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={pfData.email}
                          onChange={(e) => setPfData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone/WhatsApp</Label>
                        <Input
                          id="telefone"
                          value={pfData.telefone}
                          onChange={(e) => setPfData(prev => ({ ...prev, telefone: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          value={pfData.cpf}
                          onChange={(e) => setPfData(prev => ({ ...prev, cpf: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rg">RG</Label>
                        <Input
                          id="rg"
                          value={pfData.rg}
                          onChange={(e) => setPfData(prev => ({ ...prev, rg: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endereco">Endereço Completo</Label>
                      <Input
                        id="endereco"
                        value={pfData.endereco}
                        onChange={(e) => setPfData(prev => ({ ...prev, endereco: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Formulário Pessoa Jurídica */}
                {userType === "pj" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary-blue">Dados da Empresa</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                          <Input
                            id="nomeFantasia"
                            value={pjData.nomeFantasia}
                            onChange={(e) => setPjData(prev => ({ ...prev, nomeFantasia: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cnpj">CNPJ</Label>
                          <Input
                            id="cnpj"
                            value={pjData.cnpj}
                            onChange={(e) => setPjData(prev => ({ ...prev, cnpj: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emailEmpresa">E-mail da Empresa</Label>
                          <Input
                            id="emailEmpresa"
                            type="email"
                            value={pjData.email}
                            onChange={(e) => setPjData(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefoneEmpresa">Telefone/WhatsApp</Label>
                          <Input
                            id="telefoneEmpresa"
                            value={pjData.telefone}
                            onChange={(e) => setPjData(prev => ({ ...prev, telefone: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="site">Site (opcional)</Label>
                          <Input
                            id="site"
                            value={pjData.site}
                            onChange={(e) => setPjData(prev => ({ ...prev, site: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="enderecoEmpresa">Endereço da Empresa</Label>
                        <Input
                          id="enderecoEmpresa"
                          value={pjData.endereco}
                          onChange={(e) => setPjData(prev => ({ ...prev, endereco: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-orange">Dados do Sócio Responsável</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nomeSocio">Nome do Sócio</Label>
                          <Input
                            id="nomeSocio"
                            value={pjData.nomeSocio}
                            onChange={(e) => setPjData(prev => ({ ...prev, nomeSocio: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emailSocio">E-mail do Sócio</Label>
                          <Input
                            id="emailSocio"
                            type="email"
                            value={pjData.emailSocio}
                            onChange={(e) => setPjData(prev => ({ ...prev, emailSocio: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefoneSocio">Telefone/WhatsApp</Label>
                          <Input
                            id="telefoneSocio"
                            value={pjData.telefoneSocio}
                            onChange={(e) => setPjData(prev => ({ ...prev, telefoneSocio: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cpfSocio">CPF do Sócio</Label>
                          <Input
                            id="cpfSocio"
                            value={pjData.cpfSocio}
                            onChange={(e) => setPjData(prev => ({ ...prev, cpfSocio: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rgSocio">RG do Sócio</Label>
                          <Input
                            id="rgSocio"
                            value={pjData.rgSocio}
                            onChange={(e) => setPjData(prev => ({ ...prev, rgSocio: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Formulário Leiloeiro */}
                {userType === "leiloeiro" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-orange">Dados do Leiloeiro</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nomeLeiloeiro">Nome/Razão Social</Label>
                        <Input
                          id="nomeLeiloeiro"
                          value={leiloeiroData.nome}
                          onChange={(e) => setLeiloeiroData(prev => ({ ...prev, nome: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="juntaComercial">Junta Comercial</Label>
                        <Input
                          id="juntaComercial"
                          value={leiloeiroData.juntaComercial}
                          onChange={(e) => setLeiloeiroData(prev => ({ ...prev, juntaComercial: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numero">Número de Registro</Label>
                        <Input
                          id="numero"
                          value={leiloeiroData.numero}
                          onChange={(e) => setLeiloeiroData(prev => ({ ...prev, numero: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emailLeiloeiro">E-mail</Label>
                        <Input
                          id="emailLeiloeiro"
                          type="email"
                          value={leiloeiroData.email}
                          onChange={(e) => setLeiloeiroData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefoneLeiloeiro">Telefone/WhatsApp</Label>
                        <Input
                          id="telefoneLeiloeiro"
                          value={leiloeiroData.telefone}
                          onChange={(e) => setLeiloeiroData(prev => ({ ...prev, telefone: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="siteLeiloeiro">Site (opcional)</Label>
                        <Input
                          id="siteLeiloeiro"
                          value={leiloeiroData.site}
                          onChange={(e) => setLeiloeiroData(prev => ({ ...prev, site: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white" 
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? "Cadastrando..." : "Finalizar Cadastro"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <div className="text-sm text-neutral-gray">
                  Já tem uma conta?{" "}
                  <Link 
                    to="/login" 
                    className="text-primary-blue hover:text-primary-blue/80 font-medium"
                  >
                    Faça login aqui
                  </Link>
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

export default Cadastro;
