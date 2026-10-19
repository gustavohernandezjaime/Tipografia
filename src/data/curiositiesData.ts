export interface TypographicCuriosity {
  id: string;
  title: string;
  fact: string;
  category: 'Historia' | 'Anatomía' | 'Tecnología' | 'Curiosidad';
  historicalPeriod: string;
}

export const TYPOGRAPHIC_CURIOSITIES: TypographicCuriosity[] = [
  {
    id: 'c1',
    title: 'El Eje no Gira la Letra',
    fact: 'El eje de modulación (axis of stress) no es la inclinación física de la letra sobre el renglón, sino el ángulo imaginario que une los puntos de adelgazamiento en las curvas, derivado de cómo la pluma de punta ancha depositaba la tinta.',
    category: 'Anatomía',
    historicalPeriod: 'Renacimiento & Didona'
  },
  {
    id: 'c2',
    title: 'La Barra Oblicua de Nicolas Jenson',
    fact: 'En la primera tipografía romana veneciana (1470) de Nicolas Jenson, la barra horizontal de la minúscula "e" está inclinada a 25°. Fue Claude Garamond en 1540 quien la fijó rigurosamente horizontal.',
    category: 'Historia',
    historicalPeriod: 'Veneciana (1470)'
  },
  {
    id: 'c3',
    title: 'El Papel Caliente de John Baskerville',
    fact: 'John Baskerville no solo diseñó tipos: inventó una tinta negra profunda con hollín y hacía pasar las hojas recién impresas entre cilindros de bronce caliente para alisar la textura del papel y lograr serifas ultrafinas.',
    category: 'Tecnología',
    historicalPeriod: 'Neoclásica / Transición (1757)'
  },
  {
    id: 'c4',
    title: 'El Origen del Ampersand (&)',
    fact: 'El signo \'&\' es la ligadura caligráfica romana de las letras \'e\' y \'t\' (latín "et" = "y"). Con el correr de los siglos, el trazo cursivo fusionó la E mayúscula con la t minúscula en un solo carácter continuo.',
    category: 'Curiosidad',
    historicalPeriod: 'Roma Clásica'
  },
  {
    id: 'c5',
    title: 'Futura y el Viaje a la Luna',
    fact: 'Paul Renner concibió Futura basándose en círculos, triángulos y rectángulos. Cuando el Apolo 11 alunizó en 1969, la placa de acero conmemorativa dejada por Neil Armstrong estaba grabada íntegramente en Futura.',
    category: 'Historia',
    historicalPeriod: 'Modernista (1927)'
  },
  {
    id: 'c6',
    title: 'El Dazzle de Giambattista Bodoni',
    fact: 'El contraste extremo de Bodoni (hasta 25:1) causaba que en textos de cuerpo pequeño los trazos finos desaparecieran y los gruesos deslumbraran, un efecto óptico conocido en inglés como "dazzle" o fatiga visual.',
    category: 'Anatomía',
    historicalPeriod: 'Romántica / Didona (1798)'
  },
  {
    id: 'c7',
    title: 'La Primera Patente Comercial: Clarendon',
    fact: 'Diseñada por Benjamin Fox para Robert Besley en Londres (1845), Clarendon fue la primera tipografía de la historia en registrar una patente comercial en Gran Bretaña bajo el Design Act de 1842.',
    category: 'Historia',
    historicalPeriod: 'Mecánica / Slab Serif (1845)'
  },
  {
    id: 'c8',
    title: 'Gutenberg y las 290 Variantes',
    fact: 'Para que su Biblia de 42 líneas pareciera un manuscrito trazado a mano por un monje copista, Johannes Gutenberg no fundió 26 letras, sino 290 matrices distintas con ligaduras, abreviaturas y variantes de ancho.',
    category: 'Tecnología',
    historicalPeriod: 'Incunables (1455)'
  },
  {
    id: 'c9',
    title: 'Los Cortes Horizontales de Helvetica',
    fact: 'Lo que distingue a Helvetica de las demás sans-serif es que los terminales de curvas abiertas (como la c, e, s) terminan en cortes rigurosamente horizontales, dotando a la línea de una estabilidad neutral inconfundible.',
    category: 'Anatomía',
    historicalPeriod: 'Suiza Internacional (1957)'
  },
  {
    id: 'c10',
    title: 'El Punto en Rombo de Edward Johnston',
    fact: 'Edward Johnston diseñó en 1916 la tipografía del Metro de Londres con un punto de la \'i\' y de la \'j\' en forma de rombo de 45°, imitando exactamente la huella cuadrada de una pluma caligráfica inclinada.',
    category: 'Curiosidad',
    historicalPeriod: 'Modernismo Británico'
  },
  {
    id: 'c11',
    title: 'La Proporción del Contrapunzón',
    fact: 'En tipografía, el ojo o contrapunzón (espacio en blanco interior de una letra como la \'e\' o la \'o\') es más importante para la legibilidad a distancia que el grosor de la tinta negra exterior.',
    category: 'Anatomía',
    historicalPeriod: 'Morfología General'
  },
  {
    id: 'c12',
    title: '¿Por qué la Mayúscula es más Alta?',
    fact: 'En las romanas del Renacimiento (como Bembo o Jenson), las ascendentes de las minúsculas (b, d, h, l) eran notablemente MÁS ALTAS que las letras mayúsculas, para dar fluidez y no trabar la vista.',
    category: 'Historia',
    historicalPeriod: 'Veneciana (1495)'
  }
];

export interface FeaturedDailyFont {
  name: string;
  designer: string;
  year: string;
  period: string;
  tagline: string;
  samplePhrase: string;
  fontClass: string;
  distinction: string;
  categoryTargetId: string;
}

export const FEATURED_FONTS_POOL: FeaturedDailyFont[] = [
  {
    name: 'EB Garamond',
    designer: 'Claude Garamond (París)',
    year: '1540',
    period: 'Barroca / Clásica',
    tagline: 'El estándar eterno de la literatura y el libro impreso.',
    samplePhrase: 'Quousque tandem abutere, Catilina, patientia nostra?',
    fontClass: 'font-garamond',
    distinction: 'Barra de la e horizontal, eje a 15° y cartelas suaves esculpidas en punzón de acero.',
    categoryTargetId: 'baroque'
  },
  {
    name: 'Bodoni Moda',
    designer: 'Giambattista Bodoni (Parma)',
    year: '1798',
    period: 'Romántica / Didona',
    tagline: 'El drama del contraste absoluto y la geometría pura.',
    samplePhrase: 'Quattro sono i lumi della tipografia: regolarità, nettezza, buon gusto.',
    fontClass: 'font-bodoni',
    distinction: 'Eje vertical a 90° exactos, contraste de 18:1 y serifas filiformes sin cartela.',
    categoryTargetId: 'romantic-didone'
  },
  {
    name: 'Libre Baskerville',
    designer: 'John Baskerville (Birmingham)',
    year: '1757',
    period: 'Neoclásica / Racionalista',
    tagline: 'La elegancia ilustrada sobre papel satinado en caliente.',
    samplePhrase: 'The quick brown fox jumps over the lazy dog.',
    fontClass: 'font-baskerville',
    distinction: 'Eje casi vertical a 6°, terminales redondos en lágrima y gran luminosidad.',
    categoryTargetId: 'neoclassical'
  },
  {
    name: 'Clarendon (Besley)',
    designer: 'Benjamin Fox & Robert Besley',
    year: '1845',
    period: 'Mecánica / Slab Serif',
    tagline: 'La potencia del hierro fundido de la Revolución Industrial.',
    samplePhrase: 'THE INDUSTRIAL ENGINE OF MODERN MANUFACTURE',
    fontClass: 'font-clarendon',
    distinction: 'Serifas pesadas en bloque cuadrado (Slab) con cartabón de refuerzo.',
    categoryTargetId: 'realist-mechanic'
  },
  {
    name: 'Futura (Jost)',
    designer: 'Paul Renner (Fráncfort)',
    year: '1927',
    period: 'Modernista / Geométrica',
    tagline: 'La vanguardia de la forma pura: círculo, triángulo y función.',
    samplePhrase: 'DIE FORM FOLGT DER FUNKTION · BAUHAUS MODERN',
    fontClass: 'font-futura',
    distinction: 'Supresión total de serifas, monolinealidad aparente y círculo perfecto en la O.',
    categoryTargetId: 'modernist-geometric'
  },
  {
    name: 'Nicolas Jenson (Eusebius)',
    designer: 'Nicolas Jenson (Venecia)',
    year: '1470',
    period: 'Renacentista / Humanista',
    tagline: 'El nacimiento de la romana clásica con ductus de pluma ancha.',
    samplePhrase: 'In civitate Venetiarum per Nicolaum Jenson Gallicum.',
    fontClass: 'font-garamond',
    distinction: 'Eje fuertemente oblicuo a 25° y barra inclinada en la e.',
    categoryTargetId: 'renaissance-humanist'
  }
];

export function getRandomCuriosity(): TypographicCuriosity {
  const idx = Math.floor(Math.random() * TYPOGRAPHIC_CURIOSITIES.length);
  return TYPOGRAPHIC_CURIOSITIES[idx];
}

export function getRandomFeaturedFont(): FeaturedDailyFont {
  const idx = Math.floor(Math.random() * FEATURED_FONTS_POOL.length);
  return FEATURED_FONTS_POOL[idx];
}
