"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  MapPin,
  ArrowRight,
  Download,
  Code,
  Briefcase,
  GraduationCap,
  User,
  Phone,
  Send,
  Star,
  Clock,
  Eye,
  Heart,
} from "lucide-react"
import "./App.css"

// Enhanced Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
}

// Data with enhanced details
const personalInfo = {
  name: "Santosh Kumar Thakur",
  title: "Full Stack Developer",
  tagline: "I help businesses build scalable web applications",
  subtitle: "digital solutions",
  intro:
    "I am a motivated and versatile individual, always eager to take on new challenges. With a passion for learning I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.",
  email: "santosh07entrepreneur@gmail.com",
  location: "India",
  phone: "+91 XXXXX XXXXX",
  experience: "3+ Years",
  projects: "50+ Projects",
  clients: "25+ Clients",
  socialLinks: [
    { name: "GitHub", url: "https://github.com/Meetsantosh7", icon: Github, color: "#333" },
    { name: "LinkedIn", url: "https://linkedin.com/in/santoshkumarthakur", icon: Linkedin, color: "#0077B5" },
    { name: "Instagram", url: "https://instagram.com/lift_withsantosh", icon: Instagram, color: "#E4405F" },
    { name: "Email", url: "mailto:santosh07entrepreneur@gmail.com", icon: Mail, color: "#EA4335" },
  ],
}

const stats = [
  { label: "Years Experience", value: "3+", icon: Clock, color: "#3B82F6" },
  { label: "Projects Completed", value: "50+", icon: Code, color: "#10B981" },
  { label: "Happy Clients", value: "25+", icon: Heart, color: "#F59E0B" },
  { label: "Code Reviews", value: "100+", icon: Eye, color: "#8B5CF6" },
]

const experiences = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Ministry of Education – Innovation Cell",
    period: "April 2024 - Present",
    duration: "8+ months",
    location: "New Delhi, India",
    type: "Full-time",
    logo: "🏛️",
    color: "#FFD700",
    salary: "₹8-12 LPA",
    teamSize: "15+ developers",
    responsibilities: [
      "Enhanced user experiences on Netscript PG & Netscript Analytics portal using React.js, 20% user engagement boost",
      "Built responsive web applications with React.js and Laravel, serving 10,000+ daily active users",
      "Optimized database queries reducing response time by 40% using MySQL optimization techniques",
      "Mentored junior developers and conducted code reviews ensuring high code quality",
      "Collaborated with cross-functional teams including designers, product managers, and stakeholders",
      "Implemented CI/CD pipelines using GitLab CI, reducing deployment time by 60%",
    ],
    achievements: [
      "Employee of the Month - June 2024",
      "Led migration of legacy system to modern architecture",
      "Reduced application load time by 45%",
    ],
    technologies: ["React.js", "Next.js", "Laravel", "MySQL", "GitLab CI", "AWS", "Docker"],
  },
  {
    id: 2,
    title: "Technical Support Engineer",
    company: "Zoro Mart Pvt Ltd",
    period: "Aug 2022 - Mar 2023",
    duration: "8 months",
    location: "Mumbai, India",
    type: "Full-time",
    logo: "🛒",
    color: "#FF6B35",
    salary: "₹4-6 LPA",
    teamSize: "8+ developers",
    responsibilities: [
      "Built Full Stack Platforms using React.js integrated GraphQL with AXIOS, enabled High level GraphQL API integration",
      "Implemented pixel-perfect UI designs from Figma mockups with 99% accuracy",
      "Built reusable component libraries reducing development time by 30%",
      "Integrated third-party APIs and services including payment gateways and social media APIs",
      "Optimized web applications for performance achieving 95+ Lighthouse scores",
      "Worked closely with UX/UI designers to ensure seamless user experiences",
    ],
    achievements: [
      "Improved application performance by 40%",
      "Successfully delivered 15+ projects on time",
      "Mentored 3 junior developers",
    ],
    technologies: ["React.js", "GraphQL", "AXIOS", "Figma", "REST APIs", "JavaScript", "CSS3"],
  },
  {
    id: 3,
    title: "Open Source Contributor",
    company: "Various Projects",
    period: "May 2023 - Present",
    duration: "Ongoing",
    location: "Remote",
    type: "Open Source",
    logo: "🌟",
    color: "#10B981",
    contributions: "200+ commits",
    repositories: "25+ repos",
    responsibilities: [
      "Contributed to different open-source projects and learn from industry experts",
      "Learned and implemented version control best practices using Git and GitHub",
      "Contributed to both frontend and backend development gaining full-stack experience",
      "Participated in community discussions and code reviews",
      "Helped maintain documentation and wrote technical guides",
      "Collaborated with developers worldwide on various projects",
    ],
    achievements: [
      "Top contributor in 5 major open source projects",
      "Created 3 popular npm packages",
      "Helped resolve 100+ GitHub issues",
    ],
    technologies: ["JavaScript", "React.js", "Node.js", "Git", "GitHub", "Open Source"],
  },
]

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with React and Laravel featuring real-time inventory management, payment integration, and admin dashboard",
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["React", "Laravel", "MySQL", "Bootstrap", "Stripe", "Redis"],
    features: ["Real-time inventory", "Payment gateway", "Admin dashboard", "Order tracking"],
    status: "Completed",
    duration: "3 months",
    team: "4 developers",
    links: [
      { type: "GitHub", url: "https://github.com/Meetsantosh7", icon: Github },
      { type: "Live Demo", url: "#", icon: ExternalLink },
    ],
    stats: {
      users: "1000+",
      transactions: "₹50L+",
      uptime: "99.9%",
    },
  },
  {
    id: 2,
    title: "Smart India Hackathon Solution",
    description:
      "Award-winning application for real-world problem solving in healthcare sector with AI-powered diagnostics and telemedicine features",
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["Angular", "PHP", "Firebase", "Material-UI", "TensorFlow", "WebRTC"],
    features: ["AI diagnostics", "Video consultation", "Patient records", "Prescription management"],
    status: "Award Winner",
    duration: "48 hours",
    team: "5 developers",
    links: [
      { type: "GitHub", url: "https://github.com/Meetsantosh7", icon: Github },
      { type: "News Article", url: "#", icon: ExternalLink },
    ],
    stats: {
      award: "1st Prize",
      impact: "500+ patients",
      recognition: "National Level",
    },
  },
  {
    id: 3,
    title: "3D Interactive Portfolio",
    description:
      "Modern 3D portfolio website built with Three.js featuring interactive animations, particle systems, and immersive user experience",
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["React", "Three.js", "CSS", "JavaScript", "GSAP", "Blender"],
    features: ["3D animations", "Particle effects", "Interactive models", "Responsive design"],
    status: "Live",
    duration: "2 months",
    team: "Solo project",
    links: [
      { type: "GitHub", url: "https://github.com/Meetsantosh7", icon: Github },
      { type: "Live", url: "https://3d-portfolio-website-taupe.vercel.app/", icon: ExternalLink },
    ],
    stats: {
      visitors: "5000+",
      performance: "95/100",
      loading: "< 3s",
    },
  },
]

const skillsData = [
  {
    category: "Frontend Development",
    description: "Building responsive and interactive user interfaces",
    icon: "🎨",
    skills: [
      {
        name: "React.js",
        icon: "/images/react-icon.png",
        level: 95,
        color: "#61DAFB",
        isImage: true,
        experience: "3 years",
        projects: 25,
      },
      { name: "Next.js", icon: "▲", level: 90, color: "#000000", experience: "2 years", projects: 15 },
      { name: "Angular", icon: "🅰️", level: 85, color: "#DD0031", experience: "2 years", projects: 12 },
      { name: "Vue.js", icon: "💚", level: 80, color: "#4FC08D", experience: "1.5 years", projects: 8 },
      { name: "TypeScript", icon: "📘", level: 88, color: "#3178C6", experience: "2.5 years", projects: 20 },
      { name: "JavaScript", icon: "🟨", level: 92, color: "#F7DF1E", experience: "3 years", projects: 30 },
      { name: "HTML5", icon: "🌐", level: 95, color: "#E34F26", experience: "4 years", projects: 40 },
      { name: "CSS3", icon: "🎨", level: 90, color: "#1572B6", experience: "4 years", projects: 35 },
      { name: "Sass", icon: "💗", level: 85, color: "#CC6699", experience: "2 years", projects: 18 },
      { name: "Tailwind CSS", icon: "🌊", level: 88, color: "#06B6D4", experience: "2 years", projects: 22 },
    ],
  },
  {
    category: "Backend Development",
    description: "Server-side development and API creation",
    icon: "⚙️",
    skills: [
      { name: "Node.js", icon: "🟢", level: 88, color: "#339933", experience: "2.5 years", projects: 20 },
      { name: "PHP", icon: "🐘", level: 90, color: "#777BB4", experience: "3 years", projects: 25 },
      { name: "Laravel", icon: "🔴", level: 92, color: "#FF2D20", experience: "2.5 years", projects: 18 },
      { name: "Python", icon: "🐍", level: 85, color: "#3776AB", experience: "2 years", projects: 12 },
      { name: "Express.js", icon: "⚡", level: 85, color: "#000000", experience: "2 years", projects: 15 },
      { name: "REST APIs", icon: "🔗", level: 90, color: "#FF6B35", experience: "3 years", projects: 30 },
      { name: "GraphQL", icon: "🌸", level: 75, color: "#E10098", experience: "1 year", projects: 8 },
    ],
  },
  {
    category: "Database & Cloud",
    description: "Data management and cloud services",
    icon: "☁️",
    skills: [
      { name: "MySQL", icon: "🐬", level: 90, color: "#4479A1", experience: "3 years", projects: 25 },
      { name: "PostgreSQL", icon: "🐘", level: 85, color: "#336791", experience: "2 years", projects: 12 },
      { name: "MongoDB", icon: "🍃", level: 82, color: "#47A248", experience: "2 years", projects: 15 },
      { name: "Firebase", icon: "🔥", level: 88, color: "#FFCA28", experience: "2.5 years", projects: 18 },
      { name: "AWS", icon: "☁️", level: 80, color: "#FF9900", experience: "1.5 years", projects: 10 },
      { name: "Docker", icon: "🐳", level: 78, color: "#2496ED", experience: "1.5 years", projects: 8 },
      { name: "Redis", icon: "🔴", level: 75, color: "#DC382D", experience: "1 year", projects: 6 },
    ],
  },
  {
    category: "Tools & Technologies",
    description: "Development tools and workflow optimization",
    icon: "🛠️",
    skills: [
      { name: "Git", icon: "📝", level: 92, color: "#F05032", experience: "3 years", projects: 50 },
      { name: "GitLab", icon: "🦊", level: 90, color: "#FC6D26", experience: "2 years", projects: 20 },
      { name: "GitHub", icon: "🐙", level: 90, color: "#181717", experience: "3 years", projects: 45 },
      { name: "VS Code", icon: "💙", level: 95, color: "#007ACC", experience: "4 years", projects: 50 },
      { name: "Figma", icon: "🎨", level: 85, color: "#F24E1E", experience: "2 years", projects: 25 },
      { name: "Webpack", icon: "📦", level: 80, color: "#8DD6F9", experience: "2 years", projects: 15 },
      { name: "Vite", icon: "⚡", level: 85, color: "#646CFF", experience: "1.5 years", projects: 12 },
      { name: "Jest", icon: "🃏", level: 82, color: "#C21325", experience: "2 years", projects: 18 },
    ],
  },
]

const education = [
  {
    id: 1,
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "Indian Institute of Technology (IIT) Delhi",
    year: "2019 - 2023",
    duration: "4 years",
    grade: "CGPA: 8.7/10",
    location: "New Delhi, India",
    logo: "🎓",
    color: "#3B82F6",
    type: "Full-time",
    description: "Specialized in Full Stack Development, Data Structures & Algorithms, and Software Engineering",
    achievements: [
      "Dean's List for 6 consecutive semesters",
      "Led college coding club with 200+ members",
      "Winner of Inter-college Hackathon 2022",
      "Published research paper on Web Performance Optimization",
      "Secured 1st position in departmental programming contest",
      "Received merit scholarship for academic excellence",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Software Engineering",
      "Computer Networks",
      "Operating Systems",
      "Web Technologies",
      "Machine Learning",
      "Artificial Intelligence",
    ],
    projects: [
      "Final Year Project: AI-powered Code Review System",
      "Database Project: Hospital Management System",
      "Network Project: Chat Application with Socket Programming",
    ],
  },
  {
    id: 2,
    degree: "Higher Secondary Education (Science Stream)",
    institution: "Delhi Public School, R.K. Puram",
    year: "2017 - 2019",
    duration: "2 years",
    grade: "Percentage: 94.2%",
    location: "New Delhi, India",
    logo: "🏫",
    color: "#10B981",
    type: "Full-time",
    description: "Science Stream with Mathematics, Physics, Chemistry, and Computer Science",
    achievements: [
      "School Topper in Computer Science",
      "National Merit Scholarship recipient",
      "Captain of School Programming Club",
      "Represented school in National Science Olympiad",
      "Won inter-school mathematics competition",
      "Perfect attendance award for 2 consecutive years",
    ],
    coursework: ["Mathematics", "Physics", "Chemistry", "Computer Science", "English"],
    projects: [
      "Science Fair Project: Smart Home Automation System",
      "Computer Science Project: Library Management System",
    ],
  },
  {
    id: 3,
    degree: "Secondary School Education",
    institution: "Delhi Public School, R.K. Puram",
    year: "2015 - 2017",
    duration: "2 years",
    grade: "CGPA: 9.8/10",
    location: "New Delhi, India",
    logo: "📚",
    color: "#F59E0B",
    type: "Full-time",
    description: "Comprehensive secondary education with focus on Science and Mathematics",
    achievements: [
      "School Rank 2 in Class X Board Examinations",
      "Perfect score in Mathematics and Science",
      "Active member of Robotics Club",
      "Won inter-school coding competition",
      "Student council member",
      "Sports team captain",
    ],
    coursework: ["Mathematics", "Science", "Social Studies", "English", "Hindi", "Computer Applications"],
    projects: ["Robotics Project: Line Following Robot", "Science Project: Solar Panel Efficiency Study"],
  },
]

const navigationItems = [
  { name: "Home", id: "home", icon: User },
  { name: "About", id: "about", icon: User },
  { name: "Experience", id: "experience", icon: Briefcase },
  { name: "Projects", id: "projects", icon: Code },
  { name: "Skills", id: "skills", icon: Star },
  { name: "Education", id: "education", icon: GraduationCap },
  { name: "Contact", id: "contact", icon: Phone },
]

// Enhanced Theme Hook with System Preference
const useTheme = () => {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light")

    setTheme(initialTheme)
    document.documentElement.setAttribute("data-theme", initialTheme)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.setAttribute("data-theme", newTheme)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)

    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  return { theme, toggleTheme }
}

// Enhanced Components
const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  variant = "primary",
  size = "default",
  ...props
}) => (
  <motion.button
    className={`btn btn-${variant} btn-${size} ${className}`}
    onClick={onClick}
    type={type}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    {...props}
  >
    {children}
  </motion.button>
)

const Card = ({ children, className = "", hover = true }) => (
  <motion.div
    className={`card ${className}`}
    whileHover={hover ? { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" } : {}}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
)

const Badge = ({ children, className = "", color = "default" }) => (
  <span className={`badge badge-${color} ${className}`}>{children}</span>
)

const Input = ({ placeholder, value, onChange, type = "text", className = "", icon: Icon }) => (
  <div className="input-wrapper">
    {Icon && <Icon className="input-icon" />}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input ${className} ${Icon ? "input-with-icon" : ""}`}
    />
  </div>
)

const Textarea = ({ placeholder, value, onChange, className = "" }) => (
  <textarea placeholder={placeholder} value={value} onChange={onChange} className={`textarea ${className}`} />
)

// Enhanced Theme Toggle Component
const ThemeToggle = ({ theme, toggleTheme }) => (
  <motion.button
    onClick={toggleTheme}
    className="theme-toggle"
    whileHover={{ scale: 1.1, rotate: 180 }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="theme-icon-wrapper"
      >
        {theme === "dark" ? (
          <svg className="theme-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg className="theme-icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </motion.div>
    </AnimatePresence>
  </motion.button>
)

// Enhanced Stats Component
const StatsCard = ({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="stats-card"
  >
    <div className="stats-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
      <stat.icon className="icon" />
    </div>
    <div className="stats-content">
      <h3 className="stats-value">{stat.value}</h3>
      <p className="stats-label">{stat.label}</p>
    </div>
  </motion.div>
)

// Enhanced Skill Item Component
const SkillItem = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="skill-item"
    whileHover={{ scale: 1.02 }}
  >
    <div className="skill-header">
      <div className="skill-info">
        {skill.isImage ? (
          <img
            src={skill.icon || "/placeholder.svg"}
            alt={`${skill.name} icon`}
            className="skill-icon-image"
            style={{ filter: `drop-shadow(0 0 8px ${skill.color})` }}
          />
        ) : (
          <span className="skill-icon" style={{ color: skill.color }}>
            {skill.icon}
          </span>
        )}
        <div className="skill-details">
          <span className="skill-name">{skill.name}</span>
          <span className="skill-experience">
            {skill.experience} • {skill.projects} projects
          </span>
        </div>
      </div>
      <span className="skill-percentage">{skill.level}%</span>
    </div>
    <div className="skill-progress">
      <motion.div
        className="skill-progress-bar"
        style={{ backgroundColor: skill.color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      <div className="skill-progress-glow" style={{ backgroundColor: skill.color }} />
    </div>
  </motion.div>
)

// Enhanced Timeline Component
const TimelineItem = ({ item, index, isExperience = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    viewport={{ once: true }}
    className={`cosmic-timeline-item ${index % 2 === 0 ? "timeline-left" : "timeline-right"}`}
  >
    <motion.div
      className="cosmic-timeline-dot"
      style={{ backgroundColor: item.color }}
      whileHover={{ scale: 1.2 }}
      transition={{ duration: 0.3 }}
    >
      <span className="cosmic-timeline-icon">{item.logo}</span>
    </motion.div>
    <Card className="cosmic-timeline-card" hover={true}>
      <div className="cosmic-card-header">
        <div className="cosmic-card-badge" style={{ backgroundColor: item.color }}>
          {item.period}
        </div>
        <h3 className="cosmic-card-title">{isExperience ? item.title : item.degree}</h3>
        <p className="cosmic-card-company">{isExperience ? item.company : item.institution}</p>
        <div className="cosmic-card-meta">
          {item.location && <span className="cosmic-card-location">📍 {item.location}</span>}
          {item.grade && <span className="cosmic-card-grade">🎯 {item.grade}</span>}
          {item.salary && <span className="cosmic-card-salary">💰 {item.salary}</span>}
          {item.teamSize && <span className="cosmic-card-team">👥 {item.teamSize}</span>}
          {item.type && <span className="cosmic-card-type">🏢 {item.type}</span>}
        </div>
      </div>
      <div className="cosmic-card-content">
        <p className="cosmic-card-description">{item.description}</p>

        {item.responsibilities && (
          <div className="cosmic-section">
            <h4 className="cosmic-section-title">Key Responsibilities:</h4>
            <ul className="cosmic-responsibility-list">
              {item.responsibilities.slice(0, 4).map((resp, idx) => (
                <li key={idx}>• {resp}</li>
              ))}
            </ul>
          </div>
        )}

        {item.achievements && (
          <div className="cosmic-section">
            <h4 className="cosmic-section-title">Achievements:</h4>
            <ul className="cosmic-achievement-list">
              {item.achievements.slice(0, 3).map((achievement, idx) => (
                <li key={idx}>🏆 {achievement}</li>
              ))}
            </ul>
          </div>
        )}

        {item.projects && (
          <div className="cosmic-section">
            <h4 className="cosmic-section-title">Notable Projects:</h4>
            <ul className="cosmic-project-list">
              {item.projects.map((project, idx) => (
                <li key={idx}>🚀 {project}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="cosmic-skills">
          <h4 className="cosmic-skills-title">Technologies:</h4>
          <div className="cosmic-skills-badges">
            {(item.technologies || item.coursework)?.slice(0, 8).map((skill) => (
              <Badge key={skill} className="cosmic-skill-badge" color="primary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
)

// Enhanced Project Card Component
const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <Card className="project-card" hover={true}>
      <div className="project-image">
        <img src={project.image || "/placeholder.svg"} alt={project.title} />
        <div className="project-overlay">
          <div className="project-status">
            <Badge
              color={project.status === "Completed" ? "success" : project.status === "Live" ? "primary" : "warning"}
            >
              {project.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-meta">
            <span className="project-duration">⏱️ {project.duration}</span>
            <span className="project-team">👥 {project.team}</span>
          </div>
        </div>

        <p className="project-description">{project.description}</p>

        <div className="project-features">
          <h4 className="features-title">Key Features:</h4>
          <div className="features-list">
            {project.features.map((feature, idx) => (
              <Badge key={idx} className="feature-badge" color="secondary">
                ✨ {feature}
              </Badge>
            ))}
          </div>
        </div>

        <div className="project-stats">
          {Object.entries(project.stats).map(([key, value]) => (
            <div key={key} className="project-stat">
              <span className="stat-value">{value}</span>
              <span className="stat-label">{key}</span>
            </div>
          ))}
        </div>

        <div className="project-tech">
          {project.technologies.map((tech) => (
            <Badge key={tech} className="tech-badge" color="outline">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="project-actions">
          {project.links.map((link, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="small"
              onClick={() => window.open(link.url, "_blank")}
              className="project-link"
            >
              <link.icon className="link-icon" />
              {link.type}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  </motion.div>
)

function App() {
  const { theme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("home")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    alert("Message sent successfully!")
    setFormData({ name: "", email: "", message: "" })
    setIsLoading(false)
  }

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
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
    <div className="app">
      {/* Enhanced Background Effects */}
      <div className="grid-background"></div>
      <div className="glowing-orb"></div>
      <div className="floating-particles"></div>

      <div className="content">
        {/* Enhanced Navigation */}
        <nav className="navbar">
          <div className="nav-container">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="nav-logo">
              <span className="logo-text">Santosh</span>
              <span className="logo-dot">.</span>
            </motion.div>

            <div className="nav-menu">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-item ${activeSection === item.id ? "nav-item-active" : ""}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="nav-icon" />
                  <span>{item.name}</span>
                </motion.button>
              ))}
              <Button
                variant="primary"
                size="small"
                onClick={() => window.open("https://github.com/Meetsantosh7", "_blank")}
              >
                <Github className="btn-icon" />
                GitHub
              </Button>
            </div>

            <div className="nav-theme">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </nav>

        {/* Enhanced Notification Banner */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="notification-banner">
          <div className="notification-content">
            <Badge color="primary">New</Badge>
            <span className="notification-text">3D Portfolio is live! Check it out</span>
            <ArrowRight className="notification-arrow" />
          </div>
        </motion.div>

        {/* Enhanced Hero Section */}
        <section id="home" className="hero-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-content"
            >
              <motion.div
                className="hero-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="badge-text">👋 Welcome to my portfolio</span>
              </motion.div>

              <h1 className="hero-title">
                Hi, I'm{" "}
                <motion.span
                  className="hero-name"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {personalInfo.name}
                </motion.span>
              </h1>

              <motion.div
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="hero-role">
                  I'm a <span className="role-highlight">{personalInfo.title}</span>
                </p>
                <p className="hero-tagline">{personalInfo.tagline}</p>
              </motion.div>

              <motion.div
                className="hero-intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="profile-image-wrapper">
                  <div className="profile-image">
                    <img src="/images/profile.jpeg" alt="Santosh Kumar Thakur" />
                  </div>
                  <div className="profile-status">
                    <div className="status-dot"></div>
                    <span>Available for work</span>
                  </div>
                </div>
                <p className="intro-text">{personalInfo.intro}</p>
              </motion.div>

              <motion.div
                className="hero-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <Button onClick={() => scrollToSection("contact")} variant="primary" size="large">
                  <Mail className="btn-icon" />
                  Let's Connect
                  <ArrowRight className="btn-icon" />
                </Button>

                <Button variant="outline" size="large">
                  <Download className="btn-icon" />
                  Download Resume
                </Button>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                className="hero-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                {stats.map((stat, index) => (
                  <StatsCard key={stat.label} stat={stat} index={index} />
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Glow Effects */}
          <div className="hero-glow"></div>
          <div className="hero-line"></div>
        </section>

        {/* Enhanced About Section */}
        <section id="about" className="about-section">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="about-content"
            >
              <motion.div variants={fadeInUp} className="section-header">
                <h2 className="section-title">About Me</h2>
                <p className="section-subtitle">Get to know me better</p>
              </motion.div>

              <div className="about-grid">
                <motion.div variants={fadeInLeft} className="about-text">
                  <p className="about-description">{personalInfo.intro}</p>

                  <div className="about-highlights">
                    <div className="highlight-item">
                      <Clock className="highlight-icon" />
                      <div>
                        <h4>Experience</h4>
                        <p>{personalInfo.experience} in web development</p>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <Code className="highlight-icon" />
                      <div>
                        <h4>Projects</h4>
                        <p>{personalInfo.projects} completed successfully</p>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <Heart className="highlight-icon" />
                      <div>
                        <h4>Clients</h4>
                        <p>{personalInfo.clients} satisfied worldwide</p>
                      </div>
                    </div>
                  </div>

                  <div className="about-social">
                    <h4>Connect with me:</h4>
                    <div className="social-links">
                      {personalInfo.socialLinks.map((social) => (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                          style={{ "--social-color": social.color }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.icon className="social-icon" />
                          <span className="social-tooltip">{social.name}</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInRight} className="about-visual">
                  <div className="about-image-container">
                    <div className="about-image">
                      <img src="/images/profile.jpeg" alt="Santosh Kumar Thakur - Full Stack Developer" />
                    </div>
                    <div className="about-decorations">
                      <div className="decoration decoration-1"></div>
                      <div className="decoration decoration-2"></div>
                      <div className="decoration decoration-3"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Experience Section */}
        <section id="experience" className="cosmic-timeline-section">
          <div className="container">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUp} className="section-header">
                <h2 className="section-title cosmic-title">Experience</h2>
                <p className="section-subtitle">My professional journey as a software engineer</p>
              </motion.div>

              <div className="cosmic-timeline-container">
                <div className="cosmic-timeline-line"></div>
                <div className="cosmic-stars"></div>
                {experiences.map((exp, index) => (
                  <TimelineItem key={exp.id} item={exp} index={index} isExperience={true} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Projects Section */}
        <section id="projects" className="projects-section">
          <div className="container">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUp} className="section-header">
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">Some of my best work that I'm proud to showcase</p>
              </motion.div>

              <div className="projects-grid">
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Skills Section */}
        <section id="skills" className="skills-section">
          <div className="container">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUp} className="section-header">
                <h2 className="section-title">Skills & Technologies</h2>
                <p className="section-subtitle">Technologies and tools I've mastered over the years</p>
              </motion.div>

              <div className="skills-container">
                {skillsData.map((skillGroup, groupIndex) => (
                  <motion.div key={skillGroup.category} variants={fadeInUp} className="skill-category">
                    <Card className="skill-category-card" hover={true}>
                      <div className="skill-category-header">
                        <div className="category-icon">{skillGroup.icon}</div>
                        <div>
                          <h3 className="skill-category-title">{skillGroup.category}</h3>
                          <p className="skill-category-description">{skillGroup.description}</p>
                        </div>
                      </div>
                      <div className="skill-category-content">
                        {skillGroup.skills.map((skill, index) => (
                          <SkillItem key={skill.name} skill={skill} index={index} />
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Education Section */}
        <section id="education" className="cosmic-timeline-section">
          <div className="container">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUp} className="section-header">
                <h2 className="section-title cosmic-title">Education</h2>
                <p className="section-subtitle">My academic journey and continuous learning path</p>
              </motion.div>

              <div className="cosmic-timeline-container">
                <div className="cosmic-timeline-line"></div>
                <div className="cosmic-stars"></div>
                {education.map((edu, index) => (
                  <TimelineItem key={edu.id} item={edu} index={index} isExperience={false} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <section id="contact" className="contact-section">
          <div className="container">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <motion.div variants={fadeInUp} className="section-header">
                <h2 className="section-title">Let's Work Together</h2>
                <p className="section-subtitle">Have a project in mind? Let's discuss how we can bring it to life</p>
              </motion.div>

              <div className="contact-grid">
                <motion.div variants={fadeInLeft}>
                  <Card className="contact-form-card" hover={true}>
                    <div className="card-header">
                      <h3 className="card-title">
                        <Send className="title-icon" />
                        Send me a message
                      </h3>
                      <p className="card-subtitle">I'll get back to you within 24 hours</p>
                    </div>
                    <div className="card-content">
                      <form onSubmit={handleSubmit} className="contact-form">
                        <Input
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="form-input"
                          icon={User}
                        />
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="form-input"
                          icon={Mail}
                        />
                        <Textarea
                          placeholder="Your Message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="form-textarea"
                        />
                        <Button type="submit" variant="primary" size="large" className="btn-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <div className="loading-spinner"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="btn-icon" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInRight} className="contact-info">
                  <div className="contact-text">
                    <h3 className="contact-title">Get in touch</h3>
                    <p className="contact-description">
                      I'm always interested in hearing about new opportunities and interesting projects. Whether you're
                      a company looking to hire, or you're someone who has a project in mind, I'd love to hear from you.
                    </p>
                  </div>

                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <Mail className="icon" />
                      </div>
                      <div className="contact-text">
                        <span className="contact-label">Email</span>
                        <span className="contact-value">{personalInfo.email}</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <MapPin className="icon" />
                      </div>
                      <div className="contact-text">
                        <span className="contact-label">Location</span>
                        <span className="contact-value">{personalInfo.location}</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <Phone className="icon" />
                      </div>
                      <div className="contact-text">
                        <span className="contact-label">Phone</span>
                        <span className="contact-value">{personalInfo.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="contact-social">
                    <h4>Follow me on:</h4>
                    <div className="social-links">
                      {personalInfo.socialLinks.map((social) => (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                          style={{ "--social-color": social.color }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.icon className="social-icon" />
                          <span className="social-name">{social.name}</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-text">
                <p>© 2024 Santosh Kumar Thakur (Software Developer)</p>
              
              </div>
              <div className="footer-links">
                <a href="#home">Privacy Policy</a>
                <a href="#home">Terms of Service</a>
                <a href="#home">Sitemap</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
