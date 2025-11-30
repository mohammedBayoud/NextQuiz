import { useState } from 'react';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowLeft, ArrowRight, Check, Video, FileText, BookOpen } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockLessons } from '@/data/mockData';
import { toast } from 'sonner';

export default function StudentLesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const lesson = mockLessons.find(l => l.id === lessonId);
  const currentIndex = mockLessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? mockLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < mockLessons.length - 1 ? mockLessons[currentIndex + 1] : null;
  const courseLessons = mockLessons.filter(l => l.courseId === lesson?.courseId);

  if (!lesson) {
    return (
      <StudentLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Lesson not found</h2>
          <Button asChild className="mt-4">
            <Link to="/student/courses">Back to Courses</Link>
          </Button>
        </div>
      </StudentLayout>
    );
  }

  const handleComplete = () => {
    setCompleted(true);
    toast.success('Lesson marked as completed!');
    // In a real app, this would update the lesson status
  };

  const getLessonIcon = () => {
    switch (lesson.type) {
      case 'video':
        return <Video className="h-6 w-6" />;
      case 'pdf':
        return <FileText className="h-6 w-6" />;
      default:
        return <BookOpen className="h-6 w-6" />;
    }
  };

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" asChild>
          <Link to={`/student/course/${lesson.courseId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Link>
        </Button>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                {getLessonIcon()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{lesson.type}</Badge>
                  {lesson.duration && (
                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                  )}
                </div>
                <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                <p className="text-muted-foreground">{lesson.description}</p>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              {lesson.type === 'video' && (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Video className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Video Player Placeholder</p>
                    {lesson.videoUrl && (
                      <p className="text-sm text-muted-foreground mt-1">URL: {lesson.videoUrl}</p>
                    )}
                  </div>
                </div>
              )}

              {lesson.type === 'pdf' && (
                <div className="bg-muted rounded-lg p-8 text-center mb-4">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground mb-2">PDF Document Viewer</p>
                  {lesson.pdfUrl && (
                    <Button variant="outline" asChild>
                      <a href={lesson.pdfUrl} target="_blank" rel="noopener noreferrer">
                        Open PDF
                      </a>
                    </Button>
                  )}
                </div>
              )}

              {lesson.type === 'text' && (
                <div className="prose max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {lesson.content}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                onClick={handleComplete}
                disabled={completed || lesson.completed}
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                {completed || lesson.completed ? 'Completed' : 'Mark as Completed'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            disabled={!prevLesson}
            onClick={() => prevLesson && navigate(`/student/lessons/${prevLesson.id}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Lesson
          </Button>

          <Button
            variant="outline"
            disabled={!nextLesson}
            onClick={() => nextLesson && navigate(`/student/lessons/${nextLesson.id}`)}
          >
            Next Lesson
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Lesson List */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Course Lessons</h3>
            <div className="space-y-2">
              {courseLessons.map((l, index) => (
                <Link
                  key={l.id}
                  to={`/student/lessons/${l.id}`}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    l.id === lessonId
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  {l.completed || (l.id === lessonId && completed) ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                  )}
                  <span className="flex-1">
                    Lesson {index + 1}: {l.title}
                  </span>
                  {l.duration && (
                    <span className="text-sm text-muted-foreground">{l.duration}</span>
                  )}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}

