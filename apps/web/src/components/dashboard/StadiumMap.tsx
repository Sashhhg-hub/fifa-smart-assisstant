import { useState, useRef, useEffect } from 'react';

export interface StadiumMapDestination {
  id: string;
  name: string;
  type: 'seat' | 'gate' | 'food' | 'washroom' | 'exit' | 'medical' | 'facility' | 'transport';
  x: number; // Map SVG X-coordinate (0-600 scale)
  y: number; // Map SVG Y-coordinate (0-600 scale)
  details: string;
}

interface StadiumMapProps {
  destinations: StadiumMapDestination[];
  activeDest: StadiumMapDestination | null;
  pathPoints: string | null;
  userPosition?: { x: number; y: number } | null;
  zoom: number;
  setZoom: (z: number) => void;
  panOffset: { x: number; y: number };
  setPanOffset: (offset: { x: number; y: number }) => void;
  onMarkerSelect: (destId: string) => void;
}

export function StadiumMap({
  destinations,
  activeDest,
  pathPoints,
  userPosition = null,
  zoom,
  setZoom,
  panOffset,
  setPanOffset,
  onMarkerSelect,
}: StadiumMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle click dragging (panning)
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return; // Left click only
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.15, 3));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.15, 0.7));
  const handleReset = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Helper to resolve colors/icons for location types
  const getMarkerInfo = (type: StadiumMapDestination['type']) => {
    switch (type) {
      case 'seat':
        return { color: '#22d3ee', emoji: '🎫' }; // Cyan
      case 'gate':
        return { color: '#3b82f6', emoji: '🚪' }; // Blue
      case 'food':
        return { color: '#eab308', emoji: '🍔' }; // Yellow
      case 'washroom':
        return { color: '#a855f7', emoji: '🚻' }; // Purple
      case 'medical':
        return { color: '#ef4444', emoji: '🏥' }; // Red
      case 'exit':
        return { color: '#f97316', emoji: '🚨' }; // Orange
      case 'facility':
        return { color: '#10b981', emoji: '📍' }; // Emerald/Green
      case 'transport':
        return { color: '#6366f1', emoji: '🚌' }; // Indigo
    }
  };

  return (
    <div className="relative h-full w-full select-none overflow-hidden rounded-2xl bg-[#08080c] border border-white/5 shadow-2xl">
      {/* Zoom / Pan Control Panel Overlays */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0a0a0f]/80 text-gray-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
        >
          ➕
        </button>
        <button
          onClick={handleZoomOut}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0a0a0f]/80 text-gray-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
        >
          ➖
        </button>
        <button
          onClick={handleReset}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0a0a0f]/80 text-gray-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white text-xs font-bold"
        >
          RESET
        </button>
      </div>

      {/* Vector SVG Viewport */}
      <svg
        ref={svgRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`h-full w-full touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        viewBox="0 0 600 600"
      >
        {/* Definitions for Gradients, Glow Filters, and Patterns */}
        <defs>
          <radialGradient id="field-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.03" />
          </radialGradient>

          <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="marker-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Global Transform Group (Zoom and Pan offset mapping) */}
        <g transform={`translate(${300 + panOffset.x}, ${300 + panOffset.y}) scale(${zoom}) translate(-300, -300)`}>
          
          {/* 1. STADIUM OUTER RING BOUNDARIES */}
          <circle cx="300" cy="300" r="270" fill="none" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="6" />
          <circle cx="300" cy="300" r="260" fill="none" stroke="#22d3ee" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="10, 8" />
          
          {/* Concourse rings */}
          <circle cx="300" cy="300" r="215" fill="none" stroke="#ffffff" strokeOpacity="0.03" strokeWidth="20" />
          <circle cx="300" cy="300" r="165" fill="none" stroke="#ffffff" strokeOpacity="0.03" strokeWidth="15" />

          {/* 2. SEATING SECTOR ARCS (Upper & Lower Seating Bowls) */}
          <g opacity="0.6">
            {/* Outer/Upper seating bowls (multi-colored block groups) */}
            <path d="M 120 120 A 250 250 0 0 1 480 120 L 440 160 A 200 200 0 0 0 160 160 Z" fill="#3b82f6" fillOpacity="0.08" stroke="#3b82f6" strokeOpacity="0.2" strokeWidth="1.5" />
            <path d="M 480 120 A 250 250 0 0 1 480 480 L 440 440 A 200 200 0 0 0 440 160 Z" fill="#a855f7" fillOpacity="0.08" stroke="#a855f7" strokeOpacity="0.2" strokeWidth="1.5" />
            <path d="M 480 480 A 250 250 0 0 1 120 480 L 160 440 A 200 200 0 0 0 440 440 Z" fill="#22d3ee" fillOpacity="0.08" stroke="#22d3ee" strokeOpacity="0.2" strokeWidth="1.5" />
            <path d="M 120 480 A 250 250 0 0 1 120 120 L 160 160 A 200 200 0 0 0 160 440 Z" fill="#f97316" fillOpacity="0.08" stroke="#f97316" strokeOpacity="0.2" strokeWidth="1.5" />
            
            {/* Sector separation dividers */}
            <line x1="300" y1="30" x2="300" y2="160" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1.5" />
            <line x1="300" y1="440" x2="300" y2="570" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1.5" />
            <line x1="30" y1="300" x2="160" y2="300" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1.5" />
            <line x1="440" y1="300" x2="570" y2="300" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1.5" />
          </g>

          {/* 3. CENTER FIELD SOCCER PITCH */}
          <g>
            {/* Outer boundary buffer */}
            <rect x="220" y="160" width="160" height="280" rx="10" fill="#0c1d1a" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="2" />
            {/* Field Turf */}
            <rect x="230" y="170" width="140" height="260" rx="4" fill="url(#field-gradient)" stroke="#10b981" strokeOpacity="0.25" strokeWidth="2" />
            {/* Center circle */}
            <circle cx="300" cy="300" r="30" fill="none" stroke="#10b981" strokeOpacity="0.2" strokeWidth="1.5" />
            <line x1="230" y1="300" x2="370" y2="300" stroke="#10b981" strokeOpacity="0.2" strokeWidth="1.5" />
            <circle cx="300" cy="300" r="2" fill="#10b981" fillOpacity="0.2" />
            {/* Penalty boxes */}
            <rect x="260" y="170" width="80" height="40" fill="none" stroke="#10b981" strokeOpacity="0.2" strokeWidth="1.5" />
            <rect x="260" y="390" width="80" height="40" fill="none" stroke="#10b981" strokeOpacity="0.2" strokeWidth="1.5" />
          </g>

          {/* 4. ACTIVE NAVIGATION ROUTE OVERLAY */}
          {pathPoints && (
            <g>
              {/* Thick blurred glow background path */}
              <path
                d={pathPoints}
                fill="none"
                stroke="url(#route-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.3"
                filter="url(#route-glow)"
              />
              {/* Dynamic walking animation line */}
              <path
                d={pathPoints}
                fill="none"
                stroke="url(#route-gradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="8, 6"
                className="animate-route-flow"
                style={{
                  strokeDashoffset: 100,
                  animation: 'routeFlow 2s linear infinite',
                }}
              />
            </g>
          )}

          {/* 5. STATIC AMENITIES MARKERS */}
          {destinations.map((dest) => {
            const isSelected = activeDest?.id === dest.id;
            const marker = getMarkerInfo(dest.type);

            return (
              <g
                key={dest.id}
                transform={`translate(${dest.x}, ${dest.y})`}
                onClick={() => onMarkerSelect(dest.id)}
                className="cursor-pointer group"
              >
                {/* Selected target ring halo glow */}
                {isSelected && (
                  <circle
                    cx="0"
                    cy="0"
                    r="16"
                    fill="none"
                    stroke={marker?.color}
                    strokeWidth="3"
                    className="animate-ping"
                    style={{ animationDuration: '2s' }}
                    filter="url(#marker-glow)"
                  />
                )}

                {/* Outer interactive circle */}
                <circle
                  cx="0"
                  cy="0"
                  r="10"
                  fill="#0a0a0f"
                  fillOpacity="0.9"
                  stroke={isSelected ? marker?.color : 'rgba(255,255,255,0.2)'}
                  strokeWidth={isSelected ? '2' : '1'}
                  className="transition-all duration-300 group-hover:stroke-white group-hover:scale-110"
                />

                {/* Inner Icon indicator */}
                <text
                  x="0"
                  y="3.5"
                  textAnchor="middle"
                  className="text-[8px] select-none pointer-events-none"
                >
                  {marker?.emoji}
                </text>

                {/* Popover label on hover */}
                <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <rect
                    x="-50"
                    y="-28"
                    width="100"
                    height="18"
                    rx="4"
                    fill="#0a0a0f"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="-16"
                    textAnchor="middle"
                    fill="#ffffff"
                    className="text-[8px] font-semibold"
                  >
                    {dest.name.length > 18 ? dest.name.substring(0, 16) + '..' : dest.name}
                  </text>
                </g>
              </g>
            );
          })}

          {/* 6. USER CURRENT LOCATION PIN (Pulsing Radar) */}
          {userPosition && (
            <g transform={`translate(${userPosition.x}, ${userPosition.y})`}>
              {/* Outer green pulse ripples */}
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="rgba(34, 211, 238, 0.15)"
                className="animate-ping"
                style={{ animationDuration: '1.8s' }}
              />
              <circle
                cx="0"
                cy="0"
                r="7"
                fill="#22d3ee"
                stroke="#ffffff"
                strokeWidth="2"
                className="shadow-[0_0_15px_#22d3ee]"
              />
              <circle cx="0" cy="0" r="2" fill="#ffffff" />
            </g>
          )}

        </g>
      </svg>

      {/* Styled Route Key Legend overlay */}
      <div className="glass absolute left-6 top-6 z-10 hidden rounded-xl border border-white/5 bg-[#0a0a0f]/80 p-3 text-[10px] text-gray-300 backdrop-blur-md sm:block">
        <div className="font-bold text-white uppercase tracking-wider mb-2 border-b border-white/5 pb-1.5">MAP LEGEND</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#3b82f6]/10 text-xs">🚪</span>
            <span>Gates (Entrances)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#eab308]/10 text-xs">🍔</span>
            <span>Food / Concessions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#a855f7]/10 text-xs">🚻</span>
            <span>Washrooms / Restrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#ef4444]/10 text-xs">🏥</span>
            <span>Medical Centers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#22d3ee]/10 text-xs">🎫</span>
            <span>Your Seat Portal</span>
          </div>
        </div>
      </div>

      {/* CSS Keyframe Animation inject */}
      <style>{`
        @keyframes routeFlow {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
