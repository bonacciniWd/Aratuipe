import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BarChart3, List, FileText, Check, X } from 'lucide-react';

interface OnboardingModalProps {
  onNavigate: (page: any) => void;
}

export function OnboardingModal({ onNavigate }: OnboardingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const steps = [
    {
      title: 'Bem-vindo(a)! Comece por aqui',
      description: 'Vamos guiá-lo pelas principais funcionalidades do sistema',
      icon: Check,
      color: 'bg-blue-600',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="bg-blue-600 p-3 rounded-full">
              <BarChart3 className="size-6 text-white" />
            </div>
            <div>
              <h4 className="text-gray-900">Dashboard Principal</h4>
              <p className="text-sm text-gray-600">
                Visualize métricas e acompanhe o desempenho dos processos
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            O Dashboard é seu ponto de partida. Aqui você encontra estatísticas em tempo real, 
            gráficos de processos e acesso rápido às suas principais tarefas.
          </p>
        </div>
      )
    },
    {
      title: 'Step 1: Visão Geral dos KPIs',
      description: 'Monitore seus processos em tempo real',
      icon: BarChart3,
      color: 'bg-blue-600',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl text-blue-600 mb-1">142</div>
              <div className="text-xs text-gray-600">Processos Ativos</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl text-yellow-600 mb-1">28</div>
              <div className="text-xs text-gray-600">Aguardando Análise</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl text-green-600 mb-1">89</div>
              <div className="text-xs text-gray-600">Concluídos (Mês)</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl text-red-600 mb-1">15</div>
              <div className="text-xs text-gray-600">Pendentes</div>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Os KPIs fornecem uma visão instantânea do status de todos os processos sob sua 
            responsabilidade. Use essas métricas para priorizar suas ações.
          </p>
        </div>
      )
    },
    {
      title: 'Step 2: Acesse Minhas Tarefas',
      description: 'Gerencie seus processos pendentes',
      icon: List,
      color: 'bg-purple-600',
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <List className="size-8 text-purple-600" />
              <div>
                <h4 className="text-gray-900">Minhas Tarefas</h4>
                <p className="text-sm text-gray-600">Lista completa de processos</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-white border border-gray-200 rounded text-sm">
                2024/001234 - Licitação Material
              </div>
              <div className="p-2 bg-white border border-gray-200 rounded text-sm">
                2024/001235 - Licença Ambiental
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Na seção "Minhas Tarefas", você encontra todos os processos que requerem sua atenção. 
            Use os filtros para organizar por status, data ou prioridade.
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setIsOpen(false);
              localStorage.setItem('hasSeenOnboarding', 'true');
              onNavigate('lista');
            }}
          >
            Ir para Minhas Tarefas
          </Button>
        </div>
      )
    },
    {
      title: 'Step 3: Inicie um Novo Protocolo',
      description: 'Crie processos rapidamente',
      icon: FileText,
      color: 'bg-green-600',
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="size-8 text-green-600" />
              <div>
                <h4 className="text-gray-900">Novo Protocolo</h4>
                <p className="text-sm text-gray-600">Inicie um processo eletrônico</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-green-600" />
                <span>Escolha o tipo de processo</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-green-600" />
                <span>Preencha os dados obrigatórios</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-green-600" />
                <span>Anexe documentos necessários</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-green-600" />
                <span>Protocole e acompanhe</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Para criar um novo processo, clique em "Novo Protocolo" no menu lateral. 
            O sistema guiará você por todas as etapas necessárias.
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setIsOpen(false);
              localStorage.setItem('hasSeenOnboarding', 'true');
              onNavigate('protocolo');
            }}
          >
            Criar Novo Protocolo
          </Button>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsOpen(false);
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="size-4" />
          <span className="sr-only">Fechar</span>
        </button>

        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className={`${currentStepData.color} p-3 rounded-full`}>
              <Icon className="size-6 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle>{currentStepData.title}</DialogTitle>
              <DialogDescription>{currentStepData.description}</DialogDescription>
            </div>
          </div>
          
          {/* Progress Indicators */}
          <div className="flex gap-2 pt-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-blue-600'
                    : index < currentStep
                    ? 'bg-blue-300'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </DialogHeader>

        <div className="py-4">
          {currentStepData.content}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="sm:mr-auto"
          >
            Entendi, não mostrar novamente
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Voltar
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Próximo
              </Button>
            ) : (
              <Button
                onClick={handleClose}
                className="bg-green-600 hover:bg-green-700"
              >
                Começar a Usar
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
