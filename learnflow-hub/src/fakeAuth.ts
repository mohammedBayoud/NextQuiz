// Fake users for frontend-only prototype
export interface FakeUser {
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
  name: string;
  id: string;
}

export const users = [
  { email: "student@test.com", password: "123456", role: "student", name: "Student User", id: "1" },
  { email: "teacher@test.com", password: "123456", role: "teacher", name: "Teacher User", id: "2" },
  { email: "admin@test.com", password: "123456", role: "admin", name: "Admin User", id: "3" }
] as const;

// Login handler - matches requirements
export function login(email: string, password: string): { success: boolean; message?: string; role?: string } {
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return { success: false, message: "Invalid email or password" };

  localStorage.setItem("user", JSON.stringify(user));
  return { success: true, role: user.role };
}

// Legacy compatibility functions
export function fakeLogin(email: string, password: string): FakeUser | null {
  const result = login(email, password);
  if (!result.success) return null;
  
  const user = users.find(u => u.email === email && u.password === password);
  return user as FakeUser || null;
}

// Get current user from localStorage
export function getCurrentUser(): FakeUser | null {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr) as FakeUser;
  } catch {
    return null;
  }
}

// Remove user from localStorage
export function removeUser(): void {
  localStorage.removeItem('user');
}



