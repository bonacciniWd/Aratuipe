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
import { Progress } from './ui/progress';
import { 
  MessageSquare, 
  Plus, 
  Search,
  MapPin,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  Mail,
  Phone,
  User,
  Calendar,
  Filter,
  BarChart3,
  Map
} from 'lucide-react';
import { toast } from 'sonner';

interface ModuloOuvidoriaProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Manifestacao {
  id: string;
  protocolo: string;
  tipo: 'Reclamação' | 'Denúncia' | 'Sugestão' | 'Elogio' | 'Solicitação';
  assunto: string;
  descricao: string;
  status: 'Aberto' | 'Em Análise' | 'Respondido' | 'Fechado';
  prioridade: 'Alta' | 'Média' | 'Baixa';
  cidadao: {
    nome: string;
    email: string;
    telefone: string;
  };
  localizacao: {
    endereco: string;
    bairro: string;
    lat: number;
    lng: number;
  };
  departamento: string;
  dataAbertura: string;
  prazoResposta: string;
  resposta?: string;
}

export function ModuloOuvidoria({ onNavigate, onLogout }: ModuloOuvidoriaProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedManifestacao, setSelectedManifestacao] = useState<Manifestacao | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTipo, setFilterTipo] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('list');

  // Mock data - Manifestações
  const manifestacoes: Manifestacao[] = [
    {
      id: 'OUV-2024-001',
      protocolo: '20241201001',
      tipo: 'Reclamação',
      assunto: 'Buraco na Rua Principal',
      descricao: 'Há um grande buraco na Rua Principal, próximo ao número 450, que está causando acidentes e danos aos veículos.',
      status: 'Em Análise',
      prioridade: 'Alta',
      cidadao: {
        nome: 'João Santos',
        email: 'joao.santos@email.com',
        telefone: '(11) 98765-4321'
      },
      localizacao: {
        endereco: 'Rua Principal, 450',
        bairro: 'Centro',
        lat: -23.5505,
        lng: -46.6333
      },
      departamento: 'Obras e Infraestrutura',
      dataAbertura: '2024-12-01',
      prazoResposta: '2024-12-11'
    },
    {
      id: 'OUV-2024-002',
      protocolo: '20241130015',
      tipo: 'Sugestão',
      assunto: 'Instalação de semáforo na Avenida das Flores',
      descricao: 'Sugiro a instalação de um semáforo no cruzamento da Av. das Flores com a Rua do Comércio para melhorar a segurança.',
      status: 'Aberto',
      prioridade: 'Média',
      cidadao: {
        nome: 'Maria Silva',
        email: 'maria.silva@email.com',
        telefone: '(11) 91234-5678'
      },
      localizacao: {
        endereco: 'Av. das Flores x Rua do Comércio',
        bairro: 'Jardim América',
        lat: -23.5589,
        lng: -46.6390
      },
      departamento: 'Trânsito e Mobilidade',
      dataAbertura: '2024-11-30',
      prazoResposta: '2024-12-20'
    },
    {
      id: 'OUV-2024-003',
      protocolo: '20241129023',
      tipo: 'Denúncia',
      assunto: 'Descarte irregular de lixo',
      descricao: 'Empresa está descartando lixo irregular na Rua das Palmeiras, causando mau cheiro e atraindo pragas.',
      status: 'Respondido',
      prioridade: 'Alta',
      cidadao: {
        nome: 'Carlos Oliveira',
        email: 'carlos.oliveira@email.com',
        telefone: '(11) 97777-8888'
      },
      localizacao: {
        endereco: 'Rua das Palmeiras, 123',
        bairro: 'Vila Nova',
        lat: -23.5445,
        lng: -46.6289
      },
      departamento: 'Meio Ambiente',
      dataAbertura: '2024-11-29',
      prazoResposta: '2024-12-09',
      resposta: 'Fiscal ambiental realizou vistoria e autuou a empresa. Limpeza foi realizada e multa aplicada.'
    },
    {
      id: 'OUV-2024-004',
      protocolo: '20241128008',
      tipo: 'Elogio',
      assunto: 'Atendimento na UBS Central',
      descricao: 'Gostaria de elogiar o excelente atendimento recebido na UBS Central. Todos os profissionais foram muito atenciosos.',
      status: 'Fechado',
      prioridade: 'Baixa',
      cidadao: {
        nome: 'Ana Costa',
        email: 'ana.costa@email.com',
        telefone: '(11) 99999-0000'
      },
      localizacao: {
        endereco: 'Av. Central, 1000',
        bairro: 'Centro',
        lat: -23.5525,
        lng: -46.6345
      },
      departamento: 'Saúde',
      dataAbertura: '2024-11-28',
      prazoResposta: '2024-12-08',
      resposta: 'Agradecemos seu feedback! Repassamos o elogio à equipe da UBS Central.'
    },
    {
      id: 'OUV-2024-005',
      protocolo: '20241202005',
      tipo: 'Solicitação',
      assunto: 'Poda de árvore',
      descricao: 'Solicito poda de árvore que está com galhos atingindo a rede elétrica na Rua dos Ipês.',
      status: 'Em Análise',
      prioridade: 'Média',
      cidadao: {
        nome: 'Pedro Alves',
        email: 'pedro.alves@email.com',
        telefone: '(11) 96666-7777'
      },
      localizacao: {
        endereco: 'Rua dos Ipês, 89',
        bairro: 'Parque Verde',
        lat: -23.5600,
        lng: -46.6400
      },
      departamento: 'Meio Ambiente',
      dataAbertura: '2024-12-02',
      prazoResposta: '2024-12-12'
    }
  ];

  const filteredManifestacoes = manifestacoes.filter(m => {
    const matchSearch = m.protocolo.includes(searchTerm) ||
                       m.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       m.cidadao.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || m.status === filterStatus;
    const matchTipo = filterTipo === 'all' || m.tipo === filterTipo;
    return matchSearch && matchStatus && matchTipo;
  });

  // Estatísticas
  const stats = {
    total: manifestacoes.length,
    abertas: manifestacoes.filter(m => m.status === 'Aberto').length,
    emAnalise: manifestacoes.filter(m => m.status === 'Em Análise').length,
    resolvidas: manifestacoes.filter(m => m.status === 'Respondido' || m.status === 'Fechado').length,
  };

  const tipoStats = [
    { tipo: 'Reclamação', count: manifestacoes.filter(m => m.tipo === 'Reclamação').length, color: 'bg-red-500' },
    { tipo: 'Denúncia', count: manifestacoes.filter(m => m.tipo === 'Denúncia').length, color: 'bg-orange-500' },
    { tipo: 'Sugestão', count: manifestacoes.filter(m => m.tipo === 'Sugestão').length, color: 'bg-blue-500' },
    { tipo: 'Elogio', count: manifestacoes.filter(m => m.tipo === 'Elogio').length, color: 'bg-green-500' },
    { tipo: 'Solicitação', count: manifestacoes.filter(m => m.tipo === 'Solicitação').length, color: 'bg-purple-500' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberto': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Em Análise': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Respondido': return 'bg-green-100 text-green-800 border-green-200';
      case 'Fechado': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Reclamação': return 'bg-red-100 text-red-800';
      case 'Denúncia': return 'bg-orange-100 text-orange-800';
      case 'Sugestão': return 'bg-blue-100 text-blue-800';
      case 'Elogio': return 'bg-green-100 text-green-800';
      case 'Solicitação': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="ouvidoria" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="size-6 md:size-8" />
                  Ouvidoria
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Gestão de manifestações e atendimento ao cidadão
                </p>
              </div>
              
              <Button className="gap-2">
                <Plus className="size-4" />
                Nova Manifestação
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="size-4" />
                      <span>+12% este mês</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Abertas</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.abertas}</p>
                    <Progress value={40} className="h-1" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Em Análise</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.emAnalise}</p>
                    <Progress value={60} className="h-1" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Resolvidas</p>
                    <p className="text-3xl font-bold text-green-600">{stats.resolvidas}</p>
                    <Progress value={80} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 lg:w-auto">
                <TabsTrigger value="list">Lista</TabsTrigger>
                <TabsTrigger value="map">Mapa</TabsTrigger>
                <TabsTrigger value="stats">Estatísticas</TabsTrigger>
              </TabsList>

              {/* List View */}
              <TabsContent value="list" className="space-y-4 mt-6">
                {/* Filters */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-4">
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
                      
                      <div className="flex gap-2">
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger className="w-full sm:w-40">
                            <Filter className="size-4 mr-2" />
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="Aberto">Aberto</SelectItem>
                            <SelectItem value="Em Análise">Em Análise</SelectItem>
                            <SelectItem value="Respondido">Respondido</SelectItem>
                            <SelectItem value="Fechado">Fechado</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Select value={filterTipo} onValueChange={setFilterTipo}>
                          <SelectTrigger className="w-full sm:w-40">
                            <SelectValue placeholder="Tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="Reclamação">Reclamação</SelectItem>
                            <SelectItem value="Denúncia">Denúncia</SelectItem>
                            <SelectItem value="Sugestão">Sugestão</SelectItem>
                            <SelectItem value="Elogio">Elogio</SelectItem>
                            <SelectItem value="Solicitação">Solicitação</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Manifestações List */}
                <div className="space-y-3">
                  {filteredManifestacoes.map((manifestacao) => (
                    <Card 
                      key={manifestacao.id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedManifestacao(manifestacao)}
                    >
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{manifestacao.id}</h3>
                                <Badge className={getTipoColor(manifestacao.tipo)}>
                                  {manifestacao.tipo}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">Protocolo: {manifestacao.protocolo}</p>
                            </div>
                            <Badge className={getStatusColor(manifestacao.status)}>
                              {manifestacao.status}
                            </Badge>
                          </div>
                          
                          <p className="font-medium text-gray-900">{manifestacao.assunto}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{manifestacao.descricao}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <User className="size-4" />
                              <span>{manifestacao.cidadao.nome}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="size-4" />
                              <span>{manifestacao.localizacao.bairro}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="size-4" />
                              <span>{new Date(manifestacao.dataAbertura).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="size-4" />
                              <span>Prazo: {new Date(manifestacao.prazoResposta).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Map View */}
              <TabsContent value="map" className="mt-6">
                <Card className="h-[600px]">
                  <CardContent className="p-0 h-full relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center rounded-lg">
                      <div className="text-center space-y-4">
                        <Map className="size-16 text-blue-600 mx-auto" />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">Mapa Georreferenciado</h3>
                          <p className="text-gray-600 mt-2">
                            {manifestacoes.length} manifestações registradas com localização
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-4">
                          {manifestacoes.slice(0, 4).map(m => (
                            <div key={m.id} className="bg-white p-3 rounded-lg border text-left">
                              <div className="flex items-start gap-2">
                                <MapPin className="size-4 text-red-500 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{m.assunto}</p>
                                  <p className="text-xs text-gray-600">{m.localizacao.endereco}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stats View */}
              <TabsContent value="stats" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Tipos de Manifestação */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição por Tipo</CardTitle>
                      <CardDescription>Quantidade de manifestações por categoria</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {tipoStats.map((stat) => (
                        <div key={stat.tipo} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{stat.tipo}</span>
                            <span className="text-gray-600">{stat.count} ({Math.round((stat.count / stats.total) * 100)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`${stat.color} h-2 rounded-full transition-all`}
                              style={{ width: `${(stat.count / stats.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Desempenho */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Indicadores de Desempenho</CardTitle>
                      <CardDescription>Métricas de atendimento</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Taxa de Resolução</span>
                          <span className="text-sm text-gray-600">80%</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Tempo Médio de Resposta</span>
                          <span className="text-sm text-gray-600">5.2 dias</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Satisfação do Cidadão</span>
                          <span className="text-sm text-gray-600">4.5/5.0</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Detail Modal */}
            {selectedManifestacao && (
              <Dialog open={!!selectedManifestacao} onOpenChange={() => setSelectedManifestacao(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {selectedManifestacao.id}
                      <Badge className={getStatusColor(selectedManifestacao.status)}>
                        {selectedManifestacao.status}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>
                      Protocolo: {selectedManifestacao.protocolo}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div>
                      <Badge className={getTipoColor(selectedManifestacao.tipo)}>
                        {selectedManifestacao.tipo}
                      </Badge>
                      <h3 className="text-lg font-semibold mt-2">{selectedManifestacao.assunto}</h3>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-600">Descrição</Label>
                      <p className="text-sm text-gray-700 mt-1">{selectedManifestacao.descricao}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-600">Cidadão</Label>
                        <div className="space-y-1 mt-1">
                          <p className="text-sm font-medium">{selectedManifestacao.cidadao.nome}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Mail className="size-3" />
                            {selectedManifestacao.cidadao.email}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Phone className="size-3" />
                            {selectedManifestacao.cidadao.telefone}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-gray-600">Localização</Label>
                        <div className="space-y-1 mt-1">
                          <p className="text-sm font-medium">{selectedManifestacao.localizacao.endereco}</p>
                          <p className="text-sm text-gray-600">{selectedManifestacao.localizacao.bairro}</p>
                        </div>
                      </div>
                    </div>
                    
                    {selectedManifestacao.resposta && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <Label className="text-xs text-green-800">Resposta</Label>
                        <p className="text-sm text-gray-700 mt-2">{selectedManifestacao.resposta}</p>
                      </div>
                    )}
                    
                    {!selectedManifestacao.resposta && (
                      <div>
                        <Label htmlFor="resposta">Responder Manifestação</Label>
                        <Textarea 
                          id="resposta"
                          placeholder="Digite a resposta para o cidadão..."
                          rows={4}
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 justify-end pt-4 border-t">
                    {!selectedManifestacao.resposta && (
                      <Button onClick={() => {
                        toast.success('Resposta enviada com sucesso!');
                        setSelectedManifestacao(null);
                      }}>
                        <Send className="size-4 mr-2" />
                        Enviar Resposta
                      </Button>
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
