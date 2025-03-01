import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  logo?: string;
  transparent?: boolean;
}

const Navbar = ({ logo = "/vite.svg", transparent = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for translucent navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "About",
      children: [
        { name: "Our History", path: "/about/history" },
        { name: "Mission & Vision", path: "/about/mission" },
        { name: "Leadership", path: "/about/leadership" },
      ],
    },
    {
      name: "Academics",
      children: [
        { name: "Curriculum", path: "/academics/curriculum" },
        { name: "Departments", path: "/academics/departments" },
        { name: "Faculty", path: "/academics/faculty" },
      ],
    },
    { name: "Admissions", path: "/admissions" },
    { name: "News & Events", path: "/news-events" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/70 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center flex-shrink-0 w-1/4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Holy Cross School" className="h-12" />
            <div className="ml-3 text-xl font-bold text-primary hidden sm:block">
              Holy Cross School Kabuganj
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-center items-center w-2/4">
          <NavigationMenu className="bg-transparent">
            <NavigationMenuList className="bg-transparent">
              {navItems.map((item, index) => {
                // If item has children, render dropdown
                if (item.children) {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger className="bg-transparent">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white/70 backdrop-blur-md">
                        <ul className="grid w-[200px] gap-2 p-4">
                          {item.children.map((child, childIndex) => (
                            <li key={childIndex}>
                              <NavigationMenuLink
                                asChild
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/20 focus:bg-white/20 bg-transparent"
                              >
                                <Link to={child.path}>{child.name}</Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                // Regular menu item
                return (
                  <NavigationMenuItem key={index}>
                    <Link
                      to={item.path}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-white/20",
                      )}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="hidden lg:flex items-center justify-end space-x-4 w-1/4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 bg-transparent hover:bg-white/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-sun"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            Theme
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-gray-400 hover:bg-white/20"
          >
            Contact Us
          </Button>
          <Button size="sm" className="bg-primary/90 hover:bg-primary">
            Apply Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="bg-transparent hover:bg-white/20"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white/90 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => {
                // If item has children, render accordion-like dropdown
                if (item.children) {
                  return (
                    <div key={index} className="border-b border-gray-100 pb-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between bg-transparent hover:bg-white/20"
                          >
                            {item.name}
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full bg-white/70 backdrop-blur-md">
                          {item.children.map((child, childIndex) => (
                            <DropdownMenuItem key={childIndex} asChild>
                              <Link
                                to={child.path}
                                className="w-full"
                                onClick={toggleMenu}
                              >
                                {child.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  );
                }

                // Regular menu item
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className="px-4 py-2 text-gray-800 hover:text-primary transition-colors border-b border-gray-100 pb-2"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
