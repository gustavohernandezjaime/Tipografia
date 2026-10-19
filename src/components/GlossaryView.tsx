import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  RotateCcw, 
  Sliders, 
  Compass, 
  Play, 
  Pause, 
  ArrowRight,
  Eye,
  Layers,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

export interface VisualGlossaryTerm {
  id: string;
  name: string;
  category: 'Dinámica del Trazo' | 'Estructura & Geometría' | 'Espacio & Proporción' | 'Terminales';
  tagline: string;
  definition: string;
  whyItMatters: string;
  historicalExample: string;
}

export const GLOSSARY_TERMS: VisualGlossaryTerm[] = [
  {
    id: 'modulacion',
    name: 'Modulación de Trazo',
    category: 'Dinámica del Trazo',
    tagline: 'La variación orgánica entre los trazos gruesos y finos.',
    definition: 'Es la alternancia continua de espesor producida por una herramienta de escritura (como la pluma de punta ancha) sostenida a un ángulo constante respecto al renglón.',
    whyItMatters: 'Define la calidez y el ritmo visual del texto. Si no hay modulación, el texto es monolineal (palo seco); si la modulación es pronunciada, adquiere dinamismo clásico o dramático.',
    historicalExample: 'Jenson (1470) tiene modulación natural de pluma; Futura (1927) suprime la modulación para lograr geometría pura.'
  },
  {
    id: 'ductus',
    name: 'Ductus Caligráfico',
    category: 'Dinámica del Trazo',
    tagline: 'El orden, sentido y velocidad del movimiento de la mano.',
    definition: 'Es el gesto biomecánico con el que se traza la letra: cuántos trazos la componen, en qué secuencia temporal se ejecutan y en qué dirección se desplaza la herramienta.',
    whyItMatters: 'Explica por qué en la letra "A" la diagonal izquierda es fina (el trazo sube en contrapelo) y la derecha es gruesa (el trazo desciende a favor de la pluma). Todo el alfabeto latino descansa sobre las leyes del ductus.',
    historicalExample: 'La letra cursiva de Griffo (1495) y las cancillerescas italianas reflejan un ductus veloz e inclinado para ahorrar espacio.'
  },
  {
    id: 'eje',
    name: 'Eje de Modulación (Stress)',
    category: 'Estructura & Geometría',
    tagline: 'El ángulo que une los puntos más delgados en las curvas.',
    definition: 'La inclinación de la línea imaginaria trazada a través de las partes más delgadas de una forma curva (visible con máxima claridad en la letra "O"). No es la inclinación física de la letra completa.',
    whyItMatters: 'Es el principal criterio de Robert Bringhurst para clasificar la historia tipográfica: Humanista (~25° oblicuo), Barroco (~15° moderado), Neoclásico (~6° casi vertical), Didona (90° vertical a plomo).',
    historicalExample: 'En Centaur el eje está fuertemente inclinado a la izquierda; en Bodoni es rigurosamente vertical a 90°.'
  },
  {
    id: 'contraste',
    name: 'Contraste Tipográfico',
    category: 'Estructura & Geometría',
    tagline: 'La relación cuantitativa entre el trazo más grueso y el más fino.',
    definition: 'Es la proporción matemática entre el ancho del asta vertical principal y el grosor del perfil o filete capilar más fino ($Espesor_{Grueso} / Espesor_{Fino}$).',
    whyItMatters: 'Un bajo contraste (1.2:1) resiste papeles ásperos y pantallas de baja resolución (Clarendon, Roboto Slab); un contraste extremo (18:1) transmite refinamiento editorial y lujo (Didot, Bodoni).',
    historicalExample: 'Didot (1784) llevó el contraste al límite físico del corte en acero; Rockwell (1934) igualó casi al 1:1 ambos trazos.'
  },
  {
    id: 'cartela',
    name: 'Cartela / Apófige (Bracket)',
    category: 'Terminales',
    tagline: 'La transición curva entre el asta vertical y el pie de la serifa.',
    definition: 'Es la curva cóncava o ménsula que conecta el trazo vertical de soporte con el remate horizontal de base, distribuyendo la masa visual sobre la línea.',
    whyItMatters: 'En tipos venecianos y garaldos la cartela es orgánica y cálida; en las tipografías egipcias/slab es un bloque masivo; en Bodoni se eliminó por completo en un ángulo recto puro de 90° (unbracketed hairline).',
    historicalExample: 'Garamond utiliza cartelas cóncavas esculpidas; Bodoni prescinde de toda cartela para un efecto geométrico afilado.'
  },
  {
    id: 'ojo',
    name: 'Ojo / Contrapunzón (Counter)',
    category: 'Espacio & Proporción',
    tagline: 'El espacio negativo blanco encerrado en el corazón de la letra.',
    definition: 'Es el área interna sin tinta rodeada total o parcialmente por los trazos del carácter (como el hueco interior de la "e", la "o", la "a" o la "p").',
    whyItMatters: 'Como enseñaba Adrian Frutiger: "La tipografía es el diseño del blanco, no del negro". El contrapunzón determina cuánta luz entra en la palabra y evita que la letra se ciegue en tamaños pequeños.',
    historicalExample: 'Plus Jakarta Sans tiene ojos muy abiertos para pantallas móviles; las góticas medievales reducían el ojo al mínimo generando una textura compacta y oscura.'
  },
  {
    id: 'lagrima',
    name: 'Lágrima / Gota (Teardrop)',
    category: 'Terminales',
    tagline: 'Remate redondeado en los extremos libres de curvas.',
    definition: 'El abultamiento esférico u ovalado que remata trazos curvos libres en letras como "f", "r", "c" o "a".',
    whyItMatters: 'Reemplaza a la serifa angular en los brazos terminales curvos, frenando la mirada y evitando acumulaciones indeseadas de tinta líquida en la punta.',
    historicalExample: 'Baskerville y Bodoni convirtieron la lágrima caligráfica en una bola geométrica circular perfecta.'
  },
  {
    id: 'altura-x',
    name: 'Altura de x (x-Height)',
    category: 'Espacio & Proporción',
    tagline: 'La proporción de las minúsculas respecto a las mayúsculas.',
    definition: 'La distancia vertical entre la línea de base y la línea superior del cuerpo principal de las minúsculas sin ascendentes ni descendentes (medida sobre la letra "x").',
    whyItMatters: 'Una alta altura de x (70% o más) hace que la tipografía se perciba mucho más grande y legible en teléfonos móviles a cuerpo pequeño; una baja altura de x (50%) crea textos clásicos aireados y poéticos.',
    historicalExample: 'Mrs Eaves (1996) tiene una altura de x baja muy distinguida; Helvetica y Georgia tienen alturas de x generosas.'
  }
];

interface GlossaryViewProps {
  onClose?: () => void;
  onNavigateToModule?: (moduleTab: 'anatomy' | 'timeline' | 'workshop' | 'quizzes') => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ onClose, onNavigateToModule }) => {
  const [activeTermId, setActiveTermId] = useState<string>('modulacion');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Interactive state for Modulacion animation
  const [penAngle, setPenAngle] = useState<number>(30);
  const [isModulating, setIsModulating] = useState<boolean>(true);
  
  // Interactive state for Ductus animation
  const [ductusStep, setDuctusStep] = useState<number>(3);
  const [isAutoPlayingDuctus, setIsAutoPlayingDuctus] = useState<boolean>(true);

  // Interactive state for Eje animation
  const [axisDegrees, setAxisDegrees] = useState<number>(20);

  // Interactive state for Contraste animation
  const [contrastVal, setContrastVal] = useState<number>(4.5);

  // Interactive state for Altura de x
  const [xHeightPercent, setXHeightPercent] = useState<number>(65);

  const activeTerm = GLOSSARY_TERMS.find(t => t.id === activeTermId) || GLOSSARY_TERMS[0];

  // Auto-play ductus steps
  useEffect(() => {
    if (!isAutoPlayingDuctus || activeTermId !== 'ductus') return;
    const interval = setInterval(() => {
      setDuctusStep(prev => (prev >= 3 ? 1 : prev + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [isAutoPlayingDuctus, activeTermId]);

  const filteredTerms = GLOSSARY_TERMS.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* 1. TOP HEADER WITH HERO BRANDING */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#EA580C] font-bold">
              <BookOpen className="w-4 h-4" />
              <span>DICCIONARIO VISUAL INTERACTIVO</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              Glosario Visual
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl">
              Comprende los conceptos tipográficos clave mediante simulaciones comparativas interactivas.
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Cerrar Glosario"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar término (ej. eje, ductus)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#EA580C] transition-colors font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {['all', 'Dinámica del Trazo', 'Estructura & Geometría', 'Terminales', 'Espacio & Proporción'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'Todos los Términos' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SPLIT VIEW: SELECTOR ON LEFT / INTERACTIVE SIMULATION ON RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Term selector tabs */}
        <div className="lg:col-span-5 space-y-2">
          {filteredTerms.map((term) => {
            const isSelected = term.id === activeTerm.id;
            return (
              <button
                key={term.id}
                onClick={() => setActiveTermId(term.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-[#EA580C]' : 'text-slate-400'}`}>
                      {term.category}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base font-sans">
                    {term.name}
                  </h3>
                  <p className={`text-xs line-clamp-1 font-sans ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {term.tagline}
                  </p>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#EA580C] translate-x-1' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Right: Rich Interactive Animation Canvas for Active Term */}
        <div className="lg:col-span-7 bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
          {/* Header of Active Term */}
          <div className="space-y-1.5 border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#EA580C] font-bold uppercase tracking-wider">
                {activeTerm.category}
              </span>
              <span className="text-slate-400">Simulación en vivo</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-sans">
              {activeTerm.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              {activeTerm.definition}
            </p>
          </div>

          {/* ========================================================================= */}
          {/* ANIMATED SIMULATION STAGES BY TERM                                        */}
          {/* ========================================================================= */}

          {/* 1. MODULACIÓN SIMULATOR */}
          {activeTerm.id === 'modulacion' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden">
                <svg viewBox="0 0 300 200" className="w-full max-w-[320px] h-[190px]">
                  {/* Baseline and Cap Lines */}
                  <line x1="20" y1="160" x2="280" y2="160" stroke="#CBD5E1" strokeWidth="1.5" />
                  <line x1="20" y1="40" x2="280" y2="40" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {isModulating ? (
                    /* Broad pen calligraphic O with live animated pen angle */
                    <g transform="translate(150, 100)">
                      <ellipse
                        cx="0"
                        cy="0"
                        rx="70"
                        ry="55"
                        fill="none"
                        stroke="#0F172A"
                        strokeWidth="28"
                        strokeDasharray="400"
                        transform={`rotate(${penAngle})`}
                        style={{
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />
                      <ellipse
                        cx="0"
                        cy="0"
                        rx="70"
                        ry="55"
                        fill="none"
                        stroke="#EA580C"
                        strokeWidth="6"
                        strokeDasharray="400"
                        transform={`rotate(${penAngle})`}
                      />
                      {/* Pen Nib representation */}
                      <line
                        x1="-18"
                        y1="-60"
                        x2="18"
                        y2="-60"
                        stroke="#EA580C"
                        strokeWidth="5"
                        strokeLinecap="round"
                        transform={`rotate(${penAngle})`}
                      />
                    </g>
                  ) : (
                    /* Monoline sans circle (Futura / Helvetica) */
                    <g transform="translate(150, 100)">
                      <circle cx="0" cy="0" r="55" fill="none" stroke="#0F172A" strokeWidth="12" />
                    </g>
                  )}
                </svg>

                <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-500 bg-white/90 px-2 py-0.5 rounded border border-slate-200">
                  {isModulating ? `Pluma de punta ancha (Ángulo: ${penAngle}°)` : 'Trazo Monolineal (Grosor uniforme)'}
                </div>
              </div>

              {/* Interactive Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsModulating(true)}
                    className={`px-3 py-1.5 rounded-lg font-bold font-sans transition-all cursor-pointer ${
                      isModulating ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-700'
                    }`}
                  >
                    Pluma Ancha (Con Modulación)
                  </button>
                  <button
                    onClick={() => setIsModulating(false)}
                    className={`px-3 py-1.5 rounded-lg font-bold font-sans transition-all cursor-pointer ${
                      !isModulating ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-700'
                    }`}
                  >
                    Monolineal (Sin Modulación)
                  </button>
                </div>

                {isModulating && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500 text-[11px]">Ángulo:</span>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      value={penAngle}
                      onChange={(e) => setPenAngle(Number(e.target.value))}
                      className="w-24 accent-[#EA580C] cursor-pointer"
                    />
                    <span className="font-mono font-bold text-slate-900 w-8">{penAngle}°</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. DUCTUS SIMULATOR */}
          {activeTerm.id === 'ductus' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden">
                <svg viewBox="0 0 300 200" className="w-full max-w-[320px] h-[190px]">
                  {/* Baseline & Cap-height */}
                  <line x1="20" y1="165" x2="280" y2="165" stroke="#CBD5E1" strokeWidth="1.5" />
                  <line x1="20" y1="35" x2="280" y2="35" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Step 1: Upward left diagonal (Thin stroke) */}
                  <path
                    d="M 80 165 L 150 35"
                    stroke={ductusStep >= 1 ? '#0F172A' : '#E2E8F0'}
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  {ductusStep === 1 && (
                    <g transform="translate(115, 100)">
                      <circle cx="0" cy="0" r="10" fill="#EA580C" />
                      <text x="0" y="3" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1</text>
                      <text x="14" y="3" fill="#EA580C" fontSize="10" fontWeight="bold" fontFamily="monospace">Sube (Trazo fino)</text>
                    </g>
                  )}

                  {/* Step 2: Downward right diagonal (Thick stroke) */}
                  <path
                    d="M 150 35 L 220 165"
                    stroke={ductusStep >= 2 ? '#0F172A' : '#E2E8F0'}
                    strokeWidth="16"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  {ductusStep === 2 && (
                    <g transform="translate(185, 100)">
                      <circle cx="0" cy="0" r="10" fill="#EA580C" />
                      <text x="0" y="3" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2</text>
                      <text x="14" y="3" fill="#EA580C" fontSize="10" fontWeight="bold" fontFamily="monospace">Baja (Trazo grueso)</text>
                    </g>
                  )}

                  {/* Step 3: Horizontal Crossbar */}
                  <path
                    d="M 105 125 L 195 125"
                    stroke={ductusStep >= 3 ? '#0F172A' : '#E2E8F0'}
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  {ductusStep === 3 && (
                    <g transform="translate(150, 142)">
                      <circle cx="0" cy="0" r="10" fill="#EA580C" />
                      <text x="0" y="3" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3</text>
                      <text x="0" y="20" fill="#EA580C" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Cruza horizontalmente</text>
                    </g>
                  )}
                </svg>

                <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-500 bg-white/90 px-2 py-0.5 rounded border border-slate-200">
                  Gesto temporal: Paso {ductusStep} de 3
                </div>
              </div>

              {/* Step Controls */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((step) => (
                    <button
                      key={step}
                      onClick={() => {
                        setDuctusStep(step);
                        setIsAutoPlayingDuctus(false);
                      }}
                      className={`px-3 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                        ductusStep === step ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                      }`}
                    >
                      Trazo {step}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsAutoPlayingDuctus(!isAutoPlayingDuctus)}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#EA580C] hover:underline cursor-pointer"
                >
                  {isAutoPlayingDuctus ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isAutoPlayingDuctus ? 'Pausar ciclo' : 'Reproducir automático'}</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. EJE DE MODULACIÓN SIMULATOR */}
          {activeTerm.id === 'eje' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden">
                <svg viewBox="0 0 300 220" className="w-full max-w-[320px] h-[200px]">
                  {/* Outer Ellipse */}
                  <ellipse cx="150" cy="110" rx="75" ry="95" fill="#0F172A" />

                  {/* Inner Counter Ellipse rotated by live axis degrees */}
                  <g transform={`rotate(${-axisDegrees}, 150, 110)`}>
                    <ellipse cx="150" cy="110" rx="42" ry="86" fill="#FAF8F5" />
                  </g>

                  {/* Tangent Guidelines showing thinnest points */}
                  <g transform={`translate(150, 110) rotate(${-axisDegrees})`}>
                    <line x1="0" y1="-105" x2="0" y2="105" stroke="#EA580C" strokeWidth="2" strokeDasharray="4 3" />
                    <circle cx="0" cy="-86" r="4.5" fill="#EA580C" />
                    <circle cx="0" cy="86" r="4.5" fill="#EA580C" />
                  </g>
                </svg>

                <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-500 bg-white/90 px-2 py-0.5 rounded border border-slate-200">
                  Inclinación de puntos finos: {axisDegrees}°
                </div>
              </div>

              {/* Slider & Presets */}
              <div className="space-y-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-600 font-bold">Ajuste de Eje Axial:</span>
                  <span className="font-mono font-bold text-[#EA580C] text-sm">{axisDegrees}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="45"
                  value={axisDegrees}
                  onChange={(e) => setAxisDegrees(Number(e.target.value))}
                  className="w-full accent-[#EA580C] cursor-pointer"
                />

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <button
                    onClick={() => setAxisDegrees(25)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      axisDegrees === 25 ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Humanista (~25°)
                  </button>
                  <button
                    onClick={() => setAxisDegrees(15)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      axisDegrees === 15 ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Barroco (~15°)
                  </button>
                  <button
                    onClick={() => setAxisDegrees(6)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      axisDegrees === 6 ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Baskerville (~6°)
                  </button>
                  <button
                    onClick={() => setAxisDegrees(0)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      axisDegrees === 0 ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Bodoni (0° / 90° Vertical)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. CONTRASTE SIMULATOR */}
          {activeTerm.id === 'contraste' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden">
                <svg viewBox="0 0 300 200" className="w-full max-w-[320px] h-[190px]">
                  {/* Stem thick: 40px */}
                  {/* Stem thin: 40 / contrastVal */}
                  <rect x="70" y="30" width="36" height="140" fill="#0F172A" />
                  <rect x="180" y="30" width={Math.max(2, 36 / contrastVal)} height="140" fill="#EA580C" />

                  {/* Measuring Calipers */}
                  <line x1="70" y1="185" x2="106" y2="185" stroke="#0F172A" strokeWidth="2" />
                  <text x="88" y="196" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="#0F172A" fontWeight="bold">
                    Grueso: 36px
                  </text>

                  <line x1="180" y1="185" x2={180 + Math.max(2, 36 / contrastVal)} y2="185" stroke="#EA580C" strokeWidth="2" />
                  <text x={180 + Math.max(2, 36 / contrastVal) / 2} y="196" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="#EA580C" fontWeight="bold">
                    Fino: {(36 / contrastVal).toFixed(1)}px
                  </text>
                </svg>

                <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-500 bg-white/90 px-2 py-0.5 rounded border border-slate-200">
                  Ratio de Contraste: {contrastVal.toFixed(1)} : 1
                </div>
              </div>

              {/* Slider for Contrast */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-600 font-bold">Deslizador de Contraste:</span>
                  <span className="font-mono font-bold text-slate-900">{contrastVal.toFixed(1)}:1</span>
                </div>
                <input
                  type="range"
                  min="1.1"
                  max="18"
                  step="0.1"
                  value={contrastVal}
                  onChange={(e) => setContrastVal(Number(e.target.value))}
                  className="w-full accent-[#EA580C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Monolineal (1.1:1)</span>
                  <span>Medio (3.5:1)</span>
                  <span>Alto (7:1)</span>
                  <span>Extremo Bodoni (18:1)</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. CARTELA / APÓFIGE SIMULATOR */}
          {activeTerm.id === 'cartela' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Variant 1: Con Cartela (Garamond) */}
                <div className="p-4 bg-[#FAF8F5] rounded-xl border-2 border-orange-200 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono font-bold text-[#EA580C] mb-2 uppercase">
                    Con Cartela Curva
                  </span>
                  <svg viewBox="0 0 120 120" className="w-24 h-24">
                    <path
                      d="M 50 10 L 70 10 L 70 70 Q 70 95 105 95 L 105 105 L 15 105 L 15 95 Q 50 95 50 70 Z"
                      fill="#0F172A"
                    />
                    {/* Highlight curve */}
                    <path
                      d="M 70 70 Q 70 95 105 95"
                      fill="none"
                      stroke="#EA580C"
                      strokeWidth="3"
                    />
                  </svg>
                  <span className="text-[11px] font-sans text-slate-600 mt-2">
                    Transición cóncava suave (Garamond / Jenson)
                  </span>
                </div>

                {/* Variant 2: Sin Cartela (Bodoni / Didot) */}
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono font-bold text-slate-700 mb-2 uppercase">
                    Sin Cartela (90° Puro)
                  </span>
                  <svg viewBox="0 0 120 120" className="w-24 h-24">
                    {/* Vertical stem */}
                    <rect x="50" y="10" width="20" height="95" fill="#0F172A" />
                    {/* Flat hairline serif */}
                    <rect x="15" y="102" width="90" height="4" fill="#0F172A" />
                    {/* Angle marker */}
                    <path d="M 70 95 L 77 95 L 77 102" fill="none" stroke="#EA580C" strokeWidth="2" />
                  </svg>
                  <span className="text-[11px] font-sans text-slate-600 mt-2">
                    Ángulo recto filiforme (Bodoni / Didona)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 6. OJO / CONTRAPUNZÓN SIMULATOR */}
          {activeTerm.id === 'ojo' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[240px] text-center">
                <svg viewBox="0 0 200 160" className="w-48 h-40">
                  {/* Outer Letter 'e' */}
                  <path
                    d="M 100 20 C 50 20 30 60 30 95 C 30 135 60 150 110 150 C 145 150 165 135 170 120 L 140 112 C 135 122 125 128 108 128 C 75 128 60 110 58 92 L 170 92 C 172 50 145 20 100 20 Z M 58 75 C 62 50 80 40 100 40 C 122 40 140 50 142 75 Z"
                    fill="#0F172A"
                  />
                  {/* Highlight Counter Interior */}
                  <path
                    d="M 58 75 C 62 50 80 40 100 40 C 122 40 140 50 142 75 Z"
                    fill="#EA580C"
                    opacity="0.8"
                  />
                </svg>
                <span className="text-xs font-mono font-bold text-[#EA580C] mt-2">
                  Luz interior (Contrapunzón destacado en naranja)
                </span>
                <p className="text-xs text-slate-600 font-sans mt-1 max-w-sm">
                  Si este espacio blanco se reduce demasiado, la letra se empasta y el ojo humano confunde la 'e' con la 'o'.
                </p>
              </div>
            </div>
          )}

          {/* 7. LÁGRIMA / TERMINAL */}
          {activeTerm.id === 'lagrima' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono font-bold text-[#EA580C] mb-2 uppercase">
                    Gota Circular Perfecta
                  </span>
                  <svg viewBox="0 0 120 120" className="w-24 h-24">
                    <path
                      d="M 30 110 L 30 60 C 30 25 70 20 85 20"
                      fill="none"
                      stroke="#0F172A"
                      strokeWidth="10"
                    />
                    <circle cx="85" cy="28" r="14" fill="#EA580C" />
                  </svg>
                  <span className="text-[11px] font-sans text-slate-600 mt-2">
                    Baskerville / Bodoni (Balín esférico)
                  </span>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono font-bold text-slate-700 mb-2 uppercase">
                    Lágrima Orgánica Caligráfica
                  </span>
                  <svg viewBox="0 0 120 120" className="w-24 h-24">
                    <path
                      d="M 30 110 L 30 60 C 30 25 65 20 80 25 C 95 32 88 55 75 48 C 65 42 60 48 55 58"
                      fill="#0F172A"
                    />
                  </svg>
                  <span className="text-[11px] font-sans text-slate-600 mt-2">
                    Claude Garamond (1540, Gesto manual)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 8. ALTURA DE X */}
          {activeTerm.id === 'altura-x' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[220px] relative">
                <svg viewBox="0 0 300 160" className="w-full max-w-[320px] h-[160px]">
                  {/* Baseline: y = 130 */}
                  <line x1="20" y1="130" x2="280" y2="130" stroke="#0F172A" strokeWidth="2" />
                  {/* Cap-Height: y = 30 */}
                  <line x1="20" y1="30" x2="280" y2="30" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="24" y="24" fill="#3B82F6" fontSize="9" fontFamily="monospace">Altura Mayúsculas (100%)</text>

                  {/* Dynamic x-Height Line: calculated based on slider */}
                  {/* If xHeightPercent = 65, y = 130 - (100 * 0.65) = 65 */}
                  {(() => {
                    const xY = 130 - (100 * (xHeightPercent / 100));
                    return (
                      <>
                        <line x1="20" y1={xY} x2="280" y2={xY} stroke="#EA580C" strokeWidth="2" />
                        <text x="24" y={xY - 6} fill="#EA580C" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          Altura de x ({xHeightPercent}%)
                        </text>

                        {/* Capital 'H' */}
                        <text x="70" y="130" fontSize="110" fontFamily="serif" fill="#0F172A">H</text>

                        {/* Lowercase 'x' */}
                        <text
                          x="160"
                          y="130"
                          fontSize={110 * (xHeightPercent / 100) * 1.35}
                          fontFamily="serif"
                          fill="#EA580C"
                          fontWeight="bold"
                        >
                          x
                        </text>
                      </>
                    );
                  })()}
                </svg>
              </div>

              {/* Slider for x-height */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-600 font-bold">Proporción de Altura de x:</span>
                  <span className="font-mono font-bold text-[#EA580C]">{xHeightPercent}%</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="80"
                  value={xHeightPercent}
                  onChange={(e) => setXHeightPercent(Number(e.target.value))}
                  className="w-full accent-[#EA580C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Baja (45% Centaur / Mrs Eaves)</span>
                  <span>Clásica (60% Garamond)</span>
                  <span>Moderna de Interfaz (75% Plus Jakarta)</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. CONTEXT & HISTORICAL SIGNIFICANCE */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="p-3.5 bg-orange-50/60 rounded-xl border border-orange-200/80 space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-[#EA580C] block">
                ¿Por Qué es Fundamental para el Diseñador?
              </span>
              <p className="text-xs font-sans text-slate-700 leading-relaxed">
                {activeTerm.whyItMatters}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span className="font-mono text-[11px] font-bold text-slate-800">
                Ejemplo Canónico: {activeTerm.historicalExample}
              </span>
              {onNavigateToModule && (
                <button
                  onClick={() => onNavigateToModule('timeline')}
                  className="text-xs font-mono font-bold text-[#EA580C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver en la Línea</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
