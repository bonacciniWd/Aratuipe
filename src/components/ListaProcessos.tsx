import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface ListaProcessosProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

export function ListaProcessos({ onNavigate, onLogout }: ListaProcessosProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const processos = [
    {
      id: '2024/001234',
      assunto: 'Licitação - Material de Escritório',
      origem: 'Secretaria de Administração',
      destino: 'Compras e Licitações',
      status: 'Em Análise',
      ultimaTramitacao: '02/12/2024 14:30',
      responsavel: 'Maria Santos'
    },
    {
      id: '2024/001235',
      assunto: 'Solicitação de Licença Ambiental',
      origem: 'Secretaria de Meio Ambiente',
      destino: 'Jurídico',
      status: 'Novo',
      ultimaTramitacao: '02/12/2024 10:15',
      responsavel: 'João Silva'
    },
    {
      id: '2024/001236',
      assunto: 'Processo de Pagamento - Fornecedor XYZ',
      origem: 'Compras e Licitações',
      destino: 'Financeiro',
      status: 'Pendente',
      ultimaTramitacao: '01/12/2024 16:45',
      responsavel: 'Pedro Costa'
    },
    {
      id: '2024/001237',
      assunto: 'Renovação de Contrato - Serviços de Limpeza',
      origem: 'Recursos Humanos',
      destino: 'Financeiro',
      status: 'Concluído',
      ultimaTramitacao: '01/12/2024 09:20',
      responsavel: 'Ana Oliveira'
    },
    {
      id: '2024/001238',
      assunto: 'Solicitação de Certidão Negativa',
      origem: 'Atendimento ao Cidadão',
      destino: 'Tributação',
      status: 'Em Análise',
      ultimaTramitacao: '30/11/2024 11:30',
      responsavel: 'Carlos Mendes'
    },
    {
      id: '2024/001239',
      assunto: 'Contratação Emergencial - Manutenção de Vias',
      origem: 'Obras Públicas',
      destino: 'Compras e Licitações',
      status: 'Novo',
      ultimaTramitacao: '30/11/2024 08:00',
      responsavel: 'Fernanda Lima'
    },
    {
      id: '2024/001240',
      assunto: 'Requisição de Material Hospitalar',
      origem: 'Secretaria de Saúde',
      destino: 'Compras e Licitações',
      status: 'Em Análise',
      ultimaTramitacao: '29/11/2024 15:20',
      responsavel: 'Roberto Alves'
    },
    {
      id: '2024/001241',
      assunto: 'Processo Disciplinar - Servidor',
      origem: 'Recursos Humanos',
      destino: 'Jurídico',
      status: 'Pendente',
      ultimaTramitacao: '29/11/2024 13:10',
      responsavel: 'Juliana Reis'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Em Análise': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Pendente': return 'bg-red-100 text-red-700 border-red-200';
      case 'Concluído': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage="lista" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Minhas Tarefas" />
        
        <main className="flex-1 overflow-y-auto p-8">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Processos</CardTitle>
              
              {/* Filters */}
              <div className="flex gap-4 mt-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por número, assunto ou responsável..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select defaultValue="todos">
                  <SelectTrigger className="w-48">
                    <Filter className="size-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="novo">Novo</SelectItem>
                    <SelectItem value="analise">Em Análise</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="recentes">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recentes">Mais Recentes</SelectItem>
                    <SelectItem value="antigos">Mais Antigos</SelectItem>
                    <SelectItem value="prioridade">Por Prioridade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Nº do Processo</TableHead>
                      <TableHead>Assunto</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Destino</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Última Tramitação</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {processos.map((processo) => (
                      <TableRow key={processo.id} className="hover:bg-gray-50">
                        <TableCell>
                          <span className="text-blue-600">{processo.id}</span>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          {processo.assunto}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {processo.origem}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {processo.destino}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(processo.status)} border`}>
                            {processo.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {processo.ultimaTramitacao}
                        </TableCell>
                        <TableCell className="text-sm">
                          {processo.responsavel}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onNavigate('detalhe')}
                          >
                            <Eye className="size-4 mr-2" />
                            Ver
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-600">
                  Mostrando 1 a 8 de 142 processos
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Próximo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
