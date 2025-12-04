import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, FileText, Clock, CheckCircle, Building2, User, ChevronDown, ChevronUp } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface ResultadoConsultaProps {
  onNavigate: (page: any) => void;
}

export function ResultadoConsulta({ onNavigate }: ResultadoConsultaProps) {
  const [historicoExpanded, setHistoricoExpanded] = useState(false);

  const tramitacao = [
    {
      data: '02/12/2024',
      hora: '14:30',
      setor: 'Compras e Licitações',
      acao: 'Processo recebido para análise',
    },
    {
      data: '01/12/2024',
      hora: '16:45',
      setor: 'Secretaria de Administração',
      acao: 'Documento complementar anexado',
    },
    {
      data: '29/11/2024',
      hora: '10:20',
      setor: 'Secretaria de Administração',
      acao: 'Processo tramitado',
    },
    {
      data: '28/11/2024',
      hora: '09:15',
      setor: 'Secretaria de Administração',
      acao: 'Processo criado',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="space-y-4 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('consulta')}
            className="p-2"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-xl text-gray-900">
            Resultado da Consulta
          </h1>
        </div>

        {/* Status Card */}
        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-yellow-100 mb-3">
                <Clock className="size-8 text-yellow-600" />
              </div>
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 border text-base px-4 py-1">
                Em Análise
              </Badge>
            </div>

            <div className="space-y-3 text-center">
              <div>
                <p className="text-sm text-gray-500">Número do Processo</p>
                <p className="text-2xl text-blue-600">2024/001234</p>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <p className="text-gray-900">
                  Licitação - Material de Escritório
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações do Processo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FileText className="size-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Tipo</p>
                <p className="text-gray-900">Licitação</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="size-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Data de Abertura</p>
                <p className="text-gray-900">28/11/2024</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Building2 className="size-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Setor Atual</p>
                <p className="text-gray-900">Compras e Licitações</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="size-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Responsável</p>
                <p className="text-gray-900">Maria Santos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Histórico de Tramitação</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHistoricoExpanded(!historicoExpanded)}
              >
                {historicoExpanded ? (
                  <ChevronUp className="size-5" />
                ) : (
                  <ChevronDown className="size-5" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(historicoExpanded ? tramitacao : tramitacao.slice(0, 2)).map((item, index) => (
                <div key={index} className="relative pl-8 pb-4 last:pb-0">
                  {/* Timeline line */}
                  {index !== (historicoExpanded ? tramitacao.length - 1 : 1) && (
                    <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200" />
                  )}
                  
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1 size-4 rounded-full border-2 border-white shadow ${
                    index === 0 ? 'bg-blue-600' : 'bg-gray-400'
                  }`} />
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-gray-900">{item.acao}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{item.data}</span>
                      <span>•</span>
                      <span>{item.hora}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.setor}</p>
                  </div>
                </div>
              ))}

              {!historicoExpanded && tramitacao.length > 2 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setHistoricoExpanded(true)}
                >
                  Ver mais {tramitacao.length - 2} movimentações
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Alert */}
        <Alert className="bg-blue-50 border-blue-200">
          <CheckCircle className="size-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-800 mt-2">
            <strong>Consulta Pública</strong>
            <p className="mt-1">
              Esta consulta não requer login. Para acessar documentos restritos ou 
              acompanhar processos protocolados por você, faça login no sistema.
            </p>
          </AlertDescription>
        </Alert>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onNavigate('login')}
          >
            Fazer Login para Ver Documentos
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onNavigate('consulta')}
          >
            Nova Consulta
          </Button>
        </div>

        {/* Footer Info */}
        <div className="pt-4 text-center space-y-2">
          <p className="text-xs text-gray-500">
            Última atualização: 02/12/2024 às 14:30
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="size-2 rounded-full bg-green-500" />
            <p className="text-xs text-gray-600">
              Sistema operando normalmente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
