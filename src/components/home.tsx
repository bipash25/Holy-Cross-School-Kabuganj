import React, { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import HeroSection from "./home/HeroSection";
import QuickAccessCards from "./home/QuickAccessCards";
import StatisticsShowcase from "./home/StatisticsShowcase";
import NewsEventsFeed from "./home/NewsEventsFeed";
import Footer from "./layout/Footer";
import { getSchoolStatistics, SchoolStatistics } from "@/lib/api";

const Home = () => {
  const [statistics, setStatistics] = useState<SchoolStatistics>({
    years: 75,
    students: 1200,
    teachers: 85,
    awards: 150,
  });
  const [loading, setLoading] = useState(true);

  // Fetch statistics from API
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getSchoolStatistics();
        setStatistics(data);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
        // Default values are already set in the state
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <Navbar transparent={true} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Spacer for navbar */}
        <div className="h-16"></div>

        {/* Hero Section */}
        <HeroSection />

        {/* Quick Access Cards */}
        <QuickAccessCards />

        {/* Statistics Showcase */}
        <StatisticsShowcase statistics={statistics} />

        {/* News & Events Feed */}
        <NewsEventsFeed />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
