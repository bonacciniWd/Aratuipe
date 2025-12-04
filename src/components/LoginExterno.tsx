import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Building2, User, Lock, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface LoginExternoProps {
  onNavigate: (page: any) => void;
}

export function LoginExterno({ onNavigate }: LoginExternoProps) {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app would authenticate
    alert('Login realizado com sucesso! (Demo)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 flex items-center">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('consulta')}
            className="p-2"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-xl text-gray-900">
            Acesso Externo
          </h1>
        </div>

        {/* Logo */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Building2 className="size-8 text-white" />
            </div>
          </div>
          <h2 className="text-lg text-gray-900">
            Prefeitura de Aratuípe
          </h2>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Login de Cidadão</CardTitle>
            <CardDescription>
              Acesse para acompanhar seus processos e visualizar documentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cpf-externo">CPF/CNPJ</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    id="cpf-externo"
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha-externo">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    id="senha-externo"
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-700">Lembrar-me</span>
                </label>
                <button type="button" className="text-blue-600 hover:underline">
                  Esqueci a senha
                </button>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Entrar
              </Button>

              <div className="relative my-4">
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
          </CardContent>
        </Card>

        {/* Registration */}
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600 mb-3">
              Ainda não tem cadastro?
            </p>
            <Button variant="outline" className="w-full">
              Criar Conta
            </Button>
          </CardContent>
        </Card>

        {/* Info Alert */}
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-sm text-blue-800">
            <strong>Importante:</strong> O login é necessário apenas para acessar 
            documentos restritos ou processos iniciados por você. Para consultas 
            públicas, não é necessário login.
          </AlertDescription>
        </Alert>

        {/* Help */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Problemas para acessar?
          </p>
          <Button variant="link" className="text-blue-600">
            Fale com o suporte
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 space-y-1 pt-4">
          <p>Sistema de Processos Eletrônicos</p>
          <p>Versão Mobile 2.0</p>
        </div>
      </div>
    </div>
  );
}
