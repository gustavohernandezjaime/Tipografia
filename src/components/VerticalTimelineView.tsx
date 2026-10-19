import React, { useState } from 'react';
import { BRINGHURST_CATEGORIES, BringhurstCategory, BringhurstFont } from '../data/bringhurstHistory';
import { 
  BookOpen, 
  Sparkles, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Eye,
  Ruler,
  Compass,
  X,
  FileText,
  Layers
} from 'lucide-react';

interface VerticalTimelineViewProps {
  onLoadInWorkshop: (category: BringhurstCategory) => void;
}

export const VerticalTimelineView: React.FC<VerticalTimelineViewProps> = ({ onLoadInWorkshop }) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('renaissance-humanist');
  
  // Compact snapshot letter toggle: 'a' vs 'g'
  const [snapshotGlyph, setSnapshotGlyph] = useState<'a' | 'g'>('a');
  
  // Selected font for deep technical sheet & weights inspection
  const [inspectedFont, setInspectedFont] = useState<BringhurstFont | null>(null);

  const activeCategory = BRINGHURST_CATEGORIES.find((c) => c.id === activeCategoryId) || BRINGHURST_CATEGORIES[0];
  const activeIndex = BRINGHURST_CATEGORIES.findIndex((c) => c.id === activeCategoryId);

  // Common weight scale to preview in the font modal
  const FONT_WEIGHTS_PREVIEW = [
    { label: 'Light 300', weight: 300, italic: false },
    { label: 'Regular 400', weight: 400, italic: false },
    { label: 'Medium 500', weight: 500, italic: false },
    { label: 'SemiBold 600', weight: 600, italic: false },
    { label: 'Bold 700', weight: 700, italic: false },
    { label: 'Black 900', weight: 900, italic: false },
    { label: 'Italic 400', weight: 400, italic: true },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* 1. HEADER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>CANON DE ROBERT BRINGHURST</span>
          <span aria-hidden="true">·</span>
          <span>7 PERÍODOS HISTÓRICOS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
          Línea del Tiempo Tipográfica
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
          Recorre verticalmente hacia abajo los 7 períodos de la historia tipográfica. 
          Los períodos inactivos permanecen atenuados y desaturados, mientras que el período activo se expande y destaca. 
          Toca cualquier fuente para consultar todos sus pesos y ficha técnica completa.
        </p>

        {/* Quick jump pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 museum-scrollbar">
          {BRINGHURST_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                activeCategoryId === cat.id
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.number}. {cat.name.split('/')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. REFINED & COMPACT "FONT EVOLUTION SNAPSHOT" MENU (MINIMAL, NO CLUTTER) */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/95 text-white rounded-2xl px-4 py-2.5 shadow-md border border-slate-800 sticky top-16 z-30 backdrop-blur-md">
        <div className="flex items-center justify-between gap-2">
          {/* Glyph Switcher Pill */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase hidden sm:inline">Evolución:</span>
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={() => setSnapshotGlyph('a')}
                className={`w-6 h-6 rounded font-bold text-xs transition-all cursor-pointer flex items-center justify-center ${
                  snapshotGlyph === 'a'
                    ? 'bg-[#EA580C] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Ver evolución de 'a'"
              >
                a
              </button>
              <button
                onClick={() => setSnapshotGlyph('g')}
                className={`w-6 h-6 rounded font-bold text-xs transition-all cursor-pointer flex items-center justify-center ${
                  snapshotGlyph === 'g'
                    ? 'bg-[#EA580C] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Ver evolución de 'g'"
              >
                g
              </button>
            </div>
            <span className="text-xs font-bold text-amber-400 font-mono truncate max-w-[120px] sm:max-w-none">
              {activeCategory.name.split('/')[0].trim()} ({activeCategory.axisAngle}°)
            </span>
          </div>

          {/* Row of 7 compact letters across history */}
          <div className="flex items-center gap-1 sm:gap-2">
            {BRINGHURST_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  title={`${cat.name} (${cat.periodYears})`}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#EA580C] text-white font-bold scale-110 shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <span className={`text-base leading-none select-none ${cat.representativeFont.fontFamilyClass}`}>
                    {snapshotGlyph}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. VERTICAL TIMELINE RAIL (DOWNWARDS) WITH ATTENUATION & FLUID SCALE      */}
      {/* ========================================================================= */}
      <div className="relative pl-6 sm:pl-8 space-y-6">
        {/* Continuous downward line with animated progress gradient */}
        <div className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-1 bg-slate-200 rounded-full -translate-x-1/2 overflow-hidden">
          {/* Active progress fill highlighting axis evolution */}
          <div 
            className="w-full bg-gradient-to-b from-orange-500 via-amber-500 to-orange-600 transition-all duration-500"
            style={{ height: `${((activeIndex + 1) / BRINGHURST_CATEGORIES.length) * 100}%` }}
          />
        </div>

        {BRINGHURST_CATEGORIES.map((cat, idx) => {
          const isSelected = cat.id === activeCategoryId;

          return (
            <div 
              key={cat.id} 
              className="relative group transition-all duration-300"
            >
              {/* Timeline dot / node button with axis readout */}
              <button
                onClick={() => setActiveCategoryId(cat.id)}
                className={`absolute -left-6 sm:-left-8 top-4 w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer -translate-x-1/2 z-10 ${
                  isSelected
                    ? 'bg-[#EA580C] border-white text-white shadow-lg scale-125 ring-4 ring-orange-500/20'
                    : 'bg-slate-100 border-slate-300 text-slate-500 hover:border-[#EA580C] hover:scale-110'
                }`}
                title={`Ver período ${cat.name}`}
              >
                <span className="text-[10px] font-mono font-bold">{cat.number}</span>
              </button>

              {/* CARD CONTAINER: ATTENUATED & DESATURATED WHEN INACTIVE, FLUID SCALE WHEN ACTIVE */}
              <div
                className={`rounded-2xl transition-all duration-500 ease-out border ${
                  isSelected
                    ? 'bg-white border-2 border-orange-400 shadow-xl ring-4 ring-orange-500/10 p-5 sm:p-7 scale-[1.01] sm:scale-[1.02] grayscale-0 opacity-100'
                    : 'bg-slate-50/80 border-slate-200 p-4 cursor-pointer grayscale-[0.85] opacity-60 hover:opacity-90 hover:grayscale-[0.3] hover:border-slate-300'
                }`}
                onClick={() => {
                  if (!isSelected) setActiveCategoryId(cat.id);
                }}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className={`font-bold ${isSelected ? 'text-[#EA580C]' : 'text-slate-500'}`}>
                        {cat.periodYears}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 uppercase font-bold text-[10px]">{cat.englishName}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ml-1 ${
                        isSelected ? 'bg-orange-100 text-[#EA580C]' : 'bg-slate-200 text-slate-600'
                      }`}>
                        Eje: {cat.axisAngle}°
                      </span>
                    </div>

                    <h2 className={`text-xl font-extrabold mt-1 tracking-tight font-sans transition-colors ${
                      isSelected ? 'text-slate-900 text-2xl' : 'text-slate-700'
                    }`}>
                      {cat.name}
                    </h2>
                    
                    <p className="text-xs text-slate-600 font-sans mt-0.5">
                      "{cat.bringhurstConcept}"
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCategoryId(isSelected ? '' : cat.id);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isSelected ? 'bg-orange-100 text-[#EA580C]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {isSelected ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* EXPANDED CONTENT: VISIBLE ONLY ON ACTIVE ("ENCENDIDO") PERIOD */}
                {isSelected && (
                  <div className="mt-6 pt-5 border-t border-slate-100 space-y-7 animate-fade-in">
                    {/* Philosophical Summary */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans">
                      <span className="font-mono font-bold text-[11px] uppercase text-slate-900 block mb-1">
                        Espíritu & Filosofía del Período:
                      </span>
                      {cat.corePhilosophy}
                    </div>

                    {/* ================================================================ */}
                    {/* REPRESENTATIVE FONT: GRAND ANATOMICAL ANALYSIS & METRICS         */}
                    {/* ================================================================ */}
                    <div className="bg-gradient-to-br from-white via-orange-50/20 to-amber-50/30 border-2 border-orange-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-orange-100 text-[#EA580C] text-[11px] font-mono font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            La Más Representativa del Período
                          </span>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-600">
                          {cat.representativeFont.year} · {cat.representativeFont.designer}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
                          {cat.representativeFont.name}
                        </h3>
                        <p className="text-xs text-slate-700 leading-relaxed font-sans mt-1">
                          {cat.representativeFont.whyRepresentative}
                        </p>
                      </div>

                      {/* GRAND SVG ANATOMICAL DIAGRAM WITH TYPOGRAPHIC METRICS */}
                      <div className="bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-6 space-y-3 shadow-inner">
                        <div className="flex flex-wrap items-center justify-between text-xs font-mono">
                          <span className="font-bold text-slate-900 flex items-center gap-1.5">
                            <Ruler className="w-4 h-4 text-[#EA580C]" />
                            Alturas de Renglón & Eje de Modulación ({cat.axisAngle}°)
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            Proporción Caja x: <strong>{cat.xHeightRatio}%</strong>
                          </span>
                        </div>

                        {/* Large SVG Canvas */}
                        <div className="relative w-full aspect-[16/9] max-h-[300px] bg-[#FAF8F5] rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden">
                          <svg viewBox="0 0 600 320" className="w-full h-full select-none">
                            {/* 1. Ascender Line */}
                            <line x1="40" y1="40" x2="560" y2="40" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" />
                            <text x="50" y="34" fill="#EF4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
                              1. Línea de Ascendentes (b, d, h, l)
                            </text>

                            {/* 2. Cap Height Line */}
                            <line x1="40" y1="80" x2="560" y2="80" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
                            <text x="50" y="74" fill="#3B82F6" fontSize="11" fontFamily="monospace" fontWeight="bold">
                              2. Altura de Mayúsculas (Cap Height)
                            </text>

                            {/* 3. x-Height Line */}
                            <line x1="40" y1="160" x2="560" y2="160" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
                            <text x="50" y="154" fill="#10B981" fontSize="11" fontFamily="monospace" fontWeight="bold">
                              3. Altura de x ({cat.xHeightRatio}%)
                            </text>

                            {/* 4. Baseline */}
                            <line x1="40" y1="240" x2="560" y2="240" stroke="#0F172A" strokeWidth="2.5" />
                            <text x="50" y="234" fill="#0F172A" fontSize="11" fontFamily="monospace" fontWeight="bold">
                              4. Línea de Base (0pt)
                            </text>

                            {/* 5. Descender Line */}
                            <line x1="40" y1="290" x2="560" y2="290" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 4" />
                            <text x="50" y="306" fill="#8B5CF6" fontSize="11" fontFamily="monospace" fontWeight="bold">
                              5. Línea de Descendentes (g, p, q, y)
                            </text>

                            {/* Upright Representative Character */}
                            <text
                              x="300"
                              y="240"
                              textAnchor="middle"
                              fill="#0F172A"
                              fontSize="180"
                              className={cat.representativeFont.fontFamilyClass}
                            >
                              {cat.id === 'modernist-geometric' ? 'R' : cat.id === 'realist-mechanic' ? 'R' : 'O'}
                            </text>

                            {/* Dynamic Axis Modulation Vector passing through the letter */}
                            <g transform="translate(300, 180)">
                              <line
                                x1="0"
                                y1="-90"
                                x2="0"
                                y2="90"
                                transform={`rotate(${-cat.axisAngle})`}
                                stroke="#EA580C"
                                strokeWidth="2.5"
                                strokeDasharray="6 3"
                              />
                              <circle
                                cx="0"
                                cy="-75"
                                r="5"
                                transform={`rotate(${-cat.axisAngle})`}
                                fill="#EA580C"
                              />
                              <circle
                                cx="0"
                                cy="75"
                                r="5"
                                transform={`rotate(${-cat.axisAngle})`}
                                fill="#EA580C"
                              />
                            </g>
                          </svg>
                        </div>

                        {/* Metric Legend pills */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1">
                          <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Eje Modulación</span>
                            <span className="font-mono font-bold text-[#EA580C] text-sm">{cat.axisAngle}°</span>
                          </div>
                          <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Ratio Contraste</span>
                            <span className="font-mono font-bold text-blue-900 text-sm">{cat.contrastRatio}:1</span>
                          </div>
                          <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                            <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Altura de x</span>
                            <span className="font-mono font-bold text-emerald-900 text-sm">{cat.xHeightRatio}% Cap</span>
                          </div>
                          <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Tipo de Serifa</span>
                            <span className="font-bold text-purple-900 text-xs truncate block">{cat.serifType.split(' ')[0]}</span>
                          </div>
                        </div>
                      </div>

                      {/* 4 Anatomical Explanations Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                          <span className="text-[11px] font-mono font-bold uppercase text-[#EA580C] block">
                            1. Estructura del Eje
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed font-sans">
                            {cat.representativeFont.axisAnalysis}
                          </p>
                        </div>

                        <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                          <span className="text-[11px] font-mono font-bold uppercase text-blue-900 block">
                            2. Modulación & Ductus
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed font-sans">
                            {cat.representativeFont.modulationAnalysis}
                          </p>
                        </div>

                        <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                          <span className="text-[11px] font-mono font-bold uppercase text-emerald-900 block">
                            3. Tipos de Serifa & Cartabón
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed font-sans">
                            {cat.representativeFont.serifAnalysis}
                          </p>
                        </div>

                        <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                          <span className="text-[11px] font-mono font-bold uppercase text-slate-900 block">
                            4. Legibilidad en Lectura
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed font-sans">
                            {cat.representativeFont.readabilityAnalysis}
                          </p>
                        </div>
                      </div>

                      {/* Live Specimen Text with solid visible stems */}
                      <div className="p-5 bg-white rounded-xl border border-orange-200 text-center space-y-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
                          Espécimen en Vivo
                        </span>
                        <p
                          className={`text-slate-900 text-2xl sm:text-3xl leading-snug font-bold ${cat.representativeFont.fontFamilyClass}`}
                        >
                          {cat.representativeFont.specimenQuote}
                        </p>
                        <span className="text-xs font-mono text-slate-500 block">
                          — {cat.representativeFont.specimenAuthor}
                        </span>
                      </div>

                      <div className="flex items-center justify-end pt-2">
                        <button
                          onClick={() => onLoadInWorkshop(cat)}
                          className="px-4 py-2 bg-[#EA580C] text-white text-xs font-mono font-bold rounded-xl shadow-xs hover:bg-orange-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Experimentar esta anatomía en el Taller</span>
                        </button>
                      </div>
                    </div>

                    {/* ================================================================ */}
                    {/* CLEAN TYPEFACES GRID (NAME + RASGO CLAVE + SAMPLE BOX)           */}
                    {/* ================================================================ */}
                    <div className="space-y-2.5 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {cat.typefaces.map((font, fIdx) => (
                          <div
                            key={font.name}
                            onClick={() => setInspectedFont(font)}
                            className={`p-3.5 rounded-xl border transition-all text-xs cursor-pointer flex items-center justify-between gap-3 ${
                              font.isRepresentative
                                ? 'bg-amber-50/90 border-amber-300 font-medium shadow-xs hover:border-amber-400'
                                : 'bg-white border-slate-200 text-slate-800 hover:border-slate-400 hover:shadow-xs'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-slate-900 text-sm truncate">
                                  {font.name}
                                </span>
                                {font.isRepresentative && (
                                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-[#EA580C] text-white rounded shrink-0">
                                    Clave
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-600 mt-1 font-sans line-clamp-2">
                                <strong>Rasgo:</strong> {font.notableFeature}
                              </p>
                            </div>

                            {/* Small sample glyph box */}
                            <div className={`w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-900 shrink-0 ${font.fontClass}`}>
                              {font.sampleCharacters}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL / DRAWER FOR INSPECTING ALL WEIGHTS & TECHNICAL SHEET            */}
      {/* ========================================================================= */}
      {inspectedFont && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 space-y-5 animate-scale-up museum-scrollbar">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#EA580C] uppercase tracking-wider font-bold block">
                  Ficha Técnica & Pesos Tipográficos
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-sans">
                  {inspectedFont.name}
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  Diseñado por {inspectedFont.designer} ({inspectedFont.year})
                </span>
              </div>
              <button
                onClick={() => setInspectedFont(null)}
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Distinctive trait callout */}
            <div className="p-3.5 bg-orange-50 rounded-xl border border-orange-200 text-xs space-y-1">
              <span className="font-mono font-bold text-[#EA580C] block uppercase text-[10px]">
                Rasgo Distintivo Clave:
              </span>
              <p className="text-slate-800 font-sans leading-relaxed">
                {inspectedFont.notableFeature}
              </p>
            </div>

            {/* WEIGHTS LADDER (TODOS LOS PESOS DE LA FUENTE EN VIVO) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-slate-700">
                  Familia de Pesos Tipográficos:
                </span>
                <span className="text-[10px] font-mono text-slate-400">7 variantes</span>
              </div>

              <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                {FONT_WEIGHTS_PREVIEW.map((w) => (
                  <div key={w.label} className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{w.label}</span>
                      <span>{inspectedFont.sampleCharacters}</span>
                    </div>
                    <div
                      className={`text-xl text-slate-900 truncate leading-snug ${inspectedFont.fontClass}`}
                      style={{
                        fontWeight: w.weight,
                        fontStyle: w.italic ? 'italic' : 'normal'
                      }}
                    >
                      Hamburgfontsiv 123 {inspectedFont.sampleWord}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pangram Specimen in this font */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold uppercase text-slate-700">
                Pangrama de Prueba en Lectura:
              </span>
              <div className="p-4 bg-slate-900 text-white rounded-xl space-y-1">
                <p className={`text-base leading-relaxed ${inspectedFont.fontClass}`}>
                  El veloz murciélago hindú comía feliz cardillo y kiwi. La cigüeña tocaba el saxofón detrás del palenque de paja.
                </p>
                <span className="text-[10px] font-mono text-slate-400 block pt-1">
                  Muestra tipográfica completa (A–Z, a–z, 0–9, signos)
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectedFont(null)}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-mono font-bold rounded-xl hover:bg-[#EA580C] transition-colors cursor-pointer"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
