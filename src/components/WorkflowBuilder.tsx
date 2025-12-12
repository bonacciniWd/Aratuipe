import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Workflow, 
  Plus, 
  Play, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  User, 
  Clock,
  FileText,
  AlertCircle,
  Save,
  Trash2,
  Edit2
} from 'lucide-react';
import { toast } from 'sonner';

interface WorkflowBuilderProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface WorkflowStep {
  id: string;
  name: string;
  responsible: string;
  department: string;
  deadline: number;
  actions: string[];
  status: 'pending' | 'in-progress' | 'completed';
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: WorkflowStep[];
  createdAt: string;
  usageCount: number;
}

export function WorkflowBuilder({ onNavigate, onLogout }: WorkflowBuilderProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newStep, setNewStep] = useState({
    name: '',
    responsible: '',
    department: '',
    deadline: 5,
    actions: [] as string[]
  });

  // Mock data - Templates pré-configurados
  const templates: WorkflowTemplate[] = [
    {
      id: '1',
      name: 'Processo Administrativo Padrão',
      description: 'Fluxo completo para tramitação de processos administrativos gerais',
      category: 'Administrativo',
      steps: [
        {
          id: 's1',
          name: 'Protocolo e Autuação',
          responsible: 'João Silva',
          department: 'Protocolo',
          deadline: 2,
          actions: ['Registrar entrada', 'Validar documentos', 'Atribuir número'],
          status: 'completed'
        },
        {
          id: 's2',
          name: 'Análise Preliminar',
          responsible: 'Maria Santos',
          department: 'Jurídico',
          deadline: 5,
          actions: ['Verificar competência', 'Solicitar documentos complementares'],
          status: 'in-progress'
        },
        {
          id: 's3',
          name: 'Parecer Técnico',
          responsible: 'Carlos Oliveira',
          department: 'Assessoria Técnica',
          deadline: 10,
          actions: ['Elaborar parecer', 'Anexar estudos técnicos'],
          status: 'pending'
        },
        {
          id: 's4',
          name: 'Decisão Final',
          responsible: 'Ana Costa',
          department: 'Gabinete',
          deadline: 3,
          actions: ['Despacho decisório', 'Assinatura digital'],
          status: 'pending'
        },
        {
          id: 's5',
          name: 'Arquivamento',
          responsible: 'Sistema',
          department: 'Arquivo',
          deadline: 1,
          actions: ['Catalogar', 'Arquivar'],
          status: 'pending'
        }
      ],
      createdAt: '2024-11-15',
      usageCount: 342
    },
    {
      id: '2',
      name: 'Aprovação de Projetos - Urbanismo',
      description: 'Análise e aprovação de projetos de construção e parcelamento',
      category: 'Urbanismo',
      steps: [
        {
          id: 's1',
          name: 'Recebimento de Projeto',
          responsible: 'Pedro Alves',
          department: 'Protocolo',
          deadline: 1,
          actions: ['Validar documentação', 'Conferir plantas'],
          status: 'completed'
        },
        {
          id: 's2',
          name: 'Análise Urbanística',
          responsible: 'Eng. Lucas Martins',
          department: 'Urbanismo',
          deadline: 15,
          actions: ['Verificar zoneamento', 'Calcular índices', 'Analisar recuos'],
          status: 'in-progress'
        },
        {
          id: 's3',
          name: 'Vistoria Técnica',
          responsible: 'Equipe de Campo',
          department: 'Fiscalização',
          deadline: 7,
          actions: ['Agendar vistoria', 'Elaborar relatório'],
          status: 'pending'
        },
        {
          id: 's4',
          name: 'Emissão de Alvará',
          responsible: 'Ana Costa',
          department: 'Licenciamento',
          deadline: 3,
          actions: ['Gerar alvará', 'Assinar digitalmente'],
          status: 'pending'
        }
      ],
      createdAt: '2024-10-20',
      usageCount: 156
    },
    {
      id: '3',
      name: 'PAD - Processo Disciplinar',
      description: 'Instauração e tramitação de Processo Administrativo Disciplinar',
      category: 'Corregedoria',
      steps: [
        {
          id: 's1',
          name: 'Instauração',
          responsible: 'Corregedor',
          department: 'Corregedoria',
          deadline: 5,
          actions: ['Portaria de instauração', 'Designar comissão'],
          status: 'completed'
        },
        {
          id: 's2',
          name: 'Instrução Probatória',
          responsible: 'Comissão',
          department: 'Corregedoria',
          deadline: 60,
          actions: ['Notificar acusado', 'Colher depoimentos', 'Juntar provas'],
          status: 'in-progress'
        },
        {
          id: 's3',
          name: 'Relatório Final',
          responsible: 'Presidente da Comissão',
          department: 'Corregedoria',
          deadline: 10,
          actions: ['Elaborar relatório', 'Propor penalidade'],
          status: 'pending'
        },
        {
          id: 's4',
          name: 'Julgamento',
          responsible: 'Autoridade Competente',
          department: 'Gabinete',
          deadline: 20,
          actions: ['Analisar relatório', 'Proferir decisão'],
          status: 'pending'
        }
      ],
      createdAt: '2024-09-10',
      usageCount: 45
    },
    {
      id: '4',
      name: 'Protocolo Legislativo',
      description: 'Gestão de indicações e requerimentos da Câmara Municipal',
      category: 'Legislativo',
      steps: [
        {
          id: 's1',
          name: 'Recebimento',
          responsible: 'Protocolo Legislativo',
          department: 'Gabinete',
          deadline: 1,
          actions: ['Registrar', 'Classificar tipo'],
          status: 'completed'
        },
        {
          id: 's2',
          name: 'Distribuição',
          responsible: 'Chefe de Gabinete',
          department: 'Gabinete',
          deadline: 2,
          actions: ['Encaminhar à secretaria competente'],
          status: 'in-progress'
        },
        {
          id: 's3',
          name: 'Análise Técnica',
          responsible: 'Secretário(a)',
          department: 'Secretaria',
          deadline: 15,
          actions: ['Elaborar resposta', 'Juntar documentos'],
          status: 'pending'
        },
        {
          id: 's4',
          name: 'Aprovação e Envio',
          responsible: 'Prefeito',
          department: 'Gabinete',
          deadline: 3,
          actions: ['Aprovar resposta', 'Enviar à Câmara'],
          status: 'pending'
        }
      ],
      createdAt: '2024-11-01',
      usageCount: 289
    }
  ];

  const addStep = () => {
    if (!newStep.name || !newStep.responsible || !newStep.department) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    toast.success('Etapa adicionada com sucesso!');
    setNewStep({
      name: '',
      responsible: '',
      department: '',
      deadline: 5,
      actions: []
    });
    setIsCreating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="size-5 text-green-600" />;
      case 'in-progress': return <Play className="size-5 text-blue-600" />;
      default: return <Circle className="size-5 text-gray-400" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="workflow" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <Workflow className="size-6 md:size-8" />
                  Workflow Builder
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Configure fluxos de trabalho para processos administrativos
                </p>
              </div>
              
              <Dialog open={isCreating} onOpenChange={setIsCreating}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="size-4" />
                    Novo Workflow
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Workflow</DialogTitle>
                    <DialogDescription>
                      Configure as etapas do fluxo de trabalho
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="step-name">Nome da Etapa *</Label>
                        <Input
                          id="step-name"
                          placeholder="Ex: Análise Técnica"
                          value={newStep.name}
                          onChange={(e) => setNewStep({...newStep, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="responsible">Responsável *</Label>
                        <Select 
                          value={newStep.responsible}
                          onValueChange={(value) => setNewStep({...newStep, responsible: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="João Silva">João Silva</SelectItem>
                            <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                            <SelectItem value="Carlos Oliveira">Carlos Oliveira</SelectItem>
                            <SelectItem value="Ana Costa">Ana Costa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="department">Departamento *</Label>
                        <Select 
                          value={newStep.department}
                          onValueChange={(value) => setNewStep({...newStep, department: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Protocolo">Protocolo</SelectItem>
                            <SelectItem value="Jurídico">Jurídico</SelectItem>
                            <SelectItem value="Técnico">Técnico</SelectItem>
                            <SelectItem value="Gabinete">Gabinete</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="deadline">Prazo (dias)</Label>
                        <Input
                          id="deadline"
                          type="number"
                          min="1"
                          value={newStep.deadline}
                          onChange={(e) => setNewStep({...newStep, deadline: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="actions">Ações Disponíveis</Label>
                      <Textarea
                        id="actions"
                        placeholder="Digite as ações separadas por vírgula"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={addStep}>
                      Adicionar Etapa
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {template.description}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{template.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Steps Count */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Workflow className="size-4" />
                          <span>{template.steps.length} etapas</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="size-4" />
                          <span>{template.usageCount} processos</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          <span>{template.steps.reduce((acc, s) => acc + s.deadline, 0)} dias</span>
                        </div>
                      </div>
                      
                      {/* Step Preview */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {template.steps.map((step, idx) => (
                          <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
                            <div className={`size-3 rounded-full ${getStatusColor(step.status)}`} />
                            {idx < template.steps.length - 1 && (
                              <ArrowRight className="size-3 text-gray-400" />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Template Details */}
            {selectedTemplate && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{selectedTemplate.name}</CardTitle>
                      <CardDescription>{selectedTemplate.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="size-4 mr-2" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Save className="size-4 mr-2" />
                        Duplicar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedTemplate.steps.map((step, idx) => (
                      <div key={step.id} className="relative">
                        {/* Connector Line */}
                        {idx < selectedTemplate.steps.length - 1 && (
                          <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200 -z-10" />
                        )}
                        
                        <div className="flex gap-4 p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors">
                          <div className="flex-shrink-0">
                            {getStatusIcon(step.status)}
                          </div>
                          
                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h4 className="font-semibold text-gray-900">{step.name}</h4>
                              <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                                {step.status === 'completed' ? 'Concluída' : 
                                 step.status === 'in-progress' ? 'Em Andamento' : 'Pendente'}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <User className="size-4 flex-shrink-0" />
                                <span className="truncate">{step.responsible}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="size-4 flex-shrink-0" />
                                <span className="truncate">{step.department}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="size-4 flex-shrink-0" />
                                <span>{step.deadline} dias</span>
                              </div>
                            </div>
                            
                            {step.actions.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {step.actions.map((action, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {action}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
                    <Button className="flex-1">
                      <Play className="size-4 mr-2" />
                      Iniciar Processo com este Workflow
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <AlertCircle className="size-4 mr-2" />
                      Ver Histórico de Uso
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
