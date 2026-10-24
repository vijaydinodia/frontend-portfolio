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
    title: 'InterviewFlow',
    slug: 'interviewflow-interview-job-preparation-platform',
    shortDescription: 'Full-stack enterprise technical interview management and candidate assessment SaaS platform with embedded Monaco editor & RBAC.',
    fullDescription: '<p>InterviewFlow is an enterprise-grade technical interview management and candidate assessment SaaS platform engineered to streamline the end-to-end recruitment lifecycle. It centralizes real-time candidate evaluations, dynamic role-based workflow coordination, and secure document verification into a single unified workspace.</p><p>Key architectural components include an embedded Monaco code editor for live coding rounds, multi-role JWT authentication (Candidate, Interviewer, Company, Super Admin), Cloudinary streaming for resumes and profile assets, and a low-overhead system telemetry daemon monitoring CPU, memory, and database latency.</p>',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL / MySQL', 'Sequelize ORM', 'TailwindCSS', 'Monaco Editor', 'Cloudinary', 'JWT', 'REST API'],
    category: 'Full Stack',
    status: 'Completed',
    isFeatured: true,
    displayOrder: 0,
    liveUrl: 'https://interviewflow-vijay-dinodia.vercel.app/',
    githubUrl: 'https://github.com/vijaydinodia',
    thumbnail: '/projects/interviewflow/interviewflow-hero.png',
    screenshots: [
      {
        title: 'Master Technical Interviews & Skill Matching Hero',
        url: '/projects/interviewflow/interviewflow-hero.png',
        caption: 'Landing interface showcasing 1:1 technical mock interviews, verified skill rating scorecards, and direct recruiter hiring.'
      },
      {
        title: 'Super Admin Master Control & Infrastructure Telemetry',
        url: '/projects/interviewflow/interviewflow-admin.png',
        caption: 'Master control dashboard monitoring 99.9% platform availability, real-time latency, active login sessions, and DSA question bank.'
      },
      {
        title: 'Candidate 1:1 Mock Interview & FlowCode IDE Workspace',
        url: '/projects/interviewflow/interviewflow-candidate-dashboard.png',
        caption: 'Candidate dashboard featuring 1:1 mock interviews with engineering leads, live IDE problem solving, and company invites.'
      },
      {
        title: 'Problem Solving Analytics & Performance Metrics',
        url: '/projects/interviewflow/interviewflow-candidate-analytics.png',
        caption: 'Candidate performance analytics tracking solved problem difficulty distribution, submission accuracy (84.6%), and language breakdown.'
      },
      {
        title: 'Technical Interview Platform & Secure Sign In Portal',
        url: '/projects/interviewflow/interviewflow-auth.png',
        caption: 'Split authentication portal showcasing live coding IDE preview, AI evaluation scorecards, and multi-role credentials.'
      }
    ],
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
    title: 'SevaSetu',
    slug: 'sevasetu-on-demand-local-services-platform',
    shortDescription: 'Hyper-local home services & KYC marketplace with two-phase OTP booking execution and geo-location constraints.',
    fullDescription: '<p>SevaSetu is an on-demand hyper-local home services and provider booking marketplace designed to connect customers with verified skilled service providers. It solves trust, transparency, and geographical fragmentation in local home services through strict KYC verification, dynamic location/pincode filtering, and automated two-phase OTP job execution tracking.</p><p>Features include multi-role administration, category-based approval flows, automated password generation with HTML email delivery, in-memory Multer buffering with Cloudinary, and resilient MongoDB transactions with replica-set fallback.</p>',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Cloudinary', 'Nodemailer', 'TailwindCSS', 'JWT', 'REST API'],
    category: 'Full Stack',
    status: 'Completed',
    isFeatured: true,
    displayOrder: 1,
    liveUrl: 'https://frontend-seva-setu.vercel.app/',
    githubUrl: 'https://github.com/vijaydinodia',
    thumbnail: '/projects/sevasetu/sevasetu-hero.png',
    screenshots: [
      {
        title: 'House Help Booking & Service Discovery',
        url: '/projects/sevasetu/sevasetu-hero.png',
        caption: 'Bilingual customer booking portal with real-time active pros counter and verified housekeeping experts.'
      },
      {
        title: 'Super Admin Overview Dashboard',
        url: '/projects/sevasetu/sevasetu-dashboard.png',
        caption: 'Central control center monitoring platform-wide users, admins, active providers, bookings, and categories.'
      },
      {
        title: 'Revenue & Bookings Trend Analytics',
        url: '/projects/sevasetu/sevasetu-analytics.png',
        caption: 'Interactive 6-month historical platform financial revenue trends and booking volume analytics.'
      },
      {
        title: 'Authentication & Onboarding Portal',
        url: '/projects/sevasetu/sevasetu-auth.png',
        caption: 'Secure multi-provider onboarding with standard email/password authentication and Google OAuth integration.'
      }
    ],
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
    _id: 'proj-medicore',
    title: 'MediCore',
    slug: 'medicore-hospital-management-platform',
    shortDescription: 'Full-stack MERN healthcare application with 7 role-specific portals, dynamic slot booking & Razorpay integration.',
    fullDescription: '<p>MediCore is a comprehensive, multi-role hospital management web platform designed to streamline clinical, administrative, and pharmacy workflows. The system bridges the gap between healthcare providers and patients by centralizing doctor discovery, automated slot-based appointment scheduling, diagnostic laboratory management, and online pharmacy orders.</p><p>Features 7 role-specific portals (Super Admin, Hospital Admin, Doctor, Receptionist, Diagnostic Lab, Medical Store, Patient), Razorpay payment processing, SendGrid transactional emails, and Cloudinary medical report uploads.</p>',
    techStack: ['React 19', 'Node.js', 'Express 5', 'MongoDB', 'Mongoose 9', 'TailwindCSS v4', 'Material UI', 'Razorpay', 'Cloudinary', 'SendGrid', 'JWT'],
    category: 'Full Stack',
    status: 'Completed',
    isFeatured: true,
    displayOrder: 2,
    liveUrl: 'https://medicore-vijay-dinodia.onrender.com/',
    githubUrl: 'https://github.com/vijaydinodia',
    thumbnail: '/projects/medicore/medicore-hospital-dashboard.png',
    screenshots: [
      {
        title: 'Hospital Admin Dashboard & Financial Revenue Analytics',
        url: '/projects/medicore/medicore-hospital-dashboard.png',
        caption: 'Central hospital workspace displaying consultation vs. diagnostic revenue, 30-day trends, and payment method distribution.'
      },
      {
        title: 'Command Center & Hospital Governance',
        url: '/projects/medicore/medicore-governance.png',
        caption: 'Super Admin governance portal reviewing hospital registrations, live record statuses, and access permissions.'
      },
      {
        title: 'Care Network Operations & Secure Role Sign In',
        url: '/projects/medicore/medicore-signin.png',
        caption: 'Unified role-based authentication portal providing single-entry access into 7 distinct hospital workspaces.'
      },
      {
        title: 'Hospital Onboarding & Registration Form',
        url: '/projects/medicore/medicore-onboarding.png',
        caption: 'Multi-stage hospital onboarding wizard with real-time readiness scoring, facility verification, and document submission.'
      }
    ],
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
    _id: 'proj-rajexamvault',
    title: 'Raj Exam Vault',
    slug: 'raj-exam-vault-edtech-cbt-assessment-platform',
    shortDescription: 'Full-stack SaaS EdTech platform & bilingual CBT mock test simulator for Rajasthan competitive exams with recursive syllabus & real-time telemetry.',
    fullDescription: '<p>Raj Exam Vault (राजस्थान एग्जाम वॉल्ट) is a specialized full-stack educational SaaS platform engineered to streamline preparation for Rajasthan state government competitive exams (RPSC RAS, REET, Police, Patwari, CET, VDO). It replaces fragmented study resources by consolidating a 4-tier recursive syllabus hierarchy, an interactive bilingual Computer-Based Test (CBT) mock exam engine, cloud-streamed Previous Year Question (PYQ) vaults, and a daily current affairs digest into a high-performance, unified platform.</p><p>Built with Next.js 16 App Router and Express 5, the platform incorporates strict Role-Based Access Control (RBAC), direct PDF cloud streaming via Cloudinary, an integrated 5-tab SuperAdmin Question Studio with bulk JSON/CSV validation, and an in-house real-time telemetry and observability hub.</p>',
    techStack: ['Next.js 16', 'React 19', 'Express 5', 'Node.js', 'MySQL', 'Sequelize ORM', 'Tailwind CSS 4', 'Cloudinary', 'JWT', 'Nodemailer'],
    category: 'Full Stack',
    status: 'Completed',
    isFeatured: true,
    displayOrder: 3,
    liveUrl: 'https://raj-exam-vault-frontend.vercel.app/',
    githubUrl: null,
    thumbnail: '/projects/rajexam/rajexam-hero.png',
    screenshots: [
      {
        title: 'Landing Page & RPSC RAS Target Exam Vault',
        url: '/projects/rajexam/rajexam-hero.png',
        caption: 'Bilingual Rajasthan exam preparation landing page with interactive RAS exam hierarchy, PYQ papers, and handwritten notes.'
      },
      {
        title: 'SuperAdmin Control Center & Rajasthan Exams Management',
        url: '/projects/rajexam/rajexam-admin.png',
        caption: 'Comprehensive administrative dashboard managing state exams (CET 12th, RSMSSB Patwari, RPSC RAS), syllabus subjects, and staff invites.'
      },
      {
        title: 'Real-Time System Telemetry & MySQL Observability Hub',
        url: '/projects/rajexam/rajexam-telemetry.png',
        caption: 'In-house observability suite monitoring MySQL 8.0 engine metrics, buffer pool hits (100%), connection pools, and API logs with zero-DB fallback.'
      },
      {
        title: 'Aspirant Study Vault & Secure 3D Authentication',
        url: '/projects/rajexam/rajexam-auth.png',
        caption: 'Split authentication portal featuring 3D glowing study vault illustration and multi-provider social & OTP logins.'
      },
      {
        title: 'Student Support Desk & Bug Reporting System',
        url: '/projects/rajexam/rajexam-support.png',
        caption: 'Zero-login student issue resolution desk allowing aspirants to submit OTP, registration, or platform bug tickets directly.'
      }
    ],
    keyFeatures: [
      'Interactive Bilingual CBT Mock Test Engine with real-time countdown timers, Hindi/English toggles, negative marking & question status palette',
      '4-Tier Recursive Syllabus & Exam Hierarchy (Exam -> Stage -> Subject -> Topic) with sub-50ms queries',
      'Integrated 5-Tab SuperAdmin Question Studio supporting direct authoring & bulk JSON/CSV uploads with live schema validation',
      'Aspirant Personal Vault & Study Library with one-click cross-portal bookmarking for PYQs and notes',
      'Cloud Document Delivery with direct Multer & Cloudinary CDN streaming and embedded in-browser PDF viewers',
      'Bilingual Rajasthan Current Affairs Hub featuring categorized state GK, policy updates, and dynamic slug routing',
      'Enterprise System Telemetry & Observability Hub tracking dwell times, heartbeat beacons, and Winston daily rotating logs',
      'Secure Split-Screen Authentication with 6-digit Gmail SMTP OTP verification and JWT RBAC across 11 modules'
    ],
    challengesFaced: 'Modeled a deeply nested 4-tier exam hierarchy with optimized recursive queries in Sequelize under 50ms. Built a client-side JSON/CSV parser with pre-flight schema validation and transactional bulkCreate pipeline. Whitelisted custom telemetry headers (x-session-id, x-page-path) with zero-DB fallback to Winston daily rotating logs. Built a bilingual CBT interface persisting timers and responses across reloads.',
    metrics: { users: '3.2k+', performanceScore: '99/100', apiCalls: '240k+/mo' },
    isDeleted: false
  },
  {
    _id: 'proj-docusense',
    title: 'DocuSense',
    slug: 'docusense-intelligent-dynamic-schema-document-extraction-platform',
    shortDescription: 'Full-stack dynamic document extraction and visual verification engine with real-time two-way OCR bounding box synchronization & Gemini Multimodal AI.',
    fullDescription: '<p>DocuSense is an enterprise-grade document extraction and visual verification platform designed to replace brittle, template-locked OCR with a generic, database-driven dynamic schema engine (EAV). The platform processes multi-page PDFs, images, and DOCX files using a hybrid pipeline of Computer Vision, OCR, and Google Gemini Multimodal AI.</p><p>A standout engineering highlight is its interactive split-screen verification workspace built in React 19 and PDF.js, where clicking any form field highlights the exact source bounding box on the document canvas in real time with automated smooth scrolling, and vice versa—eliminating manual verification errors and human audit bottlenecks.</p>',
    techStack: ['React 19', 'Node.js', 'Express', 'MySQL', 'Sequelize ORM', 'PDF.js', 'Google Gemini Multimodal API', 'Tesseract.js', 'Sharp', 'Vite', 'TailwindCSS'],
    category: 'Full Stack',
    status: 'Completed',
    isFeatured: true,
    displayOrder: 4,
    liveUrl: 'https://docusense-platform.vercel.app/',
    githubUrl: 'https://github.com/vijaydinodia',
    thumbnail: '/projects/docusense/docusense-hero.png',
    screenshots: [
      {
        title: 'Split-Screen Document Verification & Bi-Directional Highlighting',
        url: '/projects/docusense/docusense-hero.png',
        caption: 'Interactive visual verification workspace featuring PDF.js canvas with percentage-based bounding box overlays and real-time form synchronization.'
      },
      {
        title: 'Dynamic Schema Builder & EAV Field Management Studio',
        url: '/projects/docusense/docusense-schema.png',
        caption: 'Zero-code schema configuration studio enabling custom document types, nested table definitions, regex rules, and confidence thresholds without DB migrations.'
      },
      {
        title: 'OCR Inspection & 16-Strategy Candidate Ranking Engine',
        url: '/projects/docusense/docusense-sync.png',
        caption: 'Real-time candidate ranking dropdown factoring in Levenshtein distance, spatial proximity, and OCR confidence heuristics for instant correction.'
      },
      {
        title: 'Multimodal Pipeline Observability & Anti-Hallucination Grounding',
        url: '/projects/docusense/docusense-analytics.png',
        caption: 'System observability dashboard tracking Google Gemini Vision API inference latency (320ms), 0% hallucination rate, and MySQL Sequelize ACID transactions.'
      }
    ],
    keyFeatures: [
      'Dynamic Schema Management (EAV Core) supporting zero-code document template configuration across invoices, tax forms, and IDs',
      'Continuous multi-page PDF.js canvas viewer with bi-directional real-time bounding box synchronization and automated smooth scrolling',
      'Hybrid extraction pipeline combining Tesseract.js/pdf-parse text geometry, spatial heuristics, and Google Gemini Multimodal Vision API',
      '16-strategy candidate ranking and scoring engine with Levenshtein string distance, label proximity, and layout heuristics',
      'Anti-hallucination grounding validator achieving 0% hallucination rate by cross-referencing extracted values with source OCR token IDs',
      'Atomic ACID MySQL database transactions with rollback guarantees for multi-page batch document scans'
    ],
    challengesFaced: 'Engineered normalized percentage-based coordinates ((norm.x / origW) * 100%) to maintain pixel-perfect bounding box alignment across responsive screens and 50%-200% zoom levels. Eliminated LLM hallucinations in financial documents by building a strict schema filter and OCR token ID grounding validator. Decoupled large multi-page canvas rendering from form keystroke states using memoized subtrees and a token search cache to prevent UI lag.',
    metrics: { users: '2.4k+', performanceScore: '99/100', apiCalls: '195k+/mo' },
    isDeleted: false
  },
  {
    _id: 'proj-shieldops',
    title: 'ShieldOps',
    slug: 'shieldops-real-time-endpoint-security-soc-log-analytics-platform',
    shortDescription: 'Full-stack Endpoint Detection & Response (EDR) and SIEM solution with custom Windows telemetry agent, real-time heuristic threat detection & SOC dashboard.',
    fullDescription: '<p>ShieldOps is an enterprise-grade endpoint security and monitoring platform engineered to ingest system vitals and Windows Event Logs in real time. It pairs a lightweight Node.js background agent with a high-throughput Express/MongoDB ingestion pipeline and a responsive React SOC analyst dashboard.</p><p>Key highlights include native PowerShell Windows event harvesting with monotonic checkpointing to guarantee zero duplicate logs, real-time heuristic brute-force attack correlation (Event ID 4625), host resource starvation alerts, device-level RBAC isolation, and sub-100ms multi-field search across millions of log records.</p>',
    techStack: ['React 18', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Tailwind CSS', 'Recharts', 'PowerShell', 'systeminformation', 'REST API', 'JWT'],
    category: 'Full Stack',
    status: 'Completed',
    isFeatured: true,
    displayOrder: 5,
    liveUrl: 'https://shieldops-security.vercel.app/',
    githubUrl: 'https://github.com/vijaydinodia',
    thumbnail: '/projects/shieldops/shieldops-hero.png',
    screenshots: [
      {
        title: 'SOC Dashboard Overview & Fleet Telemetry Streams',
        url: '/projects/shieldops/shieldops-hero.png',
        caption: 'Fleet health command center featuring radial device status meters, dual-axis Recharts CPU/RAM telemetry streams, and active prioritized security alerts.'
      },
      {
        title: 'SIEM Event Explorer & Multi-Field Search Engine',
        url: '/projects/shieldops/shieldops-events.png',
        caption: 'Fast Windows Event Log explorer supporting Security/System/Application channel filtering, keyword search highlighting, and sub-100ms compound queries.'
      },
      {
        title: 'Raw Event JSON Inspection & Deep Attribute Parsing',
        url: '/projects/shieldops/shieldops-inspection.png',
        caption: 'Interactive modal inspecting parsed Windows Event ID 4625 (Failed Logon) with extracted security context (username, workstation, IP, logon type).'
      },
      {
        title: 'Security Incident Triage & Automated Response Workflow',
        url: '/projects/shieldops/shieldops-triage.png',
        caption: 'Incident management console tracking brute-force cyberattack timelines, geolocation metadata, and one-click Acknowledge/Close triage transitions.'
      }
    ],
    keyFeatures: [
      'Autonomous Windows Endpoint Agent gathering hardware vitals and event logs every 10s with <1% CPU overhead',
      'Monotonic Checkpoint Tracking (.agent_state.json) preventing duplicate ingestions across system restarts and network partitions',
      'Real-Time Heuristic Detection Engine automatically flagging brute-force login attacks (5+ Event 4625 in 5 min) and CPU spikes (>90%)',
      'Sub-100ms SIEM Multi-Field Search powered by MongoDB compound and text indexes',
      'Device-Centric Role-Based Access Control (RBAC) isolating standard users while granting fleet-wide visibility to SOC admins',
      'Analyst SOC Workspace with Recharts live telemetry, heartbeat beacons, raw JSON modals, and incident triage lifecycle (Open -> Ack -> Closed)'
    ],
    challengesFaced: 'Prevented duplicate log ingestion during agent restarts by maintaining monotonic Record ID checkpoints in .agent_state.json coupled with MongoDB compound unique indexes ({ agentId, logName, recordId }). Kept search latency under 100ms across high-volume log streams using compound indexes ({ agentId, timestamp: -1 }) and text indexes. Reconciled React state during 15s background polling to prevent clearing active search strings, scroll positions, or open modals.',
    metrics: { users: '1.8k+', performanceScore: '99/100', apiCalls: '280k+/mo' },
    isDeleted: false
  },
  {
    _id: 'proj-task-manager',
    title: 'Task Manager',
    slug: 'task-manager-trello-inspired-platform',
    shortDescription: 'Full-stack MERN task management application with @dnd-kit Kanban board, bulk Excel import & SendGrid scheduler.',
    fullDescription: '<p>Task Manager is a full-stack web application designed to streamline daily task management, team workflows, and project organization. It solves communication bottlenecks and tracking inefficiencies by providing role-based access control for administrators and standard users, interactive Kanban boards, and status lifecycle management.</p><p>Key highlights include @dnd-kit drag-and-drop tag boards, XLSX bulk spreadsheet import with Multer memory buffering, automated timezone-aware daily HTML email digests via SendGrid, and comprehensive analytics tracking.</p>',
    techStack: ['React 19', 'Node.js', 'Express 5', 'MongoDB', 'Mongoose', 'TailwindCSS', '@dnd-kit', 'SendGrid', 'Multer', 'XLSX', 'JWT'],
    category: 'Full Stack',
    status: 'Completed',
    isFeatured: true,
    displayOrder: 6,
    liveUrl: 'https://task-manger-frontend-3zoz.onrender.com/',
    githubUrl: 'https://github.com/vijaydinodia/Task-Manger',
    thumbnail: '/projects/taskmanager/taskmanager-hero.png',
    screenshots: [
      {
        title: 'Work Control Center & Artemis Kanban Board',
        url: '/projects/taskmanager/taskmanager-hero.png',
        caption: 'High-performance team workspace featuring active Artemis Launch Kanban board, milestone progress tracking, sprint on-time metrics (98%), and real-time team synchronization.'
      },
      {
        title: 'Proven 3-Step Execution Workflow & 3D Collaboration Stage',
        url: '/projects/taskmanager/taskmanager-workflow.png',
        caption: 'Structured workflow pipeline breaking down chaotic requests into Organize & Assign, Real-Time Collaboration, and Monitor & Deliver with holographic team node visualization.'
      },
      {
        title: 'Split-Screen Authentication & Workspace Access Portal',
        url: '/projects/taskmanager/taskmanager-auth.png',
        caption: 'Focused authentication gateway featuring daily sprint velocity trackers, milestone status summaries, and secure JWT sign-in to active workspaces.'
      }
    ],
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
  projectsBuilt: initialProjects.filter(p => !p.isDeleted).length,
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
    storedProjects[0]?._id !== 'proj-interviewflow' ||
    storedProjects[1]?._id !== 'proj-sevasetu' ||
    storedProjects[2]?._id !== 'proj-medicore' ||
    storedProjects[3]?._id !== 'proj-rajexamvault' ||
    storedProjects[4]?._id !== 'proj-docusense' ||
    storedProjects[5]?._id !== 'proj-shieldops' ||
    storedProjects[6]?._id !== 'proj-task-manager' ||
    !storedProjects.find(p => p._id === 'proj-shieldops')?.screenshots ||
    storedProjects.find(p => p._id === 'proj-shieldops')?.thumbnail?.includes('unsplash') ||
    !storedProjects.find(p => p._id === 'proj-docusense')?.screenshots ||
    storedProjects.find(p => p._id === 'proj-docusense')?.thumbnail?.includes('unsplash') ||
    !storedProjects.find(p => p._id === 'proj-interviewflow')?.screenshots ||
    storedProjects.find(p => p._id === 'proj-interviewflow')?.thumbnail?.includes('unsplash') ||
    !storedProjects.find(p => p._id === 'proj-sevasetu')?.screenshots ||
    storedProjects.find(p => p._id === 'proj-sevasetu')?.thumbnail?.includes('unsplash') ||
    !storedProjects.find(p => p._id === 'proj-medicore')?.screenshots ||
    storedProjects.find(p => p._id === 'proj-medicore')?.thumbnail?.includes('unsplash') ||
    !storedProjects.find(p => p._id === 'proj-rajexamvault')?.screenshots ||
    storedProjects.find(p => p._id === 'proj-rajexamvault')?.thumbnail?.includes('unsplash') ||
    storedProjects.find(p => p._id === 'proj-rajexamvault')?.liveUrl !== 'https://raj-exam-vault-frontend.vercel.app/' ||
    storedProjects.find(p => p._id === 'proj-rajexamvault')?.githubUrl !== null ||
    !storedProjects.find(p => p._id === 'proj-task-manager')?.screenshots ||
    storedProjects.find(p => p._id === 'proj-task-manager')?.thumbnail?.includes('unsplash') ||
    storedProjects.some(p => 
      p.liveUrl === 'https://medicore-health.vercel.app' || 
      p.liveUrl === 'https://backend-sevasetu.onrender.com' || 
      p.liveUrl === 'https://interviewflow-platform.vercel.app' || 
      p.liveUrl === 'https://backend-1tqe.onrender.com' ||
      (p.githubUrl && !p.githubUrl.startsWith('https://github.com/vijaydinodia'))
    )
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
  const currentProjects = getItem('_mock_projects', initialProjects);
  const realProjectsCount = currentProjects.filter(p => !p.isDeleted).length;
  if (!storedStats || storedStats.leetcodeSolved < 400 || storedStats.githubRepos < 50 || storedStats.projectsBuilt !== realProjectsCount) {
    setItem('_mock_stats', {
      ...(storedStats || initialStats),
      projectsBuilt: realProjectsCount
    });
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
        active.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
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
        const projects = getItem('_mock_projects', initialProjects);
        const realCount = projects.filter(p => !p.isDeleted).length;
        responseData = { success: true, data: { ...stats, projectsBuilt: realCount } };
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
