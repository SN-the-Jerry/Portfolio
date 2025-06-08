'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, Mail, Phone, MapPin, ExternalLink, Code, Database, Globe, Smartphone, ArrowRight, Sparkles, Menu, X, ChevronUp, Download } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

interface Skills {
  programming: string[];
  software: string[];
  design: string[];
  languages: string[];
}

interface VisibilityState {
  [key: string]: boolean;
}

export default function Portfolio(): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    sections.forEach((section: HTMLElement) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skills: Skills = {
    programming: ['HTML', 'CSS', 'Bootstrap', 'C#.net (Unity)', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Git'],
    software: ['Google Tag Manager', 'GAM', 'Meta Business Suite', 'Microsoft Clarity', 'Seo Tools'],
    design: ['Figma', 'Blender', 'Canva', 'Adobe', 'CapStudio Paint'],
    languages: ['English', 'Thai (Basic)']
  };

  const experiences: Experience[] = [
    {
      title: "Education Website Internship",
      company: "Admin Uniclass.co.th",
      period: "Recent",
      description: "Full stack end-to-end development of educational learning platform using JavaScript, React, and Next.js framework, delivering enhanced user experience for online education",
      technologies: ["JavaScript", "React", "Next.js", "Full Stack Development"]
    },
    {
      title: "Multi-platform Analytics Developer",
      company: "Integrated Project",
      period: "Recent",
      description: "Integrated multi-platform analytics (GTM, GA4, Meta Business Suite, Microsoft Clarity) and SEO optimization tools to track user behavior and improve conversion rates for start-up company",
      technologies: ["GTM", "GA4", "Meta Business Suite", "Microsoft Clarity", "SEO"]
    },
    {
      title: "AI Chatbot Developer",
      company: "AI Chat University Project",
      period: "Academic Project",
      description: "Built end-to-end AI chatbot solution integrating frontend interface (HTML/CSS/JS) with backend API using Python Flask and OpenAI GPT API",
      technologies: ["Python", "Flask", "OpenAI GPT", "HTML/CSS/JS"]
    },
    {
      title: "Game Developer",
      company: "Chaotic World (Global Game Jam)",
      period: "Game Jam",
      description: "Collaborated with cross-functional team to develop 'Chaotic World,' a 2D action game using C# and Unity engine during 48-hour Global Game Jam",
      technologies: ["C#", "Unity", "Game Development", "2D Graphics"]
    },
    {
      title: "Full Stack Developer",
      company: "RO Peer Rating System",
      period: "Co-op Internship",
      description: "Developed comprehensive Peer Rating System improving employee feedback mechanisms and workplace satisfaction metrics",
      technologies: ["Full Stack", "Peer Rating System", "Employee Feedback"]
    }
  ];

  const navItems = [
    { name: 'Home', href: '#hero', icon: '🏠' },
    { name: 'About', href: '#about', icon: '👨‍💻' },
    { name: 'Experience', href: '#experience', icon: '💼' },
    { name: 'Education', href: '#education', icon: '🎓' },
    { name: 'Skills', href: '#skills', icon: '⚡' },
    { name: 'Contact', href: '#contact', icon: '📞' }
  ];

  const getSkillIcon = (category: keyof Skills): JSX.Element => {
    switch (category) {
      case 'programming':
        return <Code className="w-6 h-6 text-white" />;
      case 'software':
        return <Database className="w-6 h-6 text-white" />;
      case 'design':
        return <Sparkles className="w-6 h-6 text-white" />;
      case 'languages':
        return <Globe className="w-6 h-6 text-white" />;
      default:
        return <Code className="w-6 h-6 text-white" />;
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-slate-100 min-h-screen overflow-x-hidden relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated Particles - Only render on client */}
        {isClient && Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
        
        {/* Dynamic Floating Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-blue-400/20 rounded-full blur-lg opacity-70 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-teal-400/20 rounded-full blur-2xl opacity-50 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-lg opacity-60 animate-ping"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Enhanced Cursor Follower - Only render on client */}
      {isClient && (
        <div 
          className="fixed w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full pointer-events-none z-50 opacity-30 transition-all duration-500 ease-out mix-blend-screen"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
          }}
        ></div>
      )}

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-xl z-40 border-b border-slate-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-light tracking-wide group cursor-pointer" onClick={() => scrollToSection('#hero')}>
              <span className="font-extralight text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Myat</span>
              <span className="font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-2 group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">Pan</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative py-2 px-4 font-light tracking-wide transition-all duration-300 group ${
                    activeSection === item.href.replace('#', '') 
                      ? 'text-blue-400' 
                      : 'text-slate-300 hover:text-blue-400'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transform transition-transform duration-300 ${
                    activeSection === item.href.replace('#', '') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}
              
              {/* Download Resume Button */}
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-300 hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-slate-900/98 backdrop-blur-xl border-t border-slate-700/50`}>
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`w-full text-left py-3 px-4 rounded-xl transition-all duration-300 flex items-center space-x-3 ${
                  activeSection === item.href.replace('#', '')
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-400/30'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-blue-400'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Animations */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="text-center z-10 px-6 max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 delay-300 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-7xl font-extralight mb-6 tracking-tight">
              <span className="text-slate-100 inline-block animate-slideInLeft">Myat Pan</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent font-light inline-block animate-slideInRight">
                Pwint Soe Nyunt
              </span>
            </h1>
            
            <div className="space-y-4 mb-12">
              <p className="text-xl md:text-2xl font-light text-slate-200 tracking-wide animate-fadeInUp">
                Full Stack Developer & Technology Enthusiast
              </p>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light animate-fadeInUp delay-200">
                Crafting digital experiences with modern technologies. 
                Passionate about creating innovative solutions that bridge design and functionality.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp delay-300">
              <button 
                onClick={() => scrollToSection('#contact')}
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-medium tracking-wide hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Let's Connect</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button 
                onClick={() => scrollToSection('#experience')}
                className="bg-slate-800/80 backdrop-blur-sm text-slate-200 px-8 py-4 rounded-2xl font-medium tracking-wide hover:bg-slate-700 hover:shadow-lg transition-all duration-300 border border-slate-600 hover:border-blue-400"
              >
                View My Work
              </button>
            </div>
          </div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section with Staggered Animations */}
      <section id="about" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extralight mb-6 tracking-tight">
                <span className="text-slate-400">About</span>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-3">Me</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full animate-pulse"></div>
              <p className="text-slate-300 mt-4 font-light">Passionate about creating digital experiences</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className={`bg-slate-800/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-500 ${isVisible.about ? 'animate-slideInLeft' : 'opacity-0'}`}>
                  <h3 className="text-xl font-medium text-slate-100 mb-4">Academic Excellence</h3>
                  <p className="text-slate-300 leading-relaxed font-light">
                    Currently pursuing my Bachelor of Science in Information and Communication Technology, 
                    combining theoretical knowledge with practical application in real-world projects.
                  </p>
                </div>
                
                <div className={`bg-slate-800/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-500 ${isVisible.about ? 'animate-slideInLeft' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
                  <h3 className="text-xl font-medium text-slate-100 mb-4">Technical Expertise</h3>
                  <p className="text-slate-300 leading-relaxed font-light">
                    Specializing in modern web development with React, Next.js, and TypeScript. 
                    Experience spans educational platforms, AI integrations, analytics systems, and game development.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {['React', 'Next.js', 'TypeScript', 'Python', 'Unity', 'AI/ML'].map((tech, index) => (
                    <span
                      key={tech}
                      className={`bg-gradient-to-r from-blue-900/50 to-cyan-900/50 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-400/30 hover:shadow-md hover:scale-105 transition-all duration-300 ${isVisible.about ? 'animate-fadeInUp' : 'opacity-0'}`}
                      style={{ animationDelay: `${400 + index * 100}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className={`bg-gradient-to-br from-slate-800/80 via-slate-700/80 to-blue-800/80 p-12 rounded-3xl border border-slate-600/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 animate-float ${isVisible.about ? 'animate-slideInRight' : 'opacity-0'}`}>
                  <div className="text-center">
                    <div className="w-56 h-56 mx-auto mb-8 transform rotate-2 hover:rotate-0 transition-all duration-700 ease-out">
                      <div className="relative w-full h-full">
                        <img
                          src="/NS.jpg"
                          alt="Myat Pan Pwint Soe Nyunt"
                          className="w-full h-full object-cover rounded-3xl border-4 border-blue-500 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105"
                          onError={(e) => {
                            const img = e.currentTarget;
                            const fallback = img.nextElementSibling as HTMLElement;
                            if (fallback) {
                              img.style.display = "none";
                              fallback.style.display = "flex";
                            }
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl hidden items-center justify-center">
                          <Code className="w-12 h-12 text-white" />
                        </div>
                        {/* Subtle overlay for better contrast */}
                        <div className="absolute inset-0 rounded-3xl ring-2 ring-blue-400/20 ring-offset-4 ring-offset-transparent"></div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-light text-slate-100 mb-2">Passionate Developer</h3>
                    <p className="text-slate-300 font-light">Turning ideas into elegant solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section with Enhanced Cards */}
      <section id="experience" className="py-16 px-6 bg-gradient-to-br from-slate-800/50 to-blue-900/50">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extralight mb-6 tracking-tight">
                <span className="text-slate-400">My</span>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-3">Experience</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full animate-pulse"></div>
              <p className="text-slate-300 mt-4 font-light">Projects that shaped my journey</p>
            </div>
            
            <div className="space-y-6">
              {experiences.map((exp: Experience, index: number) => (
                <div
                  key={index}
                  className={`group bg-slate-800/60 backdrop-blur-sm p-6 rounded-3xl border border-slate-700/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 ${
                    isVisible.experience ? 'animate-slideInLeft' : 'opacity-0'
                  }`}
                  style={{ 
                    animationDelay: `${index * 200}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-slate-100 mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-blue-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-slate-400 font-light mt-2 lg:mt-0 bg-slate-700/50 px-4 py-2 rounded-full text-sm group-hover:bg-blue-900/50 group-hover:text-blue-300 transition-all duration-300">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-slate-300 mb-4 leading-relaxed font-light">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 text-slate-300 px-3 py-1 rounded-full text-sm font-medium border border-slate-600/50 hover:border-blue-400/50 hover:bg-blue-900/30 hover:text-blue-300 hover:scale-105 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.education ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extralight mb-6 tracking-tight">
                <span className="text-slate-400">My</span>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-3">Education</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full animate-pulse"></div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className={`group bg-slate-800/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${isVisible.education ? 'animate-zoomIn' : 'opacity-0'}`}>
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform duration-500">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium text-slate-100 mb-2 group-hover:text-blue-400 transition-colors duration-300">Bachelor of Science</h3>
                    <p className="text-xl text-blue-400 font-medium mb-4">Information and Communication Technology</p>
                    <p className="text-slate-300 font-light mb-2">Rangsit International College</p>
                    <p className="text-slate-400 mb-4">June 2022 - Present</p>
                    <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 px-4 py-2 rounded-full inline-block group-hover:shadow-md transition-all duration-300">
                      <span className="text-blue-300 font-medium text-sm">Major: Information & Communication Technology</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Grid Animation */}
      <section id="skills" className="py-16 px-6 bg-gradient-to-br from-blue-900/30 to-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extralight mb-6 tracking-tight">
                <span className="text-slate-400">My</span>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-3">Skills</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full animate-pulse"></div>
              <p className="text-slate-300 mt-4 font-light">Technologies I work with daily</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skills).map(([category, skillList], index) => (
                <div
                  key={category}
                  className={`group bg-slate-800/60 backdrop-blur-sm p-6 rounded-3xl border border-slate-700/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                    isVisible.skills ? 'animate-fadeInUp' : 'opacity-0'
                  }`}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      {getSkillIcon(category as keyof Skills)}
                    </div>
                    <h3 className="text-xl font-medium capitalize text-slate-100 group-hover:text-blue-400 transition-colors duration-300">
                      {category}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {skillList.map((skill: string, skillIndex: number) => (
                      <div
                        key={skillIndex}
                        className="bg-gradient-to-r from-slate-700/50 to-blue-900/50 px-4 py-3 rounded-xl text-slate-300 font-light hover:bg-blue-800/30 hover:text-blue-300 hover:scale-105 transition-all duration-300 border border-slate-600/50 hover:border-blue-400/50 cursor-default"
                        style={{ 
                          animationDelay: `${(index * 150) + (skillIndex * 50)}ms`
                        }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extralight mb-6 tracking-tight">
                <span className="text-slate-400">Get in</span>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-3">Touch</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full animate-pulse"></div>
              <p className="text-slate-300 mt-4 font-light">Let's create something amazing together</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className={`bg-slate-800/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 ${isVisible.contact ? 'animate-slideInLeft' : 'opacity-0'}`}>
                  <h3 className="text-2xl font-medium text-slate-100 mb-4">Let's Create Something Amazing</h3>
                  <p className="text-slate-300 leading-relaxed font-light text-lg">
                    I'm always excited to discuss new opportunities, collaborate on innovative projects, 
                    or connect with fellow developers and creative minds.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {[
                    { href: 'tel:+66-65-249-1015', icon: Phone, label: 'Phone', value: '+66-65-249-1015' },
                    { href: 'mailto:pamelanyunt@gmail.com', icon: Mail, label: 'Email', value: 'pamelanyunt@gmail.com' },
                    { href: 'https://github.com/SN-the-Jerry', icon: Github, label: 'GitHub', value: 'SN-the-Jerry' }
                  ].map((contact, index) => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target={contact.label === 'GitHub' ? '_blank' : undefined}
                      rel={contact.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                      className={`group flex items-center space-x-4 text-slate-300 hover:text-blue-400 transition-all duration-300 ${isVisible.contact ? 'animate-slideInLeft' : 'opacity-0'}`}
                      style={{ animationDelay: `${200 + index * 100}ms` }}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-800/50 to-cyan-800/50 rounded-2xl flex items-center justify-center group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-300">
                        <contact.icon className="w-6 h-6 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="font-medium">{contact.label}</p>
                        <p className="text-slate-400 font-light">{contact.value}</p>
                      </div>
                    </a>
                  ))}
                  
                  <div className={`flex items-center space-x-4 text-slate-300 ${isVisible.contact ? 'animate-slideInLeft' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>
                    <div className="w-14 h-14 bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-slate-400 font-light">Pathum Thani, Thailand</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className={`bg-gradient-to-br from-slate-800/80 via-slate-700/80 to-blue-800/80 p-12 rounded-3xl border border-slate-600/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 ${isVisible.contact ? 'animate-slideInRight' : 'opacity-0'}`}>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl mx-auto mb-6 flex items-center justify-center transform hover:rotate-6 transition-transform duration-500">
                      <Mail className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-light text-slate-100 mb-4">Ready to Connect</h3>
                    <p className="text-slate-300 font-light mb-6">Let's discuss your next project</p>
                    <button 
                      onClick={() => window.location.href = 'mailto:pamelanyunt@gmail.com'}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400 font-light">
            © 2025 Myat Pan Pwint Soe Nyunt. Crafted with passion and attention to detail.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 z-50 animate-fadeInUp"
        >
          <ChevronUp className="w-6 h-6 mx-auto" />
        </button>
      )}

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-zoomIn {
          animation: zoomIn 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>
    </div>
  );
}