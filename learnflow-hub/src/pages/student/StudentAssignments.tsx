import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle2, Award } from 'lucide-react';
import { mockAssignments, mockCourses } from '@/data/mockData';
import { format } from 'date-fns';

export default function StudentAssignments() {
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending');
  const submittedAssignments = mockAssignments.filter(a => a.status === 'submitted');
  const gradedAssignments = mockAssignments.filter(a => a.status === 'graded');

  const getCourseName = (courseId: string) => {
    return mockCourses.find(c => c.id === courseId)?.name || 'Unknown Course';
  };

  const getStatusBadge = (status: string, grade?: number) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case 'submitted':
        return <Badge variant="secondary" className="gap-1"><CheckCircle2 className="h-3 w-3" />Submitted</Badge>;
      case 'graded':
        return <Badge variant="default" className="gap-1"><Award className="h-3 w-3" />Graded: {grade}/100</Badge>;
      default:
        return null;
    }
  };

  const allAssignments = [...pendingAssignments, ...submittedAssignments, ...gradedAssignments];

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Assignments</h2>
          <p className="text-muted-foreground">Track and manage your assignments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{pendingAssignments.length}</p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="text-2xl font-bold">{submittedAssignments.length}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Graded</p>
                  <p className="text-2xl font-bold">{gradedAssignments.length}</p>
                </div>
                <Award className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <Card>
          <CardHeader>
            <CardTitle>All Assignments</CardTitle>
            <CardDescription>View all your assignments and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getCourseName(assignment.courseId)}
                      </p>
                    </div>
                    {getStatusBadge(assignment.status, assignment.grade)}
                  </div>
                  <p className="text-sm text-foreground mb-3">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Due: {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}
                      </div>
                      {assignment.submittedAt && (
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Submitted: {format(new Date(assignment.submittedAt), 'MMM dd, yyyy')}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {assignment.status === 'pending' && (
                        <Button size="sm">Submit</Button>
                      )}
                      {assignment.feedback && (
                        <Button size="sm" variant="outline">View Feedback</Button>
                      )}
                    </div>
                  </div>
                  {assignment.feedback && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Feedback:</p>
                      <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {allAssignments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No assignments</h3>
                <p className="text-muted-foreground">You don't have any assignments yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}

