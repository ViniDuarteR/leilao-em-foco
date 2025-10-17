
import { Button } from "@/components/ui/button";
import { Settings, BarChart3 } from "lucide-react";

export const AdminHeader = () => {
  return (
    <div className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary-blue">Painel Administrativo</h1>
            <p className="text-neutral-gray">Leilão em Foco - Controle Total</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Relatórios
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
