import { useState } from 'react';
import { TeacherLayout } from '@/components/layouts/TeacherLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, GripVertical, ArrowLeft } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById, getLessonsByCourseId } from '@/data/mockData';
import { toast } from 'sonner';

export default function TeacherCourseLessons() {
  const { id } = useParams<{ id: string }>();
  const course = id ? getCourseById(id) : null;
  const [lessons, setLessons] = useState(getLessonsByCourseId(id || ''));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    type: 'text',
    duration: '',
  });

  if (!course) {
    return (
      <TeacherLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <Button asChild className="mt-4">
            <Link to="/teacher/courses">Back to Courses</Link>
          </Button>
        </div>
      </TeacherLayout>
    );
  }

  const handleCreate = () => {
    setEditingLesson(null);
    setFormData({ title: '', description: '', content: '', type: 'text', duration: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (lesson: any) => {
    setEditingLesson(lesson);
    setFormData({
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      type: lesson.type,
      duration: lesson.duration || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (lessonId: string) => {
    setLessons(lessons.filter(l => l.id !== lessonId));
    toast.success('Lesson deleted');
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in required fields');
      return;
    }

    if (editingLesson) {
      setLessons(
        lessons.map(l =>
          l.id === editingLesson.id
            ? { ...l, ...formData }
            : l
        )
      );
      toast.success('Lesson updated');
    } else {
      const newLesson = {
        id: `lesson-${Date.now()}`,
        courseId: id || '',
        ...formData,
        order: lessons.length + 1,
        completed: false,
      };
      setLessons([...lessons, newLesson]);
      toast.success('Lesson created');
    }
    setIsDialogOpen(false);
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/teacher/courses">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{course.name}</h2>
            <p className="text-muted-foreground">Manage lessons for this course</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Add Lesson
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingLesson ? 'Edit Lesson' : 'Add New Lesson'}</DialogTitle>
                <DialogDescription>
                  {editingLesson ? 'Update lesson information' : 'Create a new lesson for this course'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Lesson Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter lesson title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter lesson description"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Lesson Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Enter lesson content"
                    rows={6}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (optional)</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 15 min"
                  />
                </div>
                <Button onClick={handleSubmit} className="w-full">
                  {editingLesson ? 'Update Lesson' : 'Create Lesson'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lessons ({lessons.length})</CardTitle>
            <CardDescription>Manage and reorder lessons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Lesson {index + 1}: {lesson.title}</span>
                      <span className="text-xs px-2 py-0.5 bg-muted rounded">{lesson.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{lesson.description}</p>
                    {lesson.duration && (
                      <p className="text-xs text-muted-foreground mt-1">{lesson.duration}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(lesson)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(lesson.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {lessons.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No lessons yet. Add your first lesson!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}

