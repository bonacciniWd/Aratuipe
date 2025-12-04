import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Upload, Key, Lock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface GestaoCredenciaisProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

export function GestaoCredenciais({ onNavigate, onLogout }: GestaoCredenciaisProps) {
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificateFile(e.target.files[0]);
      toast.success('Certificado carregado com sucesso!');
    }
  };

  const handleTestSignature = () => {
    setIsTesting(true);
    
    setTimeout(() => {
      setIsTesting(false);
      toast.success('Teste de assinatura realizado com sucesso!', {
        description: 'Seu certificado está funcionando corretamente.'
      });
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="config" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Gestão de Credenciais de Assinatura" />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => onNavigate('config')}
              className="mb-4"
            >
              <ArrowLeft className="size-4 mr-2" />
              Voltar para Configurações
            </Button>

            {/* Current Certificate Status */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="size-5" />
                  Status do Certificado Digital
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-600 p-3 rounded-full">
                      <CheckCircle className="size-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg text-green-900">Certificado Ativo</h3>
                      <div className="space-y-1 text-sm text-green-700">
                        <p><strong>Titular:</strong> Maria Santos</p>
                        <p><strong>CPF:</strong> 123.456.789-00</p>
                        <p><strong>Tipo:</strong> A3 (Token/Smartcard)</p>
                        <p><strong>Autoridade Certificadora:</strong> Serpro</p>
                        <p><strong>Emissão:</strong> 15/06/2023</p>
                        <p><strong>Validade:</strong> 15/06/2025</p>
                      </div>
                      <Badge className="bg-green-700 text-white mt-2">
                        Válido por 186 dias
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleTestSignature}
                    disabled={isTesting}
                  >
                    {isTesting ? (
                      <>
                        <div className="size-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                        Testando...
                      </>
                    ) : (
                      <>
                        <Key className="size-4 mr-2" />
                        Testar Assinatura
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vincular Novo Certificado */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Vincular Novo Certificado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-blue-50 border-blue-200">
                  <Lock className="size-4 text-blue-600" />
                  <AlertDescription className="text-sm text-blue-800 mt-2">
                    <strong>Importante:</strong> Para vincular um novo certificado digital, 
                    você precisará do arquivo do certificado (.pfx ou .p12) e da senha de 
                    proteção da chave privada.
                  </AlertDescription>
                </Alert>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="certificate-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pfx,.p12"
                  />
                  <label htmlFor="certificate-upload" className="cursor-pointer">
                    <Upload className="size-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-700">
                      Clique para fazer upload do certificado
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Arquivos .pfx ou .p12 (máx. 5MB)
                    </p>
                  </label>
                </div>

                {certificateFile && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="size-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-900">{certificateFile.name}</p>
                          <p className="text-xs text-gray-500">
                            {(certificateFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCertificateFile(null)}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Shield className="size-4 mr-2" />
                  Vincular Certificado
                </Button>
              </CardContent>
            </Card>

            {/* Security Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Segurança e Boas Práticas</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="bg-red-50 border-red-200 mb-4">
                  <AlertTriangle className="size-4 text-red-600" />
                  <AlertDescription className="text-sm text-red-800 mt-2">
                    <strong>⚠️ Alerta de Segurança sobre Chaves Privadas</strong>
                    <p className="mt-2">
                      NUNCA compartilhe sua senha de certificado digital ou chave privada com 
                      outras pessoas. A prefeitura NUNCA solicitará essas informações por 
                      e-mail ou telefone.
                    </p>
                  </AlertDescription>
                </Alert>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Mantenha seu certificado seguro</strong>
                      <p className="text-gray-600 mt-1">
                        Guarde seu token/smartcard em local seguro quando não estiver em uso.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Use senhas fortes</strong>
                      <p className="text-gray-600 mt-1">
                        A senha do certificado deve ter no mínimo 8 caracteres com letras, 
                        números e símbolos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Monitore a validade</strong>
                      <p className="text-gray-600 mt-1">
                        Renove seu certificado antes do vencimento para evitar interrupções.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Use apenas em computadores confiáveis</strong>
                      <p className="text-gray-600 mt-1">
                        Não utilize seu certificado em computadores públicos ou não seguros.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Revogue em caso de perda</strong>
                      <p className="text-gray-600 mt-1">
                        Se perder seu token ou houver suspeita de comprometimento, revogue 
                        imediatamente o certificado.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certificate Types Info */}
            <Card>
              <CardHeader>
                <CardTitle>Tipos de Certificado ICP-Brasil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <Badge className="bg-blue-100 text-blue-700 mb-2">A1</Badge>
                    <h4 className="text-sm mb-2">Certificado A1</h4>
                    <p className="text-xs text-gray-600">
                      Armazenado em arquivo. Validade de 1 ano. Maior praticidade, 
                      menor segurança.
                    </p>
                  </div>

                  <div className="p-4 border-2 border-green-500 bg-green-50 rounded-lg">
                    <Badge className="bg-green-600 text-white mb-2">A3 (Recomendado)</Badge>
                    <h4 className="text-sm mb-2">Certificado A3</h4>
                    <p className="text-xs text-gray-600">
                      Armazenado em token/smartcard. Validade de 1-5 anos. Maior segurança, 
                      recomendado para documentos oficiais.
                    </p>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <Badge className="bg-purple-100 text-purple-700 mb-2">Cloud</Badge>
                    <h4 className="text-sm mb-2">Certificado em Nuvem</h4>
                    <p className="text-xs text-gray-600">
                      Armazenado em HSM remoto. Acesso via internet. Combina praticidade 
                      e segurança.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Info */}
            <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-600">
              <p>
                <strong>Base Legal:</strong>
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>MP 2.200-2/2001 - Institui a Infraestrutura de Chaves Públicas Brasileira (ICP-Brasil)</li>
                <li>Lei 11.419/2006 - Informatização do processo judicial</li>
                <li>Decreto 10.543/2020 - Gov.br e assinatura eletrônica</li>
                <li>LGPD Lei 13.709/2018 - Proteção de dados pessoais</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
