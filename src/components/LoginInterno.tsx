import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Building2, Lock, User, Info, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface LoginInternoProps {
  onLogin: () => void;
}

export function LoginInterno({ onLogin }: LoginInternoProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [welcomeStep, setWelcomeStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <img src="/src/assets/logo2.png" alt="Logo Prefeitura" className="h-12 w-12" style={{ width: '98px', height: '98px' }} />
          </div>
          <div>
            <CardTitle className="text-2xl">Prefeitura Municipal de Aratuípe</CardTitle>
            <CardDescription className="mt-2">
              Sistema de Gestão de Processos Eletrônicos
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail Corporativo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@aratuipe.gov.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="text-right">
              <button type="button" className="text-sm text-blue-600 hover:underline">
                Esqueci minha senha
              </button>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Entrar
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <svg className="size-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              Entrar com Gov.br
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Acesso restrito a servidores públicos autorizados</p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
        <DialogContent className="sm:max-w-[500px]">
          {welcomeStep === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Building2 className="size-6 text-blue-600" />
                  Bem-vindo à Proposta Técnica
                </DialogTitle>
                <DialogDescription className="pt-4 text-base text-gray-600">
                  Esta aplicação é uma demonstração funcional desenvolvida para a <strong>Licitação do Município de Aratuípe</strong>.
                  <br /><br />
                  O sistema apresenta uma solução completa de <strong>SaaS para Gestão Documental e Processos</strong>, focada em eficiência, transparência e conformidade legal.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6">
                <Button onClick={() => setWelcomeStep(2)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                  Próximo
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Info className="size-6 text-blue-600" />
                  Credenciais de Acesso
                </DialogTitle>
                <DialogDescription className="pt-4 space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="font-medium text-blue-900 mb-2">Utilize para testar:</p>
                    <div className="space-y-1 text-sm text-blue-800">
                      <p><span className="font-semibold">E-mail:</span> secretaria@aratauipe.gov.br</p>
                      <p><span className="font-semibold">Senha:</span> 123456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 text-amber-700 bg-amber-50 p-3 rounded-md text-sm border border-amber-100">
                    <AlertTriangle className="size-5 flex-shrink-0 mt-0.5" />
                    <p>
                      Este é um ambiente de demonstração com <strong>dados mockados</strong> (fictícios) para fins de avaliação técnica.
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6">
                <Button 
                  onClick={() => setShowWelcomeModal(false)} 
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="size-4 mr-2" />
                  Estou de acordo
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
