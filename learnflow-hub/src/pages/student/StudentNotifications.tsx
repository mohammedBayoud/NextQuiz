import { useState } from 'react';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle2, BookOpen, FileText, ClipboardList, GraduationCap, MessageSquare } from 'lucide-react';
import { mockNotifications } from '@/data/mockData';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function StudentNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-5 w-5 text-primary" />;
      case 'assignment':
        return <FileText className="h-5 w-5 text-secondary" />;
      case 'exam':
        return <ClipboardList className="h-5 w-5 text-destructive" />;
      case 'grade':
        return <GraduationCap className="h-5 w-5 text-success" />;
      case 'announcement':
        return <Bell className="h-5 w-5 text-accent" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'course':
        return <Badge variant="outline">Course</Badge>;
      case 'assignment':
        return <Badge variant="secondary">Assignment</Badge>;
      case 'exam':
        return <Badge variant="destructive">Exam</Badge>;
      case 'grade':
        return <Badge variant="default">Grade</Badge>;
      case 'announcement':
        return <Badge variant="outline">Announcement</Badge>;
      default:
        return null;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Notifications</h2>
            <p className="text-muted-foreground">Stay updated with your course activities</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                </div>
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Read</p>
                  <p className="text-2xl font-bold">{notifications.filter((n) => n.read).length}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                </div>
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>View all your notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    notification.read
                      ? 'bg-card hover:bg-muted/50'
                      : 'bg-primary/5 border-primary/20 hover:bg-primary/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <h4 className="font-semibold">{notification.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {getNotificationBadge(notification.type)}
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(notification.createdAt), 'MMM dd, yyyy HH:mm')}
                            </span>
                          </div>
                        </div>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-foreground mt-2">{notification.message}</p>
                      {notification.link && (
                        <Button variant="link" size="sm" className="mt-2 p-0 h-auto" asChild>
                          <Link to={notification.link}>View details →</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {notifications.length === 0 && (
              <div className="text-center py-12">
                <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">You're all caught up!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}

