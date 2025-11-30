import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Download } from 'lucide-react';
import { mockCertificates } from '@/data/mockData';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function StudentCertificates() {
  const handleDownload = (certificateId: string) => {
    toast.success('Certificate download started (placeholder)');
    // In a real app, this would download the certificate image/PDF
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Certificates</h2>
          <p className="text-muted-foreground">View and download your course completion certificates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCertificates.map((certificate) => (
            <Card key={certificate.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg mb-4 flex items-center justify-center">
                  <GraduationCap className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="text-lg">{certificate.courseName}</CardTitle>
                <CardDescription>
                  Certificate of Completion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Issued to:</span>
                    <span className="font-medium">{certificate.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Issued on:</span>
                    <span className="font-medium">
                      {format(new Date(certificate.issuedDate), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Certificate #:</span>
                    <span className="font-medium font-mono text-xs">
                      {certificate.certificateNumber}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => handleDownload(certificate.id)}
                  className="w-full"
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockCertificates.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <GraduationCap className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No certificates yet</h3>
              <p className="text-muted-foreground text-center">
                Complete courses to earn certificates
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
}

