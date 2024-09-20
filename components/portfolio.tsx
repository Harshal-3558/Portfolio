"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ChevronRight,
  Code,
  Download,
  Github,
  Laptop,
  Link2,
  Menu,
  MonitorSmartphone,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const skillsControls = useAnimation();
  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.2 });
  const projectsControls = useAnimation();
  const isProjectsInView = useInView(projectsRef, { once: true, amount: 0.2 });
  const contactControls = useAnimation();

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const skills = [
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-plain.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    },
  ];

  const projects = [
    {
      title: "Hunger Halt",
      description:
        "A MERN-based platform connecting surplus food suppliers with NGOs and retreat centers.",
      image:
        "https://res.cloudinary.com/dgz3kwpsj/image/upload/v1726675939/Screenshot_2024-09-18_at_21-41-49_Hunger_Halt_u2soeg.png",
      demoLink: "https://hunger-halt.vercel.app",
      codeLink: "https://github.com/Harshal-3558/Hunger-Halt",
    },
    {
      title: "AeroNest",
      description:
        "Web application that provides a personalized experience for finding accommodations.",
      image:
        "https://res.cloudinary.com/dgz3kwpsj/image/upload/v1726675758/Screenshot_2024-09-18_at_21-38-49_AeroNest_i1drvq.png",
      demoLink: "https://aeronest.vercel.app",
      codeLink: "https://github.com/Harshal-3558/AeroNest",
    },
    {
      title: "TrendVogue",
      description:
        "E-commerce website offering seamless shopping experience with easy customization",
      image:
        "https://res.cloudinary.com/dgz3kwpsj/image/upload/v1726675608/image1_p62aih.png",
      demoLink: "https://trendvogue.vercel.app",
      codeLink: "https://github.com/Harshal-3558/TrendVogue",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "skills") {
              skillsControls.start({ opacity: 1, y: 0 });
            } else if (entry.target.id === "projects") {
              projectsControls.start({ opacity: 1, y: 0 });
            } else if (entry.target.id === "contact") {
              contactControls.start({ opacity: 1, y: 0 });
            }
          }
        });
      },
      { threshold: 0.1 },
    );

    if (skillsRef.current) observer.observe(skillsRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, [skillsControls, projectsControls, contactControls]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const NavItems = () => (
    <>
      {["Home", "Skills", "Projects", "Contact"].map((item) => (
        <li key={item}>
          <Button
            variant="ghost"
            className={`${
              activeSection === item.toLowerCase()
                ? "bg-neutral-700 text-neutral-50"
                : ""
            } w-full justify-start`}
            onClick={() => {
              const sectionId = item.toLowerCase();
              const section = document.getElementById(sectionId);
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
              setActiveSection(sectionId);
              setIsMobileMenuOpen(false);
            }}
          >
            {item}
          </Button>
        </li>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-50">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-neutral-900/80 border-b-2 border-neutral-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold text-black bg-white px-2 py-1.5 md:py-1.5 md:px-2 rounded-full"
            >
              HP
            </Link>
            <div className="hidden md:block">
              <ul className="flex space-x-1">
                <NavItems />
              </ul>
            </div>
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu />
            </Button>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed inset-y-0 right-0 z-20 w-64 bg-neutral-800 shadow-lg"
        >
          <div className="p-4">
            <Button variant="ghost" className="mb-4" onClick={toggleMobileMenu}>
              <X />
            </Button>
            <ul className="space-y-2">
              <NavItems />
            </ul>
          </div>
        </motion.div>
      )}

      <main className="container mx-auto px-4 py-6">
        <motion.section
          id="home"
          className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center text-center py-20"
          style={{ opacity, scale }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Harshal Patil
              </motion.h1>
              <motion.h2
                className="text-3xl md:text-4xl font-semibold mb-4 text-neutral-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Web Developer
              </motion.h2>
              <motion.p
                className="text-xl mb-8 max-w-2xl mx-auto text-neutral-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Crafting exceptional digital experiences with cutting-edge web
                technologies
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button
                  className="cursor-pointer bg-neutral-800 hover:bg-neutral-700"
                  asChild
                  size="lg"
                  onClick={() => {
                    const section = document.getElementById("projects");
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <div>
                    <span>View my work</span>
                    <ChevronRight />
                  </div>
                </Button>

                <Button asChild size="lg" variant="outline">
                  <Link
                    target="_blank"
                    href="https://drive.google.com/file/d/1rfiIMfIemDJiWI25OiBxX15_WdM_m--S/view?usp=sharing"
                  >
                    <span>Download CV</span>{" "}
                    <Download className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center justify-center bg-neutral-800 rounded-lg p-6">
                <Code size={64} className="text-neutral-300" />
              </div>
              <div className="flex items-center justify-center bg-neutral-800 rounded-lg p-6">
                <Laptop size={64} className="text-neutral-300" />
              </div>
              <div className="flex items-center justify-center bg-neutral-800 rounded-lg p-6">
                <MonitorSmartphone size={64} className="text-neutral-300" />
              </div>
              <div className="flex items-center justify-center bg-neutral-800 rounded-lg p-6">
                <Github size={64} className="text-neutral-300" />
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="py-20"
          ref={skillsRef}
          initial="hidden"
          animate={isSkillsInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <h2 className="text-3xl font-bold mb-8 text-neutral-100">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={skillVariants}
                custom={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="overflow-hidden bg-neutral-800 border-neutral-700">
                  <CardContent className="flex flex-col items-center justify-center h-40 p-6">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={64}
                      height={64}
                      className="mb-4"
                    />
                    <p className="text-lg font-medium text-center text-neutral-300">
                      {skill.name}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="py-20"
          ref={projectsRef}
          initial="hidden"
          animate={isProjectsInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <h2 className="text-3xl font-bold mb-8 text-neutral-100">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={projectVariants}
                custom={index}
              >
                <Card className="overflow-hidden bg-neutral-800 border-neutral-700">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                  <CardHeader>
                    <CardTitle className="text-neutral-100">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-neutral-400">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button asChild variant="default" size="sm">
                      <Link
                        href={project.demoLink}
                        className="flex items-center space-x-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Link2 /> <span>Demo</span>{" "}
                      </Link>
                    </Button>
                    <Button asChild variant="secondary" size="sm">
                      <Link
                        href={project.codeLink}
                        className="flex items-center space-x-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Code /> <span>Code</span>{" "}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="py-20"
          ref={contactRef}
          initial={{ opacity: 0, y: 50 }}
          animate={contactControls}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-neutral-100">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-2xl text-neutral-100">
                  Contact Me
                </CardTitle>
                <CardDescription className="text-neutral-400">
                  I&apos;d love to hear from you! Send me a message and
                  I&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-300"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="mt-1 bg-neutral-700 text-neutral-100 border-neutral-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-300"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="mt-1 bg-neutral-700 text-neutral-100 border-neutral-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-neutral-300"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      rows={4}
                      className="mt-1 bg-neutral-700 text-neutral-100 border-neutral-600"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-neutral-800 hover:bg-neutral-700"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-neutral-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-neutral-100">
                    Connect with Me
                  </CardTitle>
                  <CardDescription className="text-neutral-400">
                    Find me on these platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-4">
                    <Link
                      href="https://github.com/Harshal-3558"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-neutral-100 transition-colors"
                    >
                      <FaGithub size={32} />
                      <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/harshal-patil-b901b6249"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-neutral-100 transition-colors"
                    >
                      <FaLinkedinIn size={32} />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                      href="https://x.com/Harshal_790"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-neutral-100 transition-colors"
                    >
                      <FaXTwitter size={32} />
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link
                      href="https://www.instagram.com/patilharshal3558"
                      className="text-neutral-400 hover:text-neutral-100 transition-colors"
                    >
                      <FaInstagram size={32} />
                      <span className="sr-only">Instagram</span>
                    </Link>
                    <Link
                      href="mailto:patilharshal3558@gmail.com"
                      className="text-neutral-400 hover:text-neutral-100 transition-colors"
                    >
                      <FaEnvelope size={32} />
                      <span className="sr-only">Email</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-neutral-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-neutral-100">
                    Location
                  </CardTitle>
                  <CardDescription className="text-neutral-400">
                    Based in Panvel, Maharashtra
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7545.27520867757!2d73.10898048682422!3d18.991605623087377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1726714387821!5m2!1sen!2sin"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      loading="lazy"
                      className="rounded-lg"
                      title="Google Maps Location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="bg-neutral-800 py-6">
        <div className="container mx-auto px-4 text-center text-neutral-400">
          <p>
            &copy; {new Date().getFullYear()} Harshal Patil. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
