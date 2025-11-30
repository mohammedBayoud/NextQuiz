import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Upload, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const handleLogoUpload = () => {
    toast.info('Logo upload feature (placeholder)');
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">System Settings</h2>
          <p className="text-muted-foreground">Configure platform settings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                defaultValue="Educational Management System"
                placeholder="Enter site name"
              />
            </div>
            <div>
              <Label htmlFor="logo">Logo</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Logo</span>
                </div>
                <Button variant="outline" onClick={handleLogoUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
              </div>
            </div>
            <Button onClick={handleSave} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>Customize platform appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Enable dark mode theme</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Color Theme</Label>
                <p className="text-sm text-muted-foreground">Switch color theme</p>
              </div>
              <Switch />
            </div>
            <Button onClick={handleSave} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Theme Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

