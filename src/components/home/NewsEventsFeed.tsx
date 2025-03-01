import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { CalendarIcon, ArrowRightIcon, FilterIcon } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  imageUrl: string;
}

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  imageUrl: string;
}

interface NewsEventsFeedProps {
  newsItems?: NewsItem[];
  eventItems?: EventItem[];
}

const NewsEventsFeed = ({
  newsItems = [
    {
      id: "1",
      title: "School Achieves 100% Pass Rate in Board Exams",
      date: "June 15, 2023",
      excerpt:
        "Holy Cross School Kabuganj celebrates outstanding academic achievement with all students passing their board examinations.",
      category: "Academic",
      imageUrl:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "2",
      title: "Annual Sports Day Concludes with Grand Ceremony",
      date: "May 5, 2023",
      excerpt:
        "Students showcase athletic excellence during the two-day sports event featuring track and field competitions.",
      category: "Sports",
      imageUrl:
        "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "3",
      title: "New Science Laboratory Inaugurated",
      date: "April 12, 2023",
      excerpt:
        "State-of-the-art science lab with modern equipment inaugurated to enhance practical learning experiences.",
      category: "Infrastructure",
      imageUrl:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "4",
      title: "Cultural Festival Showcases Student Talent",
      date: "March 20, 2023",
      excerpt:
        "Annual cultural program features dance, music, and dramatic performances highlighting the rich cultural heritage.",
      category: "Cultural",
      imageUrl:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ],
  eventItems = [
    {
      id: "1",
      title: "Parent-Teacher Meeting",
      date: "July 15, 2023",
      time: "10:00 AM - 2:00 PM",
      location: "School Auditorium",
      description:
        "Quarterly meeting to discuss student progress and address parent concerns.",
      category: "Academic",
      imageUrl:
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "2",
      title: "Science Exhibition",
      date: "August 5-6, 2023",
      time: "9:00 AM - 4:00 PM",
      location: "School Campus",
      description:
        "Annual science fair showcasing student projects and innovations across all grades.",
      category: "Academic",
      imageUrl:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "3",
      title: "Inter-School Debate Competition",
      date: "September 12, 2023",
      time: "11:00 AM - 3:00 PM",
      location: "Main Hall",
      description:
        "Prestigious debate competition with participation from schools across the region.",
      category: "Competition",
      imageUrl:
        "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "4",
      title: "Annual Sports Day",
      date: "October 20-21, 2023",
      time: "8:00 AM - 5:00 PM",
      location: "School Grounds",
      description:
        "Two-day sports event featuring track and field competitions, team sports, and award ceremony.",
      category: "Sports",
      imageUrl:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ],
}: NewsEventsFeedProps) => {
  const [activeTab, setActiveTab] = useState("news");
  const [activeFilter, setActiveFilter] = useState("all");

  // Get unique categories for filtering
  const newsCategories = [
    "all",
    ...new Set(newsItems.map((item) => item.category)),
  ];
  const eventCategories = [
    "all",
    ...new Set(eventItems.map((item) => item.category)),
  ];

  // Filter items based on selected category
  const filteredNews =
    activeFilter === "all"
      ? newsItems
      : newsItems.filter((item) => item.category === activeFilter);

  const filteredEvents =
    activeFilter === "all"
      ? eventItems
      : eventItems.filter((item) => item.category === activeFilter);

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            News & Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest announcements and upcoming events at
            Holy Cross School Kabuganj.
          </p>
        </div>

        <Tabs
          defaultValue="news"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="news">Latest News</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            </TabsList>
          </div>

          {/* Filter options */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm">
              <FilterIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {(activeTab === "news" ? newsCategories : eventCategories).map(
                  (category) => (
                    <Button
                      key={category}
                      variant={
                        activeFilter === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setActiveFilter(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ),
                )}
              </div>
            </div>
          </div>

          <TabsContent value="news" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredNews.map((news) => (
                <Card
                  key={news.id}
                  className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 m-2 rounded">
                      {news.category}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{news.date}</span>
                    </div>
                    <CardTitle className="line-clamp-2">{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
                      {news.excerpt}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button
                      variant="ghost"
                      className="text-primary flex items-center p-0 h-auto"
                    >
                      Read More <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">
                  No news articles found in this category.
                </p>
              </div>
            )}

            {filteredNews.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="flex items-center">
                  View All News <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="events" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden flex flex-col md:flex-row transition-all duration-200 hover:shadow-lg"
                >
                  <div className="relative md:w-1/3 h-48 md:h-auto overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 m-2 rounded">
                      {event.category}
                    </div>
                  </div>
                  <div className="md:w-2/3 flex flex-col">
                    <CardHeader>
                      <CardTitle className="line-clamp-2">
                        {event.title}
                      </CardTitle>
                      <div className="flex flex-col space-y-1 mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          <span>
                            {event.date} • {event.time}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg
                            className="h-4 w-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Button
                        variant="ghost"
                        className="text-primary flex items-center p-0 h-auto"
                      >
                        Event Details{" "}
                        <ArrowRightIcon className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">
                  No events found in this category.
                </p>
              </div>
            )}

            {filteredEvents.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="flex items-center">
                  View All Events <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default NewsEventsFeed;
