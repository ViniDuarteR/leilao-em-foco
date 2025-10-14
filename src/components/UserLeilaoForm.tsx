
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { X, Upload } from "lucide-react";

interface UserLeilaoFormProps {
  onClose: () => void;
  userType: string;
}

export const UserLeilaoForm = ({ onClose, userType }: UserLeilaoFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    tipo: "Veículos",
    dataPreferida: "",
    observacoes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Solicitação enviada!",
      description: "Sua solicitação de leilão foi enviada para análise. Entraremos em contato em breve."
    });
    onClose();
  };

  const canCreateLeilao = userType === "leiloeiro";

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            {canCreateLeilao ? "Criar Novo Leilão" : "Solicitar Leilão"}
          </CardTitle>
          <CardDescription>
            {canCreateLeilao 
              ? "Configure um novo leilão" 
              : "Solicite a criação de um leilão para seus itens"
            }
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="titulo">Título do Leilão</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="tipo">Tipo de Leilão</Label>
            <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Veículos">Veículos</SelectItem>
                <SelectItem value="Imóveis">Imóveis</SelectItem>
                <SelectItem value="Máquinas">Máquinas e Equipamentos</SelectItem>
                <SelectItem value="Diversos">Diversos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              rows={4}
              placeholder="Descreva os itens que serão leiloados..."
              required
            />
          </div>

          {!canCreateLeilao && (
            <div>
              <Label htmlFor="dataPreferida">Data Preferida</Label>
              <Input
                id="dataPreferida"
                type="date"
                value={formData.dataPreferida}
                onChange={(e) => setFormData({...formData, dataPreferida: e.target.value})}
              />
            </div>
          )}

          <div>
            <Label>Anexar Documentos/Fotos</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Clique para enviar arquivos</p>
            </div>
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary-blue hover:bg-primary-blue/90 text-white">
              {canCreateLeilao ? "Criar Leilão" : "Enviar Solicitação"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
