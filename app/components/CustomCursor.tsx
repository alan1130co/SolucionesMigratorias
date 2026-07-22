"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

function subscribeCoarsePointer(onChange: () => void) {
  const mql = window.matchMedia("(pointer: coarse)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getCoarsePointerSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches;
}

// Por defecto asumimos touch en el render del servidor para que el
// primer paint del cliente coincida (evita flash del cursor + mismatch).
function getCoarsePointerServerSnapshot() {
  return true;
}

export default function CustomCursor() {
  const isTouch = useSyncExternalStore(
    subscribeCoarsePointer,
    getCoarsePointerSnapshot,
    getCoarsePointerServerSnapshot
  );
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(Boolean(target.closest?.(INTERACTIVE_SELECTOR)));
    };

    const handleLeaveWindow = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener(
      "mouseleave",
      handleLeaveWindow
    );

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleLeaveWindow
      );
    };
  }, [isTouch, cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x, y, opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        animate={{
          width: isHovering ? 56 : 28,
          height: isHovering ? 56 : 28,
          backgroundColor: isHovering
            ? "rgba(197, 160, 89, 0.15)"
            : "rgba(197, 160, 89, 0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-gold"
      />
    </motion.div>
  );
}
