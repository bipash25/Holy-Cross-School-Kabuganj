import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  schoolName?: string;
  address?: string;
  phone?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  quickLinks?: Array<{
    title: string;
    href: string;
  }>;
  importantLinks?: Array<{
    title: string;
    href: string;
  }>;
}

const Footer = ({
  schoolName = "Holy Cross School Kabuganj",
  address = "123 School Road, Kabuganj, Bangladesh",
  phone = "+880 1234 567890",
  email = "info@holycrosskabuganj.edu",
  socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  quickLinks = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Admissions", href: "/admissions" },
    { title: "Academics", href: "/academics" },
    { title: "Contact", href: "/contact" },
  ],
  importantLinks = [
    { title: "School Calendar", href: "/calendar" },
    { title: "Student Portal", href: "/student-portal" },
    { title: "Parent Portal", href: "/parent-portal" },
    { title: "Career", href: "/career" },
    { title: "News & Events", href: "/news" },
  ],
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* School Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{schoolName}</h3>
            <p className="mb-4 text-slate-300">
              Educating minds, enriching souls, and empowering futures since
              1954.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href={socialLinks.facebook}
                aria-label="Facebook"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href={socialLinks.twitter}
                aria-label="Twitter"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href={socialLinks.instagram}
                aria-label="Instagram"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Important Links</h3>
            <ul className="space-y-2">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>{address}</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>{email}</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-4 bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-slate-400 text-sm">
          <p>
            &copy; {currentYear} {schoolName}. All rights reserved.
          </p>
          <p className="mt-2">
            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            {" | "}
            <Link
              to="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
