import { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Calendar, 
  Code, 
  Heart, 
  Coffee,
  Download,
  ExternalLink,
  Star,
  Award,
  Users,
  Zap
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

function App() {
  const [greetCount, setGreetCount] = useState(0);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const skills: Skill[] = [
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'JavaScript', level: 90, category: 'frontend' },
    { name: 'Node.js', level: 80, category: 'backend' },
    { name: 'Python', level: 75, category: 'backend' },
    { name: 'SQL', level: 70, category: 'backend' },
    { name: 'Git', level: 85, category: 'tools' },
    { name: 'Docker', level: 60, category: 'tools' },
    { name: 'AWS', level: 65, category: 'tools' },
  ];

  const projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com/tyrone/ecommerce'
    },
    {
      title: 'Task Management App',
      description: 'Real-time collaborative task management with WebSocket support',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      link: 'https://taskapp.tyrone.dev'
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio built with modern web technologies',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/tyrone/portfolio'
    }
  ];

  const handleHiBob = () => {
    if (isOnCooldown) return;
    
    const newCount = greetCount + 1;
    setGreetCount(newCount);
    setShowNotification(true);
    setIsOnCooldown(true);
    setTimeLeft(5);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    
    const countdown = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsOnCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}
      style={{
        backgroundImage: isDarkMode ? 'none' : 'url(/background.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        cursor: 'url(/cursor.png), auto'
      }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Tyrone</h1>
              <div className="hidden md:flex space-x-6">
                {['about', 'skills', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === section
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed top-20 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl border-2 border-green-400 z-50 animate-bounce">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <div>
              <p className="font-bold">You said Hi to Bob!</p>
              <p className="text-sm">You've greeted Bob {greetCount} time{greetCount !== 1 ? 's' : ''}</p>
              <p className="text-xs opacity-90">You can greet him again in 5 seconds</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Section */}
        <section id="about" className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 mb-8 border border-white/20 dark:border-gray-700/20">
              <div className="flex flex-col items-center space-y-8">
                <div className="relative">
                  <img 
                    src="/pfp.png" 
                    alt="Tyrone's Profile Picture" 
                    className="w-40 h-40 rounded-full shadow-2xl border-4 border-white dark:border-gray-700 hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Tyrone
                  </h1>
                  <p className="text-2xl text-gray-600 dark:text-gray-300 mb-6">
                    Full-Stack Developer & Creative Problem Solver
                  </p>
                  <div className="flex items-center justify-center space-x-6 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>5+ years experience</span>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                  Passionate about creating innovative web solutions and turning complex problems into elegant, 
                  user-friendly applications. I love collaborating with teams and learning new technologies.
                </p>
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                    <Download className="w-5 h-5" />
                    <span>Download CV</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>Contact Me</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bob Section */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src="/bob.png" 
                  alt="Bob" 
                  className="w-16 h-16 rounded-lg shadow-md"
                />
                <div className="flex items-center space-x-3">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    This is BOB, Say hi to bob
                  </p>
                  <button 
                    onClick={handleHiBob}
                    disabled={isOnCooldown}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md ${
                      isOnCooldown 
                        ? 'bg-gray-400 cursor-not-allowed text-gray-200' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg'
                    }`}
                    style={{ cursor: 'url(/cursor.png), pointer' }}
                  >
                    {isOnCooldown ? `Wait ${timeLeft}s` : 'Hi!'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Skills & Technologies
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Technologies I work with and love
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['frontend', 'backend', 'tools'].map((category) => (
                <div key={category} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 capitalize flex items-center">
                    {category === 'frontend' && <Code className="w-6 h-6 mr-2" />}
                    {category === 'backend' && <Zap className="w-6 h-6 mr-2" />}
                    {category === 'tools' && <Award className="w-6 h-6 mr-2" />}
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {skills
                      .filter(skill => skill.category === category)
                      .map(skill => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 bg-white/50 dark:bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Some of my recent work
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    {project.github && (
                      <a 
                        href={project.github}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.link && (
                      <a 
                        href={project.link}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              I'm always open to new opportunities and collaborations
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
                <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">tyrone@example.com</p>
              </div>
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
                <Linkedin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">LinkedIn</h3>
                <p className="text-gray-600 dark:text-gray-300">linkedin.com/in/tyrone</p>
              </div>
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
                <Github className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">GitHub</h3>
                <p className="text-gray-600 dark:text-gray-300">github.com/tyrone</p>
              </div>
            </div>
            
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center justify-center space-x-4 text-gray-600 dark:text-gray-300">
                <Coffee className="w-6 h-6" />
                <span>Made with</span>
                <Heart className="w-6 h-6 text-red-500 animate-pulse" />
                <span>and lots of coffee</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Greeting Counter */}
      {greetCount > 0 && (
        <div className="fixed bottom-8 left-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-white/20 dark:border-gray-700/20">
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Total greetings to Bob: <span className="font-bold text-blue-600 dark:text-blue-400">{greetCount}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;