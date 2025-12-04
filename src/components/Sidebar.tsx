import { Building2, LayoutDashboard, FileText, List, Settings, LogOut, PenTool } from 'lucide-react';
import { Button } from './ui/button';

type Page = 'dashboard' | 'protocolo' | 'lista' | 'detalhe' | 'assinatura' | 'config';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'protocolo' as Page, label: 'Novo Protocolo', icon: FileText },
    { id: 'lista' as Page, label: 'Minhas Tarefas', icon: List },
    { id: 'assinatura' as Page, label: 'Assinaturas', icon: PenTool },
    { id: 'config' as Page, label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Building2 className="size-6 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-900">Prefeitura de</div>
            <div className="text-sm text-gray-600">Aratuípe</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
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
