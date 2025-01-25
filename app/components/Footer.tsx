"use client";

import { motion } from "framer-motion";
import { Twitter, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

const currentYear = new Date().getFullYear();

const navigationLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Stats", href: "#stats" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/tweetanalytics" },
  { name: "GitHub", icon: Github, href: "https://github.com/tweetanalytics" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/tweetanalytics" },
];

export function Footer() {
  return (
    <footer className="py-12 mt-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glassmorphic rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Column */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">TweetAnalytics</h3>
                <p className="text-gray-300 text-sm">
                  Empowering your social media presence through blockchain technology and analytics.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Navigation</h4>
                <ul className="space-y-2">
                  {navigationLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="mailto:contact@tweetanalytics.com"
                      className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      contact@tweetanalytics.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tweetanalytics.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      tweetanalytics.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-center text-gray-300 text-sm">
                © {currentYear} TweetAnalytics. All rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}