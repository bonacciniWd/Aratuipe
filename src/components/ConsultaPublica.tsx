import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Building2, Search, FileText, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import logo from '../assets/logo2.png';

interface ConsultaPublicaProps {
  onNavigate: (page: any) => void;
}

export function ConsultaPublica({ onNavigate }: ConsultaPublicaProps) {
  const [protocolo, setProtocolo] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (protocolo) {
      onNavigate('resultado');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 flex items-center">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="text-center">
         <div className="flex justify-center">
            <img src={logo} alt="Logo Prefeitura" className="h-12 w-12" style={{ width: '98px', height: '98px' }} />
          </div>
          <h1 className="text-2xl text-gray-900 mb-2">
            Prefeitura de Aratuípe
          </h1>
          <p className="text-gray-600">
            Consulta Pública de Processos
          </p>
        </div>

        {/* Search Card */}
        <Card>
          <CardHeader>
            <CardTitle>Consultar Processo</CardTitle>
            <CardDescription>
              Digite o número do protocolo para acompanhar seu processo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="protocolo">Número do Protocolo</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    id="protocolo"
                    type="text"
                    placeholder="Ex: 2024/001234"
                    value={protocolo}
                    onChange={(e) => setProtocolo(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Search className="size-4 mr-2" />
                Consultar
              </Button>
            </form>

            <Alert className="mt-4 bg-blue-50 border-blue-200">
              <AlertCircle className="size-4 text-blue-600" />
              <AlertDescription className="text-sm text-blue-800 mt-2">
                <strong>Não é necessário login</strong> para consultas públicas. 
                Para acessar documentos restritos, faça login.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Acesso Rápido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onNavigate('login')}
            >
              <FileText className="size-4 mr-2" />
              Meus Processos
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
            >
              <FileText className="size-4 mr-2" />
              Novo Protocolo Externo
            </Button>
          </CardContent>
        </Card>

        {/* Recent Searches */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Processos Recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {['2024/001234', '2024/001189', '2024/001156'].map((num) => (
              <button
                key={num}
                className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setProtocolo(num);
                  onNavigate('resultado');
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-blue-600">{num}</span>
                  <Search className="size-4 text-gray-400" />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Info */}
        <div className="text-center text-xs text-gray-500 space-y-2">
          <p>
            Sistema de Processos Eletrônicos
          </p>
          <p>
            Suporte para 1.000+ acessos simultâneos
          </p>
          <p className="text-blue-600">
            Dúvidas? Entre em contato: protocolo@aratuipe.gov.br
          </p>
        </div>
      </div>
    </div>
  );
}
