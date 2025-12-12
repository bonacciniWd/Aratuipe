import { 
  LayoutDashboard, 
  FileText, 
  List, 
  Settings, 
  LogOut, 
  PenTool,
  Workflow,
  MessageSquare,
  FileSearch,
  Mail,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

type Page = 'dashboard' | 'protocolo' | 'lista' | 'detalhe' | 'assinatura' | 'config' | 'workflow' | 'parecer' | 'ouvidoria' | 'esic' | 'comunicacao' | 'pad';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const menuSections = [
    {
      title: 'Principal',
      items: [
        { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'protocolo' as Page, label: 'Novo Protocolo', icon: FileText },
        { id: 'lista' as Page, label: 'Minhas Tarefas', icon: List },
      ]
    },
    {
      title: 'Processos',
      items: [
        { id: 'workflow' as Page, label: 'Workflow Builder', icon: Workflow },
        { id: 'parecer' as Page, label: 'Pareceres', icon: FileText },
        { id: 'assinatura' as Page, label: 'Assinaturas', icon: PenTool },
      ]
    },
    {
      title: 'Atendimento',
      items: [
        { id: 'ouvidoria' as Page, label: 'Ouvidoria', icon: MessageSquare },
        { id: 'esic' as Page, label: 'e-SIC / LAI', icon: FileSearch },
      ]
    },
    {
      title: 'Administrativo',
      items: [
        { id: 'comunicacao' as Page, label: 'Comunicação', icon: Mail },
        { id: 'pad' as Page, label: 'PAD', icon: Shield },
        { id: 'config' as Page, label: 'Configurações', icon: Settings },
      ]
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b bg-blue-100 border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex justify-center">
            <img src="/src/assets/logo2.png" alt="Logo Prefeitura" className="h-10 w-10"  />
          </div>
          <div>
            <div className="text-sm text-gray-900">Prefeitura de</div>
            <div className="text-sm text-gray-600">Aratuípe</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        {menuSections.map((section, idx) => (
          <div key={section.title}>
            {idx > 0 && <Separator className="my-3" />}
            <div className="px-3 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.title}
              </span>
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="size-5" />
          Sair
        </Button>
      </div>
    </div>
  );
}
