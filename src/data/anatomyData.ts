export interface AnatomyPart {
  id: string;
  name: string;
  glyphSource: string;
  alternateNames?: string[];
  shortDefinition: string;
  detailedFunction: string;
  xPercent: number; // Position on canvas (0-100)
  yPercent: number; // Position on canvas (0-100)
  hint: string;
  category: 'trazo' | 'terminal' | 'espacio' | 'union' | 'lineas';
}

export interface AnatomyGlyph {
  letter: string;
  category: 'Mayúscula' | 'Minúscula';
  name: string;
  description: string;
  keyMorphologyHighlight: string;
  parts: AnatomyPart[];
}

export const ANATOMY_PARTS_ALL: AnatomyPart[] = [
  {
    id: 'asta-fuste',
    name: 'Asta / Fuste',
    glyphSource: 'I',
    alternateNames: ['Fuste', 'Montante', 'Columna', 'Tronco'],
    shortDefinition: 'El trazo vertical estructural que sostiene todo el peso y estabilidad de la letra.',
    detailedFunction: 'Es la columna vertebral del signo tipográfico. En tipografías venecianas y romanas clásicas tiene grosor firme y remata en cartelas curvadas.',
    xPercent: 50,
    yPercent: 50,
    hint: 'La columna vertical principal que sostiene el signo.',
    category: 'trazo'
  },
  {
    id: 'cartela-apofige',
    name: 'Cartela / Apófige (Bracket)',
    glyphSource: 'I',
    alternateNames: ['Apófige', 'Enlace', 'Bracket', 'Consola'],
    shortDefinition: 'La pequeña curva armónica que une el asta vertical con la serifa horizontal.',
    detailedFunction: 'Suaviza el encuentro entre el trazo vertical y el remate de apoyo. En tipografías venecianas y garaldas es fluida y orgánica; en Bodoni se suprime a 90°.',
    xPercent: 42,
    yPercent: 24,
    hint: 'Curva que une el asta con la serifa como una ménsula arquitectónica.',
    category: 'union'
  },
  {
    id: 'serif-doble',
    name: 'Serifa Bilateral / Gracia',
    glyphSource: 'I',
    alternateNames: ['Serif bilateral', 'Remate', 'Patín', 'Gracia'],
    shortDefinition: 'El remate horizontal que se extiende a ambos lados del asta apoyando el signo en la línea.',
    detailedFunction: 'Guía el desplazamiento horizontal del ojo en la línea de texto y crea el ritmo descansado característico de las letras con serifa.',
    xPercent: 50,
    yPercent: 88,
    hint: 'Remate horizontal en ambos extremos de la letra.',
    category: 'terminal'
  },
  {
    id: 'apice',
    name: 'Ápice',
    glyphSource: 'A',
    alternateNames: ['Vértice superior', 'Cúspide'],
    shortDefinition: 'La unión superior donde convergen las dos astas diagonales.',
    detailedFunction: 'En tipografías venecianas sobrepasa sutilmente la línea de mayúsculas (ajuste óptico u overshoot) para compensar la agudeza del ángulo.',
    xPercent: 50,
    yPercent: 12,
    hint: 'Punta superior más alta donde se unen los dos lados.',
    category: 'union'
  },
  {
    id: 'travesano-barra',
    name: 'Travesaño / Barra',
    glyphSource: 'A',
    alternateNames: ['Barra transversal', 'Filete', 'Crossbar'],
    shortDefinition: 'El trazo horizontal que une ambos lados diagonales de la A o cruza la H y la t.',
    detailedFunction: 'Estabiliza el centro de gravedad visual del carácter. Su posición óptica define el equilibrio entre elegancia clásica y ligereza.',
    xPercent: 50,
    yPercent: 62,
    hint: 'Barra horizontal que une las diagonales.',
    category: 'trazo'
  },
  {
    id: 'asta-gruesa-fina',
    name: 'Contraste Diagonal (Gruesa vs Fina)',
    glyphSource: 'A',
    alternateNames: ['Asta montante gruesa', 'Diagonal descendente'],
    shortDefinition: 'La diferencia de grosor entre la diagonal fina izquierda y la diagonal gruesa derecha.',
    detailedFunction: 'Heredada directamente del trazo de la pluma de punta ancha inclinada: al subir la pluma hace trazo fino, al bajar hace trazo grueso.',
    xPercent: 72,
    yPercent: 54,
    hint: 'Variación de peso entre ambos lados de la A.',
    category: 'trazo'
  },
  {
    id: 'vertice-v',
    name: 'Vértice Inferior',
    glyphSource: 'V',
    alternateNames: ['Ápice inferior', 'Vértice'],
    shortDefinition: 'El punto inferior donde convergen las astas diagonales.',
    detailedFunction: 'Desciende levemente por debajo de la línea de base (overshoot) para que el ojo no perciba que la letra flota.',
    xPercent: 50,
    yPercent: 88,
    hint: 'Punta inferior de letras angulares como V.',
    category: 'union'
  },
  {
    id: 'brazo-e',
    name: 'Brazo',
    glyphSource: 'E',
    alternateNames: ['Trazo horizontal libre', 'Arm'],
    shortDefinition: 'El trazo horizontal o diagonal que nace de un asta y termina libre en el espacio.',
    detailedFunction: 'Aparece en E, F, L, K, T. En la E el brazo superior e inferior son más largos que el brazo central.',
    xPercent: 78,
    yPercent: 18,
    hint: 'Trazo horizontal que se proyecta hacia la derecha.',
    category: 'trazo'
  },
  {
    id: 'espuela-g',
    name: 'Espuela (Spur)',
    glyphSource: 'G',
    alternateNames: ['Saliente', 'Gavieta', 'Spur'],
    shortDefinition: 'El pequeño saliente o púa vertical en el extremo del arco inferior de la G.',
    detailedFunction: 'Asienta la terminación de la curva antes de elevarse en el trazo horizontal o vertical.',
    xPercent: 76,
    yPercent: 68,
    hint: 'Pequeño pico o púa vertical en la G.',
    category: 'terminal'
  },
  {
    id: 'eje-modulacion',
    name: 'Eje de Modulación (Stress)',
    glyphSource: 'O',
    alternateNames: ['Tensión', 'Eje axial', 'Ángulo de pluma'],
    shortDefinition: 'El ángulo de la línea imaginaria que atraviesa los puntos más delgados de una curva.',
    detailedFunction: 'En el estilo veneciano está inclinado hacia la izquierda (~25°); en el barroco a ~15°; en el Didona es estrictamente vertical (90°).',
    xPercent: 32,
    yPercent: 28,
    hint: 'Dirección e inclinación de los puntos más delgados.',
    category: 'lineas'
  },
  {
    id: 'contrapunzon-ojo',
    name: 'Contrapunzón / Ojo Interior',
    glyphSource: 'O',
    alternateNames: ['Contraforma', 'Blanco interno', 'Counter'],
    shortDefinition: 'El espacio interior en blanco encerrado total o parcialmente por los trazos de la letra.',
    detailedFunction: 'Los diseñadores de tipos diseñan el espacio blanco interior; la luz del contrapunzón da vida y legibilidad a la palabra.',
    xPercent: 50,
    yPercent: 50,
    hint: 'Hueco blanco atrapado en el interior.',
    category: 'espacio'
  },
  {
    id: 'espina-s',
    name: 'Espina (Asta Ondulada)',
    glyphSource: 'S',
    alternateNames: ['Espina dorsal', 'Spine'],
    shortDefinition: 'El trazo curvo central y sinuoso que conforma el tronco principal de la S.',
    detailedFunction: 'Requiere la mayor maestría de modulación para equilibrar la curva superior con la curva inferior.',
    xPercent: 50,
    yPercent: 50,
    hint: 'Curva en ese que recorre el centro de la S.',
    category: 'trazo'
  },
  {
    id: 'cola-q',
    name: 'Cola',
    glyphSource: 'Q',
    alternateNames: ['Rabillo', 'Cola descendente', 'Tail'],
    shortDefinition: 'El trazo libre que cruza o nace de la parte inferior de la Q o la R.',
    detailedFunction: 'En tipografías romanas y venecianas suele ser larga, elegante y fluida, rompiendo la monotonía del renglón.',
    xPercent: 78,
    yPercent: 86,
    hint: 'Trazo distintivo que sale abajo de la Q.',
    category: 'trazo'
  },
  {
    id: 'panza-bucle',
    name: 'Panza / Bucle (Lóbulo)',
    glyphSource: 'R',
    alternateNames: ['Bucle', 'Bolo', 'Lóbulo', 'Bowl'],
    shortDefinition: 'El trazo curvo cerrado que rodea la contraforma superior en R, B, P.',
    detailedFunction: 'Determina la amplitud y luminosidad de la cabeza de la letra.',
    xPercent: 68,
    yPercent: 32,
    hint: 'Curva redonda que forma la cabeza de la R.',
    category: 'trazo'
  },
  {
    id: 'pierna-cola',
    name: 'Pierna / Cola (Pata)',
    glyphSource: 'R',
    alternateNames: ['Pata', 'Pierna diagonal', 'Leg'],
    shortDefinition: 'El trazo diagonal descendente que apoya a la R sobre la línea de base.',
    detailedFunction: 'En fuentes venecianas y barrocas termina en una suave curvatura o floritura (swash).',
    xPercent: 76,
    yPercent: 84,
    hint: 'Trazo diagonal que baja a apoyar la R.',
    category: 'trazo'
  },
  {
    id: 'lagrima-gota',
    name: 'Lágrima / Gota (Teardrop)',
    glyphSource: 'f',
    alternateNames: ['Gota terminal', 'Lágrima', 'Terminal bulboso'],
    shortDefinition: 'El remate esférico o en gota que concluye la curva superior hacia adelante.',
    detailedFunction: 'Aparece en f, a, r, c. Evita empastes de tinta en la fundición de plomo y aporta una calidez orgánica inconfundible.',
    xPercent: 74,
    yPercent: 14,
    hint: 'Remate redondeado en la curva de la f.',
    category: 'terminal'
  },
  {
    id: 'oreja-g',
    name: 'Oreja (Ear)',
    glyphSource: 'g',
    alternateNames: ['Lóbulo superior', 'Botón', 'Ear'],
    shortDefinition: 'El pequeño saliente o apéndice en la esquina superior derecha del ojo de la g.',
    detailedFunction: 'Un detalle icónico de las romanas tradicionales que equilibra visualmente el peso del bucle inferior.',
    xPercent: 78,
    yPercent: 20,
    hint: 'Pequeña antena o saliente arriba a la derecha en la g.',
    category: 'terminal'
  },
  {
    id: 'cuello-istmo',
    name: 'Cuello / Istmo (Link)',
    glyphSource: 'g',
    alternateNames: ['Istmo', 'Enlace', 'Link', 'Garganta'],
    shortDefinition: 'El trazo estrecho que conecta el ojo superior con el bucle inferior en la g de dos pisos.',
    detailedFunction: 'Articula la transición caligráfica entre ambos pisos de la letra.',
    xPercent: 52,
    yPercent: 58,
    hint: 'Trazo estrecho que une la cabeza con el lazo inferior de la g.',
    category: 'union'
  },
  {
    id: 'loop-bucle-g',
    name: 'Loop / Bucle Inferior (Ojal)',
    glyphSource: 'g',
    alternateNames: ['Lazo', 'Ojal', 'Loop inferior'],
    shortDefinition: 'La curva inferior que desciende por debajo de la línea de base en la g tradicional.',
    detailedFunction: 'En la g aldina y veneciana es cerrado o ligeramente abierto con gran dinamismo.',
    xPercent: 48,
    yPercent: 86,
    hint: 'Lazo que cuelga por debajo de la línea de base.',
    category: 'espacio'
  },
  {
    id: 'hombro-arco',
    name: 'Hombro / Arco',
    glyphSource: 'h',
    alternateNames: ['Arco', 'Shoulder'],
    shortDefinition: 'El trazo curvo continuo que nace del asta vertical y cae hacia la derecha en h, n, m.',
    detailedFunction: 'Crea el ritmo de arcos de la lectura continuada en prosa.',
    xPercent: 62,
    yPercent: 46,
    hint: 'Curva que salta del asta vertical como un arco de puente.',
    category: 'trazo'
  },
  {
    id: 'asta-ascendente',
    name: 'Asta Ascendente',
    glyphSource: 'h',
    alternateNames: ['Ascendente', 'Asta superior'],
    shortDefinition: 'La porción del asta vertical que supera hacia arriba la altura de x (en b, d, h, k, l).',
    detailedFunction: 'Permite reconocer de inmediato la silueta de la palabra en la lectura veloz.',
    xPercent: 28,
    yPercent: 16,
    hint: 'Trazo que sube por encima de la caja x.',
    category: 'trazo'
  },
  {
    id: 'asta-descendente',
    name: 'Asta Descendente',
    glyphSource: 'p',
    alternateNames: ['Descendente', 'Cola'],
    shortDefinition: 'El trazo vertical que se sumerge por debajo de la línea de base (en p, q, g, y).',
    detailedFunction: 'Ancla las líneas de texto y crea un espaciado interlineal armónico.',
    xPercent: 26,
    yPercent: 84,
    hint: 'Trazo vertical que baja por debajo de la línea de base.',
    category: 'trazo'
  },
  {
    id: 'baza-espolon',
    name: 'Baza / Espolón',
    glyphSource: 'b',
    alternateNames: ['Espolón inferior', 'Baza'],
    shortDefinition: 'La pequeña protuberancia o saliente en la base del asta antes de iniciar la curva.',
    detailedFunction: 'Resto del inicio caligráfico de la pluma que asienta la letra sobre el renglón.',
    xPercent: 32,
    yPercent: 84,
    hint: 'Saliente en el pie del asta de la b.',
    category: 'terminal'
  }
];

export const ANATOMY_GLYPHS: AnatomyGlyph[] = [
  {
    letter: 'I',
    category: 'Mayúscula',
    name: 'I Mayúscula Romana',
    description: 'Asta fuste vertical, serif bilateral y cartelas apófiges.',
    keyMorphologyHighlight: 'Asta + Cartela + Serifa Bilateral',
    parts: ANATOMY_PARTS_ALL.filter(p => p.glyphSource === 'I')
  },
  {
    letter: 'A',
    category: 'Mayúscula',
    name: 'A Mayúscula',
    description: 'Ápice superior, diagonales gruesa y fina, y travesaño.',
    keyMorphologyHighlight: 'Ápice + Travesaño + Contraste Diagonal',
    parts: ANATOMY_PARTS_ALL.filter(p => p.glyphSource === 'A')
  },
  {
    letter: 'R',
    category: 'Mayúscula',
    name: 'R Mayúscula',
    description: 'Asta, panza superior con cartela y pierna diagonal con cola.',
    keyMorphologyHighlight: 'Panza + Pierna + Cola + Cartela',
    parts: ANATOMY_PARTS_ALL.filter(p => p.glyphSource === 'R')
  },
  {
    letter: 'g',
    category: 'Minúscula',
    name: 'g Minúscula de Dos Pisos',
    description: 'La célebre g aldina veneciana con oreja, ojo, cuello y loop.',
    keyMorphologyHighlight: 'Oreja + Cuello + Loop + Ojo',
    parts: ANATOMY_PARTS_ALL.filter(p => p.glyphSource === 'g')
  },
  {
    letter: 'f',
    category: 'Minúscula',
    name: 'f Minúscula',
    description: 'Asta vertical, travesaño horizontal y lágrima o gota hacia adelante.',
    keyMorphologyHighlight: 'Lágrima/Gota + Travesaño + Curva',
    parts: ANATOMY_PARTS_ALL.filter(p => p.glyphSource === 'f')
  },
  {
    letter: 'O',
    category: 'Mayúscula',
    name: 'O Mayúscula',
    description: 'Eje de modulación oblicuo, contrapunzón interior y contraste.',
    keyMorphologyHighlight: 'Eje de Modulación + Contrapunzón',
    parts: ANATOMY_PARTS_ALL.filter(p => p.glyphSource === 'O')
  },
  {
    letter: 'h',
    category: 'Minúscula',
    name: 'h Minúscula',
    description: 'Asta ascendente alta y hombro o arco descansado.',
    keyMorphologyHighlight: 'Asta Ascendente + Hombro/Arco',
    parts: ANATOMY_PARTS_ALL.filter(p => p.glyphSource === 'h')
  },
  {
    letter: 'p',
    category: 'Minúscula',
    name: 'p Minúscula',
    description: 'Asta descendente que penetra el renglón y panza cerrada.',
    keyMorphologyHighlight: 'Asta Descendente + Panza',
    parts: ANATOMY_PARTS_ALL.filter(p => p.glyphSource === 'p')
  },
  {
    letter: 'Q',
    category: 'Mayúscula',
    name: 'Q Mayúscula',
    description: 'Ojo elíptico con cola libre que cruza el contrapunzón.',
    keyMorphologyHighlight: 'Cola Expresiva + Contraforma',
    parts: ANATOMY_PARTS_ALL.filter(p => p.glyphSource === 'Q')
  }
];

export interface QuizQuestion {
  id: string;
  glyphLetter: string;
  partId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

// LARGE QUESTION BANK (35+ diverse questions) so students get fresh questions on every try!
export const ANATOMY_QUIZ_QUESTIONS_POOL: QuizQuestion[] = [
  {
    id: 'q1',
    glyphLetter: 'I',
    partId: 'asta-fuste',
    questionText: '¿Cómo se llama la columna vertical principal que sostiene la masa del carácter en la I o la R?',
    options: ['Asta / Fuste', 'Travesaño', 'Cartabón', 'Bucle'],
    correctAnswer: 'Asta / Fuste',
    explanation: 'El asta o fuste es el trazo vertical vertebral que soporta la masa estructural del signo.',
    hint: 'Es la línea vertical que sostiene el peso del signo.'
  },
  {
    id: 'q2',
    glyphLetter: 'I',
    partId: 'cartela-apofige',
    questionText: 'En una tipografía veneciana o romana, ¿qué nombre recibe la curvatura que enlaza el asta con la serifa?',
    options: ['Cartela / Apófige (Bracket)', 'Espuela', 'Ápice', 'Oreja'],
    correctAnswer: 'Cartela / Apófige (Bracket)',
    explanation: 'La cartela o apófige es la curva que suaviza el encuentro entre el asta y la base horizontal.',
    hint: 'Tiene forma de ménsula o cartabón y empieza por C.'
  },
  {
    id: 'q3',
    glyphLetter: 'I',
    partId: 'serif-doble',
    questionText: '¿Cómo se denomina el remate horizontal que sobresale a ambos lados del pie de la letra?',
    options: ['Serifa Bilateral', 'Gota Terminal', 'Swash', 'Espina'],
    correctAnswer: 'Serifa Bilateral',
    explanation: 'La serifa bilateral apoya la letra en el renglón proyectándose hacia ambos lados del asta.',
    hint: 'Es el remate que se proyecta a ambos lados.'
  },
  {
    id: 'q4',
    glyphLetter: 'A',
    partId: 'apice',
    questionText: '¿Cómo se llama la punta superior donde convergen las dos astas diagonales en la A o la M?',
    options: ['Ápice', 'Cartabón', 'Vértice', 'Espolón'],
    correctAnswer: 'Ápice',
    explanation: 'El ápice es el punto de encuentro superior de las diagonales en signos angulares.',
    hint: 'Palabra esdrújula que indica la cumbre o punta superior.'
  },
  {
    id: 'q5',
    glyphLetter: 'A',
    partId: 'travesano-barra',
    questionText: '¿Qué nombre recibe la barra horizontal que une los dos lados diagonales de la A?',
    options: ['Travesaño / Barra', 'Cuello', 'Pierna', 'Hombro'],
    correctAnswer: 'Travesaño / Barra',
    explanation: 'El travesaño une las astas diagonales y define el centro de gravedad visual del signo.',
    hint: 'Atraviesa la letra de lado a lado.'
  },
  {
    id: 'q6',
    glyphLetter: 'g',
    partId: 'oreja-g',
    questionText: 'En la \'g\' minúscula tradicional de dos pisos, ¿cómo se llama el saliente superior derecho?',
    options: ['Oreja (Ear)', 'Gancho', 'Pico', 'Espuela'],
    correctAnswer: 'Oreja (Ear)',
    explanation: 'La oreja es un detalle icónico de las romanas tradicionales que equilibra el bucle inferior.',
    hint: 'Órgano del sentido del oído.'
  },
  {
    id: 'q7',
    glyphLetter: 'g',
    partId: 'cuello-istmo',
    questionText: '¿Qué nombre tiene el trazo estrecho que conecta el ojo de arriba con el lazo de abajo en la \'g\'?',
    options: ['Cuello / Istmo (Link)', 'Asta descendente', 'Travesaño', 'Gota'],
    correctAnswer: 'Cuello / Istmo (Link)',
    explanation: 'El cuello o istmo actúa como puente de unión entre el ojo superior y el loop inferior.',
    hint: 'Une la cabeza con el cuerpo en el ser humano.'
  },
  {
    id: 'q8',
    glyphLetter: 'g',
    partId: 'loop-bucle-g',
    questionText: '¿Cómo se denomina la bolsa o curva inferior que cuelga por debajo de la línea de base en la \'g\'?',
    options: ['Loop / Bucle Inferior', 'Pierna', 'Cartabón', 'Horcadura'],
    correctAnswer: 'Loop / Bucle Inferior',
    explanation: 'El loop o bucle inferior es el lazo que desciende hacia la zona de descendentes.',
    hint: 'Tiene forma de lazo o bucle cerrado.'
  },
  {
    id: 'q9',
    glyphLetter: 'f',
    partId: 'lagrima-gota',
    questionText: '¿Cómo se llama el remate redondeado en forma esférica que concluye la curva de la \'f\' hacia adelante?',
    options: ['Lágrima / Gota (Teardrop)', 'Espuela', 'Ápice', 'Serifa Slab'],
    correctAnswer: 'Lágrima / Gota (Teardrop)',
    explanation: 'La lágrima o gota terminal es un acabado esférico característico de tipos venecianos y clásicos.',
    hint: 'Tiene forma de gota de agua o lágrima.'
  },
  {
    id: 'q10',
    glyphLetter: 'O',
    partId: 'eje-modulacion',
    questionText: '¿Cómo se denomina la inclinación que une los puntos de menor grosor en una curva tipográfica?',
    options: ['Eje de Modulación (Stress)', 'Altura de x', 'Arranque', 'Kerning'],
    correctAnswer: 'Eje de Modulación (Stress)',
    explanation: 'El eje de modulación indica la orientación axial del adelgazamiento producido por la pluma.',
    hint: 'Indica la inclinación y tensión axial.'
  },
  {
    id: 'q11',
    glyphLetter: 'O',
    partId: 'contrapunzon-ojo',
    questionText: '¿Qué término define el espacio en blanco interior atrapado dentro de una letra cerrada?',
    options: ['Contrapunzón / Ojo Interior', 'Cartela', 'Arco', 'Fuste'],
    correctAnswer: 'Contrapunzón / Ojo Interior',
    explanation: 'El contrapunzón o contraforma es el vacío luminoso interno que define la masa visual del tipo.',
    hint: 'Es el blanco interno o counter.'
  },
  {
    id: 'q12',
    glyphLetter: 'h',
    partId: 'asta-ascendente',
    questionText: 'En letras como \'b\', \'d\' o \'h\', ¿cómo se llama el asta que se proyecta por encima de la altura de x?',
    options: ['Asta Ascendente', 'Asta Descendente', 'Espina', 'Filete'],
    correctAnswer: 'Asta Ascendente',
    explanation: 'El asta ascendente supera la caja x y ayuda a la identificación de palabras en lectura rápida.',
    hint: 'Sube hacia el cielo.'
  },
  {
    id: 'q13',
    glyphLetter: 'p',
    partId: 'asta-descendente',
    questionText: 'En letras como \'p\', \'q\' o \'y\', ¿cómo se llama el trazo que se hunde bajo la línea de base?',
    options: ['Asta Descendente', 'Asta Ascendente', 'Brazo', 'Travesaño'],
    correctAnswer: 'Asta Descendente',
    explanation: 'El asta descendente penetra por debajo de la línea de base marcando el ritmo vertical.',
    hint: 'Cae hacia abajo por debajo del renglón.'
  },
  {
    id: 'q14',
    glyphLetter: 'R',
    partId: 'pierna-cola',
    questionText: '¿Cómo se denomina el trazo diagonal de apoyo que baja hacia la derecha en la R?',
    options: ['Pierna / Cola (Leg)', 'Ápice', 'Oreja', 'Cuello'],
    correctAnswer: 'Pierna / Cola (Leg)',
    explanation: 'La pierna o cola apoya la R sobre la línea de base, a menudo con un suave giro o floritura.',
    hint: 'Como una pierna humana que apoya el cuerpo.'
  },
  {
    id: 'q15',
    glyphLetter: 'R',
    partId: 'panza-bucle',
    questionText: '¿Cómo se llama la curva cerrada superior que forma la cabeza de la R o la parte superior de la B?',
    options: ['Panza / Bucle (Lóbulo)', 'Asta', 'Espuela', 'Ápice'],
    correctAnswer: 'Panza / Bucle (Lóbulo)',
    explanation: 'La panza o bucle es el trazo curvo cerrado que rodea el contrapunzón superior.',
    hint: 'Alude a la forma redonda de un vientre o bolo.'
  },
  {
    id: 'q16',
    glyphLetter: 'Q',
    partId: 'cola-q',
    questionText: '¿Qué nombre recibe el trazo libre que nace en la parte inferior de la Q y la distingue de la O?',
    options: ['Cola (Tail)', 'Oreja', 'Arco', 'Vértice'],
    correctAnswer: 'Cola (Tail)',
    explanation: 'La cola de la Q es uno de los elementos de mayor personalidad expresiva de cualquier diseño.',
    hint: 'Como la cola de un animal.'
  },
  {
    id: 'q17',
    glyphLetter: 'h',
    partId: 'hombro-arco',
    questionText: '¿Cómo se llama el trazo curvo que nace del asta vertical y desciende en arco en letras como h, n y m?',
    options: ['Hombro / Arco (Shoulder)', 'Espuela', 'Ápice', 'Swash'],
    correctAnswer: 'Hombro / Arco (Shoulder)',
    explanation: 'El hombro o arco genera el ritmo continuo de ondas característico de las minúsculas.',
    hint: 'Recuerda a un hombro humano.'
  },
  {
    id: 'q18',
    glyphLetter: 'E',
    partId: 'brazo-e',
    questionText: '¿Cómo se llaman los trazos horizontales que se proyectan libremente hacia la derecha en la E y la F?',
    options: ['Brazos', 'Piernas', 'Colas', 'Astas descendentes'],
    correctAnswer: 'Brazos',
    explanation: 'Los brazos son trazos horizontales que terminan libres en el espacio.',
    hint: 'Extremidades superiores del cuerpo.'
  },
  {
    id: 'q19',
    glyphLetter: 'G',
    partId: 'espuela-g',
    questionText: '¿Qué nombre recibe el pequeño saliente vertical puntiagudo en la base de la G?',
    options: ['Espuela (Spur)', 'Lágrima', 'Ápice', 'Cuello'],
    correctAnswer: 'Espuela (Spur)',
    explanation: 'La espuela o spur es un remate puntiagudo que corona el encuentro de trazos en la G.',
    hint: 'Como la espuela que llevan las botas de jinete.'
  },
  {
    id: 'q20',
    glyphLetter: 'S',
    partId: 'espina-s',
    questionText: '¿Cómo se denomina el trazo curvo central y continuo que conforma la columna de la S?',
    options: ['Espina (Spine)', 'Barra', 'Brazo', 'Pierna'],
    correctAnswer: 'Espina (Spine)',
    explanation: 'La espina dorsal de la S es el trazo serpenteante que modula el centro de la letra.',
    hint: 'Alude a la columna vertebral o espina.'
  },
  {
    id: 'q21',
    glyphLetter: 'A',
    partId: 'asta-gruesa-fina',
    questionText: 'En la letra \'A\' clásica, ¿a qué se debe que la diagonal izquierda sea fina y la derecha sea gruesa?',
    options: ['Al trazo natural de la pluma de punta ancha biselada', 'A un error de fundición en Roma', 'A una ley de la Bauhaus', 'A la gravedad física'],
    correctAnswer: 'Al trazo natural de la pluma de punta ancha biselada',
    explanation: 'Al subir la pluma con ángulo fijo se produce un trazo fino; al bajar con todo el ancho se produce el trazo grueso.',
    hint: 'Tiene que ver con la caligrafía y la pluma.'
  },
  {
    id: 'q22',
    glyphLetter: 'I',
    partId: 'cartela-apofige',
    questionText: '¿En qué estilo histórico de tipografía se suprimen completamente las cartelas en favor de un ángulo de 90° puro?',
    options: ['Romántica / Didona (Bodoni)', 'Renacentista / Veneciana', 'Barroca / Garalda', 'Humanista'],
    correctAnswer: 'Romántica / Didona (Bodoni)',
    explanation: 'Bodoni y Didot eliminaron el cartabón, conectando las serifas filiformes en un ángulo recto perfecto.',
    hint: 'Familia a la que pertenece Bodoni.'
  },
  {
    id: 'q23',
    glyphLetter: 'f',
    partId: 'travesano-barra',
    questionText: '¿Cómo se llama la pequeña barra horizontal que atraviesa el asta vertical de la \'f\' o de la \'t\'?',
    options: ['Travesaño / Barra transversal', 'Apófige', 'Vértice', 'Espuela'],
    correctAnswer: 'Travesaño / Barra transversal',
    explanation: 'El travesaño cruza el asta y marca el nivel de la altura de x.',
    hint: 'Trazo horizontal que cruza el signo.'
  },
  {
    id: 'q24',
    glyphLetter: 'V',
    partId: 'vertice-v',
    questionText: '¿Qué nombre recibe el punto inferior de convergencia de diagonales en la \'V\' o en la \'W\'?',
    options: ['Vértice Inferior', 'Ápice Superior', 'Ojal', 'Bucle'],
    correctAnswer: 'Vértice Inferior',
    explanation: 'El vértice es el punto de encuentro inferior, que a menudo sobresale levemente de la línea de base (overshoot).',
    hint: 'Opuesto al ápice superior.'
  },
  {
    id: 'q25',
    glyphLetter: 'O',
    partId: 'eje-modulacion',
    questionText: '¿Qué ángulo aproximado tiene el eje de modulación en las tipografías venecianas renacentistas (Jenson, Bembo)?',
    options: ['Inclinado a ~25° hacia la izquierda', 'Rigurosamente vertical (0°)', 'Horizontal plano (90°)', 'Invertido a -45°'],
    correctAnswer: 'Inclinado a ~25° hacia la izquierda',
    explanation: 'La inclinación a ~25° reproduce fielmente el ángulo natural de la mano del escriba sosteniendo la pluma.',
    hint: 'Refleja la pluma renacentista inclinada hacia la izquierda.'
  },
  {
    id: 'q26',
    glyphLetter: 'g',
    partId: 'loop-bucle-g',
    questionText: '¿Qué dos tipos principales de \'g\' minúscula existen en la historia de la tipografía?',
    options: ['De dos pisos (aldina/romana) y de un solo piso (moderna)', 'De tres pisos y de cuatro pisos', 'Gótica y sans únicamente', 'Monolineal y quebrada'],
    correctAnswer: 'De dos pisos (aldina/romana) y de un solo piso (moderna)',
    explanation: 'La g de dos pisos posee ojo, istmo y loop inferior; la de un solo piso desciende en una simple curvatura abierta.',
    hint: 'Hace referencia al número de niveles de la letra.'
  },
  {
    id: 'q27',
    glyphLetter: 'h',
    partId: 'asta-ascendente',
    questionText: '¿Cuál de las siguientes letras minúsculas contiene un asta ascendente?',
    options: ['La letra b, d, h, k, l', 'La letra p, q, g, y', 'La letra a, c, e, o', 'La letra x, z, v, w'],
    correctAnswer: 'La letra b, d, h, k, l',
    explanation: 'Las letras b, d, h, k, l extienden sus astas por encima de la altura de x.',
    hint: 'Busca las letras que suben hacia arriba.'
  },
  {
    id: 'q28',
    glyphLetter: 'p',
    partId: 'asta-descendente',
    questionText: '¿Por qué las letras con asta descendente (p, q, y) necesitan un espaciado interlineal adecuado?',
    options: ['Para evitar que choquen con las ascendentes del renglón inferior', 'Por motivos de ahorro de tinta', 'Porque eran letras que no existían en latín', 'Para que se vean más oscuras'],
    correctAnswer: 'Para evitar que choquen con las ascendentes del renglón inferior',
    explanation: 'El interlineado (leading) evita el solapamiento entre ascendentes y descendentes contiguas.',
    hint: 'Tiene que ver con la separación entre líneas de texto.'
  },
  {
    id: 'q29',
    glyphLetter: 'I',
    partId: 'baza-espolon',
    questionText: '¿Cómo se le llama a la compensación óptica por la cual las letras redondas (O, C) sobrepasan ligeramente la línea de base y la altura de x?',
    options: ['Overshoot / Desborde óptico', 'Interletraje', 'Kerning', 'Ductus'],
    correctAnswer: 'Overshoot / Desborde óptico',
    explanation: 'Si una curva toca tangencialmente la línea sin sobrepasarla, el ojo la percibe más pequeña que una letra recta vecina.',
    hint: 'Término en inglés que significa sobrepasar.'
  },
  {
    id: 'q30',
    glyphLetter: 'R',
    partId: 'pierna-cola',
    questionText: 'En la letra \'R\', ¿qué detalle anatómico en la terminación de la pierna suele indicar influencia barroca o caligráfica?',
    options: ['Una curvatura suave o floritura (swash)', 'Un corte tajante a 90°', 'Una serifa cuadrada masiva', 'Una supresión de trazo'],
    correctAnswer: 'Una curvatura suave o floritura (swash)',
    explanation: 'En Garamond, Caslon y Baskerville la pata de la R remata en una curva elegante que se apoya en el renglón.',
    hint: 'Alude a una terminación curvada orgánica.'
  }
];

export interface FontMemoryGameItem {
  id: string;
  fontName: string;
  periodName: string;
  sampleLetter: string;
  sampleGlyphDisplay: string;
  fontClass: string;
  distinctiveClue: string;
  options: string[];
}

export const FONT_MEMORY_GAME_POOL: FontMemoryGameItem[] = [
  {
    id: 'm-bodoni',
    fontName: 'Bodoni',
    periodName: 'Romántica / Didona (1798)',
    sampleLetter: 'Q',
    sampleGlyphDisplay: 'Q',
    fontClass: 'font-bodoni',
    distinctiveClue: 'Astas verticales columnares sólidas, contraste vertical pronunciado y serifas rectas filiformes en 90° sin cartabón.',
    options: ['Bodoni', 'Garamond', 'Futura', 'Clarendon']
  },
  {
    id: 'm-futura',
    fontName: 'Futura',
    periodName: 'Modernista y Geométrica (1927)',
    sampleLetter: 'A',
    sampleGlyphDisplay: 'A',
    fontClass: 'font-futura',
    distinctiveClue: 'Pura geometría euclidiana, ápice puntiagudo sin serifa y monolinealidad objetiva de la Bauhaus.',
    options: ['Futura', 'Baskerville', 'Jenson', 'Bodoni']
  },
  {
    id: 'm-clarendon',
    fontName: 'Clarendon',
    periodName: 'Realista / Slab Serif (1845)',
    sampleLetter: 'R',
    sampleGlyphDisplay: 'R',
    fontClass: 'font-clarendon',
    distinctiveClue: 'Serifas cuadrangulares masivas en bloque (Slab) con suave cartabón redondeado de refuerzo industrial.',
    options: ['Clarendon', 'Futura', 'Garamond', 'Didot']
  },
  {
    id: 'm-garamond',
    fontName: 'Garamond',
    periodName: 'Barroca / Clásica (1540)',
    sampleLetter: 'e',
    sampleGlyphDisplay: 'e',
    fontClass: 'font-garamond',
    distinctiveClue: 'Barra horizontal fija en la \'e\', modulación armónica a ~15° y cartabón curvado refinado.',
    options: ['Garamond', 'Bodoni', 'Clarendon', 'Baskerville']
  },
  {
    id: 'm-baskerville',
    fontName: 'Baskerville',
    periodName: 'Neoclásica / Racionalista (1757)',
    sampleLetter: 'g',
    sampleGlyphDisplay: 'g',
    fontClass: 'font-baskerville',
    distinctiveClue: 'Eje casi vertical (~6°), alto contraste luminoso y terminaciones en lágrima redondeada perfecta.',
    options: ['Baskerville', 'Futura', 'Jenson', 'Rockwell']
  },
  {
    id: 'm-jenson',
    fontName: 'Jenson',
    periodName: 'Renacentista / Humanista (1470)',
    sampleLetter: 'e',
    sampleGlyphDisplay: 'e',
    fontClass: 'font-venetian',
    distinctiveClue: 'Barra transversal inclinada en la \'e\', eje oblicuo pronunciado a 25° y huella viva de la pluma ancha.',
    options: ['Jenson', 'Didot', 'Helvetica', 'Futura']
  },
  {
    id: 'm-didot',
    fontName: 'Didot',
    periodName: 'Romántica / Didona (1784)',
    sampleLetter: 'H',
    sampleGlyphDisplay: 'H',
    fontClass: 'font-bodoni',
    distinctiveClue: 'Elegancia aristocrática francesa, serifas horizontales capilares puras sin apófige.',
    options: ['Didot', 'Rockwell', 'Caslon', 'Bembo']
  },
  {
    id: 'm-rockwell',
    fontName: 'Rockwell',
    periodName: 'Mecánica Geométrica (1934)',
    sampleLetter: 'M',
    sampleGlyphDisplay: 'M',
    fontClass: 'font-clarendon',
    distinctiveClue: 'Slab geométrica de ángulos rectos puros donde las serifas tienen el mismo grosor que el asta.',
    options: ['Rockwell', 'Baskerville', 'Garamond', 'Bodoni']
  },
  {
    id: 'm-helvetica',
    fontName: 'Helvetica',
    periodName: 'Modernista Suiza (1957)',
    sampleLetter: 'a',
    sampleGlyphDisplay: 'a',
    fontClass: 'font-sans-modern',
    distinctiveClue: 'Cortes terminales rigurosamente horizontales, dos pisos en la a con apertura contenida.',
    options: ['Helvetica', 'Bodoni', 'Jenson', 'Baskerville']
  },
  {
    id: 'm-caslon',
    fontName: 'Caslon',
    periodName: 'Barroca Inglesa (1725)',
    sampleLetter: 'A',
    sampleGlyphDisplay: 'A',
    fontClass: 'font-garamond',
    distinctiveClue: 'Ápice hueco característico, textura cálida y robustez artesanal británica.',
    options: ['Caslon', 'Futura', 'Clarendon', 'Univers']
  },
  {
    id: 'm-bembo',
    fontName: 'Bembo',
    periodName: 'Renacentista Aldina (1495)',
    sampleLetter: 'R',
    sampleGlyphDisplay: 'R',
    fontClass: 'font-venetian',
    distinctiveClue: 'Pierna de la R con curvatura orgánica hacia adelante, cortada por Francesco Griffo en Venecia.',
    options: ['Bembo', 'Futura', 'Didot', 'Rockwell']
  },
  {
    id: 'm-gill-sans',
    fontName: 'Gill Sans',
    periodName: 'Humanista Sans (1928)',
    sampleLetter: 'g',
    sampleGlyphDisplay: 'g',
    fontClass: 'font-sans-modern',
    distinctiveClue: 'Sin serifa pero con proporciones romanas clásicas y g minúscula de dos pisos auténtica.',
    options: ['Gill Sans', 'Bodoni', 'Baskerville', 'Caslon']
  },
  {
    id: 'm-univers',
    fontName: 'Univers',
    periodName: 'Neogrotesca Sistemática (1957)',
    sampleLetter: 'n',
    sampleGlyphDisplay: 'n',
    fontClass: 'font-sans-modern',
    distinctiveClue: 'Diseñada por Adrian Frutiger con un sistema matricial de 21 pesos y anchos codificados numéricamente.',
    options: ['Univers', 'Jenson', 'Clarendon', 'Didot']
  },
  {
    id: 'm-playfair',
    fontName: 'Playfair Display',
    periodName: 'Didona Contemporánea (2011)',
    sampleLetter: 'k',
    sampleGlyphDisplay: 'k',
    fontClass: 'font-bodoni',
    distinctiveClue: 'Gran contraste en pantalla digital, terminales redondeados y altísima presencia en cabeceras editoriales.',
    options: ['Playfair Display', 'Futura', 'Helvetica', 'Caslon']
  },
  {
    id: 'm-bodoni-moda',
    fontName: 'Bodoni Moda',
    periodName: 'Romántica / Didona (1798)',
    sampleLetter: 'Q',
    sampleGlyphDisplay: 'Q',
    fontClass: 'font-bodoni',
    distinctiveClue: 'Eje vertical a 90° exactos, contraste extremo (18:1), serifas horizontales rectas unbracketed y cola sinuosa.',
    options: ['Bodoni Moda', 'Rockwell', 'Futura', 'Garamond']
  },
  {
    id: 'm-futura-jost',
    fontName: 'Futura',
    periodName: 'Modernista Geométrica (1927)',
    sampleLetter: 'O',
    sampleGlyphDisplay: 'O',
    fontClass: 'font-futura',
    distinctiveClue: 'Construcción basada en compás: la O es un círculo geométrico perfecto sin modulación aparente.',
    options: ['Futura', 'Bodoni', 'Baskerville', 'Jenson']
  },
  {
    id: 'm-clarendon-besley',
    fontName: 'Clarendon',
    periodName: 'Mecánica / Slab Serif (1845)',
    sampleLetter: 'R',
    sampleGlyphDisplay: 'R',
    fontClass: 'font-clarendon',
    distinctiveClue: 'Serifas cuadrangulares pesadas en bloque (Slab) reforzadas con cartabón curvo para resistir prensas de vapor.',
    options: ['Clarendon', 'Didot', 'Helvetica', 'Caslon']
  },
  {
    id: 'm-garamond-eb',
    fontName: 'EB Garamond',
    periodName: 'Barroca / Garalda (1540)',
    sampleLetter: 'e',
    sampleGlyphDisplay: 'e',
    fontClass: 'font-garamond',
    distinctiveClue: 'Barra horizontal fija en la e, eje oblicuo moderado a 15° y cartelas cóncavas orgánicas.',
    options: ['EB Garamond', 'Futura', 'Rockwell', 'Bodoni']
  },
  {
    id: 'm-centaur-rogers',
    fontName: 'Centaur',
    periodName: 'Revival Renacentista (1914)',
    sampleLetter: 'A',
    sampleGlyphDisplay: 'A',
    fontClass: 'font-venetian',
    distinctiveClue: 'Diseñada por Bruce Rogers con ascendentes esbeltas que sobrepasan la altura de mayúsculas.',
    options: ['Centaur', 'Helvetica', 'Univers', 'Clarendon']
  },
  {
    id: 'm-mrs-eaves',
    fontName: 'Mrs Eaves',
    periodName: 'Revival Racionalista (1996)',
    sampleLetter: '&',
    sampleGlyphDisplay: '&',
    fontClass: 'font-baskerville',
    distinctiveClue: 'Zuzana Licko recreó a Baskerville reduciendo la altura de x e introduciendo espectaculares ligaduras.',
    options: ['Mrs Eaves', 'Rockwell', 'Jenson', 'Futura']
  },
  {
    id: 'm-akzidenz-grotesk',
    fontName: 'Akzidenz-Grotesk',
    periodName: 'Realista Grotesca (1898)',
    sampleLetter: 'G',
    sampleGlyphDisplay: 'G',
    fontClass: 'font-sans-modern',
    distinctiveClue: 'La madre de las grotescas modernas comerciales de la fundición Berthold de Berlín.',
    options: ['Akzidenz-Grotesk', 'Didot', 'Baskerville', 'Garamond']
  },
  {
    id: 'm-franklin-gothic',
    fontName: 'Franklin Gothic',
    periodName: 'Grotesca Americana (1902)',
    sampleLetter: 'a',
    sampleGlyphDisplay: 'a',
    fontClass: 'font-sans-modern',
    distinctiveClue: 'Morris Fuller Benton concibió esta grotesca pesada para titulares de rotativas de alta velocidad.',
    options: ['Franklin Gothic', 'Bodoni', 'Jenson', 'Caslon']
  },
  {
    id: 'm-sabon-tschichold',
    fontName: 'Sabon',
    periodName: 'Garalda Funcional (1967)',
    sampleLetter: 'S',
    sampleGlyphDisplay: 'S',
    fontClass: 'font-garamond',
    distinctiveClue: 'Jan Tschichold diseñó esta obra maestra con idéntica métrica para monotipia, linotipia y composición manual.',
    options: ['Sabon', 'Futura', 'Rockwell', 'Didot']
  },
  {
    id: 'm-plus-jakarta',
    fontName: 'Plus Jakarta Sans',
    periodName: 'Digital de Interfaz (2020)',
    sampleLetter: 'g',
    sampleGlyphDisplay: 'g',
    fontClass: 'font-sans-modern',
    distinctiveClue: 'Gran apertura de contraformas y proporciones geométricas optimizadas para pantallas Retina móviles.',
    options: ['Plus Jakarta Sans', 'Baskerville', 'Bodoni', 'Centaur']
  }
];

export interface PeriodGameItem {
  id: string;
  conceptText: string;
  correctPeriod: string;
  options: string[];
  explanation: string;
}

export const PERIOD_GAME_POOL: PeriodGameItem[] = [
  {
    id: 'p1',
    conceptText: 'Claude Garamond fija la barra de la \'e\' de forma horizontal y modera el eje a 15°. La cursiva itálica se incorpora a la familia.',
    correctPeriod: 'Barroco / Clásico (1540–1700)',
    options: ['Barroco / Clásico (1540–1700)', 'Romántico / Didona (1780–1830)', 'Modernista / Geométrico (1910–1960)', 'Realista (1815–1900)'],
    explanation: 'El período barroco o clásico consolidó la anatomía de las Garaldas y la familia tipográfica con itálicas.'
  },
  {
    id: 'p2',
    conceptText: 'Se suprimen totalmente las serifas. Paul Renner diseña sobre el círculo y triángulo en la Bauhaus. Triunfa la retícula objetiva.',
    correctPeriod: 'Modernista / Geométrico (1910–1960)',
    options: ['Modernista / Geométrico (1910–1960)', 'Renacentista (1470–1540)', 'Neoclásico (1690–1780)', 'Barroco (1540–1700)'],
    explanation: 'Las vanguardias modernas del siglo XX eliminaron la serifa en favor del funcionalismo monolineal.'
  },
  {
    id: 'p3',
    conceptText: 'Eje rigurosamente vertical a 90°. Astas columnares y contraste vertical con serifas filiformes rectas sin cartabón. Bodoni y Didot.',
    correctPeriod: 'Romántico / Didona (1780–1830)',
    options: ['Romántico / Didona (1780–1830)', 'Neoclásico (1690–1780)', 'Realista / Slab (1815–1900)', 'Renacentista (1470–1540)'],
    explanation: 'Las Didonas representaron el cenit del corte en acero con ángulo recto puro de 90°.'
  },
  {
    id: 'p4',
    conceptText: 'Nacimiento de las Slab Serifs (Egipcias) con remates cuadrangulares en bloque para carteles callejeros y publicidad de ferrocarriles.',
    correctPeriod: 'Realista y Mecánica (1815–1900)',
    options: ['Realista y Mecánica (1815–1900)', 'Modernista (1910–1960)', 'Renacentista (1470–1540)', 'Digital (1970–Hoy)'],
    explanation: 'La Revolución Industrial creó las letras mecánicas pesadas para resistir y llamar la atención en la vía pública.'
  },
  {
    id: 'p5',
    conceptText: 'Nicolas Jenson crea el primer tipo romano maduro en Venecia. Barra inclinada en la \'e\' y eje oblicuo pronunciado de pluma ancha a 25°.',
    correctPeriod: 'Renacentista / Humanista (1470–1540)',
    options: ['Renacentista / Humanista (1470–1540)', 'Barroco (1540–1700)', 'Neoclásico (1690–1780)', 'Romántico (1780–1830)'],
    explanation: 'El primer gran tipo romano de Jenson en 1470 definió el Renacimiento humanista.'
  },
  {
    id: 'p6',
    conceptText: 'John Baskerville alisa el papel con rodillos de metal calientes e introduce tintas negras de carbón profundo, logrando contrastes luminosos.',
    correctPeriod: 'Neoclásico / Transición (1690–1780)',
    options: ['Neoclásico / Transición (1690–1780)', 'Renacentista (1470–1540)', 'Modernista (1910–1960)', 'Realista (1815–1900)'],
    explanation: 'Baskerville encabezó la etapa de transición racionalista previa a las Didonas.'
  },
  {
    id: 'p7',
    conceptText: 'Nacen las fuentes variables OpenType con ejes continuos en tiempo real que mutan según el sensor de pantalla del teléfono.',
    correctPeriod: 'Posmoderno / Digital (1970–Presente)',
    options: ['Posmoderno / Digital (1970–Presente)', 'Realista (1815–1900)', 'Barroco (1540–1700)', 'Neoclásico (1690–1780)'],
    explanation: 'La era contemporánea liberó a la letra del plomo hacia la pantalla líquida interactiva.'
  },
  {
    id: 'p8',
    conceptText: 'La fundición Deberny & Peignot y Adrian Frutiger lanzan Univers; Max Miedinger y Eduard Hoffmann lanzan Helvetica en Suiza.',
    correctPeriod: 'Modernista / Geométrico (1910–1960)',
    options: ['Modernista / Geométrico (1910–1960)', 'Barroco (1540–1700)', 'Romántico (1780–1830)', 'Renacentista (1470–1540)'],
    explanation: 'El auge del Estilo Tipográfico Internacional suizo en 1957.'
  },
  {
    id: 'p9',
    conceptText: 'Aldo Manuzio y Francesco Griffo imprimen el De Aetna en Venecia (1495) y patentan la primera cursiva itálica de bolsillo.',
    correctPeriod: 'Renacentista / Humanista (1470–1540)',
    options: ['Renacentista / Humanista (1470–1540)', 'Realista (1815–1900)', 'Neoclásico (1690–1780)', 'Posmoderno (1970–Presente)'],
    explanation: 'El taller aldino de Venecia consolidó la tipografía del Renacimiento.'
  },
  {
    id: 'p10',
    conceptText: 'William Caslon funda la primera gran fundición inglesa independiente. Tipos robustos, legibles y de cartabones cálidos usados en la Declaración de Independencia de EE.UU.',
    correctPeriod: 'Barroco / Clásico (1540–1700)',
    options: ['Barroco / Clásico (1540–1700)', 'Modernista (1910–1960)', 'Romántico (1780–1830)', 'Renacentista (1470–1540)'],
    explanation: 'Caslon representó la cumbre del diseño barroco inglés.'
  },
  {
    id: 'p11',
    conceptText: 'La Romain du Roi encargada por Luis XIV en 1692 se dibuja sobre una cuadrícula matemática de 2.304 cuadrados, rompiendo con el ductus manual.',
    correctPeriod: 'Neoclásico / Transición (1690–1780)',
    options: ['Neoclásico / Transición (1690–1780)', 'Renacentista (1470–1540)', 'Modernista (1910–1960)', 'Romántico (1780–1830)'],
    explanation: 'La Academia de Ciencias francesa racionalizó la forma de la letra mediante geometría cartesiana.'
  },
  {
    id: 'p12',
    conceptText: 'El impresor Robert Besley patenta Clarendon en Londres (1845) como primera tipografía expresamente pensada para resaltar palabras en negrita.',
    correctPeriod: 'Realista y Mecánica (1815–1900)',
    options: ['Realista y Mecánica (1815–1900)', 'Barroco (1540–1700)', 'Posmoderno (1970–Presente)', 'Neoclásico (1690–1780)'],
    explanation: 'Clarendon inauguró la patente tipográfica y el concepto de peso "Bold" complementario.'
  },
  {
    id: 'p13',
    conceptText: 'Hermann Zapf concibe Palatino y Optima inspirándose en las inscripciones romanas pero adaptándolas al fotograbado del siglo XX.',
    correctPeriod: 'Modernista / Geométrico (1910–1960)',
    options: ['Modernista / Geométrico (1910–1960)', 'Renacentista (1470–1540)', 'Romántico (1780–1830)', 'Realista (1815–1900)'],
    explanation: 'Hermann Zapf revitalizó la caligrafía clásica dentro de la tecnología de fotocomposición.'
  },
  {
    id: 'p14',
    conceptText: 'Zuzana Licko y Rudy VanderLans fundan la revista Emigre en California, desafiando las reglas tradicionales con tipografía digital en mapa de bits.',
    correctPeriod: 'Posmoderno / Digital (1970–Presente)',
    options: ['Posmoderno / Digital (1970–Presente)', 'Neoclásico (1690–1780)', 'Barroco (1540–1700)', 'Renacentista (1470–1540)'],
    explanation: 'La era digital desconstructivista de los 80 y 90 abrió la experimentación con píxeles.'
  },
  {
    id: 'p15',
    conceptText: 'Pierre-Simon Fournier estandariza el sistema de puntos tipográficos en París en 1742, permitiendo medir los tipos con rigor científico.',
    correctPeriod: 'Neoclásico / Transición (1690–1780)',
    options: ['Neoclásico / Transición (1690–1780)', 'Realista (1815–1900)', 'Romántico (1780–1830)', 'Renacentista (1470–1540)'],
    explanation: 'Fournier creó el primer sistema métrico de puntos tipográficos racionales.'
  }
];

// Helper to pick randomly from any pool
export function getRandomSlice<T>(array: T[], count = 5): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
}
