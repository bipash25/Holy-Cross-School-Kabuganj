import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Placeholder component for the About page
// This will be implemented in detail later
const About = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">
            About Holy Cross School Kabuganj
          </h1>
          <p className="text-lg mb-4">
            This page is under construction. It will contain information about
            the school's history, mission, vision, and leadership.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
