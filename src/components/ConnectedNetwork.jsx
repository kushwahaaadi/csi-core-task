import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NODES_DESKTOP = [
  { id: "create", label: "CREATE", angle: 30, radius: 180, delay: 0 },
  { id: "connect", label: "CONNECT", angle: 100, radius: 240, delay: 1 },
  { id: "collaborate", label: "COLLABORATE", angle: 170, radius: 190, delay: 2 },
  { id: "execute", label: "EXECUTE", angle: 240, radius: 220, delay: 3 },
  { id: "community", label: "COMMUNITY", angle: 310, radius: 160, delay: 4 },
];

const NODES_MOBILE = [
  { id: "connect", label: "CONNECT", angle: 45, radius: 110, delay: 0 },
  { id: "create", label: "CREATE", angle: 165, radius: 95, delay: 1 },
  { id: "execute", label: "EXECUTE", angle: 285, radius: 120, delay: 2 },
];

export default function ConnectedNetwork() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const nodes = isMobile ? NODES_MOBILE : NODES_DESKTOP;
  
  // Subtle parallax based on scroll
  const parallaxOffset = (scrollY * 0.05) % 360;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Central Logo */}
      <motion.div 
        className="absolute z-20 flex items-center justify-center rounded-full bg-soil border-2 border-blush/60 p-2 shadow-[0_0_30px_rgba(242,118,94,0.3)]"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: isMobile ? "70px" : "110px",
          height: isMobile ? "70px" : "110px",
        }}
      >
        <img src="/csi-logo.png" alt="CSI Bennett" className="w-full h-full object-contain" />
      </motion.div>

      {/* Connection Lines & Orbiting Nodes */}
      <motion.div
        className="absolute z-10 w-full h-full flex items-center justify-center"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {nodes.map((node) => {
          // Calculate exact position based on angle and radius
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.cos(rad) * node.radius;
          const y = Math.sin(rad) * node.radius;

          return (
            <React.Fragment key={node.id}>
              {/* Connecting Line */}
              <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${x}px)`}
                  y2={`calc(50% + ${y}px)`}
                  stroke="rgba(242,118,94,0.2)"
                  strokeWidth={isMobile ? "1" : "1.5"}
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: node.delay,
                    ease: "easeInOut"
                  }}
                />
              </svg>

              {/* Node Wrapper (counter-rotates to keep text upright) */}
              <div 
                className="absolute"
                style={{
                  transform: `translate(${x}px, ${y}px)`
                }}
              >
                <motion.div
                  animate={{
                    rotate: -360 // Counter-rotate to stay upright
                  }}
                  transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="relative flex items-center justify-center"
                >
                  <motion.div
                    className="flex flex-col items-center justify-center bg-white border border-soil/10 shadow-lg rounded-full"
                    animate={{
                      y: [0, -6, 0],
                      boxShadow: [
                        "0px 4px 10px rgba(0,0,0,0.05)",
                        "0px 10px 20px rgba(242,118,94,0.15)",
                        "0px 4px 10px rgba(0,0,0,0.05)"
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: node.delay,
                      ease: "easeInOut"
                    }}
                    style={{
                      width: isMobile ? "54px" : "80px",
                      height: isMobile ? "54px" : "80px",
                    }}
                  >
                    <span 
                      className="font-mono font-bold text-soil tracking-wider text-center"
                      style={{
                        fontSize: isMobile ? "0.45rem" : "0.6rem"
                      }}
                    >
                      {node.label}
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </React.Fragment>
          );
        })}
      </motion.div>
      
      {/* Subtle outer rings */}
      <div 
        className="absolute z-0 rounded-full border border-soil/5 pointer-events-none"
        style={{
          width: isMobile ? "240px" : "400px",
          height: isMobile ? "240px" : "400px",
          transform: `rotate(${parallaxOffset}deg)`
        }}
      />
      <div 
        className="absolute z-0 rounded-full border border-blush/10 border-dashed pointer-events-none"
        style={{
          width: isMobile ? "320px" : "560px",
          height: isMobile ? "320px" : "560px",
          transform: `rotate(${-parallaxOffset}deg)`
        }}
      />
    </div>
  );
}
