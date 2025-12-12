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
  Mail, 
  Plus, 
  Search,
  Send,
  FileText,
  User,
  Calendar,
  Eye,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface ComunicacaoInternaProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Documento {
  id: string;
  numero: string;
  tipo: 'Memorando' | 'Ofício' | 'Circular' | 'Ato Oficial';
  assunto: string;
  remetente: {
    nome: string;
    departamento: string;
  };
  destinatario: {
    nome: string;
    departamento: string;
  };
  conteudo: string;
  dataEmissao: string;
  status: 'Rascunho' | 'Enviado' | 'Lido' | 'Respondido';
  prioridade: 'Normal' | 'Urgente';
  anexos?: string[];
}

export function ComunicacaoInterna({ onNavigate, onLogout }: ComunicacaoInternaProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Documento | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('recebidos');

  // Mock data
  const documentos: Documento[] = [
    {
      id: 'MEM-2024-045',
      numero: '045/2024',
      tipo: 'Memorando',
      assunto: 'Solicitação de materiais de escritório',
      remetente: {
        nome: 'João Silva',
        departamento: 'Secretaria de Administração'
      },
      destinatario: {
        nome: 'Maria Santos',
        departamento: 'Almoxarifado'
      },
      conteudo: 'Solicito o fornecimento dos seguintes materiais: resmas de papel A4, canetas esferográficas azuis e pastas suspensas para arquivo.',
      dataEmissao: '2024-12-01',
      status: 'Enviado',
      prioridade: 'Normal'
    },
    {
      id: 'OF-2024-089',
      numero: '089/2024',
      tipo: 'Ofício',
      assunto: 'Convite para reunião sobre obras públicas',
      remetente: {
        nome: 'Carlos Oliveira',
        departamento: 'Secretaria de Obras'
      },
      destinatario: {
        nome: 'Prefeito Municipal',
        departamento: 'Gabinete'
      },
      conteudo: 'Tenho a honra de convidar Vossa Excelência para reunião que tratará do andamento das obras de pavimentação, a realizar-se no dia 10/12/2024, às 14h.',
      dataEmissao: '2024-12-02',
      status: 'Lido',
      prioridade: 'Urgente'
    },
    {
      id: 'CIR-2024-012',
      numero: '012/2024',
      tipo: 'Circular',
      assunto: 'Recesso de fim de ano - ponto facultativo',
      remetente: {
        nome: 'Ana Costa',
        departamento: 'Recursos Humanos'
      },
      destinatario: {
        nome: 'Todos os Servidores',
        departamento: 'Todas as Secretarias'
      },
      conteudo: 'Informamos que os dias 23/12/2024 e 30/12/2024 serão pontos facultativos. O expediente será retomado normalmente em 02/01/2025.',
      dataEmissao: '2024-11-28',
      status: 'Enviado',
      prioridade: 'Normal'
    },
    {
      id: 'ATO-2024-007',
      numero: '007/2024',
      tipo: 'Ato Oficial',
      assunto: 'Nomeação de Comissão de Licitação',
      remetente: {
        nome: 'Prefeito Municipal',
        departamento: 'Gabinete'
      },
      destinatario: {
        nome: 'Comissão',
        departamento: 'Administração'
      },
      conteudo: 'O Prefeito Municipal, no uso de suas atribuições legais, NOMEIA os servidores João Silva, Maria Santos e Pedro Alves para comporem a Comissão Permanente de Licitação.',
      dataEmissao: '2024-11-30',
      status: 'Enviado',
      prioridade: 'Normal'
    },
    {
      id: 'MEM-2024-046',
      numero: '046/2024',
      tipo: 'Memorando',
      assunto: 'Resposta sobre solicitação de férias',
      remetente: {
        nome: 'Maria Santos',
        departamento: 'Recursos Humanos'
      },
      destinatario: {
        nome: 'Pedro Alves',
        departamento: 'Secretaria de Educação'
      },
      conteudo: 'Em resposta ao seu memorando nº 043/2024, informamos que o período de férias solicitado foi aprovado para o período de 15/01 a 29/01/2025.',
      dataEmissao: '2024-12-03',
      status: 'Respondido',
      prioridade: 'Normal'
    }
  ];

  const [newDoc, setNewDoc] = useState({
    tipo: '',
    assunto: '',
    destinatario: '',
    departamento: '',
    conteudo: '',
    prioridade: 'Normal'
  });

  const filteredDocs = documentos.filter(d => {
    const matchSearch = d.numero.includes(searchTerm) ||
                       d.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       d.remetente.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTipo = filterTipo === 'all' || d.tipo === filterTipo;
    
    if (activeTab === 'recebidos') {
      return matchSearch && matchTipo;
    } else if (activeTab === 'enviados') {
      return matchSearch && matchTipo;
    } else {
      return matchSearch && matchTipo && d.status === 'Rascunho';
    }
  });

  const handleCreateDoc = () => {
    if (!newDoc.tipo || !newDoc.assunto || !newDoc.destinatario || !newDoc.conteudo) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    toast.success(`${newDoc.tipo} criado com sucesso!`);
    setIsCreating(false);
    setNewDoc({
      tipo: '',
      assunto: '',
      destinatario: '',
      departamento: '',
      conteudo: '',
      prioridade: 'Normal'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Rascunho': return 'bg-gray-100 text-gray-800';
      case 'Enviado': return 'bg-blue-100 text-blue-800';
      case 'Lido': return 'bg-yellow-100 text-yellow-800';
      case 'Respondido': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Memorando': return <FileText className="size-4" />;
      case 'Ofício': return <Mail className="size-4" />;
      case 'Circular': return <Send className="size-4" />;
      case 'Ato Oficial': return <FileText className="size-4" />;
      default: return <FileText className="size-4" />;
    }
  };

  const stats = {
    total: documentos.length,
    enviados: documentos.filter(d => d.status === 'Enviado').length,
    lidos: documentos.filter(d => d.status === 'Lido').length,
    rascunhos: documentos.filter(d => d.status === 'Rascunho').length
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="comunicacao" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <Mail className="size-6 md:size-8" />
                  Comunicação Interna
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Gestão de memorandos, ofícios e documentos oficiais
                </p>
              </div>
              
              <Dialog open={isCreating} onOpenChange={setIsCreating}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="size-4" />
                    Novo Documento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Documento</DialogTitle>
                    <DialogDescription>
                      Memorando, Ofício, Circular ou Ato Oficial
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tipo">Tipo de Documento *</Label>
                        <Select 
                          value={newDoc.tipo}
                          onValueChange={(value) => setNewDoc({...newDoc, tipo: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Memorando">Memorando</SelectItem>
                            <SelectItem value="Ofício">Ofício</SelectItem>
                            <SelectItem value="Circular">Circular</SelectItem>
                            <SelectItem value="Ato Oficial">Ato Oficial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="prioridade">Prioridade</Label>
                        <Select 
                          value={newDoc.prioridade}
                          onValueChange={(value) => setNewDoc({...newDoc, prioridade: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Normal">Normal</SelectItem>
                            <SelectItem value="Urgente">Urgente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="assunto">Assunto *</Label>
                      <Input
                        id="assunto"
                        placeholder="Título/assunto do documento"
                        value={newDoc.assunto}
                        onChange={(e) => setNewDoc({...newDoc, assunto: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="destinatario">Destinatário *</Label>
                        <Select 
                          value={newDoc.destinatario}
                          onValueChange={(value) => setNewDoc({...newDoc, destinatario: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="João Silva">João Silva</SelectItem>
                            <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                            <SelectItem value="Carlos Oliveira">Carlos Oliveira</SelectItem>
                            <SelectItem value="Ana Costa">Ana Costa</SelectItem>
                            <SelectItem value="Todos os Servidores">Todos os Servidores</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="departamento">Departamento</Label>
                        <Select 
                          value={newDoc.departamento}
                          onValueChange={(value) => setNewDoc({...newDoc, departamento: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Gabinete">Gabinete</SelectItem>
                            <SelectItem value="Administração">Administração</SelectItem>
                            <SelectItem value="Finanças">Finanças</SelectItem>
                            <SelectItem value="Obras">Obras</SelectItem>
                            <SelectItem value="Educação">Educação</SelectItem>
                            <SelectItem value="Saúde">Saúde</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="conteudo">Conteúdo *</Label>
                      <Textarea
                        id="conteudo"
                        placeholder="Digite o conteúdo do documento..."
                        rows={10}
                        value={newDoc.conteudo}
                        onChange={(e) => setNewDoc({...newDoc, conteudo: e.target.value})}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancelar
                    </Button>
                    <Button variant="outline" onClick={handleCreateDoc}>
                      Salvar Rascunho
                    </Button>
                    <Button onClick={handleCreateDoc}>
                      <Send className="size-4 mr-2" />
                      Enviar
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
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                    </div>
                    <FileText className="size-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Enviados</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">{stats.enviados}</p>
                    </div>
                    <Send className="size-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Lidos</p>
                      <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.lidos}</p>
                    </div>
                    <Eye className="size-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Rascunhos</p>
                      <p className="text-2xl font-bold text-gray-600 mt-1">{stats.rascunhos}</p>
                    </div>
                    <Clock className="size-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recebidos">Recebidos</TabsTrigger>
                <TabsTrigger value="enviados">Enviados</TabsTrigger>
                <TabsTrigger value="rascunhos">Rascunhos</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4 mt-6">
                {/* Filters */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                          <Input
                            placeholder="Buscar por número, assunto ou remetente..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <Select value={filterTipo} onValueChange={setFilterTipo}>
                        <SelectTrigger className="w-full md:w-48">
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="Memorando">Memorando</SelectItem>
                          <SelectItem value="Ofício">Ofício</SelectItem>
                          <SelectItem value="Circular">Circular</SelectItem>
                          <SelectItem value="Ato Oficial">Ato Oficial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Documents List */}
                <div className="space-y-3">
                  {filteredDocs.map((doc) => (
                    <Card 
                      key={doc.id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  {getTipoIcon(doc.tipo)}
                                  <h3 className="font-semibold text-gray-900">{doc.id}</h3>
                                  <Badge variant="outline">{doc.tipo}</Badge>
                                  {doc.prioridade === 'Urgente' && (
                                    <Badge variant="destructive">Urgente</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">Número: {doc.numero}</p>
                              </div>
                              <Badge className={getStatusColor(doc.status)}>
                                {doc.status}
                              </Badge>
                            </div>
                            
                            <p className="font-medium text-gray-900">{doc.assunto}</p>
                            <p className="text-sm text-gray-600 line-clamp-2">{doc.conteudo}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <User className="size-4" />
                                <span>De: {doc.remetente.nome}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="size-4" />
                                <span>Para: {doc.destinatario.nome}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                <span>{new Date(doc.dataEmissao).toLocaleDateString('pt-BR')}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex lg:flex-col gap-2">
                            <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                              <Eye className="size-4 mr-2" />
                              Ver
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                              <Download className="size-4 mr-2" />
                              PDF
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredDocs.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <FileText className="size-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Nenhum documento encontrado</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            {/* Detail Modal */}
            {selectedDoc && (
              <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {getTipoIcon(selectedDoc.tipo)}
                      {selectedDoc.tipo} {selectedDoc.numero}
                      <Badge className={getStatusColor(selectedDoc.status)}>
                        {selectedDoc.status}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>
                      {selectedDoc.id}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedDoc.assunto}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-600">De (Remetente)</Label>
                        <p className="text-sm font-medium mt-1">{selectedDoc.remetente.nome}</p>
                        <p className="text-sm text-gray-600">{selectedDoc.remetente.departamento}</p>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-gray-600">Para (Destinatário)</Label>
                        <p className="text-sm font-medium mt-1">{selectedDoc.destinatario.nome}</p>
                        <p className="text-sm text-gray-600">{selectedDoc.destinatario.departamento}</p>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-gray-600">Data de Emissão</Label>
                        <p className="text-sm font-medium mt-1">
                          {new Date(selectedDoc.dataEmissao).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-gray-600">Prioridade</Label>
                        <Badge className="mt-1" variant={selectedDoc.prioridade === 'Urgente' ? 'destructive' : 'secondary'}>
                          {selectedDoc.prioridade}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-600 mb-2 block">Conteúdo</Label>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {selectedDoc.conteudo}
                        </p>
                      </div>
                    </div>
                    
                    {selectedDoc.anexos && selectedDoc.anexos.length > 0 && (
                      <div>
                        <Label className="text-xs text-gray-600 mb-2 block">Anexos</Label>
                        <div className="space-y-2">
                          {selectedDoc.anexos.map((anexo, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white rounded border">
                              <span className="text-sm">{anexo}</span>
                              <Button variant="ghost" size="sm">
                                <Download className="size-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 justify-end pt-4 border-t">
                    <Button variant="outline">
                      <Download className="size-4 mr-2" />
                      Baixar PDF
                    </Button>
                    {selectedDoc.status === 'Enviado' && (
                      <Button>
                        <Send className="size-4 mr-2" />
                        Responder
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
