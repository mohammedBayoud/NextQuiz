import { useState } from 'react';
import { TeacherLayout } from '@/components/layouts/TeacherLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Video, Clock, Copy, ExternalLink } from 'lucide-react';
import { mockLiveSessions, mockCourses } from '@/data/mockData';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function TeacherLiveSessions() {
  const [sessions, setSessions] = useState(mockLiveSessions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Session link copied to clipboard!');
  };

  const handleCreateSession = () => {
    toast.success('Live session created (placeholder)');
    setIsDialogOpen(false);
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Live Sessions</h2>
            <p className="text-muted-foreground">Schedule and manage live teaching sessions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Live Session</DialogTitle>
                <DialogDescription>Schedule a new live teaching session</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Session Title</Label>
                  <Input placeholder="Enter session title" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Enter session description" rows={3} />
                </div>
                <div>
                  <Label>Date & Time</Label>
                  <Input type="datetime-local" />
                </div>
                <div>
                  <Label>Duration (minutes)</Label>
                  <Input type="number" placeholder="60" />
                </div>
                <Button className="w-full" onClick={handleCreateSession}>
                  Create Session
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.map((session) => {
            const course = mockCourses.find(c => c.id === session.courseId);
            const isUpcoming = session.status === 'upcoming';
            const sessionDate = new Date(session.scheduledAt);
            const now = new Date();
            const timeUntil = sessionDate.getTime() - now.getTime();
            const daysUntil = Math.floor(timeUntil / (1000 * 60 * 60 * 24));
            const hoursUntil = Math.floor((timeUntil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            return (
              <Card key={session.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{session.title}</CardTitle>
                      <CardDescription className="mt-1">{course?.name || 'Unknown Course'}</CardDescription>
                    </div>
                    <Badge variant={isUpcoming ? 'default' : 'secondary'}>
                      {session.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground">{session.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{format(sessionDate, 'MMM dd, yyyy HH:mm')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Video className="h-4 w-4" />
                      <span>Duration: {session.duration} minutes</span>
                    </div>
                    {isUpcoming && (
                      <div className="text-sm font-medium text-primary">
                        {daysUntil > 0
                          ? `${daysUntil} day${daysUntil > 1 ? 's' : ''} until session`
                          : `${hoursUntil} hour${hoursUntil > 1 ? 's' : ''} until session`}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Input
                      value={session.link}
                      readOnly
                      className="flex-1 font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopyLink(session.link)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href={session.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  {session.attendees !== undefined && (
                    <p className="text-sm text-muted-foreground">
                      {session.attendees} {session.attendees === 1 ? 'attendee' : 'attendees'} registered
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </TeacherLayout>
  );
}

