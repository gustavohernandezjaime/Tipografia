import React, { useState } from 'react';
import { TypographicEra, TYPOGRAPHIC_ERAS } from '../data/typographyHistory';
import { GlyphViewer } from './GlyphViewer';
import { Compass, RotateCcw, Crosshair, ZoomIn, Ruler, BookOpen, Layers } from 'lucide-react';

interface AnatomyInspectorProps {
  selectedEra: TypographicEra;
  onSelectEra: (era: TypographicEra) => void;
}

type InspectionFocus = 'axis' | 'modulation' | 'contrast' | 'serif';

export const AnatomyInspector: React.FC<AnatomyInspectorProps> = ({
  selectedEra,
  onSelectEra,
}) => {
  const [activeFocus, setActiveFocus] = useState<InspectionFocus>('axis');
  const [activeLetter, setActiveLetter] = useState<string>('O');

  return (
    <div className="space-y-8">
      {/* 1. HEADER & ERA SELECTOR BAR */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#9A3412] mb-1">
              <span>LABORATORIO DIAGNÓSTICO</span>
              <span aria-hidden="true">·</span>
              <span>ANÁLISIS MORFOMÉTRICO</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Inspector de Anatomía Tipográfica
            </h1>
          </div>

          {/* Quick Era selector dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-500">Seleccionar Época:</span>
            <select
              value={selectedEra.id}
              onChange={(e) => {
                const found = TYPOGRAPHIC_ERAS.find((item) => item.id === e.target.value);
                if (found) onSelectEra(found);
              }}
              className="text-xs font-serif bg-[#FAF8F5] border border-stone-300 rounded px-3 py-1.5 text-stone-900 focus:outline-none focus:border-[#9A3412]"
            >
              {TYPOGRAPHIC_ERAS.map((era) => (
                <option key={era.id} value={era.id}>
                  {era.number}. {era.name} ({era.approxYears})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4 Focused Anatomical Modes Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-100">
          <button
            onClick={() => setActiveFocus('axis')}
            className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
              activeFocus === 'axis'
                ? 'bg-amber-50/80 border-[#9A3412] text-[#9A3412]'
                : 'bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <RotateCcw className="w-4 h-4" />
              <span className="font-mono text-[11px] font-bold">{selectedEra.axisAngle}°</span>
            </div>
            <span className="text-xs font-serif font-bold">1. Estructura del Eje</span>
          </button>

          <button
            onClick={() => setActiveFocus('modulation')}
            className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
              activeFocus === 'modulation'
                ? 'bg-amber-50/80 border-[#9A3412] text-[#9A3412]'
                : 'bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <Compass className="w-4 h-4" />
              <span className="font-mono text-[11px] truncate max-w-[80px]">{selectedEra.ductusType}</span>
            </div>
            <span className="text-xs font-serif font-bold">2. Ductus y Modulación</span>
          </button>

          <button
            onClick={() => setActiveFocus('contrast')}
            className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
              activeFocus === 'contrast'
                ? 'bg-amber-50/80 border-[#9A3412] text-[#9A3412]'
                : 'bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <Crosshair className="w-4 h-4" />
              <span className="font-mono text-[11px] font-bold">{selectedEra.contrastRatio}:1</span>
            </div>
            <span className="text-xs font-serif font-bold">3. Contraste de Trazo</span>
          </button>

          <button
            onClick={() => setActiveFocus('serif')}
            className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
              activeFocus === 'serif'
                ? 'bg-amber-50/80 border-[#9A3412] text-[#9A3412]'
                : 'bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <ZoomIn className="w-4 h-4" />
              <span className="font-mono text-[11px] truncate max-w-[80px]">{selectedEra.serifType.split(' ')[0]}</span>
            </div>
            <span className="text-xs font-serif font-bold">4. Tipos de Serifa</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN SPLIT DIAGNOSTIC VIEWPORT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Vector Glyph Viewer with full calipers and overlays (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <GlyphViewer
            era={selectedEra}
            selectedLetter={activeLetter}
            onSelectLetter={setActiveLetter}
            showAxisGuide={activeFocus === 'axis' || activeFocus === 'modulation'}
            showContrastCaliper={activeFocus === 'contrast'}
            showSerifLoupe={activeFocus === 'serif'}
            showMetricLines={true}
            interactiveControls={true}
          />

          {/* Glifo switcher pills */}
          <div className="bg-white border border-stone-200 rounded-lg p-3 text-xs flex items-center justify-between">
            <span className="text-stone-500 font-mono">Selección de Glifo:</span>
            <div className="flex gap-1.5">
              {['O', 'e', 'A', 'g', 'R', 'S'].map((glyph) => (
                <button
                  key={glyph}
                  onClick={() => setActiveLetter(glyph)}
                  className={`w-7 h-7 rounded text-xs font-serif font-bold transition-colors ${
                    activeLetter === glyph
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

        {/* Right: Deep Curatorial Analysis of the Active Focus (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* FOCUS 1: AXIS STRUCTURE */}
          {activeFocus === 'axis' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold block mb-1">
                  Variable 1 · Inclinación y Simetría
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  La Estructura del Eje de Modulación
                </h2>
                <p className="text-xs font-serif italic text-stone-600 mt-1">
                  De la huella oblicua del cálamo humano al rigor vertical de la máquina moderna
                </p>
              </div>

              {/* Active era axis metrics */}
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs text-stone-900">
                    Eje en {selectedEra.name}:
                  </span>
                  <span className="font-mono text-sm font-bold text-[#9A3412]">
                    {selectedEra.axisAngle}° de inclinación
                  </span>
                </div>
                <p className="text-xs font-serif text-stone-700 leading-relaxed">
                  {selectedEra.axisDescription}
                </p>
              </div>

              {/* Historical Evolution Timeline of the Axis */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold">
                  La Trayectoria Histórica del Eje (° de desviación):
                </h3>
                
                <div className="space-y-2 text-xs font-serif">
                  <div className="flex items-center justify-between p-2.5 rounded bg-stone-50 border border-stone-100">
                    <div>
                      <span className="font-bold text-stone-900">1. Minúscula Carolina (~800 d.C.)</span>
                      <p className="text-[11px] text-stone-500">Ángulo natural de pluma en la mano monástica</p>
                    </div>
                    <span className="font-mono font-bold text-[#9A3412] px-2 py-0.5 bg-amber-100 rounded">
                      ~35° – 45°
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-stone-50 border border-stone-100">
                    <div>
                      <span className="font-bold text-stone-900">2. Romana Humanista / Veneciana (1470)</span>
                      <p className="text-[11px] text-stone-500">Barra inclinada en la 'e' y eje oblicuo visible en 'o'</p>
                    </div>
                    <span className="font-mono font-bold text-[#9A3412] px-2 py-0.5 bg-amber-100 rounded">
                      ~25°
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-stone-50 border border-stone-100">
                    <div>
                      <span className="font-bold text-stone-900">3. Garaldas / Renacimiento Clásico (1540)</span>
                      <p className="text-[11px] text-stone-500">Barra de 'e' se vuelve horizontal; eje moderado</p>
                    </div>
                    <span className="font-mono font-bold text-[#9A3412] px-2 py-0.5 bg-amber-100 rounded">
                      ~15°
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-stone-50 border border-stone-100">
                    <div>
                      <span className="font-bold text-stone-900">4. Tipografía de Transición (1757)</span>
                      <p className="text-[11px] text-stone-500">Baskerville endereza casi por completo la letra</p>
                    </div>
                    <span className="font-mono font-bold text-[#9A3412] px-2 py-0.5 bg-amber-100 rounded">
                      ~6°
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-stone-50 border border-stone-100">
                    <div>
                      <span className="font-bold text-stone-900">5. Didonas / Neoclásica Moderna (1798)</span>
                      <p className="text-[11px] text-stone-500">Bodoni y Didot: simetría axial matemática absoluta</p>
                    </div>
                    <span className="font-mono font-bold text-emerald-800 px-2 py-0.5 bg-emerald-100 rounded">
                      0° (Vertical Pura)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-stone-50 border border-stone-100">
                    <div>
                      <span className="font-bold text-stone-900">6. Era Digital y Variable (Presente)</span>
                      <p className="text-[11px] text-stone-500">Eje interactivo continuo interpolado en vivo por software</p>
                    </div>
                    <span className="font-mono font-bold text-blue-800 px-2 py-0.5 bg-blue-100 rounded">
                      Paramétrico (-45° a +45°)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FOCUS 2: DUCTUS AND MODULATION */}
          {activeFocus === 'modulation' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold block mb-1">
                  Variable 2 · El Gesto y la Herramienta
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Ductus y Modulación Dinámica
                </h2>
                <p className="text-xs font-serif italic text-stone-600 mt-1">
                  Cómo el ángulo de contacto de la herramienta esculpe el espesor del signo
                </p>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs text-stone-900">
                    Técnica en {selectedEra.name}:
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-stone-200 rounded text-stone-800">
                    {selectedEra.ductusType}
                  </span>
                </div>
                <p className="text-xs font-serif text-stone-700 leading-relaxed">
                  {selectedEra.ductus}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold">
                  La Metamorfosis de la Herramienta:
                </h3>
                <div className="space-y-3 text-xs font-serif">
                  <div className="p-3 border border-stone-200 rounded-lg">
                    <span className="font-bold text-stone-900 block mb-1">1. El Cálamo y la Pluma de Ave (s. IV – XV)</span>
                    <p className="text-stone-600 leading-relaxed">
                      El espesor de la línea no lo decide el dibujante, sino la física del corte biselado de la caña. Al desplazarse a 30°, los trazos verticales son gruesos y las diagonales son finas.
                    </p>
                  </div>
                  <div className="p-3 border border-stone-200 rounded-lg">
                    <span className="font-bold text-stone-900 block mb-1">2. El Punzón de Acero y el Buril (s. XVI – XVIII)</span>
                    <p className="text-stone-600 leading-relaxed">
                      El tipógrafo ya no escribe: esculpe un punzón en relieve. La modulación se somete al control milimétrico de la lima y a la armonía óptica calculada.
                    </p>
                  </div>
                  <div className="p-3 border border-stone-200 rounded-lg">
                    <span className="font-bold text-stone-900 block mb-1">3. La Geometría Analítica y la Máquina (s. XIX – XX)</span>
                    <p className="text-stone-600 leading-relaxed">
                      Con la Bauhaus y la Helvetica, la modulación se suprime o se limita a mínimas trampas ópticas (óvalos compensados) para lograr la ilusión de un espesor uniforme e industrial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FOCUS 3: CONTRAST RATIO */}
          {activeFocus === 'contrast' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold block mb-1">
                  Variable 3 · Relación Asta / Perfil
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  El Contraste de Trazo
                </h2>
                <p className="text-xs font-serif italic text-stone-600 mt-1">
                  La relación matemática proporcional entre el grosor máximo y mínimo
                </p>
              </div>

              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs text-blue-900">
                    Ratio de Contraste en {selectedEra.name}:
                  </span>
                  <span className="font-mono text-base font-bold text-blue-800">
                    {selectedEra.contrastRatio}:1 ({selectedEra.contrastLevel})
                  </span>
                </div>
                <p className="text-xs font-serif text-stone-700 leading-relaxed">
                  {selectedEra.contrastDescription}
                </p>
              </div>

              {/* Comparative ladder */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold">
                  Escala Comparativa de Contrastes:
                </h3>
                <div className="space-y-2 text-xs font-serif">
                  <div className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-100">
                    <span>Sans-Serif y Geométricas (Futura/Helvetica)</span>
                    <span className="font-mono font-bold text-stone-700">1:1 a 1.1:1 (Monolineal)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-100">
                    <span>Egipcias y Mecánicas (Rockwell/Clarendon)</span>
                    <span className="font-mono font-bold text-stone-700">1.2:1 (Muy bajo)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-100">
                    <span>Romana Humanista (Nicholas Jenson)</span>
                    <span className="font-mono font-bold text-stone-700">1.8:1 (Bajo)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-100">
                    <span>Garalda Clásica (Claude Garamond)</span>
                    <span className="font-mono font-bold text-stone-700">3.2:1 (Medio)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-100">
                    <span>Transición (John Baskerville)</span>
                    <span className="font-mono font-bold text-amber-800">6.5:1 (Alto)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-blue-50/50 border border-blue-200">
                    <span className="font-bold text-stone-900">Didona Moderna (Bodoni / Didot)</span>
                    <span className="font-mono font-bold text-blue-800">18:1 a 25:1 (Extremo)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FOCUS 4: SERIF TYPES AND BRACKETS */}
          {activeFocus === 'serif' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold block mb-1">
                  Variable 4 · Remates y Cartabón
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Tipos de Serifas y Apófiges
                </h2>
                <p className="text-xs font-serif italic text-stone-600 mt-1">
                  La resolución terminal del asta: de la base de mármol a la supresión moderna
                </p>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs text-emerald-900">
                    Morfología en {selectedEra.name}:
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded">
                    {selectedEra.serifType}
                  </span>
                </div>
                <p className="text-xs font-serif text-stone-700 leading-relaxed">
                  {selectedEra.serifDescription}
                </p>
                <div className="pt-1 text-[11px] font-mono text-emerald-800">
                  Cartabón (Apófige): {selectedEra.hasBracket ? 'Presente y fluido' : 'Ausente (Ángulo seco)'}
                </div>
              </div>

              {/* Taxonomy of serifs */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold">
                  Catálogo Taxonómico de Serifas:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-1">
                    <span className="font-bold text-stone-900 block">Triangular con Cartabón</span>
                    <p className="text-stone-600 leading-relaxed text-[11px]">
                      Típica de las Mayúsculas Trajanas y Garaldas. Unión curva fluida con la base.
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-1">
                    <span className="font-bold text-stone-900 block">Filiforme Sin Cartabón</span>
                    <p className="text-stone-600 leading-relaxed text-[11px]">
                      Didonas (Bodoni). Línea horizontal de grosor mínimo en ángulo recto exacto de 90°.
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-1">
                    <span className="font-bold text-stone-900 block">Cuadrada / Bloque (Slab)</span>
                    <p className="text-stone-600 leading-relaxed text-[11px]">
                      Egipcias mecánicas. Remates rectangulares masivos del mismo grosor que el asta.
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-1">
                    <span className="font-bold text-stone-900 block">Suprimida (Sans-Serif)</span>
                    <p className="text-stone-600 leading-relaxed text-[11px]">
                      Palo seco. El asta concluye en un corte tajante sin ningún apéndice terminal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
