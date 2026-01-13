import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import {
  Home,
  Compass,
  Users,
  MessageCircle,
  Heart,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  TrendingUp,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Compass, label: "Explore", href: "/explore" },
  // { icon: Users, label: "Community", href: "/community" },
  // { icon: MessageCircle, label: "Messages", href: "/messages" },
  // { icon: Heart, label: "Saved", href: "/saved" },
  // { icon: Shield, label: "Safety", href: "/safety" },
  // { icon: Settings, label: "Settings", href: "/settings" },
];

const stats = [
  // { label: "Countries Visited", value: "12", icon: MapPin, change: "+2" },
  // { label: "Trips Planned", value: "5", icon: Calendar, change: "+1" },
  // { label: "Connections", value: "128", icon: Users, change: "+15" },
  // { label: "Stories Shared", value: "47", icon: TrendingUp, change: "+8" },
];

const upcomingTrips = [
  // { destination: "Bali, Indonesia", date: "Mar 15 - Mar 28", image: "🏝️" },
  // { destination: "Tokyo, Japan", date: "May 1 - May 14", image: "🗼" },
  // { destination: "Paris, France", date: "Jul 10 - Jul 20", image: "🗼" },
];

const recentActivity = [
  // { type: "connection", user: "Sarah Chen", action: "accepted your connection request", time: "2h ago" },
  // { type: "like", user: "Mike Johnson", action: "liked your story from Santorini", time: "5h ago" },
  // { type: "comment", user: "Emma Wilson", action: "commented on your Bali itinerary", time: "1d ago" },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="fixed left-0 top-0 h-screen bg-card border-r border-border z-40 flex flex-col"
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen ? (
            <Logo size="md" />
          ) : (
            <Logo size="sm" showText={false} />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-secondary/20 text-secondary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 text-muted-foreground hover:text-foreground ${
              !sidebarOpen && "justify-center"
            }`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Log out</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-[280px]" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <header className="sticky top-0 bg-background/80 backdrop-blur-xl border-b border-border z-30">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4 flex-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative max-w-md flex-1 hidden sm:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search destinations, travelers..."
                  variant="glass"
                  className="pl-12"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
              </Button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-8 space-y-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="text-secondary">John</span> 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your travel adventures
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 hover:border-secondary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Trips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 glass-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Upcoming Trips</h2>
                <Link to="/explore" className="text-sm text-secondary hover:underline">
                  View all
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingTrips.map((trip, index) => (
                  <motion.div
                    key={trip.destination}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                      {trip.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-secondary transition-colors">
                        {trip.destination}
                      </h3>
                      <p className="text-sm text-muted-foreground">{trip.date}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </motion.div>
                ))}
              </div>

              <Button variant="gradient" className="w-full mt-6">
                <Compass className="w-5 h-5" />
                Plan New Trip
              </Button>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card p-6"
            >
              <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button variant="ghost" className="w-full mt-4 text-secondary">
                View All Activity
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
