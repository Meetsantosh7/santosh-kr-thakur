"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  MapPin,
  Download,
  Phone,
  Send,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, createContext, useContext } from "react";
import ClientOnly from "./components/ClientOnly";

import db from "@/lib/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  increment,
  setDoc,
} from "firebase/firestore";
import { useProjects } from "@/hooks/useProjects";

// Theme Context
const ThemeContext = createContext<{
  theme: "light" | "dark";
  toggleTheme: () => void;
}>({
  theme: "dark",
  toggleTheme: () => {},
});

const useTheme = () => useContext(ThemeContext);

// Theme Provider Component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [visitorCount, setVisitorCount] = useState<number>(0);

useEffect(() => {
  const updateVisitorCount = async () => {
    const firestore = getFirestore(db);
    const counterRef = doc(firestore, "visitors", "counter");
    try {
      // Try to increment
      await updateDoc(counterRef, { count: increment(1) });
    } catch (error) {
      // If document doesn't exist, create it
      await setDoc(counterRef, { count: 1 }, { merge: true });
    }
    // Get the updated count
    const snapshot = await getDoc(counterRef);
    setVisitorCount(snapshot.data()?.count ?? 0);
  };
  updateVisitorCount();
}, []);
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as
      | "light"
      | "dark"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Updated Data Arrays (keeping the same data structure)
const personalInfo = {
  name: "Santosh Kumar Thakur",
  title: "Full Stack Developer",
  tagline: "Building digital experiences that matter",
  subtitle: "Crafting scalable web solutions",
  intro:
    "I am a motivated and versatile individual, always eager to take on new challenges. With a passion for learning I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.",
  email: "santosh07entrepreneur@gmail.com",
  location: "New Delhi",
  phone: "+91 9971652277",
  experience: "2.5 Years",
  projects: "10+ Projects",
  clients: "25+ Clients",
  socialLinks: [
    { name: "GitHub", url: "https://github.com/Meetsantosh7", icon: Github },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/santoshkumarthakur1917",
      icon: Linkedin,
    },
    { name: "Instagram", url: "#", icon: Instagram },
    {
      name: "Email",
      url: "mailto:santosh07entrepreneur@gmail.com",
      icon: Mail,
    },
  ],
};

const experiences = [
  {
    id: 1,
    title: "Software Developer",
    company: "Ministry of Education – Innovation Cell",
    period: "Mar 2024 - Present",
    duration: "1+ Years",
    location: "Vasant Kunj, New Delhi",
    type: "Full-time",
    responsibilities: [
      "Enhanced user experiences on Netscript PG & Netscript Analytics portal using React.js, 20% user engagement boost",
      "Built responsive web applications with React.js and Laravel, serving 60,000+ daily active users",
      "Optimized database queries reducing response time by 40% using MySQL optimization techniques",
      "Mentored junior developers and conducted code reviews ensuring high code quality",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "Laravel",
      "MySQL",
      "GitLab ",
      "Php",
      "MYsql",
    ],
  },
  {
    id: 2,
    title: "Technical Support Engineer",
    company: "Tech mahindra ",
    period: "Aug 2023 - Mar 2023",
    duration: "8 months",
    location: "Noida",
    type: "Full-time",
    responsibilities: [
      "Provided technical support to 100+ clients daily, resolving complex software and hardware issues",
      "Followed up on customer queries and maintained 95% customer satisfaction rate",
      "Managed ticketing system using Jira, ensuring timely resolution of critical issues",
      "Collaborated with development teams to escalate and resolve technical bugs",
      "Conducted system diagnostics and troubleshooting for client applications",
      "Created technical documentation and knowledge base articles for common issues",
      "Monitored system performance and provided proactive maintenance recommendations",
      "Trained new team members on support processes and troubleshooting techniques",
    ],
    technologies: [
      "Jira",
      "Bliss",
      "ServiceNow",
      "Remote Desktop",
      "Windows Server",
      "Linux",
      "SQL",
    ],
  },
  {
    id: 3,
    title: "Tech Support Engineer",
    company: "Concentrics Pvt Ltd",
    period: "Aug 2022 - Dec 2022",
    duration: "5 months",
    location: "Gurugram",
    type: "Full-time",
    responsibilities: [
      "Provided remote technical support to clients across different time zones",
      "Troubleshot software installations, configurations, and compatibility issues",
      "Assisted clients with network connectivity and security setup problems",
      "Resolved hardware malfunctions and provided replacement recommendations",
      "Documented technical issues and solutions in company knowledge base",
      "Conducted remote screen sharing sessions for hands-on problem resolution",
      "Managed support ticket queue and prioritized based on severity levels",
      "Provided technical training to end-users on software applications",
    ],
    technologies: [
      "TeamViewer",
      "Remote Desktop",
      "Windows",
      "MacOS",
      "Office 365",
      "VPN",
      "Antivirus",
    ],
  },
  {
    id: 4,
    title: "Data Analyst Intern",
    company: "The QED Group Pvt. Ltd., New Delhi",
    period: "Jan 2019 - Jun 2019",
    duration: "5 months",
    location: "Green Park, New Delhi",
    type: "Internship",
    responsibilities: [
      "Analyzed large datasets using Excel and Python to identify business trends and patterns",
      "Created comprehensive reports and visualizations using Power BI and Tableau",
      "Cleaned and preprocessed raw data to ensure accuracy and consistency",
      "Collaborated with senior analysts to develop data-driven insights for business decisions",
      "Performed statistical analysis and hypothesis testing on customer behavior data",
      "Automated data collection processes using Python scripts and SQL queries",
      "Presented findings to stakeholders through interactive dashboards and presentations",
      "Maintained data integrity and implemented quality control measures",
    ],
    technologies: [
      "Python",
      "SQL",
      "Excel",
      "Power BI",
      "Tableau",
      "Pandas",
      "NumPy",
      "MySQL",
    ],
  },
];

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 90, icon: "▲" },
      { name: "JavaScript", level: 92, icon: "🟨" },
      { name: "HTML5", level: 95, icon: "🌐" },
      { name: "CSS3", level: 90, icon: "🎨" },
      { name: "Tailwind CSS", level: 88, icon: "💨" },
      { name: "Bootstrap", level: 85, icon: "🅱️" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "PHP", level: 92, icon: "🐘" },
      { name: "Laravel", level: 90, icon: "🔴" },
      { name: "Node.js", level: 85, icon: "💚" },
      // { name: "Express.js", level: 82, icon: "⚡" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", level: 90, icon: "🐬" },
      // { name: "MongoDB", level: 78, icon: "🍃" },
      { name: "Firebase", level: 85, icon: "🔥" },
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git", level: 92, icon: "📝" },
      { name: "VS Code", level: 95, icon: "💙" },
      { name: "Figma", level: 80, icon: "🎨" },
      { name: "Postman", level: 88, icon: "📮" },
    ],
  },
];

const education = [
  {
    id: 1,
    degree: "Master of Computer Applications (MCA)",
    institution: "Chandigarh University",
    year: "Pursuing",
    grade: "Pursuing",
    description:
      "Advanced studies in Computer Applications, Software Development, and Modern Technologies",
  },
  {
    id: 2,
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Kendriya Vidyalaya Masjid Moth Saidha Nagar",
    year: "2019 - 2022",
    grade: "8.94 (CGPA)",
    description:
      "Comprehensive study of Computer Applications, Programming Languages, and Software Development with focus on practical implementation",
  },
  {
    id: 3,
    degree: "Class 12th (Science Stream)",
    institution: "Kendriya Vidyalaya Masjid Moth Saidha Nagar",
    year: "2018",
    grade: "75.2%",
    description:
      "Science Stream with Physics, Chemistry, Mathematics, and Computer Science",
  },
];

const navigationItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Work", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

// Theme Toggle Component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed top-6 right-20 md:right-6 z-50 w-12 h-12 rounded-full border-2 backdrop-blur-md shadow-lg transition-all duration-300 flex items-center justify-center ${
        theme === "dark"
          ? "bg-white/10 border-gray-700/20 hover:bg-white/20 text-yellow-400"
          : "bg-black/10 border-gray-300/20 hover:bg-black/20 text-orange-500"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function PortfolioContent() {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  // SIH Images data
  const sihImages = [
    {
      src: "/images/sih-1.jpeg",
      title: "SIH UI/UX Design Mentor Award",
      description:
        "Honored as UI/UX Design Mentor for exceptional guidance in user experience design and interface innovation at Smart India Hackathon",
    },
    {
      src: "/images/sih-2.jpeg",
      title: "UI/UX Design Mentoring Session",
      description:
        "Leading comprehensive UI/UX design sessions and guiding student teams through user-centered design methodologies",
    },
    {
      src: "/images/sih-3.jpeg",
      title: "SIH Design Thinking Workshop",
      description:
        "Conducting intensive workshops on UI/UX design principles, prototyping, and user research techniques",
    },
    {
      src: "/images/sih-4.jpeg",
      title: "SIH Design Team Collaboration",
      description:
        "Working closely with participating teams to refine user interface concepts and enhance user experience strategies",
    },
    {
      src: "/images/sih-5.jpg",
      title: "SIH 2024 Grand Finale",
      description:
        "Proud to serve as UI/UX Design Mentor at Smart India Hackathon 2024 Software Edition Grand Finale at Amity University",
    },
    {
      src: "/images/sih-6.jpg",
      title: "SIH Design Innovation Showcase",
      description:
        "Celebrating innovative UI/UX design solutions and user interface excellence at Smart India Hackathon 2024",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sihImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sihImages.length) % sihImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality for carousel
  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sihImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(autoPlayInterval);
  }, [sihImages.length]);

  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">(
    ""
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Add document to Firebase Firestore
      await addDoc(collection(getFirestore(db), "contacts"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
      });

      // Reset form and show success message
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setSubmitStatus("success");

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("");
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");

      // Hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navigationItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useProjects();

  const customProjects = [
    {
      id: "hostel-reservation",
      title: "Hostel Reservation System",
      description:
        "A modern hostel reservation platform built with Next.js and Tailwind CSS. Users can browse hostels, check availability, and book rooms seamlessly. The project features authentication, responsive UI, and real-time updates.",
      status: "Live",
      technologies: ["Next.js", "Tailwind CSS", "Git", "Vercel"],
      image: "/images/hotel_landingimg.png",
      links: [
        {
          type: "GitHub",
          url: "https://github.com/Meetsantosh7/hotel-reservation",
          icon: Github,
        },
        {
          type: "Website",
          url: "https://hotel-reservation-pi.vercel.app/",
          icon: ExternalLink,
        },
      ],
    },
    {
      id: "fitness-tracker",
      title: "Fitness Tracker",
      description:
        "A comprehensive fitness tracking application built with Next.js and TypeScript. Users can track workouts, monitor progress, set fitness goals, and view detailed analytics. Features modern UI design with responsive layouts and real-time data visualization.",
      status: "Live",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Git", "Vercel"],
      image: "/images/fitness_tracker.png",
      links: [
        {
          type: "GitHub",
          url: "https://github.com/Meetsantosh7/fitness-tracker",
          icon: Github,
        },
        {
          type: "Website",
          url: "https://fitness-tracker-nine-liart.vercel.app/",
          icon: ExternalLink,
        },
      ],
    },
    {
      id: "food-express",
      title: "FoodExpress",
      description:
        "A modern food delivery website built with responsive design and user-friendly interface. Users can browse restaurants, view menus, place orders, and track deliveries. Features include real-time order tracking, secure payment integration, and seamless user experience.",
      status: "Live",
      technologies: [
        "React.js",
        "HTML5",
        "CSS3",
        "JavaScript",
        "Git",
        "Vercel",
      ],
      image: "/images/foodlanding_img.png",
      links: [
        {
          type: "GitHub",
          url: "https://github.com/Meetsantosh7/foodExpress",
          icon: Github,
        },
        {
          type: "Website",
          url: "https://food-express-sigma.vercel.app/",
          icon: ExternalLink,
        },
      ],
    },
  ];

  // Theme-aware classes
  const getThemeClasses = () => {
    if (theme === "light") {
      return {
        background: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        textMuted: "text-gray-500",
        card: "bg-white/80 border-gray-200/50",
        cardHover: "hover:bg-white/90",
        nav: "bg-black/10 border-gray-300/20 hover:bg-black/20",
        button:
          "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600",
        accent: "from-teal-600 to-cyan-600",
        overlay: "from-gray-100/20 via-transparent to-gray-200/20",
        pattern: `
          radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
          linear-gradient(45deg, transparent 40%, rgba(20, 184, 166, 0.03) 50%, transparent 60%),
          linear-gradient(-45deg, transparent 40%, rgba(6, 182, 212, 0.03) 50%, transparent 60%)
        `,
      };
    } else {
      return {
        background: "bg-black",
        text: "text-white",
        textSecondary: "text-gray-300",
        textMuted: "text-gray-400",
        card: "bg-white/10 border-gray-700/20",
        cardHover: "hover:bg-white/20",
        nav: "bg-white/10 border-gray-700/20 hover:bg-white/20",
        button:
          "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700",
        accent: "from-teal-400 to-cyan-400",
        overlay: "from-teal-900/20 via-transparent to-cyan-900/20",
        pattern: `
          radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          linear-gradient(45deg, transparent 40%, rgba(20, 184, 166, 0.05) 50%, transparent 60%),
          linear-gradient(-45deg, transparent 40%, rgba(6, 182, 212, 0.05) 50%, transparent 60%)
        `,
      };
    }
  };

  const themeClasses = getThemeClasses();

  useEffect(() => {
    const updateVisitorCount = async () => {
      const firestore = getFirestore(db);
      const counterRef = doc(firestore, "visitors", "counter");
      // Increment the count atomically
      await updateDoc(counterRef, { count: increment(1) });
      // Get the updated count
      const snapshot = await getDoc(counterRef);
      setVisitorCount(snapshot.data()?.count ?? 0);
    };
    updateVisitorCount();
  }, []);

  return (
    <div
      className={`min-h-screen ${themeClasses.background} ${themeClasses.text} relative overflow-x-hidden transition-all duration-500`}
      suppressHydrationWarning
    >
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Geometric Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${themeClasses.overlay}`}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: themeClasses.pattern,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Desktop Navigation */}
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
          <div
            className={`${themeClasses.nav} backdrop-blur-xl rounded-2xl px-8 py-4 shadow-lg transition-all duration-300`}
          >
            <div className="flex items-center space-x-2">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                    activeSection === item.id
                      ? `bg-gradient-to-r ${themeClasses.accent} text-white shadow-lg shadow-teal-600/30`
                      : `${themeClasses.textMuted} hover:${themeClasses.text} ${
                          theme === "light"
                            ? "hover:bg-black/10"
                            : "hover:bg-white/10"
                        }`
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 bg-gradient-to-r ${themeClasses.accent} rounded-full`}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`fixed top-6 right-6 z-50 md:hidden ${themeClasses.nav} backdrop-blur-md rounded-full p-3 shadow-lg transition-all duration-300`}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.div>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`fixed top-20 right-6 z-40 md:hidden ${themeClasses.nav} backdrop-blur-xl rounded-2xl p-4 shadow-lg min-w-[200px]`}
            >
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left relative overflow-hidden ${
                      activeSection === item.id
                        ? `bg-gradient-to-r ${themeClasses.accent} text-white shadow-lg`
                        : `${themeClasses.textSecondary} hover:${
                            themeClasses.text
                          } ${
                            theme === "light"
                              ? "hover:bg-black/10"
                              : "hover:bg-white/10"
                          }`
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeTabMobileMenu"
                        className={`absolute inset-0 bg-gradient-to-r ${themeClasses.accent} rounded-xl`}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center">
                      <span className="w-2 h-2 bg-current rounded-full mr-3 opacity-60"></span>
                      {item.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center pt-5 md:pt-28 px-4"
        >
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 sm:mb-8"
              >
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mx-auto mb-6 sm:mb-8">
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${themeClasses.accent} p-1 animate-pulse`}
                  >
                    <div
                      className={`rounded-full overflow-hidden ${
                        theme === "light" ? "bg-white" : "bg-black"
                      }`}
                    >
                      <img
                        src="/images/profile.jpeg"
                        alt="Santosh Kumar Thakur"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-teal-600/20 to-cyan-600/20 blur-xl animate-pulse" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-4 sm:mb-6"
              >
                <div
                  className={`inline-flex items-center space-x-2 ${
                    theme === "light"
                      ? "bg-teal-500/20 border-teal-600/30"
                      : "bg-teal-600/20 border-teal-500/30"
                  } border rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm mb-4 sm:mb-6`}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span
                    className={`${
                      theme === "light" ? "text-teal-700" : "text-teal-300"
                    }`}
                  >
                    Available for work
                  </span>
                </div>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight">
                Hi, I'm{" "}
                <span
                  className={`bg-gradient-to-r ${themeClasses.accent} bg-clip-text text-transparent animate-pulse`}
                >
                  Santosh
                </span>
                <motion.span
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                  className="inline-block ml-2"
                >
                  👋
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-transparent bg-gradient-to-r ${
                  theme === "light"
                    ? "from-gray-700 to-gray-900"
                    : "from-gray-300 to-gray-100"
                } bg-clip-text mb-3 sm:mb-4 font-light`}
              >
                {personalInfo.title}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`text-base sm:text-lg ${themeClasses.textMuted} mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4`}
              >
                {personalInfo.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-12 sm:mb-16 px-4"
              >
                <Button
                  onClick={() => scrollToSection("contact")}
                  className={`w-full sm:w-auto ${themeClasses.button} text-white rounded-full px-8 sm:px-10 py-3 sm:py-4 font-medium flex items-center justify-center space-x-2 sm:space-x-3 shadow-xl shadow-teal-600/30 hover:shadow-teal-600/50 transition-all duration-300 transform hover:scale-105`}
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Let's Connect</span>
                </Button>
                <Button
                  variant="outline"
                  className={`w-full sm:w-auto border-2 ${
                    theme === "light"
                      ? "border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-teal-500"
                      : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-teal-500"
                  } rounded-full px-8 sm:px-10 py-3 sm:py-4 font-medium flex items-center justify-center space-x-2 sm:space-x-3 bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-105`}
                  onClick={() =>
                    window.open("/Santosh-Kumar-Thakur-Resume.pdf", "_blank")
                  }
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Download Resume</span>
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex justify-center space-x-4 sm:space-x-6"
              >
                {personalInfo.socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 ${
                      theme === "light"
                        ? "bg-gray-100/60 border-gray-300/50"
                        : "bg-gray-900/60 border-gray-700/50"
                    } backdrop-blur-sm border rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 hover:border-transparent transition-all duration-300 group overflow-hidden`}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <social.icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-white transition-colors duration-300 relative z-10" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className={`text-xs sm:text-sm ${themeClasses.textMuted}`}>
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 sm:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                variants={fadeInUp}
                className="text-center mb-12 sm:mb-16"
              >
                <h2
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r ${
                    theme === "light"
                      ? "from-gray-900 via-teal-700 to-cyan-700"
                      : "from-white via-teal-200 to-cyan-200"
                  } bg-clip-text text-transparent`}
                >
                  About Me
                </h2>
                <motion.div
                  className={`w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-gradient-to-r ${themeClasses.accent} mx-auto mb-6 sm:mb-8 rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "6rem" }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                />
                <motion.p
                  className={`text-base sm:text-lg ${themeClasses.textMuted} max-w-3xl mx-auto leading-relaxed px-4`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Passionate about creating exceptional digital experiences that
                  make a difference
                </motion.p>
              </motion.div>

              <div className="space-y-12">
                {/* Profile Photo and Intro Text - Side by Side */}
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <motion.div variants={fadeInUp}>
                    <div
                      className={`${themeClasses.card} ${themeClasses.cardHover} backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300`}
                    >
                      <p
                        className={`text-base sm:text-lg ${themeClasses.textSecondary} leading-relaxed`}
                      >
                        I am a motivated and versatile individual, always eager
                        to take on new challenges. With a passion for learning I
                        am dedicated to delivering high-quality results. With a
                        positive attitude and a growth mindset, I am ready to
                        make a meaningful contribution and achieve great things.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="flex justify-center mt-8 lg:mt-0"
                  >
                    {/* Profile Photo */}
                    <div className="relative group">
                      <div
                        className={`w-72 h-72 sm:w-80 sm:h-80 rounded-2xl sm:rounded-3xl overflow-hidden ${
                          theme === "light"
                            ? "border-gray-300/50"
                            : "border-gray-700/50"
                        } border shadow-2xl backdrop-blur-sm ${
                          themeClasses.card
                        } p-2`}
                      >
                        <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                          <img
                            src="/images/profile.jpeg"
                            alt="Santosh Kumar Thakur"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                      </div>
                      <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </motion.div>
                </div>

                {/* SIH Design Mentor Experience Carousel */}
                <motion.div variants={fadeInUp} className="mt-8">
                  <div className="text-center mb-4 sm:mb-6">
                    <h3
                      className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 bg-gradient-to-r ${
                        theme === "light"
                          ? "from-gray-900 via-teal-700 to-cyan-700"
                          : "from-white via-teal-200 to-cyan-200"
                      } bg-clip-text text-transparent`}
                    >
                      Smart India Hackathon
                    </h3>
                    <p
                      className={`text-xs sm:text-sm lg:text-base ${themeClasses.textMuted} max-w-xl mx-auto leading-relaxed px-2 sm:px-0`}
                    >
                      Proud to serve as a{" "}
                      <span
                        className={`${
                          theme === "light" ? "text-teal-600" : "text-teal-300"
                        } font-semibold`}
                      >
                        UI/UX Design Mentor
                      </span>{" "}
                      at Smart India Hackathon
                    </p>
                  </div>

                  <div className="relative max-w-3xl mx-auto">
                    <div
                      className={`${themeClasses.card} ${themeClasses.cardHover} backdrop-blur-2xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-300`}
                    >
                      {/* Carousel Container */}
                      <div className="relative">
                        {/* Mobile aspect ratio 3:2, Desktop 5:3 for more compact view */}
                        <div
                          className={`aspect-[3/2] sm:aspect-[5/3] overflow-hidden ${
                            theme === "light"
                              ? "bg-gray-200/50"
                              : "bg-gray-800/50"
                          } relative`}
                        >
                          <motion.div
                            className="flex transition-transform duration-500 ease-in-out h-full cursor-grab active:cursor-grabbing"
                            style={{
                              transform: `translateX(-${currentSlide * 100}%)`,
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(event, info) => {
                              const threshold = 50;
                              if (info.offset.x > threshold) {
                                prevSlide();
                              } else if (info.offset.x < -threshold) {
                                nextSlide();
                              }
                            }}
                          >
                            {/* Render all SIH Images */}
                            {sihImages.map((image, index) => (
                              <div
                                key={index}
                                className="w-full flex-shrink-0 relative h-full"
                              >
                                <img
                                  src={image.src || "/placeholder.svg"}
                                  alt={image.title}
                                  className={`w-full h-full object-cover ${
                                    image.src === "/images/sih-5.jpg"
                                      ? "object-contain object-center"
                                      : image.src === "/images/sih-6.jpg"
                                      ? "object-contain object-center"
                                      : "object-cover object-center"
                                  }`}
                                  onError={(e) => {
                                    console.log(
                                      `Image ${image.src} failed to load`
                                    );
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/images/placeholder.svg";
                                    target.onerror = null;
                                  }}
                                  onLoad={() => {
                                    console.log(
                                      `Image ${image.src} loaded successfully`
                                    );
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                {/* Mobile-optimized text overlay */}
                                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6">
                                  <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                                    {image.title}
                                  </h4>
                                  <p className="text-gray-200 text-xs sm:text-sm lg:text-base line-clamp-2 sm:line-clamp-3">
                                    {image.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        </div>

                        {/* Navigation Arrows - Responsive sizing */}
                        <button
                          onClick={prevSlide}
                          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-200 group backdrop-blur-sm border border-white/10 touch-manipulation"
                          aria-label="Previous slide"
                        >
                          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
                        </button>

                        <button
                          onClick={nextSlide}
                          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-200 group backdrop-blur-sm border border-white/10 touch-manipulation"
                          aria-label="Next slide"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
                        </button>

                        {/* Carousel Indicators - Mobile optimized */}
                        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                          {sihImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => goToSlide(index)}
                              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 touch-manipulation ${
                                currentSlide === index
                                  ? "bg-teal-400 opacity-100 scale-110"
                                  : "bg-gray-400 opacity-60 hover:opacity-80"
                              }`}
                              aria-label={`Go to slide ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* SIH Details */}
                      <div className="p-3 sm:p-4 lg:p-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-8 h-8 bg-gradient-to-r ${themeClasses.accent} rounded-full flex items-center justify-center`}
                              >
                                <span className="text-white font-bold text-xs">
                                  SIH
                                </span>
                              </div>
                              <div>
                                <h5
                                  className={`${themeClasses.text} font-semibold text-sm`}
                                >
                                  Smart India Hackathon
                                </h5>
                                <p
                                  className={`${themeClasses.textMuted} text-xs`}
                                >
                                  UI/UX Design Mentor
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-lg">🎨</span>
                              </div>
                              <div>
                                <h5
                                  className={`${themeClasses.text} font-semibold`}
                                >
                                  Design Focus
                                </h5>
                                <p
                                  className={`${themeClasses.textMuted} text-sm`}
                                >
                                  UI/UX Design & User Experience
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-lg">👥</span>
                              </div>
                              <div>
                                <h5
                                  className={`${themeClasses.text} font-semibold`}
                                >
                                  UI/UX Mentorship
                                </h5>
                                <p
                                  className={`${themeClasses.textMuted} text-sm`}
                                >
                                  Guiding Design Innovation
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-lg">🚀</span>
                              </div>
                              <div>
                                <h5
                                  className={`${themeClasses.text} font-semibold`}
                                >
                                  Impact
                                </h5>
                                <p
                                  className={`${themeClasses.textMuted} text-sm`}
                                >
                                  Building User-Centric Solutions
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quote */}
                        <div
                          className={`mt-4 p-3 bg-gradient-to-r ${
                            theme === "light"
                              ? "from-teal-400/10 via-emerald-400/5 to-cyan-400/10 border-teal-500/20"
                              : "from-teal-500/10 via-emerald-500/5 to-cyan-500/10 border-teal-400/20"
                          } border rounded-xl backdrop-blur-sm`}
                        >
                          <blockquote className="text-center">
                            <p
                              className={`text-xs sm:text-sm ${themeClasses.textSecondary} font-medium leading-relaxed mb-2`}
                            >
                              "Empowering young designers to create intuitive
                              user experiences and innovative interface
                              solutions."
                            </p>
                            <footer className="flex items-center justify-center space-x-1.5">
                              <motion.div
                                className="w-1.5 h-1.5 bg-teal-400 rounded-full"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                }}
                              />
                              <span
                                className={`text-xs ${
                                  theme === "light"
                                    ? "text-teal-600"
                                    : "text-teal-300"
                                } font-semibold tracking-wide`}
                              >
                                SIH UI/UX DESIGN MENTOR
                              </span>
                              <motion.div
                                className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: 1,
                                }}
                              />
                            </footer>
                          </blockquote>
                        </div>
                      </div>

                      {/* Bottom Accent */}
                      <div
                        className={`h-1 bg-gradient-to-r ${themeClasses.accent} opacity-60`}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className={`py-16 sm:py-24 lg:py-32 ${
            theme === "light" ? "bg-gray-100/30" : "bg-gray-950/30"
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div
                variants={fadeInUp}
                className="text-center mb-12 sm:mb-16"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Skills & Technologies
                </h2>
                <div
                  className={`w-16 sm:w-20 h-1 bg-gradient-to-r ${themeClasses.accent} mx-auto mb-6 sm:mb-8`}
                />
                <p
                  className={`text-base sm:text-lg ${themeClasses.textMuted} max-w-2xl mx-auto px-4`}
                >
                  Technologies and tools I've mastered over the years
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
                {skillsData.map((skillGroup, groupIndex) => (
                  <motion.div key={skillGroup.category} variants={fadeInUp}>
                    <Card
                      className={`${themeClasses.card} ${
                        themeClasses.cardHover
                      } backdrop-blur-xl transition-all duration-500 h-full rounded-2xl overflow-hidden hover:shadow-xl ${
                        theme === "light"
                          ? "hover:shadow-gray-200/20"
                          : "hover:shadow-white/5"
                      }`}
                    >
                      <CardHeader className="text-center p-4 sm:p-6">
                        <CardTitle
                          className={`${themeClasses.text} text-base sm:text-lg mb-3 sm:mb-4 font-semibold`}
                        >
                          {skillGroup.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="space-y-3 sm:space-y-4">
                          {skillGroup.skills.map((skill, index) => (
                            <div key={skill.name} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <span className="text-base sm:text-lg">
                                    {skill.icon}
                                  </span>
                                  <span
                                    className={`text-xs sm:text-sm font-medium ${themeClasses.textSecondary}`}
                                  >
                                    {skill.name}
                                  </span>
                                </div>
                                <span
                                  className={`text-xs ${
                                    theme === "light"
                                      ? "text-teal-600"
                                      : "text-teal-400"
                                  } font-semibold`}
                                >
                                  {skill.level}%
                                </span>
                              </div>
                              <div
                                className={`w-full ${
                                  theme === "light"
                                    ? "bg-gray-300/50"
                                    : "bg-gray-700/50"
                                } rounded-full h-1.5 sm:h-2`}
                              >
                                <motion.div
                                  className={`bg-gradient-to-r ${themeClasses.accent} h-1.5 sm:h-2 rounded-full`}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  transition={{
                                    duration: 1.5,
                                    delay: index * 0.1,
                                  }}
                                  viewport={{ once: true }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 sm:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div
                variants={fadeInUp}
                className="text-center mb-12 sm:mb-16"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Featured Work
                </h2>
                <div
                  className={`w-16 sm:w-20 h-1 bg-gradient-to-r ${themeClasses.accent} mx-auto mb-6 sm:mb-8`}
                />
                <p
                  className={`text-base sm:text-lg ${themeClasses.textMuted} max-w-2xl mx-auto px-4`}
                >
                  Some of my best work that I'm proud to showcase
                </p>
              </motion.div>

              {projectsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2
                    className={`h-8 w-8 animate-spin ${
                      theme === "light" ? "text-teal-600" : "text-teal-400"
                    }`}
                  />
                  <span className={`ml-3 ${themeClasses.textSecondary}`}>
                    Loading projects...
                  </span>
                </div>
              ) : projectsError ? (
                <div className="text-center py-8 text-red-400">
                  {projectsError}
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-5xl">
                    {/* Render custom project first */}
                    {customProjects.map((project, index) => (
                      <motion.div key={project.id} variants={fadeInUp}>
                        <Card
                          className={`${themeClasses.card} ${
                            themeClasses.cardHover
                          } backdrop-blur-xl transition-all duration-500 group h-full hover:shadow-xl ${
                            theme === "light"
                              ? "hover:shadow-gray-200/20 hover:border-gray-400/30"
                              : "hover:shadow-white/5 hover:border-gray-600/30"
                          } hover:scale-[1.02] rounded-xl overflow-hidden`}
                        >
                          {/* Project Image */}
                          {project.image && (
                            <div
                              className={`w-full h-32 sm:h-36 lg:h-40 ${
                                theme === "light"
                                  ? "bg-gray-200/40"
                                  : "bg-gray-900/40"
                              } flex items-center justify-center overflow-hidden`}
                            >
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                onError={(e) => {
                                  console.log(
                                    `Failed to load image: ${project.image}`
                                  );
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/images/placeholder.svg";
                                  target.onerror = null;
                                }}
                              />
                            </div>
                          )}
                          <CardHeader className="p-3 sm:p-4">
                            <div className="flex justify-between items-start mb-2">
                              <CardTitle
                                className={`${themeClasses.text} group-hover:${
                                  theme === "light"
                                    ? "text-teal-600"
                                    : "text-teal-300"
                                } transition-colors duration-300 text-sm sm:text-base lg:text-lg leading-tight pr-1 line-clamp-1`}
                              >
                                {project.title}
                              </CardTitle>
                              <Badge
                                className={`${
                                  project.status === "Completed"
                                    ? `${
                                        theme === "light"
                                          ? "bg-green-400/20 text-green-700 border-green-400/30"
                                          : "bg-green-500/20 text-green-300 border-green-500/30"
                                      }`
                                    : project.status === "Live"
                                    ? `${
                                        theme === "light"
                                          ? "bg-teal-400/20 text-teal-700 border-teal-400/30"
                                          : "bg-teal-500/20 text-teal-300 border-teal-500/30"
                                      }`
                                    : `${
                                        theme === "light"
                                          ? "bg-blue-400/20 text-blue-700 border-blue-400/30"
                                          : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                      }`
                                } backdrop-blur-sm text-[10px] sm:text-xs whitespace-nowrap rounded-full px-1.5 sm:px-2 py-0.5 flex-shrink-0`}
                              >
                                {project.status}
                              </Badge>
                            </div>
                            <CardDescription
                              className={`${themeClasses.textSecondary} leading-relaxed text-xs sm:text-sm line-clamp-3`}
                            >
                              {project.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-3 sm:p-4 pt-0">
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {project.technologies.slice(0, 3).map((tech: string) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className={`${
                                    theme === "light"
                                      ? "border-gray-400/40 text-gray-600 bg-gray-100/30"
                                      : "border-gray-600/40 text-gray-400 bg-gray-800/30"
                                  } backdrop-blur-sm text-[10px] sm:text-xs transition-all duration-300 rounded-full px-2 py-0.5`}
                                >
                                  {tech}
                                </Badge>
                              ))}
                              {project.technologies.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className={`${
                                    theme === "light"
                                      ? "border-gray-400/40 text-gray-600 bg-gray-100/30"
                                      : "border-gray-600/40 text-gray-400 bg-gray-800/30"
                                  } backdrop-blur-sm text-[10px] sm:text-xs rounded-full px-2 py-0.5`}
                                >
                                  +{project.technologies.length - 3}
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-3">
                              {project.links.map((link: any, idx: number) => (
                                <Button
                                  key={idx}
                                  size="sm"
                                  variant="ghost"
                                  className={`${themeClasses.textMuted} hover:${
                                    theme === "light"
                                      ? "text-teal-600"
                                      : "text-teal-400"
                                  } p-0 h-auto group/btn text-xs sm:text-sm`}
                                  onClick={() => window.open(link.url, "_blank")}
                                >
                                  {link.icon && (
                                    <link.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 group-hover/btn:scale-110 transition-transform duration-200" />
                                  )}
                                  {link.type}
                                </Button>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                    {/* Render dynamic projects */}
                    {projects.map((project, index) => (
                      <motion.div key={project.id} variants={fadeInUp}>
                        <Card
                          className={`${themeClasses.card} ${
                            themeClasses.cardHover
                          } backdrop-blur-xl transition-all duration-500 group h-full hover:shadow-xl ${
                            theme === "light"
                              ? "hover:shadow-gray-200/20 hover:border-gray-400/30"
                              : "hover:shadow-white/5 hover:border-gray-600/30"
                          } hover:scale-[1.02] rounded-xl overflow-hidden`}
                        >
                          {/* Project Image */}
                          {project.image && (
                            <div
                              className={`w-full h-32 sm:h-36 lg:h-40 ${
                                theme === "light"
                                  ? "bg-gray-200/40"
                                  : "bg-gray-900/40"
                              } flex items-center justify-center overflow-hidden`}
                            >
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/images/placeholder.svg";
                                  target.onerror = null;
                                }}
                              />
                            </div>
                          )}
                          <CardHeader className="p-3 sm:p-4">
                            <div className="flex justify-between items-start mb-2">
                              <CardTitle
                                className={`${themeClasses.text} group-hover:${
                                  theme === "light"
                                    ? "text-teal-600"
                                    : "text-teal-300"
                                } transition-colors duration-300 text-sm sm:text-base lg:text-lg leading-tight pr-1 line-clamp-1`}
                              >
                                {project.title}
                              </CardTitle>
                              <Badge
                                className={`${
                                  project.status === "Completed"
                                    ? `${
                                        theme === "light"
                                          ? "bg-green-400/20 text-green-700 border-green-400/30"
                                          : "bg-green-500/20 text-green-300 border-green-500/30"
                                      }`
                                    : project.status === "Live"
                                    ? `${
                                        theme === "light"
                                          ? "bg-teal-400/20 text-teal-700 border-teal-400/30"
                                          : "bg-teal-500/20 text-teal-300 border-teal-500/30"
                                      }`
                                    : project.status === "Award Winner"
                                    ? `${
                                        theme === "light"
                                          ? "bg-yellow-400/20 text-yellow-700 border-yellow-400/30"
                                          : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                      }`
                                    : `${
                                        theme === "light"
                                          ? "bg-blue-400/20 text-blue-700 border-blue-400/30"
                                          : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                      }`
                                } backdrop-blur-sm text-[10px] sm:text-xs whitespace-nowrap rounded-full px-1.5 sm:px-2 py-0.5 flex-shrink-0`}
                              >
                                {project.status}
                              </Badge>
                            </div>
                            <CardDescription
                              className={`${themeClasses.textSecondary} leading-relaxed text-xs sm:text-sm line-clamp-3`}
                            >
                              {project.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-3 sm:p-4 pt-0">
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {project.technologies.slice(0, 3).map((tech: string) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className={`${
                                    theme === "light"
                                      ? "border-gray-400/40 text-gray-600 bg-gray-100/30"
                                      : "border-gray-600/40 text-gray-400 bg-gray-800/30"
                                  } backdrop-blur-sm text-[10px] sm:text-xs transition-all duration-300 rounded-full px-2 py-0.5`}
                                >
                                  {tech}
                                </Badge>
                              ))}
                              {project.technologies.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className={`${
                                    theme === "light"
                                      ? "border-gray-400/40 text-gray-600 bg-gray-100/30"
                                      : "border-gray-600/40 text-gray-400 bg-gray-800/30"
                                  } backdrop-blur-sm text-[10px] sm:text-xs rounded-full px-2 py-0.5`}
                                >
                                  +{project.technologies.length - 3}
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-3">
                              {project.links.map((link: any, idx: number) => (
                                <Button
                                  key={idx}
                                  size="sm"
                                  variant="ghost"
                                  className={`${themeClasses.textMuted} hover:${
                                    theme === "light"
                                      ? "text-teal-600"
                                      : "text-teal-400"
                                  } p-0 h-auto group/btn text-xs sm:text-sm`}
                                  onClick={() => window.open(link.url, "_blank")}
                                >
                                  {link.icon && (
                                    <link.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 group-hover/btn:scale-110 transition-transform duration-200" />
                                  )}
                                  {link.type}
                                </Button>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className={`py-16 sm:py-24 lg:py-32 ${
            theme === "light" ? "bg-gray-100/30" : "bg-gray-950/30"
          } relative overflow-hidden`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${themeClasses.overlay}`}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: themeClasses.pattern,
              }}
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div
                variants={fadeInUp}
                className="text-center mb-12 sm:mb-16"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Experience
                </h2>
                <div
                  className={`w-16 sm:w-20 h-1 bg-gradient-to-r ${themeClasses.accent} mx-auto mb-6 sm:mb-8`}
                />
                <p
                  className={`text-base sm:text-lg ${themeClasses.textMuted} max-w-2xl mx-auto px-4`}
                >
                  My work experience as a software engineer and working on
                  different companies and projects.
                </p>
              </motion.div>

              {/* Timeline Container */}
              <div className="max-w-6xl mx-auto relative">
                {/* Vertical Timeline Line - Desktop */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b ${themeClasses.accent} opacity-30 hidden sm:block`}
                />

                {/* Vertical Timeline Line - Mobile */}
                <div
                  className={`absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b ${themeClasses.accent} opacity-30 sm:hidden`}
                />

                {/* Timeline Items */}
                <div className="space-y-12 sm:space-y-16">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      variants={fadeInUp}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                      } flex-row`}
                    >
                      {/* Timeline Node - Desktop */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden sm:block">
                        <motion.div
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          <span
                            className={`text-xs sm:text-sm ${
                              theme === "light"
                                ? "text-teal-600"
                                : "text-teal-200"
                            } font-semibold whitespace-nowrap`}
                          >
                            {exp.period}
                          </span>
                        </motion.div>
                      </div>

                      {/* Timeline Node - Mobile */}
                      <div className="absolute left-6 transform -translate-x-1/2 z-20 sm:hidden">
                        <motion.div
                          className={`w-6 h-6 bg-gradient-to-r ${
                            themeClasses.accent
                          } rounded-full border-2 ${
                            theme === "light"
                              ? "border-white"
                              : "border-gray-900"
                          } shadow-xl flex items-center justify-center`}
                          whileInView={{ scale: [0, 1.2, 1] }}
                          transition={{ duration: 0.6, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        </motion.div>
                      </div>

                      {/* Experience Card */}
                      <motion.div
                        className={`w-full ${
                          // Desktop layout
                          "sm:w-5/12 " +
                          (index % 2 === 0 ? "sm:pr-16" : "sm:pl-16")
                        } ${
                          // Mobile layout - always left aligned with padding for timeline
                          "pl-16 pr-4"
                        }`}
                        initial={{
                          opacity: 0,
                          x: 30,
                          scale: 0.9,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.2,
                          type: "spring",
                          stiffness: 100,
                        }}
                        viewport={{ once: true }}
                      >
                        <Card
                          className={`${themeClasses.card} ${
                            themeClasses.cardHover
                          } backdrop-blur-xl rounded-2xl transition-all duration-500 group hover:shadow-xl ${
                            theme === "light"
                              ? "hover:border-gray-400/30"
                              : "hover:border-gray-600/30"
                          } hover:scale-[1.03] relative overflow-hidden`}
                        >
                          {/* Enhanced Card Glow Effect */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${
                              theme === "light"
                                ? "from-teal-500/5 via-cyan-500/5 to-teal-500/5"
                                : "from-teal-600/5 via-cyan-600/5 to-teal-600/5"
                            } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                          />
                          <div
                            className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${themeClasses.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                          />

                          <CardHeader className="p-4 sm:p-6 relative z-10">
                            <div className="flex flex-col gap-3">
                              {/* Mobile Date Badge */}
                              <motion.div
                                className={`sm:hidden ${themeClasses.card} rounded-full px-3 py-1 backdrop-blur-sm shadow-lg`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 + 0.4 }}
                                viewport={{ once: true }}
                              >
                                <span
                                  className={`text-xs ${
                                    theme === "light"
                                      ? "text-teal-600"
                                      : "text-teal-200"
                                  } font-semibold`}
                                >
                                  {exp.period}
                                </span>
                              </motion.div>

                              <div className="flex items-start justify-between gap-3">
                                <CardTitle
                                  className={`${themeClasses.text} text-base sm:text-lg font-bold group-hover:bg-gradient-to-r group-hover:${themeClasses.accent} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight`}
                                >
                                  {exp.title}
                                </CardTitle>
                                <Badge
                                  className={`${themeClasses.card} ${
                                    themeClasses.textSecondary
                                  } ${
                                    theme === "light"
                                      ? "border-gray-400/30"
                                      : "border-gray-600/30"
                                  } backdrop-blur-sm text-xs whitespace-nowrap flex-shrink-0 shadow-lg font-semibold ${
                                    themeClasses.cardHover
                                  } transition-all duration-300`}
                                >
                                  {exp.type}
                                </Badge>
                              </div>

                              <CardDescription
                                className={`text-transparent bg-gradient-to-r ${themeClasses.accent} bg-clip-text font-bold text-sm sm:text-base drop-shadow-sm`}
                              >
                                {exp.company}
                              </CardDescription>

                              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-300">
                                <span
                                  className={`flex items-center gap-1.5 ${themeClasses.card} rounded-full px-2 py-1`}
                                >
                                  <MapPin
                                    className={`w-3 h-3 ${
                                      theme === "light"
                                        ? "text-teal-600"
                                        : "text-teal-400"
                                    }`}
                                  />
                                  <span className={themeClasses.textSecondary}>
                                    {exp.location}
                                  </span>
                                </span>
                                <span
                                  className={`flex items-center gap-1.5 ${themeClasses.card} rounded-full px-2 py-1`}
                                >
                                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                  <span className={themeClasses.textSecondary}>
                                    {exp.duration}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="p-4 sm:p-6 pt-0">
                            <ul
                              className={`space-y-3 ${themeClasses.textSecondary} mb-4 sm:mb-6 text-sm sm:text-base`}
                            >
                              {exp.responsibilities
                                .slice(0, 3)
                                .map((responsibility, idx) => (
                                  <motion.li
                                    key={idx}
                                    className="flex items-start group/item"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                      delay: index * 0.2 + idx * 0.1 + 0.4,
                                    }}
                                    viewport={{ once: true }}
                                  >
                                    <span
                                      className={`w-1.5 h-1.5 ${
                                        theme === "light"
                                          ? "bg-teal-600"
                                          : "bg-teal-400"
                                      } rounded-full mt-2 mr-3 flex-shrink-0 group-hover/item:bg-cyan-400 transition-colors duration-200`}
                                    ></span>
                                    <span
                                      className={`leading-relaxed group-hover/item:${themeClasses.text} transition-colors duration-200`}
                                    >
                                      {responsibility}
                                    </span>
                                  </motion.li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.slice(0, 4).map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className={`${
                                    theme === "light"
                                      ? "border-teal-500/30 text-teal-700 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 hover:from-teal-400/30 hover:to-cyan-400/30 hover:border-teal-400/50"
                                      : "border-teal-400/30 text-teal-100 bg-gradient-to-r from-teal-600/20 to-cyan-600/20 hover:from-teal-500/30 hover:to-cyan-500/30 hover:border-teal-300/50"
                                  } backdrop-blur-sm text-xs hover:scale-105 transition-all duration-300 font-medium shadow-sm`}
                                >
                                  {tech}
                                </Badge>
                              ))}
                              {exp.technologies.length > 4 && (
                                <Badge
                                  variant="outline"
                                  className={`${
                                    theme === "light"
                                      ? "border-gray-400/30 text-gray-600 bg-gradient-to-r from-gray-300/20 to-gray-400/20 hover:border-teal-500/30 hover:text-teal-600"
                                      : "border-gray-500/30 text-gray-300 bg-gradient-to-r from-gray-600/20 to-gray-700/20 hover:border-teal-400/30 hover:text-teal-200"
                                  } backdrop-blur-sm text-xs transition-all duration-300`}
                                >
                                  +{exp.technologies.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Empty space for alternating layout - Desktop only */}
                      <div className="hidden sm:block w-5/12" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16 sm:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div
                variants={fadeInUp}
                className="text-center mb-12 sm:mb-16"
              >
                <h2
                  className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r ${
                    theme === "light"
                      ? "from-gray-900 via-teal-700 to-cyan-700"
                      : "from-white via-teal-200 to-cyan-200"
                  } bg-clip-text text-transparent`}
                >
                  Education 🎓
                </h2>
                <div
                  className={`w-16 sm:w-20 h-1 bg-gradient-to-r ${themeClasses.accent} mx-auto mb-6 sm:mb-8`}
                />
                <p
                  className={`text-base sm:text-lg ${themeClasses.textMuted} max-w-2xl mx-auto px-4`}
                >
                  My educational journey has been a path of self-discovery and
                  growth. My educational details are as follows.
                </p>
              </motion.div>

              {/* Timeline Container */}
              <div className="max-w-4xl mx-auto relative">
                {/* Vertical Timeline Line */}
                <div
                  className={`absolute left-8 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b ${themeClasses.accent} opacity-30`}
                />

                {/* Education Items */}
                <div className="space-y-8 sm:space-y-12">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      variants={fadeInUp}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                      } flex-row`}
                    >
                      {/* Timeline Node */}
                      <div
                        className={`absolute ${
                          // Mobile: always left
                          "left-8 transform -translate-x-1/2 " +
                          // Desktop: center
                          "sm:left-1/2 sm:transform sm:-translate-x-1/2"
                        } z-20`}
                      >
                        <motion.div
                          className={`w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r ${
                            themeClasses.accent
                          } rounded-full border-2 sm:border-4 ${
                            theme === "light"
                              ? "border-white"
                              : "border-gray-900"
                          } shadow-xl flex items-center justify-center`}
                          whileInView={{ scale: [0, 1.2, 1] }}
                          transition={{ duration: 0.6, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                        </motion.div>

                        {/* Date Badge - Desktop */}
                        <motion.div
                          className={`hidden sm:block absolute -bottom-12 left-1/2 transform -translate-x-1/2 ${themeClasses.card} rounded-full px-4 py-2 backdrop-blur-sm shadow-lg`}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          <span
                            className={`text-xs ${
                              theme === "light"
                                ? "text-teal-600"
                                : "text-teal-200"
                            } font-semibold whitespace-nowrap`}
                          >
                            {edu.year}
                          </span>
                        </motion.div>
                      </div>

                      {/* Education Card */}
                      <motion.div
                        className={`w-full ${
                          // Desktop layout
                          "sm:w-5/12 " +
                          (index % 2 === 0 ? "sm:pr-12" : "sm:pl-12")
                        } ${
                          // Mobile layout - always left aligned with padding for timeline
                          "pl-16 sm:pl-20 pr-4"
                        }`}
                        initial={{
                          opacity: 0,
                          x: index % 2 === 0 ? -30 : 30,
                          scale: 0.9,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.2,
                          type: "spring",
                          stiffness: 100,
                        }}
                        viewport={{ once: true }}
                      >
                        <Card
                          className={`${themeClasses.card} ${
                            themeClasses.cardHover
                          } backdrop-blur-xl rounded-2xl transition-all duration-500 group hover:shadow-xl ${
                            theme === "light"
                              ? "hover:border-gray-400/30"
                              : "hover:border-gray-600/30"
                          } hover:scale-[1.02] sm:hover:scale-[1.03] relative overflow-hidden`}
                        >
                          {/* Enhanced Card Glow Effect */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${
                              theme === "light"
                                ? "from-teal-500/5 via-cyan-500/5 to-teal-500/5"
                                : "from-teal-600/5 via-cyan-600/5 to-teal-600/5"
                            } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                          />
                          <div
                            className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${themeClasses.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                          />

                          <CardHeader className="p-3 sm:p-4 lg:p-6 relative z-10">
                            {/* Mobile Date Badge - Inside card */}
                            <div className="flex items-center justify-between mb-2 sm:hidden">
                              <motion.div
                                className={`${themeClasses.card} rounded-full px-3 py-1 backdrop-blur-sm shadow-lg`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 + 0.4 }}
                                viewport={{ once: true }}
                              >
                                <span
                                  className={`text-xs ${
                                    theme === "light"
                                      ? "text-teal-600"
                                      : "text-teal-200"
                                  } font-semibold`}
                                >
                                  {edu.year}
                                </span>
                              </motion.div>
                            </div>

                            <div className="flex flex-col gap-2 sm:gap-3">
                              <CardTitle
                                className={`${themeClasses.text} text-sm sm:text-base lg:text-lg font-bold group-hover:bg-gradient-to-r group-hover:${themeClasses.accent} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight pr-2`}
                              >
                                {edu.degree}
                              </CardTitle>

                              <CardDescription
                                className={`text-transparent bg-gradient-to-r ${themeClasses.accent} bg-clip-text font-bold text-xs sm:text-sm lg:text-base drop-shadow-sm leading-tight`}
                              >
                                {edu.institution}
                              </CardDescription>

                              <div className="flex items-center gap-2 text-xs sm:text-sm">
                                <Badge
                                  className={`${themeClasses.card} ${
                                    themeClasses.textSecondary
                                  } ${
                                    theme === "light"
                                      ? "border-gray-400/30"
                                      : "border-gray-600/30"
                                  } backdrop-blur-sm shadow-lg font-semibold text-xs px-2 py-1`}
                                >
                                  {edu.grade}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0 relative z-10">
                            <p
                              className={`${themeClasses.textSecondary} text-xs sm:text-sm lg:text-base leading-relaxed group-hover:${themeClasses.text} transition-colors duration-200`}
                            >
                              {edu.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Empty space for alternating layout - Desktop only */}
                      <div className="hidden sm:block w-5/12" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div
                variants={fadeInUp}
                className="text-center mb-12 sm:mb-16"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Let's Work Together
                </h2>
                <div
                  className={`w-16 sm:w-20 h-1 bg-gradient-to-r ${themeClasses.accent} mx-auto mb-6 sm:mb-8`}
                />
                <p
                  className={`text-base sm:text-lg ${themeClasses.textMuted} max-w-2xl mx-auto px-4`}
                >
                  Have a project in mind? Let's discuss how we can bring it to
                  life
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
                <motion.div variants={fadeInUp}>
                  <Card
                    className={`${themeClasses.card} ${themeClasses.cardHover} backdrop-blur-xl transition-all duration-500 rounded-2xl overflow-hidden`}
                  >
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle
                        className={`${themeClasses.text} flex items-center text-lg sm:text-xl`}
                      >
                        <Send
                          className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${
                            theme === "light"
                              ? "text-teal-600"
                              : "text-teal-400"
                          }`}
                        />
                        Send me a message
                      </CardTitle>
                      <CardDescription
                        className={`text-sm sm:text-base ${themeClasses.textSecondary}`}
                      >
                        I'll get back to you within 24 hours
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-4 sm:space-y-6"
                      >
                        <Input
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className={`${
                            theme === "light"
                              ? "bg-gray-100/50 border-gray-300/50 text-gray-900 placeholder-gray-500"
                              : "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                          } h-10 sm:h-12 text-sm sm:text-base rounded-lg`}
                          required
                          disabled={isSubmitting}
                        />
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={`${
                            theme === "light"
                              ? "bg-gray-100/50 border-gray-300/50 text-gray-900 placeholder-gray-500"
                              : "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                          } h-10 sm:h-12 text-sm sm:text-base rounded-lg`}
                          required
                          disabled={isSubmitting}
                        />
                        <Textarea
                          placeholder="Your Message"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className={`${
                            theme === "light"
                              ? "bg-gray-100/50 border-gray-300/50 text-gray-900 placeholder-gray-500"
                              : "bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                          } min-h-[100px] sm:min-h-[120px] text-sm sm:text-base rounded-lg`}
                          required
                          disabled={isSubmitting}
                        />

                        {/* Status Messages */}
                        {submitStatus === "success" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-3 ${
                              theme === "light"
                                ? "bg-green-400/20 border-green-500/30 text-green-700"
                                : "bg-green-500/20 border-green-500/30 text-green-300"
                            } border rounded-lg`}
                          >
                            <p className="text-sm text-center">
                              ✅ Message sent successfully! I'll get back to you
                              soon.
                            </p>
                          </motion.div>
                        )}

                        {submitStatus === "error" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-3 ${
                              theme === "light"
                                ? "bg-red-400/20 border-red-500/30 text-red-700"
                                : "bg-red-500/20 border-red-500/30 text-red-300"
                            } border rounded-lg`}
                          >
                            <p className="text-sm text-center">
                              ❌ Please fill in all fields correctly and try
                              again.
                            </p>
                          </motion.div>
                        )}

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full ${themeClasses.button} disabled:${
                            theme === "light" ? "bg-gray-400" : "bg-gray-600"
                          } disabled:cursor-not-allowed text-white rounded-lg shadow-lg shadow-teal-600/25 h-10 sm:h-12 text-sm sm:text-base transition-all duration-300`}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                }}
                                className="w-3 h-3 sm:w-4 sm:h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="space-y-6 sm:space-y-8"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                      Get in touch
                    </h3>
                    <p
                      className={`${themeClasses.textSecondary} mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed`}
                    >
                      I'm always interested in hearing about new opportunities
                      and interesting projects. Whether you're a company looking
                      to hire, or you're someone who has a project in mind, I'd
                      love to hear from you.
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 ${
                          theme === "light"
                            ? "bg-gray-200 border-gray-300"
                            : "bg-gray-800 border-gray-700"
                        } border rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <Mail
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            theme === "light"
                              ? "text-teal-600"
                              : "text-teal-400"
                          }`}
                        />
                      </div>
                      <div>
                        <div
                          className={`text-xs sm:text-sm ${themeClasses.textMuted}`}
                        >
                          Email
                        </div>
                        <div
                          className={`${themeClasses.text} font-medium text-sm sm:text-base break-all`}
                        >
                          {personalInfo.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 ${
                          theme === "light"
                            ? "bg-gray-200 border-gray-300"
                            : "bg-gray-800 border-gray-700"
                        } border rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <MapPin
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            theme === "light"
                              ? "text-teal-600"
                              : "text-teal-400"
                          }`}
                        />
                      </div>
                      <div>
                        <div
                          className={`text-xs sm:text-sm ${themeClasses.textMuted}`}
                        >
                          Location
                        </div>
                        <div
                          className={`${themeClasses.text} font-medium text-sm sm:text-base`}
                        >
                          {personalInfo.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 ${
                          theme === "light"
                            ? "bg-gray-200 border-gray-300"
                            : "bg-gray-800 border-gray-700"
                        } border rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <Phone
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            theme === "light"
                              ? "text-teal-600"
                              : "text-teal-400"
                          }`}
                        />
                      </div>
                      <div>
                        <div
                          className={`text-xs sm:text-sm ${themeClasses.textMuted}`}
                        >
                          Phone
                        </div>
                        <div
                          className={`${themeClasses.text} font-medium text-sm sm:text-base`}
                        >
                          {personalInfo.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                      Follow me on:
                    </h4>
                    <div className="flex space-x-3 sm:space-x-4">
                      {personalInfo.socialLinks.map((social) => (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 sm:w-12 sm:h-12 ${
                            theme === "light"
                              ? "bg-gray-200 border-gray-300 hover:bg-teal-500 hover:border-teal-400"
                              : "bg-gray-800 border-gray-700 hover:bg-teal-600 hover:border-teal-500"
                          } border rounded-full flex items-center justify-center transition-all duration-300`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`pt-8 pb-24 sm:py-12 border-t ${
            theme === "light"
              ? "border-gray-300/50 bg-gray-100/50"
              : "border-gray-700/50 bg-gray-950/50"
          } backdrop-blur-sm`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-center items-center">
              <div className={`${themeClasses.textSecondary} text-center`}>
                <p className="text-sm sm:text-base font-medium">
                  © 2024 Santosh Kumar Thakur
                </p>
                <p
                  className={`text-xs sm:text-sm ${themeClasses.textMuted} mt-1`}
                >
                  Software Developer
                </p>
                 {visitorCount !== null && (
          <p className="text-xs sm:text-sm mt-2">
            👀 Visitors: <b>{visitorCount}</b>
          </p>
        )}
              </div>
            </div>

            {/* Additional mobile spacing */}
            <div className="mt-6 pt-6 border-t border-gray-800/50 text-center md:hidden">
              {/* <p className="text-xs text-gray-500">
                Built with ❤️ using React & Next.js
              </p> */}
            </div>
          </div>
        </footer>

        {/* Floating Contact Button */}
        <motion.button
          onClick={() => scrollToSection("contact")}
          className={`fixed bottom-8 right-6 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 ${themeClasses.button} text-white rounded-full shadow-2xl shadow-teal-600/30 flex items-center justify-center z-40 transition-all duration-300 group`}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
        >
          <Mail className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-600/50 to-cyan-600/50 blur-xl -z-10 animate-pulse" />
        </motion.button>

        {/* Mobile bottom padding to account for floating button */}
        <div className="h-20 md:hidden" />
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <ThemeProvider>
      <ClientOnly>
        <PortfolioContent />
      </ClientOnly>
    </ThemeProvider>
  );
}