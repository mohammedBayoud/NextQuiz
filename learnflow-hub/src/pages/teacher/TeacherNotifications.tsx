import { TeacherLayout } from '@/components/layouts/TeacherLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Bell, Send, Plus } from 'lucide-react';
import { mockNotifications } from '@/data/mockData';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function TeacherNotifications() {
  const handleSendAnnouncement = () => {
    toast.success('Announcement sent (placeholder)');
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Notifications</h2>
            <p className="text-muted-foreground">Send announcements and view replies</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Send Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Announcement</DialogTitle>
                <DialogDescription>Create and send an announcement to your students</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input placeholder="Enter announcement title" />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea placeholder="Enter your announcement message" rows={5} />
                </div>
                <div>
                  <Label>Send to</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="course">Specific Course</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSendAnnouncement} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Your sent announcements and student replies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockNotifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(notification.createdAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-3">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">0 replies</span>
                    <Button variant="outline" size="sm">
                      View Replies
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}

