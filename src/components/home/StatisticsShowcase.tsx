import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Award, GraduationCap, Calendar, Users } from "lucide-react";

interface StatisticProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatisticItem = ({
  icon,
  value = 0,
  label = "Statistic",
  suffix = "",
  delay = 0,
}: StatisticProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds for the animation
    const interval = duration / value;

    let timer: NodeJS.Timeout;
    let currentCount = 0;

    // Delay the start of the animation based on the delay prop
    const startTimeout = setTimeout(() => {
      timer = setInterval(() => {
        currentCount += 1;
        setCount(currentCount);

        if (currentCount >= value) {
          clearInterval(timer);
        }
      }, interval);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(timer);
    };
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-4xl font-bold text-primary mb-2">
        {count}
        {suffix}
      </h3>
      <p className="text-gray-600 text-center">{label}</p>
    </motion.div>
  );
};

interface StatisticsShowcaseProps {
  statistics?: {
    years: number;
    students: number;
    teachers: number;
    awards: number;
  };
  className?: string;
}

const StatisticsShowcase = ({
  statistics = {
    years: 75,
    students: 1200,
    teachers: 85,
    awards: 150,
  },
  className,
}: StatisticsShowcaseProps) => {
  return (
    <section className={cn("py-16 bg-gray-50", className)}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Our School in Numbers
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatisticItem
            icon={<Calendar size={24} />}
            value={statistics.years}
            label="Years of Excellence"
            delay={0}
          />

          <StatisticItem
            icon={<Users size={24} />}
            value={statistics.students}
            label="Happy Students"
            suffix="+"
            delay={200}
          />

          <StatisticItem
            icon={<GraduationCap size={24} />}
            value={statistics.teachers}
            label="Qualified Teachers"
            delay={400}
          />

          <StatisticItem
            icon={<Award size={24} />}
            value={statistics.awards}
            label="Awards Received"
            suffix="+"
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default StatisticsShowcase;
