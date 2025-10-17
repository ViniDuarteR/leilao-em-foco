
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsappFloat = () => {
  const handleWhatsappClick = () => {
    // Substitua pelo seu número do WhatsApp
    const phoneNumber = "5511999999999";
    const message = "Olá! Gostaria de saber mais sobre os serviços do Leilão em Foco.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsappClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 p-0"
      size="icon"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </Button>
  );
};
