
import { useState } from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { AdminStats } from "@/components/AdminStats";
import { UserManagement } from "@/components/UserManagement";
import { AuctionManagement } from "@/components/AuctionManagement";
import { ContentManagementFull } from "@/components/ContentManagementFull";
import { BannerManagementFull } from "@/components/BannerManagementFull";
import { AdminConfigForm } from "@/components/AdminConfigForm";
import { AdminChat } from "@/components/AdminChat";
import { ReportsSection } from "@/components/ReportsSection";
import { AdminManagement } from "@/components/AdminManagement";
import { 
  Users, 
  Gavel, 
  FileText, 
  Image, 
  Settings, 
  MessageSquare, 
  BarChart3,
  Home,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [pendingUsers, setPendingUsers] = useState([]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "users", label: "Usuários", icon: Users },
    { id: "auctions", label: "Leilões", icon: Gavel },
    { id: "content", label: "Conteúdo", icon: FileText },
    { id: "banners", label: "Banners", icon: Image },
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "reports", label: "Relatórios", icon: BarChart3 },
    { id: "admins", label: "Administradores", icon: Shield },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminStats pendingUsersCount={pendingUsers.length} />;
      case "users":
        return <UserManagement pendingUsers={pendingUsers} setPendingUsers={setPendingUsers} />;
      case "auctions":
        return <AuctionManagement />;
      case "content":
        return <ContentManagementFull />;
      case "banners":
        return <BannerManagementFull />;
      case "chat":
        return <AdminChat />;
      case "reports":
        return <ReportsSection />;
      case "admins":
        return <AdminManagement />;
      case "settings":
        return <AdminConfigForm />;
      default:
        return <AdminStats pendingUsersCount={pendingUsers.length} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
