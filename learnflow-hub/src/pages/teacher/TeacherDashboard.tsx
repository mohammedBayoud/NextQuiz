import { TeacherLayout } from '@/components/layouts/TeacherLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, ClipboardCheck, FileText, Video, Clock } from 'lucide-react';
import { mockCourses, mockStats, mockAssignments, mockLiveSessions } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
  const pendingSubmissions = mockAssignments.filter(a => a.status === 'submitted').length;
  const upcomingSessions = mockLiveSessions.filter(s => s.status === 'upcoming');

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome, Teacher!</h2>
          <p className="text-muted-foreground">Manage your courses and students</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all courses</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">My Courses</CardTitle>
              <BookOpen className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockCourses.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active courses</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">To Grade</CardTitle>
              <ClipboardCheck className="h-5 w-5 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingSubmissions}</div>
              <p className="text-xs text-muted-foreground mt-1">Pending submissions</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Live Sessions</CardTitle>
              <Video className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{upcomingSessions.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Upcoming sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Courses</CardTitle>
                  <CardDescription>Manage your courses and lessons</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/teacher/courses">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCourses.slice(0, 3).map((course) => (
                  <div key={course.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h4 className="font-semibold">{course.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{course.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{course.enrolledStudents} students enrolled</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pending Submissions</CardTitle>
                  <CardDescription>Latest student submissions to review</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/teacher/assignments">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingSubmissions > 0 ? (
                  <>
                    <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <h4 className="font-semibold">CSS Grid Layout</h4>
                      <p className="text-sm text-muted-foreground mt-1">8 submissions pending</p>
                      <p className="text-xs text-muted-foreground mt-2">Due: Dec 28, 2024</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No submissions to grade</p>
                    <p className="text-sm mt-1">All caught up!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Upcoming Live Sessions
                  </CardTitle>
                  <CardDescription>Your scheduled sessions</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/teacher/live-sessions">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingSessions.slice(0, 2).map((session) => (
                  <div key={session.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h4 className="font-semibold">{session.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{session.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(session.scheduledAt).toLocaleDateString()} at{' '}
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TeacherLayout>
  );
}
