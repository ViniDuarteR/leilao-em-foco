
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentEditor } from "@/components/ContentEditor";
import { BannerManager } from "@/components/BannerManager";
import { Globe, FileText, Image } from "lucide-react";

export const ContentManagement = () => {
  return (
    <Tabs defaultValue="content" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Conteúdo e Páginas</TabsTrigger>
        <TabsTrigger value="banners">Banners</TabsTrigger>
      </TabsList>

      <TabsContent value="content">
        <ContentEditor />
      </TabsContent>

      <TabsContent value="banners">
        <BannerManager />
      </TabsContent>
    </Tabs>
  );
};
