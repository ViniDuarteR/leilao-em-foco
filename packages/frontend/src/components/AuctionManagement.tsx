
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Edit, Eye, Plus, Search, Trash2, TrendingUp } from "lucide-react";

type AuctionStatus = "Rascunho" | "Publicado" | "Em Andamento" | "Finalizado";

interface Auction {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startingBid: number;
  currentBid?: number;
  category: string;
  status: AuctionStatus;
  participants?: number;
}

export const AuctionManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  const [newAuction, setNewAuction] = useState<{
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    startingBid: number;
    category: string;
    status: AuctionStatus;
  }>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startingBid: 0,
    category: "",
    status: "Rascunho"
  });

  const [auctions, setAuctions] = useState<Auction[]>([
    {
      id: 1,
      title: "Veículo Sedan 2020",
      description: "Sedan em ótimo estado, revisado",
      startDate: "2025-01-20",
      endDate: "2025-01-25",
      startingBid: 25000,
      currentBid: 28500,
      category: "Veículos",
      status: "Em Andamento",
      participants: 12
    },
    {
      id: 2,
      title: "Imóvel Comercial Centro",
      description: "Sala comercial 50m² no centro da cidade",
      startDate: "2025-01-22",
      endDate: "2025-01-30",
      startingBid: 150000,
      currentBid: 165000,
      category: "Imóveis",
      status: "Publicado",
      participants: 8
    },
    {
      id: 3,
      title: "Equipamento Industrial",
      description: "Máquina de corte industrial",
      startDate: "2025-01-15",
      endDate: "2025-01-18",
      startingBid: 45000,
      currentBid: 52000,
      category: "Equipamentos",
      status: "Finalizado",
      participants: 15
    }
  ]);

  const handleCreateAuction = () => {
    if (!newAuction.title || !newAuction.description) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const auction: Auction = {
      id: auctions.length + 1,
      ...newAuction,
      participants: 0
    };

    setAuctions([...auctions, auction]);
    setNewAuction({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      startingBid: 0,
      category: "",
      status: "Rascunho"
    });

    toast({
      title: "Leilão criado!",
      description: "O leilão foi criado com sucesso."
    });
  };

  const handleStatusChange = (id: number, newStatus: AuctionStatus) => {
    setAuctions(auctions.map(auction => 
      auction.id === id ? { ...auction, status: newStatus } : auction
    ));
    
    toast({
      title: "Status atualizado!",
      description: `Leilão alterado para ${newStatus}.`
    });
  };

  const handleDeleteAuction = (id: number) => {
    setAuctions(auctions.filter(auction => auction.id !== id));
    toast({
      title: "Leilão removido!",
      description: "O leilão foi removido com sucesso."
    });
  };

  const getStatusColor = (status: AuctionStatus) => {
    switch (status) {
      case "Rascunho": return "bg-gray-500";
      case "Publicado": return "bg-blue-500";
      case "Em Andamento": return "bg-green-500";
      case "Finalizado": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const filteredAuctions = auctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || auction.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Leilões</p>
                <p className="text-2xl font-bold">{auctions.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                <p className="text-2xl font-bold text-green-600">
                  {auctions.filter(a => a.status === "Em Andamento").length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Finalizados</p>
                <p className="text-2xl font-bold text-red-600">
                  {auctions.filter(a => a.status === "Finalizado").length}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participantes Totais</p>
                <p className="text-2xl font-bold">
                  {auctions.reduce((total, auction) => total + (auction.participants || 0), 0)}
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulário de Novo Leilão */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Criar Novo Leilão
          </CardTitle>
          <CardDescription>Adicione um novo leilão à plataforma</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título do Leilão</Label>
              <Input
                id="title"
                value={newAuction.title}
                onChange={(e) => setNewAuction({...newAuction, title: e.target.value})}
                placeholder="Ex: Veículo Sedan 2020"
              />
            </div>
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select value={newAuction.category} onValueChange={(value) => setNewAuction({...newAuction, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Veículos">Veículos</SelectItem>
                  <SelectItem value="Imóveis">Imóveis</SelectItem>
                  <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                  <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                  <SelectItem value="Móveis">Móveis</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={newAuction.description}
              onChange={(e) => setNewAuction({...newAuction, description: e.target.value})}
              placeholder="Descreva o item em leilão..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="startDate">Data de Início</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={newAuction.startDate}
                onChange={(e) => setNewAuction({...newAuction, startDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="endDate">Data de Fim</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={newAuction.endDate}
                onChange={(e) => setNewAuction({...newAuction, endDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="startingBid">Lance Inicial (R$)</Label>
              <Input
                id="startingBid"
                type="number"
                value={newAuction.startingBid}
                onChange={(e) => setNewAuction({...newAuction, startingBid: Number(e.target.value)})}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={newAuction.status} onValueChange={(value: AuctionStatus) => setNewAuction({...newAuction, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rascunho">Rascunho</SelectItem>
                <SelectItem value="Publicado">Publicado</SelectItem>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleCreateAuction} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Criar Leilão
          </Button>
        </CardContent>
      </Card>

      {/* Lista de Leilões */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Leilões</CardTitle>
          <CardDescription>Visualize e gerencie todos os leilões cadastrados</CardDescription>
          
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar leilões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="Rascunho">Rascunho</SelectItem>
                <SelectItem value="Publicado">Publicado</SelectItem>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredAuctions.map((auction) => (
              <div key={auction.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{auction.title}</h3>
                    <p className="text-gray-600 text-sm">{auction.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>Categoria: {auction.category}</span>
                      <span>Participantes: {auction.participants || 0}</span>
                      <span>Lance inicial: R$ {auction.startingBid.toLocaleString()}</span>
                      {auction.currentBid && (
                        <span className="text-green-600 font-medium">
                          Lance atual: R$ {auction.currentBid.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(auction.status)} text-white`}>
                      {auction.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-sm text-gray-500">
                    Início: {new Date(auction.startDate).toLocaleDateString()} | 
                    Fim: {new Date(auction.endDate).toLocaleDateString()}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select 
                      value={auction.status} 
                      onValueChange={(value: AuctionStatus) => handleStatusChange(auction.id, value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rascunho">Rascunho</SelectItem>
                        <SelectItem value="Publicado">Publicado</SelectItem>
                        <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                        <SelectItem value="Finalizado">Finalizado</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteAuction(auction.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredAuctions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum leilão encontrado com os filtros aplicados.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
