import React, { useState } from 'react';
import { TypographicEra, TYPOGRAPHIC_ERAS } from '../data/typographyHistory';
import { GlyphViewer } from './GlyphViewer';
import { 
  ArrowRight, 
  Compass, 
  GitCompare, 
  Calendar, 
  Layers, 
  Sparkles, 
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  BookOpen
} from 'lucide-react';

interface TimelineViewProps {
  selectedEra: TypographicEra;
  onSelectEra: (era: TypographicEra) => void;
  onInspectAnatomy: (era: TypographicEra) => void;
  onCompareEra: (era: TypographicEra) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  selectedEra,
  onSelectEra,
  onInspectAnatomy,
  onCompareEra,
}) => {
  const [specimenFontSize, setSpecimenFontSize] = useState<number>(36);
  const [customSpecimenText, setCustomSpecimenText] = useState<string>('');

  const currentIndex = TYPOGRAPHIC_ERAS.findIndex((e) => e.id === selectedEra.id);

  const handlePrevEra = () => {
    if (currentIndex > 0) {
      onSelectEra(TYPOGRAPHIC_ERAS[currentIndex - 1]);
    }
  };

  const handleNextEra = () => {
    if (currentIndex < TYPOGRAPHIC_ERAS.length - 1) {
      onSelectEra(TYPOGRAPHIC_ERAS[currentIndex + 1]);
    }
  };

  return (
    <div className="space-y-10">
      {/* 1. CHRONOLOGICAL RAIL / TIMELINE SCRUBBER */}
      <section className="bg-white border border-stone-200 rounded-xl p-4 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#9A3412]">
              Línea de Tiempo Universal
            </h2>
            <p className="text-sm font-serif text-stone-700">
              Evolución desde los orígenes paleolíticos hasta la tipografía variable contemporánea
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevEra}
              disabled={currentIndex === 0}
              className="p-1.5 rounded border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Época anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-stone-500 tabular-nums">
              {currentIndex + 1} / {TYPOGRAPHIC_ERAS.length}
            </span>
            <button
              onClick={handleNextEra}
              disabled={currentIndex === TYPOGRAPHIC_ERAS.length - 1}
              className="p-1.5 rounded border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Época siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable timeline rail */}
        <div className="overflow-x-auto pb-3 pt-2 museum-scrollbar">
          <div className="flex items-stretch gap-2.5 min-w-max">
            {TYPOGRAPHIC_ERAS.map((era, index) => {
              const isSelected = era.id === selectedEra.id;
              return (
                <button
                  key={era.id}
                  onClick={() => onSelectEra(era)}
                  className={`text-left p-3 rounded-lg border transition-all w-52 shrink-0 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-stone-900 border-stone-900 text-white shadow-md'
                      : 'bg-[#FAF8F5] border-stone-200 text-stone-800 hover:border-stone-400 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className={isSelected ? 'text-amber-400 font-bold' : 'text-[#9A3412]'}>
                        {era.number}
                      </span>
                      <span className={isSelected ? 'text-stone-300' : 'text-stone-500'}>
                        {era.approxYears}
                      </span>
                    </div>
                    <div className="text-xs font-semibold font-serif line-clamp-1 leading-snug">
                      {era.name}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-200/40 flex items-center justify-between text-[10px] font-mono">
                    <span className={isSelected ? 'text-stone-300' : 'text-stone-500'}>
                      Eje: {era.axisAngle}°
                    </span>
                    <span className={isSelected ? 'text-amber-300' : 'text-[#9A3412]'}>
                      {era.contrastRatio}:1
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. ACTIVE ERA CURATORIAL SPOTLIGHT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Context, Metadata, Imagery & Historical Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#9A3412] mb-1">
                <span>ÉPOCA {selectedEra.number}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedEra.period}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedEra.approxYears}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                {selectedEra.name}
              </h1>
              <p className="text-base font-serif italic text-stone-600 mt-2">
                {selectedEra.subtitle}
              </p>
            </div>

            {/* Archival Image if available */}
            {selectedEra.imagePath && (
              <div className="space-y-2">
                <div className="overflow-hidden rounded-lg border border-stone-200 aspect-16/9 bg-stone-100">
                  <img
                    src={selectedEra.imagePath}
                    alt={selectedEra.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                  />
                </div>
                {selectedEra.imageCaption && (
                  <p className="text-xs font-serif text-stone-500 italic">
                    {selectedEra.imageCaption}
                  </p>
                )}
              </div>
            )}

            {/* Narrative text */}
            <div className="text-stone-800 text-sm leading-relaxed space-y-3 font-serif">
              <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-stone-900">
                {selectedEra.description}
              </p>
            </div>

            {/* Historical Milestone callout */}
            <div className="p-4 bg-amber-50/70 border-l-3 border-[#9A3412] rounded-r-lg space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9A3412]">
                Hito Histórico Fundamental
              </span>
              <p className="text-xs font-serif text-stone-800 leading-relaxed">
                {selectedEra.historicalMilestone}
              </p>
            </div>

            {/* Technical Support & Pioneers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100 text-xs">
              <div>
                <span className="font-mono text-stone-500 text-[11px] uppercase block mb-1">
                  Soporte Físico y Técnica:
                </span>
                <p className="font-serif text-stone-800 font-medium">
                  {selectedEra.technicalSupport}
                </p>
              </div>
              <div>
                <span className="font-mono text-stone-500 text-[11px] uppercase block mb-1">
                  Pioneros y Figuras Clave:
                </span>
                <p className="font-serif text-stone-800 font-medium">
                  {selectedEra.pioneers.join(', ')}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onInspectAnatomy(selectedEra)}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded hover:bg-[#9A3412] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Explorar en Inspector Anatómico</span>
              </button>
              <button
                onClick={() => onCompareEra(selectedEra)}
                className="px-4 py-2 bg-stone-100 border border-stone-200 text-stone-800 text-xs font-medium rounded hover:bg-stone-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <GitCompare className="w-4 h-4" />
                <span>Comparar con otra Época</span>
              </button>
            </div>
          </div>

          {/* Anatomical Traits list card */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-stone-900 font-bold">
              Desglose de Rasgos Morfológicos
            </h3>
            <div className="space-y-3">
              {selectedEra.anatomicalBreakdown.map((item, i) => (
                <div key={i} className="p-3 bg-stone-50 rounded-lg border border-stone-100 space-y-1">
                  <span className="font-serif font-bold text-xs text-stone-900 block">
                    {item.feature}
                  </span>
                  <p className="text-xs text-stone-600 font-serif leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Anatomical Metrics Radar & Quick Glyph Inset (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 4 Pillars of Anatomy Card */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold">
              Las 4 Variables Anatómicas
            </h3>

            {/* Variable 1: Eje de Modulación */}
            <div className="p-3.5 bg-[#FAF8F5] border border-stone-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-900 uppercase">
                  1. Estructura del Eje
                </span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono text-xs font-bold rounded">
                  {selectedEra.axisAngle}° de inclinación
                </span>
              </div>
              <p className="text-xs font-serif text-stone-600 leading-relaxed">
                {selectedEra.axisDescription}
              </p>
              {/* Visual meter */}
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#9A3412] h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (selectedEra.axisAngle / 45) * 100)}%` }}
                />
              </div>
            </div>

            {/* Variable 2: Modulación y Ductus */}
            <div className="p-3.5 bg-[#FAF8F5] border border-stone-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-900 uppercase">
                  2. Ductus y Modulación
                </span>
                <span className="px-2 py-0.5 bg-stone-200 text-stone-800 font-mono text-xs font-bold rounded">
                  {selectedEra.ductusType}
                </span>
              </div>
              <p className="text-xs font-serif text-stone-600 leading-relaxed">
                {selectedEra.ductus}
              </p>
            </div>

            {/* Variable 3: Contraste de Trazo */}
            <div className="p-3.5 bg-[#FAF8F5] border border-stone-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-900 uppercase">
                  3. Contraste de Trazo
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-900 font-mono text-xs font-bold rounded">
                  {selectedEra.contrastRatio}:1 ({selectedEra.contrastLevel})
                </span>
              </div>
              <p className="text-xs font-serif text-stone-600 leading-relaxed">
                {selectedEra.contrastDescription}
              </p>
              {/* Visual meter */}
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-700 h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (selectedEra.contrastRatio / 20) * 100)}%` }}
                />
              </div>
            </div>

            {/* Variable 4: Tipo de Serifa */}
            <div className="p-3.5 bg-[#FAF8F5] border border-stone-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-900 uppercase">
                  4. Tipo de Serifa
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 font-mono text-xs font-bold rounded">
                  {selectedEra.serifType}
                </span>
              </div>
              <p className="text-xs font-serif text-stone-600 leading-relaxed">
                {selectedEra.serifDescription}
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
                <span>Cartabón (Apófige):</span>
                <span className={selectedEra.hasBracket ? 'text-emerald-700 font-semibold' : 'text-stone-700'}>
                  {selectedEra.hasBracket ? 'Presente (Curvado)' : 'Ausente (Ángulo seco)'}
                </span>
              </div>
            </div>
          </div>

          {/* Live Vector Glyph Preview */}
          <GlyphViewer
            era={selectedEra}
            selectedLetter="O"
            showAxisGuide={true}
            showContrastCaliper={true}
            showSerifLoupe={true}
            showMetricLines={true}
            interactiveControls={true}
          />
        </div>
      </section>

      {/* 3. SPECIMEN INTERACTIVE READING BENCH */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold">
              Espécimen Tipográfico en Vivo
            </h3>
            <p className="text-xs font-serif text-stone-600">
              Prueba de lectura continua simulada con el carácter histórico de la época
            </p>
          </div>

          {/* Controls: Size slider & Reset */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-stone-500">Tamaño:</span>
              <input
                type="range"
                min="18"
                max="64"
                value={specimenFontSize}
                onChange={(e) => setSpecimenFontSize(Number(e.target.value))}
                className="w-28 accent-[#9A3412]"
              />
              <span className="w-8 tabular-nums text-stone-800">{specimenFontSize}px</span>
            </div>
            <button
              onClick={() => setCustomSpecimenText('')}
              className="text-stone-500 hover:text-stone-900 underline text-[11px]"
            >
              Restablecer
            </button>
          </div>
        </div>

        {/* Specimen Output Area */}
        <div className="p-6 bg-[#FBF9F5] rounded-lg border border-stone-200 overflow-x-hidden min-h-[140px] flex items-center justify-center text-center">
          <p
            className={`${selectedEra.fontFamilyClass} text-stone-900 transition-all leading-tight max-w-4xl`}
            style={{ fontSize: `${specimenFontSize}px` }}
          >
            {customSpecimenText || selectedEra.sampleQuote}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
          <span className="italic font-serif">
            — {selectedEra.sampleQuoteAuthor}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px]">Fuentes representativas:</span>
            <span className="font-medium text-stone-800">
              {selectedEra.representativeTypefaces.join(' · ')}
            </span>
          </div>
        </div>

        {/* Input to test custom text */}
        <div className="pt-2">
          <input
            type="text"
            placeholder="Escribe tu propio texto o pangrama aquí para probar el tipo..."
            value={customSpecimenText}
            onChange={(e) => setCustomSpecimenText(e.target.value)}
            className="w-full px-4 py-2 text-xs border border-stone-200 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#9A3412] focus:bg-white transition-colors"
          />
        </div>
      </section>
    </div>
  );
};
