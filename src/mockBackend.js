import axios from 'axios';

// Initial Mock Datasets
const initialProfile = {
  name: 'Vijay Dinodia',
  tagline: 'I build Digital Experiences',
  subtitle: 'Welcome to my world',
  bio: 'A passionate MERN Stack Developer transforming complex problems into elegant, premium, and highly scalable solutions.',
  aboutPara1: 'I am a passionate Full Stack Engineer specializing in the MERN stack. My focus is on building robust backend architectures and highly interactive, premium frontend experiences.',
  aboutPara2: 'With experience as a MERN Stack Developer Intern at REGex Software Services, I focus on clean full-stack delivery, strong DSA fundamentals, and production-ready problem solving.',
  email: 'vijaydinodia548@gmail.com',
  phone: '+91 8854823204',
  location: 'India',
  github: 'https://github.com/vijaydinodia',
  linkedin: 'https://www.linkedin.com/in/vijaydinodia',
  leetcode: 'https://leetcode.com/u/vijaydinodia/',
  resumeUrl: '/vijay_cv.pdf',
  profileImageUrl: '/vijay_profile.png',
  highlights: [
    { title: 'LeetCode Practice', desc: 'Solved 400+ problems with strong Data Structures and Algorithms foundation.' },
    { title: 'Full Product Delivery', desc: 'Building secure MERN applications and deploying to modern cloud platforms.' },
    { title: 'Hackathon Enthusiast', desc: 'Rapidly shipping production-ready MVPs under pressure.' }
  ]
};

const initialProjects = [
  {
    _id: 'proj-interviewflow',
    title: 'InterviewFlow - Technical Assessment Platform',
    slug: 'interviewflow-technical-assessment-platform',
    shortDescription: 'Full-stack enterprise technical interview management and candidate assessment SaaS platform with embedded Monaco editor & RBAC.',
    fullDescription: '<p>InterviewFlow is an enterprise-grade technical interview management and candidate assessment SaaS platform engineered to streamline the end-to-end recruitment lifecycle. It centralizes real-time candidate evaluations, dynamic role-based workflow coordination, and secure document verification into a single unified workspace.</p><p>Key architectural components include an embedded Monaco code editor for live coding rounds, multi-role JWT authentication (Candidate, Interviewer, Company, Super Admin), Cloudinary streaming for resumes and profile assets, and a low-overhead system telemetry daemon monitoring CPU, memory, and database latency.</p>',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL / MySQL', 'Sequelize ORM', 'TailwindCSS', 'Monaco Editor', 'Cloudinary', 'JWT', 'REST API'],
    category: 'Full Stack',
    status: 'Completed',
    isFeatured: true,
    displayOrder: 0,
    liveUrl: 'https://interviewflow-platform.vercel.app',
    githubUrl: 'https://github.com/vijaydinodia/InterviewFlow',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    keyFeatures: [
      'Role-Based Access Control (RBAC) across Candidate, Interviewer, Company, Super Admin',
      'Embedded Monaco code editor workspace for real-time coding evaluations',
      'Cloudinary & Multer direct streaming engine for resume PDFs (15MB) & media (10MB)',
      'Telemetry monitoring service capturing OS CPU/RAM loads and database latency',
      'End-to-End Interview Pipeline & candidate workflow stages'
    ],
    challengesFaced: 'Role-specific authorization across 4 user types was secured with a custom authorizeRoles middleware inspecting JWT claims. High-volume resume PDFs (15MB) and media were streamed directly to Cloudinary using in-memory Multer buffering. System health is monitored via custom OS & DB latency telemetry services.',
    metrics: { users: '2.8k+', performanceScore: '99/100', apiCalls: '180k+/mo' },
    isDeleted: false
  },
  {
    _id: 'proj-sevasetu',
    title: 'SevaSetu - On-Demand Local Services Platform',
    slug: 'sevasetu-on-demand-local-services',
    shortDescription: 'Hyper-local home services & KYC marketplace with two-phase OTP booking execution and geo-location constraints.',
    fullDescription: '<p>SevaSetu is an on-demand hyper-local home services and provider booking marketplace designed to connect customers with verified skilled service providers. It solves trust, transparency, and geographical fragmentation in local home services through strict KYC verification, dynamic location/pincode filtering, and automated two-phase OTP job execution tracking.</p><p>Features include multi-role administration, category-based approval flows, automated password generation with HTML email delivery, in-memory Multer buffering with Cloudinary, and resilient MongoDB transactions with replica-set fallback.</p>',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Cloudinary', 'Nodemailer', 'TailwindCSS', 'JWT', 'REST API'],
    category: 'Full Stack',
    status: 'Completed',
    isFeatured: true,
    displayOrder: 1,
    liveUrl: 'https://backend-sevasetu.onrender.com',
    githubUrl: 'https://github.com/vijaydinodia/frontend-sevaSetu.git',
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    keyFeatures: [
      'Provider KYC Verification Workflow with identity approval & automated HTML onboarding emails',
      'Two-Phase OTP Service Validation (Job Start & Job Completion OTPs) to eliminate billing disputes',
      'Geographical Pincode & City serviceability control system',
      'Direct Cloudinary media integration using in-memory Multer buffering',
      'Atomic database operations using custom runWithTransaction with standalone MongoDB fallback'
    ],
    challengesFaced: 'Prevented service fraud using a cryptographic 2-phase OTP verification protocol (Job Start and Job Completion OTPs). Created a custom runWithTransaction utility providing MongoDB replica-set transactions with fallback to sequential standalone operations. Implemented geographical validation across active cities and pincodes.',
    metrics: { users: '1.5k+', performanceScore: '97/100', apiCalls: '85k+/mo' },
    isDeleted: false
  },
  {
    _id: 'proj-1',
    title: 'MediCore - Hospital Management System',
    slug: 'medicore-hospital-management-system',
    shortDescription: 'Full-stack MERN healthcare application with 7 role-specific portals, dynamic slot booking & Razorpay integration.',
    fullDescription: '<p>MediCore is a comprehensive, multi-role hospital management web platform designed to streamline clinical, administrative, and pharmacy workflows. The system bridges the gap between healthcare providers and patients by centralizing doctor discovery, automated slot-based appointment scheduling, diagnostic laboratory management, and online pharmacy orders.</p><p>Features 7 role-specific portals (Super Admin, Hospital Admin, Doctor, Receptionist, Diagnostic Lab, Medical Store, Patient), Razorpay payment processing, SendGrid transactional emails, and Cloudinary medical report uploads.</p>',
    techStack: ['React 19', 'Node.js', 'Express 5', 'MongoDB', 'Mongoose 9', 'TailwindCSS v4', 'Material UI', 'Razorpay', 'Cloudinary', 'SendGrid', 'JWT'],
    category: 'Full Stack',
    status: 'Completed',
    isFeatured: true,
    displayOrder: 2,
    liveUrl: 'https://medicore-health.vercel.app',
    githubUrl: 'https://github.com/vijaydinodia/medicore-frontend.git',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    keyFeatures: [
      'Multi-Role Access Control (RBAC) across 7 specialized dashboards',
      'Dynamic Slot-Based Appointment Booking with Razorpay integration',
      'Diagnostic Lab & Test Management with Cloudinary medical reports',
      'Digital Pharmacy & Inventory System with prescription-based ordering',
      'Enterprise Security with Helmet, rate limiting, and NoSQL injection protection'
    ],
    challengesFaced: 'Engineered an algorithmic slot generator converting duty hours into 30-min intervals with concurrency locks before Razorpay checkout. Handled Express 5 req.query getter-only compatibility with express-mongo-sanitize. Enforced route permissions across 7 distinct user portals.',
    metrics: { users: '3.5k+', performanceScore: '98/100', apiCalls: '220k+/mo' },
    isDeleted: false
  },
  {
    _id: 'proj-task-manager',
    title: 'Task Manager (MERN Stack)',
    slug: 'task-manager-mern-stack',
    shortDescription: 'Full-stack MERN task management application with @dnd-kit Kanban board, bulk Excel import & SendGrid scheduler.',
    fullDescription: '<p>Task Manager is a full-stack web application designed to streamline daily task management, team workflows, and project organization. It solves communication bottlenecks and tracking inefficiencies by providing role-based access control for administrators and standard users, interactive Kanban boards, and status lifecycle management.</p><p>Key highlights include @dnd-kit drag-and-drop tag boards, XLSX bulk spreadsheet import with Multer memory buffering, automated timezone-aware daily HTML email digests via SendGrid, and comprehensive analytics tracking.</p>',
    techStack: ['React 19', 'Node.js', 'Express 5', 'MongoDB', 'Mongoose', 'TailwindCSS', '@dnd-kit', 'SendGrid', 'Multer', 'XLSX', 'JWT'],
    category: 'Full Stack',
    status: 'Completed',
    isFeatured: true,
    displayOrder: 3,
    liveUrl: 'https://backend-1tqe.onrender.com',
    githubUrl: 'https://github.com/vijaydinodia/Task-Manger',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    keyFeatures: [
      'Interactive Drag-and-Drop Kanban Tag Board utilizing @dnd-kit',
      'Bulk Task Import & Excel Template Export with XLSX buffer parsing',
      'Automated Timezone-Aware Daily Task Summary Email Scheduler (SendGrid)',
      'Complete Task Lifecycle (CRUD, priorities, statuses, soft delete & restore)',
      'Admin Analytics & Deadline Calendar with multi-criteria sorting'
    ],
    challengesFaced: 'Stateful drag-and-drop column categorizing was built using @dnd-kit/core with droppable containers mapped to tag IDs. Bulk spreadsheet uploads were processed with Multer memory buffers and SheetJS (XLSX). Automated timezone-aware daily HTML digests were scheduled with SendGrid.',
    metrics: { users: '1.9k+', performanceScore: '99/100', apiCalls: '110k+/mo' },
    isDeleted: false
  }
];


const initialSkills = [
  // Frontend
  { _id: 'sk-1', name: 'React.js', category: 'Frontend', level: 95, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', experience: '2+ Years', isDeleted: false, displayOrder: 0 },
  { _id: 'sk-nextjs', name: 'Next.js', category: 'Frontend', level: 90, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', experience: '1.5+ Years', isDeleted: false, displayOrder: 1 },
  { _id: 'sk-2', name: 'JavaScript (ES6+)', category: 'Frontend', level: 92, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', experience: '2+ Years', isDeleted: false, displayOrder: 2 },
  { _id: 'sk-3', name: 'Tailwind CSS', category: 'Frontend', level: 90, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', experience: '2 Years', isDeleted: false, displayOrder: 3 },
  { _id: 'sk-4', name: 'HTML5 / CSS3', category: 'Frontend', level: 95, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', experience: '2+ Years', isDeleted: false, displayOrder: 4 },

  // Backend
  { _id: 'sk-6', name: 'Node.js', category: 'Backend', level: 90, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', experience: '2 Years', isDeleted: false, displayOrder: 0 },
  { _id: 'sk-7', name: 'Express.js', category: 'Backend', level: 90, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', experience: '2 Years', isDeleted: false, displayOrder: 1 },
  { _id: 'sk-8', name: 'RESTful APIs', category: 'Backend', level: 94, iconUrl: '', experience: '2 Years', isDeleted: false, displayOrder: 2 },
  { _id: 'sk-9', name: 'JWT & OAuth', category: 'Backend', level: 88, iconUrl: '', experience: '1.5 Years', isDeleted: false, displayOrder: 3 },

  // Database
  { _id: 'sk-11', name: 'MongoDB', category: 'Database', level: 88, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', experience: '2 Years', isDeleted: false, displayOrder: 0 },
  { _id: 'sk-12', name: 'Mongoose ORM', category: 'Database', level: 90, iconUrl: '', experience: '2 Years', isDeleted: false, displayOrder: 1 },
  { _id: 'sk-sequelize', name: 'Sequelize ORM', category: 'Database', level: 88, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg', experience: '1.5 Years', isDeleted: false, displayOrder: 2 },
  { _id: 'sk-13', name: 'MySQL', category: 'Database', level: 80, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', experience: '1 Year', isDeleted: false, displayOrder: 3 },

  // Tools & DevOps
  { _id: 'sk-14', name: 'Git & GitHub', category: 'Tools', level: 92, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', experience: '2+ Years', isDeleted: false, displayOrder: 0 },
  { _id: 'sk-15', name: 'Postman', category: 'Tools', level: 90, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', experience: '2 Years', isDeleted: false, displayOrder: 1 },
  { _id: 'sk-17', name: 'Vercel / Render', category: 'Tools', level: 90, iconUrl: '', experience: '2 Years', isDeleted: false, displayOrder: 2 },

  // Soft Skills
  { _id: 'sk-18', name: 'Data Structures & Algorithms', category: 'Soft Skills', level: 90, iconUrl: '', experience: 'LeetCode 400+', isDeleted: false, displayOrder: 0 },
  { _id: 'sk-19', name: 'Problem Solving', category: 'Soft Skills', level: 95, iconUrl: '', experience: 'Continuous', isDeleted: false, displayOrder: 1 },
  { _id: 'sk-20', name: 'Agile & Team Collaboration', category: 'Soft Skills', level: 88, iconUrl: '', experience: 'Internships', isDeleted: false, displayOrder: 2 }
];

const initialExperiences = [
  {
    _id: 'exp-regex-software',
    role: 'MERN Stack Developer Intern',
    company: 'REGex Software Services',
    location: 'Jaipur, Rajasthan',
    type: 'Internship',
    startDate: '2026-02-01',
    endDate: null,
    current: true,
    description: '• Developed and maintained full-stack application features using React.js, Next.js, Node.js, Express.js, MongoDB, and MySQL, including database schema design, queries, and efficient data management.\n• Designed, developed, and integrated secure RESTful APIs for authentication, CRUD operations, data validation, and application-specific business workflows, ensuring seamless frontend–backend integration.\n• Managed source code and development workflows using Git/GitHub, while supporting application deployment and environment configuration across platforms such as Vercel and Render.',
    technologies: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'RESTful APIs', 'Git/GitHub', 'Vercel', 'Render'],
    isDeleted: false,
    displayOrder: 0
  }
];

const initialAchievements = [
  {
    _id: 'ach-1',
    title: '400+ LeetCode Solved',
    category: 'LeetCode',
    description: 'Consistent problem solver with deep mastery over arrays, strings, dynamic programming, trees, and graph algorithms.',
    date: '2024-05-15',
    isDeleted: false,
    displayOrder: 0
  },
  {
    _id: 'ach-2',
    title: 'Hackathon Finalist - Smart India Hackathon',
    category: 'Hackathon',
    description: 'Built a working healthcare management prototype in 36 hours under high pressure with a team of 4.',
    date: '2023-11-20',
    isDeleted: false,
    displayOrder: 1
  },
  {
    _id: 'ach-3',
    title: 'Full Stack Web Development Certification',
    category: 'Certification',
    description: 'Comprehensive industry certification covering advanced React, Node.js API design, and cloud architecture.',
    date: '2023-08-10',
    isDeleted: false,
    displayOrder: 2
  }
];

const initialMessages = [
  {
    _id: 'msg-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techrecruiter.com',
    subject: 'Full Stack Developer Opportunity',
    message: 'Hi Vijay, We reviewed your portfolio and were very impressed with your MERN stack projects. Would love to schedule an introductory call regarding an open Full Stack role!',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    _id: 'msg-2',
    name: 'David Miller',
    email: 'david@innovatestudio.io',
    subject: 'Freelance Web App Project',
    message: 'Hello Vijay, I need a custom React dashboard built for our SaaS platform. Your AlgoVisualizer and MediCore projects look top tier. Let us connect to discuss timelines.',
    isRead: true,
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
  }
];

const initialStats = {
  leetcodeSolved: 400,
  githubRepos: 50,
  projectsBuilt: 18,
  github: { username: 'vijaydinodia', profileUrl: 'https://github.com/vijaydinodia' },
  leetcode: { username: 'vijaydinodia', profileUrl: 'https://leetcode.com/u/vijaydinodia/' }
};

const initialVisitors = {
  totals: {
    today: 48,
    week: 312,
    month: 1240,
    total: 3890
  },
  deviceBreakdown: [
    { name: 'Desktop', value: 65 },
    { name: 'Mobile', value: 30 },
    { name: 'Tablet', value: 5 }
  ],
  browserBreakdown: [
    { name: 'Chrome', value: 58 },
    { name: 'Safari', value: 24 },
    { name: 'Firefox', value: 12 },
    { name: 'Edge', value: 6 }
  ],
  countryBreakdown: [
    { country: 'India', code: 'IN', count: 210 },
    { country: 'United States', code: 'US', count: 65 },
    { country: 'United Kingdom', code: 'GB', count: 22 },
    { country: 'Germany', code: 'DE', count: 15 }
  ],
  recentVisits: [
    { _id: 'v-1', path: '/', country: 'India', countryCode: 'IN', device: 'Desktop', browser: 'Chrome', createdAt: new Date().toISOString() },
    { _id: 'v-2', path: '/#projects', country: 'United States', countryCode: 'US', device: 'Mobile', browser: 'Safari', createdAt: new Date(Date.now() - 1800000).toISOString() },
    { _id: 'v-3', path: '/#contact', country: 'India', countryCode: 'IN', device: 'Desktop', browser: 'Firefox', createdAt: new Date(Date.now() - 3600000).toISOString() }
  ],
  timeline: Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      visitors: Math.floor(35 + Math.random() * 30)
    };
  })
};

// Helper functions for LocalStorage persistence
const getItem = (key, defaultVal) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setItem = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error('LocalStorage Save Error:', err);
  }
};

// Ensure Storage Initialized
const initLocalStorage = () => {
  const storedProfile = getItem('_mock_profile', null);
  if (!storedProfile || !storedProfile.profileImageUrl || storedProfile.profileImageUrl.includes('unsplash.com') || (storedProfile.highlights && JSON.stringify(storedProfile.highlights).includes('275')) || !storedProfile.resumeUrl || storedProfile.resumeUrl.includes('drive.google.com')) {
    setItem('_mock_profile', {
      ...initialProfile,
      ...(storedProfile || {}),
      profileImageUrl: '/vijay_profile.png',
      resumeUrl: '/vijay_cv.pdf',
      highlights: initialProfile.highlights
    });
  }
  
  const storedProjects = getItem('_mock_projects', null);
  if (
    !storedProjects || 
    storedProjects.length !== initialProjects.length || 
    !storedProjects.some(p => p._id === 'proj-task-manager') ||
    !storedProjects.some(p => p._id === 'proj-interviewflow') ||
    !storedProjects.some(p => p._id === 'proj-sevasetu')
  ) {
    setItem('_mock_projects', initialProjects);
  }

  const storedSkills = getItem('_mock_skills', null);
  if (
    !storedSkills || 
    !JSON.stringify(storedSkills).includes('Next.js') ||
    !JSON.stringify(storedSkills).includes('Sequelize') ||
    JSON.stringify(storedSkills).includes('275') || 
    JSON.stringify(storedSkills).includes('Docker') || 
    JSON.stringify(storedSkills).includes('Socket.io') || 
    JSON.stringify(storedSkills).includes('Framer Motion')
  ) {
    setItem('_mock_skills', initialSkills);
  }

  const storedExperiences = getItem('_mock_experiences', null);
  if (!storedExperiences || !storedExperiences.some(e => e.company?.toLowerCase().includes('regex')) || storedExperiences.some(e => e.company?.includes('Tech Solutions'))) {
    setItem('_mock_experiences', initialExperiences);
  }

  const storedAchievements = getItem('_mock_achievements', null);
  if (!storedAchievements || JSON.stringify(storedAchievements).includes('275')) {
    setItem('_mock_achievements', initialAchievements);
  }

  if (!localStorage.getItem('_mock_messages')) setItem('_mock_messages', initialMessages);

  const storedStats = getItem('_mock_stats', null);
  if (!storedStats || storedStats.leetcodeSolved < 400 || storedStats.githubRepos < 50) {
    setItem('_mock_stats', initialStats);
  }

  if (!localStorage.getItem('_mock_visitors')) setItem('_mock_visitors', initialVisitors);
};

initLocalStorage();

// Custom Axios Adapter for Intercepting All Calls to /api/*
export const setupMockBackend = () => {
  axios.interceptors.request.use(async (config) => {
    const url = config.url || '';
    
    // Check if the URL is an API call
    if (url.includes('/api/')) {
      const cleanUrl = url.substring(url.indexOf('/api/'));
      const method = (config.method || 'get').toUpperCase();
      let bodyData = {};

      if (config.data) {
        try {
          bodyData = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
        } catch {
          bodyData = config.data;
        }
      }

      let responseData = null;
      let status = 200;

      // ─── 1. PROFILE ENDPOINTS ───
      if (cleanUrl === '/api/profile') {
        if (method === 'GET') {
          responseData = { success: true, data: getItem('_mock_profile', initialProfile) };
        } else if (method === 'PUT') {
          const current = getItem('_mock_profile', initialProfile);
          const updated = { ...current, ...bodyData };
          setItem('_mock_profile', updated);
          responseData = { success: true, data: updated, message: 'Profile updated successfully' };
        }
      }

      // ─── 2. PROJECTS ENDPOINTS ───
      else if (cleanUrl === '/api/projects' && method === 'GET') {
        const all = getItem('_mock_projects', initialProjects);
        const active = all.filter(p => !p.isDeleted);
        responseData = { success: true, data: active };
      }
      else if (cleanUrl === '/api/projects/all' && method === 'GET') {
        const all = getItem('_mock_projects', initialProjects);
        responseData = { success: true, data: all };
      }
      else if (cleanUrl === '/api/projects/reorder' && method === 'PUT') {
        const ids = bodyData.ids || [];
        let all = getItem('_mock_projects', initialProjects);
        all.sort((a, b) => ids.indexOf(a._id) - ids.indexOf(b._id));
        all = all.map((p, idx) => ({ ...p, displayOrder: idx }));
        setItem('_mock_projects', all);
        responseData = { success: true, message: 'Projects reordered successfully' };
      }
      else if (cleanUrl.match(/^\/api\/projects\/[a-zA-Z0-9_-]+\/restore$/) && method === 'PATCH') {
        const id = cleanUrl.split('/')[3];
        let all = getItem('_mock_projects', initialProjects);
        all = all.map(p => p._id === id ? { ...p, isDeleted: false } : p);
        setItem('_mock_projects', all);
        responseData = { success: true, message: 'Project restored' };
      }
      else if (cleanUrl.match(/^\/api\/projects\/[a-zA-Z0-9_-]+$/)) {
        const idOrSlug = cleanUrl.split('/')[3];
        let all = getItem('_mock_projects', initialProjects);

        if (method === 'GET') {
          const found = all.find(p => p._id === idOrSlug || p.slug === idOrSlug);
          if (found) responseData = found;
          else { status = 404; responseData = { message: 'Project not found' }; }
        }
        else if (method === 'PUT') {
          all = all.map(p => p._id === idOrSlug ? { ...p, ...bodyData } : p);
          setItem('_mock_projects', all);
          responseData = all.find(p => p._id === idOrSlug) || bodyData;
        }
        else if (method === 'DELETE') {
          all = all.map(p => p._id === idOrSlug ? { ...p, isDeleted: true } : p);
          setItem('_mock_projects', all);
          responseData = { message: 'Project soft deleted successfully' };
        }
      }
      else if (cleanUrl === '/api/projects' && method === 'POST') {
        const all = getItem('_mock_projects', initialProjects);
        const newProj = {
          _id: 'proj-' + Date.now(),
          displayOrder: all.length,
          isDeleted: false,
          isFeatured: false,
          techStack: bodyData.techStack || [],
          status: 'Completed',
          ...bodyData
        };
        all.push(newProj);
        setItem('_mock_projects', all);
        status = 201;
        responseData = newProj;
      }

      // ─── 3. SKILLS ENDPOINTS ───
      else if (cleanUrl === '/api/skills' && method === 'GET') {
        const all = getItem('_mock_skills', initialSkills);
        const active = all.filter(s => !s.isDeleted);
        responseData = { success: true, data: active };
      }
      else if (cleanUrl === '/api/skills/all' && method === 'GET') {
        const all = getItem('_mock_skills', initialSkills);
        responseData = { success: true, data: all };
      }
      else if (cleanUrl.match(/^\/api\/skills\/[a-zA-Z0-9_-]+\/restore$/) && method === 'PATCH') {
        const id = cleanUrl.split('/')[3];
        let all = getItem('_mock_skills', initialSkills);
        all = all.map(s => s._id === id ? { ...s, isDeleted: false } : s);
        setItem('_mock_skills', all);
        responseData = { success: true, message: 'Skill restored' };
      }
      else if (cleanUrl.match(/^\/api\/skills\/[a-zA-Z0-9_-]+$/)) {
        const id = cleanUrl.split('/')[3];
        let all = getItem('_mock_skills', initialSkills);
        if (method === 'PUT') {
          all = all.map(s => s._id === id ? { ...s, ...bodyData } : s);
          setItem('_mock_skills', all);
          responseData = all.find(s => s._id === id) || bodyData;
        } else if (method === 'DELETE') {
          all = all.map(s => s._id === id ? { ...s, isDeleted: true } : s);
          setItem('_mock_skills', all);
          responseData = { message: 'Skill soft deleted' };
        }
      }
      else if (cleanUrl === '/api/skills' && method === 'POST') {
        const all = getItem('_mock_skills', initialSkills);
        const newSkill = {
          _id: 'sk-' + Date.now(),
          displayOrder: all.length,
          isDeleted: false,
          level: 85,
          ...bodyData
        };
        all.push(newSkill);
        setItem('_mock_skills', all);
        status = 201;
        responseData = newSkill;
      }

      // ─── 4. EXPERIENCES ENDPOINTS ───
      else if (cleanUrl === '/api/experiences' && method === 'GET') {
        const all = getItem('_mock_experiences', initialExperiences);
        const active = all.filter(e => !e.isDeleted);
        responseData = { success: true, data: active };
      }
      else if (cleanUrl === '/api/experiences/all' && method === 'GET') {
        const all = getItem('_mock_experiences', initialExperiences);
        responseData = { success: true, data: all };
      }
      else if (cleanUrl.match(/^\/api\/experiences\/[a-zA-Z0-9_-]+\/restore$/) && method === 'PATCH') {
        const id = cleanUrl.split('/')[3];
        let all = getItem('_mock_experiences', initialExperiences);
        all = all.map(e => e._id === id ? { ...e, isDeleted: false } : e);
        setItem('_mock_experiences', all);
        responseData = { success: true, message: 'Experience restored' };
      }
      else if (cleanUrl.match(/^\/api\/experiences\/[a-zA-Z0-9_-]+$/)) {
        const id = cleanUrl.split('/')[3];
        let all = getItem('_mock_experiences', initialExperiences);
        if (method === 'PUT') {
          all = all.map(e => e._id === id ? { ...e, ...bodyData } : e);
          setItem('_mock_experiences', all);
          responseData = all.find(e => e._id === id) || bodyData;
        } else if (method === 'DELETE') {
          all = all.map(e => e._id === id ? { ...e, isDeleted: true } : e);
          setItem('_mock_experiences', all);
          responseData = { message: 'Experience soft deleted' };
        }
      }
      else if (cleanUrl === '/api/experiences' && method === 'POST') {
        const all = getItem('_mock_experiences', initialExperiences);
        const newExp = {
          _id: 'exp-' + Date.now(),
          displayOrder: all.length,
          isDeleted: false,
          ...bodyData
        };
        all.push(newExp);
        setItem('_mock_experiences', all);
        status = 201;
        responseData = newExp;
      }

      // ─── 5. ACHIEVEMENTS ENDPOINTS ───
      else if (cleanUrl === '/api/achievements' && method === 'GET') {
        const all = getItem('_mock_achievements', initialAchievements);
        const active = all.filter(a => !a.isDeleted);
        responseData = { success: true, data: active };
      }
      else if (cleanUrl === '/api/achievements/all' && method === 'GET') {
        const all = getItem('_mock_achievements', initialAchievements);
        responseData = { success: true, data: all };
      }
      else if (cleanUrl.match(/^\/api\/achievements\/[a-zA-Z0-9_-]+\/restore$/) && method === 'PATCH') {
        const id = cleanUrl.split('/')[3];
        let all = getItem('_mock_achievements', initialAchievements);
        all = all.map(a => a._id === id ? { ...a, isDeleted: false } : a);
        setItem('_mock_achievements', all);
        responseData = { success: true, message: 'Achievement restored' };
      }
      else if (cleanUrl.match(/^\/api\/achievements\/[a-zA-Z0-9_-]+$/)) {
        const id = cleanUrl.split('/')[3];
        let all = getItem('_mock_achievements', initialAchievements);
        if (method === 'PUT') {
          all = all.map(a => a._id === id ? { ...a, ...bodyData } : a);
          setItem('_mock_achievements', all);
          responseData = all.find(a => a._id === id) || bodyData;
        } else if (method === 'DELETE') {
          all = all.map(a => a._id === id ? { ...a, isDeleted: true } : a);
          setItem('_mock_achievements', all);
          responseData = { message: 'Achievement soft deleted' };
        }
      }
      else if (cleanUrl === '/api/achievements' && method === 'POST') {
        const all = getItem('_mock_achievements', initialAchievements);
        const newAch = {
          _id: 'ach-' + Date.now(),
          displayOrder: all.length,
          isDeleted: false,
          ...bodyData
        };
        all.push(newAch);
        setItem('_mock_achievements', all);
        status = 201;
        responseData = newAch;
      }

      // ─── 6. CONTACT & MESSAGES ───
      else if (cleanUrl === '/api/contact' && method === 'POST') {
        const msgs = getItem('_mock_messages', initialMessages);
        const newMsg = {
          _id: 'msg-' + Date.now(),
          name: bodyData.name || 'Anonymous',
          email: bodyData.email || 'guest@example.com',
          subject: bodyData.subject || 'Portfolio Inquiry',
          message: bodyData.message || '',
          isRead: false,
          createdAt: new Date().toISOString()
        };
        msgs.unshift(newMsg);
        setItem('_mock_messages', msgs);
        status = 201;
        responseData = { success: true, message: 'Message sent successfully!' };
      }
      else if (cleanUrl === '/api/admin/messages' && method === 'GET') {
        const msgs = getItem('_mock_messages', initialMessages);
        responseData = msgs;
      }
      else if (cleanUrl.match(/^\/api\/admin\/messages\/[a-zA-Z0-9_-]+(\/(read|reply))?$/)) {
        const parts = cleanUrl.split('/');
        const id = parts[4];
        let msgs = getItem('_mock_messages', initialMessages);
        if (cleanUrl.endsWith('/reply') && method === 'POST') {
          responseData = { success: true, message: 'Reply sent successfully!' };
        } else if (method === 'PUT') {
          msgs = msgs.map(m => m._id === id ? { ...m, isRead: true, ...bodyData } : m);
          setItem('_mock_messages', msgs);
          responseData = { success: true, message: 'Status updated' };
        } else if (method === 'DELETE') {
          msgs = msgs.filter(m => m._id !== id);
          setItem('_mock_messages', msgs);
          responseData = { success: true, message: 'Message deleted' };
        }
      }

      // ─── 7. STATS & ANALYTICS ───
      else if (cleanUrl === '/api/stats' && method === 'GET') {
        const stats = getItem('_mock_stats', initialStats);
        responseData = { success: true, data: stats };
      }
      else if (cleanUrl === '/api/visitors/track' && method === 'POST') {
        const visitors = getItem('_mock_visitors', initialVisitors);
        visitors.totals.today += 1;
        visitors.totals.total += 1;
        setItem('_mock_visitors', visitors);
        responseData = { success: true };
      }
      else if ((cleanUrl === '/api/visitors/analytics' || cleanUrl === '/api/visitors/stats') && method === 'GET') {
        const visitors = getItem('_mock_visitors', initialVisitors);
        responseData = { success: true, data: visitors };
      }

      // ─── 8. AUTH & ADMIN LOGIN ───
      else if ((cleanUrl === '/api/admin/login' || cleanUrl === '/api/admin/auth') && method === 'POST') {
        responseData = {
          success: true,
          token: 'mock-jwt-token-vijay-portfolio-cms',
          user: { name: 'Vijay Dinodia', email: bodyData.email || 'admin@vijay.com' }
        };
      }

      // ─── 9. FILE UPLOAD ───
      else if (cleanUrl === '/api/upload' && method === 'POST') {
        status = 200;
        responseData = {
          success: true,
          url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
        };
      }

      // Fallback for any unhandled /api call
      if (!responseData) {
        responseData = { success: true, data: [], message: 'Mock response' };
      }

      // Supply custom adapter function to return mock response synchronously
      config.adapter = () => {
        return Promise.resolve({
          data: responseData,
          status,
          statusText: status >= 200 && status < 300 ? 'OK' : 'Error',
          headers: { 'content-type': 'application/json' },
          config,
          request: {}
        });
      };
    }

    return config;
  }, (error) => Promise.reject(error));
};
