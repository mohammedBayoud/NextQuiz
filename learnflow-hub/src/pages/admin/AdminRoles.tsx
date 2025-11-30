import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield } from 'lucide-react';

export default function AdminRoles() {
  const permissions = [
    { id: 'view_courses', label: 'View Courses' },
    { id: 'edit_courses', label: 'Edit Courses' },
    { id: 'delete_courses', label: 'Delete Courses' },
    { id: 'view_users', label: 'View Users' },
    { id: 'edit_users', label: 'Edit Users' },
    { id: 'delete_users', label: 'Delete Users' },
    { id: 'manage_assignments', label: 'Manage Assignments' },
    { id: 'view_grades', label: 'View Grades' },
    { id: 'edit_grades', label: 'Edit Grades' },
    { id: 'view_logs', label: 'View Logs' },
    { id: 'manage_settings', label: 'Manage Settings' },
  ];

  const roles = [
    { name: 'Student', permissions: ['view_courses', 'view_grades'] },
    { name: 'Teacher', permissions: ['view_courses', 'edit_courses', 'manage_assignments', 'edit_grades'] },
    { name: 'Admin', permissions: permissions.map(p => p.id) },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Role Management</h2>
          <p className="text-muted-foreground">Manage roles and permissions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Permission Matrix</CardTitle>
            <CardDescription>Configure permissions for each role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Permission</th>
                    {roles.map((role) => (
                      <th key={role.name} className="text-center p-4 font-semibold">
                        {role.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((permission) => (
                    <tr key={permission.id} className="border-b">
                      <td className="p-4">{permission.label}</td>
                      {roles.map((role) => (
                        <td key={role.name} className="p-4 text-center">
                          <Checkbox
                            checked={role.permissions.includes(permission.id)}
                            disabled
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

