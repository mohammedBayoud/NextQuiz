import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Play } from 'lucide-react';
import { mockCourses } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function StudentCourses() {
  const enrolledCourses = mockCourses.filter(c => c.progress !== undefined);

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">My Courses</h2>
          <p className="text-muted-foreground">Continue learning and track your progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-xl">{course.name}</CardTitle>
                <CardDescription>{course.category} • {course.duration}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium text-primary">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress || 0} />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Teacher: {course.teacher}</span>
                </div>
                <Button asChild className="w-full">
                  <Link to={`/student/course/${course.id}`}>
                    <Play className="h-4 w-4 mr-2" />
                    Continue
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {enrolledCourses.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses enrolled</h3>
              <p className="text-muted-foreground text-center">
                Start your learning journey by enrolling in courses
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
}

