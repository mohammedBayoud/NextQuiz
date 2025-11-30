import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, AlertCircle, LogIn, Eye } from 'lucide-react';
import { mockLogs } from '@/data/mockData';
import { format } from 'date-fns';
import { useState } from 'react';

export default function AdminLogs() {
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredLogs = mockLogs.filter(log =>
    typeFilter === 'all' || log.type === typeFilter
  );

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <LogIn className="h-4 w-4" />;
      case 'page_visit':
        return <Eye className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getLogBadge = (type: string) => {
    switch (type) {
      case 'login':
        return <Badge variant="outline">Login</Badge>;
      case 'page_visit':
        return <Badge variant="secondary">Page Visit</Badge>;
      case 'action':
        return <Badge variant="default">Action</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">System Logs</h2>
            <p className="text-muted-foreground">View page visit logs and login attempts</p>
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="login">Logins</SelectItem>
              <SelectItem value="page_visit">Page Visits</SelectItem>
              <SelectItem value="action">Actions</SelectItem>
              <SelectItem value="error">Errors</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activity Logs</CardTitle>
            <CardDescription>System activity and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="mt-1">
                    {getLogIcon(log.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getLogBadge(log.type)}
                      <span className="text-sm font-medium">{log.action}</span>
                    </div>
                    {log.userName && (
                      <p className="text-sm text-muted-foreground">
                        User: {log.userName} ({log.userId})
                      </p>
                    )}
                    {log.details && (
                      <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

