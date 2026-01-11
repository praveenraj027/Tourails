import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Phone, AlertTriangle, MapPin, Users, CheckCircle, Lock, Eye, EyeOff } from "lucide-react";

const safetyFeatures = [
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "All travelers go through a verification process including ID check and social verification.",
    status: "Enabled",
  },
  {
    icon: MapPin,
    title: "Location Sharing",
    description: "Share your real-time location with trusted contacts during your travels.",
    status: "Disabled",
  },
  {
    icon: Users,
    title: "Trusted Contacts",
    description: "Add emergency contacts who can be notified in case of emergency.",
    status: "3 contacts",
  },
  {
    icon: Phone,
    title: "Emergency SOS",
    description: "Quick access to local emergency services and your trusted contacts.",
    status: "Ready",
  },
];

const privacySettings = [
  { id: "profile_visibility", label: "Profile Visibility", description: "Who can see your profile", value: "Everyone" },
  { id: "location_visible", label: "Show Location", description: "Display your current location on your profile", value: true },
  { id: "trip_visible", label: "Show Trip Plans", description: "Allow others to see your upcoming trips", value: true },
  { id: "online_status", label: "Online Status", description: "Show when you're online", value: false },
];

const Safety = () => {
  const [settings, setSettings] = useState(privacySettings);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, value: !setting.value } : setting
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Your <span className="text-secondary">Safety</span> Matters
            </h1>
            <p className="text-muted-foreground text-lg">
              We prioritize your safety with industry-leading security features and privacy controls.
            </p>
          </motion.div>

          {/* Emergency Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-8 rounded-3xl bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground text-center group"
            >
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 group-hover:animate-pulse" />
              <h2 className="text-2xl font-bold mb-2">Emergency SOS</h2>
              <p className="text-destructive-foreground/80">
                Press and hold for 3 seconds to alert emergency contacts
              </p>
            </motion.button>
          </motion.div>

          {/* Safety Features Grid */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6">Safety Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safetyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="glass-card p-6 hover:border-secondary/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{feature.title}</h3>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {feature.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Privacy Settings</h2>
            <div className="glass-card divide-y divide-border">
              {settings.map((setting, index) => (
                <motion.div
                  key={setting.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{setting.label}</h3>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                  </div>
                  
                  {typeof setting.value === "boolean" ? (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleSetting(setting.id)}
                      className={`w-14 h-8 rounded-full p-1 transition-colors ${
                        setting.value ? "bg-secondary" : "bg-muted"
                      }`}
                    >
                      <motion.div
                        animate={{ x: setting.value ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="w-6 h-6 rounded-full bg-white shadow-md"
                      />
                    </motion.button>
                  ) : (
                    <Button variant="outline" size="sm">
                      {setting.value}
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Verification Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className="glass-card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Get Verified</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Verified travelers get a special badge and are more trusted by the community.
              </p>
              <Button variant="gradient" size="lg">
                Start Verification
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Safety;
