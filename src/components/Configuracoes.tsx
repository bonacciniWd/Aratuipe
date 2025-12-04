import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Users, Workflow, FileText, Edit, Trash2, Plus, Key } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface ConfiguracoesProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

export function Configuracoes({ onNavigate, onLogout }: ConfiguracoesProps) {
  const usuarios = [
    { id: 1, nome: 'João Silva', email: 'joao.silva@aratuipe.gov.br', setor: 'Secretaria de Administração', perfil: 'Administrador', ativo: true },
    { id: 2, nome: 'Maria Santos', email: 'maria.santos@aratuipe.gov.br', setor: 'Compras e Licitações', perfil: 'Gestor', ativo: true },
    { id: 3, nome: 'Pedro Costa', email: 'pedro.costa@aratuipe.gov.br', setor: 'Financeiro', perfil: 'Usuário', ativo: true },
    { id: 4, nome: 'Ana Oliveira', email: 'ana.oliveira@aratuipe.gov.br', setor: 'Recursos Humanos', perfil: 'Gestor', ativo: true },
    { id: 5, nome: 'Carlos Mendes', email: 'carlos.mendes@aratuipe.gov.br', setor: 'Tributação', perfil: 'Usuário', ativo: false },
  ];

  const workflows = [
    { id: 1, nome: 'Processo de Licitação', etapas: 5, tipo: 'Compras', ativo: true },
    { id: 2, nome: 'Solicitação de Pagamento', etapas: 4, tipo: 'Financeiro', ativo: true },
    { id: 3, nome: 'Licença Ambiental', etapas: 6, tipo: 'Meio Ambiente', ativo: true },
    { id: 4, nome: 'Processo Disciplinar', etapas: 7, tipo: 'RH', ativo: false },
  ];

  const modelos = [
    { id: 1, nome: 'Despacho Padrão', tipo: 'Despacho', categoria: 'Geral' },
    { id: 2, nome: 'Parecer Técnico', tipo: 'Parecer', categoria: 'Técnico' },
    { id: 3, nome: 'Ofício Externo', tipo: 'Ofício', categoria: 'Comunicação' },
    { id: 4, nome: 'Termo de Homologação', tipo: 'Termo', categoria: 'Licitação' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="config" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Configurações e Administração" />
        
        <main className="flex-1 overflow-y-auto p-8">
          <Tabs defaultValue="usuarios" className="space-y-6">
            <TabsList>
              <TabsTrigger value="usuarios" className="gap-2">
                <Users className="size-4" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="workflows" className="gap-2">
                <Workflow className="size-4" />
                Fluxos de Trabalho
              </TabsTrigger>
              <TabsTrigger value="modelos" className="gap-2">
                <FileText className="size-4" />
                Modelos de Documentos
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="usuarios">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Gestão de Usuários</CardTitle>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => onNavigate('cadastro-usuario')}
                    >
                      <Plus className="size-4 mr-2" />
                      Novo Usuário
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input placeholder="Buscar usuário..." />
                  </div>

                  <div className="mb-4">
                    <Button 
                      variant="outline"
                      onClick={() => onNavigate('gestao-credenciais')}
                    >
                      <Key className="size-4 mr-2" />
                      Gestão de Credenciais
                    </Button>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Nome</TableHead>
                          <TableHead>E-mail</TableHead>
                          <TableHead>Setor</TableHead>
                          <TableHead>Perfil</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usuarios.map((usuario) => (
                          <TableRow key={usuario.id}>
                            <TableCell>{usuario.nome}</TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {usuario.email}
                            </TableCell>
                            <TableCell className="text-sm">
                              {usuario.setor}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {usuario.perfil}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={usuario.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                                {usuario.ativo ? 'Ativo' : 'Inativo'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="size-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="size-4 text-red-600" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Workflows Tab */}
            <TabsContent value="workflows">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Fluxos de Trabalho</CardTitle>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="size-4 mr-2" />
                      Novo Fluxo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workflows.map((workflow) => (
                      <div
                        key={workflow.id}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-gray-900">{workflow.nome}</h4>
                              <Badge className={workflow.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                                {workflow.ativo ? 'Ativo' : 'Inativo'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Tipo: {workflow.tipo}</span>
                              <span>•</span>
                              <span>{workflow.etapas} etapas</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="size-4 mr-2" />
                              Editar
                            </Button>
                            <Button variant="ghost" size="sm">
                              Visualizar
                            </Button>
                          </div>
                        </div>

                        {/* Workflow Visual */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 overflow-x-auto">
                            {Array.from({ length: workflow.etapas }).map((_, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="flex flex-col items-center">
                                  <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                                    {i + 1}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                                    Etapa {i + 1}
                                  </div>
                                </div>
                                {i < workflow.etapas - 1 && (
                                  <div className="h-0.5 w-12 bg-blue-300" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="modelos">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Modelos de Documentos</CardTitle>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="size-4 mr-2" />
                      Novo Modelo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modelos.map((modelo) => (
                      <div
                        key={modelo.id}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <FileText className="size-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-900 mb-1">{modelo.nome}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Badge variant="outline" className="text-xs">
                                {modelo.tipo}
                              </Badge>
                              <span>{modelo.categoria}</span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="size-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="size-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}