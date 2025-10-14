
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image, Trash2, Edit, Plus, Eye } from "lucide-react";

interface Banner {
  id: number;
  titulo: string;
  subtitulo: string;
  imagem: string;
  link: string;
  ativo: boolean;
  posicao: "Principal" | "Secundário" | "Lateral";
}

export const BannerManager = () => {
  const { toast } = useToast();
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 1,
      titulo: "Participe dos Melhores Leilões",
      subtitulo: "Encontre oportunidades únicas em nossa plataforma",
      imagem: "/placeholder.svg",
      link: "/leiloes",
      ativo: true,
      posicao: "Principal"
    },
    {
      id: 2,
      titulo: "Cadastre-se Gratuitamente",
      subtitulo: "Acesse todos os recursos da plataforma",
      imagem: "/placeholder.svg",
      link: "/cadastro",
      ativo: true,
      posicao: "Secundário"
    }
  ]);

  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    subtitulo: "",
    link: "",
    posicao: "Principal" as Banner["posicao"]
  });

  const handleSave = () => {
    if (editingBanner) {
      setBanners(prev => prev.map(banner => 
        banner.id === editingBanner.id 
          ? { ...banner, ...formData }
          : banner
      ));
      toast({
        title: "Banner atualizado!",
        description: "As alterações foram salvas com sucesso."
      });
    } else {
      const newBanner: Banner = {
        id: Date.now(),
        ...formData,
        imagem: "/placeholder.svg",
        ativo: true
      };
      setBanners(prev => [...prev, newBanner]);
      toast({
        title: "Banner criado!",
        description: "O novo banner foi adicionado com sucesso."
      });
    }
    
    setEditingBanner(null);
    setShowForm(false);
    setFormData({ titulo: "", subtitulo: "", link: "", posicao: "Principal" });
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      titulo: banner.titulo,
      subtitulo: banner.subtitulo,
      link: banner.link,
      posicao: banner.posicao
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setBanners(prev => prev.filter(banner => banner.id !== id));
    toast({
      title: "Banner excluído!",
      description: "O banner foi removido do sistema."
    });
  };

  const toggleActive = (id: number) => {
    setBanners(prev => prev.map(banner => 
      banner.id === id ? { ...banner, ativo: !banner.ativo } : banner
    ));
  };

  const handleImageUpload = () => {
    toast({
      title: "Upload realizado!",
      description: "Nova imagem foi carregada com sucesso."
    });
  };

  if (showForm) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{editingBanner ? "Editar Banner" : "Criar Novo Banner"}</CardTitle>
            <CardDescription>Configure as informações do banner</CardDescription>
          </div>
          <Button variant="ghost" onClick={() => setShowForm(false)}>
            ✕
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              placeholder="Digite o título do banner"
            />
          </div>

          <div>
            <Label htmlFor="subtitulo">Subtítulo</Label>
            <Textarea
              id="subtitulo"
              value={formData.subtitulo}
              onChange={(e) => setFormData({...formData, subtitulo: e.target.value})}
              placeholder="Digite o subtítulo do banner"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="link">Link de Destino</Label>
            <Input
              id="link"
              value={formData.link}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              placeholder="/leiloes ou https://exemplo.com"
            />
          </div>

          <div>
            <Label htmlFor="posicao">Posição</Label>
            <select
              id="posicao"
              value={formData.posicao}
              onChange={(e) => setFormData({...formData, posicao: e.target.value as Banner["posicao"]})}
              className="w-full p-2 border rounded-md"
            >
              <option value="Principal">Principal (Hero)</option>
              <option value="Secundário">Secundário</option>
              <option value="Lateral">Lateral</option>
            </select>
          </div>

          <div>
            <Label>Imagem do Banner</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-4">Clique para enviar uma nova imagem</p>
              <Button onClick={handleImageUpload} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Fazer Upload
              </Button>
              <p className="text-xs text-gray-500 mt-2">Recomendado: 1920x600px</p>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-primary-blue hover:bg-primary-blue/90 text-white">
              {editingBanner ? "Atualizar" : "Criar"} Banner
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
          <CardTitle>Gerenciar Banners</CardTitle>
          <CardDescription>
            Controle os banners exibidos no site
          </CardDescription>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-primary-blue hover:bg-primary-blue/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Banner
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {banners.map((banner) => (
            <div key={banner.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{banner.titulo}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      banner.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {banner.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {banner.posicao}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{banner.subtitulo}</p>
                  <p className="text-xs text-gray-500">Link: {banner.link}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(banner)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant={banner.ativo ? "destructive" : "default"}
                    onClick={() => toggleActive(banner.id)}
                  >
                    {banner.ativo ? "Desativar" : "Ativar"}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(banner.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="aspect-[3/1] bg-gray-100 rounded-lg flex items-center justify-center">
                <img 
                  src={banner.imagem} 
                  alt={banner.titulo}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
