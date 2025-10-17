
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageSquare, User } from "lucide-react";

export const AdminChat = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [message, setMessage] = useState("");

  const conversations = [
    {
      id: 1,
      user: "João Silva",
      lastMessage: "Preciso de ajuda com meu leilão",
      time: "14:30",
      unread: 2,
      online: true
    },
    {
      id: 2,
      user: "Maria Santos",
      lastMessage: "Como faço para dar um lance?",
      time: "13:45",
      unread: 0,
      online: false
    },
    {
      id: 3,
      user: "Carlos Leiloeiro",
      lastMessage: "Obrigado pelo suporte!",
      time: "12:20",
      unread: 1,
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "user",
      message: "Olá, preciso de ajuda com meu leilão",
      time: "14:25"
    },
    {
      id: 2,
      sender: "admin",
      message: "Olá! Como posso ajudá-lo?",
      time: "14:26"
    },
    {
      id: 3,
      sender: "user",
      message: "Não estou conseguindo adicionar fotos aos lotes",
      time: "14:30"
    }
  ];

  const sendMessage = () => {
    if (message.trim()) {
      console.log("Enviando mensagem:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex h-[600px] border rounded-lg">
      {/* Lista de Conversas */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h3 className="font-semibold flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Conversas
          </h3>
        </div>
        <ScrollArea className="h-[calc(600px-60px)]">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                selectedUser?.id === conv.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedUser(conv)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>
                      {conv.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">{conv.user}</span>
                  {conv.online && <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>}
                </div>
                {conv.unread > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {conv.unread}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
              <p className="text-xs text-gray-400 mt-1">{conv.time}</p>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Header do Chat */}
            <div className="p-4 border-b flex items-center">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarFallback>
                  {selectedUser.user.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{selectedUser.user}</h4>
                <p className="text-xs text-gray-500">
                  {selectedUser.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>

            {/* Mensagens */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        msg.sender === 'admin'
                          ? 'bg-primary-blue text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input de Mensagem */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Selecione uma conversa para começar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
