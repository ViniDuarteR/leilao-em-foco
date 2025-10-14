
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { AdminUserForm } from "@/components/AdminUserForm";
import { 
  Search,
  Plus,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Trash2,
  Clock
} from "lucide-react";

interface User {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  telefone: string;
  documento: string;
  dataCadastro: string;
  status: string;
}

interface UserManagementProps {
  pendingUsers: User[];
  setPendingUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const UserManagement = ({ pendingUsers, setPendingUsers }: UserManagementProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleApproveUser = (userId: number) => {
    setPendingUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: "aprovado" }
          : user
      )
    );
    toast({
      title: "Usuário aprovado!",
      description: "O usuário foi aprovado e pode acessar a plataforma."
    });
  };

  const handleRejectUser = (userId: number) => {
    setPendingUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: "rejeitado" }
          : user
      )
    );
    toast({
      title: "Usuário rejeitado",
      description: "O usuário foi rejeitado e será notificado.",
      variant: "destructive"
    });
  };

  const filteredUsers = pendingUsers.filter(user => {
    const matchesSearch = user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case "aprovado":
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Aprovado</Badge>;
      case "rejeitado":
        return <Badge variant="destructive" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejeitado</Badge>;
      default:
        return null;
    }
  };

  if (showUserForm) {
    return (
      <AdminUserForm 
        onClose={() => {
          setShowUserForm(false);
          setEditingUser(null);
        }}
        editingUser={editingUser}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gerenciar Usuários</CardTitle>
          <CardDescription>
            Gerencie e aprove novos cadastros na plataforma
          </CardDescription>
        </div>
        <Button 
          onClick={() => setShowUserForm(true)}
          className="bg-primary-blue hover:bg-primary-blue/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
      </CardHeader>
      <CardContent>
        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-gray" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              Todos
            </Button>
            <Button 
              variant={statusFilter === "pendente" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("pendente")}
            >
              Pendentes
            </Button>
            <Button 
              variant={statusFilter === "aprovado" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("aprovado")}
            >
              Aprovados
            </Button>
          </div>
        </div>

        {/* Tabela de Usuários */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome/Empresa</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Data Cadastro</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.nome}</p>
                      <p className="text-sm text-neutral-gray">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.tipo}</Badge>
                  </TableCell>
                  <TableCell>{user.telefone}</TableCell>
                  <TableCell>{user.documento}</TableCell>
                  <TableCell>{user.dataCadastro}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEditingUser(user);
                          setShowUserForm(true);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      {user.status === "pendente" && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleApproveUser(user.id)}
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectUser(user.id)}
                          >
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="destructive">
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
