import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText, ClipboardList, Video } from 'lucide-react';
import { mockCalendarEvents, mockCourses } from '@/data/mockData';
import { format, isSameDay } from 'date-fns';
import { Link } from 'react-router-dom';

export default function StudentCalendar() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <FileText className="h-4 w-4" />;
      case 'exam':
        return <ClipboardList className="h-4 w-4" />;
      case 'lesson':
        return <FileText className="h-4 w-4" />;
      case 'live_session':
        return <Video className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'assignment':
        return <Badge variant="outline" className="gap-1"><FileText className="h-3 w-3" />Assignment</Badge>;
      case 'exam':
        return <Badge variant="destructive" className="gap-1"><ClipboardList className="h-3 w-3" />Exam</Badge>;
      case 'lesson':
        return <Badge variant="secondary" className="gap-1"><FileText className="h-3 w-3" />Lesson</Badge>;
      case 'live_session':
        return <Badge variant="default" className="gap-1"><Video className="h-3 w-3" />Live Session</Badge>;
      default:
        return null;
    }
  };

  // Group events by date
  const eventsByDate = mockCalendarEvents.reduce((acc, event) => {
    const date = format(new Date(event.date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as Record<string, typeof mockCalendarEvents>);

  const sortedDates = Object.keys(eventsByDate).sort();

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Calendar</h2>
          <p className="text-muted-foreground">View all your upcoming events and deadlines</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar View Placeholder */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Monthly View</CardTitle>
              <CardDescription>Calendar visualization (placeholder)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Calendar Widget</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Full calendar view would be implemented here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCalendarEvents.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-2 mb-1">
                      {getEventIcon(event.type)}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(event.date), 'MMM dd')}
                          {event.time && ` at ${event.time}`}
                        </p>
                      </div>
                    </div>
                    {getEventBadge(event.type)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List by Date */}
        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
            <CardDescription>Events organized by date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sortedDates.map((date) => (
                <div key={date}>
                  <h3 className="font-semibold text-lg mb-3">
                    {format(new Date(date), 'EEEE, MMMM dd, yyyy')}
                  </h3>
                  <div className="space-y-3">
                    {eventsByDate[date].map((event) => (
                      <div
                        key={event.id}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                              {getEventIcon(event.type)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{event.title}</h4>
                              {event.courseName && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {event.courseName}
                                </p>
                              )}
                              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                                {event.time && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {event.time}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getEventBadge(event.type)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {sortedDates.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No events scheduled</h3>
                <p className="text-muted-foreground">You don't have any upcoming events.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}

