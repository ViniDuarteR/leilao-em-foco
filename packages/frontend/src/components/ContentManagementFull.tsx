
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Search, Edit, Trash2, Eye, Calendar, Users } from "lucide-react";

type ContentType = "Página" | "Notícia" | "Edital";
type ContentStatus = "Rascunho" | "Publicado";

interface Content {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  type: ContentType;
  status: ContentStatus;
  publishDate: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string;
  views?: number;
}

export const ContentManagementFull = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  const [newContent, setNewContent] = useState<{
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    type: ContentType;
    status: ContentStatus;
    publishDate: string;
    seoTitle: string;
    seoDescription: string;
    featuredImage: string;
  }>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    type: "Página",
    status: "Rascunho",
    publishDate: "",
    seoTitle: "",
    seoDescription: "",
    featuredImage: ""
  });

  const [contents, setContents] = useState<Content[]>([
    {
      id: 1,
      title: "Sobre Nossa Empresa",
      slug: "sobre-nos",
      content: "Conteúdo da página sobre nós...",
      excerpt: "Conheça nossa história e missão",
      type: "Página",
      status: "Publicado",
      publishDate: "2025-01-15",
      seoTitle: "Sobre Nós - Leilão em Foco",
      seoDescription: "Conheça a história e missão da Leilão em Foco",
      featuredImage: "",
      views: 145
    },
    {
      id: 2,
      title: "Novo Leilão de Veículos Disponível",
      slug: "novo-leilao-veiculos-janeiro-2025",
      content: "Detalhes sobre o novo leilão de veículos...",
      excerpt: "Confira os veículos disponíveis no leilão deste mês",
      type: "Notícia",
      status: "Publicado",
      publishDate: "2025-01-16",
      seoTitle: "Leilão de Veículos Janeiro 2025",
      seoDescription: "Participe do leilão de veículos com as melhores oportunidades",
      featuredImage: "",
      views: 89
    },
    {
      id: 3,
      title: "Edital Leilão Imóveis Comerciais",
      slug: "edital-imoveis-comerciais-sp",
      content: "Texto completo do edital...",
      excerpt: "Edital para leilão de imóveis comerciais em São Paulo",
      type: "Edital",
      status: "Rascunho",
      publishDate: "2025-01-20",
      seoTitle: "Edital Imóveis Comerciais SP",
      seoDescription: "Edital oficial para leilão de imóveis comerciais",
      featuredImage: "",
      views: 0
    }
  ]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setNewContent({
      ...newContent,
      title,
      slug: generateSlug(title),
      seoTitle: title
    });
  };

  const handleCreateContent = () => {
    if (!newContent.title || !newContent.content) {
      toast({
        title: "Erro",
        description: "Preencha pelo menos o título e o conteúdo",
        variant: "destructive"
      });
      return;
    }

    const content: Content = {
      id: contents.length + 1,
      ...newContent,
      views: 0
    };

    setContents([...contents, content]);
    setNewContent({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      type: "Página",
      status: "Rascunho",
      publishDate: "",
      seoTitle: "",
      seoDescription: "",
      featuredImage: ""
    });

    toast({
      title: "Conteúdo criado!",
      description: "O conteúdo foi criado com sucesso."
    });
  };

  const handleTypeChange = (type: ContentType) => {
    setNewContent({...newContent, type});
  };

  const handleStatusChange = (id: number, newStatus: ContentStatus) => {
    setContents(contents.map(content => 
      content.id === id ? { ...content, status: newStatus } : content
    ));
    
    toast({
      title: "Status atualizado!",
      description: `Conteúdo alterado para ${newStatus}.`
    });
  };

  const handleDeleteContent = (id: number) => {
    setContents(contents.filter(content => content.id !== id));
    toast({
      title: "Conteúdo removido!",
      description: "O conteúdo foi removido com sucesso."
    });
  };

  const getTypeColor = (type: ContentType) => {
    switch (type) {
      case "Página": return "bg-blue-500";
      case "Notícia": return "bg-green-500";
      case "Edital": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case "Rascunho": return "bg-gray-500";
      case "Publicado": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || content.type === selectedType;
    const matchesStatus = selectedStatus === "all" || content.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Conteúdos</p>
                <p className="text-2xl font-bold">{contents.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Publicados</p>
                <p className="text-2xl font-bold text-green-600">
                  {contents.filter(c => c.status === "Publicado").length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rascunhos</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {contents.filter(c => c.status === "Rascunho").length}
                </p>
              </div>
              <Edit className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Visualizações</p>
                <p className="text-2xl font-bold">
                  {contents.reduce((total, content) => total + (content.views || 0), 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulário de Novo Conteúdo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Criar Novo Conteúdo
          </CardTitle>
          <CardDescription>Adicione páginas, notícias ou editais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={newContent.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Digite o título do conteúdo"
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={newContent.slug}
                onChange={(e) => setNewContent({...newContent, slug: e.target.value})}
                placeholder="slug-da-url"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="type">Tipo de Conteúdo</Label>
              <Select value={newContent.type} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Página">Página</SelectItem>
                  <SelectItem value="Notícia">Notícia</SelectItem>
                  <SelectItem value="Edital">Edital</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={newContent.status} onValueChange={(value: ContentStatus) => setNewContent({...newContent, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rascunho">Rascunho</SelectItem>
                  <SelectItem value="Publicado">Publicado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="publishDate">Data de Publicação</Label>
              <Input
                id="publishDate"
                type="date"
                value={newContent.publishDate}
                onChange={(e) => setNewContent({...newContent, publishDate: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="excerpt">Resumo/Excerpt</Label>
            <Textarea
              id="excerpt"
              value={newContent.excerpt}
              onChange={(e) => setNewContent({...newContent, excerpt: e.target.value})}
              placeholder="Breve descrição do conteúdo"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="content">Conteúdo Principal</Label>
            <Textarea
              id="content"
              value={newContent.content}
              onChange={(e) => setNewContent({...newContent, content: e.target.value})}
              placeholder="Digite o conteúdo completo aqui..."
              rows={6}
            />
          </div>

          {/* SEO Fields */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Configurações de SEO</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="seoTitle">Título SEO</Label>
                <Input
                  id="seoTitle"
                  value={newContent.seoTitle}
                  onChange={(e) => setNewContent({...newContent, seoTitle: e.target.value})}
                  placeholder="Título otimizado para SEO"
                />
              </div>
              <div>
                <Label htmlFor="seoDescription">Descrição SEO</Label>
                <Textarea
                  id="seoDescription"
                  value={newContent.seoDescription}
                  onChange={(e) => setNewContent({...newContent, seoDescription: e.target.value})}
                  placeholder="Descrição para mecanismos de busca"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="featuredImage">URL da Imagem Destacada</Label>
                <Input
                  id="featuredImage"
                  value={newContent.featuredImage}
                  onChange={(e) => setNewContent({...newContent, featuredImage: e.target.value})}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
            </div>
          </div>

          <Button onClick={handleCreateContent} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Criar Conteúdo
          </Button>
        </CardContent>
      </Card>

      {/* Lista de Conteúdos */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Conteúdos</CardTitle>
          <CardDescription>Visualize e gerencie todos os conteúdos do site</CardDescription>
          
          {/* Filtros */}
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar conteúdos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="Página">Páginas</SelectItem>
                <SelectItem value="Notícia">Notícias</SelectItem>
                <SelectItem value="Edital">Editais</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="Rascunho">Rascunhos</SelectItem>
                <SelectItem value="Publicado">Publicados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredContents.map((content) => (
              <div key={content.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{content.title}</h3>
                    <p className="text-gray-600 text-sm">{content.excerpt}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>Slug: /{content.slug}</span>
                      <span>Visualizações: {content.views || 0}</span>
                      <span>Publicado em: {new Date(content.publishDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getTypeColor(content.type)} text-white`}>
                      {content.type}
                    </Badge>
                    <Badge className={`${getStatusColor(content.status)} text-white`}>
                      {content.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-sm text-gray-500">
                    SEO: {content.seoTitle || 'Não configurado'}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select 
                      value={content.status} 
                      onValueChange={(value: ContentStatus) => handleStatusChange(content.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rascunho">Rascunho</SelectItem>
                        <SelectItem value="Publicado">Publicado</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteContent(content.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredContents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum conteúdo encontrado com os filtros aplicados.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
