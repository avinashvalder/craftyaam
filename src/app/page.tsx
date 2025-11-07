"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

import { EmailForm } from "@/components/EmailForm";

export default function Home() {
  const currentYear = new Date().getFullYear();

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // 100ms stagger between children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Separate variants for form/social section with additional delay
  const formSocialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.05, // Additional 50ms delay for 150ms total stagger
      },
    },
  };

  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Right Icon */}
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 opacity-5"
          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
          animate={{ opacity: 0.05, rotate: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <Image
            src="/Logo_Icon.svg"
            alt=""
            width={256}
            height={256}
            className="w-full h-full"
          />
        </motion.div>
        
        {/* Bottom Left Icon */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 opacity-5"
          initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
          animate={{ opacity: 0.05, rotate: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <Image
            src="/Logo_Icon.svg"
            alt=""
            width={384}
            height={384}
            className="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Main Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <motion.div
          className="w-full max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center text-center gap-10 sm:gap-12">
            {/* Logo with Icon */}
            <motion.div
              className="flex flex-col items-center gap-6"
              variants={itemVariants}
            >
              {/* Icon Logo */}
              <motion.div
                className="w-20 h-20 sm:w-24 sm:h-24"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/Logo_Icon.svg"
                  alt="CraftyAam icon"
                  width={96}
                  height={96}
                  priority
                  className="w-full h-auto drop-shadow-lg"
                />
              </motion.div>
              
              {/* Text Logo */}
              <div className="w-[280px] sm:w-[380px] md:w-[450px] lg:w-[520px]">
                <Image
                  src="/Logo_Text.svg"
                  alt="CraftyAam"
                  width={520}
                  height={91}
                  priority
                  className="w-full h-auto drop-shadow-md"
                />
              </div>
            </motion.div>

            {/* Content Column */}
            <div className="flex flex-col items-center gap-8 sm:gap-10 w-full max-w-xl">
              {/* Descriptive Text */}
              <motion.div
                className="space-y-3"
                variants={itemVariants}
              >
                <p className="text-ink/90 text-lg sm:text-xl lg:text-2xl font-medium">
                  Crafting delightful web experiences
                </p>
                <p className="text-ink/60 text-base sm:text-lg">
                  Something fresh is coming soon. Stay tuned!
                </p>
              </motion.div>

              {/* Email Form */}
              <motion.div
                className="w-full max-w-md"
                variants={formSocialVariants}
              >
                <EmailForm />
              </motion.div>

              {/* Social Media Links */}
              <motion.div
                className="flex items-center gap-6"
                variants={formSocialVariants}
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-ink/70 hover:text-ink hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mango-yellow focus:ring-offset-2 rounded-md p-1"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-ink/70 hover:text-ink hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mango-yellow focus:ring-offset-2 rounded-md p-1"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 sm:px-6 py-6 text-center relative z-10">
        <p className="text-ink/70 text-sm">
          © CraftyAam {currentYear} • Made with 🥭 & code.
        </p>
      </footer>
    </div>
  );
}
