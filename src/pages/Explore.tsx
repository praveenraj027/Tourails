import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Heart,
  ChevronDown,
  Globe,
  X,
} from "lucide-react";

const regions = [
  { id: "all", name: "All Regions" },
  { id: "europe", name: "Europe" },
  { id: "asia", name: "Asia" },
  { id: "americas", name: "Americas" },
  { id: "africa", name: "Africa" },
  { id: "oceania", name: "Oceania" },
];

const categories = [
  "All", "Beaches", "Mountains", "Cities", "Adventure", "Culture", "Wildlife", "Islands"
];

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    country: "Indonesia",
    region: "asia",
    category: "beaches",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    rating: 4.9,
    travelers: 2340,
    price: "$$",
  },
  {
    id: 2,
    name: "Santorini, Greece",
    country: "Greece",
    region: "europe",
    category: "islands",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
    rating: 4.8,
    travelers: 1890,
    price: "$$$",
  },
  {
    id: 3,
    name: "Tokyo, Japan",
    country: "Japan",
    region: "asia",
    category: "cities",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    rating: 4.9,
    travelers: 3120,
    price: "$$$",
  },
  {
    id: 4,
    name: "Machu Picchu, Peru",
    country: "Peru",
    region: "americas",
    category: "adventure",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800",
    rating: 4.9,
    travelers: 1560,
    price: "$$",
  },
  {
    id: 5,
    name: "Swiss Alps",
    country: "Switzerland",
    region: "europe",
    category: "mountains",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
    rating: 4.8,
    travelers: 1240,
    price: "$$$$",
  },
  {
    id: 6,
    name: "Serengeti, Tanzania",
    country: "Tanzania",
    region: "africa",
    category: "wildlife",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    rating: 4.9,
    travelers: 890,
    price: "$$$",
  },
  {
    id: 7,
    name: "Maldives",
    country: "Maldives",
    region: "asia",
    category: "beaches",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    rating: 4.9,
    travelers: 1780,
    price: "$$$$",
  },
  {
    id: 8,
    name: "Paris, France",
    country: "France",
    region: "europe",
    category: "culture",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    rating: 4.7,
    travelers: 4200,
    price: "$$$",
  },
  {
    id: 9,
    name: "Great Barrier Reef",
    country: "Australia",
    region: "oceania",
    category: "adventure",
    image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800",
    rating: 4.8,
    travelers: 980,
    price: "$$$",
  },
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [savedDestinations, setSavedDestinations] = useState<number[]>([]);

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "all" || dest.region === selectedRegion;
    const matchesCategory = selectedCategory === "All" || 
      dest.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesRegion && matchesCategory;
  });

  const toggleSave = (id: number) => {
    setSavedDestinations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Explore the <span className="text-secondary">World</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Discover breathtaking destinations curated by travelers like you
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search destinations, countries..."
                variant="glass"
                className="pl-14 pr-14 h-14 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-wrap items-center gap-4">
                {/* Region Filter */}
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="bg-muted border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-secondary"
                  >
                    {regions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Clear Filters */}
                {(selectedRegion !== "all" || selectedCategory !== "All") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedRegion("all");
                      setSelectedCategory("All");
                    }}
                    className="text-muted-foreground"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear filters
                  </Button>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredDestinations.length}</span> destinations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <div className="glass-card overflow-hidden hover:shadow-elevated transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Save Button */}
                    <button
                      onClick={() => toggleSave(destination.id)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          savedDestinations.includes(destination.id)
                            ? "fill-accent text-accent"
                            : "text-white"
                        }`}
                      />
                    </button>

                    {/* Price Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                      {destination.price}
                    </div>

                    {/* Location */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{destination.name}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">
                        {destination.country}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {destination.travelers.toLocaleString()} travelers
                      </span>
                      <Button variant="secondary" size="sm">
                        Explore
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="gradient" size="lg">
              Load More Destinations
              <ChevronDown className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 text-center"
          >
            <Globe className="w-16 h-16 mx-auto mb-4 text-secondary animate-pulse-slow" />
            <h3 className="text-2xl font-bold mb-2">Interactive Map Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Explore destinations on an interactive world map with real-time traveler locations and experiences.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Explore;
