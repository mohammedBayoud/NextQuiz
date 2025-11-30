// Comprehensive Mock Data for frontend-only prototype

// ============ INTERFACES ============

export interface Course {
  id: string;
  name: string;
  description: string;
  teacher: string;
  teacherId: string;
  enrolledStudents: number;
  image?: string;
  category: string;
  duration: string;
  createdAt: string;
  progress?: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  type: 'video' | 'pdf' | 'text' | 'quiz';
  order: number;
  duration?: string;
  completed?: boolean;
  videoUrl?: string;
  pdfUrl?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  submittedAt?: string;
  studentId?: string;
}

export interface Exam {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number; // minutes
  questions: ExamQuestion[];
  startedAt?: string;
  completedAt?: string;
  score?: number;
  status: 'upcoming' | 'in-progress' | 'completed';
  startDate: string;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer?: number;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  studentId: string;
  studentName: string;
  issuedDate: string;
  certificateNumber: string;
}

export interface Notification {
  id: string;
  type: 'course' | 'assignment' | 'exam' | 'announcement' | 'grade';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface Discussion {
  id: string;
  courseId?: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  replies: DiscussionReply[];
  views: number;
}

export interface DiscussionReply {
  id: string;
  discussionId: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
}

export interface LiveSession {
  id: string;
  courseId: string;
  title: string;
  description: string;
  scheduledAt: string;
  duration: number;
  link: string;
  status: 'upcoming' | 'live' | 'completed';
  attendees?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  averageGrade: number;
}

export interface Log {
  id: string;
  type: 'login' | 'page_visit' | 'action' | 'error';
  userId?: string;
  userName?: string;
  action: string;
  timestamp: string;
  details?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'assignment' | 'exam' | 'lesson' | 'live_session';
  date: string;
  time?: string;
  courseId?: string;
  courseName?: string;
  link?: string;
}

// ============ MOCK DATA ============

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. Perfect for beginners.',
    teacher: 'Sarah Johnson',
    teacherId: '2',
    enrolledStudents: 25,
    category: 'Web Development',
    duration: '8 weeks',
    createdAt: '2024-01-15',
    progress: 65
  },
  {
    id: '2',
    name: 'Advanced React',
    description: 'Master React with hooks, context, and advanced patterns. Build production-ready applications.',
    teacher: 'Michael Chen',
    teacherId: '2',
    enrolledStudents: 18,
    category: 'Frontend',
    duration: '10 weeks',
    createdAt: '2024-02-01',
    progress: 80
  },
  {
    id: '3',
    name: 'Database Design',
    description: 'Learn to design and implement efficient databases using SQL and NoSQL solutions.',
    teacher: 'Emily Rodriguez',
    teacherId: '2',
    enrolledStudents: 22,
    category: 'Backend',
    duration: '6 weeks',
    createdAt: '2024-01-20',
    progress: 45
  },
  {
    id: '4',
    name: 'UI/UX Design Principles',
    description: 'Master the art of creating beautiful and intuitive user interfaces.',
    teacher: 'Sarah Johnson',
    teacherId: '2',
    enrolledStudents: 30,
    category: 'Design',
    duration: '7 weeks',
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    name: 'Python for Data Science',
    description: 'Learn Python programming and data analysis with pandas, numpy, and matplotlib.',
    teacher: 'Michael Chen',
    teacherId: '2',
    enrolledStudents: 28,
    category: 'Data Science',
    duration: '9 weeks',
    createdAt: '2024-01-25'
  }
];

export const mockLessons: Lesson[] = [
  // Course 1 lessons
  {
    id: '1',
    courseId: '1',
    title: 'HTML Basics',
    description: 'Introduction to HTML structure and tags',
    content: 'HTML is the foundation of web development...',
    type: 'video',
    order: 1,
    duration: '15 min',
    completed: true,
    videoUrl: 'https://example.com/video1.mp4'
  },
  {
    id: '2',
    courseId: '1',
    title: 'CSS Styling',
    description: 'Learn how to style your web pages with CSS',
    content: 'CSS allows you to add beautiful styling...',
    type: 'video',
    order: 2,
    duration: '20 min',
    completed: true
  },
  {
    id: '3',
    courseId: '1',
    title: 'JavaScript Fundamentals',
    description: 'Introduction to JavaScript programming',
    content: 'JavaScript brings interactivity to web pages...',
    type: 'text',
    order: 3,
    duration: '25 min',
    completed: false
  },
  {
    id: '4',
    courseId: '1',
    title: 'DOM Manipulation',
    description: 'Learn to interact with HTML elements using JavaScript',
    content: 'The Document Object Model allows you to...',
    type: 'video',
    order: 4,
    duration: '18 min',
    completed: false
  },
  // Course 2 lessons
  {
    id: '5',
    courseId: '2',
    title: 'React Hooks',
    description: 'Understanding useState, useEffect, and custom hooks',
    content: 'React Hooks revolutionized how we write React components...',
    type: 'video',
    order: 1,
    duration: '30 min',
    completed: true
  },
  {
    id: '6',
    courseId: '2',
    title: 'Context API',
    description: 'Managing global state with Context',
    content: 'Context API provides a way to pass data...',
    type: 'video',
    order: 2,
    duration: '25 min',
    completed: true
  },
  {
    id: '7',
    courseId: '2',
    title: 'React Performance',
    description: 'Optimizing React applications',
    content: 'Learn techniques to improve performance...',
    type: 'pdf',
    order: 3,
    duration: '20 min',
    completed: false,
    pdfUrl: 'https://example.com/react-performance.pdf'
  },
  // Course 3 lessons
  {
    id: '8',
    courseId: '3',
    title: 'SQL Basics',
    description: 'Introduction to SQL queries',
    content: 'SQL is the language of databases...',
    type: 'text',
    order: 1,
    duration: '22 min',
    completed: true
  },
  {
    id: '9',
    courseId: '3',
    title: 'Database Normalization',
    description: 'Designing efficient database schemas',
    content: 'Normalization reduces data redundancy...',
    type: 'video',
    order: 2,
    duration: '28 min',
    completed: false
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    courseId: '1',
    title: 'Build a Personal Portfolio',
    description: 'Create a personal portfolio website using HTML and CSS. Include at least 3 sections: About, Projects, and Contact.',
    dueDate: '2024-12-25',
    status: 'pending'
  },
  {
    id: '2',
    courseId: '1',
    title: 'CSS Grid Layout',
    description: 'Design a responsive layout using CSS Grid. The layout should work on mobile, tablet, and desktop.',
    dueDate: '2024-12-28',
    status: 'submitted',
    submittedAt: '2024-12-20T10:30:00'
  },
  {
    id: '3',
    courseId: '2',
    title: 'Custom Hook Project',
    description: 'Create a custom React hook for data fetching. The hook should handle loading, error, and success states.',
    dueDate: '2024-12-22',
    status: 'graded',
    grade: 92,
    feedback: 'Excellent work! Great error handling and clean code structure.',
    submittedAt: '2024-12-18T14:20:00'
  },
  {
    id: '4',
    courseId: '2',
    title: 'React Context Implementation',
    description: 'Implement a context for theme management in a React app.',
    dueDate: '2024-12-30',
    status: 'pending'
  },
  {
    id: '5',
    courseId: '3',
    title: 'Database Schema Design',
    description: 'Design a database schema for an e-commerce platform.',
    dueDate: '2025-01-05',
    status: 'pending'
  }
];

export const mockExams: Exam[] = [
  {
    id: '1',
    courseId: '1',
    title: 'Web Development Midterm',
    description: 'Test your knowledge of HTML, CSS, and JavaScript basics',
    duration: 60,
    startDate: '2024-12-28T10:00:00',
    status: 'upcoming',
    questions: [
      {
        id: 'q1',
        question: 'What does HTML stand for?',
        options: [
          'HyperText Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlink and Text Markup Language'
        ],
        correctAnswer: 0
      },
      {
        id: 'q2',
        question: 'Which CSS property is used to change the text color?',
        options: ['font-color', 'text-color', 'color', 'text-style'],
        correctAnswer: 2
      },
      {
        id: 'q3',
        question: 'How do you declare a JavaScript variable?',
        options: [
          'variable myVar;',
          'var myVar;',
          'v myVar;',
          'declare myVar;'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '2',
    courseId: '2',
    title: 'React Advanced Concepts',
    description: 'Assessment on React hooks, context, and performance',
    duration: 90,
    startDate: '2025-01-05T14:00:00',
    status: 'upcoming',
    questions: [
      {
        id: 'q1',
        question: 'What is the purpose of useEffect hook?',
        options: [
          'To manage component state',
          'To perform side effects in functional components',
          'To create reusable logic',
          'To handle events'
        ],
        correctAnswer: 1
      }
    ]
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to Web Development',
    studentId: '1',
    studentName: 'Student User',
    issuedDate: '2024-11-15',
    certificateNumber: 'CERT-2024-001'
  },
  {
    id: '2',
    courseId: '4',
    courseName: 'UI/UX Design Principles',
    studentId: '1',
    studentName: 'Student User',
    issuedDate: '2024-10-20',
    certificateNumber: 'CERT-2024-002'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'assignment',
    title: 'New Assignment Available',
    message: 'A new assignment "CSS Grid Layout" has been posted in Web Development course.',
    read: false,
    createdAt: '2024-12-19T09:00:00',
    link: '/student/assignments'
  },
  {
    id: '2',
    type: 'grade',
    title: 'Assignment Graded',
    message: 'Your assignment "Custom Hook Project" has been graded. You received 92/100.',
    read: false,
    createdAt: '2024-12-20T14:30:00',
    link: '/student/assignments'
  },
  {
    id: '3',
    type: 'course',
    title: 'Course Update',
    message: 'New lesson "DOM Manipulation" has been added to Web Development course.',
    read: true,
    createdAt: '2024-12-18T11:00:00',
    link: '/student/courses/1'
  },
  {
    id: '4',
    type: 'exam',
    title: 'Exam Scheduled',
    message: 'Web Development Midterm exam is scheduled for December 28, 2024 at 10:00 AM.',
    read: false,
    createdAt: '2024-12-15T10:00:00',
    link: '/student/exams'
  },
  {
    id: '5',
    type: 'announcement',
    title: 'Holiday Break Notice',
    message: 'All courses will be paused from December 24-26 for holiday break.',
    read: true,
    createdAt: '2024-12-10T08:00:00'
  }
];

export const mockDiscussions: Discussion[] = [
  {
    id: '1',
    courseId: '1',
    title: 'How to center a div?',
    content: 'I am having trouble centering a div both horizontally and vertically. Can anyone help?',
    author: 'Student User',
    authorId: '1',
    createdAt: '2024-12-19T10:30:00',
    views: 45,
    replies: [
      {
        id: 'r1',
        discussionId: '1',
        content: 'You can use flexbox: display: flex; justify-content: center; align-items: center;',
        author: 'Sarah Johnson',
        authorId: '2',
        createdAt: '2024-12-19T11:00:00'
      },
      {
        id: 'r2',
        discussionId: '1',
        content: 'Or you can use CSS Grid with place-items: center;',
        author: 'John Doe',
        authorId: '4',
        createdAt: '2024-12-19T12:15:00'
      }
    ]
  },
  {
    id: '2',
    courseId: '2',
    title: 'Best practices for React hooks?',
    content: 'What are some best practices when using React hooks in large applications?',
    author: 'Alice Smith',
    authorId: '5',
    createdAt: '2024-12-18T14:20:00',
    views: 32,
    replies: [
      {
        id: 'r3',
        discussionId: '2',
        content: 'Always follow the Rules of Hooks. Never call hooks inside loops, conditions, or nested functions.',
        author: 'Michael Chen',
        authorId: '2',
        createdAt: '2024-12-18T15:00:00'
      }
    ]
  }
];

export const mockLiveSessions: LiveSession[] = [
  {
    id: '1',
    courseId: '1',
    title: 'Q&A Session: HTML & CSS',
    description: 'Join for a live Q&A session about HTML and CSS concepts',
    scheduledAt: '2024-12-27T15:00:00',
    duration: 60,
    link: 'https://meet.example.com/session-1',
    status: 'upcoming',
    attendees: 0
  },
  {
    id: '2',
    courseId: '2',
    title: 'React Workshop',
    description: 'Hands-on React workshop covering advanced topics',
    scheduledAt: '2025-01-03T10:00:00',
    duration: 120,
    link: 'https://meet.example.com/session-2',
    status: 'upcoming',
    attendees: 0
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Student User',
    email: 'student@test.com',
    role: 'student',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Teacher User',
    email: 'teacher@test.com',
    role: 'teacher',
    createdAt: '2023-12-01'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@test.com',
    role: 'admin',
    createdAt: '2023-11-01'
  },
  {
    id: '4',
    name: 'John Doe',
    email: 'john@test.com',
    role: 'student',
    createdAt: '2024-01-15'
  },
  {
    id: '5',
    name: 'Alice Smith',
    email: 'alice@test.com',
    role: 'student',
    createdAt: '2024-02-01'
  },
  {
    id: '6',
    name: 'Sarah Johnson',
    email: 'sarah@test.com',
    role: 'teacher',
    createdAt: '2023-11-15'
  },
  {
    id: '7',
    name: 'Michael Chen',
    email: 'michael@test.com',
    role: 'teacher',
    createdAt: '2023-10-20'
  },
  {
    id: '8',
    name: 'Emily Rodriguez',
    email: 'emily@test.com',
    role: 'teacher',
    createdAt: '2023-12-10'
  }
];

export const mockStudentProgress: StudentProgress[] = [
  {
    studentId: '1',
    studentName: 'Student User',
    courseId: '1',
    courseName: 'Introduction to Web Development',
    progress: 65,
    completedLessons: 2,
    totalLessons: 4,
    assignmentsCompleted: 1,
    totalAssignments: 2,
    averageGrade: 92
  },
  {
    studentId: '1',
    studentName: 'Student User',
    courseId: '2',
    courseName: 'Advanced React',
    progress: 80,
    completedLessons: 2,
    totalLessons: 3,
    assignmentsCompleted: 1,
    totalAssignments: 2,
    averageGrade: 92
  },
  {
    studentId: '4',
    studentName: 'John Doe',
    courseId: '1',
    courseName: 'Introduction to Web Development',
    progress: 50,
    completedLessons: 2,
    totalLessons: 4,
    assignmentsCompleted: 1,
    totalAssignments: 2,
    averageGrade: 85
  }
];

export const mockLogs: Log[] = [
  {
    id: '1',
    type: 'login',
    userId: '1',
    userName: 'Student User',
    action: 'User logged in',
    timestamp: '2024-12-20T09:00:00',
    details: 'IP: 192.168.1.1'
  },
  {
    id: '2',
    type: 'page_visit',
    userId: '1',
    userName: 'Student User',
    action: 'Visited /student/dashboard',
    timestamp: '2024-12-20T09:05:00'
  },
  {
    id: '3',
    type: 'action',
    userId: '2',
    userName: 'Teacher User',
    action: 'Created new assignment',
    timestamp: '2024-12-19T14:30:00',
    details: 'Assignment ID: 5'
  },
  {
    id: '4',
    type: 'login',
    userId: '4',
    userName: 'John Doe',
    action: 'User logged in',
    timestamp: '2024-12-20T08:45:00',
    details: 'IP: 192.168.1.2'
  },
  {
    id: '5',
    type: 'error',
    userId: '1',
    userName: 'Student User',
    action: 'Failed to submit assignment',
    timestamp: '2024-12-19T16:20:00',
    details: 'Assignment ID: 2'
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'CSS Grid Layout - Assignment Due',
    type: 'assignment',
    date: '2024-12-28',
    time: '23:59',
    courseId: '1',
    courseName: 'Introduction to Web Development',
    link: '/student/assignments'
  },
  {
    id: '2',
    title: 'Web Development Midterm Exam',
    type: 'exam',
    date: '2024-12-28',
    time: '10:00',
    courseId: '1',
    courseName: 'Introduction to Web Development',
    link: '/student/exams/1'
  },
  {
    id: '3',
    title: 'DOM Manipulation Lesson',
    type: 'lesson',
    date: '2024-12-22',
    courseId: '1',
    courseName: 'Introduction to Web Development',
    link: '/student/courses/1'
  },
  {
    id: '4',
    title: 'Q&A Session: HTML & CSS',
    type: 'live_session',
    date: '2024-12-27',
    time: '15:00',
    courseId: '1',
    courseName: 'Introduction to Web Development',
    link: '/teacher/live-sessions'
  },
  {
    id: '5',
    title: 'React Context Implementation - Assignment Due',
    type: 'assignment',
    date: '2024-12-30',
    time: '23:59',
    courseId: '2',
    courseName: 'Advanced React',
    link: '/student/assignments'
  }
];

// ============ HELPER FUNCTIONS ============

export function getCourseById(id: string): Course | undefined {
  return mockCourses.find(c => c.id === id);
}

export function getLessonsByCourseId(courseId: string): Lesson[] {
  return mockLessons
    .filter(l => l.courseId === courseId)
    .sort((a, b) => a.order - b.order);
}

export function getAssignmentsByCourseId(courseId: string): Assignment[] {
  return mockAssignments.filter(a => a.courseId === courseId);
}

export function getExamsByCourseId(courseId: string): Exam[] {
  return mockExams.filter(e => e.courseId === courseId);
}

export function getDiscussionsByCourseId(courseId: string): Discussion[] {
  return mockDiscussions.filter(d => d.courseId === courseId);
}

// Mock statistics
export const mockStats = {
  enrolledCourses: 3,
  pendingAssignments: 2,
  averageProgress: 75,
  totalStudents: 65,
  totalTeachers: 5,
  totalCourses: 8,
  totalLessons: 24,
  toGrade: 12,
  upcomingExams: 2,
  completedCourses: 2
};
