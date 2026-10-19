import React, { useState } from 'react';
import { GlyphViewer } from './GlyphViewer';
import { TYPOGRAPHIC_ERAS, TypographicEra } from '../data/typographyHistory';
import { Sliders, RotateCcw, Crosshair, Sparkles, Wand2 } from 'lucide-react';

export const AxisSandbox: React.FC = () => {
  // Parametric controls
  const [axisAngle, setAxisAngle] = useState<number>(15);
  const [contrastRatio, setContrastRatio] = useState<number>(3.5);
  const [weight, setWeight] = useState<number>(36);
  const [serifType, setSerifType] = useState<string>('Triangular con cartabón');
  const [selectedLetter, setSelectedLetter] = useState<string>('O');

  // Synthetic era wrapper to feed into GlyphViewer
  const simulatedEra: TypographicEra = {
    ...TYPOGRAPHIC_ERAS[6], // Default to garalde base
    id: 'sandbox-simulated',
    name: 'Espécimen Paramétrico Interactivo',
    axisAngle,
    contrastRatio,
    serifType: serifType as any,
  };

  // Preset loader
  const loadPreset = (preset: {
    axis: number;
    contrast: number;
    weight: number;
    serif: string;
  }) => {
    setAxisAngle(preset.axis);
    setContrastRatio(preset.contrast);
    setWeight(preset.weight);
    setSerifType(preset.serif);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#9A3412] mb-1">
              <span>SÍNTESIS PARAMÉTRICA</span>
              <span aria-hidden="true">·</span>
              <span>SIMULADOR DE VARIABLES TIPOGRÁFICAS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Laboratorio de Ejes y Modulación
            </h1>
            <p className="text-xs font-serif text-stone-600 mt-1">
              Manipula en tiempo real la inclinación del eje, el contraste de trazo, el peso y la morfología del remate
            </p>
          </div>

          {/* Glyph Switcher */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-mono text-stone-500">Glifo:</span>
            {['O', 'A', 'e', 'g', 'R', 'S'].map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLetter(l)}
                className={`w-8 h-8 rounded font-serif font-bold transition-colors ${
                  selectedLetter === l
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Historical Presets bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs">
          <span className="font-mono text-stone-500 text-[11px] flex items-center gap-1">
            <Wand2 className="w-3 h-3 text-[#9A3412]" />
            Presets Históricos:
          </span>
          <button
            onClick={() => loadPreset({ axis: 25, contrast: 1.8, weight: 36, serif: 'Triangular cóncava' })}
            className="px-2.5 py-1 bg-[#FAF8F5] border border-stone-200 rounded hover:border-[#9A3412] text-stone-700 transition-colors"
          >
            Veneciana 1470
          </button>
          <button
            onClick={() => loadPreset({ axis: 15, contrast: 3.2, weight: 34, serif: 'Triangular con cartabón' })}
            className="px-2.5 py-1 bg-[#FAF8F5] border border-stone-200 rounded hover:border-[#9A3412] text-stone-700 transition-colors"
          >
            Garamond 1540
          </button>
          <button
            onClick={() => loadPreset({ axis: 6, contrast: 6.5, weight: 38, serif: 'Afilada con suave cartabón' })}
            className="px-2.5 py-1 bg-[#FAF8F5] border border-stone-200 rounded hover:border-[#9A3412] text-stone-700 transition-colors"
          >
            Baskerville 1757
          </button>
          <button
            onClick={() => loadPreset({ axis: 0, contrast: 18.0, weight: 42, serif: 'Filiforme recta sin cartabón' })}
            className="px-2.5 py-1 bg-[#FAF8F5] border border-stone-200 rounded hover:border-[#9A3412] text-stone-700 transition-colors"
          >
            Bodoni 1798
          </button>
          <button
            onClick={() => loadPreset({ axis: 0, contrast: 1.2, weight: 52, serif: 'Cuadrada / Bloque (Slab)' })}
            className="px-2.5 py-1 bg-[#FAF8F5] border border-stone-200 rounded hover:border-[#9A3412] text-stone-700 transition-colors"
          >
            Egipcia 1845
          </button>
          <button
            onClick={() => loadPreset({ axis: 0, contrast: 1.05, weight: 36, serif: 'Suprimida (Sans-Serif)' })}
            className="px-2.5 py-1 bg-[#FAF8F5] border border-stone-200 rounded hover:border-[#9A3412] text-stone-700 transition-colors"
          >
            Helvetica 1957
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Sliders Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold">
            Parámetros del Signo Tipográfico
          </h2>

          {/* 1. Inclinación del Eje */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-serif font-bold text-stone-900">
                Inclinación del Eje (°):
              </label>
              <span className="font-mono font-bold text-[#9A3412] px-2 py-0.5 bg-amber-100 rounded">
                {axisAngle}°
              </span>
            </div>
            <input
              type="range"
              min="-45"
              max="45"
              step="1"
              value={axisAngle}
              onChange={(e) => setAxisAngle(Number(e.target.value))}
              className="w-full accent-[#9A3412]"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-500">
              <span>-45° (Inclinado dcha)</span>
              <span>0° (Vertical pura)</span>
              <span>+45° (Inclinado izq)</span>
            </div>
          </div>

          {/* 2. Contraste de Trazo */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-serif font-bold text-stone-900">
                Ratio de Contraste (Asta : Perfil):
              </label>
              <span className="font-mono font-bold text-blue-900 px-2 py-0.5 bg-blue-100 rounded">
                {contrastRatio.toFixed(1)}:1
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="20.0"
              step="0.5"
              value={contrastRatio}
              onChange={(e) => setContrastRatio(Number(e.target.value))}
              className="w-full accent-blue-800"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-500">
              <span>1.0:1 (Monolineal)</span>
              <span>6.0:1 (Medio-Alto)</span>
              <span>20.0:1 (Didona Extremo)</span>
            </div>
          </div>

          {/* 3. Grosor / Peso General */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-serif font-bold text-stone-900">
                Grosor del Asta Principal:
              </label>
              <span className="font-mono font-bold text-stone-800 px-2 py-0.5 bg-stone-100 rounded">
                {weight}px
              </span>
            </div>
            <input
              type="range"
              min="16"
              max="65"
              step="2"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-stone-900"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-500">
              <span>Light (16px)</span>
              <span>Regular (34px)</span>
              <span>Black (65px)</span>
            </div>
          </div>

          {/* 4. Morfología de Serifa */}
          <div className="space-y-2">
            <label className="font-serif font-bold text-stone-900 text-xs block">
              Morfología del Remate / Serifa:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                'Suprimida (Sans-Serif)',
                'Triangular cóncava',
                'Triangular con cartabón',
                'Filiforme recta sin cartabón',
                'Cuadrada / Bloque (Slab)',
              ].map((style) => (
                <button
                  key={style}
                  onClick={() => setSerifType(style)}
                  className={`p-2 rounded border text-left font-serif transition-colors text-[11px] ${
                    serifType === style
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-[#FAF8F5] border-stone-200 text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Vector Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <GlyphViewer
            era={simulatedEra}
            selectedLetter={selectedLetter}
            customAxis={axisAngle}
            customContrast={contrastRatio}
            customWeight={weight}
            customSerifType={serifType}
            showAxisGuide={true}
            showContrastCaliper={true}
            showSerifLoupe={true}
            showMetricLines={true}
            interactiveControls={true}
          />

          {/* Diagnostic status block */}
          <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-xs text-xs space-y-2">
            <h3 className="font-mono uppercase tracking-wider text-stone-900 font-bold text-[11px]">
              Diagnóstico en Tiempo Real:
            </h3>
            <p className="font-serif text-stone-700 leading-relaxed">
              Con un eje a <strong>{axisAngle}°</strong> y un contraste de <strong>{contrastRatio.toFixed(1)}:1</strong>, 
              esta configuración simula{' '}
              {axisAngle === 0 && contrastRatio > 10
                ? 'el comportamiento de una Romana Moderna Didona pura (Bodoni/Didot).'
                : axisAngle === 0 && serifType.includes('Suprimida')
                ? 'la neutralidad modernista de una Neogrotesca o Sans-Serif suiza (Helvetica).'
                : axisAngle > 18
                ? 'la huella manuscrita caligráfica de las escrituras carolingias y venecianas del primer Renacimiento.'
                : axisAngle === 0 && serifType.includes('Slab')
                ? 'la fuerza mecánica de las tipografías de exhibición de la Revolución Industrial.'
                : 'una transición formal armónica propia de la tipografía editorial clásica.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
