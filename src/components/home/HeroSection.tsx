import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getHeroSlides, HeroSlide } from "@/lib/api";

interface HeroSectionProps {
  slides?: HeroSlide[];
  autoplaySpeed?: number;
}

const HeroSection = ({
  slides: initialSlides,
  autoplaySpeed = 5000,
}: HeroSectionProps) => {
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides || []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(!initialSlides);
  const [error, setError] = useState<string | null>(null);

  // Fetch slides from API if not provided as props
  useEffect(() => {
    if (!initialSlides) {
      const fetchSlides = async () => {
        try {
          setLoading(true);
          const data = await getHeroSlides();
          setSlides(data);
          setError(null);
        } catch (err) {
          setError("Failed to load slides. Please try again later.");
          console.error("Error fetching hero slides:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchSlides();
    }
  }, [initialSlides]);

  // Autoplay functionality
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [slides.length, autoplaySpeed]);

  // Navigation functions
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative w-full h-[600px] bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative w-full h-[600px] bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // No slides
  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[600px] bg-gray-200 flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to Holy Cross School Kabuganj
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Educating minds, enriching souls, and empowering futures since 1954
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-md transition-all"
            >
              <Link to="/admissions">Apply Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-6 rounded-md transition-all"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80" />
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-center p-4 text-white">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl"
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            {slides[currentSlide].ctaText && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-md transition-all"
                >
                  <Link to={slides[currentSlide].ctaLink || "/"}>
                    {slides[currentSlide].ctaText}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white font-bold py-3 px-6 rounded-md transition-all"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;
