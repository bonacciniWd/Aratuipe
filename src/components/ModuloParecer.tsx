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
  FileText, 
  Plus, 
  Search,
  Send,
  Eye,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Calendar,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

interface ModuloParecerProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Parecer {
  id: string;
  processoNumero: string;
  processoAssunto: string;
  tipo: 'Técnico' | 'Jurídico' | 'Financeiro' | 'Administrativo';
  status: 'Rascunho' | 'Enviado' | 'Aprovado' | 'Revisão';
  autor: string;
  departamento: string;
  dataEmissao: string;
  conteudo: string;
  conclusao: 'Favorável' | 'Desfavorável' | 'Com Ressalvas';
  prioridade: 'Alta' | 'Média' | 'Baixa';
}

export function ModuloParecer({ onNavigate, onLogout }: ModuloParecerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedParecer, setSelectedParecer] = useState<Parecer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTipo, setFilterTipo] = useState<string>('all');

  // Mock data - Pareceres existentes
  const pareceres: Parecer[] = [
    {
      id: 'PAR-2024-001',
      processoNumero: 'PROC-2024-1523',
      processoAssunto: 'Licitação para aquisição de equipamentos de informática',
      tipo: 'Jurídico',
      status: 'Enviado',
      autor: 'Dr. Carlos Oliveira',
      departamento: 'Assessoria Jurídica',
      dataEmissao: '2024-12-01',
      conteudo: 'Após análise detalhada do processo licitatório, verificou-se que todos os requisitos legais foram cumpridos conforme Lei 8.666/93 e Lei 14.133/21...',
      conclusao: 'Favorável',
      prioridade: 'Alta'
    },
    {
      id: 'PAR-2024-002',
      processoNumero: 'PROC-2024-1845',
      processoAssunto: 'Solicitação de aprovação de projeto arquitetônico - Praça Central',
      tipo: 'Técnico',
      status: 'Aprovado',
      autor: 'Eng. Lucas Martins',
      departamento: 'Engenharia e Obras',
      dataEmissao: '2024-11-28',
      conteudo: 'O projeto apresentado atende aos requisitos técnicos estabelecidos nas normas ABNT NBR 9050 (acessibilidade) e demais legislações urbanísticas municipais...',
      conclusao: 'Favorável',
      prioridade: 'Média'
    },
    {
      id: 'PAR-2024-003',
      processoNumero: 'PROC-2024-1692',
      processoAssunto: 'Análise de viabilidade orçamentária - Contratação de pessoal',
      tipo: 'Financeiro',
      status: 'Revisão',
      autor: 'Maria Santos',
      departamento: 'Contabilidade',
      dataEmissao: '2024-11-25',
      conteudo: 'A análise dos demonstrativos contábeis indica que a contratação pretendida impactará em 3,2% da folha de pagamento atual. Considerando a Lei de Responsabilidade Fiscal...',
      conclusao: 'Com Ressalvas',
      prioridade: 'Alta'
    },
    {
      id: 'PAR-2024-004',
      processoNumero: 'PROC-2024-2103',
      processoAssunto: 'Revisão de processo administrativo - Servidor João da Silva',
      tipo: 'Administrativo',
      status: 'Rascunho',
      autor: 'Ana Costa',
      departamento: 'Recursos Humanos',
      dataEmissao: '2024-12-04',
      conteudo: 'Em análise preliminar do processo administrativo, observa-se que o servidor cumpriu todos os requisitos para progressão funcional...',
      conclusao: 'Favorável',
      prioridade: 'Baixa'
    },
    {
      id: 'PAR-2024-005',
      processoNumero: 'PROC-2024-1978',
      processoAssunto: 'Parecer sobre recurso administrativo - Multa de trânsito',
      tipo: 'Jurídico',
      status: 'Enviado',
      autor: 'Dr. Carlos Oliveira',
      departamento: 'Assessoria Jurídica',
      dataEmissao: '2024-11-30',
      conteudo: 'O recurso apresentado não traz elementos novos que justifiquem a revisão da penalidade aplicada. A infração foi devidamente documentada...',
      conclusao: 'Desfavorável',
      prioridade: 'Média'
    }
  ];

  const [newParecer, setNewParecer] = useState({
    processoNumero: '',
    tipo: '',
    conteudo: '',
    conclusao: ''
  });

  const filteredPareceres = pareceres.filter(p => {
    const matchSearch = p.processoNumero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.processoAssunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.autor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchTipo = filterTipo === 'all' || p.tipo === filterTipo;
    return matchSearch && matchStatus && matchTipo;
  });

  const handleCreateParecer = () => {
    if (!newParecer.processoNumero || !newParecer.tipo || !newParecer.conteudo) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    toast.success('Parecer salvo como rascunho!');
    setIsCreating(false);
    setNewParecer({
      processoNumero: '',
      tipo: '',
      conteudo: '',
      conclusao: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado': return 'bg-green-100 text-green-800 border-green-200';
      case 'Enviado': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Revisão': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aprovado': return <CheckCircle2 className="size-4" />;
      case 'Enviado': return <Send className="size-4" />;
      case 'Revisão': return <AlertCircle className="size-4" />;
      default: return <Clock className="size-4" />;
    }
  };

  const getConclusaoColor = (conclusao: string) => {
    switch (conclusao) {
      case 'Favorável': return 'text-green-600 bg-green-50';
      case 'Desfavorável': return 'text-red-600 bg-red-50';
      default: return 'text-orange-600 bg-orange-50';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="parecer" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="size-6 md:size-8" />
                  Módulo de Pareceres
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Elabore e gerencie pareceres técnicos, jurídicos e administrativos
                </p>
              </div>
              
              <Dialog open={isCreating} onOpenChange={setIsCreating}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="size-4" />
                    Novo Parecer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Elaborar Novo Parecer</DialogTitle>
                    <DialogDescription>
                      Preencha as informações para criar um parecer técnico/jurídico
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="processo">Número do Processo *</Label>
                        <Input
                          id="processo"
                          placeholder="PROC-2024-XXXX"
                          value={newParecer.processoNumero}
                          onChange={(e) => setNewParecer({...newParecer, processoNumero: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="tipo">Tipo de Parecer *</Label>
                        <Select 
                          value={newParecer.tipo}
                          onValueChange={(value) => setNewParecer({...newParecer, tipo: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Técnico">Técnico</SelectItem>
                            <SelectItem value="Jurídico">Jurídico</SelectItem>
                            <SelectItem value="Financeiro">Financeiro</SelectItem>
                            <SelectItem value="Administrativo">Administrativo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="conteudo">Conteúdo do Parecer *</Label>
                      <Textarea
                        id="conteudo"
                        placeholder="Digite aqui o conteúdo detalhado do parecer, incluindo fundamentação legal, análise técnica e recomendações..."
                        rows={10}
                        value={newParecer.conteudo}
                        onChange={(e) => setNewParecer({...newParecer, conteudo: e.target.value})}
                        className="font-mono text-sm"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="conclusao">Conclusão *</Label>
                      <Select 
                        value={newParecer.conclusao}
                        onValueChange={(value) => setNewParecer({...newParecer, conclusao: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Favorável">Favorável</SelectItem>
                          <SelectItem value="Desfavorável">Desfavorável</SelectItem>
                          <SelectItem value="Com Ressalvas">Com Ressalvas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancelar
                    </Button>
                    <Button variant="outline" onClick={handleCreateParecer}>
                      Salvar Rascunho
                    </Button>
                    <Button onClick={handleCreateParecer}>
                      <Send className="size-4 mr-2" />
                      Enviar Parecer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total de Pareceres</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{pareceres.length}</p>
                    </div>
                    <FileText className="size-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Enviados</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {pareceres.filter(p => p.status === 'Enviado').length}
                      </p>
                    </div>
                    <Send className="size-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Em Revisão</p>
                      <p className="text-2xl font-bold text-yellow-600 mt-1">
                        {pareceres.filter(p => p.status === 'Revisão').length}
                      </p>
                    </div>
                    <AlertCircle className="size-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Aprovados</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {pareceres.filter(p => p.status === 'Aprovado').length}
                      </p>
                    </div>
                    <CheckCircle2 className="size-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        placeholder="Buscar por número, assunto ou autor..."
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
                        <SelectItem value="Rascunho">Rascunho</SelectItem>
                        <SelectItem value="Enviado">Enviado</SelectItem>
                        <SelectItem value="Aprovado">Aprovado</SelectItem>
                        <SelectItem value="Revisão">Revisão</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterTipo} onValueChange={setFilterTipo}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Técnico">Técnico</SelectItem>
                        <SelectItem value="Jurídico">Jurídico</SelectItem>
                        <SelectItem value="Financeiro">Financeiro</SelectItem>
                        <SelectItem value="Administrativo">Administrativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pareceres List */}
            <div className="space-y-4">
              {filteredPareceres.map((parecer) => (
                <Card key={parecer.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                              {parecer.id}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Processo: {parecer.processoNumero}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={getStatusColor(parecer.status)}>
                              {getStatusIcon(parecer.status)}
                              <span className="ml-1">{parecer.status}</span>
                            </Badge>
                            <Badge variant="outline">{parecer.tipo}</Badge>
                          </div>
                        </div>
                        
                        <p className="text-gray-700">
                          {parecer.processoAssunto}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="size-4" />
                            <span>{parecer.autor}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="size-4" />
                            <span>{parecer.departamento}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="size-4" />
                            <span>{new Date(parecer.dataEmissao).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <span className="text-sm font-medium text-gray-700">Conclusão: </span>
                          <Badge className={getConclusaoColor(parecer.conclusao)}>
                            {parecer.conclusao}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex lg:flex-col gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 lg:flex-none"
                          onClick={() => setSelectedParecer(parecer)}
                        >
                          <Eye className="size-4 mr-2" />
                          Visualizar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                          <Download className="size-4 mr-2" />
                          Baixar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPareceres.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="size-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nenhum parecer encontrado</p>
                </CardContent>
              </Card>
            )}

            {/* Detail Modal */}
            {selectedParecer && (
              <Dialog open={!!selectedParecer} onOpenChange={() => setSelectedParecer(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {selectedParecer.id}
                      <Badge className={getStatusColor(selectedParecer.status)}>
                        {selectedParecer.status}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>
                      Processo: {selectedParecer.processoNumero}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-600">Tipo</Label>
                        <p className="font-medium">{selectedParecer.tipo}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Conclusão</Label>
                        <Badge className={getConclusaoColor(selectedParecer.conclusao)}>
                          {selectedParecer.conclusao}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Autor</Label>
                        <p className="font-medium">{selectedParecer.autor}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Departamento</Label>
                        <p className="font-medium">{selectedParecer.departamento}</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-600">Assunto</Label>
                      <p className="font-medium">{selectedParecer.processoAssunto}</p>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-600 mb-2 block">Conteúdo do Parecer</Label>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {selectedParecer.conteudo}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 justify-end pt-4 border-t">
                    <Button variant="outline">
                      <Download className="size-4 mr-2" />
                      Exportar PDF
                    </Button>
                    <Button>
                      <Send className="size-4 mr-2" />
                      Anexar ao Processo
                    </Button>
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
