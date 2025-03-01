/**
 * API service for fetching data from the backend
 * This will be used to connect to the external admin panel
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * Generic fetch function with error handling
 */
async function fetchData<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}

/**
 * School statistics API
 */
export interface SchoolStatistics {
  years: number;
  students: number;
  teachers: number;
  awards: number;
}

export async function getSchoolStatistics(): Promise<SchoolStatistics> {
  try {
    return await fetchData<SchoolStatistics>("/statistics");
  } catch (error) {
    console.error("Failed to fetch school statistics:", error);
    // Return default values if API fails
    return {
      years: 75,
      students: 1200,
      teachers: 85,
      awards: 150,
    };
  }
}

/**
 * News API
 */
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  featured: boolean;
}

export async function getNewsItems(
  limit?: number,
  category?: string,
): Promise<NewsItem[]> {
  try {
    const queryParams = new URLSearchParams();
    if (limit) queryParams.append("limit", limit.toString());
    if (category) queryParams.append("category", category);

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : "";
    return await fetchData<NewsItem[]>(`/news${queryString}`);
  } catch (error) {
    console.error("Failed to fetch news items:", error);
    // Return empty array if API fails
    return [];
  }
}

/**
 * Events API
 */
export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  imageUrl: string;
}

export async function getEventItems(
  limit?: number,
  category?: string,
): Promise<EventItem[]> {
  try {
    const queryParams = new URLSearchParams();
    if (limit) queryParams.append("limit", limit.toString());
    if (category) queryParams.append("category", category);

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : "";
    return await fetchData<EventItem[]>(`/events${queryString}`);
  } catch (error) {
    console.error("Failed to fetch event items:", error);
    // Return empty array if API fails
    return [];
  }
}

/**
 * School information API
 */
export interface SchoolInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  quickLinks: Array<{
    title: string;
    href: string;
  }>;
  importantLinks: Array<{
    title: string;
    href: string;
  }>;
}

export async function getSchoolInfo(): Promise<SchoolInfo> {
  try {
    return await fetchData<SchoolInfo>("/school-info");
  } catch (error) {
    console.error("Failed to fetch school info:", error);
    // Return default values if API fails
    return {
      name: "Holy Cross School Kabuganj",
      address: "123 School Road, Kabuganj, Bangladesh",
      phone: "+880 1234 567890",
      email: "info@holycrosskabuganj.edu",
      socialLinks: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
      quickLinks: [
        { title: "Home", href: "/" },
        { title: "About Us", href: "/about" },
        { title: "Admissions", href: "/admissions" },
        { title: "Academics", href: "/academics" },
        { title: "Contact", href: "/contact" },
      ],
      importantLinks: [
        { title: "School Calendar", href: "/calendar" },
        { title: "Student Portal", href: "/student-portal" },
        { title: "Parent Portal", href: "/parent-portal" },
        { title: "Career", href: "/career" },
        { title: "News & Events", href: "/news" },
      ],
    };
  }
}

/**
 * Hero carousel API
 */
export interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    return await fetchData<HeroSlide[]>("/hero-slides");
  } catch (error) {
    console.error("Failed to fetch hero slides:", error);
    // Return default values if API fails
    return [
      {
        id: "1",
        imageUrl:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
        title: "Welcome to Holy Cross School Kabuganj",
        subtitle:
          "Educating minds, enriching souls, and empowering futures since 1954",
        ctaText: "Apply Now",
        ctaLink: "/admissions",
      },
      {
        id: "2",
        imageUrl:
          "https://images.unsplash.com/photo-1577896851231-70ef18881754",
        title: "Excellence in Education",
        subtitle:
          "Providing quality education with modern facilities and dedicated teachers",
        ctaText: "Learn More",
        ctaLink: "/about",
      },
      {
        id: "3",
        imageUrl:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        title: "Nurturing Future Leaders",
        subtitle:
          "Developing character, creativity, and leadership skills in our students",
        ctaText: "Our Programs",
        ctaLink: "/academics",
      },
    ];
  }
}
