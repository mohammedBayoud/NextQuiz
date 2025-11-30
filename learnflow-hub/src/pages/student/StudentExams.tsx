import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, Clock, Play, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockExams, mockCourses } from '@/data/mockData';
import { format } from 'date-fns';

export default function StudentExams() {
  const upcomingExams = mockExams.filter(e => e.status === 'upcoming');
  const completedExams = mockExams.filter(e => e.status === 'completed');

  const getCourseName = (courseId: string) => {
    return mockCourses.find(c => c.id === courseId)?.name || 'Unknown Course';
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Exams</h2>
          <p className="text-muted-foreground">View and take your exams</p>
        </div>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Exams
            </CardTitle>
            <CardDescription>Exams scheduled for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{exam.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getCourseName(exam.courseId)}
                      </p>
                    </div>
                    <Badge variant="outline">Upcoming</Badge>
                  </div>
                  <p className="text-sm text-foreground mb-3">{exam.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {format(new Date(exam.startDate), 'MMM dd, yyyy HH:mm')}
                      </div>
                      <div className="flex items-center gap-1">
                        Duration: {exam.duration} minutes
                      </div>
                      <div className="flex items-center gap-1">
                        Questions: {exam.questions.length}
                      </div>
                    </div>
                    <Button asChild>
                      <Link to={`/student/exam/${exam.id}`}>
                        <Play className="h-4 w-4 mr-2" />
                        Start Exam
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
              {upcomingExams.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No upcoming exams</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Completed Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Completed Exams
            </CardTitle>
            <CardDescription>Your exam history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{exam.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getCourseName(exam.courseId)}
                      </p>
                    </div>
                    {exam.score !== undefined && (
                      <Badge variant="default">
                        Score: {exam.score}%
                      </Badge>
                    )}
                  </div>
                  {exam.completedAt && (
                    <p className="text-sm text-muted-foreground">
                      Completed: {format(new Date(exam.completedAt), 'MMM dd, yyyy HH:mm')}
                    </p>
                  )}
                </div>
              ))}
              {completedExams.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No completed exams yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}

