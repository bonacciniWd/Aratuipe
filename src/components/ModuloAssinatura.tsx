import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { CheckCircle, FileText, Shield, AlertTriangle, Lock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ModuloAssinaturaProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

export function ModuloAssinatura({ onNavigate, onLogout }: ModuloAssinaturaProps) {
  const [isSigning, setIsSigning] = useState(false);
  const [signed, setSigned] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSignClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmSign = () => {
    setShowConfirmDialog(false);
    setIsSigning(true);
    
    // Simulate signing process
    setTimeout(() => {
      setIsSigning(false);
      setSigned(true);
      toast.success('Documento assinado com sucesso!', {
        description: 'A assinatura digital foi validada e registrada no sistema.'
      });
    }, 3000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="assinatura" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Módulo de Assinatura Digital" />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            {/* Process Info */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl text-blue-600">2024/001234</h2>
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 border">
                        Aguardando Assinatura
                      </Badge>
                    </div>
                    <h3 className="text-xl">Licitação - Material de Escritório</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Document Preview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="size-5" />
                    Documento para Assinatura
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* PDF Preview Simulation */}
                  <div className="border-2 border-gray-200 rounded-lg bg-white p-8 min-h-[600px]">
                    <div className="space-y-4">
                      <div className="text-center mb-8">
                        <h3 className="text-xl">DESPACHO Nº 234/2024</h3>
                        <p className="text-sm text-gray-500 mt-2">
                          Prefeitura Municipal de Aratuípe
                        </p>
                      </div>

                      <div className="space-y-4 text-gray-700">
                        <p>
                          <strong>Processo nº:</strong> 2024/001234
                        </p>
                        <p>
                          <strong>Assunto:</strong> Licitação - Material de Escritório
                        </p>
                        <p>
                          <strong>Interessado:</strong> Secretaria de Administração
                        </p>

                        <div className="my-6 border-t border-gray-300" />

                        <p className="text-justify">
                          Aprovo o processo licitatório na modalidade Pregão Eletrônico para 
                          aquisição de material de escritório, conforme especificações técnicas 
                          anexas ao presente processo.
                        </p>

                        <p className="text-justify">
                          O valor estimado da contratação é de R$ 45.000,00 (quarenta e cinco 
                          mil reais), em conformidade com a pesquisa de preços realizada e 
                          constante dos autos.
                        </p>

                        <p className="text-justify">
                          A despesa correrá por conta da dotação orçamentária nº 3390.30.00 
                          do exercício corrente.
                        </p>

                        <p className="text-justify">
                          Encaminhe-se ao setor de Compras e Licitações para as providências 
                          cabíveis, observando-se os prazos e procedimentos estabelecidos pela 
                          Lei 8.666/93 e Lei 10.520/02.
                        </p>

                        <div className="mt-12">
                          <p>Aratuípe, 02 de dezembro de 2024.</p>
                        </div>

                        {signed && (
                          <div className="mt-8 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                            <div className="flex items-center gap-2 text-green-700 mb-2">
                              <CheckCircle className="size-5" />
                              <strong>Documento Assinado Digitalmente</strong>
                            </div>
                            <p className="text-sm text-green-600">
                              Assinado por: Maria Santos (CPF: 123.456.789-00)
                            </p>
                            <p className="text-sm text-green-600">
                              Data/Hora: 04/12/2024 às 10:34:52
                            </p>
                            <p className="text-sm text-green-600 font-mono mt-2">
                              Hash: 8f4a3b2c1d9e7f6a5b4c3d2e1f0a9b8c
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Signature Panel */}
              <div className="space-y-6">
                {/* Legal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="size-5" />
                      Informações Legais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="bg-blue-50 border-blue-200">
                      <Lock className="size-4 text-blue-600" />
                      <AlertDescription className="text-sm text-blue-800 mt-2">
                        <strong>Validade Jurídica</strong>
                        <p className="mt-2">
                          As assinaturas digitais realizadas com certificado ICP-Brasil têm 
                          a mesma validade jurídica de documentos assinados fisicamente, 
                          conforme MP 2.200-2/2001.
                        </p>
                      </AlertDescription>
                    </Alert>

                    <div className="text-sm space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-green-600 mt-0.5" />
                        <p className="text-gray-700">
                          Certificado Digital ICP-Brasil
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-green-600 mt-0.5" />
                        <p className="text-gray-700">
                          Registro em Blockchain
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-green-600 mt-0.5" />
                        <p className="text-gray-700">
                          Carimbo de Tempo Confiável
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-green-600 mt-0.5" />
                        <p className="text-gray-700">
                          Conformidade com e-PING
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Signature Action */}
                <Card>
                  <CardHeader>
                    <CardTitle>Assinar Documento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!signed ? (
                      <>
                        <Alert className="bg-yellow-50 border-yellow-200">
                          <AlertTriangle className="size-4 text-yellow-600" />
                          <AlertDescription className="text-sm text-yellow-800 mt-2">
                            Certifique-se de que leu todo o documento antes de assinar.
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-2 text-sm">
                          <p className="text-gray-700">
                            <strong>Tipo de Assinatura:</strong> Certificado A3
                          </p>
                          <p className="text-gray-700">
                            <strong>Autoridade Certificadora:</strong> Serpro
                          </p>
                          <p className="text-gray-700">
                            <strong>Validade:</strong> Até 15/06/2025
                          </p>
                        </div>

                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          size="lg"
                          onClick={handleSignClick}
                          disabled={isSigning}
                        >
                          {isSigning ? (
                            <>
                              <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Assinando...
                            </>
                          ) : (
                            <>
                              <Shield className="size-5 mr-2" />
                              Assinar com Certificado Digital
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-center text-gray-500">
                          Ao assinar, você concorda com os termos e confirma a autenticidade 
                          do documento
                        </p>
                      </>
                    ) : (
                      <>
                        <Alert className="bg-green-50 border-green-200">
                          <CheckCircle className="size-4 text-green-600" />
                          <AlertDescription className="text-sm text-green-800 mt-2">
                            <strong>Documento Assinado com Sucesso!</strong>
                            <p className="mt-2">
                              A assinatura foi registrada e o documento foi enviado para o 
                              próximo tramitador.
                            </p>
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => onNavigate('detalhe')}
                          >
                            Ver Processo
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => onNavigate('lista')}
                          >
                            Voltar à Lista
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Additional Info */}
                <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-600">
                  <p>
                    <strong>Legislação aplicável:</strong>
                  </p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>MP 2.200-2/2001 (ICP-Brasil)</li>
                    <li>Lei 11.419/2006 (Processo Eletrônico)</li>
                    <li>Decreto 10.543/2020 (Gov.br)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Confirm Sign Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <AlertTriangle className="size-6 text-yellow-600" />
                </div>
                <DialogTitle>Confirmação Crítica de Assinatura</DialogTitle>
              </div>
              <DialogDescription className="text-base pt-2">
                <strong className="text-red-600">Atenção:</strong> Ao clicar em 'Assinar', você confirma que:
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertDescription className="text-sm text-gray-700">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      Possui <strong>Certificado Digital ICP-Brasil válido</strong>
                    </li>
                    <li>
                      Confere <strong>validade jurídica</strong> a este documento
                    </li>
                    <li>
                      Está ciente da <strong>MP 2.200-2/2001</strong> (ICP-Brasil)
                    </li>
                    <li>
                      Leu e compreendeu <strong>todo o conteúdo</strong> do documento
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>⚠️ Aviso Legal:</strong> A assinatura digital possui a mesma validade 
                  jurídica de documentos assinados fisicamente, conforme MP 2.200-2/2001. 
                  Esta ação não pode ser desfeita.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleConfirmSign}
              >
                <Shield className="size-4 mr-2" />
                Confirmar e Assinar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}