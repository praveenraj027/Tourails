import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Upload, Check, User, Compass, Camera, Users } from "lucide-react";

const steps = [
  { id: 1, title: "Account Type", icon: User },
  { id: 2, title: "Profile Photo", icon: Camera },
  { id: 3, title: "Interests", icon: Compass },
  { id: 4, title: "Preferences", icon: Users },
];

const accountTypes = [
  { id: "traveler", title: "Solo Traveler", description: "Looking to explore on my own", emoji: "🧳" },
  { id: "couple", title: "Couple", description: "Traveling with my partner", emoji: "💑" },
  { id: "group", title: "Group Explorer", description: "Love traveling with friends", emoji: "👥" },
  { id: "guide", title: "Local Guide", description: "Share my city with travelers", emoji: "🎯" },
];

const interests = [
  "Adventure", "Beach", "Mountains", "City Life", "Culture", "Food & Wine",
  "Photography", "History", "Nature", "Nightlife", "Wellness", "Art",
  "Wildlife", "Road Trips", "Backpacking", "Luxury Travel",
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else if (selectedInterests.length < 8) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Logo size="md" />
      </header>

      {/* Progress */}
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: currentStep === step.id ? 1.1 : 1,
                  backgroundColor: currentStep >= step.id ? "hsl(195, 66%, 54%)" : "hsl(220, 30%, 18%)",
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= step.id ? "text-secondary-foreground" : "text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </motion.div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-16 sm:w-24 mx-2 transition-colors ${
                    currentStep > step.id ? "bg-secondary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container mx-auto px-4 max-w-2xl">
        <AnimatePresence mode="wait">
          {/* Step 1: Account Type */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">How do you travel?</h2>
              <p className="text-muted-foreground mb-8">
                This helps us personalize your experience
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accountTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-6 rounded-2xl text-left transition-all border ${
                      selectedType === type.id
                        ? "bg-secondary/20 border-secondary shadow-glow-secondary"
                        : "glass-card hover:border-white/20"
                    }`}
                  >
                    <span className="text-3xl mb-3 block">{type.emoji}</span>
                    <h3 className="font-semibold text-lg mb-1">{type.title}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Profile Photo */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Add a profile photo</h2>
              <p className="text-muted-foreground mb-8">
                Travelers are more likely to connect with profiles that have photos
              </p>

              <div className="flex flex-col items-center">
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div
                    className={`w-48 h-48 rounded-3xl flex flex-col items-center justify-center transition-all ${
                      profileImage
                        ? "p-0 overflow-hidden"
                        : "glass-card border-dashed border-2 hover:border-secondary"
                    }`}
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-muted-foreground mb-3" />
                        <span className="text-sm text-muted-foreground">Click to upload</span>
                      </>
                    )}
                  </div>
                </motion.label>

                {profileImage && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setProfileImage(null)}
                    className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Remove photo
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Interests */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">What excites you?</h2>
              <p className="text-muted-foreground mb-8">
                Select up to 8 interests ({selectedInterests.length}/8)
              </p>

              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <motion.button
                    key={interest}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedInterests.includes(interest)
                        ? "bg-secondary text-secondary-foreground shadow-glow-secondary"
                        : "glass-card hover:border-white/20"
                    }`}
                  >
                    {interest}
                    {selectedInterests.includes(interest) && (
                      <Check className="w-4 h-4 inline ml-2" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Preferences */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Almost there!</h2>
              <p className="text-muted-foreground mb-8">
                Tell other travelers a bit about yourself
              </p>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Short Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Share what makes you excited about travel..."
                    className="w-full h-32 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors resize-none"
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {bio.length}/200
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="container mx-auto px-4 max-w-2xl py-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={currentStep === 1 ? "invisible" : ""}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <Button
            variant="hero"
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !selectedType) ||
              (currentStep === 3 && selectedInterests.length === 0)
            }
          >
            {currentStep === 4 ? "Complete Setup" : "Continue"}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
