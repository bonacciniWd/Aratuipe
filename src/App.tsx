import { useState } from 'react';
import { LoginInterno } from './components/LoginInterno';
import { Dashboard } from './components/Dashboard';
import { ProtocoloDigital } from './components/ProtocoloDigital';
import { ListaProcessos } from './components/ListaProcessos';
import { VisualizacaoProcesso } from './components/VisualizacaoProcesso';
import { ModuloAssinatura } from './components/ModuloAssinatura';
import { Configuracoes } from './components/Configuracoes';
import { CadastroUsuario } from './components/CadastroUsuario';
import { GestaoCredenciais } from './components/GestaoCredenciais';
import { ConsultaPublica } from './components/ConsultaPublica';
import { ResultadoConsulta } from './components/ResultadoConsulta';
import { LoginExterno } from './components/LoginExterno';
import { WorkflowBuilder } from './components/WorkflowBuilder';
import { ModuloParecer } from './components/ModuloParecer';
import { ModuloOuvidoria } from './components/ModuloOuvidoria';
import { ModuloESIC } from './components/ModuloESIC';
import { ComunicacaoInterna } from './components/ComunicacaoInterna';
import { ModuloPAD } from './components/ModuloPAD';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { Monitor, Smartphone } from 'lucide-react';

type View = 'interno' | 'externo';
type InternoPage = 'login' | 'dashboard' | 'protocolo' | 'lista' | 'detalhe' | 'assinatura' | 'config' | 'cadastro-usuario' | 'gestao-credenciais' | 'workflow' | 'parecer' | 'ouvidoria' | 'esic' | 'comunicacao' | 'pad';
type ExternoPage = 'consulta' | 'resultado' | 'login';

export default function App() {
  const [view, setView] = useState<View>('interno');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [internoPage, setInternoPage] = useState<InternoPage>('login');
  const [externoPage, setExternoPage] = useState<ExternoPage>('consulta');

  const handleLoginInterno = () => {
    setIsLoggedIn(true);
    setInternoPage('dashboard');
  };

  const handleLogoutInterno = () => {
    setIsLoggedIn(false);
    setInternoPage('login');
  };

  const switchToView = (newView: View) => {
    setView(newView);
    setIsLoggedIn(false);
    if (newView === 'interno') {
      setInternoPage('login');
    } else {
      setExternoPage('consulta');
    }
  };

  return (
    <div className="min-h-[20vh] bg-gray-50">
      {/* View Switcher */}
      <div className="fixed bottom-0 right-4 z-50 flex gap-2 p-2 rounded-lg shadow-lg border border-gray-200">
        <Button
          variant={view === 'interno' ? 'default' : 'outline'}
          size="sm"
          onClick={() => switchToView('interno')}
          className="gap-2"
        >
          <Monitor className="size-4" />
          Interno
        </Button>
        <Button
          variant={view === 'externo' ? 'default' : 'outline'}
          size="sm"
          onClick={() => switchToView('externo')}
          className="gap-2"
        >
          <Smartphone className="size-4" />
          Externo
        </Button>
      </div>

      {/* Internal View (Desktop) */}
      {view === 'interno' && (
        <>
          {internoPage === 'login' && (
            <LoginInterno onLogin={handleLoginInterno} />
          )}
          {isLoggedIn && internoPage === 'dashboard' && (
            <Dashboard 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'protocolo' && (
            <ProtocoloDigital 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'lista' && (
            <ListaProcessos 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'detalhe' && (
            <VisualizacaoProcesso 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'assinatura' && (
            <ModuloAssinatura 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'config' && (
            <Configuracoes 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'cadastro-usuario' && (
            <CadastroUsuario 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'gestao-credenciais' && (
            <GestaoCredenciais 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'workflow' && (
            <WorkflowBuilder 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'parecer' && (
            <ModuloParecer 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'ouvidoria' && (
            <ModuloOuvidoria 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'esic' && (
            <ModuloESIC 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'comunicacao' && (
            <ComunicacaoInterna 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
          {isLoggedIn && internoPage === 'pad' && (
            <ModuloPAD 
              onNavigate={setInternoPage}
              onLogout={handleLogoutInterno}
            />
          )}
        </>
      )}

      {/* External View (Mobile First) */}
      {view === 'externo' && (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
          <div className="w-full max-w-md">
            {externoPage === 'consulta' && (
              <ConsultaPublica onNavigate={setExternoPage} />
            )}
            {externoPage === 'resultado' && (
              <ResultadoConsulta onNavigate={setExternoPage} />
            )}
            {externoPage === 'login' && (
              <LoginExterno onNavigate={setExternoPage} />
            )}
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}