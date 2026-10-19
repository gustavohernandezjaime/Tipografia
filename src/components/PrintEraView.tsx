import React, { useState } from 'react';
import { Printer, BookOpen, Layers, Check, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';

interface PrintPioneer {
  id: string;
  name: string;
  location: string;
  year: string;
  milestoneBook: string;
  keyInnovations: string[];
  serifCharacteristics: string;
  axisAndModulation: string;
  readabilityImpact: string;
  specimenPangram: string;
  fontClass: string;
}

const PRINT_PIONEERS: PrintPioneer[] = [
  {
    id: 'nicolas-jenson',
    name: 'Nicolas Jenson',
    location: 'Venecia, Italia',
    year: '1470',
    milestoneBook: 'Eusebio de Cesarea: De Evangelica Praeparatione',
    keyInnovations: [
      'Creación del primer tipo romano humanista de proporción perfecta para texto continuo.',
      'Sustitución definitiva de la letra gótica densa por una tipografía luminosa inspirada en la minúscula carolina.',
      'Diseño de caracteres armonizados como un sistema unificado y no como signos aislados.'
    ],
    serifCharacteristics: 'Serifas triangulares cóncavas y robustas con cartabón orgánico y base asimétrica. Diseñadas para amparar el flujo horizontal de la vista sin empastar con la tinta.',
    axisAndModulation: 'Eje fuertemente inclinado hacia la izquierda (~20° a 25°). Barra transversal de la minúscula "e" marcadamente inclinada, conservando la memoria caligráfica.',
    readabilityImpact: 'Logró un gris tipográfico inmaculado: una distribución uniforme de blancos y negros en la página que permitía horas de lectura sin fatiga ocular.',
    specimenPangram: 'Ad bene vivendum brevis est aetas; sed in bene faciendo nulla satietas.',
    fontClass: 'font-garamond'
  },
  {
    id: 'aldus-manutius',
    name: 'Aldus Manutius & Francesco Griffo',
    location: 'Venecia, Italia',
    year: '1495 – 1501',
    milestoneBook: 'Pietro Bembo: De Aetna (1495) · Virgilio en octavo (1501)',
    keyInnovations: [
      'Francesco Griffo perfecciona el tipo romano: estabiliza la barra de la "e" de forma estrictamente horizontal.',
      '1501: Invención de los primeros tipos de cursiva itálica (basados en la caligrafía cancilleresca).',
      'Creación del libro de bolsillo moderno en formato octavo: democratización del conocimiento y portabilidad física.'
    ],
    serifCharacteristics: 'Serifas más finas, equilibradas y simétricas, con cartabón tallado con asombrosa precisión en punzones de acero templado.',
    axisAndModulation: 'Eje oblicuo moderado (~12° a 15°). La letra se independiza del manuscrito y adopta la elegancia escultórica propia del metal.',
    readabilityImpact: 'La cursiva aldina permitió comprimir un tercio más de texto por página, abaratando los libros y permitiendo que estudiantes y eruditos llevaran bibliotecas en sus viajes.',
    specimenPangram: 'Festina lente: imprime con paciencia para que la posteridad lea con deleite.',
    fontClass: 'font-garamond'
  },
  {
    id: 'johannes-gutenberg',
    name: 'Johannes Gutenberg',
    location: 'Maguncia (Mainz), Alemania',
    year: '1450 – 1455',
    milestoneBook: 'Biblia de 42 Líneas (Biblia Mazarina)',
    keyInnovations: [
      'Invención del molde de mano ajustable para fundir tipos móviles idénticos a gran escala.',
      'Aleación duradera de plomo, estaño y antimonio que no se contraía al enfriarse en la matriz de cobre.',
      'Tinta grasa especial a base de aceite de linaza cocido y negro de humo que no escurría sobre el papel de trapo.'
    ],
    serifCharacteristics: 'Remates rómbicos y cuatrifolios terminales propios de la letra gótica Textura. Sin cartabón curvado; uniones en ángulo agudo a 45°.',
    axisAndModulation: 'Eje verticalizado y quebrado. Máxima densidad de mancha negra para competir con los más fastuosos manuscritos litúrgicos monásticos.',
    readabilityImpact: 'Pensada para la lectura coral solemne a distancia sobre atril; su rigidez rítmica demostró la perfección técnica de la prensa mecánica.',
    specimenPangram: 'In principio creavit Deus caelum et terram. Terra autem erat inanis.',
    fontClass: 'font-serif'
  }
];

export const PrintEraView: React.FC = () => {
  const [activePioneerId, setActivePioneerId] = useState<string>('nicolas-jenson');
  const [activeSampleTab, setActiveSampleTab] = useState<'jenson' | 'aldus' | 'gutenberg'>('jenson');
  const [opticalZoom, setOpticalZoom] = useState<number>(24);

  const activePioneer = PRINT_PIONEERS.find((p) => p.id === activePioneerId) || PRINT_PIONEERS[0];

  return (
    <div className="space-y-10">
      {/* 1. CURATORIAL PROLOGUE & HERO BANNER */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9A3412] mb-1">
            <span>LA REVOLUCIÓN DE LA IMPRENTA</span>
            <span aria-hidden="true">·</span>
            <span>SIGLOS XV Y XVI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            La Era de la Imprenta y los Primeros Tipos Móviles
          </h1>
          <p className="text-base font-serif text-stone-700 max-w-4xl leading-relaxed mt-2">
            La invención de los tipos móviles en Maguncia y su madurez estética en Venecia 
            transformaron para siempre la relación de la humanidad con el signo escrito. 
            La tipografía no solo aceleró la difusión del conocimiento: impuso la <strong>estandarización geométrica</strong>, 
            perfeccionó la morfología de las <strong>serifas para la prensa</strong> y consagró el canon de <strong>legibilidad continua</strong> 
            que aún gobierna los libros modernos.
          </p>
        </div>

        {/* Archival imagery showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Gutenberg press image */}
          <div className="space-y-2">
            <div className="overflow-hidden rounded-lg border border-stone-200 aspect-16/9 bg-stone-100">
              <img
                src="/src/assets/images/gutenberg_press_1791469708635.jpg"
                alt="Componedor y tipos móviles metálicos de plomo de Gutenberg"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
            <p className="text-xs font-serif text-stone-500 italic">
              Fig 1. Matriz de tipos móviles de plomo y componedor de imprenta (c. 1450). La estandarización dimensional de los caracteres en metal.
            </p>
          </div>

          {/* Aldus Manutius specimen image */}
          <div className="space-y-2">
            <div className="overflow-hidden rounded-lg border border-stone-200 aspect-16/9 bg-stone-100">
              <img
                src="/src/assets/images/aldus_manutius_press_1791470191436.jpg"
                alt="Edición en octavo de Aldus Manutius en Venecia con la marca del ancla y el delfín"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
            <p className="text-xs font-serif text-stone-500 italic">
              Fig 2. Edición veneciana de Aldo Manucio (1501). La célebre marca del ancla y el delfín (Festina Lente) y los primeros tipos itálicos de bolsillo.
            </p>
          </div>
        </div>
      </div>

      {/* 2. LOS MAESTROS FUNDADORES: JENSON, ALDO Y GUTENBERG */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold">
              Los Maestros de los Primeros Tipos
            </h2>
            <p className="text-xs font-serif text-stone-600">
              Selecciona un maestro para examinar sus tipos, corte de punzón y resolución de serifas
            </p>
          </div>

          {/* Selector pills */}
          <div className="flex items-center gap-2">
            {PRINT_PIONEERS.map((pioneer) => (
              <button
                key={pioneer.id}
                onClick={() => setActivePioneerId(pioneer.id)}
                className={`px-3 py-1.5 rounded text-xs font-serif font-bold transition-all ${
                  activePioneerId === pioneer.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {pioneer.name} ({pioneer.year})
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Pioneer Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Left: Metadata & Historical Contributions (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#9A3412] mb-1">
                <span>{activePioneer.location}</span>
                <span aria-hidden="true">·</span>
                <span>{activePioneer.year}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                {activePioneer.name}
              </h3>
              <p className="text-xs font-serif italic text-stone-600 mt-1">
                Obra cumbre: {activePioneer.milestoneBook}
              </p>
            </div>

            {/* Innovations list */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-900 block">
                Innovaciones Clave:
              </span>
              <ul className="space-y-2 text-xs font-serif text-stone-700">
                {activePioneer.keyInnovations.map((inn, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#9A3412] mt-0.5 shrink-0" />
                    <span>{inn}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Anatomical metrics in this pioneer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-lg space-y-1">
                <span className="font-mono text-[11px] font-bold text-[#9A3412] uppercase block">
                  Eje y Modulación
                </span>
                <p className="text-xs font-serif text-stone-800 leading-relaxed">
                  {activePioneer.axisAndModulation}
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-1">
                <span className="font-mono text-[11px] font-bold text-emerald-900 uppercase block">
                  Anatomía de Serifas
                </span>
                <p className="text-xs font-serif text-stone-800 leading-relaxed">
                  {activePioneer.serifCharacteristics}
                </p>
              </div>
            </div>

            {/* Readability impact */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-1">
              <span className="font-mono text-[11px] font-bold text-stone-900 uppercase block">
                Impacto en la Legibilidad
              </span>
              <p className="text-xs font-serif text-stone-700 leading-relaxed">
                {activePioneer.readabilityImpact}
              </p>
            </div>
          </div>

          {/* Right: Specimen & Key Glyphs to compare (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Specimen Box */}
            <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-stone-500 uppercase">
                  Muestra Tipográfica del Taller
                </span>
                <span className="text-xs font-mono font-bold text-[#9A3412]">
                  {activePioneer.year}
                </span>
              </div>

              <div className="p-4 bg-white rounded-lg border border-stone-200 text-center min-h-[110px] flex items-center justify-center">
                <p className={`text-xl sm:text-2xl font-serif text-stone-900 leading-snug ${activePioneer.fontClass}`}>
                  "{activePioneer.specimenPangram}"
                </p>
              </div>

              <p className="text-[11px] font-serif text-stone-500 italic text-center">
                Reproducción de la mancha de tinta y ductus original en prensas venecianas
              </p>
            </div>

            {/* Key Glyphs Highlight: e de Jenson vs e de Aldo */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-3 shadow-xs">
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold">
                El Detalle Revelador: La Minúscula 'e'
              </h4>
              <p className="text-xs font-serif text-stone-600 leading-relaxed">
                Para identificar un tipo veneciano de Nicolas Jenson frente a uno aldino de Francesco Griffo, 
                los tipógrafos miran la barra de la 'e':
              </p>

              <div className="grid grid-cols-2 gap-3 text-center pt-1">
                <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 space-y-1">
                  <span className="text-3xl font-serif font-bold text-[#9A3412] block">
                    e
                  </span>
                  <span className="font-mono text-[10px] font-bold text-stone-800 block">Jenson (1470)</span>
                  <span className="text-[10px] font-serif text-stone-600">Barra transversal inclinada (~18°)</span>
                </div>

                <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-200 space-y-1">
                  <span className="text-3xl font-serif font-bold text-blue-900 block">
                    e
                  </span>
                  <span className="font-mono text-[10px] font-bold text-stone-800 block">Griffo / Aldo (1495)</span>
                  <span className="text-[10px] font-serif text-stone-600">Barra estrictamente horizontal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ESTANDARIZACIÓN Y DIFUSIÓN: EL IMPACTO TECNOLÓGICO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Card 1: La Estandarización Mecánica */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9A3412]">
            <Printer className="w-4 h-4" />
            <span>LA MÁQUINA DEL CONOCIMIENTO</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-stone-900">
            Estandarización y Precisión Metalúrgica
          </h3>
          <p className="text-xs font-serif text-stone-700 leading-relaxed">
            Antes de la imprenta, cada manuscrito dependía del pulso y el cansancio de un copista individual. 
            La imprenta de tipos móviles sustituyó la variación artesanal por una <strong>disciplina geométrica modular</strong>:
          </p>

          <div className="space-y-3 text-xs font-serif">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 space-y-1">
              <span className="font-bold text-stone-900 block">1. El Punzón de Acero y la Matriz de Cobre</span>
              <p className="text-stone-600">
                Un único punzón de acero templado, esculpido a mano por el grabador, se golpeaba contra una barra de cobre blando para crear la matriz. De esa sola matriz se podían fundir miles de letras 'a' rigurosamente idénticas.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 space-y-1">
              <span className="font-bold text-stone-900 block">2. La Altura de Tipo Universal (Type High)</span>
              <p className="text-stone-600">
                Todos los tipos móviles debían compartir exactamente la misma altura física (aproximadamente 0.918 pulgadas o 23.56 mm) para que la platina de la prensa de madera distribuyera la presión de manera homogénea sobre el pliego de papel.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 space-y-1">
              <span className="font-bold text-stone-900 block">3. La Galera, el Componedor y los Espaciadores</span>
              <p className="text-stone-600">
                Los cajistas tomaban los tipos del chibalete y los alineaban en el componedor, insertando lingotes ciegos de plomo para conseguir una justificación perfecta de márgenes rectos.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Por qué las Serifas definieron la Legibilidad */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800">
            <BookOpen className="w-4 h-4" />
            <span>FISIOLOGÍA DE LA LECTURA</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-stone-900">
            Serifas y Legibilidad en la Prensa Manual
          </h3>
          <p className="text-xs font-serif text-stone-700 leading-relaxed">
            Las serifas renacentistas no eran meros caprichos decorativos: cumplían funciones biomecánicas y ópticas indispensables para el libro impreso:
          </p>

          <div className="space-y-3 text-xs font-serif">
            <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 space-y-1">
              <span className="font-bold text-stone-900 block">1. Guía Óptica Horizontal del Ojo</span>
              <p className="text-stone-600">
                Las bases horizontales de las serifas generan una línea de base virtual continua que guía la mirada de izquierda a derecha sin tropiezos, evitando que el lector salte involuntariamente de renglón en páginas de 40 líneas.
              </p>
            </div>

            <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 space-y-1">
              <span className="font-bold text-stone-900 block">2. El Cartabón como Refuerzo Mecánico</span>
              <p className="text-stone-600">
                El plomo es un metal maleable y blando. El cartabón (apófige curvo) ensanchaba la base del asta, evitando que los extremos de las letras se rompieran o doblaran bajo la compresión de varios cientos de kilos ejercida por la palanca de la prensa.
              </p>
            </div>

            <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 space-y-1">
              <span className="font-bold text-stone-900 block">3. Trampas de Tinta Primitivas</span>
              <p className="text-stone-600">
                Las tintas del siglo XV, formuladas con aceite de nuez o linaza y hollín, eran muy viscosas. Las curvas fluidas de los cartabones evitaban que la tinta se estancara en las esquinas agudas, preservando abiertos los ojos interiores de las letras.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. LABORATORIO DE MANCHA TIPOGRÁFICA Y GRIS ÓPTICO */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold">
              Simulador de Mancha Tipográfica y Gris Óptico
            </h3>
            <p className="text-xs font-serif text-stone-600">
              Compara la densidad visual y legibilidad entre la Gótica de Maguncia, la Romana de Jenson y la Cursiva de Aldo
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-stone-500">Cuerpo de Texto:</span>
            <input
              type="range"
              min="16"
              max="36"
              value={opticalZoom}
              onChange={(e) => setOpticalZoom(Number(e.target.value))}
              className="w-24 accent-[#9A3412]"
            />
            <span className="tabular-nums text-stone-800">{opticalZoom}px</span>
          </div>
        </div>

        {/* 3 Columns Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Col 1: Gutenberg Textura */}
          <div className="p-5 bg-stone-100/70 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-stone-900">Gutenberg (1455)</span>
              <span className="text-stone-500">Gótica Textura</span>
            </div>
            <div className="h-48 overflow-y-auto pr-2 museum-scrollbar bg-white p-3 rounded border border-stone-200 text-stone-950 font-serif leading-tight">
              <p style={{ fontSize: `${opticalZoom}px` }}>
                In principio erat Verbum et Verbum erat apud Deum et Deus erat Verbum. Hoc erat in principio apud Deum. Omnia per ipsum facta sunt et sine ipso factum est nihil.
              </p>
            </div>
            <p className="text-[11px] font-serif text-stone-600">
              <strong>Mancha Densa (Negro denso):</strong> Textura de tejido apretado, lectura solemne, contraformas cerradas.
            </p>
          </div>

          {/* Col 2: Nicolas Jenson */}
          <div className="p-5 bg-amber-50/40 rounded-xl border border-amber-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#9A3412]">Jenson (1470)</span>
              <span className="text-[#9A3412]">Romana Veneciana</span>
            </div>
            <div className="h-48 overflow-y-auto pr-2 museum-scrollbar bg-white p-3 rounded border border-stone-200 text-stone-950 font-garamond leading-relaxed">
              <p style={{ fontSize: `${opticalZoom}px` }}>
                In principio erat Verbum et Verbum erat apud Deum et Deus erat Verbum. Hoc erat in principio apud Deum. Omnia per ipsum facta sunt et sine ipso factum est nihil.
              </p>
            </div>
            <p className="text-[11px] font-serif text-stone-600">
              <strong>Gris Armónico (Óptimo):</strong> Letra abierta, luz interior generosa, perfecta lectura continua.
            </p>
          </div>

          {/* Col 3: Aldus Manutius Italic */}
          <div className="p-5 bg-blue-50/40 rounded-xl border border-blue-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-blue-900">Aldo Manucio (1501)</span>
              <span className="text-blue-900">Cursiva Itálica</span>
            </div>
            <div className="h-48 overflow-y-auto pr-2 museum-scrollbar bg-white p-3 rounded border border-stone-200 text-stone-950 font-garamond italic leading-snug">
              <p style={{ fontSize: `${opticalZoom}px` }}>
                In principio erat Verbum et Verbum erat apud Deum et Deus erat Verbum. Hoc erat in principio apud Deum. Omnia per ipsum facta sunt et sine ipso factum est nihil.
              </p>
            </div>
            <p className="text-[11px] font-serif text-stone-600">
              <strong>Ahorro Espacial (Octavos):</strong> Compactación del texto en un 30%, nacimiento del libro de bolsillo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
