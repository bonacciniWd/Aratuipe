import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileSearch, 
  Plus, 
  Search,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Calendar,
  TrendingUp,
  BarChart3,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';

interface ModuloESICProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface PedidoLAI {
  id: string;
  protocolo: string;
  solicitante: {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
  };
  assunto: string;
  descricao: string;
  status: 'Recebido' | 'Em Análise' | 'Deferido' | 'Indeferido' | 'Recurso';
  prioridade: 'Normal' | 'Urgente';
  tipo: 'Acesso à Informação' | 'Dados Pessoais' | 'Documentos' | 'Relatórios' | 'Outros';
  dataAbertura: string;
  prazoLimite: string;
  departamentoResponsavel: string;
  resposta?: string;
  motivoIndeferimento?: string;
  anexos?: string[];
}

export function ModuloESIC({ onNavigate, onLogout }: ModuloESICProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<PedidoLAI | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('list');

  // Mock data - Pedidos LAI
  const pedidos: PedidoLAI[] = [
    {
      id: 'LAI-2024-001',
      protocolo: '20241201001',
      solicitante: {
        nome: 'João Santos',
        cpf: '123.456.789-00',
        email: 'joao.santos@email.com',
        telefone: '(11) 98765-4321'
      },
      assunto: 'Relatório de execução orçamentária 2023',
      descricao: 'Solicito acesso ao relatório detalhado de execução orçamentária do município referente ao exercício de 2023, discriminado por secretaria e programa.',
      status: 'Em Análise',
      prioridade: 'Normal',
      tipo: 'Relatórios',
      dataAbertura: '2024-12-01',
      prazoLimite: '2024-12-21',
      departamentoResponsavel: 'Secretaria de Finanças'
    },
    {
      id: 'LAI-2024-002',
      protocolo: '20241129008',
      solicitante: {
        nome: 'Maria Silva',
        cpf: '987.654.321-00',
        email: 'maria.silva@email.com',
        telefone: '(11) 91234-5678'
      },
      assunto: 'Contratos de prestação de serviços de limpeza',
      descricao: 'Solicito cópia dos contratos vigentes de prestação de serviços de limpeza urbana, incluindo valores e empresas contratadas.',
      status: 'Deferido',
      prioridade: 'Normal',
      tipo: 'Documentos',
      dataAbertura: '2024-11-29',
      prazoLimite: '2024-12-19',
      departamentoResponsavel: 'Secretaria de Obras',
      resposta: 'Segue em anexo os contratos solicitados. Os documentos estão disponíveis também no Portal da Transparência.',
      anexos: ['Contrato_Limpeza_001.pdf', 'Contrato_Limpeza_002.pdf']
    },
    {
      id: 'LAI-2024-003',
      protocolo: '20241128015',
      solicitante: {
        nome: 'Carlos Oliveira',
        cpf: '456.789.123-00',
        email: 'carlos.oliveira@email.com',
        telefone: '(11) 97777-8888'
      },
      assunto: 'Folha de pagamento de servidores',
      descricao: 'Solicito informações sobre a folha de pagamento total dos servidores públicos municipais, incluindo cargos comissionados.',
      status: 'Indeferido',
      prioridade: 'Normal',
      tipo: 'Dados Pessoais',
      dataAbertura: '2024-11-28',
      prazoLimite: '2024-12-18',
      departamentoResponsavel: 'Recursos Humanos',
      motivoIndeferimento: 'A solicitação envolve dados pessoais protegidos pela LGPD (Lei 13.709/2018). Disponibilizamos informações agregadas no Portal da Transparência.'
    },
    {
      id: 'LAI-2024-004',
      protocolo: '20241130023',
      solicitante: {
        nome: 'Ana Costa',
        cpf: '321.654.987-00',
        email: 'ana.costa@email.com',
        telefone: '(11) 99999-0000'
      },
      assunto: 'Dados sobre atendimentos na saúde',
      descricao: 'Solicito dados estatísticos sobre atendimentos realizados nas UBS do município nos últimos 12 meses.',
      status: 'Deferido',
      prioridade: 'Normal',
      tipo: 'Acesso à Informação',
      dataAbertura: '2024-11-30',
      prazoLimite: '2024-12-20',
      departamentoResponsavel: 'Secretaria de Saúde',
      resposta: 'Segue em anexo planilha com dados estatísticos de atendimentos nas UBS municipais.',
      anexos: ['Relatorio_Atendimentos_UBS_2024.xlsx']
    },
    {
      id: 'LAI-2024-005',
      protocolo: '20241202005',
      solicitante: {
        nome: 'Pedro Alves',
        cpf: '789.123.456-00',
        email: 'pedro.alves@email.com',
        telefone: '(11) 96666-7777'
      },
      assunto: 'Atas de reuniões do Conselho Municipal de Educação',
      descricao: 'Solicito acesso às atas das reuniões do Conselho Municipal de Educação realizadas em 2024.',
      status: 'Recebido',
      prioridade: 'Normal',
      tipo: 'Documentos',
      dataAbertura: '2024-12-02',
      prazoLimite: '2024-12-22',
      departamentoResponsavel: 'Secretaria de Educação'
    },
    {
      id: 'LAI-2024-006',
      protocolo: '20241125012',
      solicitante: {
        nome: 'Luiza Fernandes',
        cpf: '159.753.486-00',
        email: 'luiza.fernandes@email.com',
        telefone: '(11) 95555-4444'
      },
      assunto: 'Processos licitatórios em andamento',
      descricao: 'Solicito lista completa dos processos licitatórios em andamento, com valores e objetos.',
      status: 'Recurso',
      prioridade: 'Urgente',
      tipo: 'Acesso à Informação',
      dataAbertura: '2024-11-25',
      prazoLimite: '2024-12-15',
      departamentoResponsavel: 'Comissão de Licitações'
    }
  ];

  const [newPedido, setNewPedido] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    assunto: '',
    descricao: '',
    tipo: ''
  });

  const filteredPedidos = pedidos.filter(p => {
    const matchSearch = p.protocolo.includes(searchTerm) ||
                       p.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.solicitante.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Estatísticas
  const stats = {
    total: pedidos.length,
    recebidos: pedidos.filter(p => p.status === 'Recebido').length,
    emAnalise: pedidos.filter(p => p.status === 'Em Análise').length,
    deferidos: pedidos.filter(p => p.status === 'Deferido').length,
    indeferidos: pedidos.filter(p => p.status === 'Indeferido').length,
    recursos: pedidos.filter(p => p.status === 'Recurso').length,
    taxaAtendimento: Math.round((pedidos.filter(p => p.status === 'Deferido').length / pedidos.length) * 100)
  };

  const handleCreatePedido = () => {
    if (!newPedido.nome || !newPedido.email || !newPedido.assunto || !newPedido.descricao) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    toast.success('Pedido registrado com sucesso! Protocolo: 20241204XXX');
    setIsCreating(false);
    setNewPedido({
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      assunto: '',
      descricao: '',
      tipo: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recebido': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Em Análise': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Deferido': return 'bg-green-100 text-green-800 border-green-200';
      case 'Indeferido': return 'bg-red-100 text-red-800 border-red-200';
      case 'Recurso': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="esic" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <FileSearch className="size-6 md:size-8" />
                  e-SIC / LAI
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Sistema de Informação ao Cidadão - Lei de Acesso à Informação
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Globe className="size-4" />
                  Portal Transparência
                </Button>
                <Dialog open={isCreating} onOpenChange={setIsCreating}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="size-4" />
                      Novo Pedido
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Novo Pedido de Acesso à Informação</DialogTitle>
                      <DialogDescription>
                        Preencha os dados para solicitar acesso a informações públicas
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nome">Nome Completo *</Label>
                          <Input
                            id="nome"
                            placeholder="Seu nome"
                            value={newPedido.nome}
                            onChange={(e) => setNewPedido({...newPedido, nome: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cpf">CPF</Label>
                          <Input
                            id="cpf"
                            placeholder="000.000.000-00"
                            value={newPedido.cpf}
                            onChange={(e) => setNewPedido({...newPedido, cpf: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">E-mail *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={newPedido.email}
                            onChange={(e) => setNewPedido({...newPedido, email: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="telefone">Telefone</Label>
                          <Input
                            id="telefone"
                            placeholder="(00) 00000-0000"
                            value={newPedido.telefone}
                            onChange={(e) => setNewPedido({...newPedido, telefone: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="tipo">Tipo de Solicitação *</Label>
                        <Select 
                          value={newPedido.tipo}
                          onValueChange={(value) => setNewPedido({...newPedido, tipo: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Acesso à Informação">Acesso à Informação</SelectItem>
                            <SelectItem value="Documentos">Documentos</SelectItem>
                            <SelectItem value="Relatórios">Relatórios</SelectItem>
                            <SelectItem value="Dados Pessoais">Dados Pessoais</SelectItem>
                            <SelectItem value="Outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="assunto">Assunto *</Label>
                        <Input
                          id="assunto"
                          placeholder="Título resumido da solicitação"
                          value={newPedido.assunto}
                          onChange={(e) => setNewPedido({...newPedido, assunto: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="descricao">Descrição do Pedido *</Label>
                        <Textarea
                          id="descricao"
                          placeholder="Descreva detalhadamente as informações que você está solicitando..."
                          rows={6}
                          value={newPedido.descricao}
                          onChange={(e) => setNewPedido({...newPedido, descricao: e.target.value})}
                        />
                      </div>
                      
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Lei de Acesso à Informação (Lei 12.527/2011)</strong><br/>
                          O prazo de resposta é de 20 dias, prorrogáveis por mais 10 dias mediante justificativa.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsCreating(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreatePedido}>
                        Enviar Pedido
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Recebidos</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.recebidos}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Em Análise</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.emAnalise}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Deferidos</p>
                    <p className="text-2xl font-bold text-green-600">{stats.deferidos}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Indeferidos</p>
                    <p className="text-2xl font-bold text-red-600">{stats.indeferidos}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Recursos</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.recursos}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 lg:w-auto">
                <TabsTrigger value="list">Pedidos</TabsTrigger>
                <TabsTrigger value="stats">Estatísticas</TabsTrigger>
              </TabsList>

              {/* List View */}
              <TabsContent value="list" className="space-y-4 mt-6">
                {/* Filters */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                          <Input
                            placeholder="Buscar por protocolo, assunto ou nome..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full md:w-48">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="Recebido">Recebido</SelectItem>
                          <SelectItem value="Em Análise">Em Análise</SelectItem>
                          <SelectItem value="Deferido">Deferido</SelectItem>
                          <SelectItem value="Indeferido">Indeferido</SelectItem>
                          <SelectItem value="Recurso">Recurso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Pedidos List */}
                <div className="space-y-3">
                  {filteredPedidos.map((pedido) => (
                    <Card 
                      key={pedido.id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedPedido(pedido)}
                    >
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{pedido.id}</h3>
                                <Badge variant="outline">{pedido.tipo}</Badge>
                              </div>
                              <p className="text-sm text-gray-600">Protocolo: {pedido.protocolo}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge className={getStatusColor(pedido.status)}>
                                {pedido.status}
                              </Badge>
                              {pedido.prioridade === 'Urgente' && (
                                <Badge variant="destructive">Urgente</Badge>
                              )}
                            </div>
                          </div>
                          
                          <p className="font-medium text-gray-900">{pedido.assunto}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{pedido.descricao}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <User className="size-4" />
                              <span>{pedido.solicitante.nome}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="size-4" />
                              <span>{new Date(pedido.dataAbertura).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="size-4" />
                              <span>Prazo: {new Date(pedido.prazoLimite).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Stats View */}
              <TabsContent value="stats" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Indicadores de Desempenho</CardTitle>
                      <CardDescription>Métricas de atendimento LAI</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Taxa de Atendimento</span>
                          <span className="text-2xl font-bold text-green-600">{stats.taxaAtendimento}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <TrendingUp className="size-3" />
                          <span>+5% em relação ao mês anterior</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Tempo Médio de Resposta</span>
                          <span className="text-sm text-gray-600">12 dias</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }} />
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Meta: 20 dias (LAI)</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Taxa de Recurso</span>
                          <span className="text-sm text-gray-600">16%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '16%' }} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* By Type */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição por Tipo</CardTitle>
                      <CardDescription>Categorias de solicitações</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Acesso à Informação</span>
                          <span className="text-sm font-medium">33%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '33%' }} />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Documentos</span>
                          <span className="text-sm font-medium">33%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '33%' }} />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Relatórios</span>
                          <span className="text-sm font-medium">17%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '17%' }} />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Dados Pessoais</span>
                          <span className="text-sm font-medium">17%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '17%' }} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Detail Modal */}
            {selectedPedido && (
              <Dialog open={!!selectedPedido} onOpenChange={() => setSelectedPedido(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {selectedPedido.id}
                      <Badge className={getStatusColor(selectedPedido.status)}>
                        {selectedPedido.status}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>
                      Protocolo: {selectedPedido.protocolo}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div>
                      <Badge variant="outline">{selectedPedido.tipo}</Badge>
                      <h3 className="text-lg font-semibold mt-2">{selectedPedido.assunto}</h3>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-600">Descrição</Label>
                      <p className="text-sm text-gray-700 mt-1">{selectedPedido.descricao}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-600">Solicitante</Label>
                        <div className="space-y-1 mt-1">
                          <p className="text-sm font-medium">{selectedPedido.solicitante.nome}</p>
                          <p className="text-sm text-gray-600">{selectedPedido.solicitante.cpf}</p>
                          <p className="text-sm text-gray-600">{selectedPedido.solicitante.email}</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-gray-600">Prazos</Label>
                        <div className="space-y-1 mt-1">
                          <p className="text-sm">
                            <span className="text-gray-600">Abertura:</span>{' '}
                            <span className="font-medium">{new Date(selectedPedido.dataAbertura).toLocaleDateString('pt-BR')}</span>
                          </p>
                          <p className="text-sm">
                            <span className="text-gray-600">Limite:</span>{' '}
                            <span className="font-medium">{new Date(selectedPedido.prazoLimite).toLocaleDateString('pt-BR')}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {selectedPedido.resposta && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <Label className="text-xs text-green-800">Resposta</Label>
                        <p className="text-sm text-gray-700 mt-2">{selectedPedido.resposta}</p>
                        
                        {selectedPedido.anexos && selectedPedido.anexos.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <Label className="text-xs text-green-800">Anexos</Label>
                            {selectedPedido.anexos.map((anexo, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border">
                                <span className="text-sm">{anexo}</span>
                                <Button variant="ghost" size="sm">
                                  <Download className="size-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {selectedPedido.motivoIndeferimento && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <Label className="text-xs text-red-800">Motivo do Indeferimento</Label>
                        <p className="text-sm text-gray-700 mt-2">{selectedPedido.motivoIndeferimento}</p>
                      </div>
                    )}
                    
                    {!selectedPedido.resposta && !selectedPedido.motivoIndeferimento && (
                      <div>
                        <Label htmlFor="resposta">Responder Pedido</Label>
                        <Textarea 
                          id="resposta"
                          placeholder="Digite a resposta ao pedido de acesso à informação..."
                          rows={4}
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 justify-end pt-4 border-t">
                    {selectedPedido.status === 'Indeferido' && (
                      <Button variant="outline">
                        <AlertCircle className="size-4 mr-2" />
                        Registrar Recurso
                      </Button>
                    )}
                    {!selectedPedido.resposta && (
                      <>
                        <Button variant="outline">
                          Indeferir
                        </Button>
                        <Button>
                          <CheckCircle2 className="size-4 mr-2" />
                          Deferir Pedido
                        </Button>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
