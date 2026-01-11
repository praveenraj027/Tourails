import { motion } from "framer-motion";
import { Globe, Users, Camera, Shield, MessageCircle, Map } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Explore Worldwide",
    description: "Browse 195+ countries and thousands of unique destinations curated by travelers like you.",
  },
  {
    icon: Users,
    title: "Connect & Meet",
    description: "Find travel buddies, join group trips, and build lasting friendships across borders.",
  },
  {
    icon: Camera,
    title: "Share Stories",
    description: "Post photos, reels, and stories from your adventures. Inspire and get inspired.",
  },
  {
    icon: Shield,
    title: "Travel Safely",
    description: "Verified profiles, emergency contacts, and real-time safety alerts for peace of mind.",
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description: "Connect instantly with travelers, locals, and trip organizers through our messaging system.",
  },
  {
    icon: Map,
    title: "Plan Together",
    description: "Collaborative trip planning with shared itineraries, bookmarks, and recommendations.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-medium text-sm uppercase tracking-widest mb-4 block">
            Why TOURLE
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Everything you need to
            <br />
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              travel smarter
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From planning to sharing, we've got every aspect of your journey covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card p-8 h-full hover:border-secondary/30 hover:shadow-glow-secondary/20 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
