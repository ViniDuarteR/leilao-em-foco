
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";

export const ServicesManager = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  
  const [services] = useState([
    {
      id: 1,
      nome: "Avaliação de Veículos",
      descricao: "Avaliação completa de veículos para leilão",
      preco: "R$ 150,00",
      categoria: "Avaliação",
      tiposUsuario: ["Pessoa Física", "Leiloeiro"],
      ativo: true
    },
    {
      id: 2,
      nome: "Consultoria Jurídica",
      descricao: "Consultoria especializada em leilões",
      preco: "R$ 300,00",
      categoria: "Consultoria",
      tiposUsuario: ["Pessoa Jurídica", "Leiloeiro"],
      ativo: true
    }
  ]);

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    tiposUsuario: [] as string[],
    ativo: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: editingService ? "Serviço atualizado!" : "Serviço criado!",
      description: "O serviço foi salvo com sucesso."
    });
    setShowForm(false);
    setEditingService(null);
    setFormData({
      nome: "",
      descricao: "",
      preco: "",
      categoria: "",
      tiposUsuario: [],
      ativo: true
    });
  };

  const handleTipoUsuarioChange = (tipo: string) => {
    const current = formData.tiposUsuario;
    if (current.includes(tipo)) {
      setFormData({
        ...formData,
        tiposUsuario: current.filter(t => t !== tipo)
      });
    } else {
      setFormData({
        ...formData,
        tiposUsuario: [...current, tipo]
      });
    }
  };

  if (showForm) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{editingService ? "Editar" : "Criar"} Serviço</CardTitle>
          <CardDescription>Configure um novo serviço para os usuários</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome do Serviço</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="preco">Preço</Label>
                <Input
                  id="preco"
                  value={formData.preco}
                  onChange={(e) => setFormData({...formData, preco: e.target.value})}
                  placeholder="R$ 0,00"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData({...formData, categoria: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Avaliação">Avaliação</SelectItem>
                  <SelectItem value="Consultoria">Consultoria</SelectItem>
                  <SelectItem value="Documentação">Documentação</SelectItem>
                  <SelectItem value="Transporte">Transporte</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tipos de usuário que podem contratar</Label>
              <div className="flex gap-2 mt-2">
                {["Pessoa Física", "Pessoa Jurídica", "Leiloeiro"].map((tipo) => (
                  <Button
                    key={tipo}
                    type="button"
                    variant={formData.tiposUsuario.includes(tipo) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTipoUsuarioChange(tipo)}
                  >
                    {tipo}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary-blue hover:bg-primary-blue/90 text-white">
                {editingService ? "Atualizar" : "Criar"} Serviço
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gerenciar Serviços</CardTitle>
          <CardDescription>Configure os serviços disponíveis para contratação</CardDescription>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-primary-blue hover:bg-primary-blue/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Novo Serviço
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-lg">{service.nome}</h4>
                  <p className="text-sm text-neutral-gray">{service.descricao}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-primary-blue">{service.preco}</p>
                  <Badge variant="outline">{service.categoria}</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {service.tiposUsuario.map((tipo) => (
                    <Badge key={tipo} variant="secondary" className="text-xs">
                      {tipo}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => {
                    setEditingService(service);
                    setFormData({
                      nome: service.nome,
                      descricao: service.descricao,
                      preco: service.preco,
                      categoria: service.categoria,
                      tiposUsuario: service.tiposUsuario,
                      ativo: service.ativo
                    });
                    setShowForm(true);
                  }}>
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
