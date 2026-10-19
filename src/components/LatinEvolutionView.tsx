import React, { useState } from 'react';
import { Feather, ChevronRight, BookOpen, Layers, Ruler, ArrowRight } from 'lucide-react';

interface ScriptStage {
  id: string;
  name: string;
  subtitle: string;
  period: string;
  tool: string;
  support: string;
  structure: {
    title: string;
    description: string;
  };
  modulation: {
    title: string;
    description: string;
    angle: string;
  };
  serifs: {
    title: string;
    description: string;
    type: string;
  };
  historicalContext: string;
  sampleLetterA: string;
  sampleLetterE: string;
  sampleLetterM: string;
  sampleQuote: string;
  fontStyle: string;
}

const LATIN_STAGES: ScriptStage[] = [
  {
    id: 'capitalis-monumentalis',
    name: '1. Capitalis Monumentalis',
    subtitle: 'El canon arquitectónico del Imperio Romano',
    period: 's. I a.C. – s. II d.C. (Roma Imperial)',
    tool: 'Pincel plano previo con minio y cincel de acero templado con corte en V',
    support: 'Mármol de Carrara, travertino y pórfido monumental',
    structure: {
      title: 'Caja única mayúscula monumental',
      description: 'Solo existen letras capitales (mayúsculas). Las proporciones derivan estrictamente de figuras geométricas puras: la O y la D encajan en un cuadrado perfecto; la E, B y S son estrechas; la M y W son anchas y expansivas.'
    },
    modulation: {
      title: 'Modulación a pincel oblicua sutil',
      description: 'El artesano sostenía el pincel plano ancho en un ángulo constante de unos 30°. Al curvar trazos en O, C y Q, genera un eje de modulación inclinado a ~18°-20°.',
      angle: '18° - 20°'
    },
    serifs: {
      title: 'Nacimiento de la serifa cóncava con cartabón',
      description: 'El padre Edward Catich demostró que la serifa no fue un invento estético del cincel, sino el remate natural dejado por el movimiento de levantamiento del pincel plano al terminar el trazo. La incisión a cincel le otorgó un cartabón cóncavo tridimensional.',
      type: 'Triangular cóncava con cartabón fluido'
    },
    historicalContext: 'La inscripción de la Columna de Trajano (113 d.C.) en Roma constituye la cumbre universal de la epigrafía clásica latina, modelo perpetuo de todas las mayúsculas de nuestra civilización.',
    sampleLetterA: 'A',
    sampleLetterE: 'E',
    sampleLetterM: 'M',
    sampleQuote: 'SENATVS POPVLVSQVE ROMANVS',
    fontStyle: 'font-trajan'
  },
  {
    id: 'rustica-quadrata',
    name: '2. Capitalis Rústica y Cuadrata',
    subtitle: 'La transición al papiro y el códice temprano',
    period: 's. I – s. V d.C. (Bajo Imperio)',
    tool: 'Cálamo de caña cortado recto con ángulo muy empinado (60° a 70°)',
    support: 'Rollos de papiro y primeros pliegos de pergamino',
    structure: {
      title: 'Condensación y ritmo vertical',
      description: 'Letras comprimidas lateralmente para ahorrar superficie de papiro. Las curvas se aplanan y las letras adoptan proporciones esbeltas con un ritmo vertical continuo y compacto.'
    },
    modulation: {
      title: 'Contraste invertido y verticalidad',
      description: 'Debido al ángulo casi vertical del cálamo, los trazos verticales se vuelven sorprendentemente delgados, mientras que las barras horizontales y remates son gruesos.',
      angle: '60° - 70° (Invertida)'
    },
    serifs: {
      title: 'Remates horizontales en cabeza y pie',
      description: 'Serifas gruesas y horizontales producidas por el apoyo plano del cálamo al entrar y salir del trazo, semejantes a pequeñas plataformas.',
      type: 'Remate caligráfico horizontal denso'
    },
    historicalContext: 'Se utilizaba para ediciones literarias de lujo de Virgilio y Horacio en Roma, demostrando que la forma de la letra se adapta dinámicamente al soporte blando.',
    sampleLetterA: 'A',
    sampleLetterE: 'E',
    sampleLetterM: 'M',
    sampleQuote: 'ARMA VIRVMQVE CANO TROIAE',
    fontStyle: 'font-serif'
  },
  {
    id: 'uncial',
    name: '3. Escritura Uncial',
    subtitle: 'El redondeamiento cristiano y la pluma de ave',
    period: 's. IV – s. VIII d.C. (Edad Media Temprana)',
    tool: 'Pluma de ave de punta ancha cortada recta',
    support: 'Pergamino de vitela en encuadernación de códice',
    structure: {
      title: 'Redondeamiento de las aristas capitales',
      description: 'Las letras cuadradas romanas se pliegan en formas suaves y curvas para acelerar el copiado de los textos sagrados. Las letras \'A\', \'D\', \'E\' y \'M\' se transforman en sus célebres siluetas redondeadas unciales.'
    },
    modulation: {
      title: 'Modulación fluida y circular',
      description: 'La pluma se sostiene con un ángulo suave de 15° a 20°. El ductus es fluido y continuo, creando arcos amplios y generosos sin cortes abruptos.',
      angle: '15° - 20°'
    },
    serifs: {
      title: 'Ataques y remates curvos redondeados',
      description: 'Las serifas rígidas del cincel desaparecen. Son sustituidas por terminaciones engrosadas y pequeños bucles orgánicos dejados por la tinta en la vitela.',
      type: 'Terminal caligráfico redondeado'
    },
    historicalContext: 'La adopción del cristianismo como religión oficial requirió la difusión masiva de la Biblia en códices de pergamino; la uncial fue la letra litúrgica por excelencia durante cuatro siglos.',
    sampleLetterA: 'A',
    sampleLetterE: 'Є',
    sampleLetterM: 'M',
    sampleQuote: 'IN PRINCIPIO ERAT VERBVM ET VERBVM ERAT',
    fontStyle: 'font-serif'
  },
  {
    id: 'semi-uncial',
    name: '4. Escritura Semi-uncial',
    subtitle: 'El nacimiento de las minúsculas y el sistema de cuatro líneas',
    period: 's. V – s. IX d.C. (Monasterios insulares y continentales)',
    tool: 'Pluma de ave de punta biselada sostenida a 35°',
    support: 'Pergamino monástico',
    structure: {
      title: 'Aparición de ascendentes y descendentes (Caja Baja)',
      description: '¡El hito estructural más trascendental del alfabeto latino! Las letras rompen la disciplina de las dos líneas paralelas de las mayúsculas: \'b\', \'d\', \'h\', \'l\' proyectan astas ascendentes hacia arriba, y \'g\', \'p\', \'q\' descienden hacia abajo. Nace la caja baja.'
    },
    modulation: {
      title: 'Eje fuertemente inclinado a la pluma',
      description: 'Modulación orgánica muy marcada (~35° a 40°). Las curvas de \'o\' y \'e\' adelgazan drásticamente en los ejes diagonales correspondientes a la posición natural de la mano.',
      angle: '35° - 40°'
    },
    serifs: {
      title: 'Serifas de ataque triangulares caligráficas',
      description: 'En la parte superior de las astas ascendentes aparecen los primeros apéndices triangulares ("serifas de entrada") formados por el apoyo inicial de la pluma antes de descender.',
      type: 'Espolón o serifa de ataque triangular'
    },
    historicalContext: 'Los escribas irlandeses y británicos (como en el célebre Libro de Kells y los Evangelios de Lindisfarne) perfeccionaron esta letra, sembrando las bases de la minúscula europea.',
    sampleLetterA: 'a',
    sampleLetterE: 'e',
    sampleLetterM: 'm',
    sampleQuote: 'Liber generationis Iesu Christi filii David',
    fontStyle: 'font-garamond'
  },
  {
    id: 'carolingian-minuscule',
    name: '5. Minúscula Carolina',
    subtitle: 'La reforma de Carlomagno y la estandarización continental',
    period: 's. VIII – s. XII d.C. (Renacimiento Carolingio)',
    tool: 'Pluma de ganso de corte fino y tinta ferrogálica negra',
    support: 'Pergamino de piel tratada en abadías imperiales',
    structure: {
      title: 'Consolidación de la caja baja y separación de palabras',
      description: 'Alcuino de York sistematiza la altura de x, el espaciado regular entre palabras y los signos de puntuación básicos. Las mayúsculas quedan reservadas exclusivamente para inicios de frase y títulos honoríficos, creando el sistema bicameral (mayúsculas + minúsculas).'
    },
    modulation: {
      title: 'Eje de modulación oblicuo uniforme (~35°)',
      description: 'Ritmo calmado y armónico; las curvas son amplias y luminosas, garantizando que el texto pueda leerse con facilidad y rapidez.',
      angle: '35°'
    },
    serifs: {
      title: 'Remates triangulares caligráficos en astas',
      description: 'Serifas triangulares cóncavas en la cabeza de las astas y suaves pies curvados en la línea de base.',
      type: 'Triangular caligráfica con base apoyada'
    },
    historicalContext: 'Carlomagno decretó en 789 la unificación de la escritura en todo el Sacro Imperio para frenar la corrupción de los textos. Los humanistas del Renacimiento redescubrieron estos manuscritos y creyeron erróneamente que eran romanos antiguos: por eso la llamaron "littera antiqua".',
    sampleLetterA: 'a',
    sampleLetterE: 'e',
    sampleLetterM: 'm',
    sampleQuote: 'Claritas scripturae ad instructionem fidelium',
    fontStyle: 'font-garamond'
  },
  {
    id: 'gothic-textura',
    name: '6. Letra Gótica (Textura y Fraktur)',
    subtitle: 'La fractura de la curva y el ritmo denso de la Baja Edad Media',
    period: 's. XII – s. XV d.C. (Catedrales y Gutenberg)',
    tool: 'Pluma de ave de corte muy ancho sostenida a 45° estrictos',
    support: 'Pergamino densamente aprovechado y primeros papeles de lino',
    structure: {
      title: 'Fractus: La rotura sistemática de todas las curvas',
      description: 'La curva carolingia es expulsada. Cada letra se compone de una secuencia disciplinada de golpes rectos verticales y uniones a 45°. El espacio interior en blanco (contraforma) se reduce hasta igualar exactamente el grosor del asta negra.'
    },
    modulation: {
      title: 'Contraste violento y verticalización',
      description: 'El eje vuelve a parecer vertical debido a la rigidez de las columnas de trazo negro, pero los empalmes diagonales son hilos finos en ángulo de 45°.',
      angle: '45° agudo'
    },
    serifs: {
      title: 'Remates rómbicos y cuatrifolios terminales',
      description: 'Las bases y cabezas de las letras terminan en pequeños rombos o cuadrantes angulares provocados por el apoyo plano de la pluma.',
      type: 'Romboide angular / Pico'
    },
    historicalContext: 'La expansión de las universidades y el alto precio del pergamino exigieron empaquetar la máxima cantidad de palabras por hoja. Gutenberg eligió la Textura para su Biblia de 1455 para demostrar que la imprenta podía igualar el más fastuoso códice litúrgico.',
    sampleLetterA: 'a',
    sampleLetterE: 'e',
    sampleLetterM: 'm',
    sampleQuote: 'In principio erat Verbum et Verbum erat apud Deum',
    fontStyle: 'font-serif'
  }
];

export const LatinEvolutionView: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('capitalis-monumentalis');
  const activeStage = LATIN_STAGES.find((s) => s.id === selectedStageId) || LATIN_STAGES[0];

  return (
    <div className="space-y-10">
      {/* 1. SECTION BANNER & CURATORIAL PROLOGUE */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#9A3412]">
          <span>GENEALOGÍA DE LAS FORMAS LATINAS</span>
          <span aria-hidden="true">·</span>
          <span>DE ROMA AL MANUSCRITO MEDIEVAL</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          La Evolución del Alfabeto Latino
        </h1>
        <p className="text-base font-serif text-stone-700 max-w-4xl leading-relaxed">
          Desde las majestuosas mayúsculas talladas a cincel en las calzadas y arcos triunfales del Imperio Romano, 
          pasando por las redondeadas unciales de los primeros códices cristianos y la invención de la minúscula semi-uncial, 
          hasta la claridad imperial de la minúscula carolina y la fractura gótica: cómo mutaron la <strong>estructura</strong>, 
          el <strong>eje de modulación</strong> y la <strong>anatomía de las serifas</strong>.
        </p>

        {/* Visual Callout Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
          <div className="space-y-2">
            <div className="overflow-hidden rounded-lg border border-stone-200 aspect-16/9 bg-stone-100">
              <img
                src="/src/assets/images/trajan_inscription_1791469692703.jpg"
                alt="Capitalis Monumentalis de la Columna de Trajano"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
            <p className="text-xs font-serif text-stone-500 italic">
              Fig 1. Capitalis Monumentalis en mármol (113 d.C., Roma). Mayúsculas de proporciones áureas con serifa cóncava tallada a cincel.
            </p>
          </div>

          <div className="space-y-2">
            <div className="overflow-hidden rounded-lg border border-stone-200 aspect-16/9 bg-stone-100">
              <img
                src="/src/assets/images/carolingian_manuscript_1791470261602.jpg"
                alt="Manuscrito carolingio y uncial sobre vitela"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
            <p className="text-xs font-serif text-stone-500 italic">
              Fig 2. Códice medieval en vitela con minúscula carolina y unciales iluminadas. El triunfo del sistema de cuatro líneas y la pluma de ave.
            </p>
          </div>
        </div>
      </div>

      {/* 2. CHRONOLOGICAL STAGE SELECTOR RAIL */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-6 shadow-xs space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold">
          Las 6 Etapas Críticas de la Escritura Latina
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LATIN_STAGES.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-4 rounded-lg border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-stone-900 text-white shadow-md'
                    : 'bg-[#FAF8F5] border-stone-200 text-stone-800 hover:border-stone-400 hover:bg-white'
                }`}
              >
                <div>
                  <span className={`text-[11px] font-mono block mb-1 ${isSelected ? 'text-amber-400 font-bold' : 'text-[#9A3412]'}`}>
                    {stage.period}
                  </span>
                  <h3 className="font-serif font-bold text-sm leading-snug">
                    {stage.name}
                  </h3>
                  <p className={`text-xs font-serif mt-1 line-clamp-2 ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                    {stage.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200/40 flex items-center justify-between text-[11px] font-mono">
                  <span className={isSelected ? 'text-stone-300' : 'text-stone-500'}>
                    Eje: {stage.modulation.angle}
                  </span>
                  <span className={isSelected ? 'text-amber-300' : 'text-[#9A3412]'}>
                    Explorar →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. DEEP MORPHOLOGICAL DETAIL OF SELECTED STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The 3 Core Pillars (Estructura, Modulación, Serifa) (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#9A3412] mb-1">
              <span>ANÁLISIS DE LA FORMA</span>
              <span aria-hidden="true">·</span>
              <span>{activeStage.period}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {activeStage.name}
            </h2>
            <p className="text-sm font-serif italic text-stone-600 mt-1">
              {activeStage.subtitle}
            </p>
          </div>

          {/* Historical narrative */}
          <div className="p-4 bg-amber-50/70 border-l-3 border-[#9A3412] rounded-r-lg space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9A3412]">
              Contexto Histórico y Función
            </span>
            <p className="text-xs font-serif text-stone-800 leading-relaxed">
              {activeStage.historicalContext}
            </p>
          </div>

          {/* Technical physical support */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
            <div className="p-3 bg-stone-50 border border-stone-100 rounded-lg">
              <span className="font-mono text-stone-500 text-[11px] uppercase block mb-1">
                Herramienta y Ductus:
              </span>
              <p className="text-stone-900 font-medium">
                {activeStage.tool}
              </p>
            </div>
            <div className="p-3 bg-stone-50 border border-stone-100 rounded-lg">
              <span className="font-mono text-stone-500 text-[11px] uppercase block mb-1">
                Soporte de Inscripción:
              </span>
              <p className="text-stone-900 font-medium">
                {activeStage.support}
              </p>
            </div>
          </div>

          {/* 3 Pillars Breakdown */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-stone-900 font-bold">
              Las 3 Transformaciones Anatómicas Clave
            </h3>

            {/* Pillar 1: Estructura */}
            <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-stone-900 uppercase">
                  1. Cambio en la Estructura (Esqueleto)
                </span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono text-[11px] font-bold rounded">
                  Proporción & Caja
                </span>
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-xs">
                {activeStage.structure.title}
              </h4>
              <p className="text-xs font-serif text-stone-600 leading-relaxed">
                {activeStage.structure.description}
              </p>
            </div>

            {/* Pillar 2: Modulación */}
            <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-stone-900 uppercase">
                  2. Cambio en la Modulación y el Eje
                </span>
                <span className="px-2 py-0.5 bg-stone-200 text-stone-800 font-mono text-[11px] font-bold rounded">
                  Ángulo: {activeStage.modulation.angle}
                </span>
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-xs">
                {activeStage.modulation.title}
              </h4>
              <p className="text-xs font-serif text-stone-600 leading-relaxed">
                {activeStage.modulation.description}
              </p>
            </div>

            {/* Pillar 3: Serifas */}
            <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-stone-900 uppercase">
                  3. Cambio en las Serifas y Remates
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 font-mono text-[11px] font-bold rounded">
                  {activeStage.serifs.type}
                </span>
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-xs">
                {activeStage.serifs.title}
              </h4>
              <p className="text-xs font-serif text-stone-600 leading-relaxed">
                {activeStage.serifs.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Glyph Specimen & Letter Mutator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Specimen Card */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#9A3412] font-bold">
              Espécimen Gráfico de la Etapa
            </h3>

            {/* Large specimen letters */}
            <div className="p-6 bg-[#FAF8F5] rounded-xl border border-stone-200 flex items-center justify-center gap-6 text-center">
              <div className="space-y-1">
                <span className={`text-5xl sm:text-6xl ${activeStage.fontStyle} text-stone-900 block`}>
                  {activeStage.sampleLetterA}
                </span>
                <span className="font-mono text-[10px] text-stone-500">Signo A</span>
              </div>
              <div className="space-y-1">
                <span className={`text-5xl sm:text-6xl ${activeStage.fontStyle} text-stone-900 block`}>
                  {activeStage.sampleLetterE}
                </span>
                <span className="font-mono text-[10px] text-stone-500">Signo E</span>
              </div>
              <div className="space-y-1">
                <span className={`text-5xl sm:text-6xl ${activeStage.fontStyle} text-stone-900 block`}>
                  {activeStage.sampleLetterM}
                </span>
                <span className="font-mono text-[10px] text-stone-500">Signo M</span>
              </div>
            </div>

            {/* Sample phrase */}
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-100 text-center">
              <p className={`text-lg sm:text-xl font-serif text-stone-900 leading-snug ${activeStage.fontStyle}`}>
                {activeStage.sampleQuote}
              </p>
            </div>
          </div>

          {/* Morphological Shift Table across all 6 stages */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-stone-900 font-bold">
              Evolución Morfológica: Resumen Visual
            </h3>

            <div className="space-y-2 text-xs font-serif">
              <div className="p-2.5 rounded bg-stone-50 border border-stone-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900">Capitalis Trajana</span>
                  <span className="text-[11px] text-stone-500 block">Solo Mayúsculas · Cincel</span>
                </div>
                <span className="font-mono text-xs text-[#9A3412] font-bold">Serifa Cóncava</span>
              </div>

              <div className="p-2.5 rounded bg-stone-50 border border-stone-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900">Uncial</span>
                  <span className="text-[11px] text-stone-500 block">Redondeada · Pluma suave</span>
                </div>
                <span className="font-mono text-xs text-stone-700 font-bold">Terminal Curvo</span>
              </div>

              <div className="p-2.5 rounded bg-stone-50 border border-stone-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900">Semi-uncial</span>
                  <span className="text-[11px] text-stone-500 block">Nacen Ascendentes / Descendentes</span>
                </div>
                <span className="font-mono text-xs text-stone-700 font-bold">Serifa de Entrada</span>
              </div>

              <div className="p-2.5 rounded bg-stone-50 border border-stone-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900">Minúscula Carolina</span>
                  <span className="text-[11px] text-stone-500 block">Sistema Bicameral · Altura de x</span>
                </div>
                <span className="font-mono text-xs text-stone-700 font-bold">Triangular Pluma</span>
              </div>

              <div className="p-2.5 rounded bg-stone-50 border border-stone-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900">Letra Gótica</span>
                  <span className="text-[11px] text-stone-500 block">Fractura de curvas · Pluma a 45°</span>
                </div>
                <span className="font-mono text-xs text-amber-800 font-bold">Pico Romboidal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
