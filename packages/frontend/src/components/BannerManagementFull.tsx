
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Image as ImageIcon, Plus, Search, Edit, Trash2, Eye, Upload, Info } from "lucide-react";

type BannerPosition = "Hero" | "Sidebar" | "Rodapé" | "Popup";

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  position: BannerPosition;
  isActive: boolean;
  priority: number;
  clicks?: number;
  impressions?: number;
}

export const BannerManagementFull = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string>("all");
  
  const [newBanner, setNewBanner] = useState<{
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    position: BannerPosition;
    isActive: boolean;
    priority: number;
  }>({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    position: "Hero",
    isActive: true,
    priority: 1
  });

  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 1,
      title: "Banner Principal Home",
      description: "Banner destacado na página inicial",
      imageUrl: "/banner-home.jpg",
      linkUrl: "/leiloes",
      position: "Hero",
      isActive: true,
      priority: 1,
      clicks: 142,
      impressions: 2856
    },
    {
      id: 2,
      title: "Promoção Sidebar",
      description: "Banner promocional lateral",
      imageUrl: "/banner-sidebar.jpg",
      linkUrl: "/cadastro",
      position: "Sidebar",
      isActive: true,
      priority: 2,
      clicks: 89,
      impressions: 1456
    },
    {
      id: 3,
      title: "Banner Rodapé",
      description: "Banner informativo no rodapé",
      imageUrl: "/banner-footer.jpg",
      linkUrl: "/contato",
      position: "Rodapé",
      isActive: false,
      priority: 3,
      clicks: 0,
      impressions: 0
    }
  ]);

  // Especificações técnicas dos banners por posição
  const bannerSpecs = {
    "Hero": {
      dimensions: "1920x600px",
      maxSize: "2MB",
      formats: "JPG, PNG, WebP",
      notes: "Banner principal da home. Resolução alta recomendada para melhor qualidade."
    },
    "Sidebar": {
      dimensions: "300x250px ou 300x600px",
      maxSize: "1MB",
      formats: "JPG, PNG, WebP",
      notes: "Banner lateral. Evite textos muito pequenos para garantir legibilidade."
    },
    "Rodapé": {
      dimensions: "728x90px",
      maxSize: "500KB",
      formats: "JPG, PNG, WebP",
      notes: "Banner horizontal no rodapé. Ideal para informações institucionais."
    },
    "Popup": {
      dimensions: "600x400px",
      maxSize: "1.5MB",
      formats: "JPG, PNG, WebP",
      notes: "Banner para popup modal. Foque em uma ação específica (CTA claro)."
    }
  };

  const handleCreateBanner = () => {
    if (!newBanner.title || !newBanner.imageUrl) {
      toast({
        title: "Erro",
        description: "Preencha pelo menos o título e a URL da imagem",
        variant: "destructive"
      });
      return;
    }

    const banner: Banner = {
      id: banners.length + 1,
      ...newBanner,
      clicks: 0,
      impressions: 0
    };

    setBanners([...banners, banner]);
    setNewBanner({
      title: "",
      description: "",
      imageUrl: "",
      linkUrl: "",
      position: "Hero",
      isActive: true,
      priority: 1
    });

    toast({
      title: "Banner criado!",
      description: "O banner foi criado com sucesso."
    });
  };

  const handleToggleActive = (id: number) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, isActive: !banner.isActive } : banner
    ));
    
    toast({
      title: "Status atualizado!",
      description: "Status do banner foi alterado."
    });
  };

  const handleDeleteBanner = (id: number) => {
    setBanners(banners.filter(banner => banner.id !== id));
    toast({
      title: "Banner removido!",
      description: "O banner foi removido com sucesso."
    });
  };

  const getPositionColor = (position: BannerPosition) => {
    switch (position) {
      case "Hero": return "bg-blue-500";
      case "Sidebar": return "bg-green-500";
      case "Rodapé": return "bg-purple-500";
      case "Popup": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const filteredBanners = banners.filter(banner => {
    const matchesSearch = banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         banner.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === "all" || banner.position === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Banners</p>
                <p className="text-2xl font-bold">{banners.length}</p>
              </div>
              <ImageIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Banners Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {banners.filter(b => b.isActive).length}
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
                <p className="text-sm font-medium text-gray-600">Total de Cliques</p>
                <p className="text-2xl font-bold">
                  {banners.reduce((total, banner) => total + (banner.clicks || 0), 0)}
                </p>
              </div>
              <Upload className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Impressões</p>
                <p className="text-2xl font-bold">
                  {banners.reduce((total, banner) => total + (banner.impressions || 0), 0)}
                </p>
              </div>
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Especificações Técnicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Especificações Técnicas dos Banners
          </CardTitle>
          <CardDescription>Medidas e requisitos para cada posição de banner</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(bannerSpecs).map(([position, specs]) => (
              <div key={position} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`${getPositionColor(position as BannerPosition)} text-white`}>
                    {position}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Dimensões:</strong>
                    <br />
                    <span className="text-gray-600">{specs.dimensions}</span>
                  </div>
                  <div>
                    <strong>Tamanho máximo:</strong>
                    <br />
                    <span className="text-gray-600">{specs.maxSize}</span>
                  </div>
                  <div>
                    <strong>Formatos:</strong>
                    <br />
                    <span className="text-gray-600">{specs.formats}</span>
                  </div>
                  <div>
                    <strong>Observações:</strong>
                    <br />
                    <span className="text-gray-600 text-xs">{specs.notes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Novo Banner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Criar Novo Banner
          </CardTitle>
          <CardDescription>Adicione um novo banner ao site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título do Banner</Label>
              <Input
                id="title"
                value={newBanner.title}
                onChange={(e) => setNewBanner({...newBanner, title: e.target.value})}
                placeholder="Nome identificador do banner"
              />
            </div>
            <div>
              <Label htmlFor="position">Posição</Label>
              <Select value={newBanner.position} onValueChange={(value: BannerPosition) => setNewBanner({...newBanner, position: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hero">Hero (Banner Principal)</SelectItem>
                  <SelectItem value="Sidebar">Sidebar (Lateral)</SelectItem>
                  <SelectItem value="Rodapé">Rodapé (Footer)</SelectItem>
                  <SelectItem value="Popup">Popup (Modal)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={newBanner.description}
              onChange={(e) => setNewBanner({...newBanner, description: e.target.value})}
              placeholder="Descrição interna do banner"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                value={newBanner.imageUrl}
                onChange={(e) => setNewBanner({...newBanner, imageUrl: e.target.value})}
                placeholder="https://exemplo.com/banner.jpg"
              />
            </div>
            <div>
              <Label htmlFor="linkUrl">URL de Destino</Label>
              <Input
                id="linkUrl"
                value={newBanner.linkUrl}
                onChange={(e) => setNewBanner({...newBanner, linkUrl: e.target.value})}
                placeholder="/pagina-destino ou https://site.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Prioridade</Label>
              <Input
                id="priority"
                type="number"
                value={newBanner.priority}
                onChange={(e) => setNewBanner({...newBanner, priority: Number(e.target.value)})}
                placeholder="1"
                min="1"
              />
              <p className="text-xs text-gray-500 mt-1">Menor número = maior prioridade</p>
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="isActive"
                checked={newBanner.isActive}
                onCheckedChange={(checked) => setNewBanner({...newBanner, isActive: checked})}
              />
              <Label htmlFor="isActive">Banner ativo</Label>
            </div>
          </div>

          {/* Preview das especificações para a posição selecionada */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Especificações para {newBanner.position}:</h4>
            <div className="text-sm text-blue-800">
              <p><strong>Dimensões:</strong> {bannerSpecs[newBanner.position].dimensions}</p>
              <p><strong>Tamanho máximo:</strong> {bannerSpecs[newBanner.position].maxSize}</p>
              <p><strong>Formatos aceitos:</strong> {bannerSpecs[newBanner.position].formats}</p>
              <p className="mt-2"><strong>Dica:</strong> {bannerSpecs[newBanner.position].notes}</p>
            </div>
          </div>

          <Button onClick={handleCreateBanner} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Criar Banner
          </Button>
        </CardContent>
      </Card>

      {/* Lista de Banners */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Banners</CardTitle>
          <CardDescription>Visualize e gerencie todos os banners do site</CardDescription>
          
          {/* Filtros */}
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar banners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedPosition} onValueChange={setSelectedPosition}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filtrar por posição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Posições</SelectItem>
                <SelectItem value="Hero">Hero</SelectItem>
                <SelectItem value="Sidebar">Sidebar</SelectItem>
                <SelectItem value="Rodapé">Rodapé</SelectItem>
                <SelectItem value="Popup">Popup</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredBanners.map((banner) => (
              <div key={banner.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{banner.title}</h3>
                    <p className="text-gray-600 text-sm">{banner.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>Prioridade: {banner.priority}</span>
                      <span>Cliques: {banner.clicks || 0}</span>
                      <span>Impressões: {banner.impressions || 0}</span>
                      <span>CTR: {banner.impressions ? ((banner.clicks || 0) / banner.impressions * 100).toFixed(2) : 0}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getPositionColor(banner.position)} text-white`}>
                      {banner.position}
                    </Badge>
                    <Badge className={banner.isActive ? "bg-green-500" : "bg-gray-500"}>
                      {banner.isActive ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-sm text-gray-500">
                    Link: {banner.linkUrl || 'Não definido'} | Imagem: {banner.imageUrl.substring(0, 40)}...
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={banner.isActive}
                      onCheckedChange={() => handleToggleActive(banner.id)}
                    />
                    
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredBanners.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum banner encontrado com os filtros aplicados.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
