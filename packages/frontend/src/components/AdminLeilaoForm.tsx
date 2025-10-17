
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";

interface AdminLeilaoFormProps {
  onClose: () => void;
}

export const AdminLeilaoForm = ({ onClose }: AdminLeilaoFormProps) => {
  const { toast } = useToast();
  const [lotes, setLotes] = useState([{ id: 1, descricao: "", valorInicial: "" }]);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    dataInicio: "",
    horaInicio: "",
    dataFim: "",
    horaFim: "",
    local: "",
    tipo: "Veículos",
    comissao: "",
    observacoes: ""
  });

  const addLote = () => {
    setLotes([...lotes, { id: Date.now(), descricao: "", valorInicial: "" }]);
  };

  const removeLote = (id: number) => {
    setLotes(lotes.filter(lote => lote.id !== id));
  };

  const updateLote = (id: number, field: string, value: string) => {
    setLotes(lotes.map(lote => 
      lote.id === id ? { ...lote, [field]: value } : lote
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Leilão criado!",
      description: "O novo leilão foi criado e está disponível na plataforma."
    });
    onClose();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Criar Novo Leilão</CardTitle>
          <CardDescription>Configure um novo leilão com seus respectivos lotes</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="dataInicio">Data de Início</Label>
              <Input
                id="dataInicio"
                type="date"
                value={formData.dataInicio}
                onChange={(e) => setFormData({...formData, dataInicio: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="horaInicio">Hora de Início</Label>
              <Input
                id="horaInicio"
                type="time"
                value={formData.horaInicio}
                onChange={(e) => setFormData({...formData, horaInicio: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="dataFim">Data de Fim</Label>
              <Input
                id="dataFim"
                type="date"
                value={formData.dataFim}
                onChange={(e) => setFormData({...formData, dataFim: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="horaFim">Hora de Fim</Label>
              <Input
                id="horaFim"
                type="time"
                value={formData.horaFim}
                onChange={(e) => setFormData({...formData, horaFim: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="local">Local do Leilão</Label>
              <Input
                id="local"
                value={formData.local}
                onChange={(e) => setFormData({...formData, local: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="comissao">Comissão (%)</Label>
              <Input
                id="comissao"
                type="number"
                step="0.01"
                value={formData.comissao}
                onChange={(e) => setFormData({...formData, comissao: e.target.value})}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Lotes do Leilão</Label>
              <Button type="button" onClick={addLote} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Lote
              </Button>
            </div>
            <div className="space-y-3">
              {lotes.map((lote, index) => (
                <div key={lote.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border rounded">
                  <div>
                    <Label>Lote {index + 1} - Descrição</Label>
                    <Input
                      value={lote.descricao}
                      onChange={(e) => updateLote(lote.id, 'descricao', e.target.value)}
                      placeholder="Descrição do lote"
                    />
                  </div>
                  <div>
                    <Label>Valor Inicial</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={lote.valorInicial}
                      onChange={(e) => updateLote(lote.id, 'valorInicial', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="flex items-end">
                    {lotes.length > 1 && (
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeLote(lote.id)}
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                </div>
              ))}
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
              Criar Leilão
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
