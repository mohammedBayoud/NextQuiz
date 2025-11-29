import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, GraduationCap, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in and redirect
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (data) {
          const rolePaths = {
            student: '/student/dashboard',
            teacher: '/teacher/dashboard',
            admin: '/admin/dashboard',
          };
          navigate(rolePaths[data.role as keyof typeof rolePaths]);
        }
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
              <BookOpen className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Educational Management
            <span className="block text-primary mt-2">Made Simple</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A modern platform designed for students, teachers, and administrators to collaborate and excel in education.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth')} className="text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth')} className="text-lg px-8">
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Designed For Everyone</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Students</h3>
              <p className="text-muted-foreground">
                Access courses, submit assignments, and track your progress in one place.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Teachers</h3>
              <p className="text-muted-foreground">
                Create courses, manage lessons, and provide feedback to students efficiently.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Admins</h3>
              <p className="text-muted-foreground">
                Comprehensive oversight of users, courses, and system-wide analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our educational platform today and experience seamless learning management.
          </p>
          <Button size="lg" onClick={() => navigate('/auth')} className="text-lg px-8">
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Educational Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
