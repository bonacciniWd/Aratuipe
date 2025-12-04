import { Bell, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-900">{title}</h1>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-5 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 bg-red-500">
              3
            </Badge>
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <div className="text-sm text-gray-900">João Silva</div>
              <div className="text-xs text-gray-500">Servidor Público</div>
            </div>
            <Avatar>
              <AvatarFallback className="bg-blue-600 text-white">
                <User className="size-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
