"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "motion/react";
import { useMemo, type JSX } from "react";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
  as?: keyof JSX.IntrinsicElements;
}
const BlurFadeText = ({
  text,
  className,
  variant,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
  as = "span",
}: BlurFadeTextProps) => {
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: "blur(8px)" },
    visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" },
  };
  const combinedVariants = variant || defaultVariants;
  const characters = useMemo(() => Array.from(text), [text]);

  const MotionComponent = motion.create(as);

  if (animateByCharacter) {
    return (
      <div className="flex">
        <AnimatePresence>
          {characters.map((char, i) => (
            <MotionComponent
              key={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={combinedVariants}
              transition={{
                // repeat: Infinity,
                // repeatType: "reverse",
                delay: delay + i * characterDelay,
                ease: "easeOut",
              }}
              className={cn("inline-block", className)}
              style={{ width: char.trim() === "" ? "0.2em" : "auto" }}
            >
              {char}
            </MotionComponent>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex">
      <AnimatePresence>
        <MotionComponent
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={combinedVariants}
          transition={{
            // repeat: Infinity,
            // repeatType: "reverse",
            delay,
            ease: "easeOut",
          }}
          className={cn("inline-block", className)}
        >
          {text}
        </MotionComponent>
      </AnimatePresence>
    </div>
  );
};

export default BlurFadeText;
