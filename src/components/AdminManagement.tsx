
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, Shield, Users, Settings } from "lucide-react";

interface Admin {
  id: number;
  nome: string;
  email: string;
  funcao: string;
  nivelAcesso: string;
  permissions: string[];
  dataCriacao: string;
  status: "ativo" | "inativo";
}

const PERMISSIONS = [
  { id: "usuarios", label: "Gerenciar Usuários", description: "Criar, editar e excluir usuários" },
  { id: "leiloes", label: "Gerenciar Leilões", description: "Criar e gerenciar leilões e lotes" },
  { id: "servicos", label: "Gerenciar Serviços", description: "Configurar serviços disponíveis" },
  { id: "chat", label: "Chat com Usuários", description: "Acessar chat interno" },
  { id: "conteudo", label: "Gerenciar Conteúdo", description: "Editar páginas e banners" },
  { id: "configuracoes", label: "Configurações", description: "Alterar configurações do sistema" },
  { id: "relatorios", label: "Relatórios", description: "Visualizar relatórios e estatísticas" },
  { id: "administradores", label: "Gerenciar Administradores", description: "Criar e gerenciar outros administradores" }
];

const ROLES = [
  { value: "super_admin", label: "Super Administrador", permissions: PERMISSIONS.map(p => p.id) },
  { value: "admin", label: "Administrador", permissions: ["usuarios", "leiloes", "servicos", "chat", "conteudo", "relatorios"] },
  { value: "moderador", label: "Moderador", permissions: ["usuarios", "chat", "conteudo"] },
  { value: "operador", label: "Operador", permissions: ["usuarios", "chat"] }
];

export const AdminManagement = () => {
  const { toast } = useToast();
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: 1,
      nome: "Administrador Principal",
      email: "admin@leilaoemfoco.com.br",
      funcao: "Super Administrador",
      nivelAcesso: "super_admin",
      permissions: PERMISSIONS.map(p => p.id),
      dataCriacao: "2024-01-01",
      status: "ativo"
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    funcao: "",
    nivelAcesso: "",
    permissions: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAdmin) {
      setAdmins(prev => prev.map(admin => 
        admin.id === editingAdmin.id 
          ? { ...admin, ...formData, permissions: formData.permissions }
          : admin
      ));
      toast({
        title: "Administrador atualizado!",
        description: "As informações foram atualizadas com sucesso."
      });
    } else {
      const newAdmin: Admin = {
        id: Date.now(),
        nome: formData.nome,
        email: formData.email,
        funcao: formData.funcao,
        nivelAcesso: formData.nivelAcesso,
        permissions: formData.permissions,
        dataCriacao: new Date().toISOString().split('T')[0],
        status: "ativo"
      };
      setAdmins(prev => [...prev, newAdmin]);
      toast({
        title: "Administrador criado!",
        description: "Novo administrador foi criado com sucesso."
      });
    }

    setIsOpen(false);
    setEditingAdmin(null);
    setFormData({
      nome: "",
      email: "",
      senha: "",
      funcao: "",
      nivelAcesso: "",
      permissions: []
    });
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setFormData({
      nome: admin.nome,
      email: admin.email,
      senha: "",
      funcao: admin.funcao,
      nivelAcesso: admin.nivelAcesso,
      permissions: admin.permissions
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setAdmins(prev => prev.filter(admin => admin.id !== id));
    toast({
      title: "Administrador removido",
      description: "O administrador foi removido do sistema.",
      variant: "destructive"
    });
  };

  const handleRoleChange = (role: string) => {
    const selectedRole = ROLES.find(r => r.value === role);
    if (selectedRole) {
      setFormData(prev => ({
        ...prev,
        nivelAcesso: role,
        funcao: selectedRole.label,
        permissions: selectedRole.permissions
      }));
    }
  };

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const getStatusBadge = (status: string) => {
    return status === "ativo" 
      ? <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      : <Badge variant="destructive">Inativo</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Gerenciar Administradores
            </CardTitle>
            <CardDescription>
              Controle os administradores e suas permissões no sistema
            </CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary-blue hover:bg-primary-blue/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Novo Administrador
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingAdmin ? "Editar Administrador" : "Criar Novo Administrador"}
                </DialogTitle>
                <DialogDescription>
                  {editingAdmin ? "Edite as informações do administrador" : "Preencha os dados para criar um novo administrador"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    type="password"
                    value={formData.senha}
                    onChange={(e) => setFormData({...formData, senha: e.target.value})}
                    required={!editingAdmin}
                    placeholder={editingAdmin ? "Deixe em branco para manter a senha atual" : ""}
                  />
                </div>

                <div>
                  <Label htmlFor="nivelAcesso">Nível de Acesso</Label>
                  <Select value={formData.nivelAcesso} onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível de acesso" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map(role => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Permissões Específicas</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {PERMISSIONS.map(permission => (
                      <div key={permission.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={permission.id}
                          checked={formData.permissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor={permission.id} className="text-sm font-medium">
                            {permission.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-primary-blue hover:bg-primary-blue/90 text-white">
                    {editingAdmin ? "Atualizar" : "Criar"} Administrador
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Permissões</TableHead>
                  <TableHead>Data Criação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.nome}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{admin.funcao}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {admin.permissions.slice(0, 3).map(permission => {
                          const perm = PERMISSIONS.find(p => p.id === permission);
                          return (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {perm?.label}
                            </Badge>
                          );
                        })}
                        {admin.permissions.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{admin.permissions.length - 3} mais
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{admin.dataCriacao}</TableCell>
                    <TableCell>{getStatusBadge(admin.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(admin)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        {admin.id !== 1 && (
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDelete(admin.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
