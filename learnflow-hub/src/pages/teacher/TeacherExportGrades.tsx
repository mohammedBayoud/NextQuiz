import { TeacherLayout } from '@/components/layouts/TeacherLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileSpreadsheet } from 'lucide-react';
import { mockCourses, mockStudentProgress } from '@/data/mockData';
import { toast } from 'sonner';

export default function TeacherExportGrades() {
  const handleExport = (courseId: string, format: string) => {
    toast.success(`Exporting grades as ${format.toUpperCase()} for course ${courseId} (placeholder)`);
    // In a real app, this would generate and download the file
  };

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Export Grades</h2>
          <p className="text-muted-foreground">Export student grades and progress reports</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>Select a course and export format</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Course</label>
              <Select defaultValue={mockCourses[0]?.id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Export Format</label>
              <Select defaultValue="csv">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV (Excel compatible)</SelectItem>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => handleExport(mockCourses[0]?.id || '', 'csv')}
              className="w-full"
              size="lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Grades
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Exports</CardTitle>
            <CardDescription>Your recent grade exports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockCourses.slice(0, 3).map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{course.name} - Grades</p>
                      <p className="text-sm text-muted-foreground">
                        Exported {new Date().toLocaleDateString()} • CSV format
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}

