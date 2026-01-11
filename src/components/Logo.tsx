import { motion } from "framer-motion";
import { Compass } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  showText?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export const Logo = ({ size = "md", animate = true, showText = true }: LogoProps) => {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* <motion.div
        className={`relative ${sizeClasses[size]} rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-glow-secondary`}
        whileHover={animate ? { scale: 1.1, rotate: 10 } : {}}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Compass className="w-1/2 h-1/2 text-white" strokeWidth={2.5} />
      </motion.div> */}
      {showText && (
        <span className={`font-bold ${textSizeClasses[size]} tracking-tight`}>
          <span className="text-foreground">TOUR</span>
          <span className="text-secondary">AILS</span>
        </span>
      )}
    </motion.div>
  );
};
