import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, Download, Share2, Archive, Clock, User, Building2 } from 'lucide-react';

interface VisualizacaoProcessoProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

export function VisualizacaoProcesso({ onNavigate, onLogout }: VisualizacaoProcessoProps) {
  const documentos = [
    { id: 1, nome: 'Requerimento Inicial.pdf', tipo: 'PDF', tamanho: '245 KB', data: '28/11/2024' },
    { id: 2, nome: 'Documentação Complementar.pdf', tipo: 'PDF', tamanho: '1.2 MB', data: '29/11/2024' },
    { id: 3, nome: 'Parecer Técnico.pdf', tipo: 'PDF', tamanho: '384 KB', data: '01/12/2024' },
    { id: 4, nome: 'Despacho.pdf', tipo: 'PDF', tamanho: '156 KB', data: '02/12/2024' },
  ];

  const tramitacao = [
    {
      data: '02/12/2024 14:30',
      usuario: 'Maria Santos',
      setor: 'Compras e Licitações',
      acao: 'Processo recebido para análise',
      descricao: 'Processo encaminhado para verificação de conformidade com a Lei 8.666/93'
    },
    {
      data: '01/12/2024 16:45',
      usuario: 'João Silva',
      setor: 'Secretaria de Administração',
      acao: 'Documento complementar anexado',
      descricao: 'Adicionado parecer técnico do setor de orçamento'
    },
    {
      data: '29/11/2024 10:20',
      usuario: 'Pedro Costa',
      setor: 'Secretaria de Administração',
      acao: 'Processo tramitado',
      descricao: 'Encaminhado para o setor de Compras e Licitações'
    },
    {
      data: '28/11/2024 09:15',
      usuario: 'João Silva',
      setor: 'Secretaria de Administração',
      acao: 'Processo criado',
      descricao: 'Processo iniciado com a solicitação de licitação para material de escritório'
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="lista" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Visualização do Processo" />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* Process Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl text-blue-600">2024/001234</h2>
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 border">
                      Em Análise
                    </Badge>
                  </div>
                  <h3 className="text-xl mb-4">Licitação - Material de Escritório</h3>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Data de Abertura</p>
                      <p className="text-gray-900">28/11/2024</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Setor Atual</p>
                      <p className="text-gray-900">Compras e Licitações</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Responsável</p>
                      <p className="text-gray-900">Maria Santos</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="size-4 mr-2" />
                    Compartilhar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="size-4 mr-2" />
                    Arquivar
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    size="sm"
                    onClick={() => onNavigate('assinatura')}
                  >
                    <FileText className="size-4 mr-2" />
                    Assinar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5" />
                  Documentos Anexos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documentos.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="size-4 text-blue-600" />
                            <span className="text-sm text-gray-900">{doc.nome}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {doc.tamanho} • {doc.data}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  Adicionar Documento
                </Button>
              </CardContent>
            </Card>

            {/* Column 2: Timeline */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="size-5" />
                  Linha do Tempo de Tramitação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {tramitacao.map((item, index) => (
                    <div key={index} className="relative pl-8 pb-8 last:pb-0">
                      {/* Timeline line */}
                      {index !== tramitacao.length - 1 && (
                        <div className="absolute left-2.5 top-8 bottom-0 w-0.5 bg-gray-200" />
                      )}
                      
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1 size-5 rounded-full bg-blue-600 border-4 border-white shadow" />
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-gray-900">{item.acao}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              {item.data}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          {item.descricao}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="size-3" />
                            {item.usuario}
                          </div>
                          <div className="flex items-center gap-1">
                            <Building2 className="size-3" />
                            {item.setor}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Process Details */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Detalhes do Processo</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="dados">
                <TabsList>
                  <TabsTrigger value="dados">Dados Gerais</TabsTrigger>
                  <TabsTrigger value="descricao">Descrição</TabsTrigger>
                  <TabsTrigger value="metadados">Metadados</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dados" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Tipo de Processo</p>
                      <p className="text-gray-900">Licitação</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Prioridade</p>
                      <p className="text-gray-900">Normal</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Setor de Origem</p>
                      <p className="text-gray-900">Secretaria de Administração</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Prazo Estimado</p>
                      <p className="text-gray-900">15 dias úteis</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="descricao" className="mt-4">
                  <p className="text-gray-700">
                    Processo de licitação para aquisição de material de escritório para diversas 
                    secretarias da Prefeitura Municipal de Aratuípe. Modalidade: Pregão Eletrônico. 
                    Valor estimado: R$ 45.000,00. Os materiais incluem papéis, canetas, pastas, 
                    grampeadores e demais itens de consumo regular. A licitação seguirá os 
                    procedimentos estabelecidos pela Lei 8.666/93 e Lei 10.520/02.
                  </p>
                </TabsContent>
                
                <TabsContent value="metadados" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">ID do Sistema</p>
                      <p className="text-gray-900">PROC-2024-001234-ADM</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hash do Documento</p>
                      <p className="text-gray-900 text-sm font-mono">a3f5b2c8d9e1...</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Última Modificação</p>
                      <p className="text-gray-900">02/12/2024 14:30:45</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nível de Acesso</p>
                      <p className="text-gray-900">Público</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
