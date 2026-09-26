import React, { useState, useEffect, useRef } from "react";

const SPHERE_ITEMS = [
  {
    id: 1,
    title: "CSI BENNETT",
    desc: "The Core Chapter Identity",
    img: "/csi-logo.png",
    type: "logo",
  },
  {
    id: 2,
    title: "REACH",
    desc: "Turn conversations into campus participation.",
    img: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=400&q=80",
    type: "image",
  },
  {
    id: 3,
    title: "CREATE",
    desc: "Build ideas people remember.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    type: "image",
  },
  {
    id: 4,
    title: "CONNECT",
    desc: "Bring students, teams and opportunities together.",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    type: "image",
  },
  {
    id: 5,
    title: "EXECUTE",
    desc: "Turn plans into outcomes.",
    img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    type: "image",
  },
  {
    id: 6,
    title: "LEAD",
    desc: "Move the team when it matters.",
    img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=400&q=80",
    type: "image",
  },
  {
    id: 7,
    title: "DELIVER",
    desc: "Finish what you start.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
    type: "image",
  },
  {
    id: 8,
    title: "TECH",
    desc: "Code and Digital Architecture.",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
    type: "image",
  },
  {
    id: 9,
    title: "EVENTS",
    desc: "HYPE 4.0 and Beyond.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80",
    type: "image",
  },
  {
    id: 10,
    title: "COMMUNITY",
    desc: "The People Who Make It Happen.",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
    type: "image",
  },
  {
    id: 11,
    title: "PROJECTS",
    desc: "Real-world impact.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    type: "image",
  },
];

export default function InteractiveSphere({ onSelectNode }) {
  const containerRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  // Rotation angles & velocity
  const rotationRef = useRef({
    rx: 0.1,
    ry: 0.2,
    vx: 0.003,
    vy: 0.005,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    // Generate initial sphere points using Fibonacci spiral
    const N = SPHERE_ITEMS.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    const initialNodes = SPHERE_ITEMS.map((item, i) => {
      const y = 1 - (i / (N - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        ...item,
        baseX: x,
        baseY: y,
        baseZ: z,
        x,
        y,
        z,
        scale: 1,
        alpha: 1,
        left: 270,
        top: 270,
      };
    });

    setNodes(initialNodes);

    let animationId;
    const radius = 220; // sphere radius in px
    const centerX = 270;
    const centerY = 270;

    const tick = () => {
      const r = rotationRef.current;

      if (!isDragging) {
        // Friction and default gentle rotation
        r.vx *= 0.96;
        r.vy *= 0.96;
        if (Math.abs(r.vx) < 0.001) r.vx = 0.002;
        if (Math.abs(r.vy) < 0.001) r.vy = 0.0035;

        r.rx += r.vx;
        r.ry += r.vy;
      }

      const sinX = Math.sin(r.rx);
      const cosX = Math.cos(r.rx);
      const sinY = Math.sin(r.ry);
      const cosY = Math.cos(r.ry);

      setNodes((prevNodes) =>
        prevNodes.map((n) => {
          // Rotate around Y axis
          const x1 = n.baseX * cosY + n.baseZ * sinY;
          const z1 = -n.baseX * sinY + n.baseZ * cosY;

          // Rotate around X axis
          const y2 = n.baseY * cosX - z1 * sinX;
          const z2 = n.baseY * sinX + z1 * cosX;

          // Perspective projection
          const fov = 380;
          const scale = fov / (fov + z2 * radius);
          const px = centerX + x1 * radius * scale;
          const py = centerY + y2 * radius * scale;

          // Depth based properties
          const normalizedZ = (z2 + 1) / 2; // 0 to 1
          const alpha = 0.35 + normalizedZ * 0.65;
          const size = 32 + normalizedZ * 56; // slightly larger size for fewer nodes
          const zIndex = Math.floor(normalizedZ * 1000) + 100;

          return {
            ...n,
            left: px - size / 2,
            top: py - size / 2,
            size,
            scale,
            alpha,
            zIndex,
            isFront: z2 > 0.1,
          };
        }),
      );

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    rotationRef.current.lastX = e.clientX;
    rotationRef.current.lastY = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - rotationRef.current.lastX;
    const dy = e.clientY - rotationRef.current.lastY;

    rotationRef.current.ry += dx * 0.007;
    rotationRef.current.rx -= dy * 0.007;
    rotationRef.current.vx = -dy * 0.003;
    rotationRef.current.vy = dx * 0.003;

    rotationRef.current.lastX = e.clientX;
    rotationRef.current.lastY = e.clientY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      rotationRef.current.lastX = e.touches[0].clientX;
      rotationRef.current.lastY = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - rotationRef.current.lastX;
    const dy = e.touches[0].clientY - rotationRef.current.lastY;

    rotationRef.current.ry += dx * 0.008;
    rotationRef.current.rx -= dy * 0.008;
    rotationRef.current.vx = -dy * 0.003;
    rotationRef.current.vy = dx * 0.003;

    rotationRef.current.lastX = e.touches[0].clientX;
    rotationRef.current.lastY = e.touches[0].clientY;
  };

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab select-none active:cursor-grabbing ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={{
        width: "540px",
        height: "540px",
        maxWidth: "92vw",
        maxHeight: "92vw",
        perspective: "1000px",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blush/10 via-accent-blue/5 to-transparent blur-2xl pointer-events-none" />

      {/* Orbit Rings hint */}
      <div className="absolute inset-8 rounded-full border border-soil/5 pointer-events-none" />
      <div className="absolute inset-20 rounded-full border border-soil/5 border-dashed pointer-events-none" />

      {/* Sphere Nodes */}
      <div className="relative h-full w-full">
        {nodes.map((node) => (
          <div
            key={node.id}
            onClick={() => onSelectNode && onSelectNode(node)}
            onMouseEnter={() => setActiveItem(node)}
            onMouseLeave={() => setActiveItem(null)}
            className="absolute cursor-pointer select-none transition-transform duration-100 ease-out hover:scale-125 group"
            style={{
              width: `${node.size || 32}px`,
              height: `${node.size || 32}px`,
              left: `${node.left || 0}px`,
              top: `${node.top || 0}px`,
              opacity: node.alpha || 1,
              zIndex: node.zIndex || 100,
              transform: `translate3d(0,0,0)`,
            }}
          >
            <div
              className={`relative h-full w-full overflow-hidden rounded-full border-2 ${
                node.type === "logo"
                  ? "border-blush bg-soil/95 shadow-[0_0_15px_rgba(242,118,94,0.4)]"
                  : "border-white/40 shadow-lg bg-soil/20 backdrop-blur-xs"
              }`}
            >
              <img
                alt={node.title}
                className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                  node.type === "logo" ? "p-1.5" : ""
                }`}
                draggable="false"
                src={node.img}
                loading="eager"
              />
            </div>

            {/* Micro tooltip on hover */}
            <div className="pointer-events-none absolute left-1/2 -top-12 -translate-x-1/2 flex flex-col items-center justify-center whitespace-nowrap rounded-md bg-soil px-3 py-1.5 text-cream shadow-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-50 border border-white/10">
              <span className="text-[0.72rem] font-bold uppercase tracking-wider">
                {node.title}
              </span>
              {node.desc && (
                <span className="text-[0.62rem] font-sans opacity-80 mt-0.5">
                  {node.desc}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Instruction pill */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-soil/80 backdrop-blur-md px-3 py-1 text-[0.68rem] uppercase tracking-wider text-cream/75 border border-white/10 shadow-sm">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blush animate-ping"></span>
          Drag to explore the chapter
        </span>
      </div>
    </div>
  );
}
