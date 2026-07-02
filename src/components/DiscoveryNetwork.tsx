"use client";

import { useEffect, useRef, useState } from "react";

interface NetworkNode {
  id: string;
  label: string;
  sublabel: string;
  type: "center" | "founder" | "product" | "user";
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface Connection {
  from: string;
  to: string;
  pulseOffset: number;
}

export function DiscoveryNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    const height = (canvas.height = 500);

    const nodes: NetworkNode[] = [];
    const connections: Connection[] = [];

    // Helper to add nodes
    const addNode = (
      id: string,
      label: string,
      sublabel: string,
      type: "center" | "founder" | "product" | "user",
      fx: number, // fraction of width (0 to 1)
      fy: number  // fraction of height (0 to 1)
    ) => {
      const x = fx * width;
      const y = fy * height;
      nodes.push({
        id,
        label,
        sublabel,
        type,
        x,
        y,
        targetX: x,
        targetY: y,
        vx: 0,
        vy: 0,
        radius: type === "center" ? 18 : type === "product" ? 10 : 8,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    };

    // Initialize nodes based on current dimensions
    const initNodes = () => {
      nodes.length = 0;
      connections.length = 0;

      // Astrava Center Node
      addNode("astrava", "Astrava Hub", "Distribution Center", "center", 0.5, 0.5);

      // Founders (Left)
      addNode("f_paras", "Paras Chopra", "Founder, Wingify", "founder", 0.15, 0.25);
      addNode("f_nithin", "Nithin Kamath", "Founder, Zerodha", "founder", 0.15, 0.5);
      addNode("f_sridhar", "Sridhar Vembu", "Founder, Zoho", "founder", 0.15, 0.75);

      // Products (Middle-Left)
      addNode("p_vwo", "VWO", "A/B Testing", "product", 0.35, 0.3);
      addNode("p_zerodha", "Kite", "Trading Platform", "product", 0.35, 0.5);
      addNode("p_zoho", "Zoho CRM", "SaaS CRM", "product", 0.35, 0.7);

      // Users/Early Adopters (Right)
      addNode("u_founders", "5,000+ Founders", "Growth Cohort", "user", 0.85, 0.25);
      addNode("u_investors", "500+ VC & Angels", "Funding Partners", "user", 0.85, 0.5);
      addNode("u_builders", "12,000+ Operators", "Product Hunt Crew", "user", 0.85, 0.75);

      // Connect Founders to their Products
      connections.push({ from: "f_paras", to: "p_vwo", pulseOffset: 0 });
      connections.push({ from: "f_nithin", to: "p_zerodha", pulseOffset: 0.3 });
      connections.push({ from: "f_sridhar", to: "p_zoho", pulseOffset: 0.6 });

      // Connect Products to Astrava
      connections.push({ from: "p_vwo", to: "astrava", pulseOffset: 0.15 });
      connections.push({ from: "p_zerodha", to: "astrava", pulseOffset: 0.45 });
      connections.push({ from: "p_zoho", to: "astrava", pulseOffset: 0.75 });

      // Connect Astrava to Audiences
      connections.push({ from: "astrava", to: "u_founders", pulseOffset: 0.2 });
      connections.push({ from: "astrava", to: "u_investors", pulseOffset: 0.5 });
      connections.push({ from: "astrava", to: "u_builders", pulseOffset: 0.8 });
    };

    initNodes();

    let animationId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background connection arcs or waves
      ctx.strokeStyle = "rgba(124, 58, 237, 0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width * 0.3, 0, Math.PI * 2);
      ctx.stroke();

      // Physics/Drift for nodes
      const time = Date.now() * 0.001;
      nodes.forEach((node) => {
        // Floating movement using sine/cosine waves
        const driftX = Math.sin(time + node.pulsePhase) * 6;
        const driftY = Math.cos(time * 0.8 + node.pulsePhase) * 6;
        
        // Add subtle mouse repulsion
        const dx = node.targetX - mouseX;
        const dy = node.targetY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let forceX = 0;
        let forceY = 0;
        if (dist < 100) {
          const force = (100 - dist) * 0.08;
          forceX = (dx / dist) * force;
          forceY = (dy / dist) * force;
        }

        node.x = node.targetX + driftX + forceX;
        node.y = node.targetY + driftY + forceY;

        // Pulse phase update
        node.pulsePhase += 0.02;
      });

      // Draw Connections (Lines)
      connections.forEach((conn) => {
        const fromNode = nodes.find((n) => n.id === conn.from);
        const toNode = nodes.find((n) => n.id === conn.to);
        if (!fromNode || !toNode) return;

        // Line color based on connection type
        const grad = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, toNode.y);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.08)");
        grad.addColorStop(1, "rgba(240, 240, 240, 0.08)");
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Little flowing packets of light (pulses)
        const pulseProgress = (time + conn.pulseOffset) % 1.5 / 1.5; // looping progress
        const px = fromNode.x + (toNode.x - fromNode.x) * pulseProgress;
        const py = fromNode.y + (toNode.y - fromNode.y) * pulseProgress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)"; // bright silver/white dot
        ctx.shadowColor = "#FFFFFF";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw Nodes
      nodes.forEach((node) => {
        const isHovered = hoveredNode?.id === node.id;
        const scale = isHovered ? 1.3 : 1;
        const pulse = 1 + Math.sin(time * 2 + node.pulsePhase) * 0.08;

        // Outer pulse ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * scale * pulse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = node.type === "center" 
          ? "rgba(255, 255, 255, 0.04)" 
          : "rgba(240, 240, 240, 0.03)";
        ctx.fill();

        // Secondary ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * scale * pulse * 1.2, 0, Math.PI * 2);
        ctx.strokeStyle = node.type === "center"
          ? "rgba(255, 255, 255, 0.12)"
          : "rgba(240, 240, 240, 0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Solid Inner Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * scale, 0, Math.PI * 2);
        
        if (node.type === "center") {
          ctx.fillStyle = "#FAFAFA"; // Solid white
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        } else if (node.type === "product") {
          ctx.fillStyle = "#71717A"; // Zinc grey
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        } else {
          ctx.fillStyle = "#18181B"; // Zinc
          ctx.strokeStyle = "#52525B"; // Grey borders for founders/users
        }
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        // Highlight center core
        if (node.type === "center") {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#FAFAFA";
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = x;
      mouseY = y;

      // Check collision
      let foundNode: NetworkNode | null = null;
      for (const node of nodes) {
        const dx = node.x - x;
        const dy = node.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Add padding for easier hover trigger
        if (dist < node.radius + 15) {
          foundNode = node;
          break;
        }
      }

      if (foundNode) {
        setHoveredNode(foundNode);
        setTooltipPos({ x: e.clientX, y: e.clientY });
      } else {
        setHoveredNode(null);
      }
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      setHoveredNode(null);
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      initNodes();
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [hoveredNode?.id]);

  return (
    <section id="network" className="py-32 relative bg-background overflow-hidden border-b border-border">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10" ref={containerRef}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs text-primary font-mono uppercase tracking-[0.25em] mb-4 inline-block">
            The Hub
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-sans text-foreground leading-[1.1] tracking-tight mb-4">
            The Discovery Network
          </h2>
          <p className="text-muted-foreground font-sans font-light leading-relaxed">
            Astrava connects founders, products, and audiences together in an automated, highly-vetted distribution pipeline.
          </p>
        </div>

        {/* Node Graph Area */}
        <div className="w-full bg-card/30 border border-border p-4 md:p-6 overflow-hidden relative shadow-2xl backdrop-blur-sm">
          <div className="absolute top-4 left-6 flex items-center gap-6 text-[10px] text-muted-foreground font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full border border-primary bg-zinc-900" />
              Founders
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary-foreground border border-primary" />
              Products
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Astrava Center
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full border border-primary bg-zinc-900" />
              Audience
            </div>
          </div>
          
          <div className="absolute top-4 right-6 text-[10px] text-muted-foreground font-mono animate-pulse">
            ● INTERACTIVE NODES
          </div>

          <canvas ref={canvasRef} className="w-full block bg-transparent" />
        </div>
      </div>

      {/* Node Tooltip */}
      {hoveredNode && (
        <div
          style={{
            position: "fixed",
            left: tooltipPos.x + 15,
            top: tooltipPos.y + 15,
            pointerEvents: "none",
          }}
          className="z-50 min-w-[200px] p-4 bg-zinc-950/95 border border-primary/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-100"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent-foreground">
              {hoveredNode.type}
            </span>
            <h4 className="text-sm font-bold font-sans text-foreground">
              {hoveredNode.label}
            </h4>
            <p className="text-xs font-sans text-muted-foreground">
              {hoveredNode.sublabel}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
