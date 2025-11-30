import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ClipboardList, TrendingUp, Bell, Calendar } from 'lucide-react';
import { mockCourses, mockAssignments, mockNotifications, mockStats, mockCalendarEvents } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function StudentDashboard() {
  const upcomingAssignments = mockAssignments.filter(a => a.status === 'pending').slice(0, 3);
  const unreadNotifications = mockNotifications.filter(n => !n.read).slice(0, 3);
  const upcomingEvents = mockCalendarEvents.slice(0, 3);

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-muted-foreground">Here's your learning overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Enrolled Courses</CardTitle>
              <BookOpen className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.enrolledCourses}</div>
              <p className="text-xs text-muted-foreground mt-1">Active courses</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Assignments</CardTitle>
              <ClipboardList className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.pendingAssignments}</div>
              <p className="text-xs text-muted-foreground mt-1">Due this week</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Progress</CardTitle>
              <TrendingUp className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.averageProgress}%</div>
              <p className="text-xs text-muted-foreground mt-1">Across all courses</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Courses in Progress */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Courses in Progress</CardTitle>
                  <CardDescription>Continue your learning journey</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/student/courses">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCourses.filter(c => c.progress && c.progress > 0).slice(0, 3).map((course) => (
                  <Link
                    key={course.id}
                    to={`/student/course/${course.id}`}
                    className="block p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{course.name}</h4>
                      <span className="text-sm font-medium text-primary">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-1">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Teacher: {course.teacher}</p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Assignments</CardTitle>
                  <CardDescription>Assignments due soon</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/student/assignments">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAssignments.map((assignment) => (
                  <Link
                    key={assignment.id}
                    to="/student/assignments"
                    className="block p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <h4 className="font-semibold">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{assignment.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
                {upcomingAssignments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No assignments due</p>
                    <p className="text-sm mt-1">You're all caught up!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Recent updates</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/student/notifications">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {unreadNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <h4 className="font-semibold text-sm">{notification.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendar Events */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                  <CardDescription>This week's schedule</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/student/calendar">View Calendar</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(event.date).toLocaleDateString()}
                      {event.time && ` at ${event.time}`}
                    </p>
                    {event.courseName && (
                      <p className="text-xs text-muted-foreground">{event.courseName}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Summary */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Progress Summary</CardTitle>
            <CardDescription>Your overall learning progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCourses.filter(c => c.progress).map((course) => (
                <div key={course.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{course.name}</span>
                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
