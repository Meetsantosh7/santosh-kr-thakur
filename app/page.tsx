"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import ClientOnly from "./components/ClientOnly"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Updated Data Arrays
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
    { name: "LinkedIn", url: "https://linkedin.com/in/santoshkumarthakur", icon: Linkedin },
    { name: "Instagram", url: "https://instagram.com/lift_withsantosh", icon: Instagram },
    { name: "Email", url: "mailto:santosh07entrepreneur@gmail.com", icon: Mail },
  ],
}

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
    technologies: ["React.js", "Next.js", "Laravel", "MySQL", "GitLab ", "Php", "MYsql"],
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
    technologies: ["Jira", "Bliss", "ServiceNow", "Remote Desktop", "Windows Server", "Linux", "SQL"],
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
    technologies: ["TeamViewer", "Remote Desktop", "Windows", "MacOS", "Office 365", "VPN", "Antivirus"],
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
    technologies: ["Python", "SQL", "Excel", "Power BI", "Tableau", "Pandas", "NumPy", "MySQL"],
  },
]

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with React and Laravel featuring real-time inventory management, payment integration, and admin dashboard",
    technologies: ["React", "Laravel", "MySQL", "Bootstrap", "Stripe", "Redis"],
    status: "Completed",
    links: [
      { type: "GitHub", url: "https://github.com/Meetsantosh7", icon: Github },
      { type: "Live Demo", url: "#", icon: ExternalLink },
    ],
  },
  {
    id: 2,
    title: "Smart India Hackathon Solution",
    description:
      "Award-winning application for real-world problem solving in healthcare sector with AI-powered diagnostics and telemedicine features",
    technologies: ["Angular", "PHP", "Firebase", "Material-UI", "TensorFlow", "WebRTC"],
    status: "Award Winner",
    links: [
      { type: "GitHub", url: "https://github.com/Meetsantosh7", icon: Github },
      { type: "News Article", url: "#", icon: ExternalLink },
    ],
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "Modern responsive portfolio website built with React.js featuring interactive animations, smooth scrolling, and dynamic content management",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    status: "Live",
    links: [
      { type: "GitHub", url: "https://github.com/Meetsantosh7", icon: Github },
      { type: "Live", url: "#", icon: ExternalLink },
    ],
  },
  {
    id: 4,
    title: "Real Estate Management System",
    description:
      "Comprehensive property management platform with client portal, property listings, and automated reporting features",
    technologies: ["PHP", "Laravel", "MySQL", "Bootstrap", "jQuery"],
    status: "Completed",
    links: [
      { type: "GitHub", url: "https://github.com/Meetsantosh7", icon: Github },
      { type: "Demo", url: "#", icon: ExternalLink },
    ],
  },
  {
    id: 5,
    title: "Task Management App",
    description:
      "Team collaboration tool with real-time updates, project tracking, and performance analytics for enhanced productivity",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Material-UI"],
    status: "Live",
    links: [
      { type: "GitHub", url: "https://github.com/Meetsantosh7", icon: Github },
      { type: "Live", url: "#", icon: ExternalLink },
    ],
  },
  {
    id: 6,
    title: "Restaurant Ordering System",
    description:
      "Digital menu and ordering platform with payment integration, order tracking, and inventory management for restaurants",
    technologies: ["React", "Laravel", "MySQL", "Stripe API", "Bootstrap"],
    status: "Completed",
    links: [
      { type: "GitHub", url: "https://github.com/Meetsantosh7", icon: Github },
      { type: "Demo", url: "#", icon: ExternalLink },
    ],
  },
]

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 90, icon: "▲" },
      { name: "JavaScript", level: 92, icon: "�" },
      { name: "HTML5", level: 95, icon: "🌐" },
      { name: "CSS3", level: 90, icon: "�" },
      { name: "Tailwind CSS", level: 88, icon: "�" },
      { name: "Bootstrap", level: 85, icon: "�️" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "PHP", level: 92, icon: "🐘" },
      { name: "Laravel", level: 90, icon: "🔴" },
      { name: "Node.js", level: 85, icon: "�" },
      { name: "Express.js", level: 82, icon: "⚡" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", level: 90, icon: "🐬" },
      { name: "MongoDB", level: 78, icon: "🍃" },
      { name: "Firebase", level: 85, icon: "🔥" },
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git", level: 92, icon: "📝" },
      { name: "VS Code", level: 95, icon: "💙" },
      { name: "Figma", level: 80, icon: "🎨" },
      { name: "Postman", level: 88, icon: "�" },
    ],
  },
]

const education = [
  {
    id: 1,
    degree: "Master of Computer Applications (MCA)",
    institution: "Chandigarh University",
    year: "2025 - 2027",
    grade: "Pursuing",
    description: "Advanced studies in Computer Applications, Software Development, and Modern Technologies",
  },
  {
    id: 2,
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Kendriya Vidyalaya Masjid Moth Saidha Nagar",
    year: "Oct 2021 - Sep 2024",
    grade: "First Class",
    description: "Comprehensive study of Computer Applications, Programming Languages, and Software Development with focus on practical implementation",
  },
  {
    id: 3,
    degree: "Class 12th (Science Stream)",
    institution: "Kendriya Vidyalaya Masjid Moth Saidha Nagar",
    year: "Apr 2018 - Apr 2019",
    grade: "75.2%",
    description: "Science Stream with Physics, Chemistry, Mathematics, and Computer Science",
  },
  {
    id: 4,
    degree: "Class 10th",
    institution: "Kendriya Vidyalaya Masjid Moth Saidha Nagar",
    year: "Apr 2016 - Apr 2017",
    grade: "79.8%",
    description: "Secondary education with strong foundation in Mathematics, Science, and Computer Applications",
  },
]

const navigationItems = [
  { name: "Home", id: "home" },
  { name: "Work", id: "projects" },
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Education", id: "education" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "contact" },
]

function PortfolioContent() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navigationItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden" suppressHydrationWarning>
      {/* Geometric Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-transparent to-cyan-900/20" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
              linear-gradient(45deg, transparent 40%, rgba(20, 184, 166, 0.05) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(6, 182, 212, 0.05) 50%, transparent 60%)
            `,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Desktop Navigation */}
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
          <div className="bg-black/90 backdrop-blur-xl border border-gray-700/50 rounded-full px-8 py-4 shadow-2xl shadow-teal-500/10">
            <div className="flex items-center space-x-2">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-600/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/80"
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
          className="fixed top-6 right-6 z-50 md:hidden bg-black/90 backdrop-blur-md border border-gray-700/50 rounded-full p-3 shadow-xl"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.div>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-20 right-6 z-40 md:hidden bg-black/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 shadow-2xl min-w-[200px]"
            >
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left relative overflow-hidden ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/80"
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeTabMobileMenu"
                        className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
        <section id="home" className="min-h-screen flex items-center justify-center pt-5 md:pt-28 px-4">
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
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 p-1 animate-pulse">
                    <div className="rounded-full overflow-hidden bg-black">
                      <img src="/images/profile.jpeg" alt="Santosh Kumar Thakur" className="w-full h-full object-cover" />
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
                <div className="inline-flex items-center space-x-2 bg-teal-600/20 border border-teal-500/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm mb-4 sm:mb-6">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-teal-300">Available for work</span>
                </div>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  Santosh
                </span>
                <motion.span
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-block ml-2"
                >
                  👋
                </motion.span>
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-transparent bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text mb-3 sm:mb-4 font-light"
              >
                {personalInfo.title}
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
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
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-full px-8 sm:px-10 py-3 sm:py-4 font-medium flex items-center justify-center space-x-2 sm:space-x-3 shadow-xl shadow-teal-600/30 hover:shadow-teal-600/50 transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Let's Connect</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-teal-500 rounded-full px-8 sm:px-10 py-3 sm:py-4 font-medium flex items-center justify-center space-x-2 sm:space-x-3 bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-105"
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
                    className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 hover:border-transparent transition-all duration-300 group overflow-hidden"
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
              <span className="text-xs sm:text-sm text-gray-400">Scroll to explore</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
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
              <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent">
                  About Me
                </h2>
                <motion.div 
                  className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 mx-auto mb-6 sm:mb-8 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "6rem" }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                />
                <motion.p 
                  className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Passionate about creating exceptional digital experiences that make a difference
                </motion.p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <motion.div variants={fadeInUp}>
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">{personalInfo.intro}</p>

                    <div className="grid grid-cols-3 gap-4 sm:gap-6">
                      <motion.div 
                        className="text-center group"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:from-teal-300 group-hover:to-cyan-300 transition-all duration-300">
                          {personalInfo.experience}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 font-medium">Experience</div>
                      </motion.div>
                      <motion.div 
                        className="text-center group"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:from-teal-300 group-hover:to-cyan-300 transition-all duration-300">
                          {personalInfo.projects}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 font-medium">Projects</div>
                      </motion.div>
                      <motion.div 
                        className="text-center group"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:from-teal-300 group-hover:to-cyan-300 transition-all duration-300">
                          {personalInfo.clients}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 font-medium">Clients</div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex justify-center mt-8 lg:mt-0">
                  <div className="relative group">
                    <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-2">
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
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}

        <section id="experience" className="py-16 sm:py-24 lg:py-32 bg-gray-950/30 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-transparent to-cyan-900/10" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 60% 30%, rgba(16, 185, 129, 0.05) 0%, transparent 40%),
                  radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.05) 0%, transparent 40%)
                `,
              }}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Experience</h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-6 sm:mb-8" />
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
                  My work experience as a software engineer and working on different companies and projects.
                </p>
              </motion.div>

              {/* Timeline Container */}
              <div className="max-w-6xl mx-auto relative">
                {/* Vertical Timeline Line - Desktop */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-500 opacity-30 hidden sm:block" />
                
                {/* Vertical Timeline Line - Mobile */}
                <div className="absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-500 opacity-30 sm:hidden" />

                {/* Timeline Items */}
                <div className="space-y-12 sm:space-y-16">
                  {experiences.map((exp, index) => (
                    <motion.div 
                      key={exp.id} 
                      variants={fadeInUp}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                      } flex-row`}
                    >
                      {/* Timeline Node - Desktop */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden sm:block">
                        <motion.div
                          className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full border-4 border-gray-900 shadow-2xl flex items-center justify-center"
                          whileInView={{ scale: [0, 1.2, 1] }}
                          transition={{ duration: 0.6, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse" />
                        </motion.div>
                        
                        {/* Date Badge - Desktop */}
                        <motion.div
                          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-600/30 to-cyan-600/30 border border-teal-400/40 rounded-full px-4 py-2 backdrop-blur-sm shadow-lg shadow-teal-500/20"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-xs sm:text-sm text-teal-200 font-semibold whitespace-nowrap">
                            {exp.period}
                          </span>
                        </motion.div>
                      </div>

                      {/* Timeline Node - Mobile */}
                      <div className="absolute left-6 transform -translate-x-1/2 z-20 sm:hidden">
                        <motion.div
                          className="w-6 h-6 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full border-2 border-gray-900 shadow-xl flex items-center justify-center"
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
                          'sm:w-5/12 ' + (index % 2 === 0 ? 'sm:pr-16' : 'sm:pl-16')
                        } ${
                          // Mobile layout - always left aligned with padding for timeline
                          'pl-16 pr-4'
                        }`}
                        initial={{ 
                          opacity: 0, 
                          x: 30,
                          scale: 0.9 
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          x: 0,
                          scale: 1 
                        }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.2,
                          type: "spring",
                          stiffness: 100
                        }}
                        viewport={{ once: true }}
                      >
                        <Card className="bg-gradient-to-br from-teal-950/40 via-gray-900/60 to-cyan-950/40 border border-teal-500/20 backdrop-blur-xl hover:bg-gradient-to-br hover:from-teal-900/60 hover:via-gray-800/80 hover:to-cyan-900/60 transition-all duration-500 group hover:shadow-2xl hover:shadow-teal-500/30 hover:border-teal-400/50 hover:scale-[1.03] relative overflow-hidden">
                          {/* Enhanced Card Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-cyan-600/5 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <CardHeader className="p-4 sm:p-6 relative z-10">
                            <div className="flex flex-col gap-3">
                              {/* Mobile Date Badge */}
                              <motion.div
                                className="sm:hidden bg-gradient-to-r from-teal-600/30 to-cyan-600/30 border border-teal-400/40 rounded-full px-3 py-1 backdrop-blur-sm self-start shadow-lg shadow-teal-500/20"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 + 0.3 }}
                                viewport={{ once: true }}
                              >
                                <span className="text-xs text-teal-200 font-semibold">
                                  {exp.period}
                                </span>
                              </motion.div>
                              
                              <div className="flex items-start justify-between gap-3">
                                <CardTitle className="text-white text-base sm:text-lg font-bold group-hover:bg-gradient-to-r group-hover:from-teal-300 group-hover:to-cyan-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight">
                                  {exp.title}
                                </CardTitle>
                                <Badge className="bg-gradient-to-r from-emerald-600/30 to-green-600/30 text-emerald-200 border-emerald-400/40 backdrop-blur-sm text-xs whitespace-nowrap flex-shrink-0 shadow-lg shadow-emerald-500/20 font-semibold">
                                  {exp.type}
                                </Badge>
                              </div>
                              
                              <CardDescription className="text-transparent bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-300 bg-clip-text font-bold text-sm sm:text-base drop-shadow-sm">
                                {exp.company}
                              </CardDescription>
                              
                              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-300">
                                <span className="flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full px-2 py-1">
                                  <MapPin className="w-3 h-3 text-teal-400" />
                                  <span className="text-teal-200">{exp.location}</span>
                                </span>
                                <span className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-2 py-1">
                                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                  <span className="text-cyan-200">{exp.duration}</span>
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="p-4 sm:p-6 pt-0 relative z-10">
                            <ul className="space-y-3 text-gray-200 mb-4 sm:mb-6 text-sm sm:text-base">
                              {exp.responsibilities.slice(0, 3).map((responsibility, idx) => (
                                <motion.li 
                                  key={idx} 
                                  className="flex items-start group/item"
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.2 + idx * 0.1 + 0.4 }}
                                  viewport={{ once: true }}
                                >
                                  <span className="text-teal-400 mr-3 mt-1 text-base group-hover/item:text-teal-300 transition-colors flex-shrink-0 font-bold">▶</span>
                                  <span className="leading-relaxed group-hover/item:text-white transition-colors duration-200">{responsibility}</span>
                                </motion.li>
                              ))}
                            </ul>
                            
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.slice(0, 4).map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="border-teal-400/30 text-teal-100 bg-gradient-to-r from-teal-600/20 to-cyan-600/20 backdrop-blur-sm text-xs hover:bg-gradient-to-r hover:from-teal-500/30 hover:to-cyan-500/30 hover:border-teal-300/50 hover:scale-105 transition-all duration-300 font-medium shadow-sm"
                                >
                                  {tech}
                                </Badge>
                              ))}
                              {exp.technologies.length > 4 && (
                                <Badge
                                  variant="outline"
                                  className="border-gray-500/30 text-gray-300 bg-gradient-to-r from-gray-600/20 to-gray-700/20 backdrop-blur-sm text-xs hover:border-teal-400/30 hover:text-teal-200 transition-all duration-300"
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
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent">
                  Education 🎓
                </h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-6 sm:mb-8" />
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
                  My educational journey has been a path of self-discovery and growth. My educational details are as follows.
                </p>
              </motion.div>

              {/* Timeline Container */}
              <div className="max-w-4xl mx-auto relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-8 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-500 opacity-30" />

                {/* Education Items */}
                <div className="space-y-8 sm:space-y-12">
                  {education.map((edu, index) => (
                    <motion.div 
                      key={edu.id} 
                      variants={fadeInUp}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                      } flex-row`}
                    >
                      {/* Timeline Node */}
                      <div className={`absolute ${
                        // Mobile: always left
                        'left-8 transform -translate-x-1/2 ' +
                        // Desktop: center
                        'sm:left-1/2 sm:transform sm:-translate-x-1/2'
                      } z-20`}>
                        <motion.div
                          className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full border-2 sm:border-4 border-gray-900 shadow-xl flex items-center justify-center"
                          whileInView={{ scale: [0, 1.2, 1] }}
                          transition={{ duration: 0.6, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                        </motion.div>
                        
                        {/* Date Badge */}
                        <motion.div
                          className={`absolute ${
                            // Mobile: right side of node
                            'left-8 top-1/2 transform -translate-y-1/2 ' +
                            // Desktop: below node, centered
                            'sm:left-1/2 sm:top-12 sm:transform sm:-translate-x-1/2 sm:-translate-y-0'
                          } bg-gradient-to-r from-teal-600/30 to-cyan-600/30 border border-teal-400/40 rounded-full px-4 py-2 backdrop-blur-sm whitespace-nowrap shadow-lg shadow-teal-500/20`}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-xs sm:text-sm text-teal-200 font-semibold">
                            {edu.year}
                          </span>
                        </motion.div>
                      </div>

                      {/* Education Card */}
                      <motion.div
                        className={`w-full ${
                          // Desktop layout
                          'sm:w-5/12 ' + (index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12')
                        } ${
                          // Mobile layout - always left aligned with padding for timeline
                          'pl-20 pr-4'
                        }`}
                        initial={{ 
                          opacity: 0, 
                          x: index % 2 === 0 ? -30 : 30,
                          scale: 0.9 
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          x: 0,
                          scale: 1 
                        }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.2,
                          type: "spring",
                          stiffness: 100
                        }}
                        viewport={{ once: true }}
                      >
                        <Card className="bg-gradient-to-br from-teal-950/40 via-gray-900/60 to-cyan-950/40 border border-teal-500/20 backdrop-blur-xl hover:bg-gradient-to-br hover:from-teal-900/60 hover:via-gray-800/80 hover:to-cyan-900/60 transition-all duration-500 group hover:shadow-2xl hover:shadow-teal-500/30 hover:border-teal-400/50 hover:scale-[1.03] relative overflow-hidden">
                          {/* Enhanced Card Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-cyan-600/5 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <CardHeader className="p-4 sm:p-6 relative z-10">
                            <div className="flex flex-col gap-3">
                              <CardTitle className="text-white text-base sm:text-lg font-bold group-hover:bg-gradient-to-r group-hover:from-teal-300 group-hover:to-cyan-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight">
                                {edu.degree}
                              </CardTitle>
                              
                              <CardDescription className="text-transparent bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-300 bg-clip-text font-bold text-sm sm:text-base drop-shadow-sm">
                                {edu.institution}
                              </CardDescription>
                              
                              <div className="flex items-center gap-2 text-xs sm:text-sm">
                                <Badge className="bg-gradient-to-r from-emerald-600/30 to-green-600/30 text-emerald-200 border-emerald-400/40 backdrop-blur-sm shadow-lg shadow-emerald-500/20 font-semibold">
                                  {edu.grade}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="p-4 sm:p-6 pt-0 relative z-10">
                            <p className="text-gray-200 text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors duration-200">
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

        {/* Projects Section */}
        <section id="projects" className="py-16 sm:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Featured Work</h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-6 sm:mb-8" />
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
                  Some of my best work that I'm proud to showcase
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                {projects.map((project, index) => (
                  <motion.div key={project.id} variants={fadeInUp}>
                    <Card className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 border-gray-700/50 backdrop-blur-xl hover:bg-gradient-to-br hover:from-gray-900/80 hover:to-gray-800/60 transition-all duration-500 group h-full hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-500/30 hover:scale-[1.02]">
                      <CardHeader className="p-4 sm:p-6">
                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                          <CardTitle className="text-white group-hover:text-teal-300 transition-colors duration-300 text-base sm:text-lg leading-tight pr-2">
                            {project.title}
                          </CardTitle>
                          <Badge
                            className={`${
                              project.status === "Completed"
                                ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-300 border-green-600/30"
                                : project.status === "Live"
                                  ? "bg-gradient-to-r from-teal-600/20 to-cyan-600/20 text-teal-300 border-teal-600/30"
                                  : "bg-gradient-to-r from-yellow-600/20 to-orange-600/20 text-yellow-300 border-yellow-600/30"
                            } backdrop-blur-sm text-xs whitespace-nowrap`}
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <CardDescription className="text-gray-400 leading-relaxed text-sm sm:text-base">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="border-gray-600/50 text-gray-300 bg-gray-800/50 backdrop-blur-sm text-xs hover:bg-teal-600/20 hover:border-teal-500/50 transition-all duration-300"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                          {project.links.map((link, idx) => (
                            <Button
                              key={idx}
                              size="sm"
                              variant="ghost"
                              className="text-gray-400 hover:text-teal-400 p-0 h-auto group/btn text-xs sm:text-sm"
                              onClick={() => window.open(link.url, "_blank")}
                            >
                              <link.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                              {link.type}
                            </Button>
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

        {/* Skills Section */}
        <section id="skills" className="py-16 sm:py-24 lg:py-32 bg-gray-950/30">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Skills & Technologies</h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-6 sm:mb-8" />
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
                  Technologies and tools I've mastered over the years
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
                {skillsData.map((skillGroup, groupIndex) => (
                  <motion.div key={skillGroup.category} variants={fadeInUp}>
                    <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm h-full">
                      <CardHeader className="text-center p-4 sm:p-6">
                        <CardTitle className="text-white text-base sm:text-lg mb-3 sm:mb-4">{skillGroup.category}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="space-y-3 sm:space-y-4">
                          {skillGroup.skills.map((skill, index) => (
                            <div key={skill.name} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <span className="text-base sm:text-lg">{skill.icon}</span>
                                  <span className="text-xs sm:text-sm font-medium text-gray-300">{skill.name}</span>
                                </div>
                                <span className="text-xs text-teal-400 font-semibold">{skill.level}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
                                <motion.div
                                  className="bg-gradient-to-r from-teal-500 to-cyan-500 h-1.5 sm:h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  transition={{ duration: 1.5, delay: index * 0.1 }}
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

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Let's Work Together</h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-6 sm:mb-8" />
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
                  Have a project in mind? Let's discuss how we can bring it to life
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
                <motion.div variants={fadeInUp}>
                  <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-white flex items-center text-lg sm:text-xl">
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-teal-400" />
                        Send me a message
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base">I'll get back to you within 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <Input
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 h-10 sm:h-12 text-sm sm:text-base"
                        />
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 h-10 sm:h-12 text-sm sm:text-base"
                        />
                        <Textarea
                          placeholder="Your Message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                        />
                        <Button
                          type="submit"
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-lg shadow-teal-600/25 h-10 sm:h-12 text-sm sm:text-base"
                        >
                          <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get in touch</h3>
                    <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                      I'm always interested in hearing about new opportunities and interesting projects. Whether you're
                      a company looking to hire, or you're someone who has a project in mind, I'd love to hear from you.
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-400">Email</div>
                        <div className="text-white font-medium text-sm sm:text-base break-all">{personalInfo.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-400">Location</div>
                        <div className="text-white font-medium text-sm sm:text-base">{personalInfo.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-gray-400">Phone</div>
                        <div className="text-white font-medium text-sm sm:text-base">{personalInfo.phone}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Follow me on:</h4>
                    <div className="flex space-x-3 sm:space-x-4">
                      {personalInfo.socialLinks.map((social) => (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center hover:bg-teal-600 hover:border-teal-500 transition-all duration-300"
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
        <footer className="pt-8 pb-24 sm:py-12 border-t border-gray-700/50 bg-gray-950/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-center items-center">
              <div className="text-gray-300 text-center">
                <p className="text-sm sm:text-base font-medium">© 2024 Santosh Kumar Thakur</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Software Developer</p>
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
          className="fixed bottom-8 right-6 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-full shadow-2xl shadow-teal-600/30 flex items-center justify-center z-40 transition-all duration-300 group"
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
  )
}

export default function Portfolio() {
  return (
    <ClientOnly>
      <PortfolioContent />
    </ClientOnly>
  )
}
