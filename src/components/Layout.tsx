import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { WhatsappFloat } from "./WhatsappFloat";

interface LayoutProps {
  children: ReactNode;
  showWhatsapp?: boolean;
}

export const Layout = ({ children, showWhatsapp = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {showWhatsapp && <WhatsappFloat />}
    </div>
  );
};