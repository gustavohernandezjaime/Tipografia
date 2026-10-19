import React, { useState } from 'react';
import { TypographicEra } from '../data/typographyHistory';
import { Eye, RotateCcw, ZoomIn, Ruler, Crosshair } from 'lucide-react';

interface GlyphViewerProps {
  era: TypographicEra;
  selectedLetter: string;
  onSelectLetter?: (letter: string) => void;
  showAxisGuide?: boolean;
  showContrastCaliper?: boolean;
  showSerifLoupe?: boolean;
  showMetricLines?: boolean;
  showDuctusVector?: boolean;
  interactiveControls?: boolean;
  customAxis?: number;
  customContrast?: number;
  customWeight?: number;
  customSerifType?: string;
}

export const GlyphViewer: React.FC<GlyphViewerProps> = ({
  era,
  selectedLetter = 'O',
  onSelectLetter,
  showAxisGuide = true,
  showContrastCaliper = true,
  showSerifLoupe = true,
  showMetricLines = true,
  showDuctusVector = true,
  interactiveControls = true,
  customAxis,
  customContrast,
  customWeight,
  customSerifType,
}) => {
  const [internalLetter, setInternalLetter] = useState(selectedLetter);
  const activeLetter = selectedLetter || internalLetter;

  // Local state for diagnostics toggles if controls are enabled
  const [axisOn, setAxisOn] = useState(showAxisGuide);
  const [contrastOn, setContrastOn] = useState(showContrastCaliper);
  const [loupeOn, setLoupeOn] = useState(showSerifLoupe);
  const [metricsOn, setMetricsOn] = useState(showMetricLines);
  const [ductusOn, setDuctusOn] = useState(showDuctusVector);

  const axisAngle = customAxis !== undefined ? customAxis : era.axisAngle;
  const contrastRatio = customContrast !== undefined ? customContrast : era.contrastRatio;
  const effectiveSerifType = customSerifType !== undefined ? customSerifType : era.serifType;

  const handleLetterChange = (letter: string) => {
    setInternalLetter(letter);
    if (onSelectLetter) onSelectLetter(letter);
  };

  // SVG dimensions
  const viewBoxWidth = 500;
  const viewBoxHeight = 500;
  const cx = viewBoxWidth / 2;
  const cy = viewBoxHeight / 2;

  // Typographic baseline coordinates
  const capHeightY = 90;
  const xHeightY = 190;
  const baselineY = 380;
  const descenderY = 460;
  const ascenderY = 50;

  // SVG rendering calculations based on letter and era parameters
  const renderGlyphPath = () => {
    const isSans = effectiveSerifType.includes('Suprimida') || effectiveSerifType.includes('Inexistente');
    const isSlab = effectiveSerifType.includes('Cuadrada') || effectiveSerifType.includes('Bloque');
    const isHairline = effectiveSerifType.includes('Filiforme');
    const isBracketed = effectiveSerifType.includes('cartabón') || effectiveSerifType.includes('cóncava');

    // Weight and contrast calculations
    const baseWeight = customWeight !== undefined ? customWeight : 36;
    const maxStroke = Math.min(68, Math.max(14, baseWeight * (contrastRatio > 8 ? 1.3 : 1.0)));
    const minStroke = Math.max(2.5, maxStroke / Math.max(1, contrastRatio));

    if (activeLetter === 'O') {
      // Procedural elliptical 'O' rotated by axisAngle
      const outerRx = 150;
      const outerRy = 145;
      const innerRx = Math.max(15, outerRx - maxStroke);
      const innerRy = Math.max(15, outerRy - minStroke);

      return (
        <g id="glyph-O">
          {/* Rotated group for axis of modulation */}
          <g transform={`rotate(${-axisAngle}, ${cx}, ${cy})`}>
            {/* Outer contour */}
            <path
              d={`
                M ${cx - outerRx} ${cy}
                A ${outerRx} ${outerRy} 0 1 0 ${cx + outerRx} ${cy}
                A ${outerRx} ${outerRy} 0 1 0 ${cx - outerRx} ${cy}
                Z
                M ${cx - innerRx} ${cy}
                A ${innerRx} ${innerRy} 0 1 1 ${cx + innerRx} ${cy}
                A ${innerRx} ${innerRy} 0 1 1 ${cx - innerRx} ${cy}
                Z
              `}
              fill="#1C1917"
              fillRule="evenodd"
              className="transition-all duration-300"
            />
          </g>
        </g>
      );
    }

    if (activeLetter === 'e') {
      // Lowercase 'e' with characteristic eye and crossbar (inclined vs horizontal)
      const eBarAngle = era.id === 'humanist-venetian' ? -18 : 0;
      const r = 110;
      return (
        <g id="glyph-e" transform={`translate(0, 30)`}>
          {/* Main bowl */}
          <ellipse cx={cx} cy={cy - 20} rx={r} ry={r * 0.9} fill="none" stroke="#1C1917" strokeWidth={maxStroke} />
          {/* Inner counter mask & crossbar */}
          <line
            x1={cx - r * 0.85}
            y1={cy - 25}
            x2={cx + r * 0.85}
            y2={cy - 25 + (eBarAngle * 1.5)}
            stroke="#1C1917"
            strokeWidth={Math.max(4, minStroke * 1.4)}
            strokeLinecap="round"
          />
          {/* Lower aperture terminal */}
          {isHairline ? (
            <circle cx={cx + r * 0.75} cy={cy + 55} r={minStroke * 1.8} fill="#1C1917" />
          ) : isBracketed ? (
            <path
              d={`M ${cx + r * 0.65} ${cy + 60} Q ${cx + r * 0.9} ${cy + 40} ${cx + r * 0.85} ${cy + 25}`}
              stroke="#1C1917"
              strokeWidth={minStroke * 2}
              fill="none"
            />
          ) : null}
        </g>
      );
    }

    if (activeLetter === 'A') {
      // Capital 'A' showing left thin stem, right thick stem, apex and crossbar
      const apexX = cx;
      const apexY = capHeightY;
      const leftBaseX = cx - 140;
      const rightBaseX = cx + 140;
      const baseY = baselineY;
      const crossbarY = baselineY - 100;

      return (
        <g id="glyph-A">
          {/* Left hairline / thin diagonal */}
          <line
            x1={apexX - 5}
            y1={apexY}
            x2={leftBaseX}
            y2={baseY}
            stroke="#1C1917"
            strokeWidth={minStroke * 1.3}
            strokeLinecap="butt"
          />
          {/* Right thick diagonal */}
          <line
            x1={apexX + 5}
            y1={apexY}
            x2={rightBaseX}
            y2={baseY}
            stroke="#1C1917"
            strokeWidth={maxStroke}
            strokeLinecap="butt"
          />
          {/* Horizontal crossbar */}
          <line
            x1={cx - 75}
            y1={crossbarY}
            x2={cx + 70}
            y2={crossbarY}
            stroke="#1C1917"
            strokeWidth={Math.max(4, minStroke * 1.1)}
          />

          {/* Serifs at the bases */}
          {!isSans && (
            <>
              {/* Left base serif */}
              {isHairline ? (
                <line x1={leftBaseX - 35} y1={baseY} x2={leftBaseX + 35} y2={baseY} stroke="#1C1917" strokeWidth={minStroke} />
              ) : isSlab ? (
                <rect x={leftBaseX - 45} y={baseY - maxStroke * 0.4} width={90} height={maxStroke * 0.4} fill="#1C1917" />
              ) : (
                <path
                  d={`M ${leftBaseX - 45} ${baseY} C ${leftBaseX - 20} ${baseY} ${leftBaseX - 10} ${baseY - 18} ${leftBaseX} ${baseY - 30} C ${leftBaseX + 10} ${baseY - 18} ${leftBaseX + 20} ${baseY} ${leftBaseX + 45} ${baseY} Z`}
                  fill="#1C1917"
                />
              )}

              {/* Right base serif */}
              {isHairline ? (
                <line x1={rightBaseX - 35} y1={baseY} x2={rightBaseX + 35} y2={baseY} stroke="#1C1917" strokeWidth={minStroke} />
              ) : isSlab ? (
                <rect x={rightBaseX - 45} y={baseY - maxStroke * 0.4} width={90} height={maxStroke * 0.4} fill="#1C1917" />
              ) : (
                <path
                  d={`M ${rightBaseX - 45} ${baseY} C ${rightBaseX - 20} ${baseY} ${rightBaseX - 10} ${baseY - 18} ${rightBaseX} ${baseY - 30} C ${rightBaseX + 10} ${baseY - 18} ${rightBaseX + 20} ${baseY} ${rightBaseX + 45} ${baseY} Z`}
                  fill="#1C1917"
                />
              )}
            </>
          )}
        </g>
      );
    }

    if (activeLetter === 'R') {
      // Capital 'R': Vertical stem, upper bowl, and diagonal leg with serif
      const stemX = cx - 90;
      return (
        <g id="glyph-R">
          {/* Vertical main stem */}
          <line x1={stemX} y1={capHeightY} x2={stemX} y2={baselineY} stroke="#1C1917" strokeWidth={maxStroke} />

          {/* Upper bowl */}
          <path
            d={`M ${stemX} ${capHeightY} H ${stemX + 80} C ${stemX + 160} ${capHeightY} ${stemX + 160} ${cy - 20} ${stemX + 80} ${cy - 20} H ${stemX}`}
            fill="none"
            stroke="#1C1917"
            strokeWidth={minStroke * 1.6}
            strokeLinecap="round"
          />

          {/* Diagonal leg */}
          <path
            d={`M ${stemX + 50} ${cy - 20} C ${stemX + 90} ${cy + 50} ${stemX + 110} ${baselineY - 40} ${stemX + 150} ${baselineY}`}
            fill="none"
            stroke="#1C1917"
            strokeWidth={maxStroke * 0.9}
            strokeLinecap="round"
          />

          {/* Stem base serif */}
          {!isSans && (
            <>
              {isHairline ? (
                <line x1={stemX - 40} y1={baselineY} x2={stemX + 40} y2={baselineY} stroke="#1C1917" strokeWidth={minStroke} />
              ) : isSlab ? (
                <rect x={stemX - 45} y={baselineY - maxStroke * 0.35} width={90} height={maxStroke * 0.35} fill="#1C1917" />
              ) : (
                <path
                  d={`M ${stemX - 45} ${baselineY} C ${stemX - 20} ${baselineY} ${stemX - 10} ${baselineY - 15} ${stemX} ${baselineY - 25} C ${stemX + 10} ${baselineY - 15} ${stemX + 20} ${baselineY} ${stemX + 45} ${baselineY} Z`}
                  fill="#1C1917"
                />
              )}
            </>
          )}
        </g>
      );
    }

    if (activeLetter === 'g') {
      // Lowercase 'g' with ear, upper counter, link and loop
      return (
        <g id="glyph-g">
          {/* Upper bowl */}
          <circle cx={cx} cy={cy - 60} r={65} fill="none" stroke="#1C1917" strokeWidth={maxStroke * 0.8} />
          {/* Lower loop */}
          <ellipse cx={cx - 10} cy={cy + 75} rx={75} ry={45} fill="none" stroke="#1C1917" strokeWidth={minStroke * 1.8} />
          {/* Link / neck */}
          <path d={`M ${cx + 15} ${cy + 5} Q ${cx - 5} ${cy + 30} ${cx - 20} ${cy + 35}`} stroke="#1C1917" strokeWidth={minStroke * 1.5} fill="none" />
          {/* Ear on top right */}
          {!isSans && (
            <circle cx={cx + 55} cy={cy - 105} r={isHairline ? minStroke * 1.8 : 8} fill="#1C1917" />
          )}
        </g>
      );
    }

    // Default: 'S'
    return (
      <g id="glyph-S">
        <path
          d={`
            M ${cx + 80} ${capHeightY + 40}
            C ${cx + 40} ${capHeightY} ${cx - 70} ${capHeightY + 10} ${cx - 70} ${capHeightY + 70}
            C ${cx - 70} ${capHeightY + 140} ${cx + 75} ${capHeightY + 140} ${cx + 75} ${baselineY - 80}
            C ${cx + 75} ${baselineY} ${cx - 20} ${baselineY + 10} ${cx - 80} ${baselineY - 30}
          `}
          fill="none"
          stroke="#1C1917"
          strokeWidth={maxStroke}
          strokeLinecap="round"
        />
        {/* Terminal droplets/teardrops or serifs */}
        {isHairline && (
          <>
            <circle cx={cx + 80} cy={capHeightY + 40} r={minStroke * 2} fill="#1C1917" />
            <circle cx={cx - 80} cy={baselineY - 30} r={minStroke * 2} fill="#1C1917" />
          </>
        )}
      </g>
    );
  };

  return (
    <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl overflow-hidden shadow-xs">
      {/* Top bar with Letter Switcher & Diagnostic Toggles */}
      <div className="p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50/70">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
            Glifo de Análisis:
          </span>
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded p-0.5">
            {['O', 'A', 'e', 'g', 'R', 'S'].map((l) => (
              <button
                key={l}
                onClick={() => handleLetterChange(l)}
                className={`w-8 h-8 rounded text-sm font-serif font-bold transition-colors ${
                  activeLetter === l
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Diagnostics Toggles */}
        {interactiveControls && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setAxisOn(!axisOn)}
              className={`px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                axisOn
                  ? 'bg-amber-100/70 border-amber-300 text-amber-900 font-medium'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <RotateCcw className="w-3 h-3 text-[#9A3412]" />
              <span>Eje ({axisAngle}°)</span>
            </button>

            <button
              onClick={() => setContrastOn(!contrastOn)}
              className={`px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                contrastOn
                  ? 'bg-blue-100/70 border-blue-300 text-blue-900 font-medium'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Crosshair className="w-3 h-3 text-blue-700" />
              <span>Contraste ({contrastRatio}:1)</span>
            </button>

            <button
              onClick={() => setLoupeOn(!loupeOn)}
              className={`px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                loupeOn
                  ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900 font-medium'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <ZoomIn className="w-3 h-3 text-emerald-700" />
              <span>Lupa Serifa</span>
            </button>

            <button
              onClick={() => setMetricsOn(!metricsOn)}
              className={`px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                metricsOn
                  ? 'bg-stone-200 border-stone-400 text-stone-900 font-medium'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Ruler className="w-3 h-3 text-stone-700" />
              <span>Guías Métricas</span>
            </button>
          </div>
        )}
      </div>

      {/* Main SVG Canvas Area */}
      <div className="relative w-full aspect-square max-h-[520px] mx-auto flex items-center justify-center p-4">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#1C1917_1px,transparent_1px)] [background-size:16px_16px]" />

        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-full max-w-[480px] max-h-[480px] drop-shadow-xs"
        >
          {/* DEFINITIONS FOR MARKERS */}
          <defs>
            <marker
              id="axis-arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#9A3412" />
            </marker>
            <marker
              id="caliper-arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 2 L 8 5 L 0 8 z" fill="#1E3A8A" />
            </marker>
          </defs>

          {/* 1. TYPOGRAPHIC METRIC LINES */}
          {metricsOn && (
            <g id="metric-lines" opacity="0.85">
              {/* Cap Height line */}
              <line x1="30" y1={capHeightY} x2="470" y2={capHeightY} stroke="#A8A29E" strokeWidth="1" strokeDasharray="4 3" />
              <text x="35" y={capHeightY - 5} fill="#78716C" fontSize="10" fontFamily="monospace">
                ALTURA DE CAPITALES (100%)
              </text>

              {/* x-height line */}
              <line x1="30" y1={xHeightY} x2="470" y2={xHeightY} stroke="#B45309" strokeWidth="1" strokeDasharray="4 3" />
              <text x="35" y={xHeightY - 5} fill="#B45309" fontSize="10" fontFamily="monospace">
                ALTURA DE X ({Math.round(era.xHeightRatio * 100)}%)
              </text>

              {/* Baseline */}
              <line x1="30" y1={baselineY} x2="470" y2={baselineY} stroke="#1C1917" strokeWidth="1.5" />
              <text x="35" y={baselineY + 14} fill="#1C1917" fontSize="10" fontWeight="bold" fontFamily="monospace">
                LÍNEA DE BASE (0)
              </text>

              {/* Descender line */}
              <line x1="30" y1={descenderY} x2="470" y2={descenderY} stroke="#A8A29E" strokeWidth="1" strokeDasharray="4 3" />
              <text x="35" y={descenderY + 12} fill="#78716C" fontSize="10" fontFamily="monospace">
                LÍNEA DE DESCENDENTES (-25%)
              </text>
            </g>
          )}

          {/* 2. THE ACTUAL GLYPH */}
          {renderGlyphPath()}

          {/* 3. AXIS PROTRACTOR & VECTOR */}
          {axisOn && (
            <g id="axis-visualizer">
              {/* Center pivot point */}
              <circle cx={cx} cy={cy} r="3" fill="#9A3412" />

              {/* Protractor Arc */}
              <path
                d={`M ${cx} ${cy - 160} A 160 160 0 0 0 ${cx - 160 * Math.sin((axisAngle * Math.PI) / 180)} ${cy - 160 * Math.cos((axisAngle * Math.PI) / 180)}`}
                fill="none"
                stroke="#9A3412"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />

              {/* Vertical Reference line (0° / 90° pure modern vertical) */}
              <line
                x1={cx}
                y1={cy - 200}
                x2={cx}
                y2={cy + 200}
                stroke="#D6D3D1"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Tilted Axis Line based on historical angle */}
              <line
                x1={cx - 190 * Math.sin((axisAngle * Math.PI) / 180)}
                y1={cy + 190 * Math.cos((axisAngle * Math.PI) / 180)}
                x2={cx + 190 * Math.sin((axisAngle * Math.PI) / 180)}
                y2={cy - 190 * Math.cos((axisAngle * Math.PI) / 180)}
                stroke="#9A3412"
                strokeWidth="2.5"
                markerEnd="url(#axis-arrow)"
              />

              {/* Angle Tag badge */}
              <rect
                x={cx - 70}
                y={cy - 215}
                width="140"
                height="22"
                rx="4"
                fill="#9A3412"
              />
              <text
                x={cx}
                y={cy - 200}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                EJE: {axisAngle === 0 ? '0° (VERTICAL PURA)' : `${axisAngle}° INCLINADO`}
              </text>
            </g>
          )}

          {/* 4. CONTRAST CALIPERS */}
          {contrastOn && (
            <g id="contrast-calipers">
              {/* Thick stroke caliper callout (left or right) */}
              <g transform="translate(370, 220)">
                <line x1="0" y1="-25" x2="0" y2="25" stroke="#1E3A8A" strokeWidth="2" />
                <line x1="-15" y1="-25" x2="15" y2="-25" stroke="#1E3A8A" strokeWidth="2" />
                <line x1="-15" y1="25" x2="15" y2="25" stroke="#1E3A8A" strokeWidth="2" />
                <rect x="10" y="-12" width="75" height="24" rx="3" fill="#1E3A8A" />
                <text x="47" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  HASTA: MAX
                </text>
              </g>

              {/* Thin stroke caliper callout (top) */}
              <g transform="translate(250, 70)">
                <line x1="-20" y1="0" x2="20" y2="0" stroke="#1E3A8A" strokeWidth="2" />
                <line x1="-20" y1="-10" x2="-20" y2="10" stroke="#1E3A8A" strokeWidth="2" />
                <line x1="20" y1="-10" x2="20" y2="10" stroke="#1E3A8A" strokeWidth="2" />
                <rect x="-45" y="-30" width="90" height="20" rx="3" fill="#1E3A8A" />
                <text x="0" y="-16" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  PERFIL: {contrastRatio}:1
                </text>
              </g>
            </g>
          )}

          {/* 5. SERIF ZOOM LOUPE INSET */}
          {loupeOn && !effectiveSerifType.includes('Suprimida') && !effectiveSerifType.includes('Inexistente') && (
            <g id="serif-loupe" transform="translate(330, 310)">
              {/* Loupe circular container */}
              <circle cx="60" cy="60" r="55" fill="#FAF8F5" stroke="#047857" strokeWidth="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />

              {/* Zoomed Serif Detail rendering */}
              {effectiveSerifType.includes('Filiforme') ? (
                // Hairline flat 90 deg Didone serif
                <g transform="translate(60, 60)">
                  <rect x="-40" y="-4" width="80" height="4" fill="#047857" />
                  <rect x="-12" y="-40" width="24" height="36" fill="#1C1917" />
                  <line x1="-38" y1="8" x2="38" y2="8" stroke="#047857" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="0" y="24" textAnchor="middle" fill="#047857" fontSize="8" fontFamily="monospace" fontWeight="bold">
                    ÁNGULO RECTO 90° (SIN CARTABÓN)
                  </text>
                </g>
              ) : effectiveSerifType.includes('Slab') || effectiveSerifType.includes('Bloque') ? (
                // Slab rectangular block serif
                <g transform="translate(60, 60)">
                  <rect x="-40" y="-15" width="80" height="25" fill="#047857" />
                  <rect x="-15" y="-45" width="30" height="30" fill="#1C1917" />
                  <text x="0" y="26" textAnchor="middle" fill="#047857" fontSize="8" fontFamily="monospace" fontWeight="bold">
                    BLOQUE MECÁNICO (SLAB)
                  </text>
                </g>
              ) : (
                // Triangular bracketed serif (Trajan / Garalde / Transitional)
                <g transform="translate(60, 60)">
                  <path
                    d="M -45 5 C -25 5 -15 -10 -10 -35 L 10 -35 C 15 -10 25 5 45 5 Z"
                    fill="#047857"
                  />
                  <rect x="-10" y="-45" width="20" height="15" fill="#1C1917" />
                  <text x="0" y="24" textAnchor="middle" fill="#047857" fontSize="8" fontFamily="monospace" fontWeight="bold">
                    CARTABÓN CÓNCAVO
                  </text>
                </g>
              )}

              {/* Badge */}
              <rect x="15" y="-10" width="90" height="18" rx="3" fill="#047857" />
              <text x="60" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">
                LUPA DE SERIFA
              </text>
            </g>
          )}
        </svg>

        {/* Live metric summary pill in lower corner */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs border border-stone-200 rounded-md p-2.5 shadow-xs text-xs space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-stone-500 font-mono text-[11px]">EJE ANGULAR:</span>
            <span className="font-mono font-bold text-stone-900">{axisAngle}°</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-stone-500 font-mono text-[11px]">CONTRASTE:</span>
            <span className="font-mono font-bold text-stone-900">{contrastRatio}:1 ({era.contrastLevel})</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-stone-500 font-mono text-[11px]">REMATE:</span>
            <span className="font-mono font-medium text-[#9A3412] max-w-[130px] truncate">{effectiveSerifType}</span>
          </div>
        </div>
      </div>

      {/* Explanatory footer for the active glyph */}
      <div className="p-4 bg-stone-100/60 border-t border-stone-200 text-xs text-stone-700 leading-relaxed">
        <span className="font-semibold text-stone-900">Lectura Anatómica: </span>
        {activeLetter === 'O' && (
          <span>
            La letra <strong>\'O\'</strong> es la prueba de fuego de la modulación. El eje se observa uniendo los puntos de menor grosor ({axisAngle}°). En {era.name}, el contraste es de <strong>{contrastRatio}:1</strong> con ductus de {era.ductusType.toLowerCase()}.
          </span>
        )}
        {activeLetter === 'e' && (
          <span>
            En la <strong>\'e\'</strong> minúscula se examina la barra transversal (oblicua en venecianas humanistas, horizontal en garaldas) y la amplitud del ojo interno.
          </span>
        )}
        {activeLetter === 'A' && (
          <span>
            La <strong>\'A\'</strong> exhibe el contraste directo entre el asta fina ascendente izquierda y el asta gruesa derecha, culminando en serifas {effectiveSerifType.toLowerCase()}.
          </span>
        )}
        {activeLetter === 'R' && (
          <span>
            La <strong>\'R\'</strong> revela la estabilidad arquitectónica romana: asta vertical, panza superior y cola diagonal apoyada en la línea de base.
          </span>
        )}
        {activeLetter === 'g' && (
          <span>
            La <strong>\'g\'</strong> de doble bucle (típica renacentista y garalda) exhibe la oreja superior, el cuello o enlace, y la contraforma inferior.
          </span>
        )}
        {activeLetter === 'S' && (
          <span>
            La <strong>\'S\'</strong> muestra la curvatura sinuosa de la espina central y la resolución de los terminales en gota, pico o corte neto.
          </span>
        )}
      </div>
    </div>
  );
};
