import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Save, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CadastroUsuarioProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

export function CadastroUsuario({ onNavigate, onLogout }: CadastroUsuarioProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Usuário cadastrado com sucesso!', {
        description: 'O servidor já pode acessar o sistema.'
      });
      onNavigate('config');
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="config" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Cadastro de Usuário Interno" />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => onNavigate('config')}
              className="mb-4"
            >
              <ArrowLeft className="size-4 mr-2" />
              Voltar para Configurações
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="size-5" />
                  Novo Servidor Público
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Dados Pessoais */}
                  <div className="space-y-4">
                    <h3 className="text-lg border-b pb-2">Dados Pessoais</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo *</Label>
                        <Input
                          id="nome"
                          type="text"
                          placeholder="Digite o nome completo"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF *</Label>
                        <Input
                          id="cpf"
                          type="text"
                          placeholder="000.000.000-00"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="matricula">Matrícula *</Label>
                        <Input
                          id="matricula"
                          type="text"
                          placeholder="Número da matrícula"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail Institucional *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="usuario@aratuipe.gov.br"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          type="tel"
                          placeholder="(00) 00000-0000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                        <Input
                          id="dataNascimento"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dados Funcionais */}
                  <div className="space-y-4">
                    <h3 className="text-lg border-b pb-2">Dados Funcionais</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cargo">Cargo *</Label>
                        <Select required>
                          <SelectTrigger id="cargo">
                            <SelectValue placeholder="Selecione o cargo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="secretario">Secretário</SelectItem>
                            <SelectItem value="diretor">Diretor</SelectItem>
                            <SelectItem value="coordenador">Coordenador</SelectItem>
                            <SelectItem value="chefe">Chefe de Setor</SelectItem>
                            <SelectItem value="tecnico">Técnico Administrativo</SelectItem>
                            <SelectItem value="assistente">Assistente</SelectItem>
                            <SelectItem value="auxiliar">Auxiliar Administrativo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="setor">Setor de Lotação *</Label>
                        <Select required>
                          <SelectTrigger id="setor">
                            <SelectValue placeholder="Selecione o setor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administracao">Secretaria de Administração</SelectItem>
                            <SelectItem value="financeiro">Financeiro</SelectItem>
                            <SelectItem value="juridico">Jurídico</SelectItem>
                            <SelectItem value="rh">Recursos Humanos</SelectItem>
                            <SelectItem value="compras">Compras e Licitações</SelectItem>
                            <SelectItem value="obras">Obras Públicas</SelectItem>
                            <SelectItem value="saude">Saúde</SelectItem>
                            <SelectItem value="educacao">Educação</SelectItem>
                            <SelectItem value="meio-ambiente">Meio Ambiente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataAdmissao">Data de Admissão</Label>
                      <Input
                        id="dataAdmissao"
                        type="date"
                        className="max-w-xs"
                      />
                    </div>
                  </div>

                  {/* Permissões e Acesso */}
                  <div className="space-y-4">
                    <h3 className="text-lg border-b pb-2">Nível de Acesso e Permissões</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="perfil">Nível de Acesso/Perfil *</Label>
                        <Select required>
                          <SelectTrigger id="perfil">
                            <SelectValue placeholder="Selecione o perfil" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administrador">
                              <div className="space-y-1">
                                <div>Administrador</div>
                                <div className="text-xs text-gray-500">
                                  Acesso completo ao sistema
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="gestor">
                              <div className="space-y-1">
                                <div>Gestor</div>
                                <div className="text-xs text-gray-500">
                                  Gerencia processos e usuários do setor
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="protocolista">
                              <div className="space-y-1">
                                <div>Protocolista</div>
                                <div className="text-xs text-gray-500">
                                  Cria e tramita processos
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="parecerista">
                              <div className="space-y-1">
                                <div>Parecerista</div>
                                <div className="text-xs text-gray-500">
                                  Emite pareceres e análises
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="assinador">
                              <div className="space-y-1">
                                <div>Assinador</div>
                                <div className="text-xs text-gray-500">
                                  Assina documentos oficiais
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="consulta">
                              <div className="space-y-1">
                                <div>Consulta</div>
                                <div className="text-xs text-gray-500">
                                  Apenas visualização
                                </div>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status do Usuário *</Label>
                        <Select defaultValue="ativo" required>
                          <SelectTrigger id="status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ativo">Ativo</SelectItem>
                            <SelectItem value="inativo">Inativo</SelectItem>
                            <SelectItem value="suspenso">Suspenso</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Observação:</strong> O usuário receberá um e-mail com 
                        instruções para criar sua senha de acesso. O primeiro acesso deverá 
                        ser realizado em até 7 dias.
                      </p>
                    </div>
                  </div>

                  {/* Credenciais Temporárias */}
                  <div className="space-y-4">
                    <h3 className="text-lg border-b pb-2">Credenciais de Acesso</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="senha">Senha Temporária *</Label>
                      <Input
                        id="senha"
                        type="password"
                        placeholder="Digite uma senha temporária"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        O usuário deverá alterar esta senha no primeiro acesso
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
                      <Input
                        id="confirmarSenha"
                        type="password"
                        placeholder="Confirme a senha"
                        required
                      />
                    </div>
                  </div>

                  {/* Legal Notice */}
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>⚠️ Aviso Legal:</strong> Ao cadastrar este usuário, você está 
                      concedendo acesso ao Sistema de Processos Eletrônicos. Certifique-se de 
                      que as informações estão corretas e que o servidor está autorizado a 
                      acessar o sistema, conforme LGPD (Lei 13.709/2018).
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
                        <>Salvando...</>
                      ) : (
                        <>
                          <Save className="size-4 mr-2" />
                          Salvar Usuário
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onNavigate('config')}
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
