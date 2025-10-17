
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Edit, Plus, Trash2, Globe, FileText } from "lucide-react";

interface ContentPage {
  id: number;
  titulo: string;
  slug: string;
  conteudo: string;
  ativo: boolean;
  tipo: "Página" | "Texto" | "Seção";
  ultimaEdicao: string;
}

export const ContentEditor = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState<ContentPage[]>([
    {
      id: 1,
      titulo: "Sobre Nós",
      slug: "sobre-nos",
      conteudo: "Somos uma plataforma especializada em leilões online...",
      ativo: true,
      tipo: "Página",
      ultimaEdicao: "2024-07-15"
    },
    {
      id: 2,
      titulo: "Política de Privacidade",
      slug: "politica-privacidade",
      conteudo: "Esta política descreve como coletamos e utilizamos seus dados...",
      ativo: true,
      tipo: "Página",
      ultimaEdicao: "2024-07-10"
    },
    {
      id: 3,
      titulo: "Texto do Hero",
      slug: "hero-text",
      conteudo: "Participe dos melhores leilões online e encontre oportunidades únicas",
      ativo: true,
      tipo: "Texto",
      ultimaEdicao: "2024-07-12"
    }
  ]);

  const [editingPage, setEditingPage] = useState<ContentPage | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    slug: "",
    conteudo: "",
    tipo: "Página" as ContentPage["tipo"]
  });

  const handleSave = () => {
    if (editingPage) {
      setPages(prev => prev.map(page => 
        page.id === editingPage.id 
          ? { ...page, ...formData, ultimaEdicao: new Date().toISOString().split('T')[0] }
          : page
      ));
      toast({
        title: "Conteúdo atualizado!",
        description: "As alterações foram salvas com sucesso."
      });
    } else {
      const newPage: ContentPage = {
        id: Date.now(),
        ...formData,
        ativo: true,
        ultimaEdicao: new Date().toISOString().split('T')[0]
      };
      setPages(prev => [...prev, newPage]);
      toast({
        title: "Conteúdo criado!",
        description: "O novo conteúdo foi adicionado com sucesso."
      });
    }
    
    setEditingPage(null);
    setShowForm(false);
    setFormData({ titulo: "", slug: "", conteudo: "", tipo: "Página" });
  };

  const handleEdit = (page: ContentPage) => {
    setEditingPage(page);
    setFormData({
      titulo: page.titulo,
      slug: page.slug,
      conteudo: page.conteudo,
      tipo: page.tipo
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setPages(prev => prev.filter(page => page.id !== id));
    toast({
      title: "Conteúdo excluído!",
      description: "O conteúdo foi removido do sistema."
    });
  };

  const toggleActive = (id: number) => {
    setPages(prev => prev.map(page => 
      page.id === id ? { ...page, ativo: !page.ativo } : page
    ));
  };

  const generateSlug = (titulo: string) => {
    return titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  if (showForm) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{editingPage ? "Editar Conteúdo" : "Criar Novo Conteúdo"}</CardTitle>
            <CardDescription>Configure o conteúdo da página ou seção</CardDescription>
          </div>
          <Button variant="ghost" onClick={() => setShowForm(false)}>
            ✕
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => {
                  const titulo = e.target.value;
                  setFormData({
                    ...formData, 
                    titulo,
                    slug: generateSlug(titulo)
                  });
                }}
                placeholder="Digite o título"
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                placeholder="url-da-pagina"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tipo">Tipo de Conteúdo</Label>
            <select
              id="tipo"
              value={formData.tipo}
              onChange={(e) => setFormData({...formData, tipo: e.target.value as ContentPage["tipo"]})}
              className="w-full p-2 border rounded-md"
            >
              <option value="Página">Página Completa</option>
              <option value="Texto">Texto/Frase</option>
              <option value="Seção">Seção de Página</option>
            </select>
          </div>

          <div>
            <Label htmlFor="conteudo">Conteúdo</Label>
            <Textarea
              id="conteudo"
              value={formData.conteudo}
              onChange={(e) => setFormData({...formData, conteudo: e.target.value})}
              placeholder="Digite o conteúdo..."
              rows={formData.tipo === "Texto" ? 3 : 10}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.tipo === "Texto" 
                ? "Para textos curtos como títulos e frases" 
                : "Suporte para HTML básico: <p>, <h1-h6>, <strong>, <em>, <a>, <ul>, <li>"
              }
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-primary-blue hover:bg-primary-blue/90 text-white">
              <Save className="h-4 w-4 mr-2" />
              {editingPage ? "Atualizar" : "Criar"} Conteúdo
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Editor de Conteúdo</CardTitle>
          <CardDescription>
            Gerencie páginas, textos e seções do site
          </CardDescription>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-primary-blue hover:bg-primary-blue/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Conteúdo
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {pages.map((page) => (
            <div key={page.id} className="border rounded-lg p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {page.tipo === "Página" ? (
                      <Globe className="h-4 w-4 text-blue-600" />
                    ) : (
                      <FileText className="h-4 w-4 text-green-600" />
                    )}
                    <h3 className="font-semibold">{page.titulo}</h3>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    page.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {page.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                    {page.tipo}
                  </span>
                </div>
                <p className="text-sm text-gray-600">/{page.slug}</p>
                <p className="text-xs text-gray-500">
                  {page.conteudo.length > 100 
                    ? `${page.conteudo.substring(0, 100)}...` 
                    : page.conteudo
                  }
                </p>
                <p className="text-xs text-gray-400">Última edição: {page.ultimaEdicao}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(page)}>
                  <Edit className="h-3 w-3" />
                </Button>
                <Button 
                  size="sm" 
                  variant={page.ativo ? "destructive" : "default"}
                  onClick={() => toggleActive(page.id)}
                >
                  {page.ativo ? "Desativar" : "Ativar"}
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleDelete(page.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
