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
import { motion, useScroll, useTransform } from "framer-motion";
import {
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
import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function PortfolioWithProjectImages() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const NavItems = () => (
    <>
      {["Home", "Skills", "Projects", "Contact"].map((item) => (
        <li key={item}>
          <Button
            variant="ghost"
            className={`${activeSection === item.toLowerCase() ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900" : ""} w-full justify-start`}
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
    <div className="min-h-screen bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-2 dark:bg-neutral-950/80">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-neutral-900 dark:text-neutral-50"
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
          className="fixed inset-y-0 right-0 z-20 w-64 bg-white shadow-lg dark:bg-neutral-950"
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

      <main className="container mx-auto px-4 py-8">
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
                className="text-3xl md:text-4xl font-semibold mb-4 text-neutral-900 dark:text-neutral-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Web Developer
              </motion.h2>
              <motion.p
                className="text-xl mb-8 max-w-2xl mx-auto"
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
                  className="cursor-pointer"
                  asChild
                  size="lg"
                  onClick={() => {
                    const section = document.getElementById("projects");
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <span>View my work</span>
                </Button>

                <Button asChild size="lg" variant="outline">
                  <Link
                    target="_blank"
                    href="https://drive.google.com/file/d/1rfiIMfIemDJiWI25OiBxX15_WdM_m--S/view?usp=sharing"
                    download
                  >
                    <Download className="mr-2 h-4 w-4" /> Download CV
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
              <div className="flex items-center justify-center bg-neutral-900/10 rounded-lg p-6 dark:bg-neutral-50/10">
                <Code
                  size={64}
                  className="text-neutral-900 dark:text-neutral-50"
                />
              </div>
              <div className="flex items-center justify-center bg-neutral-900/10 rounded-lg p-6 dark:bg-neutral-50/10">
                <Laptop
                  size={64}
                  className="text-neutral-900 dark:text-neutral-50"
                />
              </div>
              <div className="flex items-center justify-center bg-neutral-900/10 rounded-lg p-6 dark:bg-neutral-50/10">
                <MonitorSmartphone
                  size={64}
                  className="text-neutral-900 dark:text-neutral-50"
                />
              </div>
              <div className="flex items-center justify-center bg-neutral-900/10 rounded-lg p-6 dark:bg-neutral-50/10">
                <Github
                  size={64}
                  className="text-neutral-900 dark:text-neutral-50"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        <section id="skills" className="py-20">
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="flex flex-col items-center justify-center h-40 p-6">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={64}
                      height={64}
                      className="mb-4"
                    />
                    <p className="text-lg font-medium text-center">
                      {skill.name}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="py-20">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Card className="overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{project.description}</CardDescription>
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
                    <Button asChild variant="primary" size="sm">
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
        </section>

        <section id="contact" className="py-20">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Me</CardTitle>
                <CardDescription>
                  I'd love to hear from you! Send me a message and I'll get back
                  to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" className="mt-1" />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
                <CardHeader>
                  <CardTitle className="text-2xl">Connect with Me</CardTitle>
                  <CardDescription>Find me on these platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-4">
                    <Link
                      href="https://github.com/Harshal-3558"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <FaGithub size={32} />
                      <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/harshal-patil-b901b6249"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <FaLinkedinIn size={32} />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                      href="https://x.com/Harshal_790"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <FaXTwitter size={32} />
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link
                      href="https://www.instagram.com/patilharshal3558"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <FaInstagram size={32} />
                      <span className="sr-only">Email</span>
                    </Link>
                    <Link
                      href="mailto:patilharshal3558@gmail.com"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <FaEnvelope size={32} />
                      <span className="sr-only">Email</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                <CardHeader>
                  <CardTitle className="text-2xl">Location</CardTitle>
                  <CardDescription>
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
                      className="rounded-l-lg"
                      title="Google Maps Location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-100 py-6 dark:bg-neutral-800">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Harshal Patil. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
