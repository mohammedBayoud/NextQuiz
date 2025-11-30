import { TeacherLayout } from '@/components/layouts/TeacherLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockStudentProgress, mockCourses } from '@/data/mockData';
import { Users, TrendingUp } from 'lucide-react';

export default function TeacherStudentsProgress() {
  const progressByCourse = mockStudentProgress.reduce((acc, progress) => {
    if (!acc[progress.courseId]) {
      acc[progress.courseId] = [];
    }
    acc[progress.courseId].push(progress);
    return acc;
  }, {} as Record<string, typeof mockStudentProgress>);

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Student Progress</h2>
          <p className="text-muted-foreground">Track student progress across all courses</p>
        </div>

        <div className="space-y-6">
          {Object.entries(progressByCourse).map(([courseId, students]) => {
            const course = mockCourses.find(c => c.id === courseId);
            return (
              <Card key={courseId}>
                <CardHeader>
                  <CardTitle>{course?.name || 'Unknown Course'}</CardTitle>
                  <CardDescription>
                    {students.length} {students.length === 1 ? 'student' : 'students'} enrolled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((progress) => (
                      <div key={progress.studentId} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{progress.studentName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {progress.completedLessons}/{progress.totalLessons} lessons completed
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{progress.progress}%</div>
                            <div className="text-xs text-muted-foreground">Overall Progress</div>
                          </div>
                        </div>
                        <Progress value={progress.progress} className="mb-3" />
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Lessons</p>
                            <p className="font-medium">{progress.completedLessons}/{progress.totalLessons}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Assignments</p>
                            <p className="font-medium">{progress.assignmentsCompleted}/{progress.totalAssignments}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Average Grade</p>
                            <p className="font-medium">{progress.averageGrade}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </TeacherLayout>
  );
}

