import React, { useState } from 'react';
import { 
  ANATOMY_PARTS_ALL, 
  AnatomyPart 
} from '../data/anatomyData';
import { 
  Touchpad, 
  Sparkles, 
  ArrowRight, 
  Info,
  Maximize2,
  Grid,
  Ruler,
  Layers,
  HelpCircle,
  Award,
  CheckCircle2
} from 'lucide-react';

interface AnatomyModuleProps {
  onAddScore: (points: number) => void;
  onNavigateToQuizzes?: () => void;
}

// Key specimens that showcase every single anatomical trait on a unified baseline
interface SpecimenPreset {
  id: string;
  label: string;
  text: string;
  letters: string[];
}

const SPECIMEN_PRESETS: SpecimenPreset[] = [
  {
    id: 'canon-parts',
    label: 'Glifos Canónicos Anatómicos',
    text: 'A g f h p d q R',
    letters: ['A', 'g', 'f', 'h', 'p', 'd', 'q', 'R']
  },
  {
    id: 'typographie',
    label: 'Espécimen Clásico (Typographie)',
    text: 'Typographie',
    letters: ['T', 'y', 'p', 'o', 'g', 'r', 'a', 'p', 'h', 'i', 'e']
  },
  {
    id: 'hamburge',
    label: 'Espécimen de Fundición (Hamburgevons)',
    text: 'Hamburgevons',
    letters: ['H', 'a', 'm', 'b', 'u', 'r', 'g', 'e', 'v', 'o', 'n', 's']
  }
];

// Interactive hotspot coordinate definitions mapped directly along the Garamond baseline
interface BaselineHotspot {
  partId: string;
  name: string;
  letter: string;
  letterIndex: number;
  // Normalized percentage position relative to that letter's box (0 to 100)
  offsetXPercent: number; 
  offsetYPercent: number; 
  labelPos: 'top' | 'bottom';
}

const BASELINE_HOTSPOTS: BaselineHotspot[] = [
  { partId: 'apice', name: 'Ápice', letter: 'A', letterIndex: 0, offsetXPercent: 50, offsetYPercent: 24, labelPos: 'top' },
  { partId: 'travesano-barra', name: 'Travesaño', letter: 'A', letterIndex: 0, offsetXPercent: 50, offsetYPercent: 58, labelPos: 'bottom' },
  { partId: 'asta-gruesa-fina', name: 'Contraste', letter: 'A', letterIndex: 0, offsetXPercent: 74, offsetYPercent: 48, labelPos: 'top' },
  
  { partId: 'oreja-g', name: 'Oreja', letter: 'g', letterIndex: 1, offsetXPercent: 78, offsetYPercent: 36, labelPos: 'top' },
  { partId: 'cuello-istmo', name: 'Cuello', letter: 'g', letterIndex: 1, offsetXPercent: 50, offsetYPercent: 62, labelPos: 'bottom' },
  { partId: 'loop-bucle-g', name: 'Loop / Bucle', letter: 'g', letterIndex: 1, offsetXPercent: 50, offsetYPercent: 88, labelPos: 'bottom' },

  { partId: 'lagrima-gota', name: 'Lágrima', letter: 'f', letterIndex: 2, offsetXPercent: 75, offsetYPercent: 26, labelPos: 'top' },
  
  { partId: 'asta-ascendente', name: 'Ascendente', letter: 'h', letterIndex: 3, offsetXPercent: 24, offsetYPercent: 24, labelPos: 'top' },
  { partId: 'hombro-arco', name: 'Hombro', letter: 'h', letterIndex: 3, offsetXPercent: 66, offsetYPercent: 52, labelPos: 'top' },

  { partId: 'panza-bucle', name: 'Panza', letter: 'p', letterIndex: 4, offsetXPercent: 65, offsetYPercent: 54, labelPos: 'top' },
  { partId: 'asta-descendente', name: 'Descendente', letter: 'p', letterIndex: 4, offsetXPercent: 26, offsetYPercent: 86, labelPos: 'bottom' },

  { partId: 'baza-espolon', name: 'Espolón', letter: 'd', letterIndex: 5, offsetXPercent: 72, offsetYPercent: 70, labelPos: 'bottom' },

  { partId: 'cola-q', name: 'Cola / Espuela', letter: 'q', letterIndex: 6, offsetXPercent: 75, offsetYPercent: 84, labelPos: 'bottom' },

  { partId: 'panza-bucle', name: 'Lóbulo', letter: 'R', letterIndex: 7, offsetXPercent: 68, offsetYPercent: 38, labelPos: 'top' },
  { partId: 'pierna-cola', name: 'Pierna / Cola', letter: 'R', letterIndex: 7, offsetXPercent: 78, offsetYPercent: 70, labelPos: 'bottom' },
  { partId: 'cartela-apofige', name: 'Cartela', letter: 'R', letterIndex: 7, offsetXPercent: 28, offsetYPercent: 25, labelPos: 'top' }
];

export const AnatomyModule: React.FC<AnatomyModuleProps> = ({ 
  onAddScore, 
  onNavigateToQuizzes 
}) => {
  // Mode: Primary Continuous Baseline ("renglón tipográfico") vs Zoomed Single-Letter Inspector
  const [viewMode, setViewMode] = useState<'baseline' | 'single'>('baseline');
  
  // Selected Specimen Preset
  const [selectedPresetId, setSelectedPresetId] = useState<string>('canon-parts');
  const activePreset = SPECIMEN_PRESETS.find(p => p.id === selectedPresetId) || SPECIMEN_PRESETS[0];

  // Currently inspected part
  const [selectedPartId, setSelectedPartId] = useState<string>('cartela-apofige');
  const selectedPart = ANATOMY_PARTS_ALL.find(p => p.id === selectedPartId) || ANATOMY_PARTS_ALL[0];

  // Currently inspected letter in single-letter mode
  const [activeLetter, setActiveLetter] = useState<string>('R');

  // Track discovered parts for rewards
  const [discoveredParts, setDiscoveredParts] = useState<Set<string>>(new Set(['cartela-apofige']));

  const handleSelectPart = (part: AnatomyPart) => {
    setSelectedPartId(part.id);
    setActiveLetter(part.glyphSource);
    if (!discoveredParts.has(part.id)) {
      setDiscoveredParts(prev => new Set(prev).add(part.id));
      onAddScore(5);
    }
  };

  const handleSelectHotspot = (hotspot: BaselineHotspot) => {
    const part = ANATOMY_PARTS_ALL.find(p => p.id === hotspot.partId);
    if (part) {
      handleSelectPart(part);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* 1. HEADER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] font-bold">
            <Touchpad className="w-4 h-4" />
            <span>MÓDULO 1 · ANATOMÍA TIPOGRÁFICA INTERACTIVA</span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-mono">
            <button
              onClick={() => setViewMode('baseline')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'baseline'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Renglón Tipográfico (Base)</span>
            </button>
            <button
              onClick={() => setViewMode('single')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'single'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Letra por Letra</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
          Anatomía Tipográfica
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-3xl">
          Todas las letras habitan un mismo <strong>renglón tipográfico</strong> en <strong>EB Garamond</strong>. 
          Toca los puntos anatómicos interactivos sobre las letras para aprender la función de cada rasgo: 
          el <em>ápice</em> de la <strong>A</strong>, la <em>oreja</em> y <em>cuello</em> de la <strong>g</strong>, 
          la <em>lágrima</em> de la <strong>f</strong> y la <em>cartela</em> de la <strong>R</strong>.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 2. PRIMARY VIEW: EL RENGLÓN TIPOGRÁFICO UNIFICADO (GARAMOND CANÓNICO)    */}
      {/* ========================================================================= */}
      {viewMode === 'baseline' ? (
        <div className="space-y-6">
          {/* Main Typographic Baseline Container */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#EA580C] font-bold uppercase tracking-wider block">
                  EB Garamond (Claude Garamond, 1540 / Google Fonts)
                </span>
                <h3 className="font-extrabold text-base text-slate-900 font-sans flex items-center gap-2">
                  <span>Renglón de Estudio Anatómico</span>
                  <span className="text-xs font-mono font-normal text-slate-500">
                    ({discoveredParts.size} / {ANATOMY_PARTS_ALL.length} partes exploradas)
                  </span>
                </h3>
              </div>

              {/* Specimen Presets Switcher */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {SPECIMEN_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`px-2.5 py-1 rounded-lg font-mono transition-colors whitespace-nowrap cursor-pointer ${
                      selectedPresetId === preset.id
                        ? 'bg-slate-900 text-white font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {preset.label.split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric Guidelines Reference Strip */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span>Ascendentes (b, d, h, l, f)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                <span>Mayúsculas / Cap Height (A, R)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                <span>Altura de x (x, o, a, e)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 inline-block" />
                <span>Línea de Base (0pt)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" />
                <span>Descendentes (p, q, g, y)</span>
              </span>
            </div>

            {/* THE BIG INTERACTIVE BASELINE STAGE (CANVAS HORIZONTAL) */}
            <div className="relative bg-[#FAF8F5] rounded-2xl border-2 border-slate-200 p-4 sm:p-6 overflow-x-auto museum-scrollbar select-none min-h-[340px] flex items-center shadow-inner">
              {/* Metric Line Overlays across the entire width */}
              <div className="absolute inset-0 pointer-events-none min-w-[760px]">
                {/* 1. Ascenders Line: y ~ 20% */}
                <div className="absolute left-0 right-0 top-[18%] border-b border-red-500 border-dashed opacity-60">
                  <span className="absolute left-2 -top-4 text-[9px] font-mono font-bold text-red-500 bg-white/80 px-1 rounded">
                    Línea de Ascendentes
                  </span>
                </div>

                {/* 2. Cap Height: y ~ 28% */}
                <div className="absolute left-0 right-0 top-[28%] border-b border-blue-600 border-dashed opacity-60">
                  <span className="absolute right-2 -top-4 text-[9px] font-mono font-bold text-blue-600 bg-white/80 px-1 rounded">
                    Altura de Mayúsculas
                  </span>
                </div>

                {/* 3. x-Height: y ~ 50% */}
                <div className="absolute left-0 right-0 top-[50%] border-b border-emerald-600 border-dashed opacity-60">
                  <span className="absolute left-2 -top-4 text-[9px] font-mono font-bold text-emerald-600 bg-white/80 px-1 rounded">
                    Altura de x (Cuerpo de texto)
                  </span>
                </div>

                {/* 4. Baseline: y ~ 75% */}
                <div className="absolute left-0 right-0 top-[75%] border-b-2 border-slate-900 opacity-90">
                  <span className="absolute right-2 -top-4 text-[9px] font-mono font-bold text-slate-900 bg-white/80 px-1 rounded">
                    Línea de Base (0pt)
                  </span>
                </div>

                {/* 5. Descenders Line: y ~ 92% */}
                <div className="absolute left-0 right-0 top-[92%] border-b border-purple-600 border-dashed opacity-60">
                  <span className="absolute left-2 -top-4 text-[9px] font-mono font-bold text-purple-600 bg-white/80 px-1 rounded">
                    Línea de Descendentes
                  </span>
                </div>
              </div>

              {/* The Letters in One Continuous Renglón Tipográfico */}
              <div className="relative z-10 flex items-baseline justify-around w-full min-w-[760px] px-4 pt-10 pb-8">
                {activePreset.letters.map((letter, idx) => {
                  const letterHotspots = BASELINE_HOTSPOTS.filter(h => h.letter === letter && (activePreset.id === 'canon-parts' ? h.letterIndex === idx : true));
                  const isLetterActive = selectedPart.glyphSource.toUpperCase() === letter.toUpperCase();

                  return (
                    <div
                      key={`${letter}-${idx}`}
                      className={`relative flex flex-col items-center justify-center transition-transform ${
                        isLetterActive ? 'scale-105' : 'hover:scale-102'
                      }`}
                    >
                      {/* Interactive Touch Letter */}
                      <span
                        className={`text-6xl sm:text-7xl font-garamond select-none cursor-pointer transition-colors ${
                          isLetterActive 
                            ? 'text-[#EA580C] font-bold drop-shadow-sm' 
                            : 'text-slate-900 hover:text-[#EA580C]'
                        }`}
                        style={{
                          fontFamily: "'EB Garamond', Garamond, Georgia, serif"
                        }}
                        onClick={() => {
                          const firstRelated = ANATOMY_PARTS_ALL.find(p => p.glyphSource.toUpperCase() === letter.toUpperCase());
                          if (firstRelated) handleSelectPart(firstRelated);
                        }}
                      >
                        {letter}
                      </span>

                      {/* Hotspot Touch Pins for this letter */}
                      {letterHotspots.map((hotspot) => {
                        const isHotspotActive = selectedPartId === hotspot.partId;
                        return (
                          <button
                            key={hotspot.name}
                            onClick={() => handleSelectHotspot(hotspot)}
                            style={{
                              position: 'absolute',
                              left: `${hotspot.offsetXPercent}%`,
                              top: `${hotspot.offsetYPercent}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                            className={`z-20 group cursor-pointer focus:outline-none transition-all ${
                              isHotspotActive ? 'scale-125' : 'hover:scale-115'
                            }`}
                            title={`Tocar para ver: ${hotspot.name}`}
                          >
                            <span className="relative flex h-5 w-5 items-center justify-center">
                              {isHotspotActive && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                              )}
                              <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-white items-center justify-center text-[8px] font-mono font-bold text-white shadow-md ${
                                isHotspotActive ? 'bg-[#EA580C]' : 'bg-slate-800 group-hover:bg-[#EA580C]'
                              }`}>
                                +
                              </span>
                            </span>

                            {/* Floating Tooltip Label */}
                            <span className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[9px] font-mono font-bold pointer-events-none shadow-xs transition-opacity ${
                              hotspot.labelPos === 'top' ? '-top-5' : 'top-6'
                            } ${
                              isHotspotActive 
                                ? 'bg-[#EA580C] text-white opacity-100' 
                                : 'bg-slate-900 text-white opacity-0 group-hover:opacity-100'
                            }`}>
                              {hotspot.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1">
              <span className="font-mono">
                Desliza horizontalmente si la pantalla es estrecha · Toca los pines (+) para inspeccionar
              </span>
              <span className="font-mono font-bold text-[#EA580C]">
                +5 XP por cada rasgo descubierto
              </span>
            </div>
          </div>

          {/* 3. SELECTED ANATOMICAL PART SPOTLIGHT CARD */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold text-sm font-mono">
                  {selectedPart.glyphSource}
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#EA580C] block">
                    Elemento Anatómico en Foco
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-sans">
                    {selectedPart.name}
                  </h2>
                </div>
              </div>

              {selectedPart.alternateNames && (
                <div className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400">Sinónimos: </span>
                  <span className="font-bold text-slate-800">{selectedPart.alternateNames.join(' · ')}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Definition */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                  Definición Morfológica
                </span>
                <p className="text-xs sm:text-sm font-sans text-slate-800 leading-relaxed">
                  {selectedPart.shortDefinition}
                </p>
              </div>

              {/* Functional role & historical background */}
              <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-200/80 space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-[#EA580C] block">
                  Función en la Lectura y Fundición
                </span>
                <p className="text-xs sm:text-sm font-sans text-slate-800 leading-relaxed">
                  {selectedPart.detailedFunction}
                </p>
              </div>
            </div>

            {/* Quick action to test */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-sans">
                ¿Listo para poner a prueba tu ojo tipográfico?
              </span>
              {onNavigateToQuizzes && (
                <button
                  onClick={onNavigateToQuizzes}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold hover:bg-[#EA580C] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Ir al Centro de Tests y Juegos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. SECONDARY VIEW: DETALLE LETRA POR LETRA ZOOMED                         */
        /* ========================================================================= */
        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#EA580C] font-bold uppercase tracking-wider block">
                  Examinador de Signo Individual Zoom
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-sans">
                  Elige una Letra para Análisis Microscópico
                </h3>
              </div>

              {/* Letter selector pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['A', 'g', 'f', 'h', 'p', 'd', 'q', 'R', 'I', 'O', 'S'].map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setActiveLetter(l);
                      const rel = ANATOMY_PARTS_ALL.find(p => p.glyphSource.toUpperCase() === l.toUpperCase());
                      if (rel) setSelectedPartId(rel.id);
                    }}
                    className={`w-9 h-9 rounded-xl font-garamond text-xl flex items-center justify-center transition-all cursor-pointer border ${
                      activeLetter.toUpperCase() === l.toUpperCase()
                        ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-xs font-bold scale-105'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Giant Zoomed Canvas */}
            <div className="relative w-full max-w-[380px] mx-auto aspect-square flex items-center justify-center bg-[#FAF8F5] rounded-2xl border-2 border-slate-200 p-6 select-none shadow-inner overflow-hidden">
              {/* Metric Lines */}
              <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="20" y1="95" x2="480" y2="95" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="24" y="88" fill="#EF4444" fontSize="11" fontFamily="monospace" fontWeight="bold">Ascendentes</text>

                <line x1="20" y1="145" x2="480" y2="145" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="24" y="138" fill="#3B82F6" fontSize="11" fontFamily="monospace" fontWeight="bold">Mayúsculas</text>

                <line x1="20" y1="230" x2="480" y2="230" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="24" y="222" fill="#10B981" fontSize="11" fontFamily="monospace" fontWeight="bold">Altura de x</text>

                <line x1="20" y1="380" x2="480" y2="380" stroke="#0F172A" strokeWidth="2" />
                <text x="24" y="372" fill="#0F172A" fontSize="11" fontFamily="monospace" fontWeight="bold">Línea de Base (0pt)</text>

                <line x1="20" y1="455" x2="480" y2="455" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="24" y="468" fill="#8B5CF6" fontSize="11" fontFamily="monospace" fontWeight="bold">Descendentes</text>
              </svg>

              {/* The Single Big Glyph */}
              <div 
                className="relative z-10 flex items-center justify-center font-garamond text-slate-950 select-none text-[260px] leading-none"
                style={{
                  fontFamily: "'EB Garamond', Garamond, Georgia, serif",
                  transform: 'translateY(-14px)'
                }}
              >
                {activeLetter}
              </div>

              {/* Touch pins for this single letter */}
              <div className="absolute inset-0 z-20 pointer-events-auto">
                {ANATOMY_PARTS_ALL.filter(p => p.glyphSource.toUpperCase() === activeLetter.toUpperCase()).map((part) => {
                  const isSelected = selectedPartId === part.id;
                  return (
                    <button
                      key={part.id}
                      onClick={() => handleSelectPart(part)}
                      style={{
                        left: `${part.xPercent}%`,
                        top: `${part.yPercent}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className={`absolute z-30 group cursor-pointer transition-transform ${
                        isSelected ? 'scale-125' : 'hover:scale-115'
                      }`}
                      title={`Tocar: ${part.name}`}
                    >
                      <span className="relative flex h-6 w-6 items-center justify-center">
                        {isSelected && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                        )}
                        <span className={`relative inline-flex rounded-full h-5 w-5 border-2 border-white items-center justify-center text-[10px] font-mono font-bold text-white shadow-md ${
                          isSelected ? 'bg-[#EA580C]' : 'bg-slate-900 group-hover:bg-[#EA580C]'
                        }`}>
                          +
                        </span>
                      </span>

                      <span className={`absolute left-1/2 -translate-x-1/2 top-7 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono font-bold pointer-events-none shadow-xs transition-opacity ${
                        isSelected 
                          ? 'bg-[#EA580C] text-white opacity-100' 
                          : 'bg-slate-900 text-white opacity-0 group-hover:opacity-100'
                      }`}>
                        {part.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected info card */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-slate-900 font-sans text-base">
                {selectedPart.name}
              </h4>
              <p className="text-xs text-slate-700 font-sans leading-relaxed">
                {selectedPart.shortDefinition}
              </p>
              <p className="text-xs text-slate-600 font-sans italic">
                {selectedPart.detailedFunction}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
