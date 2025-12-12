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
import { Progress } from './ui/progress';
import { 
  Shield, 
  Plus, 
  Search,
  AlertTriangle,
  Eye,
  FileText,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

interface ModuloPADProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface PAD {
  id: string;
  portaria: string;
  acusado: {
    nome: string;
    matricula: string;
    cargo: string;
    departamento: string;
  };
  infracoes: string[];
  comissao: {
    presidente: string;
    membros: string[];
  };
  status: 'Instaurado' | 'Instrução' | 'Relatório' | 'Julgamento' | 'Finalizado';
  fase: string;
  dataInstauracao: string;
  prazoFinal: string;
  sigiloso: boolean;
  penalidade?: string;
}

export function ModuloPAD({ onNavigate, onLogout }: ModuloPADProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPAD, setSelectedPAD] = useState<PAD | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data - PADs (dados sensíveis)
  const pads: PAD[] = [
    {
      id: 'PAD-2024-001',
      portaria: 'Portaria nº 023/2024',
      acusado: {
        nome: 'Servidor 001 [SIGILOSO]',
        matricula: 'MAT-***45',
        cargo: 'Assistente Administrativo',
        departamento: 'Secretaria de Administração'
      },
      infracoes: [
        'Abandono de cargo',
        'Descumprimento de deveres funcionais'
      ],
      comissao: {
        presidente: 'Dr. Carlos Oliveira',
        membros: ['Maria Santos', 'João Silva']
      },
      status: 'Instrução',
      fase: 'Coleta de depoimentos',
      dataInstauracao: '2024-10-15',
      prazoFinal: '2025-01-13',
      sigiloso: true
    },
    {
      id: 'PAD-2024-002',
      portaria: 'Portaria nº 018/2024',
      acusado: {
        nome: 'Servidor 002 [SIGILOSO]',
        matricula: 'MAT-***78',
        cargo: 'Fiscal',
        departamento: 'Secretaria de Obras'
      },
      infracoes: [
        'Uso inadequado de bem público'
      ],
      comissao: {
        presidente: 'Ana Costa',
        membros: ['Pedro Alves', 'Luiza Fernandes']
      },
      status: 'Relatório',
      fase: 'Elaboração do relatório final',
      dataInstauracao: '2024-09-20',
      prazoFinal: '2024-12-19',
      sigiloso: true
    },
    {
      id: 'PAD-2024-003',
      portaria: 'Portaria nº 028/2024',
      acusado: {
        nome: 'Servidor 003 [SIGILOSO]',
        matricula: 'MAT-***92',
        cargo: 'Diretor',
        departamento: 'Secretaria de Educação'
      },
      infracoes: [
        'Inassiduidade habitual',
        'Indisciplina'
      ],
      comissao: {
        presidente: 'Dr. Roberto Lima',
        membros: ['Fernanda Costa', 'Marcos Souza']
      },
      status: 'Instaurado',
      fase: 'Notificação do acusado',
      dataInstauracao: '2024-11-25',
      prazoFinal: '2025-02-23',
      sigiloso: true
    }
  ];

  const [newPAD, setNewPAD] = useState({
    nome: '',
    matricula: '',
    cargo: '',
    departamento: '',
    infracoes: '',
    presidente: '',
    motivo: ''
  });

  const filteredPADs = pads.filter(p => {
    const matchSearch = p.id.includes(searchTerm) ||
                       p.portaria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleCreatePAD = () => {
    if (!newPAD.nome || !newPAD.matricula || !newPAD.infracoes || !newPAD.presidente) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    toast.success('PAD instaurado com sucesso! Portaria gerada.');
    setIsCreating(false);
    setNewPAD({
      nome: '',
      matricula: '',
      cargo: '',
      departamento: '',
      infracoes: '',
      presidente: '',
      motivo: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Instaurado': return 'bg-blue-100 text-blue-800';
      case 'Instrução': return 'bg-yellow-100 text-yellow-800';
      case 'Relatório': return 'bg-orange-100 text-orange-800';
      case 'Julgamento': return 'bg-purple-100 text-purple-800';
      case 'Finalizado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgress = (status: string) => {
    switch (status) {
      case 'Instaurado': return 20;
      case 'Instrução': return 50;
      case 'Relatório': return 75;
      case 'Julgamento': return 90;
      case 'Finalizado': return 100;
      default: return 0;
    }
  };

  const stats = {
    total: pads.length,
    instaurados: pads.filter(p => p.status === 'Instaurado').length,
    instrucao: pads.filter(p => p.status === 'Instrução').length,
    finalizados: pads.filter(p => p.status === 'Finalizado').length
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="pad" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="size-6 md:size-8" />
                  PAD - Processo Disciplinar
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Gestão de Processos Administrativos Disciplinares
                </p>
              </div>
              
              <Dialog open={isCreating} onOpenChange={setIsCreating}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="size-4" />
                    Instaurar PAD
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Instaurar Novo PAD</DialogTitle>
                    <DialogDescription>
                      Preencha os dados para instauração do processo disciplinar
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                      <Lock className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-800">Processo Sigiloso</p>
                        <p className="text-xs text-red-700 mt-1">
                          Informações protegidas por sigilo processual e LGPD
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome">Nome do Servidor *</Label>
                        <Input
                          id="nome"
                          placeholder="Nome completo"
                          value={newPAD.nome}
                          onChange={(e) => setNewPAD({...newPAD, nome: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="matricula">Matrícula *</Label>
                        <Input
                          id="matricula"
                          placeholder="MAT-00000"
                          value={newPAD.matricula}
                          onChange={(e) => setNewPAD({...newPAD, matricula: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cargo">Cargo</Label>
                        <Input
                          id="cargo"
                          placeholder="Cargo do servidor"
                          value={newPAD.cargo}
                          onChange={(e) => setNewPAD({...newPAD, cargo: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="departamento">Departamento</Label>
                        <Select 
                          value={newPAD.departamento}
                          onValueChange={(value) => setNewPAD({...newPAD, departamento: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Administração">Administração</SelectItem>
                            <SelectItem value="Obras">Obras</SelectItem>
                            <SelectItem value="Educação">Educação</SelectItem>
                            <SelectItem value="Saúde">Saúde</SelectItem>
                            <SelectItem value="Finanças">Finanças</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="infracoes">Infrações Imputadas *</Label>
                      <Textarea
                        id="infracoes"
                        placeholder="Liste as infrações administrativas conforme o Estatuto do Servidor"
                        rows={3}
                        value={newPAD.infracoes}
                        onChange={(e) => setNewPAD({...newPAD, infracoes: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="motivo">Motivo e Fundamentação *</Label>
                      <Textarea
                        id="motivo"
                        placeholder="Descreva os fatos que motivam a instauração do PAD..."
                        rows={5}
                        value={newPAD.motivo}
                        onChange={(e) => setNewPAD({...newPAD, motivo: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="presidente">Presidente da Comissão *</Label>
                      <Select 
                        value={newPAD.presidente}
                        onValueChange={(value) => setNewPAD({...newPAD, presidente: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dr. Carlos Oliveira">Dr. Carlos Oliveira (Jurídico)</SelectItem>
                          <SelectItem value="Ana Costa">Ana Costa (RH)</SelectItem>
                          <SelectItem value="Dr. Roberto Lima">Dr. Roberto Lima (Corregedoria)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Lei 8.112/90 - Prazo:</strong> A comissão terá 60 dias para conclusão dos trabalhos, 
                        prorrogáveis por igual período mediante justificativa.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreatePAD}>
                      <Shield className="size-4 mr-2" />
                      Instaurar PAD
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total de PADs</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                    </div>
                    <Shield className="size-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Instaurados</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">{stats.instaurados}</p>
                    </div>
                    <FileText className="size-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Em Instrução</p>
                      <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.instrucao}</p>
                    </div>
                    <Clock className="size-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Finalizados</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">{stats.finalizados}</p>
                    </div>
                    <CheckCircle2 className="size-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        placeholder="Buscar por ID ou portaria..."
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
                      <SelectItem value="Instaurado">Instaurado</SelectItem>
                      <SelectItem value="Instrução">Instrução</SelectItem>
                      <SelectItem value="Relatório">Relatório</SelectItem>
                      <SelectItem value="Julgamento">Julgamento</SelectItem>
                      <SelectItem value="Finalizado">Finalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* PADs List */}
            <div className="space-y-3">
              {filteredPADs.map((pad) => (
                <Card 
                  key={pad.id}
                  className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-red-500"
                  onClick={() => setSelectedPAD(pad)}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Lock className="size-5 text-red-600" />
                          <div>
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                              {pad.id}
                              <Badge variant="destructive" className="text-xs">SIGILOSO</Badge>
                            </h3>
                            <p className="text-sm text-gray-600">{pad.portaria}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(pad.status)}>
                          {pad.status}
                        </Badge>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Progresso</span>
                          <span className="font-medium">{pad.fase}</span>
                        </div>
                        <Progress value={getProgress(pad.status)} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <User className="size-4" />
                          <span className="truncate">Acusado: {pad.acusado.nome}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <FileText className="size-4" />
                          <span className="truncate">Presidente: {pad.comissao.presidente}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="size-4" />
                          <span>Instaurado: {new Date(pad.dataInstauracao).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="size-4" />
                          <span>Prazo: {new Date(pad.prazoFinal).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {pad.infracoes.map((infracao, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <AlertTriangle className="size-3 mr-1" />
                            {infracao}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPADs.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Shield className="size-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nenhum PAD encontrado</p>
                </CardContent>
              </Card>
            )}

            {/* Detail Modal */}
            {selectedPAD && (
              <Dialog open={!!selectedPAD} onOpenChange={() => setSelectedPAD(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Lock className="size-5 text-red-600" />
                      {selectedPAD.id}
                      <Badge variant="destructive">SIGILOSO</Badge>
                      <Badge className={getStatusColor(selectedPAD.status)}>
                        {selectedPAD.status}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>
                      {selectedPAD.portaria}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-800">
                        ⚠️ Processo protegido por sigilo. Acesso restrito aos membros da comissão e autoridades competentes.
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-600 mb-2 block">Progresso do Processo</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{selectedPAD.fase}</span>
                          <span className="text-gray-600">{getProgress(selectedPAD.status)}%</span>
                        </div>
                        <Progress value={getProgress(selectedPAD.status)} className="h-3" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-600">Servidor Acusado</Label>
                        <div className="mt-1 space-y-1">
                          <p className="text-sm font-medium">{selectedPAD.acusado.nome}</p>
                          <p className="text-sm text-gray-600">Mat: {selectedPAD.acusado.matricula}</p>
                          <p className="text-sm text-gray-600">{selectedPAD.acusado.cargo}</p>
                          <p className="text-sm text-gray-600">{selectedPAD.acusado.departamento}</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-gray-600">Comissão Processante</Label>
                        <div className="mt-1 space-y-1">
                          <p className="text-sm font-medium">Presidente: {selectedPAD.comissao.presidente}</p>
                          <p className="text-sm text-gray-600">Membros:</p>
                          {selectedPAD.comissao.membros.map((membro, idx) => (
                            <p key={idx} className="text-sm text-gray-600">• {membro}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-600 mb-2 block">Infrações Imputadas</Label>
                      <div className="space-y-2">
                        {selectedPAD.infracoes.map((infracao, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded">
                            <AlertTriangle className="size-4 text-orange-600 mt-0.5" />
                            <span className="text-sm text-gray-700">{infracao}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-600">Data de Instauração</Label>
                        <p className="text-sm font-medium mt-1">
                          {new Date(selectedPAD.dataInstauracao).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-gray-600">Prazo Final</Label>
                        <p className="text-sm font-medium mt-1">
                          {new Date(selectedPAD.prazoFinal).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    
                    {selectedPAD.penalidade && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <Label className="text-xs text-red-800">Penalidade Aplicada</Label>
                        <p className="text-sm font-medium text-gray-900 mt-2">{selectedPAD.penalidade}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 justify-end pt-4 border-t">
                    <Button variant="outline">
                      <Eye className="size-4 mr-2" />
                      Ver Autos
                    </Button>
                    {selectedPAD.status !== 'Finalizado' && (
                      <Button>
                        <FileText className="size-4 mr-2" />
                        Registrar Andamento
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
