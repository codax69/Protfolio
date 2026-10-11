export const projectsData = [
  {
    id: "vegbazar",
    featured: true,
    title: "VegBazar",
    type: "Co-Founder / Full Stack",
    date: "2025–2026",
    impact:
      "Built and deployed a production vegetable e-commerce platform handling real customers, orders, payments, delivery workflows, and admin operations.",
    description:
      "A production e-commerce platform designed to simplify local vegetable ordering and delivery. Customers can browse vegetables, place orders, select delivery options, and complete payments, while the admin system manages products, orders, customers, and operations.",
    role: "Full Stack Developer / Co-Founder",
    tech: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "Nginx",
      "VPS"
    ],
    features: [
      "Product catalogue with categories and filtering",
      "Shopping cart and checkout workflow",
      "Online payment integration with Razorpay",
      "Order management and status tracking",
      "Admin dashboard for operational management",
      "Delivery-area and delivery-charge handling",
      "REST API architecture",
      "Responsive mobile-first interface",
      "Production deployment with VPS, Nginx and HTTPS"
    ],
    challenges: [
      "Designing an order workflow for a real local business",
      "Handling product, order and customer data reliably in production",
      "Deploying and maintaining the application on a VPS",
      "Debugging real production issues involving APIs, database connectivity and Nginx",
      "Optimizing the application for mobile users and real-world ordering"
    ],
    outcome:
      "Built and operated a real production e-commerce platform with hundreds of users and more than 1,500 orders handled.",
    liveUrl: "https://vegbazar.store",
    codeUrl: "https://github.com/codax69",
    image: "/assets/vegbazar/home.png",
    images: [
      "/assets/vegbazar/home.png",
      "/assets/vegbazar/products.png",
      "/assets/vegbazar/admin.png"
    ]
  },

  {
    id: "techstore",
    featured: true,
    title: "TechStore",
    type: "Full Stack Project",
    date: "2026",
    impact:
      "Built a containerized React + Django commerce application with PostgreSQL, Docker, Nginx and production deployment infrastructure.",
    description:
      "A full-stack commerce application demonstrating a modern React frontend connected to a Django REST backend and PostgreSQL database. The application was containerized into separate frontend, backend and database services for reproducible deployment.",
    role: "Full Stack Developer",
    tech: [
      "React.js",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Docker",
      "Nginx",
      "Tailwind CSS"
    ],
    features: [
      "React-based responsive frontend",
      "Django REST API backend",
      "PostgreSQL relational database",
      "Dockerized frontend, backend and database",
      "RESTful API architecture",
      "Production environment configuration",
      "Nginx reverse proxy",
      "Domain and HTTPS configuration",
      "Health-check endpoint for backend monitoring"
    ],
    challenges: [
      "Connecting multiple Docker services through a shared network",
      "Configuring PostgreSQL for containerized development and deployment",
      "Routing frontend and backend traffic through Nginx",
      "Managing environment variables across development and production",
      "Debugging Docker port and networking conflicts"
    ],
    outcome:
      "Successfully containerized and deployed the complete full-stack application with independent frontend, backend and database services.",
    liveUrl: "https://techstore.pritesh.site",
    codeUrl: "https://github.com/codax69",
    image: "/assets/techstore/home.png",
    images: [
      "/assets/techstore/home.png",
      "/assets/techstore/products.png",
      "/assets/techstore/dashboard.png"
    ]
  },

  {
    id: "sasiot",
    featured: true,
    title: "SASIOT — Smart Agricultural System",
    type: "IoT / Personal Project",
    date: "2025",
    impact:
      "Connected agricultural sensors with cloud services to provide real-time monitoring and automation for smart farming.",
    description:
      "A smart agriculture IoT system combining microcontrollers, sensors and cloud services to monitor agricultural conditions. The project explores how IoT and software can work together to provide farmers with useful real-time environmental data.",
    role: "IoT & Full Stack Developer",
    tech: [
      "ESP32",
      "ESP8266",
      "Blynk",
      "Firebase",
      "JavaScript",
      "IoT Sensors"
    ],
    features: [
      "Sensor-based agricultural monitoring",
      "ESP32 / ESP8266 microcontroller integration",
      "Real-time sensor data transmission",
      "Firebase cloud connectivity",
      "Blynk-based monitoring",
      "Remote data visualization",
      "Agriculture-focused automation concepts"
    ],
    challenges: [
      "Connecting hardware sensors with cloud services",
      "Maintaining reliable communication between devices and backend services",
      "Handling real-time sensor data",
      "Designing a system that can be extended with additional sensors"
    ],
    outcome:
      "Created an end-to-end IoT prototype demonstrating the connection between physical agricultural sensors, cloud services and software interfaces.",
    liveUrl: "",
    codeUrl:
      "https://github.com/codax69/SASIOT-Smart-Agricultural-System-Powered-by-IoT",
    image: "/assets/sasiot/home.png",
    images: [
      "/assets/sasiot/home.png",
      "/assets/sasiot/dashboard.png",
      "/assets/sasiot/device.png"
    ]
  },

  {
    id: "expense-manager",
    featured: false,
    title: "Expense Manager",
    type: "Personal Project",
    date: "2025",
    impact:
      "Built a full-stack expense management application for organizing income, expenses and financial records through a centralized dashboard.",
    description:
      "A personal finance management application designed to make everyday expense tracking simple. Users can record transactions, organize expenses into categories and view financial summaries through a responsive dashboard.",
    role: "Full Stack Developer",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT"
    ],
    features: [
      "Income and expense tracking",
      "Expense categorization",
      "Transaction management",
      "Financial dashboard",
      "REST API backend",
      "JWT-based authentication",
      "MongoDB data persistence",
      "Responsive interface",
      "Financial summaries and reporting"
    ],
    challenges: [
      "Designing a clean transaction data model",
      "Keeping financial calculations consistent across the application",
      "Building secure authenticated API endpoints",
      "Creating a simple interface for frequent daily data entry"
    ],
    outcome:
      "Created a complete MERN-based financial management system demonstrating authentication, CRUD operations, API design and database modeling.",
    liveUrl: "",
    codeUrl: "https://github.com/codax69",
    image: "/assets/expense-manager/home.png",
    images: [
      "/assets/expense-manager/home.png",
      "/assets/expense-manager/dashboard.png",
      "/assets/expense-manager/transactions.png"
    ]
  },

  {
    id: "qr-attendance",
    featured: true,
    title: "QR Attendance Management System",
    type: "Personal Project",
    date: "2025",
    impact:
      "Adopted by 120+ students at an ITI institute in a 3-month trial. Built role-based access, real-time tracking, and exportable attendance analytics.",
    description:
      "A full-stack MERN application for digitizing attendance management at educational institutes. Students scan a unique QR code to mark their attendance, while instructors and admins get a real-time dashboard with analytics, exportable reports, and role-based access control.",
    role: "Full Stack Developer",
    tech: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JWT Auth",
      "QR Generator"
    ],
    features: [
      "QR-code based attendance marking",
      "Unique QR code per attendance session",
      "Role-based access for Student, Instructor and Admin",
      "Real-time attendance dashboard",
      "Exportable attendance reports",
      "JWT authentication and session management",
      "Attendance trends and analytics",
      "Mobile-friendly QR scanning interface"
    ],
    challenges: [
      "Preventing duplicate and proxy attendance",
      "Designing role-based access across three user types",
      "Managing attendance sessions and QR expiration",
      "Generating useful reports without heavy BI infrastructure"
    ],
    outcome:
      "Successfully trialled at an ITI institute with 120+ students over 3 months, reducing manual attendance work for instructors.",
    liveUrl: "https://attendance-two-ruddy.vercel.app",
    codeUrl: "https://github.com/codax69/qr-attendance",
    image: "",
    images: []
  },

  {
    id: "whatsapp-ecommerce",
    featured: true,
    title: "WhatsApp E-commerce & Custom Products",
    type: "Freelance",
    date: "Mar 2026",
    impact:
      "Created a product showcase with Cloudinary-powered personalization and a direct WhatsApp ordering flow to reduce checkout friction.",
    description:
      "A modern e-commerce product showcase built for VH Magnet, a custom magnet and signage business. Customers can browse products, preview personalized designs and place orders directly through WhatsApp.",
    role: "Frontend Developer",
    tech: [
      "React.js",
      "Tailwind CSS",
      "Cloudinary API",
      "WhatsApp Flow"
    ],
    features: [
      "Product catalogue with category filtering",
      "Cloudinary-powered product personalization",
      "Real-time product preview",
      "One-click WhatsApp ordering",
      "Pre-filled order messages",
      "Responsive mobile-first shopping experience",
      "About and contact pages",
      "Lazy-loaded images"
    ],
    challenges: [
      "Building product personalization without a heavy customization platform",
      "Using Cloudinary transformations for dynamic previews",
      "Designing an ordering process with minimal steps",
      "Optimizing the experience for mobile-first customers"
    ],
    outcome:
      "Delivered a frictionless product discovery and WhatsApp ordering experience for a custom-product business.",
    liveUrl: "https://vhmagnet.in",
    codeUrl: "https://github.com/codax69/vh-magnet",
    image: "/assets/vhmagnet/home.png",
    images: [
      "/assets/vhmagnet/home.png",
      "/assets/vhmagnet/product.png",
      "/assets/vhmagnet/about.png"
    ]
  },

  {
    id: "car-wash-booking",
    featured: true,
    title: "Car Wash Booking System",
    type: "Freelance",
    date: "Jan 2026",
    impact:
      "Designed slot-based booking with real-time conflict prevention, reducing manual scheduling effort by ~80%.",
    description:
      "A production-deployed car wash booking platform built for a real client. Customers can browse services, select available time slots and book appointments online, while the business manages bookings through Google Sheets.",
    role: "Full Stack Developer",
    tech: [
      "React.js",
      "Tailwind CSS",
      "Google Sheets API",
      "Node.js"
    ],
    features: [
      "Real-time slot availability",
      "Booking conflict prevention",
      "Service catalogue with pricing and duration",
      "Google Sheets-based booking management",
      "Responsive mobile-first design",
      "Photo gallery",
      "Contact and location integration"
    ],
    challenges: [
      "Implementing booking conflict prevention without a traditional database",
      "Using Google Sheets API as a lightweight backend",
      "Keeping booking data synchronized",
      "Optimizing image-heavy pages for mobile performance"
    ],
    outcome:
      "Reduced manual scheduling effort by approximately 80% and helped the client manage appointments with fewer booking conflicts.",
    liveUrl: "https://yourcarwasher.in",
    codeUrl: "https://github.com/codax69/car-washer",
    image: "/assets/YCW/home.png",
    images: [
      "/assets/YCW/home.png",
      "/assets/YCW/services.png",
      "/assets/YCW/gallery.png"
    ]
  },

  {
    id: "digital-childhood-memory",
    featured: false,
    comingSoon: true,
    title: "Digital Childhood Memory Platform",
    type: "SaaS / Product",
    date: "Coming Soon",
    impact:
      "A long-term private digital memory platform designed to preserve a child's photos, videos, milestones and stories as a structured life timeline.",
    description:
      "A private digital childhood platform where parents can continuously capture and organize memories throughout a child's life. The product focuses on turning scattered photos and moments into a meaningful, searchable digital timeline.",
    role: "Product Designer & Full Stack Developer",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "Database",
      "Cloud Storage"
    ],
    features: [
      "Child profiles",
      "Private memory timeline",
      "Photo and video memories",
      "Milestones and events",
      "Stories and notes",
      "Organized memory collections",
      "Private family access",
      "Long-term digital archive"
    ],
    challenges: [
      "Designing a product intended for long-term use",
      "Building privacy-focused family access",
      "Managing large media collections",
      "Creating a timeline that remains useful as years of memories accumulate"
    ],
    outcome:
      "Currently being designed as a long-term SaaS product focused on preserving childhood memories in a structured and meaningful way.",
    liveUrl: "",
    codeUrl: "",
    image: "/assets/childhood-memory/home.png",
    images: [
      "/assets/childhood-memory/home.png",
      "/assets/childhood-memory/timeline.png",
      "/assets/childhood-memory/memories.png"
    ]
  },

  {
    id: "apibolt",
    featured: false,
    title: "APIBolt",
    type: "Developer Tool",
    date: "2026",
    impact:
      "A developer-focused CLI concept designed to accelerate REST API project setup by generating consistent backend structures automatically.",
    description:
      "APIBolt is a developer productivity tool designed to generate boilerplate structures for backend and REST API projects. The goal is to eliminate repetitive setup work and help developers start building business logic faster.",
    role: "Developer Tool Builder",
    tech: [
      "Node.js",
      "JavaScript",
      "CLI",
      "REST API"
    ],
    features: [
      "CLI-based project generation",
      "Automatic backend folder structure",
      "Controller generation",
      "Route generation",
      "Model scaffolding",
      "Middleware structure",
      "Configuration setup",
      "Developer-friendly commands"
    ],
    challenges: [
      "Designing a useful CLI developer experience",
      "Generating predictable project structures",
      "Keeping generated code maintainable",
      "Designing the tool to support future framework templates"
    ],
    outcome:
      "Designed as a developer productivity project focused on reducing repetitive API setup and improving consistency across backend projects.",
    liveUrl: "",
    codeUrl: "https://github.com/codax69",
    image: "/assets/apibolt/home.png",
    images: [
      "/assets/apibolt/home.png",
      "/assets/apibolt/terminal.png"
    ]
  }
];