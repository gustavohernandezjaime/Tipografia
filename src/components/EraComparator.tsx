import React, { useState } from 'react';
import { TypographicEra, TYPOGRAPHIC_ERAS } from '../data/typographyHistory';
import { GlyphViewer } from './GlyphViewer';
import { GitCompare, Layers, ArrowLeftRight, Check } from 'lucide-react';

interface EraComparatorProps {
  initialEraA?: TypographicEra;
  initialEraB?: TypographicEra;
}

export const EraComparator: React.FC<EraComparatorProps> = ({
  initialEraA,
  initialEraB,
}) => {
  const [eraAId, setEraAId] = useState<string>(initialEraA?.id || 'humanist-venetian');
  const [eraBId, setEraBId] = useState<string>(initialEraB?.id || 'didone-modern');
  const [selectedLetter, setSelectedLetter] = useState<string>('O');
  const [viewMode, setViewMode] = useState<'split' | 'overlay'>('split');
  const [overlayAlpha, setOverlayAlpha] = useState<number>(50); // 0 = 100% A, 100 = 100% B

  const eraA = TYPOGRAPHIC_ERAS.find((e) => e.id === eraAId) || TYPOGRAPHIC_ERAS[5];
  const eraB = TYPOGRAPHIC_ERAS.find((e) => e.id === eraBId) || TYPOGRAPHIC_ERAS[8];

  // Presets
  const applyPreset = (idA: string, idB: string) => {
    setEraAId(idA);
    setEraBId(idB);
  };

  return (
    <div className="space-y-8">
      {/* 1. COMPARISON CONTROLS HEADER */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#9A3412] mb-1">
              <span>ANÁLISIS COMPARATIVO</span>
              <span aria-hidden="true">·</span>
              <span>CONTRASTE HISTÓRICO</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Comparador de Épocas Tipográficas
            </h1>
          </div>

          {/* Mode Switcher (Split vs Overlay) */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 font-medium rounded transition-colors flex items-center gap-1.5 ${
                viewMode === 'split'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Modo Paralelo</span>
            </button>
            <button
              onClick={() => setViewMode('overlay')}
              className={`px-3 py-1.5 font-medium rounded transition-colors flex items-center gap-1.5 ${
                viewMode === 'overlay'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Superposición Fantasma</span>
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs">
          <span className="font-mono text-stone-500 text-[11px]">Duelos Canónicos:</span>
          <button
            onClick={() => applyPreset('humanist-venetian', 'didone-modern')}
            className="px-2.5 py-1 bg-[#FAF8F5] border border-stone-200 rounded hover:border-[#9A3412] text-stone-700 transition-colors"
          >
            Humanista (1470) vs Didona (1798)
          </button>
          <button
            onClick={() => applyPreset('trajan-monumentalis', 'twentieth-modernism')}
            className="px-2.5 py-1 bg-[#FAF8F5] border border-stone-200 rounded hover:border-[#9A3412] text-stone-700 transition-colors"
          >
            Trajano (113 d.C.) vs Helvetica (1957)
          </button>
          <button
            onClick={() => applyPreset('garalde-oldstyle', 'transitional-neoclassical')}
            className="px-2.5 py-1 bg-[#FAF8F5] border border-stone-200 rounded hover:border-[#9A3412] text-stone-700 transition-colors"
          >
            Garamond (1540) vs Baskerville (1757)
          </button>
          <button
            onClick={() => applyPreset('industrial-slab', 'twentieth-modernism')}
            className="px-2.5 py-1 bg-[#FAF8F5] border border-stone-200 rounded hover:border-[#9A3412] text-stone-700 transition-colors"
          >
            Egipcia Slab (1845) vs Bauhaus Sans
          </button>
        </div>

        {/* Era Selectors Dual Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Era A Selector */}
          <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-lg space-y-1">
            <span className="font-mono text-[11px] font-bold text-[#9A3412] block">
              ESPECIMEN A (REFERENCIA 1)
            </span>
            <select
              value={eraAId}
              onChange={(e) => setEraAId(e.target.value)}
              className="w-full text-xs font-serif font-bold bg-white border border-stone-300 rounded p-2 text-stone-900 focus:outline-none focus:border-[#9A3412]"
            >
              {TYPOGRAPHIC_ERAS.map((era) => (
                <option key={era.id} value={era.id}>
                  {era.number}. {era.name} ({era.approxYears})
                </option>
              ))}
            </select>
          </div>

          {/* Era B Selector */}
          <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg space-y-1">
            <span className="font-mono text-[11px] font-bold text-blue-900 block">
              ESPECIMEN B (REFERENCIA 2)
            </span>
            <select
              value={eraBId}
              onChange={(e) => setEraBId(e.target.value)}
              className="w-full text-xs font-serif font-bold bg-white border border-stone-300 rounded p-2 text-stone-900 focus:outline-none focus:border-blue-700"
            >
              {TYPOGRAPHIC_ERAS.map((era) => (
                <option key={era.id} value={era.id}>
                  {era.number}. {era.name} ({era.approxYears})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Glyph selection buttons */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-stone-500 font-mono">Letra de Comparación:</span>
          <div className="flex gap-1.5">
            {['O', 'A', 'e', 'g', 'R', 'S'].map((glyph) => (
              <button
                key={glyph}
                onClick={() => setSelectedLetter(glyph)}
                className={`w-8 h-8 rounded text-xs font-serif font-bold transition-colors ${
                  selectedLetter === glyph
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {glyph}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. COMPARATIVE VISUAL DISPLAY */}
      {viewMode === 'split' ? (
        /* SPLIT VIEW (Side by side) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column A */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-stone-900 text-sm">
                A: {eraA.name}
              </span>
              <span className="font-mono text-[#9A3412] font-semibold">
                {eraA.approxYears}
              </span>
            </div>
            <GlyphViewer
              era={eraA}
              selectedLetter={selectedLetter}
              showAxisGuide={true}
              showContrastCaliper={true}
              showSerifLoupe={true}
              showMetricLines={true}
              interactiveControls={false}
            />
          </div>

          {/* Column B */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-stone-900 text-sm">
                B: {eraB.name}
              </span>
              <span className="font-mono text-blue-900 font-semibold">
                {eraB.approxYears}
              </span>
            </div>
            <GlyphViewer
              era={eraB}
              selectedLetter={selectedLetter}
              showAxisGuide={true}
              showContrastCaliper={true}
              showSerifLoupe={true}
              showMetricLines={true}
              interactiveControls={false}
            />
          </div>
        </div>
      ) : (
        /* GHOST OVERLAY VIEW */
        <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                Superposición Fantasma: {eraA.name} ⟷ {eraB.name}
              </h2>
              <p className="text-xs font-serif text-stone-600">
                Desplaza el control para disolver una época en la otra y ver el corrimiento milimétrico del eje y el adelgazamiento del trazo
              </p>
            </div>

            {/* Slider */}
            <div className="flex items-center gap-3 text-xs font-mono w-full sm:w-auto">
              <span className="text-[#9A3412] font-bold truncate max-w-[120px]">{eraA.name.split(' ')[0]}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={overlayAlpha}
                onChange={(e) => setOverlayAlpha(Number(e.target.value))}
                className="w-44 accent-stone-900"
              />
              <span className="text-blue-900 font-bold truncate max-w-[120px]">{eraB.name.split(' ')[0]}</span>
            </div>
          </div>

          {/* Combined Overlay Canvas */}
          <div className="relative w-full aspect-square max-w-[480px] mx-auto bg-[#FAF8F5] border border-stone-200 rounded-xl overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#1C1917_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Layer A (Amber/Terracotta) */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity pointer-events-none"
              style={{ opacity: (100 - overlayAlpha) / 100 }}
            >
              <div className="scale-95 text-[#9A3412]">
                <GlyphViewer
                  era={eraA}
                  selectedLetter={selectedLetter}
                  showAxisGuide={true}
                  showContrastCaliper={false}
                  showSerifLoupe={false}
                  showMetricLines={true}
                  interactiveControls={false}
                />
              </div>
            </div>

            {/* Layer B (Deep Slate / Blue) */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity pointer-events-none"
              style={{ opacity: overlayAlpha / 100 }}
            >
              <div className="scale-95 text-blue-950">
                <GlyphViewer
                  era={eraB}
                  selectedLetter={selectedLetter}
                  showAxisGuide={true}
                  showContrastCaliper={false}
                  showSerifLoupe={false}
                  showMetricLines={false}
                  interactiveControls={false}
                />
              </div>
            </div>

            {/* Indicator in corner */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs border border-stone-200 rounded p-2 text-[11px] font-mono shadow-xs space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9A3412]" />
                <span className="font-bold text-[#9A3412]">{eraA.name} ({eraA.axisAngle}°)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900" />
                <span className="font-bold text-blue-900">{eraB.name} ({eraB.axisAngle}°)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. RIGOROUS COMPARATIVE METRICS MATRIX */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 sm:p-6 border-b border-stone-200 bg-stone-50/70">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold">
            Matriz Comparativa de Rasgos Estructurales
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-serif text-left">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-100/50 font-mono text-[11px] text-stone-600 uppercase">
                <th className="p-3.5 sm:px-6">Variable Anatómica</th>
                <th className="p-3.5 sm:px-6 text-[#9A3412]">
                  {eraA.name} ({eraA.approxYears})
                </th>
                <th className="p-3.5 sm:px-6 text-blue-900">
                  {eraB.name} ({eraB.approxYears})
                </th>
                <th className="p-3.5 sm:px-6 font-sans">Delta / Transformación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {/* Row 1: Eje */}
              <tr>
                <td className="p-3.5 sm:px-6 font-mono font-bold text-stone-900">
                  Eje de Modulación
                </td>
                <td className="p-3.5 sm:px-6 font-mono text-[#9A3412] font-bold">
                  {eraA.axisAngle}° ({eraA.axisAngle === 0 ? 'Vertical pura' : 'Oblicuo'})
                </td>
                <td className="p-3.5 sm:px-6 font-mono text-blue-900 font-bold">
                  {eraB.axisAngle}° ({eraB.axisAngle === 0 ? 'Vertical pura' : 'Oblicuo'})
                </td>
                <td className="p-3.5 sm:px-6 text-stone-600">
                  Variación angular de {Math.abs(eraA.axisAngle - eraB.axisAngle)}°.
                  {eraA.axisAngle > eraB.axisAngle
                    ? ' Enderezamiento progresivo hacia la simetría vertical cartesiana.'
                    : ' Inclinación hacia la organicidad manuscrita.'}
                </td>
              </tr>

              {/* Row 2: Contraste */}
              <tr>
                <td className="p-3.5 sm:px-6 font-mono font-bold text-stone-900">
                  Contraste de Trazo
                </td>
                <td className="p-3.5 sm:px-6 font-mono text-[#9A3412] font-bold">
                  {eraA.contrastRatio}:1 ({eraA.contrastLevel})
                </td>
                <td className="p-3.5 sm:px-6 font-mono text-blue-900 font-bold">
                  {eraB.contrastRatio}:1 ({eraB.contrastLevel})
                </td>
                <td className="p-3.5 sm:px-6 text-stone-600">
                  Diferencia de {(eraB.contrastRatio / Math.max(0.1, eraA.contrastRatio)).toFixed(1)}x en ratio de grosor.
                  {eraB.contrastRatio > eraA.contrastRatio
                    ? ' Transición a perfiles filiformes de alto refinamiento de grabado.'
                    : ' Homogeneización o retorno al trazo monolineal funcional.'}
                </td>
              </tr>

              {/* Row 3: Ductus */}
              <tr>
                <td className="p-3.5 sm:px-6 font-mono font-bold text-stone-900">
                  Ductus & Herramienta
                </td>
                <td className="p-3.5 sm:px-6">
                  <span className="font-mono text-stone-700 block font-bold">{eraA.ductusType}</span>
                  <span className="text-stone-500 text-[11px]">{eraA.ductus}</span>
                </td>
                <td className="p-3.5 sm:px-6">
                  <span className="font-mono text-stone-700 block font-bold">{eraB.ductusType}</span>
                  <span className="text-stone-500 text-[11px]">{eraB.ductus}</span>
                </td>
                <td className="p-3.5 sm:px-6 text-stone-600">
                  Evolución del soporte y la técnica de grabado.
                </td>
              </tr>

              {/* Row 4: Serifas */}
              <tr>
                <td className="p-3.5 sm:px-6 font-mono font-bold text-stone-900">
                  Morfología de Serifa
                </td>
                <td className="p-3.5 sm:px-6">
                  <span className="font-bold block text-stone-900">{eraA.serifType}</span>
                  <span className="text-stone-500 text-[11px]">Cartabón: {eraA.hasBracket ? 'Sí' : 'No'}</span>
                </td>
                <td className="p-3.5 sm:px-6">
                  <span className="font-bold block text-stone-900">{eraB.serifType}</span>
                  <span className="text-stone-500 text-[11px]">Cartabón: {eraB.hasBracket ? 'Sí' : 'No'}</span>
                </td>
                <td className="p-3.5 sm:px-6 text-stone-600">
                  {eraA.hasBracket !== eraB.hasBracket
                    ? 'Transición entre remates enlazados con cartabón orgánico y remates en corte seco/ángulo de 90°.'
                    : 'Morfologías de remate con tratamiento de cartabón equivalente.'}
                </td>
              </tr>

              {/* Row 5: Soporte Técnico */}
              <tr>
                <td className="p-3.5 sm:px-6 font-mono font-bold text-stone-900">
                  Soporte Físico Original
                </td>
                <td className="p-3.5 sm:px-6 text-stone-700">
                  {eraA.technicalSupport}
                </td>
                <td className="p-3.5 sm:px-6 text-stone-700">
                  {eraB.technicalSupport}
                </td>
                <td className="p-3.5 sm:px-6 text-stone-600">
                  Impacto directo de los materiales en la pureza del signo.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
