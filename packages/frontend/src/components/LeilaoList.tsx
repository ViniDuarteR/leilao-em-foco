
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Users, Edit, Trash2, Eye, Play, Pause } from "lucide-react";

interface Leilao {
  id: number;
  titulo: string;
  tipo: string;
  dataInicio: string;
  horaInicio: string;
  dataFim: string;
  horaFim: string;
  local: string;
  status: "Agendado" | "Ao Vivo" | "Encerrado" | "Pausado";
  participantes: number;
  lotes: number;
  valorTotal: string;
}

interface LeilaoListProps {
  onEdit: (leilao: Leilao) => void;
}

export const LeilaoList = ({ onEdit }: LeilaoListProps) => {
  const { toast } = useToast();
  const [leiloes, setLeiloes] = useState<Leilao[]>([
    {
      id: 1,
      titulo: "Leilão de Veículos Premium",
      tipo: "Veículos",
      dataInicio: "2024-08-15",
      horaInicio: "14:00",
      dataFim: "2024-08-15",
      horaFim: "18:00",
      local: "São Paulo - SP",
      status: "Ao Vivo",
      participantes: 45,
      lotes: 15,
      valorTotal: "R$ 1.250.000,00"
    },
    {
      id: 2,
      titulo: "Apartamentos em Copacabana",
      tipo: "Imóveis",
      dataInicio: "2024-08-22",
      horaInicio: "10:00",
      dataFim: "2024-08-22",
      horaFim: "16:00",
      local: "Rio de Janeiro - RJ",
      status: "Agendado",
      participantes: 32,
      lotes: 8,
      valorTotal: "R$ 8.500.000,00"
    },
    {
      id: 3,
      titulo: "Equipamentos Industriais",
      tipo: "Equipamentos",
      dataInicio: "2024-08-10",
      horaInicio: "15:30",
      dataFim: "2024-08-10",
      horaFim: "17:30",
      local: "Campinas - SP",
      status: "Encerrado",
      participantes: 18,
      lotes: 25,
      valorTotal: "R$ 450.000,00"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ao Vivo": return "bg-red-100 text-red-800";
      case "Agendado": return "bg-blue-100 text-blue-800";
      case "Encerrado": return "bg-gray-100 text-gray-800";
      case "Pausado": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (id: number, newStatus: Leilao["status"]) => {
    setLeiloes(prev => prev.map(leilao => 
      leilao.id === id ? { ...leilao, status: newStatus } : leilao
    ));
    toast({
      title: "Status atualizado!",
      description: `Leilão alterado para ${newStatus}.`
    });
  };

  const handleDelete = (id: number) => {
    setLeiloes(prev => prev.filter(leilao => leilao.id !== id));
    toast({
      title: "Leilão excluído!",
      description: "O leilão foi removido do sistema."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leilões Cadastrados</CardTitle>
        <CardDescription>
          Gerencie todos os leilões da plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Leilão</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Participantes</TableHead>
                <TableHead>Lotes</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leiloes.map((leilao) => (
                <TableRow key={leilao.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{leilao.titulo}</p>
                      <p className="text-sm text-gray-500">{leilao.tipo}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(leilao.dataInicio).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{leilao.horaInicio}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      <span>{leilao.local}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(leilao.status)}>
                      {leilao.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{leilao.participantes}</span>
                    </div>
                  </TableCell>
                  <TableCell>{leilao.lotes}</TableCell>
                  <TableCell className="font-medium">{leilao.valorTotal}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => onEdit(leilao)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      {leilao.status === "Agendado" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusChange(leilao.id, "Ao Vivo")}
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                      {leilao.status === "Ao Vivo" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusChange(leilao.id, "Pausado")}
                        >
                          <Pause className="h-3 w-3" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(leilao.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
