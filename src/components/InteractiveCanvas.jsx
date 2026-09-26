import React, { useEffect, useRef } from "react";

export default function InteractiveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Massive particle count for the dense accretion disk wall
    const PARTICLE_COUNT = reducedMotion ? 500 : isMobile ? 1200 : 3500;

    let cx = width * 0.28; // Black hole on the left
    let cy = height * 0.5;

    const rs = isMobile ? 70 : 120; // Event Horizon Radius
    const fl = 800; // Focal length

    let targetCx = cx;
    let targetCy = cy;
    let mouseX = cx;
    let mouseY = cy;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      cx = width * 0.28;
      cy = height * 0.5;
      targetCx = cx;
      targetCy = cy;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      if (isMobile || reducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      targetCx = cx - (mouseX - cx) * 0.02;
      targetCy = cy - (mouseY - cy) * 0.02;
    };

    const handleMouseLeave = () => {
      targetCx = cx;
      targetCy = cy;
    };

    const parent = canvas.parentElement;
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_<>{}[]/\\+=*&%$#@!";

    class CodeParticle {
      constructor(maxR) {
        this.reset(maxR, true);
      }

      reset(maxR, initial = false) {
        // Highly dense near the event horizon, exponentially thinning out
        this.r = rs + 5 + Math.pow(Math.random(), 2.5) * maxR;
        this.theta = Math.random() * Math.PI * 2;

        // Keplerian velocity (faster near the black hole)
        this.speed = (3 / Math.sqrt(this.r)) * (Math.random() * 0.2 + 0.9);

        // Disk vertical thickness (extremely thin like a real accretion disk)
        this.yBase = (Math.random() - 0.5) * 6;

        this.char = CHARS[Math.floor(Math.random() * CHARS.length)];

        // Temperature/Color mapped by radius
        if (this.r < rs + 50) {
          this.color = "rgba(255, 240, 220, 0.95)"; // Blinding white-hot inner ring
          this.isHot = true;
        } else if (this.r < rs + 160) {
          this.color = "rgba(242, 118, 94, 0.85)"; // CSI Coral / intense orange mid ring
          this.isHot = true;
        } else if (Math.random() < 0.2) {
          this.color = "rgba(180, 210, 255, 0.5)"; // Subtle cool blue accent
          this.isHot = false;
        } else {
          this.color = "rgba(200, 200, 200, 0.4)"; // Faded grey code
          this.isHot = false;
        }

        this.fontSize = Math.random() * 8 + 6;
      }

      update(maxR, dtMultiplier) {
        // Spin the accretion disk
        this.theta -= this.speed * 0.015 * dtMultiplier;

        let x = this.r * Math.cos(this.theta);
        let z = this.r * Math.sin(this.theta);
        this.z = z; // Store for rendering logic

        let scale = fl / (fl + z * 0.6); // 0.6 flattens depth to prevent clipping the huge right wall
        if (scale < 0) return;

        // Pitch tilt of the disk
        this.yBaseProjected = this.yBase - z * 0.28;

        this.px = x * scale;
        this.scale = scale;

        this.isLensed = z > 0;

        if (this.isLensed) {
          let xRatio = Math.abs(x) / this.r;
          let central = Math.sqrt(1 - xRatio * xRatio);

          // Mathematical fake for Gravitational Lensing (Einstein Rings)
          let targetY = rs * 1.05 + (this.r - rs) * 0.4;
          this.bend = (targetY + this.yBaseProjected) * central;
        }
      }

      draw(
        ctx,
        actualCx,
        actualCy,
        maxR,
        isTopLens = false,
        isBottomLens = false,
      ) {
        if (this.scale < 0) return;

        let pyOffset = 0;
        let alphaMultiplier = 1;

        if (this.isLensed) {
          if (isTopLens) {
            pyOffset = -this.bend;
            alphaMultiplier = 0.6; // Slightly faded due to lensing stretching
          } else if (isBottomLens) {
            pyOffset = this.bend;
            alphaMultiplier = 0.6;
          } else {
            return; // Normal drawing disabled for lensed particles
          }
        }

        let py = actualCy + (this.yBaseProjected + pyOffset) * this.scale;
        let px = actualCx + this.px;

        let size = this.fontSize * this.scale;
        if (size < 1 || size > 300) return;

        let alpha = alphaMultiplier;
        // Fade outer edges of the disk
        if (this.r > maxR * 0.7)
          alpha *= 1 - (this.r - maxR * 0.7) / (maxR * 0.3);

        if (alpha <= 0.05) return;

        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = this.color;
        ctx.font = `${this.isHot ? "bold" : "normal"} ${size}px 'IBM Plex Mono', monospace`;
        ctx.fillText(this.char, px, py);
      }
    }

    const maxRadius = Math.max(width, height) * 1.8;
    const particles = Array.from(
      { length: PARTICLE_COUNT },
      () => new CodeParticle(maxRadius),
    );

    let currentCx = cx;
    let currentCy = cy;
    let lastTime = performance.now();

    const drawBlackHole = (ctx, actualCx, actualCy) => {
      ctx.save();
      ctx.translate(actualCx, actualCy);

      // Intense Event Horizon Glow
      const glow = ctx.createRadialGradient(0, 0, rs * 0.9, 0, 0, rs * 2.5);
      glow.addColorStop(0, "rgba(255, 230, 200, 0.8)");
      glow.addColorStop(0.15, "rgba(242, 118, 94, 0.6)");
      glow.addColorStop(0.4, "rgba(242, 118, 94, 0.15)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(0, 0, rs * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.globalCompositeOperation = "screen";
      ctx.fill();

      // The Void
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.arc(0, 0, rs, 0, Math.PI * 2);
      ctx.fillStyle = "#0c0a09"; // Matches Tailwind bg-soil exactly
      ctx.fill();

      // Crisp photon ring
      ctx.beginPath();
      ctx.arc(0, 0, rs + 1, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 240, 220, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    const render = (currentTime) => {
      let dt = currentTime - lastTime;
      if (dt > 100) dt = 16;
      lastTime = currentTime;
      const dtMultiplier = dt / 16.66;

      ctx.clearRect(0, 0, width, height);

      currentCx += (targetCx - currentCx) * 0.05 * dtMultiplier;
      currentCy += (targetCy - currentCy) * 0.05 * dtMultiplier;

      // 1. Update all particles
      particles.forEach((p) => p.update(maxRadius, dtMultiplier));

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 2. Draw Lensed Particles (Behind the black hole)
      const lensed = particles.filter((p) => p.isLensed);
      // Sort lensed particles back-to-front
      lensed.sort((a, b) => b.z - a.z);

      lensed.forEach((p) => {
        p.draw(ctx, currentCx, currentCy, maxRadius, true, false); // Top arc
        p.draw(ctx, currentCx, currentCy, maxRadius, false, true); // Bottom arc
      });

      // 3. Draw The Black Hole Void & Glow (Covers the middle of the lensed lines)
      drawBlackHole(ctx, currentCx, currentCy);

      // 4. Draw Foreground Particles (In front of the black hole)
      const front = particles.filter((p) => !p.isLensed);
      // Sort front particles back-to-front
      front.sort((a, b) => b.z - a.z);

      front.forEach((p) => p.draw(ctx, currentCx, currentCy, maxRadius));

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
