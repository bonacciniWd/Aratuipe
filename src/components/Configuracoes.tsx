import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Users, Workflow, FileText, Edit, Trash2, Plus, Key, X, Save } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

interface ConfiguracoesProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  setor: string;
  perfil: string;
  ativo: boolean;
}

interface WorkflowEtapa {
  id: number;
  nome: string;
  responsavel: string;
  prazo: number;
}

interface WorkflowType {
  id: number;
  nome: string;
  tipo: string;
  ativo: boolean;
  etapas: WorkflowEtapa[];
}

interface Modelo {
  id: number;
  nome: string;
  tipo: string;
  categoria: string;
  conteudo: string;
  variaveis: string[];
}

export function Configuracoes({ onNavigate, onLogout }: ConfiguracoesProps) {
  // State for Users
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nome: 'João Silva', email: 'joao.silva@aratuipe.gov.br', setor: 'Secretaria de Administração', perfil: 'Administrador', ativo: true },
    { id: 2, nome: 'Maria Santos', email: 'maria.santos@aratuipe.gov.br', setor: 'Compras e Licitações', perfil: 'Gestor', ativo: true },
    { id: 3, nome: 'Pedro Costa', email: 'pedro.costa@aratuipe.gov.br', setor: 'Financeiro', perfil: 'Usuário', ativo: true },
    { id: 4, nome: 'Ana Oliveira', email: 'ana.oliveira@aratuipe.gov.br', setor: 'Recursos Humanos', perfil: 'Gestor', ativo: true },
    { id: 5, nome: 'Carlos Mendes', email: 'carlos.mendes@aratuipe.gov.br', setor: 'Tributação', perfil: 'Usuário', ativo: false },
  ]);
  const [searchUsuario, setSearchUsuario] = useState('');
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  // State for Workflows
  const [workflows, setWorkflows] = useState<WorkflowType[]>([
    { 
      id: 1, 
      nome: 'Processo de Licitação', 
      tipo: 'Compras', 
      ativo: true,
      etapas: [
        { id: 1, nome: 'Abertura do Processo', responsavel: 'Setor de Compras', prazo: 2 },
        { id: 2, nome: 'Análise Técnica', responsavel: 'Assessoria Jurídica', prazo: 5 },
        { id: 3, nome: 'Publicação do Edital', responsavel: 'Setor de Compras', prazo: 1 },
        { id: 4, nome: 'Sessão Pública', responsavel: 'Pregoeiro', prazo: 15 },
        { id: 5, nome: 'Homologação', responsavel: 'Ordenador de Despesas', prazo: 3 }
      ]
    },
    { 
      id: 2, 
      nome: 'Solicitação de Pagamento', 
      tipo: 'Financeiro', 
      ativo: true,
      etapas: [
        { id: 1, nome: 'Solicitação', responsavel: 'Setor Requisitante', prazo: 1 },
        { id: 2, nome: 'Análise Orçamentária', responsavel: 'Contabilidade', prazo: 2 },
        { id: 3, nome: 'Autorização', responsavel: 'Secretário', prazo: 2 },
        { id: 4, nome: 'Pagamento', responsavel: 'Tesouraria', prazo: 5 }
      ]
    },
    { 
      id: 3, 
      nome: 'Licença Ambiental', 
      tipo: 'Meio Ambiente', 
      ativo: true,
      etapas: [
        { id: 1, nome: 'Protocolo da Solicitação', responsavel: 'Protocolo', prazo: 1 },
        { id: 2, nome: 'Análise Documental', responsavel: 'Setor Ambiental', prazo: 5 },
        { id: 3, nome: 'Vistoria Técnica', responsavel: 'Fiscal Ambiental', prazo: 10 },
        { id: 4, nome: 'Parecer Técnico', responsavel: 'Engenheiro Ambiental', prazo: 7 },
        { id: 5, nome: 'Deliberação', responsavel: 'Conselho Ambiental', prazo: 15 },
        { id: 6, nome: 'Emissão da Licença', responsavel: 'Secretaria', prazo: 3 }
      ]
    },
    { 
      id: 4, 
      nome: 'Processo Disciplinar', 
      tipo: 'RH', 
      ativo: false,
      etapas: [
        { id: 1, nome: 'Instauração', responsavel: 'RH', prazo: 1 },
        { id: 2, nome: 'Instrução Processual', responsavel: 'Comissão PAD', prazo: 30 },
        { id: 3, nome: 'Defesa', responsavel: 'Servidor', prazo: 10 },
        { id: 4, nome: 'Relatório Final', responsavel: 'Comissão PAD', prazo: 15 },
        { id: 5, nome: 'Julgamento', responsavel: 'Autoridade Julgadora', prazo: 10 },
        { id: 6, nome: 'Publicação', responsavel: 'RH', prazo: 5 },
        { id: 7, nome: 'Recurso (se aplicável)', responsavel: 'Instância Superior', prazo: 15 }
      ]
    },
  ]);
  const [searchWorkflow, setSearchWorkflow] = useState('');
  const [editingWorkflow, setEditingWorkflow] = useState<WorkflowType | null>(null);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);

  // State for Templates
  const [modelos, setModelos] = useState<Modelo[]>([
    { 
      id: 1, 
      nome: 'Despacho Padrão', 
      tipo: 'Despacho', 
      categoria: 'Geral',
      conteudo: 'Ao setor competente para análise e providências cabíveis.\n\n{{nome_servidor}}\n{{cargo}}',
      variaveis: ['nome_servidor', 'cargo']
    },
    { 
      id: 2, 
      nome: 'Parecer Técnico', 
      tipo: 'Parecer', 
      categoria: 'Técnico',
      conteudo: 'PARECER TÉCNICO Nº {{numero}}/{{ano}}\n\nEm análise ao processo {{processo}}, manifesto-me {{favoravel_ou_contrario}}.\n\nFundamentação:\n{{fundamentacao}}\n\nConclusão:\n{{conclusao}}',
      variaveis: ['numero', 'ano', 'processo', 'favoravel_ou_contrario', 'fundamentacao', 'conclusao']
    },
    { 
      id: 3, 
      nome: 'Ofício Externo', 
      tipo: 'Ofício', 
      categoria: 'Comunicação',
      conteudo: 'OFÍCIO Nº {{numero}}/{{ano}}\n\nAo\n{{destinatario}}\n{{endereco}}\n\nAssunto: {{assunto}}\n\n{{conteudo}}\n\nAtenciosamente,\n{{remetente}}\n{{cargo}}',
      variaveis: ['numero', 'ano', 'destinatario', 'endereco', 'assunto', 'conteudo', 'remetente', 'cargo']
    },
    { 
      id: 4, 
      nome: 'Termo de Homologação', 
      tipo: 'Termo', 
      categoria: 'Licitação',
      conteudo: 'TERMO DE HOMOLOGAÇÃO\n\nProcesso: {{processo}}\nModalidade: {{modalidade}}\nObjeto: {{objeto}}\n\nHomologo o resultado da licitação em favor de {{vencedor}}, CNPJ {{cnpj}}, pelo valor de R$ {{valor}}.\n\n{{local}}, {{data}}\n{{autoridade}}\n{{cargo}}',
      variaveis: ['processo', 'modalidade', 'objeto', 'vencedor', 'cnpj', 'valor', 'local', 'data', 'autoridade', 'cargo']
    },
  ]);
  const [searchModelo, setSearchModelo] = useState('');
  const [editingModelo, setEditingModelo] = useState<Modelo | null>(null);
  const [modeloDialogOpen, setModeloDialogOpen] = useState(false);

  // User Handlers
  const handleEditUser = (user: Usuario) => {
    setEditingUser(user);
    setUserDialogOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser({
      id: Math.max(...usuarios.map(u => u.id), 0) + 1,
      nome: '',
      email: '',
      setor: '',
      perfil: 'Usuário',
      ativo: true
    });
    setUserDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!editingUser) return;
    
    if (!editingUser.nome || !editingUser.email || !editingUser.setor) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const exists = usuarios.find(u => u.id === editingUser.id);
    if (exists) {
      setUsuarios(usuarios.map(u => u.id === editingUser.id ? editingUser : u));
      toast.success('Usuário atualizado com sucesso!');
    } else {
      setUsuarios([...usuarios, editingUser]);
      toast.success('Usuário criado com sucesso!');
    }
    setUserDialogOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('Deseja realmente excluir este usuário?')) {
      setUsuarios(usuarios.filter(u => u.id !== id));
      toast.success('Usuário excluído com sucesso!');
    }
  };

  const handleToggleUserStatus = (id: number) => {
    setUsuarios(usuarios.map(u => 
      u.id === id ? { ...u, ativo: !u.ativo } : u
    ));
    toast.success('Status alterado com sucesso!');
  };

  // Workflow Handlers
  const handleEditWorkflow = (workflow: WorkflowType) => {
    setEditingWorkflow(workflow);
    setWorkflowDialogOpen(true);
  };

  const handleAddWorkflow = () => {
    setEditingWorkflow({
      id: Math.max(...workflows.map(w => w.id), 0) + 1,
      nome: '',
      tipo: '',
      ativo: true,
      etapas: []
    });
    setWorkflowDialogOpen(true);
  };

  const handleSaveWorkflow = () => {
    if (!editingWorkflow) return;
    
    if (!editingWorkflow.nome || !editingWorkflow.tipo || editingWorkflow.etapas.length === 0) {
      toast.error('Preencha todos os campos e adicione ao menos uma etapa');
      return;
    }

    const exists = workflows.find(w => w.id === editingWorkflow.id);
    if (exists) {
      setWorkflows(workflows.map(w => w.id === editingWorkflow.id ? editingWorkflow : w));
      toast.success('Fluxo de trabalho atualizado com sucesso!');
    } else {
      setWorkflows([...workflows, editingWorkflow]);
      toast.success('Fluxo de trabalho criado com sucesso!');
    }
    setWorkflowDialogOpen(false);
    setEditingWorkflow(null);
  };

  const handleDeleteWorkflow = (id: number) => {
    if (confirm('Deseja realmente excluir este fluxo de trabalho?')) {
      setWorkflows(workflows.filter(w => w.id !== id));
      toast.success('Fluxo de trabalho excluído com sucesso!');
    }
  };

  const handleToggleWorkflowStatus = (id: number) => {
    setWorkflows(workflows.map(w => 
      w.id === id ? { ...w, ativo: !w.ativo } : w
    ));
    toast.success('Status alterado com sucesso!');
  };

  const handleAddEtapa = () => {
    if (!editingWorkflow) return;
    const newEtapa: WorkflowEtapa = {
      id: Math.max(...editingWorkflow.etapas.map(e => e.id), 0) + 1,
      nome: '',
      responsavel: '',
      prazo: 1
    };
    setEditingWorkflow({
      ...editingWorkflow,
      etapas: [...editingWorkflow.etapas, newEtapa]
    });
  };

  const handleRemoveEtapa = (etapaId: number) => {
    if (!editingWorkflow) return;
    setEditingWorkflow({
      ...editingWorkflow,
      etapas: editingWorkflow.etapas.filter(e => e.id !== etapaId)
    });
  };

  const handleUpdateEtapa = (etapaId: number, field: keyof WorkflowEtapa, value: any) => {
    if (!editingWorkflow) return;
    setEditingWorkflow({
      ...editingWorkflow,
      etapas: editingWorkflow.etapas.map(e => 
        e.id === etapaId ? { ...e, [field]: value } : e
      )
    });
  };

  // Template Handlers
  const handleEditModelo = (modelo: Modelo) => {
    setEditingModelo(modelo);
    setModeloDialogOpen(true);
  };

  const handleAddModelo = () => {
    setEditingModelo({
      id: Math.max(...modelos.map(m => m.id), 0) + 1,
      nome: '',
      tipo: '',
      categoria: '',
      conteudo: '',
      variaveis: []
    });
    setModeloDialogOpen(true);
  };

  const handleSaveModelo = () => {
    if (!editingModelo) return;
    
    if (!editingModelo.nome || !editingModelo.tipo || !editingModelo.categoria || !editingModelo.conteudo) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    // Extract variables from content
    const variaveis = Array.from(editingModelo.conteudo.matchAll(/{{([^}]+)}}/g))
      .map(match => match[1]);
    const modeloWithVariables = { ...editingModelo, variaveis };

    const exists = modelos.find(m => m.id === editingModelo.id);
    if (exists) {
      setModelos(modelos.map(m => m.id === editingModelo.id ? modeloWithVariables : m));
      toast.success('Modelo atualizado com sucesso!');
    } else {
      setModelos([...modelos, modeloWithVariables]);
      toast.success('Modelo criado com sucesso!');
    }
    setModeloDialogOpen(false);
    setEditingModelo(null);
  };

  const handleDeleteModelo = (id: number) => {
    if (confirm('Deseja realmente excluir este modelo?')) {
      setModelos(modelos.filter(m => m.id !== id));
      toast.success('Modelo excluído com sucesso!');
    }
  };

  // Filtered data
  const filteredUsuarios = usuarios.filter(u => 
    u.nome.toLowerCase().includes(searchUsuario.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUsuario.toLowerCase()) ||
    u.setor.toLowerCase().includes(searchUsuario.toLowerCase())
  );

  const filteredWorkflows = workflows.filter(w => 
    w.nome.toLowerCase().includes(searchWorkflow.toLowerCase()) ||
    w.tipo.toLowerCase().includes(searchWorkflow.toLowerCase())
  );

  const filteredModelos = modelos.filter(m => 
    m.nome.toLowerCase().includes(searchModelo.toLowerCase()) ||
    m.tipo.toLowerCase().includes(searchModelo.toLowerCase()) ||
    m.categoria.toLowerCase().includes(searchModelo.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="config" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Configurações e Administração" />
        
        <main className="flex-1 overflow-y-auto p-8">
          <Tabs defaultValue="usuarios" className="space-y-6">
            <TabsList>
              <TabsTrigger value="usuarios" className="gap-2">
                <Users className="size-4" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="workflows" className="gap-2">
                <Workflow className="size-4" />
                Fluxos de Trabalho
              </TabsTrigger>
              <TabsTrigger value="modelos" className="gap-2">
                <FileText className="size-4" />
                Modelos de Documentos
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="usuarios">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Gestão de Usuários</CardTitle>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleAddUser}
                    >
                      <Plus className="size-4 mr-2" />
                      Novo Usuário
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex gap-2">
                    <Input 
                      placeholder="Buscar usuário..." 
                      value={searchUsuario}
                      onChange={(e) => setSearchUsuario(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      variant="outline"
                      onClick={() => onNavigate('gestao-credenciais')}
                    >
                      <Key className="size-4 mr-2" />
                      Credenciais
                    </Button>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Nome</TableHead>
                          <TableHead>E-mail</TableHead>
                          <TableHead className="hidden md:table-cell">Setor</TableHead>
                          <TableHead className="hidden sm:table-cell">Perfil</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsuarios.map((usuario) => (
                          <TableRow key={usuario.id}>
                            <TableCell className="font-medium">{usuario.nome}</TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {usuario.email}
                            </TableCell>
                            <TableCell className="text-sm hidden md:table-cell">
                              {usuario.setor}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge variant="outline">
                                {usuario.perfil}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={usuario.ativo}
                                  onCheckedChange={() => handleToggleUserStatus(usuario.id)}
                                />
                                <Badge className={usuario.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                                  {usuario.ativo ? 'Ativo' : 'Inativo'}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditUser(usuario)}
                                >
                                  <Edit className="size-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteUser(usuario.id)}
                                >
                                  <Trash2 className="size-4 text-red-600" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Workflows Tab */}
            <TabsContent value="workflows">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Fluxos de Trabalho</CardTitle>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleAddWorkflow}
                    >
                      <Plus className="size-4 mr-2" />
                      Novo Fluxo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input 
                      placeholder="Buscar fluxo de trabalho..." 
                      value={searchWorkflow}
                      onChange={(e) => setSearchWorkflow(e.target.value)}
                    />
                  </div>

                  <div className="space-y-4">
                    {filteredWorkflows.map((workflow) => (
                      <div
                        key={workflow.id}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-gray-900">{workflow.nome}</h4>
                              <Badge className={workflow.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                                {workflow.ativo ? 'Ativo' : 'Inativo'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Tipo: {workflow.tipo}</span>
                              <span>•</span>
                              <span>{workflow.etapas.length} etapas</span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Switch
                              checked={workflow.ativo}
                              onCheckedChange={() => handleToggleWorkflowStatus(workflow.id)}
                            />
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditWorkflow(workflow)}
                            >
                              <Edit className="size-4 mr-2" />
                              Editar
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteWorkflow(workflow.id)}
                            >
                              <Trash2 className="size-4 text-red-600" />
                            </Button>
                          </div>
                        </div>

                        {/* Workflow Visual */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            {workflow.etapas.map((etapa, i) => (
                              <div key={etapa.id} className="flex items-center gap-2">
                                <div className="flex flex-col items-center min-w-[80px]">
                                  <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                                    {i + 1}
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1 text-center font-medium">
                                    {etapa.nome || `Etapa ${i + 1}`}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {etapa.prazo}d
                                  </div>
                                </div>
                                {i < workflow.etapas.length - 1 && (
                                  <div className="h-0.5 w-8 bg-blue-300 flex-shrink-0" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="modelos">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Modelos de Documentos</CardTitle>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleAddModelo}
                    >
                      <Plus className="size-4 mr-2" />
                      Novo Modelo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input 
                      placeholder="Buscar modelo..." 
                      value={searchModelo}
                      onChange={(e) => setSearchModelo(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredModelos.map((modelo) => (
                      <div
                        key={modelo.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                            <FileText className="size-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-gray-900 mb-1 font-medium truncate">{modelo.nome}</h4>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {modelo.tipo}
                              </Badge>
                              <span className="text-xs">{modelo.categoria}</span>
                            </div>
                            {modelo.variaveis.length > 0 && (
                              <div className="text-xs text-gray-500">
                                {modelo.variaveis.length} variável(eis)
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 mt-3 pt-3 border-t">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleEditModelo(modelo)}
                          >
                            <Edit className="size-4 mr-1" />
                            Editar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteModelo(modelo.id)}
                          >
                            <Trash2 className="size-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* User Edit Dialog */}
      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingUser?.nome ? 'Editar Usuário' : 'Novo Usuário'}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do usuário abaixo
            </DialogDescription>
          </DialogHeader>
          
          {editingUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={editingUser.nome}
                    onChange={(e) => setEditingUser({ ...editingUser, nome: e.target.value })}
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    placeholder="email@aratuipe.gov.br"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="setor">Setor *</Label>
                  <Select
                    value={editingUser.setor}
                    onValueChange={(value) => setEditingUser({ ...editingUser, setor: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o setor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Secretaria de Administração">Secretaria de Administração</SelectItem>
                      <SelectItem value="Compras e Licitações">Compras e Licitações</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                      <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                      <SelectItem value="Tributação">Tributação</SelectItem>
                      <SelectItem value="Obras">Obras</SelectItem>
                      <SelectItem value="Educação">Educação</SelectItem>
                      <SelectItem value="Saúde">Saúde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="perfil">Perfil de Acesso *</Label>
                  <Select
                    value={editingUser.perfil}
                    onValueChange={(value) => setEditingUser({ ...editingUser, perfil: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                      <SelectItem value="Gestor">Gestor</SelectItem>
                      <SelectItem value="Usuário">Usuário</SelectItem>
                      <SelectItem value="Consulta">Consulta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="ativo"
                  checked={editingUser.ativo}
                  onCheckedChange={(checked) => setEditingUser({ ...editingUser, ativo: checked })}
                />
                <Label htmlFor="ativo">Usuário ativo</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setUserDialogOpen(false);
                    setEditingUser(null);
                  }}
                >
                  <X className="size-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveUser}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="size-4 mr-2" />
                  Salvar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Workflow Edit Dialog */}
      <Dialog open={workflowDialogOpen} onOpenChange={setWorkflowDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingWorkflow?.nome ? 'Editar Fluxo de Trabalho' : 'Novo Fluxo de Trabalho'}
            </DialogTitle>
            <DialogDescription>
              Configure o fluxo de trabalho e suas etapas
            </DialogDescription>
          </DialogHeader>
          
          {editingWorkflow && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workflow-nome">Nome do Fluxo *</Label>
                  <Input
                    id="workflow-nome"
                    value={editingWorkflow.nome}
                    onChange={(e) => setEditingWorkflow({ ...editingWorkflow, nome: e.target.value })}
                    placeholder="Ex: Processo de Licitação"
                  />
                </div>
                <div>
                  <Label htmlFor="workflow-tipo">Tipo *</Label>
                  <Select
                    value={editingWorkflow.tipo}
                    onValueChange={(value) => setEditingWorkflow({ ...editingWorkflow, tipo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Compras">Compras</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                      <SelectItem value="RH">Recursos Humanos</SelectItem>
                      <SelectItem value="Meio Ambiente">Meio Ambiente</SelectItem>
                      <SelectItem value="Obras">Obras</SelectItem>
                      <SelectItem value="Jurídico">Jurídico</SelectItem>
                      <SelectItem value="Administrativo">Administrativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="workflow-ativo"
                  checked={editingWorkflow.ativo}
                  onCheckedChange={(checked) => setEditingWorkflow({ ...editingWorkflow, ativo: checked })}
                />
                <Label htmlFor="workflow-ativo">Fluxo ativo</Label>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-semibold">Etapas do Fluxo *</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddEtapa}
                  >
                    <Plus className="size-4 mr-2" />
                    Adicionar Etapa
                  </Button>
                </div>

                <div className="space-y-3">
                  {editingWorkflow.etapas.map((etapa, index) => (
                    <div key={etapa.id} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-600 text-white size-8 rounded-full flex items-center justify-center flex-shrink-0 font-medium text-sm mt-1">
                          {index + 1}
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label className="text-xs">Nome da Etapa</Label>
                            <Input
                              value={etapa.nome}
                              onChange={(e) => handleUpdateEtapa(etapa.id, 'nome', e.target.value)}
                              placeholder="Ex: Análise Técnica"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Responsável</Label>
                            <Input
                              value={etapa.responsavel}
                              onChange={(e) => handleUpdateEtapa(etapa.id, 'responsavel', e.target.value)}
                              placeholder="Ex: Setor Jurídico"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Prazo (dias)</Label>
                            <Input
                              type="number"
                              min="1"
                              value={etapa.prazo}
                              onChange={(e) => handleUpdateEtapa(etapa.id, 'prazo', parseInt(e.target.value) || 1)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveEtapa(etapa.id)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingWorkflow.etapas.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Nenhuma etapa adicionada. Clique em "Adicionar Etapa" para começar.
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setWorkflowDialogOpen(false);
                    setEditingWorkflow(null);
                  }}
                >
                  <X className="size-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveWorkflow}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="size-4 mr-2" />
                  Salvar Fluxo
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Template Edit Dialog */}
      <Dialog open={modeloDialogOpen} onOpenChange={setModeloDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingModelo?.nome ? 'Editar Modelo' : 'Novo Modelo'}
            </DialogTitle>
            <DialogDescription>
              Configure o modelo de documento. Use {"{{variavel}}"} para campos dinâmicos.
            </DialogDescription>
          </DialogHeader>
          
          {editingModelo && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="modelo-nome">Nome do Modelo *</Label>
                  <Input
                    id="modelo-nome"
                    value={editingModelo.nome}
                    onChange={(e) => setEditingModelo({ ...editingModelo, nome: e.target.value })}
                    placeholder="Ex: Despacho Padrão"
                  />
                </div>
                <div>
                  <Label htmlFor="modelo-tipo">Tipo *</Label>
                  <Select
                    value={editingModelo.tipo}
                    onValueChange={(value) => setEditingModelo({ ...editingModelo, tipo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Despacho">Despacho</SelectItem>
                      <SelectItem value="Parecer">Parecer</SelectItem>
                      <SelectItem value="Ofício">Ofício</SelectItem>
                      <SelectItem value="Termo">Termo</SelectItem>
                      <SelectItem value="Portaria">Portaria</SelectItem>
                      <SelectItem value="Decreto">Decreto</SelectItem>
                      <SelectItem value="Memorando">Memorando</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="modelo-categoria">Categoria *</Label>
                  <Input
                    id="modelo-categoria"
                    value={editingModelo.categoria}
                    onChange={(e) => setEditingModelo({ ...editingModelo, categoria: e.target.value })}
                    placeholder="Ex: Geral, Licitação"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="modelo-conteudo">Conteúdo do Modelo *</Label>
                <Textarea
                  id="modelo-conteudo"
                  value={editingModelo.conteudo}
                  onChange={(e) => setEditingModelo({ ...editingModelo, conteudo: e.target.value })}
                  placeholder={"Ex: Ao setor {{setor}} para {{acao}}.\n\n{{nome_servidor}}\n{{cargo}}"}
                  rows={10}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use {"{{nome_variavel}}"} para criar campos dinâmicos que serão preenchidos ao usar o modelo.
                </p>
              </div>

              {editingModelo.conteudo && (
                <div className="border rounded-lg p-3 bg-blue-50">
                  <Label className="text-sm font-semibold text-blue-900">
                    Variáveis detectadas: {Array.from(editingModelo.conteudo.matchAll(/{{([^}]+)}}/g)).length}
                  </Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Array.from(editingModelo.conteudo.matchAll(/{{([^}]+)}}/g)).map((match, i) => (
                      <Badge key={i} variant="outline" className="bg-white">
                        {match[1]}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setModeloDialogOpen(false);
                    setEditingModelo(null);
                  }}
                >
                  <X className="size-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveModelo}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="size-4 mr-2" />
                  Salvar Modelo
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}