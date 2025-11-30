import { useState } from 'react';
import { TeacherLayout } from '@/components/layouts/TeacherLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, CheckCircle2, Clock, Users } from 'lucide-react';
import { mockAssignments, mockCourses } from '@/data/mockData';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGrade = (assignmentId: string) => {
    toast.success('Grading interface opened (placeholder)');
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Assignments</h2>
            <p className="text-muted-foreground">Create and grade student assignments</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>Add a new assignment for your students</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Assignment Title</Label>
                  <Input placeholder="Enter assignment title" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Enter assignment description" rows={4} />
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Input type="date" />
                </div>
                <Button className="w-full" onClick={() => {
                  toast.success('Assignment created (placeholder)');
                  setIsDialogOpen(false);
                }}>
                  Create Assignment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {assignments.map((assignment) => {
            const course = mockCourses.find(c => c.id === assignment.courseId);
            const submissions = assignment.status === 'submitted' ? 8 : 0;
            
            return (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{assignment.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {course?.name || 'Unknown Course'}
                      </CardDescription>
                    </div>
                    {assignment.status === 'submitted' && (
                      <Badge variant="secondary" className="gap-1">
                        <Users className="h-3 w-3" />
                        {submissions} submissions
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground mb-4">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Due: {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}</span>
                      {assignment.status === 'submitted' && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {submissions} to grade
                        </span>
                      )}
                    </div>
                    {assignment.status === 'submitted' && (
                      <Button onClick={() => handleGrade(assignment.id)}>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Grade Submissions
                      </Button>
                    )}
                  </div>
                  {assignment.feedback && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Sample Feedback:</p>
                      <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                    </div>
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

