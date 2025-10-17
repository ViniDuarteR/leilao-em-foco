
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

// Ícone do TikTok (usando SVG customizado)
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z"/>
  </svg>
);

export const Footer = () => {
  // Mock data - em uma implementação real, isso viria das configurações do admin
  const socialMediaConfig = {
    facebook: { enabled: true, url: "https://facebook.com/leilaoemfoco" },
    instagram: { enabled: true, url: "https://instagram.com/leilaoemfoco" },
    linkedin: { enabled: true, url: "https://linkedin.com/company/leilaoemfoco" },
    tiktok: { enabled: true, url: "https://tiktok.com/@leilaoemfoco" },
    twitter: { enabled: false, url: "" }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/uploads/92d203d9-9d17-42d8-bb69-871f1b189ba2.png" 
                alt="Leilão em Foco" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-cyan-400">Leilão em Foco</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Apoio estratégico para comprar e vender em leilões. Conectamos leiloeiros e arrematantes com tecnologia e expertise.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Links Rápidos</h3>
            <ul className="space-y-2">
              {[
                { label: "Quem Somos", href: "/quem-somos" },
                { label: "Editais", href: "/editais" },
                { label: "Leilões", href: "/leiloes" },
                { label: "Notícias", href: "/noticias" },
                { label: "Cadastro", href: "/cadastro" }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Serviços</h3>
            <ul className="space-y-2">
              {[
                "Assessoria para Arrematação",
                "Despachante",
                "Curso de Arrematação",
                "Marketing para Leilões",
                "Credenciamento"
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-300 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-300 text-sm">contato@leilaoemfoco.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-300 text-sm">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-300 text-sm">São Paulo - SP</span>
              </div>
            </div>

            {/* Redes Sociais - Configuráveis pelo Admin */}
            <div className="flex space-x-3 pt-2">
              {socialMediaConfig.facebook.enabled && (
                <a 
                  href={socialMediaConfig.facebook.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {socialMediaConfig.instagram.enabled && (
                <a 
                  href={socialMediaConfig.instagram.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialMediaConfig.linkedin.enabled && (
                <a 
                  href={socialMediaConfig.linkedin.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {socialMediaConfig.tiktok.enabled && (
                <a 
                  href={socialMediaConfig.tiktok.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors"
                >
                  <TikTokIcon />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Leilão em Foco. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
