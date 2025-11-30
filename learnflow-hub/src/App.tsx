import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ThemeProvider } from "@/contexts/ThemeContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentCourseDetail from "./pages/student/StudentCourseDetail";
import StudentLesson from "./pages/student/StudentLesson";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentExams from "./pages/student/StudentExams";
import StudentExam from "./pages/student/StudentExam";
import StudentCertificates from "./pages/student/StudentCertificates";
import StudentDiscussions from "./pages/student/StudentDiscussions";
import StudentCalendar from "./pages/student/StudentCalendar";
import StudentNotifications from "./pages/student/StudentNotifications";
import StudentProfile from "./pages/student/StudentProfile";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import TeacherCourseLessons from "./pages/teacher/TeacherCourseLessons";
import TeacherAssignments from "./pages/teacher/TeacherAssignments";
import TeacherStudentsProgress from "./pages/teacher/TeacherStudentsProgress";
import TeacherLiveSessions from "./pages/teacher/TeacherLiveSessions";
import TeacherExportGrades from "./pages/teacher/TeacherExportGrades";
import TeacherNotifications from "./pages/teacher/TeacherNotifications";
import TeacherProfile from "./pages/teacher/TeacherProfile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminLogs from "./pages/admin/AdminLogs";
import AdminRoles from "./pages/admin/AdminRoles";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Student Routes */}
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/courses" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentCourses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/course/:id" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentCourseDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/lessons/:lessonId" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentLesson />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/assignments" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentAssignments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/exams" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentExams />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/exam/:id" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentExam />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/certificates" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentCertificates />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/discussions" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDiscussions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/calendar" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentCalendar />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/notifications" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentNotifications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/profile" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentProfile />
                </ProtectedRoute>
              } 
            />
            
            {/* Teacher Routes */}
            <Route 
              path="/teacher/dashboard" 
              element={
                <ProtectedRoute requiredRole="teacher">
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/courses" 
              element={
                <ProtectedRoute requiredRole="teacher">
                  <TeacherCourses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/courses/:id/lessons" 
              element={
                <ProtectedRoute requiredRole="teacher">
                  <TeacherCourseLessons />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/assignments" 
              element={
                <ProtectedRoute requiredRole="teacher">
                  <TeacherAssignments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/students-progress" 
              element={
                <ProtectedRoute requiredRole="teacher">
                  <TeacherStudentsProgress />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/live-sessions" 
              element={
                <ProtectedRoute requiredRole="teacher">
                  <TeacherLiveSessions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/export-grades" 
              element={
                <ProtectedRoute requiredRole="teacher">
                  <TeacherExportGrades />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/notifications" 
              element={
                <ProtectedRoute requiredRole="teacher">
                  <TeacherNotifications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/profile" 
              element={
                <ProtectedRoute requiredRole="teacher">
                  <TeacherProfile />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminCourses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/logs" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLogs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/roles" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminRoles />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminSettings />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
);

export default App;
