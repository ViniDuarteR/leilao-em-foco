
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Quem Somos", href: "/quem-somos" },
    { label: "Editais", href: "/editais" },
    { label: "Leilões", href: "/leiloes" },
    { label: "Notícias", href: "/noticias" },
    { label: "Contato", href: "/contato" },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/uploads/92d203d9-9d17-42d8-bb69-871f1b189ba2.png" 
              alt="Leilão em Foco" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-primary-blue">Leilão em Foco</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-neutral-gray hover:text-primary-blue transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white">
                    <User className="h-4 w-4 mr-2" />
                    Minha Conta
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/perfil">Editar Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white">
                  <Link to="/cadastro">Cadastre-se</Link>
                </Button>
                <Button size="sm" asChild className="bg-primary-blue hover:bg-primary-blue/90 text-white">
                  <Link to="/login">Login</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-neutral-gray hover:text-primary-blue transition-colors p-2 font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t pt-4 space-y-2">
                  {isLoggedIn ? (
                    <>
                      <Button variant="outline" className="w-full border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white" asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </Button>
                      <Button variant="outline" className="w-full border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white" onClick={handleLogout}>
                        Sair
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white" asChild>
                        <Link to="/cadastro">Cadastre-se</Link>
                      </Button>
                      <Button className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white" asChild>
                        <Link to="/login">Login</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
