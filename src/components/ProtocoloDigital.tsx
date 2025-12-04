import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Upload, FileText, X, CheckCircle, Info } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProtocoloDigitalProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

export function ProtocoloDigital({ onNavigate, onLogout }: ProtocoloDigitalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Processo protocolado com sucesso!', {
        description: 'Número do protocolo: 2024/001239'
      });
      onNavigate('lista');
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="protocolo" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Novo Protocolo Digital" />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Criar Novo Processo</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Tipo de Processo */}
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Processo *</Label>
                    <Select required>
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="licitacao">Licitação</SelectItem>
                        <SelectItem value="licenca">Licença Ambiental</SelectItem>
                        <SelectItem value="pagamento">Processo de Pagamento</SelectItem>
                        <SelectItem value="contrato">Renovação de Contrato</SelectItem>
                        <SelectItem value="certidao">Certidão</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Assunto */}
                  <div className="space-y-2">
                    <Label htmlFor="assunto">Assunto *</Label>
                    <Input
                      id="assunto"
                      type="text"
                      placeholder="Digite o assunto do processo"
                      required
                    />
                  </div>

                  {/* Descrição */}
                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição *</Label>
                    <Textarea
                      id="descricao"
                      placeholder="Descreva detalhadamente o processo e as ações necessárias"
                      rows={6}
                      required
                    />
                  </div>

                  {/* Setor de Destino */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="setor">Setor de Destino *</Label>
                      <Select required>
                        <SelectTrigger id="setor">
                          <SelectValue placeholder="Selecione o setor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="financeiro">Financeiro</SelectItem>
                          <SelectItem value="juridico">Jurídico</SelectItem>
                          <SelectItem value="rh">Recursos Humanos</SelectItem>
                          <SelectItem value="compras">Compras e Licitações</SelectItem>
                          <SelectItem value="obras">Obras Públicas</SelectItem>
                          <SelectItem value="saude">Saúde</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prioridade">Prioridade</Label>
                      <Select defaultValue="normal">
                        <SelectTrigger id="prioridade">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baixa">Baixa</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="alta">Alta</SelectItem>
                          <SelectItem value="urgente">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Upload de Documentos */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Label>Documentos Anexos</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="text-blue-600 hover:text-blue-700">
                              <Info className="size-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-sm">
                            <div className="space-y-2">
                              <p className="text-sm">
                                <strong>Tipos de arquivo aceitos:</strong>
                              </p>
                              <ul className="text-xs space-y-1 list-disc list-inside">
                                <li>PDF (Portable Document Format)</li>
                                <li>DOCX (Microsoft Word)</li>
                                <li>ODT (OpenDocument Text)</li>
                                <li>JPG, PNG (Imagens)</li>
                              </ul>
                              <p className="text-xs mt-2">
                                <strong>Limite de tamanho:</strong> 100MB por arquivo
                              </p>
                              <p className="text-xs text-yellow-600 mt-2">
                                ⚠️ Certifique-se de que os documentos estão legíveis e não contêm informações sigilosas inadequadas para este processo.
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileChange}
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.png"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="size-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-700">
                          Clique para fazer upload ou arraste arquivos aqui
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          PDF, DOC, DOCX, JPG, PNG (máx. 10MB por arquivo)
                        </p>
                      </label>
                    </div>

                    {/* Lista de Arquivos */}
                    {files.length > 0 && (
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="size-5 text-blue-600" />
                              <div>
                                <div className="text-sm text-gray-900">{file.name}</div>
                                <div className="text-xs text-gray-500">
                                  {(file.size / 1024).toFixed(2)} KB
                                </div>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="size-4 text-red-600" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Informativo Legal */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Informação Legal:</strong> Todos os documentos e processos são 
                      protegidos pela Lei de Acesso à Informação (Lei 12.527/2011) e pela 
                      LGPD (Lei 13.709/2018). Os arquivos devem estar em conformidade com 
                      as normas do processo eletrônico nacional.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Protocolando...</>
                      ) : (
                        <>
                          <CheckCircle className="size-4 mr-2" />
                          Protocolar Processo
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onNavigate('dashboard')}
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}