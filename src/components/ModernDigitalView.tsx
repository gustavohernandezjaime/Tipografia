import React, { useState } from 'react';
import { Sparkles, Sliders, Layers, Eye, Smartphone, Zap, Check, ArrowRight } from 'lucide-react';

interface ModernMovement {
  id: string;
  name: string;
  period: string;
  keyFigures: string[];
  philosophicalCore: string;
  serifStatus: string;
  impactOnDesign: string;
  representativeTypefaces: string[];
  samplePangram: string;
  fontClass: string;
}

const MODERN_MOVEMENTS: ModernMovement[] = [
  {
    id: 'bauhaus',
    name: '1. Bauhaus y la Nueva Tipografía',
    period: '1919 – 1933 (Alemania)',
    keyFigures: ['Herbert Bayer', 'Paul Renner', 'Jan Tschichold', 'László Moholy-Nagy'],
    philosophicalCore: 'Rechazo frontal del ornamento historicista. "La forma sigue a la función". Búsqueda de una forma elemental pura construida con compás y regla sobre las formas euclidianas (círculo, cuadrado, triángulo). Herbert Bayer propuso el "Alfabeto Universal", suprimiendo las mayúsculas por considerarlas un vestigio superfluo.',
    serifStatus: 'SUPRESIÓN TOTAL: La serifa se considera un ornamento burgués del pasado. El trazo se vuelve rigurosamente monolineal y geométrico.',
    impactOnDesign: 'Nacimiento de Futura (Paul Renner, 1927), la tipografía geométrica más influyente del siglo XX. Consagración del espacio en blanco asimétrico como elemento dinámico.',
    representativeTypefaces: ['Futura', 'Bayer Universal', 'Kabel', 'Erbar'],
    samplePangram: 'DIE FORM FOLGT DER FUNKTION: GEOMETRIE DER REINHEIT',
    fontClass: 'font-grotesk'
  },
  {
    id: 'swiss-style',
    name: '2. El Estilo Tipográfico Suizo (Neogrotescas)',
    period: '1950 – 1970 (Zúrich y Basilea)',
    keyFigures: ['Max Miedinger', 'Adrian Frutiger', 'Josef Müller-Brockmann', 'Emil Ruder'],
    philosophicalCore: 'Objetividad, neutralidad y claridad absoluta. La tipografía no debe expresar la personalidad del diseñador, sino transmitir el mensaje de forma transparente e impersonal. Creación de la retícula matemática modular (Grid System) como orden supremo del espacio.',
    serifStatus: 'NEGROTESCA OBJETIVA: Sin serifas, pero con microcompensaciones ópticas sutiles en los empalmes para evitar manchas de tinta. Terminales rigurosamente horizontales en "c", "e", "s".',
    impactOnDesign: 'Lanzamiento simultáneo de Helvetica (1957) y Univers (1957). Univers introdujo la primera matriz numérica lógica de 21 variantes de peso y anchura. Helvetica se convirtió en el idioma oficial de las corporaciones multinacionales y la señalética mundial.',
    representativeTypefaces: ['Helvetica', 'Univers', 'Folio', 'Akzidenz-Grotesk'],
    samplePangram: 'Ordnung, Klarheit und visuelle Präzision: Das Internationale Design',
    fontClass: 'font-sans-modern'
  },
  {
    id: 'early-digital',
    name: '3. La Revolución Digital Temprana y la Pantalla',
    period: '1984 – 2000 (Silicon Valley y Massachusetts)',
    keyFigures: ['Matthew Carter', 'Susan Kare', 'John Warnock (Adobe)', 'Charles Geschke'],
    philosophicalCore: 'El salto del metal y la película fotográfica a la retícula de píxeles en blanco y negro (72 dpi). De los mapas de bits bitmap de la primera Apple Macintosh (Susan Kare) a la tecnología PostScript (lenguaje vectorial Bézier de Adobe) que democratizó la autoedición con Aldus PageMaker.',
    serifStatus: 'REINVENCIÓN PARA EL PÍXEL: En monitores CRT de baja resolución, las serifas tradicionales finas se rompían por aliasing. Matthew Carter reinventó la serifa en Georgia (1996) como un bloque horizontal sólido de exactamente 1 píxel de espesor para guiar el ojo sobre el tubo catódico.',
    impactOnDesign: 'Nacimiento de Georgia y Verdana (1996), diseñadas expresamente para leer noticias y textos largos en pantalla antes de la llegada de las pantallas Retina.',
    representativeTypefaces: ['Georgia', 'Verdana', 'Chicago', 'Geneva', 'Charter'],
    samplePangram: 'The screen is made of discrete light: fonts born for pixels',
    fontClass: 'font-serif'
  },
  {
    id: 'variable-contemporary',
    name: '4. Era Contemporánea: Tipografías Variables y Reinvención',
    period: '2016 – Presente (Global)',
    keyFigures: ['Consorcio OpenType (Adobe, Google, Apple, Microsoft)', 'Tipógrafos independientes globales'],
    philosophicalCore: 'El fin del archivo de fuente estático. La especificación OpenType Font Variations (2016) permite encapsular en un único archivo vectorial de apenas unos cientos de kilobytes infinitos pesos, anchos, inclinaciones y tamaños ópticos continuos, interpolados en milisegundos por la GPU.',
    serifStatus: 'MUTACIÓN Y REINVENCIÓN HÍBRIDA: La serifa renace en el diseño contemporáneo no por imitación histórica, sino con fines de alta costura, elegancia y contraste óptico dinámico (opsz). Una misma tipografía variable puede expandir o contraer sus serifas según la distancia del usuario o el tamaño del dispositivo.',
    impactOnDesign: 'El diseño web reactivo perfecto: fuentes que reaccionan a la luz ambiente, el giroscopio, la velocidad de desplazamiento o el ancho milimétrico de la pantalla del teléfono móvil.',
    representativeTypefaces: ['Plus Jakarta Sans', 'Fraunces Variable', 'Inter Variable', 'Recursive', 'Amstelvar'],
    samplePangram: 'Dynamic responsive axes: Typography alive across devices',
    fontClass: 'font-sans-modern'
  }
];

export const ModernDigitalView: React.FC = () => {
  const [selectedMovementId, setSelectedMovementId] = useState<string>('bauhaus');
  const [variableWeight, setVariableWeight] = useState<number>(500);
  const [variableWidth, setVariableWidth] = useState<number>(100);
  const [variableSlant, setVariableSlant] = useState<number>(0);
  const [customTestingText, setCustomTestingText] = useState<string>('');

  const activeMovement = MODERN_MOVEMENTS.find((m) => m.id === selectedMovementId) || MODERN_MOVEMENTS[0];

  return (
    <div className="space-y-10">
      {/* 1. SECTION BANNER & CURATORIAL PROLOGUE */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9A3412] mb-1">
            <span>SIGLOS XX Y XXI</span>
            <span aria-hidden="true">·</span>
            <span>DE LA RETÍCULA AL ALGORITMO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Tipografía Moderna y Contemporánea
          </h1>
          <p className="text-base font-serif text-stone-700 max-w-4xl leading-relaxed mt-2">
            El siglo XX presenció la demolición de la tradición tipográfica artesanal en favor de la máquina, 
            la retícula y la pureza funcional de las <strong>Sans-Serif</strong>. 
            Sin embargo, la revolución digital y las pantallas de alta densidad no se detuvieron en la neutralidad: 
            engendraron una <strong>explosión de estilos</strong>, la <strong>reinvención de las serifas para el píxel</strong> 
            y la consagración de las <strong>Tipografías Variables</strong> como organismos gráficos vivos en tiempo real.
          </p>
        </div>

        {/* Archival imagery showcase */}
        <div className="space-y-2">
          <div className="overflow-hidden rounded-lg border border-stone-200 aspect-16/9 bg-stone-100 max-h-[380px]">
            <img
              src="/src/assets/images/swiss_modernism_1791469737229.jpg"
              alt="Carteles del Estilo Suizo y Bauhaus en exposición de museo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-101 transition-transform duration-500"
            />
          </div>
          <p className="text-xs font-serif text-stone-500 italic">
            Fig 1. Carteles de la Escuela Suiza y Bauhaus (Zúrich y Dessau). Supresión radical de la serifa, retícula asimétrica y contraste puro de masas tipográficas.
          </p>
        </div>
      </div>

      {/* 2. THE 4 TRANSFORMATIVE MOVEMENTS */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold">
              Las 4 Grandes Revoluciones Modernas
            </h2>
            <p className="text-xs font-serif text-stone-600">
              Examina la ideología, la evolución de las serifas y las tipografías insignia de cada época
            </p>
          </div>

          {/* Movement selector pills */}
          <div className="flex flex-wrap items-center gap-2">
            {MODERN_MOVEMENTS.map((mov) => (
              <button
                key={mov.id}
                onClick={() => setSelectedMovementId(mov.id)}
                className={`px-3 py-1.5 rounded text-xs font-serif font-bold transition-all ${
                  selectedMovementId === mov.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {mov.name.split('.')[1].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Active Movement Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Left Column: Movement context, philosophy, impact (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#9A3412] mb-1">
                <span>{activeMovement.period}</span>
                <span aria-hidden="true">·</span>
                <span>FIGURAS: {activeMovement.keyFigures.slice(0, 3).join(', ')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                {activeMovement.name}
              </h3>
            </div>

            {/* Core philosophy */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-900 block">
                Manifiesto y Filosofía Proyectual
              </span>
              <p className="text-xs font-serif text-stone-700 leading-relaxed">
                {activeMovement.philosophicalCore}
              </p>
            </div>

            {/* Status of Serifs in this movement */}
            <div className="p-4 bg-amber-50/70 border-l-3 border-[#9A3412] rounded-r-lg space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9A3412]">
                La Suerte de las Serifas
              </span>
              <p className="text-xs font-serif text-stone-800 leading-relaxed">
                {activeMovement.serifStatus}
              </p>
            </div>

            {/* Impact on design */}
            <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-lg space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-900">
                Legado e Impacto Histórico
              </span>
              <p className="text-xs font-serif text-stone-800 leading-relaxed">
                {activeMovement.impactOnDesign}
              </p>
            </div>
          </div>

          {/* Right Column: Specimen & Representative Fonts (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Specimen Box */}
            <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-6 space-y-4 shadow-xs">
              <span className="text-[11px] font-mono text-stone-500 uppercase block">
                Espécimen de Manifiesto
              </span>

              <div className="p-6 bg-white rounded-lg border border-stone-200 text-center min-h-[140px] flex items-center justify-center">
                <p className={`text-xl sm:text-2xl font-bold text-stone-900 leading-snug ${activeMovement.fontClass}`}>
                  "{activeMovement.samplePangram}"
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[11px] text-stone-500 uppercase block">
                  Tipografías Emblemáticas:
                </span>
                <p className="font-serif text-xs font-bold text-stone-800">
                  {activeMovement.representativeTypefaces.join(' · ')}
                </p>
              </div>
            </div>

            {/* The Shift from Print to Screen Callout */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-900">
                <Smartphone className="w-4 h-4 text-[#9A3412]" />
                <span>La Pantalla como Nuevo Papel</span>
              </div>
              <p className="text-xs font-serif text-stone-600 leading-relaxed">
                El paso del soporte impreso a la pantalla forzó a diseñadores como Adrian Frutiger y Matthew Carter a abandonar las trampas mecánicas de la tinta para resolver el <strong>aliasing</strong> y la <strong>geometría de subpíxeles</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SIMULADOR EN VIVO: TIPOGRAFÍA VARIABLE DIGITAL */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-900 font-bold mb-1">
              <Zap className="w-3.5 h-3.5 text-blue-700" />
              <span>TECNOLOGÍA OPENTYPE VARIATIONS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Laboratorio de Interpolación Continua en Tiempo Real
            </h3>
            <p className="text-xs font-serif text-stone-600">
              Desplaza los ejes continuos para ver cómo la tipografía digital muta en milisegundos sin cambiar de archivo
            </p>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {/* Axis 1: Weight (wght) */}
          <div className="space-y-2 p-3 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-stone-900">Eje Peso (wght):</span>
              <span className="text-[#9A3412] font-bold">{variableWeight}</span>
            </div>
            <input
              type="range"
              min="200"
              max="900"
              step="10"
              value={variableWeight}
              onChange={(e) => setVariableWeight(Number(e.target.value))}
              className="w-full accent-[#9A3412]"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-500">
              <span>Light 200</span>
              <span>Regular 400</span>
              <span>Black 900</span>
            </div>
          </div>

          {/* Axis 2: Width (wdth) */}
          <div className="space-y-2 p-3 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-stone-900">Eje Ancho (wdth):</span>
              <span className="text-blue-900 font-bold">{variableWidth}%</span>
            </div>
            <input
              type="range"
              min="75"
              max="125"
              step="5"
              value={variableWidth}
              onChange={(e) => setVariableWidth(Number(e.target.value))}
              className="w-full accent-blue-800"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-500">
              <span>Condensada 75%</span>
              <span>Normal 100%</span>
              <span>Expandida 125%</span>
            </div>
          </div>

          {/* Axis 3: Slant (slnt) */}
          <div className="space-y-2 p-3 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-stone-900">Eje Inclinación (slnt):</span>
              <span className="text-emerald-900 font-bold">{variableSlant}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={variableSlant}
              onChange={(e) => setVariableSlant(Number(e.target.value))}
              className="w-full accent-emerald-800"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-500">
              <span>Recta 0°</span>
              <span>Oblicua 8°</span>
              <span>Cursiva 15°</span>
            </div>
          </div>
        </div>

        {/* Live Variable Specimen Display */}
        <div className="p-8 bg-[#FBF9F5] border border-stone-200 rounded-xl flex flex-col items-center justify-center min-h-[160px] text-center space-y-3">
          <p
            className="text-stone-900 transition-all font-sans-modern"
            style={{
              fontWeight: variableWeight,
              transform: `scaleX(${variableWidth / 100}) skewX(${-variableSlant}deg)`,
              fontSize: 'clamp(28px, 4.5vw, 54px)',
              letterSpacing: variableWidth < 90 ? '-0.02em' : '0.01em',
              lineHeight: 1.15
            }}
          >
            {customTestingText || 'VARIABLE RESPONSIVE TYPE'}
          </p>
          <span className="font-mono text-[11px] text-stone-500">
            CSS: font-variation-settings: 'wght' {variableWeight}, 'wdth' {variableWidth}, 'slnt' {variableSlant}
          </span>
        </div>

        {/* Live input test */}
        <div>
          <input
            type="text"
            placeholder="Escribe tu propia frase para comprobar la fluidez del eje continuo..."
            value={customTestingText}
            onChange={(e) => setCustomTestingText(e.target.value)}
            className="w-full px-4 py-2.5 text-xs border border-stone-200 rounded-lg bg-[#FAF8F5] focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
