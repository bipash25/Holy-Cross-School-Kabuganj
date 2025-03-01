import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  GraduationCap,
  Mail,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const QuickAccessCard = ({
  title = "Card Title",
  description = "Card description goes here",
  icon = <GraduationCap size={24} />,
  href = "#",
  color = "bg-blue-500",
}: QuickAccessCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-2 hover:border-primary transition-all duration-300 bg-white">
        <div className={cn("h-2", color)} />
        <CardHeader>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "p-2 rounded-full",
                color.replace("bg-", "bg-opacity-10 text-"),
              )}
            >
              {icon}
            </div>
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <a
            href={href}
            className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all duration-300"
          >
            Learn More <ArrowRight size={16} />
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

interface QuickAccessCardsProps {
  cards?: QuickAccessCardProps[];
}

const QuickAccessCards = ({ cards }: QuickAccessCardsProps) => {
  const defaultCards: QuickAccessCardProps[] = [
    {
      title: "Admissions",
      description:
        "Learn about our admission process, requirements, and apply online.",
      icon: <GraduationCap size={24} />,
      href: "/admissions",
      color: "bg-blue-500",
    },
    {
      title: "Curriculum",
      description:
        "Explore our comprehensive curriculum and academic programs.",
      icon: <BookOpen size={24} />,
      href: "/curriculum",
      color: "bg-green-500",
    },
    {
      title: "Events",
      description:
        "Stay updated with school events, activities, and important dates.",
      icon: <Calendar size={24} />,
      href: "/events",
      color: "bg-amber-500",
    },
    {
      title: "Contact Us",
      description:
        "Get in touch with our administration for inquiries and support.",
      icon: <Mail size={24} />,
      href: "/contact",
      color: "bg-purple-500",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Quick Access
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the information you need quickly with our easy access cards.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCards.map((card, index) => (
            <QuickAccessCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessCards;
