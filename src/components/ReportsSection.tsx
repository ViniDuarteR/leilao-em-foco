
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

// Dados dinâmicos simulados baseados nas estatísticas do sistema
const monthlyData = [
  { month: "Jan", usuarios: 45, leiloes: 8, receita: 12500 },
  { month: "Fev", usuarios: 52, leiloes: 12, receita: 18200 },
  { month: "Mar", usuarios: 48, leiloes: 15, receita: 22800 },
  { month: "Abr", usuarios: 61, leiloes: 18, receita: 31400 },
  { month: "Mai", usuarios: 55, leiloes: 14, receita: 28900 },
  { month: "Jun", usuarios: 67, leiloes: 20, receita: 35600 },
];

const categoryData = [
  { name: "Veículos", value: 35, color: "#3b82f6" },
  { name: "Imóveis", value: 25, color: "#ef4444" },
  { name: "Máquinas", value: 20, color: "#10b981" },
  { name: "Outros", value: 20, color: "#f59e0b" },
];

const recentActivity = [
  { day: "Seg", acessos: 1240, cadastros: 12 },
  { day: "Ter", acessos: 1180, cadastros: 8 },
  { day: "Qua", acessos: 1350, cadastros: 15 },
  { day: "Qui", acessos: 1290, cadastros: 11 },
  { day: "Sex", acessos: 1420, cadastros: 18 },
  { day: "Sáb", acessos: 980, cadastros: 6 },
  { day: "Dom", acessos: 850, cadastros: 4 },
];

const chartConfig = {
  usuarios: {
    label: "Usuários",
    color: "#3b82f6",
  },
  leiloes: {
    label: "Leilões",
    color: "#ef4444",
  },
  receita: {
    label: "Receita",
    color: "#10b981",
  },
  acessos: {
    label: "Acessos",
    color: "#8b5cf6",
  },
  cadastros: {
    label: "Cadastros",
    color: "#f59e0b",
  },
};

export const ReportsSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary-blue mb-2">Relatórios e Análises</h2>
        <p className="text-neutral-gray">Visualize o desempenho da plataforma em tempo real</p>
      </div>

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crescimento Mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Crescimento Mensal</CardTitle>
            <CardDescription>Evolução de usuários, leilões e receita</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="usuarios" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="leiloes" 
                  stackId="1"
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Leilões por Categoria</CardTitle>
            <CardDescription>Distribuição dos tipos de leilão</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos secundários */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receita Mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Receita Mensal (R$)</CardTitle>
            <CardDescription>Faturamento por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="receita" fill="#10b981" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Atividade Semanal */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Semanal</CardTitle>
            <CardDescription>Acessos e cadastros dos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <LineChart data={recentActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="acessos" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="cadastros" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resumo Estatístico */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Período</CardTitle>
          <CardDescription>Principais métricas dos últimos 30 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">15.2%</div>
              <div className="text-sm text-gray-600">Crescimento de Usuários</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">28.7%</div>
              <div className="text-sm text-gray-600">Aumento de Leilões</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">R$ 185K</div>
              <div className="text-sm text-gray-600">Receita Total</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">92.3%</div>
              <div className="text-sm text-gray-600">Taxa de Satisfação</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
