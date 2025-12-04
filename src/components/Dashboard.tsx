import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { OnboardingModal } from './OnboardingModal';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

export function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const stats = [
    {
      label: 'Processos Ativos',
      value: '142',
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      label: 'Aguardando Análise',
      value: '28',
      icon: Clock,
      color: 'bg-yellow-500',
      change: '+5%'
    },
    {
      label: 'Concluídos (Mês)',
      value: '89',
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+23%'
    },
    {
      label: 'Pendentes',
      value: '15',
      icon: AlertCircle,
      color: 'bg-red-500',
      change: '-8%'
    },
  ];

  const chartData = [
    { mes: 'Jan', processos: 65 },
    { mes: 'Fev', processos: 78 },
    { mes: 'Mar', processos: 90 },
    { mes: 'Abr', processos: 81 },
    { mes: 'Mai', processos: 95 },
    { mes: 'Jun', processos: 89 },
  ];

  const statusData = [
    { name: 'Novo', value: 28, color: '#3B82F6' },
    { name: 'Em Análise', value: 45, color: '#F59E0B' },
    { name: 'Pendente', value: 15, color: '#EF4444' },
    { name: 'Concluído', value: 54, color: '#10B981' },
  ];

  const recentProcesses = [
    { id: '2024/001234', assunto: 'Licitação - Material de Escritório', status: 'Em Análise', data: '02/12/2024' },
    { id: '2024/001235', assunto: 'Solicitação de Licença Ambiental', status: 'Novo', data: '02/12/2024' },
    { id: '2024/001236', assunto: 'Processo de Pagamento - Fornecedor XYZ', status: 'Pendente', data: '01/12/2024' },
    { id: '2024/001237', assunto: 'Renovação de Contrato - Serviços de Limpeza', status: 'Concluído', data: '01/12/2024' },
    { id: '2024/001238', assunto: 'Solicitação de Certidão Negativa', status: 'Em Análise', data: '30/11/2024' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Em Análise': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Pendente': return 'bg-red-100 text-red-700 border-red-200';
      case 'Concluído': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <OnboardingModal onNavigate={onNavigate} />
      <Sidebar currentPage="dashboard" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard" />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-3xl mt-2">{stat.value}</p>
                        <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="size-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Processos Criados por Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="processos" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processos por Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Processes */}
          <Card>
            <CardHeader>
              <CardTitle>Processos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProcesses.map((process) => (
                  <div
                    key={process.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onNavigate('detalhe')}
                  >
                    <div className="flex-1">
                      <div className="text-sm text-blue-600">{process.id}</div>
                      <div className="text-gray-900 mt-1">{process.assunto}</div>
                      <div className="text-sm text-gray-500 mt-1">{process.data}</div>
                    </div>
                    <Badge className={`${getStatusColor(process.status)} border`}>
                      {process.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tempo médio de tramitação:</strong> 5,2 dias | <strong>Taxa de resolução:</strong> 94%
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}