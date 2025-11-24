"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import {
  Github,
  Linkedin,
  Code2,
  Palette,
  Rocket,
  Sparkles,
  ArrowUpRight,
  MoveRight,
} from "lucide-react";
import { EmailForm } from "~/components/EmailForm";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen relative overflow-hidden text-[#0f172a]">
      <Backdrop />

      <div className="relative z-10 max-w-6xl lg:max-w-7xl mx-auto px-6 pb-20">
        <Header />
        <HeroSection />
        <SignatureStrip />
        <HarvestSection />
        <IngredientsSection />
        <GardenersSection />

        <footer className="w-full py-10 text-center text-sm text-ink/70">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-ink/10 squircle px-6 py-4 glass">
            <p>© CraftyAam {currentYear} • Made with 🥭 & code.</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-ink/50 mr-2">Connect with us:</span>
              <SocialIcon
                href="https://github.com/craftyaam"
                label="CraftyAam GitHub"
              >
                <Github className="w-5 h-5" />
              </SocialIcon>
              <SocialIcon
                href="https://www.linkedin.com/company/craftyaam"
                label="CraftyAam LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </SocialIcon>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Backdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <motion.div
        className="absolute -left-32 top-0 w-140 h-140 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #f9c74f, transparent 50%)",
        }}
        animate={{ scale: [0.9, 1.1, 0.95], x: [0, 30, -20], y: [0, -10, 10] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-10 w-md h-112 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 70% 40%, #43aa8b, transparent 55%)",
        }}
        animate={{ scale: [1, 1.15, 1], x: [0, -30, 10], y: [0, 20, -10] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-160 h-160 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #f8961e, transparent 55%)",
        }}
        animate={{ scale: [1, 0.95, 1.05], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
      />
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between py-6 sticky top-7 bg-white/60 backdrop-blur-xl z-30 soft-corners px-6 border border-ink/10">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 flex items-center justify-center">
          <Image
            src="/Logo_Icon.svg"
            alt="CraftyAam Logo"
            width={60}
            height={60}
          />
        </div>
        <div>
          <p className="font-heading font-bold text-2xl text-ink">CraftyAam</p>
          <p className="text-xs text-ink/60">
            Crafting delightful web experiences
          </p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-3">
        <a
          href="#contact"
          className="px-4 py-2 bg-ink text-white rounded-full font-semibold flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
        >
          Book a tasting <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    springConfig
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="pt-20 pb-20 relative z-10">
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 badge-pill text-ink/70">
            <span className="w-2 h-2 rounded-full bg-mango-orange animate-pulse" />
            New flavour drop: mango-coded experiences
          </div>
          <h1 className="text-hero font-heading font-bold leading-tight text-ink">
            Irresistible digital experiences with{" "}
            <span className="bg-linear-to-r from-[#f9c74f] via-mango-orange to-[#43aa8b] text-transparent bg-clip-text">
              bite, brightness, and bravado.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-ink/75 max-w-2xl">
            We are CraftyAam—design-obsessed engineers turning products into
            playful, premium, and wildly memorable web destinations. Tastefully
            bold. Technically sharp.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Design systems with flavour",
              "Motion-driven storytelling",
              "Launch-ready builds",
            ].map((pill) => (
              <span key={pill} className="badge-pill text-sm text-ink/80">
                {pill}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#harvest"
              className="px-6 py-3 rounded-full bg-ink text-white font-semibold flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
            >
              Taste our work <MoveRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-white text-ink font-semibold border border-ink/15 hover:border-ink/30 hover:-translate-y-0.5 transition-all duration-200 glass"
            >
              Build together
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Avg page load", value: "0.9s" },
              { label: "Launches shipped", value: "48" },
              { label: "Micro-interactions", value: "Countless" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 glass soft-corners border border-ink/10"
              >
                <p className="text-sm text-ink/60">{stat.label}</p>
                <p className="text-2xl font-heading font-bold text-ink">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative h-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="relative aspect-4/5 w-full rounded-[30px] glass glow overflow-hidden cursor-pointer noise"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/80 via-white/40 to-[#f9c74f]/20" />
            <div className="absolute inset-0 grid-overlay" />
            <motion.div
              className="absolute inset-10 rounded-[24px] orb"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <Image
                src="/Logo_Icon.svg"
                alt="CraftyAam Mango"
                width={140}
                height={140}
                priority
              />
              <p className="mt-6 text-lg text-ink/75">
                Interfaces engineered like a signature dessert—layered textures,
                balanced sweetness, and a crisp finish.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                {["Perf-first builds", "Playful visuals", "Inclusive UX"].map(
                  (item) => (
                    <span
                      key={item}
                      className="badge-pill text-sm text-ink/80 bg-white/80"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
            <OrbitingBadge delay={0} text="Design sprints" />
            <OrbitingBadge delay={4} text="Creative dev" />
            <OrbitingBadge delay={8} text="Launch strategy" />
          </motion.div>
          <motion.div
            className="absolute -top-6 -left-6 hidden md:flex items-center gap-3 glass border border-ink/10 soft-corners px-4 py-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div>
              <p className="text-xs text-ink/60">Studio mood</p>
              <p className="font-heading font-semibold">Fizzy, bold, alive</p>
            </div>
          </motion.div>
          <motion.div
            className="absolute -bottom-6 -right-6 hidden md:flex items-center gap-3 glass border border-ink/10 soft-corners px-4 py-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Rocket className="w-5 h-5 text-[#43aa8b]" />
            <div>
              <p className="text-xs text-ink/60">Launch ready</p>
              <p className="font-heading font-semibold">
                Dev & deploy included
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function OrbitingBadge({ delay, text }: { delay: number; text: string }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, ease: "linear", duration: 28, delay }}
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 badge-pill bg-white/90 text-ink/80 shadow-lg">
        {text}
      </div>
    </motion.div>
  );
}

function SignatureStrip() {
  const items = [
    "Interactions that fizz",
    "Component systems",
    "3D-ish illusion",
    "Loading that delights",
    "Snappy perf",
    "Founder-friendly handoff",
  ];

  return (
    <div className="relative overflow-hidden soft-corners border border-ink/10 my-6 glass">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent" />
      <motion.div
        className="flex gap-4 py-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
      >
        {[...items, ...items].map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="badge-pill text-sm text-ink/80 flex items-center gap-2 bg-white/80 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-[#43aa8b]" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function HarvestSection() {
  const projects = [
    {
      title: "Project One",
      description:
        "A fresh take on e-commerce. Built with modern tech to deliver lightning-fast performance and delightful UX.",
      tech: ["React", "Next.js", "Tailwind"],
      color: "#f9c74f",
    },
    {
      title: "Project Two",
      description:
        "Hand-picked design system that scales. From seed to harvest, we cultivated a component library that grows with you.",
      tech: ["TypeScript", "Storybook", "Figma"],
      color: "#43aa8b",
    },
    {
      title: "Project Three",
      description:
        "Ripe with features. A full-stack application that's bug-free, fast, and ready to serve.",
      tech: ["Node.js", "PostgreSQL", "Docker"],
      color: "#90be6d",
    },
  ];

  return (
    <section id="harvest" className="py-24 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-section font-heading font-bold text-ink mb-4">
          The <span className="text-[#f9c74f]">Harvest</span>
        </h2>
        <p className="text-lg text-ink/70 max-w-2xl mx-auto">
          Studio stories with the right amount of sweetness and bite.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="relative overflow-hidden soft-corners glass border border-ink/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ y: -10, scale: 1.01 }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 20% 20%, ${project.color}, transparent 45%)`,
              }}
            />
            <div className="relative p-8 space-y-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: project.color }}
              >
                <span className="text-2xl">🥭</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-ink">
                {project.title}
              </h3>
              <p className="text-ink/70 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1 bg-white/80 text-ink rounded-full border border-ink/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 text-sm text-ink/60">
                <span>Case study →</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function IngredientsSection() {
  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Planting",
      subtitle: "(Strategy & UX)",
      description:
        "We start with the soil. Research, wireframing, and planning to ensure your project has strong roots.",
      color: "#90be6d",
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Cultivating",
      subtitle: "(UI Design)",
      description:
        "Nurturing your brand identity. Visual design, prototyping, and crafting interfaces that feel natural.",
      color: "#f9c74f",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Harvesting",
      subtitle: "(Development)",
      description:
        "Picking the ripest tech. Frontend, backend, and deployment that's fresh, fast, and bug-free.",
      color: "#43aa8b",
    },
  ];

  return (
    <section className="py-24 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-section font-heading font-bold text-ink mb-4">
          Our <span className="text-[#43aa8b]">Ingredients</span>
        </h2>
        <p className="text-lg text-ink/70 max-w-2xl mx-auto">
          From plotting the orchard to shipping ripe product drops.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="glass soft-corners border border-ink/10 p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.8 }}
            whileHover={{ y: -8, rotate: 0.5 }}
          >
            <div
              className="absolute inset-0 opacity-15"
              style={{
                background: `radial-gradient(circle at 30% 20%, ${service.color}, transparent 45%)`,
              }}
            />
            <motion.div
              className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center text-white shadow-xl"
              style={{ backgroundColor: service.color }}
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {service.icon}
            </motion.div>
            <h3 className="text-2xl font-heading font-bold text-ink mb-1">
              {service.title}
            </h3>
            <p className="text-sm font-mono text-ink/60 mb-4">
              {service.subtitle}
            </p>
            <p className="text-ink/75 leading-relaxed">{service.description}</p>
            <div className="mt-6 flex items-center gap-2 text-sm text-ink/70">
              <span className="w-2 h-2 rounded-full bg-ink/50" />
              Layered playbook, weekly demos, and production-ready code.
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function GardenersSection() {
  const coFounders = [
    {
      name: "Nigel Peris",
      role: "Co-Founder & Lead Engineer",
      bio: "Full-stack craftsman who turns design visions into pixel-perfect, performant reality. Obsessed with clean code and delightful UX.",
      github: "https://github.com/nigelperis",
      linkedin: "https://www.linkedin.com/in/nigel-peris",
      color: "#43aa8b",
      emoji: "🥭",
    },
    {
      name: "Avinash Valder",
      role: "Co-Founder & Design Lead",
      bio: "Design systems architect with a passion for motion and micro-interactions. Believes every pixel should have purpose and personality.",
      github: "https://github.com/avinashvalder",
      linkedin: "https://www.linkedin.com/in/avinashvalder",
      color: "#f9c74f",
      emoji: "🥭",
    },
  ];

  return (
    <section id="contact" className="py-24 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-section font-heading font-bold text-ink mb-4">
          The <span className="text-leaf-deep">Gardeners</span>
        </h2>
        <p className="text-lg text-ink/70 max-w-2xl mx-auto">
          <span className="font-mono text-[#f9c74f]">{"{ Aam }"}</span> means
          common—yet everything we touch is uncommon. Meet the duo behind the
          craft.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {coFounders.map((founder, index) => (
          <motion.div
            key={founder.name}
            className="glass soft-corners border border-ink/10 p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ y: -8 }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle at 20% 20%, ${founder.color}, transparent 50%)`,
              }}
            />
            <div className="relative space-y-4">
              <div className="flex items-start justify-between">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                  style={{ backgroundColor: founder.color }}
                >
                  {founder.emoji}
                </div>
                <div className="flex gap-3">
                  <a
                    href={founder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name}'s GitHub`}
                    className="w-10 h-10 rounded-full glass border border-ink/10 flex items-center justify-center text-ink/70 hover:text-leaf-deep hover:scale-110 transition-all duration-200"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name}'s LinkedIn`}
                    className="w-10 h-10 rounded-full glass border border-ink/10 flex items-center justify-center text-ink/70 hover:text-leaf-deep hover:scale-110 transition-all duration-200"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold text-ink">
                  {founder.name}
                </h3>
                <p className="text-sm font-mono text-ink/60 mt-1">
                  {founder.role}
                </p>
              </div>
              <p className="text-ink/75 leading-relaxed">{founder.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-heading font-bold text-ink">
            Our <span className="text-[#43aa8b]">Philosophy</span>
          </h3>
          <div className="space-y-5 text-lg text-ink/80 leading-relaxed">
            <p>
              We engineer digital spaces that are juicy, intentional, and hard
              to forget. Every project is a collaboration where your vision
              meets our craft.
            </p>
            <p>
              We respect craft: design ops, clean code, accessibility, and
              micro-moments that make people grin. Your launch stays delightful
              long after the first bite.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              "Founder-friendly comms",
              "Dev that respects design",
              "Launch + handoff",
            ].map((item) => (
              <div
                key={item}
                className="p-4 glass soft-corners border border-ink/10"
              >
                <p className="text-sm text-ink/60">Promise</p>
                <p className="font-heading font-semibold text-ink">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="glass soft-corners border border-ink/10 p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#43aa8b]/10 via-white/30 to-[#f9c74f]/15" />
          <div className="relative space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/Logo_Icon.svg"
                alt="CraftyAam Mango"
                width={50}
                height={50}
              />
              <div>
                <p className="text-sm text-ink/60">Ready to build?</p>
                <p className="font-heading font-semibold text-lg text-ink">
                  Commission a flavourful launch
                </p>
              </div>
            </div>
            <div className="p-4 border border-dashed border-ink/20 rounded-2xl bg-white/70">
              <EmailForm />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-ink/70">
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-mango-orange" />
                Motion prototypes included
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-[#43aa8b]" />
                Build + QA + launch
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-ink" />
                Remote-friendly collab
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-[#f9c74f]" />
                Weekly progress drops
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-ink/70 hover:text-leaf-deep hover:-translate-y-0.5 transition-all duration-200"
    >
      {children}
    </a>
  );
}
