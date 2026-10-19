import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Download, 
  Printer, 
  Sparkles, 
  Layers, 
  Bookmark, 
  Check, 
  Info,
  Maximize2,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

export interface ParametricPreset {
  id: string;
  name: string;
  period: string;
  year: string;
  axis: number;
  contrast: number;
  weight: number;
  serif: string;
  note: string;
}

export const HISTORICAL_PRESETS: ParametricPreset[] = [
  {
    id: 'jenson',
    name: 'Nicolas Jenson (1470)',
    period: 'Renacentista / Humanista',
    year: '1470',
    axis: 25,
    contrast: 1.8,
    weight: 36,
    serif: 'Triangular con cartabón cóncavo',
    note: 'Eje oblicuo pronunciado de pluma ancha a 25° y bajo contraste.'
  },
  {
    id: 'garamond',
    name: 'Claude Garamond (1540)',
    period: 'Barroca / Garalda',
    year: '1540',
    axis: 15,
    contrast: 3.2,
    weight: 38,
    serif: 'Triangular con cartabón fluido',
    note: 'Equilibrio clásico: eje moderado a 15° y cartela curva suave.'
  },
  {
    id: 'baskerville',
    name: 'John Baskerville (1757)',
    period: 'Neoclásica / Racionalista',
    year: '1757',
    axis: 6,
    contrast: 6.5,
    weight: 42,
    serif: 'Afilada con sutil cartela horizontal',
    note: 'Racionalismo cartesiano: eje casi vertical y alto contraste.'
  },
  {
    id: 'bodoni',
    name: 'Giambattista Bodoni (1798)',
    period: 'Romántica / Didona',
    year: '1798',
    axis: 0,
    contrast: 12.0,
    weight: 46,
    serif: 'Filiforme recta a 90° sin cartela',
    note: 'Geometría a plomo: eje a 90° exactos, perfiles finos y ángulo recto puro.'
  },
  {
    id: 'clarendon',
    name: 'Clarendon / Besley (1845)',
    period: 'Mecánica / Slab Serif',
    year: '1845',
    axis: 0,
    contrast: 1.25,
    weight: 48,
    serif: 'Cuadrada pesada en bloque (Slab)',
    note: 'Fuerza industrial: serifas en bloque pesadas con cartabón de soporte.'
  },
  {
    id: 'futura',
    name: 'Futura / Paul Renner (1927)',
    period: 'Modernista / Geométrica',
    year: '1927',
    axis: 0,
    contrast: 1.05,
    weight: 32,
    serif: 'Suprimida (Sans-Serif)',
    note: 'Vanguardia Bauhaus: círculo puro y supresión total de ornamentos.'
  }
];

export const SERIF_STYLES = [
  'Triangular con cartabón cóncavo',
  'Triangular con cartabón fluido',
  'Filiforme recta a 90° sin cartela',
  'Cuadrada pesada en bloque (Slab)',
  'Suprimida (Sans-Serif)',
  'Italiana invertida (Pesada)'
];

export const WorkshopModule: React.FC = () => {
  // Variant Name & Test specimen text
  const [variantName, setVariantName] = useState<string>('Mi Garalda Experimental');
  const [customWord, setCustomWord] = useState<string>('A');

  // Parametric sliders
  const [axisAngle, setAxisAngle] = useState<number>(18);
  const [contrastRatio, setContrastRatio] = useState<number>(3.6);
  const [strokeWeight, setStrokeWeight] = useState<number>(38);
  const [serifStyle, setSerifStyle] = useState<string>(SERIF_STYLES[0]);

  // Target letter for single glyph inspection
  const [targetGlyph, setTargetGlyph] = useState<'A' | 'O' | 'H' | 'I' | 'n'>('A');

  // Comparative mode: STRICTLY SUPERIMPOSED (Sobrepuesta)
  const [showOverlayRef, setShowOverlayRef] = useState<boolean>(true);
  const [comparePresetId, setComparePresetId] = useState<string>('garamond');
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0.45);

  // Saved user variants list in memory
  const [savedVariants, setSavedVariants] = useState<Array<{
    name: string;
    axis: number;
    contrast: number;
    weight: number;
    serif: string;
    date: string;
  }>>([
    {
      name: 'Garalda Neoclásica Híbrida',
      axis: 12,
      contrast: 5.2,
      weight: 40,
      serif: 'Triangular con cartabón fluido',
      date: 'Hoy'
    }
  ]);

  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Reference preset object
  const comparePreset = HISTORICAL_PRESETS.find((p) => p.id === comparePresetId) || HISTORICAL_PRESETS[1];

  const handleApplyPreset = (preset: ParametricPreset) => {
    setAxisAngle(preset.axis);
    setContrastRatio(preset.contrast);
    setStrokeWeight(preset.weight);
    setSerifStyle(preset.serif);
    setVariantName(`Variante inspirada en ${preset.name.split('(')[0].trim()}`);
  };

  const handleSaveVariant = () => {
    const newVariant = {
      name: variantName || 'Variante Sin Título',
      axis: axisAngle,
      contrast: contrastRatio,
      weight: strokeWeight,
      serif: serifStyle,
      date: 'Ahora'
    };
    setSavedVariants((prev) => [newVariant, ...prev]);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2200);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  // Dynamic font sizing for custom text: scales down smoothly as letter count grows
  const getDynamicFontSize = (text: string) => {
    const len = Math.max(1, text.trim().length);
    if (len === 1) return 190;
    if (len === 2) return 145;
    if (len === 3) return 110;
    if (len <= 5) return 80;
    if (len <= 8) return 56;
    if (len <= 12) return 40;
    return 30;
  };

  // =========================================================================
  // PARAMETRIC VECTOR GLYPH RENDERING ENGINE
  // Mathematically calculated Bézier geometry with miter apex joints, 
  // genuine calligraphic axis stress, and true architectural serifs.
  // =========================================================================
  const renderParametricGlyph = (
    axis: number,
    contrast: number,
    weight: number,
    serif: string,
    color = '#0F172A',
    showGuides = true,
    uniqueId = 'main'
  ) => {
    const cx = 150;
    const cy = 150;
    
    // Continuous stroke modulation calculation
    const thick = weight; 
    // Ensure hairline has guaranteed legibility and proportional thinning
    const thin = Math.max(4, Math.round((thick / Math.max(1.0, contrast)) * 10) / 10);

    // Outer ellipse dimensions for 'O'
    const rxOuter = 82;
    const ryOuter = 104;

    // Counter dimensions for 'O'
    const rxInner = Math.max(10, rxOuter - thick);
    const ryInner = Math.max(10, ryOuter - thin);

    // Identify serif morphology
    const isSlab = serif.includes('Slab') || serif.includes('Cuadrada');
    const isDidone = serif.includes('Didona') || serif.includes('Filiforme');
    const isBracketed = serif.includes('cartabón') || serif.includes('cóncavo') || serif.includes('fluido') || serif.includes('Triangular');
    const isSans = serif.includes('Sans-Serif') || serif.includes('Suprimida');
    const isItaliana = serif.includes('Italiana') || serif.includes('invertida');

    // Helper to render authentic architectural serifs
    const renderStemSerif = (stemX: number, stemY: number, stemW: number, direction: 'top' | 'bottom') => {
      if (isSans) return null;

      if (isDidone) {
        // Pure 90° unbracketed hairline (Bodoni)
        const sH = Math.max(3, Math.min(5, Math.round(thin)));
        const sW = 16;
        const posY = direction === 'top' ? stemY - sH : stemY;
        return (
          <rect
            x={stemX - stemW / 2 - sW}
            y={posY}
            width={stemW + sW * 2}
            height={sH}
            fill={color}
          />
        );
      }

      if (isSlab) {
        // Massive rectangular block (Clarendon / Egyptian)
        const sH = Math.max(9, Math.round(thick * 0.28));
        const sW = 16;
        const posY = direction === 'top' ? stemY - sH : stemY;
        return (
          <rect
            x={stemX - stemW / 2 - sW}
            y={posY}
            width={stemW + sW * 2}
            height={sH}
            fill={color}
          />
        );
      }

      if (isItaliana) {
        // Inverted heavy slab
        const sH = Math.max(18, Math.round(thick * 0.65));
        const sW = 24;
        const posY = direction === 'top' ? stemY - sH : stemY;
        return (
          <rect
            x={stemX - stemW / 2 - sW}
            y={posY}
            width={stemW + sW * 2}
            height={sH}
            fill={color}
          />
        );
      }

      if (isBracketed) {
        // Classical curved bracket (Cartela / Apófige)
        const sW = 14;
        const sH = 6;
        const bracketH = 12;
        const leftX = stemX - stemW / 2;
        const rightX = stemX + stemW / 2;

        if (direction === 'top') {
          return (
            <path
              d={`
                M ${leftX - sW} ${stemY - sH}
                L ${rightX + sW} ${stemY - sH}
                L ${rightX + sW} ${stemY}
                Q ${rightX} ${stemY} ${rightX} ${stemY + bracketH}
                L ${leftX} ${stemY + bracketH}
                Q ${leftX} ${stemY} ${leftX - sW} ${stemY}
                Z
              `}
              fill={color}
            />
          );
        } else {
          return (
            <path
              d={`
                M ${leftX - sW} ${stemY + sH}
                L ${rightX + sW} ${stemY + sH}
                L ${rightX + sW} ${stemY}
                Q ${rightX} ${stemY} ${rightX} ${stemY - bracketH}
                L ${leftX} ${stemY - bracketH}
                Q ${leftX} ${stemY} ${leftX - sW} ${stemY}
                Z
              `}
              fill={color}
            />
          );
        }
      }

      return null;
    };

    const maskId = `glyph-mask-${uniqueId}-${axis}-${Math.round(contrast * 10)}-${weight}`;

    return (
      <svg viewBox="0 0 300 300" className="w-full h-full select-none">
        <defs>
          {/* Mask for 'O' counter */}
          <mask id={maskId}>
            <rect width="300" height="300" fill="white" />
            <g transform={`rotate(${-axis}, ${cx}, ${cy})`}>
              <ellipse cx={cx} cy={cy} rx={rxInner} ry={ryInner} fill="black" />
            </g>
          </mask>
        </defs>

        {/* Typographic Baseline Guide */}
        {showGuides && (
          <>
            <line x1="20" y1="240" x2="280" y2="240" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="24" y="234" fill="#94A3B8" fontSize="9" fontFamily="monospace">Línea de Base (0pt)</text>

            <line x1="20" y1="70" x2="280" y2="70" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
            <text x="24" y="64" fill="#94A3B8" fontSize="9" fontFamily="monospace">Altura de Mayúsculas</text>
          </>
        )}

        {/* GLYPH 'O': CONTINUOUS PARAMETRIC CURVED MODULATION */}
        {targetGlyph === 'O' && (
          <g>
            <ellipse
              cx={cx}
              cy={cy}
              rx={rxOuter}
              ry={ryOuter}
              fill={color}
              mask={`url(#${maskId})`}
            />

            {/* Live Axis Guideline */}
            {showGuides && (
              <g transform={`translate(${cx}, ${cy})`}>
                <line
                  x1="0"
                  y1="-115"
                  x2="0"
                  y2="115"
                  transform={`rotate(${-axis})`}
                  stroke="#EA580C"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <circle
                  cx="0"
                  cy={-ryInner}
                  r="4.5"
                  transform={`rotate(${-axis})`}
                  fill="#EA580C"
                />
                <circle
                  cx="0"
                  cy={ryInner}
                  r="4.5"
                  transform={`rotate(${-axis})`}
                  fill="#EA580C"
                />
              </g>
            )}
          </g>
        )}

        {/* GLYPH 'A': MATHEMATICALLY CLEAN POLYGON MITER APEX */}
        {targetGlyph === 'A' && (
          <g fill={color}>
            {/* The A is constructed as clean polygons with proper mitering so no stroke gets stuck or blobbed */}
            {(() => {
              const apexX = cx;
              const apexY = 70;
              const baseY = 240;
              const leftBaseX = 72;
              const rightBaseX = 228;

              // Left diagonal polygon (thin stroke)
              const halfThin = thin / 2;
              const pLeftTopX = apexX;
              const pLeftTopY = apexY;
              const pLeftBaseLeft = leftBaseX - halfThin;
              const pLeftBaseRight = leftBaseX + halfThin;

              // Right diagonal polygon (thick stroke)
              const halfThick = thick / 2;
              const pRightBaseLeft = rightBaseX - halfThick;
              const pRightBaseRight = rightBaseX + halfThick;

              return (
                <>
                  {/* Left Diagonal Stroke */}
                  <polygon
                    points={`
                      ${apexX},${apexY}
                      ${apexX + halfThin},${apexY + 10}
                      ${pLeftBaseRight},${baseY}
                      ${pLeftBaseLeft},${baseY}
                    `}
                    fill={color}
                  />

                  {/* Right Diagonal Stroke (Thick) */}
                  <polygon
                    points={`
                      ${apexX},${apexY}
                      ${pRightBaseRight},${baseY}
                      ${pRightBaseLeft},${baseY}
                      ${apexX - halfThin},${apexY + 12}
                    `}
                    fill={color}
                  />

                  {/* Clean Apex Cap */}
                  <polygon
                    points={`
                      ${apexX - halfThin},${apexY + 4}
                      ${apexX},${apexY}
                      ${apexX + halfThick * 0.4},${apexY + 4}
                    `}
                    fill={color}
                  />

                  {/* Crossbar at optical middle height */}
                  <rect
                    x={106}
                    y={172 - thin / 2}
                    width={88}
                    height={thin}
                    fill={color}
                  />

                  {/* Feet Serifs */}
                  {renderStemSerif(leftBaseX, baseY, Math.max(14, thin), 'bottom')}
                  {renderStemSerif(rightBaseX, baseY, thick, 'bottom')}
                </>
              );
            })()}
          </g>
        )}

        {/* GLYPH 'H': DYNAMIC STEMS & PARAMETRIC SERIFS */}
        {targetGlyph === 'H' && (
          <g fill={color}>
            <rect x={85 - thick / 2} y={70} width={thick} height={170} />
            <rect x={215 - thick / 2} y={70} width={thick} height={170} />
            <rect x={85} y={155 - thin / 2} width={130} height={thin} />

            {renderStemSerif(85, 70, thick, 'top')}
            {renderStemSerif(85, 240, thick, 'bottom')}
            {renderStemSerif(215, 70, thick, 'top')}
            {renderStemSerif(215, 240, thick, 'bottom')}
          </g>
        )}

        {/* GLYPH 'I': ASTA + SERIFAS BILATERALES + CARTELAS */}
        {targetGlyph === 'I' && (
          <g fill={color}>
            <rect x={cx - thick / 2} y={70} width={thick} height={170} />
            {renderStemSerif(cx, 70, thick, 'top')}
            {renderStemSerif(cx, 240, thick, 'bottom')}
          </g>
        )}

        {/* GLYPH 'n': STEM + SHOULDER CURVE + SERIF FOOT */}
        {targetGlyph === 'n' && (
          <g fill={color}>
            <rect x={85} y={120} width={thick} height={120} />
            <rect x={185} y={150} width={thick} height={90} />

            <path
              d={`
                M ${85 + thick} 150
                C ${85 + thick + 10} 115, 185 115, ${185 + thick} 150
                L 185 150
                C 185 125, ${85 + thick} 125, ${85 + thick} 150
                Z
              `}
              fill={color}
            />

            {renderStemSerif(85 + thick / 2, 120, thick, 'top')}
            {renderStemSerif(85 + thick / 2, 240, thick, 'bottom')}
            {renderStemSerif(185 + thick / 2, 240, thick, 'bottom')}
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="space-y-6 pb-24">
      {/* 1. CONTROL DECK HEADER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] font-bold">
              <Sliders className="w-4 h-4" />
              <span>MÓDULO 3 · LABORATORIO TIPOGRÁFICO EXPERIMENTAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              Laboratorio & Taller Paramétrico
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl">
              Modela en tiempo real el eje caligráfico, el ratio de contraste y las serifas. 
              La comparativa es sobrepuesta sobre el signo histórico de referencia.
            </p>
          </div>

          {/* Quick PDF Export */}
          <button
            onClick={handlePrintPDF}
            className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold hover:bg-[#EA580C] transition-colors flex items-center gap-2 shadow-xs cursor-pointer shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Exportar Especimen PDF</span>
          </button>
        </div>

        {/* Input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="text-[11px] font-mono text-slate-500 font-bold block mb-1">
              Nombre de tu Creación Experimental:
            </label>
            <input
              type="text"
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
              placeholder="Ej: Garalda Experimental, Bodoni Neón..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#EA580C] text-xs font-bold font-sans transition-colors"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-500 font-bold block mb-1">
              Texto o Letra de Prueba (Se escala dinámicamente):
            </label>
            <input
              type="text"
              value={customWord}
              onChange={(e) => {
                const val = e.target.value;
                setCustomWord(val);
                if (val.trim().length === 1 && ['A', 'O', 'H', 'I', 'n'].includes(val.trim())) {
                  setTargetGlyph(val.trim() as any);
                }
              }}
              placeholder="Escribe 1 letra o una palabra..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#EA580C] text-xs font-sans font-bold transition-colors"
            />
          </div>
        </div>

        {/* Historical Presets Quick Bar */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
            Cargar Parámetros de Épocas Históricas:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 museum-scrollbar">
            {HISTORICAL_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-mono whitespace-nowrap transition-colors cursor-pointer"
              >
                {p.name.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE LETTER IS FIRST AND BIG (LIVE VECTOR CANVAS WITH SUPERIMPOSED REF)  */}
      {/* ========================================================================= */}
      <div className="space-y-6 print:hidden">
        {/* HERO CANVAS CONTAINER */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#EA580C] font-bold uppercase tracking-wider block">
                Visualizador de Signo Vectorial Sobrepuesto
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 font-sans">
                {variantName}
              </h2>
            </div>

            {/* Quick Glyph switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Glifo vector:</span>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-mono font-bold">
                {(['A', 'O', 'H', 'I', 'n'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setTargetGlyph(g);
                      setCustomWord(g);
                    }}
                    className={`w-8 h-8 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                      targetGlyph === g
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SUPERIMPOSED COMPARISON TOOLBAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOverlayRef(!showOverlayRef)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  showOverlayRef ? 'bg-blue-900 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                {showOverlayRef ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showOverlayRef ? 'Comparativa Sobrepuesta: ACTIVA' : 'Mostrar Referencia Sobrepuesta'}</span>
              </button>

              {showOverlayRef && (
                <div className="flex items-center gap-1 text-[11px] text-slate-500 ml-2">
                  <span>Opacidad:</span>
                  <input
                    type="range"
                    min="0.15"
                    max="0.85"
                    step="0.05"
                    value={overlayOpacity}
                    onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                    className="w-16 accent-blue-600 cursor-pointer"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-bold">Referencia Histórica:</span>
              <select
                value={comparePresetId}
                onChange={(e) => setComparePresetId(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-900 font-bold focus:outline-none shadow-xs cursor-pointer text-xs"
              >
                {HISTORICAL_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* THE SUPERIMPOSED CANVAS */}
          <div className="p-6 bg-[#FAF8F5] rounded-2xl border-2 border-slate-200 flex flex-col items-center justify-center text-center min-h-[360px] relative overflow-hidden shadow-inner">
            {/* Legend badges */}
            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 z-30">
              <span className="text-[10px] font-mono px-2.5 py-1 bg-[#EA580C] text-white rounded-lg font-bold shadow-xs">
                Tu Diseño ({axisAngle}°, Contraste: {contrastRatio.toFixed(1)}:1)
              </span>

              {showOverlayRef && (
                <span className="text-[10px] font-mono px-2.5 py-1 bg-blue-900/90 text-white rounded-lg font-bold shadow-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                  <span>Ref: {comparePreset.name.split('(')[0].trim()} ({comparePreset.axis}°)</span>
                </span>
              )}
            </div>

            {/* Display Mode: Vector Single Glyph vs Dynamic Custom Text */}
            {customWord.trim().length <= 1 ? (
              /* Single Glyph Vector Stage with Superimposition */
              <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
                {/* 1. Underlying / Overlaid Historical Reference Glyph */}
                {showOverlayRef && (
                  <div
                    className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-200"
                    style={{ opacity: overlayOpacity }}
                  >
                    {renderParametricGlyph(
                      comparePreset.axis,
                      comparePreset.contrast,
                      comparePreset.weight,
                      comparePreset.serif,
                      '#0284C7',
                      false,
                      'ref-overlay'
                    )}
                  </div>
                )}

                {/* 2. User's Parametric Design Glyph */}
                <div className="relative z-20 w-full h-full">
                  {renderParametricGlyph(
                    axisAngle,
                    contrastRatio,
                    strokeWeight,
                    serifStyle,
                    '#0F172A',
                    true,
                    'user-design'
                  )}
                </div>
              </div>
            ) : (
              /* Multi-letter custom word: Scales smoothly to fit the canvas */
              <div className="w-full flex flex-col items-center justify-center py-6 select-none relative z-20">
                {/* Reference Word Overlaid */}
                {showOverlayRef && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center text-[#0284C7] font-garamond pointer-events-none transition-opacity"
                    style={{
                      opacity: overlayOpacity,
                      fontSize: `${getDynamicFontSize(customWord)}px`,
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      fontFamily: "'EB Garamond', serif"
                    }}
                  >
                    {customWord}
                  </div>
                )}

                {/* User's Word */}
                <div 
                  className="text-slate-950 font-garamond transition-all duration-150"
                  style={{
                    fontSize: `${getDynamicFontSize(customWord)}px`,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    fontFamily: "'EB Garamond', Georgia, serif",
                    fontWeight: strokeWeight > 40 ? 700 : 400
                  }}
                >
                  {customWord}
                </div>
              </div>
            )}

            {/* Metric Status Bar below Canvas */}
            <div className="mt-3 pt-3 border-t border-slate-200/80 w-full text-[11px] font-mono text-slate-600 flex flex-wrap justify-between items-center px-3 z-30">
              <span>Eje: <strong className="text-slate-900">{axisAngle}°</strong></span>
              <span>Contraste: <strong className="text-slate-900">{contrastRatio.toFixed(2)}:1</strong></span>
              <span>Asta: <strong className="text-slate-900">{strokeWeight}px</strong></span>
              <span className="truncate max-w-[180px] font-bold text-[#EA580C]">{serifStyle.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        {/* 3. FLUID MODULATION SLIDERS & PARAMETRIC CONTROLS */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 font-sans text-base sm:text-lg flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#EA580C]" />
              <span>Controles Continuos de Modulación y Morfología</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Interpolación instantánea</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider 1: Axis Angle (0° to 45°) */}
            <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-slate-900">Eje de Modulación (Stress):</span>
                <span className="px-2 py-0.5 bg-orange-100 text-[#EA580C] rounded font-bold">{axisAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                value={axisAngle}
                onChange={(e) => setAxisAngle(Number(e.target.value))}
                className="w-full accent-[#EA580C] cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 font-sans">
                {axisAngle === 0 
                  ? '0° (Vertical estricto Bodoni / Didot)' 
                  : axisAngle <= 15 
                    ? `${axisAngle}° (Inclinación barroca moderada de Claude Garamond)` 
                    : `${axisAngle}° (Inclinación pronunciada de pluma renacentista Nicolas Jenson)`}
              </p>
            </div>

            {/* Slider 2: Contrast Ratio (1.0 to 18.0) */}
            <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-slate-900">Ratio de Contraste (Grosso/Fino):</span>
                <span className="px-2 py-0.5 bg-orange-100 text-[#EA580C] rounded font-bold">{contrastRatio.toFixed(2)}:1</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="18.0"
                step="0.1"
                value={contrastRatio}
                onChange={(e) => setContrastRatio(Number(e.target.value))}
                className="w-full accent-[#EA580C] cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 font-sans">
                {contrastRatio < 1.5 
                  ? 'Monolineal pesado (Slab Serif / Futura)' 
                  : contrastRatio < 4.0 
                    ? 'Contraste orgánico descansado para lectura de libros' 
                    : contrastRatio < 9.0 
                      ? 'Alto contraste neoclásico (Baskerville)' 
                      : 'Contraste extremo filiforme (Bodoni / Didot)'}
              </p>
            </div>

            {/* Slider 3: Stem Stroke Weight (18px to 56px) */}
            <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-slate-900">Grosor de Asta Principal (Weight):</span>
                <span className="px-2 py-0.5 bg-orange-100 text-[#EA580C] rounded font-bold">{strokeWeight}px</span>
              </div>
              <input
                type="range"
                min="18"
                max="56"
                value={strokeWeight}
                onChange={(e) => setStrokeWeight(Number(e.target.value))}
                className="w-full accent-[#EA580C] cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 font-sans">
                Determina la potencia de la mancha tipográfica en el renglón.
              </p>
            </div>

            {/* Selector 4: Serif Morphology */}
            <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-xl border border-slate-200">
              <label className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-slate-900">Morfología de Serifa / Remate:</span>
                <span className="text-[10px] text-slate-500 font-bold">Arquitectura de Base</span>
              </label>
              <select
                value={serifStyle}
                onChange={(e) => setSerifStyle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold font-sans focus:outline-none focus:border-[#EA580C] cursor-pointer"
              >
                {SERIF_STYLES.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 font-sans">
                Elige libremente cualquier remate para experimentar contrastes híbridos.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <button
              onClick={handleSaveVariant}
              className="px-4 py-2.5 bg-[#EA580C] text-white rounded-xl text-xs font-mono font-bold hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
              <span>Guardar en Mi Colección</span>
            </button>

            {copiedNotification && (
              <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" />
                ¡Variante guardada con éxito!
              </span>
            )}
          </div>
        </div>

        {/* 4. SAVED USER VARIANTS LIST */}
        {savedVariants.length > 0 && (
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="font-extrabold text-slate-900 font-sans text-sm flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#EA580C]" />
              <span>Mis Variantes Guardadas ({savedVariants.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {savedVariants.map((v, i) => (
                <div
                  key={`${v.name}-${i}`}
                  onClick={() => {
                    setVariantName(v.name);
                    setAxisAngle(v.axis);
                    setContrastRatio(v.contrast);
                    setStrokeWeight(v.weight);
                    setSerifStyle(v.serif);
                  }}
                  className="p-3 bg-[#FAF8F5] rounded-xl border border-slate-200 hover:border-[#EA580C] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#EA580C] transition-colors font-sans">
                      {v.name}
                    </h4>
                    <p className="text-[10px] font-mono text-slate-500">
                      Eje: {v.axis}° · Contraste: {v.contrast.toFixed(1)}:1 · {v.weight}px
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#EA580C] opacity-0 group-hover:opacity-100 transition-opacity">
                    Cargar →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. PRINTABLE SPECIMEN SHEET (PDF EXPORT)                                  */}
      {/* ========================================================================= */}
      <div className="bg-white border-2 border-slate-300 rounded-2xl p-8 sm:p-12 shadow-sm space-y-8 print:border-none print:shadow-none print:p-0 print:m-0 print:w-full">
        {/* Specimen Header */}
        <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#EA580C] font-bold block">
              FICHA DE ESPECIMEN TIPOGRÁFICO EXPERIMENTAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans">
              {variantName}
            </h2>
            <p className="text-xs text-slate-600 mt-1 font-sans">
              Generada en Type-o-graphy · {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="text-right font-mono text-xs text-slate-500">
            <span className="block font-bold text-slate-900">ESPECIMEN #{variantName.length}</span>
            <span>Ref: {comparePreset.name.split('(')[0].trim()}</span>
          </div>
        </div>

        {/* Hero Character & Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-200 pb-8">
          <div className="md:col-span-5 flex items-center justify-center p-6 bg-[#FAF8F5] rounded-xl border border-slate-200 text-center">
            <div className="w-48 h-48">
              {renderParametricGlyph(axisAngle, contrastRatio, strokeWeight, serifStyle, '#0F172A', false)}
            </div>
          </div>

          <div className="md:col-span-7 space-y-3 text-xs font-sans">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-900">
              Métricas Paramétricas del Signo:
            </h3>
            
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block">Eje de Modulación:</span>
                <span className="font-bold text-slate-900">{axisAngle}° {axisAngle === 0 ? '(Vertical pura)' : '(Inclinado)'}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block">Ratio de Contraste:</span>
                <span className="font-bold text-slate-900">{contrastRatio.toFixed(2)}:1</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block">Grosor de Asta:</span>
                <span className="font-bold text-slate-900">{strokeWeight}px</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block">Morfología de Serifa:</span>
                <span className="font-bold text-slate-900 truncate block">{serifStyle}</span>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed pt-1">
              La orientación del eje de modulación a {axisAngle}° y la relación asta/perfil de {contrastRatio.toFixed(2)}:1 
              articulan el ritmo espacial y el centro de gravedad del carácter sobre la línea de base.
            </p>
          </div>
        </div>

        {/* Scaled Specimen Ladder */}
        <div className="space-y-6">
          <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-900">
            Escala Tipográfica de Lectura:
          </h3>

          <div className="space-y-4 text-slate-950 font-sans">
            <div>
              <span className="font-mono text-[10px] text-slate-400 block mb-1">TITULAR (36pt):</span>
              <p className="text-3xl leading-tight font-extrabold">
                {customWord}: El veloz murciélago hindú comía feliz cardillo.
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-slate-400 block mb-1">SUBTITULAR (22pt):</span>
              <p className="text-xl leading-snug font-bold">
                Quattro sono i lumi della tipografia: regolarità, nettezza, buon gusto e grazia.
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-slate-400 block mb-1">CUERPO DE LECTURA CONTINUA (14pt):</span>
              <p className="text-sm leading-relaxed text-slate-800">
                La tipografía existe para honrar al contenido. En una civilización donde el texto escrito es la moneda de cambio del saber, 
                la forma de la letra determina la claridad del pensamiento y la persistencia de la memoria humana.
              </p>
            </div>
          </div>
        </div>

        {/* Specimen Footer */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>TYPE-O-GRAPHY · HOJA DE ESPECIMEN DE LABORATORIO</span>
          <span>ESTÁNDAR DE CATALOGACIÓN EDITORIAL BRINGHURST</span>
        </div>
      </div>
    </div>
  );
};
