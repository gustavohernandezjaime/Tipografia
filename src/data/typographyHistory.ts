export interface TypographicEra {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  period: string;
  approxYears: string;
  category: 'ancestral' | 'classical' | 'medieval' | 'renaissance' | 'neoclassical' | 'modern' | 'industrial' | 'twentieth' | 'digital';
  
  // Anatomical metrics
  axisAngle: number; // degrees deviation from vertical (0 = strictly vertical, >0 = inclined leftward / handwritten)
  axisDescription: string;
  
  contrastRatio: number; // Thick to thin ratio (e.g. 1.1 for sans, 2.5 for garalde, 18 for didone)
  contrastLevel: 'Nulo' | 'Muy bajo' | 'Bajo' | 'Medio' | 'Alto' | 'Extremo';
  contrastDescription: string;
  
  ductus: string;
  ductusType: 'Incisión' | 'Pincel plano' | 'Pluma ancha' | 'Pluma quebrada' | 'Buril / Punzón' | 'Geometría analítica' | 'Monolineal mecánico' | 'Interpolación paramétrica';
  
  serifType: 'Inexistente' | 'Triangular cóncava' | 'Triangular con cartabón' | 'Afilada con suave cartabón' | 'Filiforme recta sin cartabón' | 'Cuadrada / Bloque (Slab)' | 'Suprimida (Sans-Serif)' | 'Variable digital';
  serifDescription: string;
  hasBracket: boolean; // Si tiene apófige / cartabón de unión
  
  xHeightRatio: number; // % of cap height (e.g. 0.60 to 0.75)
  xHeightDescription: string;
  
  // Historical context
  pioneers: string[];
  historicalMilestone: string;
  technicalSupport: string; // Pergamino, papiro, plomo fundido, fotocomposición, etc.
  description: string;
  anatomicalBreakdown: {
    feature: string;
    description: string;
  }[];
  
  representativeTypefaces: string[];
  keyGlyphsToInspect: string[];
  imagePath?: string;
  imageCaption?: string;
  
  // Specimen pangram or quote
  sampleQuote: string;
  sampleQuoteAuthor: string;
  fontFamilyClass: string;
}

export const TYPOGRAPHIC_ERAS: TypographicEra[] = [
  {
    id: 'proto-writing',
    number: '01',
    name: 'Protoescritura y Pictogramas',
    subtitle: 'La génesis de la fijación gráfica del pensamiento',
    period: 'Prehistoria y Antigüedad Temprana',
    approxYears: '~35.000 a.C. – 3.000 a.C.',
    category: 'ancestral',
    axisAngle: 0,
    axisDescription: 'Inexistente o errático. La disposición espacial respondía al soporte natural (pared de cueva o tablilla de arcilla húmeda) sin noción de línea de base tipográfica.',
    contrastRatio: 1.0,
    contrastLevel: 'Nulo',
    contrastDescription: 'El trazo es homogéneo, condicionado por la presión del estilete de caña o pigmento sobre roca.',
    ductus: 'Incisiones cuneiformes angulares sobre arcilla y trazos con pigmentos minerales soplados o frotados.',
    ductusType: 'Incisión',
    serifType: 'Inexistente',
    serifDescription: 'Sin remates terminales formales. Cada símbolo es una unidad gráfica aislada o un ideograma.',
    hasBracket: false,
    xHeightRatio: 0.50,
    xHeightDescription: 'No existía estandarización vertical ni proporción de caja baja.',
    pioneers: ['Escribas sumerios de Uruk', 'Talladores del Nilo', 'Artistas magdalenienses'],
    historicalMilestone: 'Invención de la escritura cuneiforme y jeroglífica: el paso de la mnemotecnia visual a la sistematización contable y mítica.',
    technicalSupport: 'Tablillas de arcilla secada al sol, roca caliza y papiro primitivo.',
    description: 'Antes del nacimiento del alfabeto, el ser humano comunicaba conceptos mediante pictogramas e ideogramas. En Mesopotamia, la presión oblicua de una caña biselada sobre arcilla dio origen a la escritura cuneiforme ("en forma de cuña"), mientras en Egipto los jeroglíficos combinaban representación figurativa y valores fonéticos.',
    anatomicalBreakdown: [
      {
        feature: 'Ausencia de eje de modulación',
        description: 'Las figuras se orientan en frisos narrativos, sin modulación de ángulo caligráfico continuo.'
      },
      {
        feature: 'Impronta mecánica de la cuña',
        description: 'La forma triangular terminal del cuneiforme surge del ángulo de ataque físico de la caña sobre la arcilla blanda.'
      },
      {
        feature: 'Independencia de las formas',
        description: 'Cada pictograma opera como un concepto autónomo antes de que el principio acrofónico diera paso a los fonemas abstractos.'
      }
    ],
    representativeTypefaces: ['Incisiones Cuneiformes', 'Jeroglíficos Dinásticos', 'Proto-elamita'],
    keyGlyphsToInspect: ['𓀀', '𓋹', '𒀭', '𒁹'],
    sampleQuote: 'En el principio, la mano grabó sobre la roca la memoria de lo efímero.',
    sampleQuoteAuthor: 'Tradición Mesopotámica',
    fontFamilyClass: 'font-mono'
  },
  {
    id: 'phoenician-alphabet',
    number: '02',
    name: 'El Alfabeto Fonético y Protosinaítico',
    subtitle: 'La revolución del principio acrofónico y el sonido abstracto',
    period: 'Mediterráneo Oriental',
    approxYears: '~1800 a.C. – 800 a.C.',
    category: 'ancestral',
    axisAngle: 12,
    axisDescription: 'Inclinación direccional continua de derecha a izquierda (sinistrorso), derivada de la escritura rápida con caña.',
    contrastRatio: 1.1,
    contrastLevel: 'Muy bajo',
    contrastDescription: 'Trazo lineal continuo con ligeras variaciones causadas por el agotamiento de la tinta en el cálamo.',
    ductus: 'Cálamo sobre papiro y cincel sobre estelas de basalto. Ductus esquemático y angular.',
    ductusType: 'Pincel plano',
    serifType: 'Inexistente',
    serifDescription: 'Trazos directos sin remates estilizados; líneas funcionales para acelerar la inscripción de transacciones comerciales marítimas.',
    hasBracket: false,
    xHeightRatio: 0.55,
    xHeightDescription: 'Alfabeto consonántico (abjad) con alturas que fluctuaban libremente según la letra.',
    pioneers: ['Mercaderes y escribas de Biblos, Tiro y Sidón', 'Mineros de Serabit el-Jadim'],
    historicalMilestone: 'Creación de un repertorio cerrado de 22 signos fonéticos: por primera vez un signo no representa un buey, sino únicamente el sonido consonántico inicial /b/.',
    technicalSupport: 'Papiro fenicio, fragmentos de cerámica (ostraka) y estelas de piedra arenisca.',
    description: 'Hacia el segundo milenio antes de Cristo, pueblos cananeos y mercaderes fenicios simplificaron radicalmente la escritura: redujeron cientos de jeroglíficos a apenas 22 caracteres consonánticos basados en el principio acrofónico. Su expansión naval sembró este sistema en Grecia, Roma y el mundo occidental.',
    anatomicalBreakdown: [
      {
        feature: 'Abstracción progresiva',
        description: 'El ideograma de la cabeza de buey (Aleph) rota 90 grados y se estiliza hasta anticipar la forma de la futura \'A\' latina.'
      },
      {
        feature: 'Trazo angular y fluido',
        description: 'Líneas directas y diagonales que facilitaban el grabado veloz en piedra y arcilla para el comercio marítimo.'
      },
      {
        feature: 'Ausencia de vocales',
        description: 'Estructura rígida de consonantes; el lector reconstruía mentalmente la sonoridad del contexto.'
      }
    ],
    representativeTypefaces: ['Protosinaítico', 'Alfabeto Fenicio de Biblos', 'Arameo Antiguo'],
    keyGlyphsToInspect: ['𐤀', '𐤁', '𐤂', '𐤃'],
    sampleQuote: 'El mercader fenicio sustituyó el peso de los jeroglíficos por la ligereza del sonido.',
    sampleQuoteAuthor: 'Crónica Mediterránea',
    fontFamilyClass: 'font-mono'
  },
  {
    id: 'trajan-monumentalis',
    number: '03',
    name: 'Capitalis Monumentalis (Mayúsculas Romanas)',
    subtitle: 'El canon imperecedero del Imperio y el nacimiento de la serifa',
    period: 'Roma Imperial Clásica',
    approxYears: 's. I a.C. – s. II d.C.',
    category: 'classical',
    axisAngle: 18,
    axisDescription: 'Eje de modulación oblicuo sutil (~18°-20°) en las formas curvas como la O, C y Q, derivado del ángulo natural con el que el artesano sostenía el pincel plano antes de tallar la piedra.',
    contrastRatio: 2.8,
    contrastLevel: 'Medio',
    contrastDescription: 'Contraste armonioso y majestuoso entre los trazos gruesos (hinchazón) y finos, producido por el ancho del pincel de cerdas planas.',
    ductus: 'Pintado previo con pincel plano ancho sostenido a unos 30°, seguido de incisión a cincel con sección transversal en V.',
    ductusType: 'Pincel plano',
    serifType: 'Triangular cóncava',
    serifDescription: 'Serifas triangulares y orgánicas que se expanden hacia los extremos con un cartabón (apófige) cóncavo y curvado que resuelve el remate de la incisión del cincel.',
    hasBracket: true,
    xHeightRatio: 0.60,
    xHeightDescription: 'Solo existían mayúsculas monumentales. Las proporciones derivaban de la geometría áurea y figuras puras (cuadrado, círculo, triángulo equilátero).',
    pioneers: ['Edward Catich (investigador del ductus del pincel)', 'Lepidarios de Trajano', 'Apolodoro de Damasco'],
    historicalMilestone: 'La inscripción de la Columna de Trajano (113 d.C.) en Roma: considerada el punto culminante de la elegancia epigráfica universal y modelo supremo de la mayúscula moderna.',
    technicalSupport: 'Mármol de Carrara y pórfido, tallado mediante cincel de acero templado tras un trazado a pincel con minio rojo.',
    description: 'En el año 113 d.C., el emperador Trajano consagró su columna en Roma. Las letras allí grabadas representan la cúspide de la tipografía clásica. El padre Edward Catich demostró magistralmente que la serifa no fue un invento estético ni un tope de cincel, sino la huella indeleble dejada por el giro terminal del pincel ancho con el que el rotulista dibujaba la letra antes de ser picada en la roca.',
    anatomicalBreakdown: [
      {
        feature: 'La génesis de la serifa',
        description: 'El remate cóncavo con cartabón surge del movimiento del pincel al levantar la punta, dotando al extremo del asta de una base visual sólida.'
      },
      {
        feature: 'Proporciones arquitectónicas',
        description: 'La \'O\' y la \'D\' ocupan un cuadrado completo; la \'E\', \'L\' y \'F\' son estrechas; la \'M\' y la \'W\' son anchas y expansivas.'
      },
      {
        feature: 'Sección en V de la incisión',
        description: 'El corte de cincel a 45° genera sombras naturales profundas bajo la luz solar, maximizando la legibilidad a decenas de metros.'
      }
    ],
    representativeTypefaces: ['Capitalis Monumentalis', 'Cinzel Trajan', 'Adobe Trajan', 'Mantinia'],
    keyGlyphsToInspect: ['O', 'A', 'M', 'R', 'S'],
    imagePath: '/src/assets/images/trajan_inscription_1791469692703.jpg',
    imageCaption: 'Inscripción de la Columna de Trajano (113 d.C., Roma). Mármol de Carrara con serifas de cartabón cóncavo y modulación a pincel.',
    sampleQuote: 'SENATVS POPVLVSQVE ROMANVS IMP CAESARI DIVI NERVAE TRAIANO',
    sampleQuoteAuthor: 'Columna Trajana, Roma (113 d.C.)',
    fontFamilyClass: 'font-trajan'
  },
  {
    id: 'carolingian-uncial',
    number: '04',
    name: 'Uncial y Minúscula Carolina',
    subtitle: 'El surgimiento de la caja baja y la claridad monástica',
    period: 'Alta Edad Media y Renacimiento Carolingio',
    approxYears: 's. IV – XII d.C.',
    category: 'medieval',
    axisAngle: 35,
    axisDescription: 'Eje de modulación oblicuo pronunciado (~35° a 45°), testimonio directo de la posición inclinada de la pluma de ave en la mano del copista monástico.',
    contrastRatio: 3.0,
    contrastLevel: 'Medio',
    contrastDescription: 'Contraste caligráfico vivo entre las astas descendentes y los trazos ascendentes finos.',
    ductus: 'Pluma de ave de punta ancha cortada recta o con bisel suave sobre pergamino de vitela.',
    ductusType: 'Pluma ancha',
    serifType: 'Triangular cóncava',
    serifDescription: 'Remates triangulares caligráficos en cabeza de astas, formados por el ataque inicial de la pluma al posarse sobre el pergamino.',
    hasBracket: true,
    xHeightRatio: 0.62,
    xHeightDescription: 'Se consolida el sistema de cuatro líneas guía: línea de base, altura de x, línea de ascendentes (b, d, h) y de descendentes (p, q, g).',
    pioneers: ['Alcuino de York (abad de San Martín de Tours)', 'Carlomagno', 'Monjes de Corbie'],
    historicalMilestone: 'La reforma de Carlomagno (Admonitio Generalis, 789 d.C.): unificación de la escritura europea bajo un estándar legible frente a la selva de escrituras bárbaras nacionales.',
    technicalSupport: 'Pergamino de piel de oveja o ternera (vitela), tinta ferrogálica y pluma de ganso.',
    description: 'Durante la Alta Edad Media, las variantes regionales (visigótica, merovingia, insular) hacían casi imposible la lectura entre reinos. Carlomagno encomendó a Alcuino de York la creación de una letra clara, hermosa y económica en espacio: la minúscula carolina. Con ella nacieron las minúsculas modernas, la puntuación sistemática y el espaciado entre palabras.',
    anatomicalBreakdown: [
      {
        feature: 'Eje fuertemente inclinado',
        description: 'La modulación en la \'o\' y \'e\' muestra un ángulo de 35° a 45°, correspondiente al ángulo natural de escritura manual.'
      },
      {
        feature: 'Aparición de ascendentes y descendentes',
        description: 'La altura de x se independiza de las astas largas, permitiendo un reconocimiento visual de la silueta de las palabras (bouma).'
      },
      {
        feature: 'Claridad en las contraformas',
        description: 'Ojos amplios y redondeados que garantizaban una legibilidad superior incluso con poca luz en abadías.'
      }
    ],
    representativeTypefaces: ['Littera Antiqua Carolina', 'Uncialis Romana', 'Carolingia Modern'],
    keyGlyphsToInspect: ['a', 'e', 'g', 'o', 'd'],
    sampleQuote: 'Sit splendor domini dei nostri super nos et opera manuum nostrarum dirige.',
    sampleQuoteAuthor: 'Scriptorium de Tours (c. 800 d.C.)',
    fontFamilyClass: 'font-garamond'
  },
  {
    id: 'gothic-textura',
    number: '05',
    name: 'Letra Gótica: Textura y Fraktur',
    subtitle: 'La fractura de la curva y el ritmo denso del pergamino',
    period: 'Baja Edad Media y Gutenberguiana',
    approxYears: 's. XII – XV d.C.',
    category: 'medieval',
    axisAngle: 0,
    axisDescription: 'Eje verticalizado y quebrado. Las curvas desaparecen casi por completo y se transforman en secuencias de trazos verticales y diagonales a 45°.',
    contrastRatio: 5.5,
    contrastLevel: 'Alto',
    contrastDescription: 'Contraste violento y rítmico: astas verticales muy negras y gruesas combinadas con empalmes finísimos en bisel.',
    ductus: 'Pluma de ave ancha cortada en bisel pronunciado, sostenida estrictamente en ángulo agudo de 45°.',
    ductusType: 'Pluma quebrada',
    serifType: 'Cuadrada / Bloque (Slab)',
    serifDescription: 'Cuadrantes rómbicos y picos angulares en los extremos de las astas, llamados cuatrifolios o terminales romboidales.',
    hasBracket: false,
    xHeightRatio: 0.70,
    xHeightDescription: 'Altura de x muy alta respecto al cuerpo; ascendentes y descendentes acortadas para empaquetar líneas apretadas.',
    pioneers: ['Johannes Gutenberg', 'Peter Schöffer', 'Escribas de Maguncia y Flandes'],
    historicalMilestone: 'La Biblia de 42 Líneas de Gutenberg (1455): el primer gran libro impreso en tipos móviles metálicos de plomo y antimonio, imitando la textura manuscrita más solemne.',
    technicalSupport: 'Tipos móviles de plomo fundido, tinta grasa de aceite de linaza y hollín, prensa de uva adaptada.',
    description: 'En el norte de Europa, el encarecimiento del pergamino y el auge de las universidades exigieron aprovechar al máximo la superficie de cada página. La pluma rompió las curvas carolingias en una tupida celosía de barras verticales oscuras: de ahí el nombre \'Textura\' (tejido). Gutenberg eligió esta letra para su célebre Biblia de 1455 para competir con los manuscritos de lujo.',
    anatomicalBreakdown: [
      {
        feature: 'Fractus (Rotura de la curva)',
        description: 'La \'o\' y la \'c\' no son círculos continuos, sino hexágonos compuestos por seis golpes angulares de pluma.'
      },
      {
        feature: 'Interletraje idéntico al asta',
        description: 'El espacio en blanco entre dos letras tiene exactamente el mismo ancho que el asta negra, generando un patrón textil hipnótico.'
      },
      {
        feature: 'Remates rómbicos',
        description: 'Las bases de las letras como \'i\', \'m\', \'n\' concluyen en pequeños rombos formados por el apoyo plano de la pluma a 45°.'
      }
    ],
    representativeTypefaces: ['Gutenberg B42 Textura', 'Fette Fraktur', 'Rotunda Veneciana', 'Schwabacher'],
    keyGlyphsToInspect: ['m', 'o', 's', 'a', 'f'],
    imagePath: '/src/assets/images/gutenberg_press_1791469708635.jpg',
    imageCaption: 'Componedor de tipos de plomo y folio incunable de Gutenberg (Maguncia, c. 1450). Caracteres en Textura con remates rómbicos.',
    sampleQuote: 'In principio creavit Deus caelum et terram. Terra autem erat inanis et vacua.',
    sampleQuoteAuthor: 'Johannes Gutenberg, Biblia de 42 Líneas (1455)',
    fontFamilyClass: 'font-garamond'
  },
  {
    id: 'humanist-venetian',
    number: '06',
    name: 'Romana Humanista / Veneciana',
    subtitle: 'El renacer de la Antigüedad y el nacimiento del tipo romano',
    period: 'Primer Renacimiento Italiano',
    approxYears: '1465 – 1495',
    category: 'renaissance',
    axisAngle: 25,
    axisDescription: 'Eje de modulación oblicuo inclinado notablemente hacia la izquierda (~20° a 30°), evidente en la barra oblicua de la \'e\' minúscula y en el punto más delgado de la \'o\'.',
    contrastRatio: 1.8,
    contrastLevel: 'Bajo',
    contrastDescription: 'Bajo contraste entre gruesos y finos, otorgando una mancha tipográfica densa, cálida y de gran textura.',
    ductus: 'Grabado de punzones de acero inspirado en la caligrafía de los humanistas florentinos (Poggio Bracciolini).',
    ductusType: 'Buril / Punzón',
    serifType: 'Triangular cóncava',
    serifDescription: 'Serifas triangulares cóncavas, asimétricas y pesadas, con bases suaves que asientan la letra sobre la línea.',
    hasBracket: true,
    xHeightRatio: 0.60,
    xHeightDescription: 'Altura de x moderada con generosas ascendentes que sobrepasan a menudo la altura de las mayúsculas.',
    pioneers: ['Nicholas Jenson (Venecia, 1470)', 'Konrad Sweynheym y Arnold Pannartz (Subiaco)', 'Poggio Bracciolini'],
    historicalMilestone: 'Eusebio de Cesarea impreso por Nicholas Jenson en Venecia (1470): la consagración de la tipografía romana legíble frente a la pesadez de la letra gótica.',
    technicalSupport: 'Tipos fundidos en aleación de plomo, estaño y antimonio en matrices de cobre vaciadas con punzones de acero templado.',
    description: 'Los humanistas italianos rechazaron la letra gótica por considerarla bárbara y oscura. En Venecia, Nicholas Jenson (un antiguo maestro de moneda francés) combinó la dignidad de las mayúsculas romanas trajanas con la gracia de la minúscula carolina. El resultado fue la tipografía veneciana o humanista, caracterizada por su calidez orgánica, su eje oblicuo y la célebre barra diagonal en la \'e\'.',
    anatomicalBreakdown: [
      {
        feature: 'Barra inclinada en la \'e\'',
        description: 'La travesaño de la \'e\' no es horizontal, sino que sigue el ángulo oblicuo de la escritura rápida humanista.'
      },
      {
        feature: 'Eje de inclinación acusada',
        description: 'En las letras redondas, el diámetro de máximo adelgazamiento se sitúa entre la 1:00 y las 7:00 en un cuadrante horario.'
      },
      {
        feature: 'Serifas superiores asimétricas',
        description: 'Las astas de \'m\', \'n\', \'r\' exhiben remates triangulares superiores que apuntan oblicuamente hacia la izquierda.'
      }
    ],
    representativeTypefaces: ['Jenson Eusebius', 'Centaur (Bruce Rogers)', 'Adobe Jenson', 'Golden Type (William Morris)'],
    keyGlyphsToInspect: ['e', 'o', 'g', 'n', 'M'],
    sampleQuote: 'Littera antiqua renata in venetiis civitate nobilissima per Nicolaum Jenson.',
    sampleQuoteAuthor: 'Nicholas Jenson, Venecia (1470)',
    fontFamilyClass: 'font-garamond'
  },
  {
    id: 'garalde-oldstyle',
    number: '07',
    name: 'Romana Renacentista Clásica: Garaldas',
    subtitle: 'La madurez del punzón de acero y la armonía tipográfica',
    period: 'Renacimiento Pleno y Siglo de Oro',
    approxYears: '1495 – 1700',
    category: 'renaissance',
    axisAngle: 15,
    axisDescription: 'Eje de modulación moderadamente oblicuo (~12° a 15°). La letra se independiza de la caligrafía manual y abraza la lógica propia del metal.',
    contrastRatio: 3.2,
    contrastLevel: 'Medio',
    contrastDescription: 'Contraste equilibrado y refinado; las zonas de transición entre finos y gruesos son ricas y armoniosas.',
    ductus: 'Punzón de acero labrado con limas y buriles. Precisión escultórica en matrices de metal.',
    ductusType: 'Buril / Punzón',
    serifType: 'Triangular con cartabón',
    serifDescription: 'Serifas triangulares refinadas, con cartabón curvo y delimitado con gran finura geométrica en la base.',
    hasBracket: true,
    xHeightRatio: 0.63,
    xHeightDescription: 'Altura de x bien equilibrada que permite excelente fluidez de lectura en libros de prosa continua.',
    pioneers: ['Claude Garamond (París)', 'Francesco Griffo (grabador para Aldo Manucio)', 'Robert Granjon', 'Christophe Plantin'],
    historicalMilestone: 'Publicación de De Aetna de Pietro Bembo por Aldo Manucio en Venecia (1495, tipos de Griffo) e invención de la cursiva itálica (1501). Perfeccionamiento por Claude Garamond en París (c. 1540).',
    technicalSupport: 'Fundición a gran escala en talleres tipográficos; imprentas móviles de madera reforzadas con tornillos de hierro.',
    description: 'Las garaldas (término que combina Garamond y Aldo) representan el canon perfecto de la tipografía de lectura continua. Claude Garamond en París y Francesco Griffo en Venecia horizontalizaron la barra de la \'e\', moderaron la inclinación del eje y dotaron a las serifas de un cartabón elegante. Durante más de tres siglos, este diseño fue el estándar indiscutido de Europa.',
    anatomicalBreakdown: [
      {
        feature: 'Barra horizontal en la \'e\'',
        description: 'La travesaño de la \'e\' se estabiliza de forma rigurosamente horizontal, marcando la madurez del diseño romano.'
      },
      {
        feature: 'Eje moderado y estable',
        description: 'La modulación conserva una inclinación humana (~15°), pero con una distribución de masas más simétrica.'
      },
      {
        feature: 'Nacimiento de la cursiva como complemento',
        description: 'Aldus Manutius y Griffo crearon los tipos itálicos originalmente para libros de bolsillo compactos; Garamond los integró como familia.'
      }
    ],
    representativeTypefaces: ['EB Garamond', 'Bembo', 'Adobe Caslon', 'Galliard', 'Sabon (Jan Tschichold)'],
    keyGlyphsToInspect: ['e', 'o', 'a', 'g', 'R'],
    sampleQuote: 'Festina lente: apresúrate despacio para alcanzar la perfección del corte en metal.',
    sampleQuoteAuthor: 'Aldo Manucio y Claude Garamond (s. XVI)',
    fontFamilyClass: 'font-garamond'
  },
  {
    id: 'transitional-neoclassical',
    number: '08',
    name: 'Tipografía de Transición / Racionalista',
    subtitle: 'El compás, la cuadrícula matemática y el auge de Baskerville',
    period: 'Ilustración y Siglo de las Luces',
    approxYears: '1692 – 1780',
    category: 'neoclassical',
    axisAngle: 6,
    axisDescription: 'Eje casi vertical (~5° a 8° de desviación). El espíritu racionalista de la Ilustración sustituye la pluma caligráfica por la cuadrícula y el compás.',
    contrastRatio: 6.5,
    contrastLevel: 'Alto',
    contrastDescription: 'Contraste marcado y nítido entre astas vigorosas y perfiles delgados.',
    ductus: 'Grabado sobre metal guiado por cuadrículas cartesianas; buril de alta precisión.',
    ductusType: 'Geometría analítica',
    serifType: 'Afilada con suave cartabón',
    serifDescription: 'Serifas más afiladas, casi horizontales en la base, con un cartabón sutil y recogido.',
    hasBracket: true,
    xHeightRatio: 0.65,
    xHeightDescription: 'Ojos internos más anchos y abiertos; proporciones más generosas y luminosas en página.',
    pioneers: ['Philippe Grandjean (Romain du Roi para Luis XIV)', 'John Baskerville (Birmingham)', 'Pierre-Simon Fournier'],
    historicalMilestone: '1692: Luis XIV ordena a la Academia de Ciencias crear la "Romain du Roi", diseñada sobre una cuadrícula de 2.304 módulos. Perfeccionamiento por John Baskerville (1757) con papel estucado caliente y tintas negras profundas.',
    technicalSupport: 'Prensas de platina de madera y hierro perfeccionadas, papel alisado mediante cilindros calientes de bronce (woven paper).',
    description: 'En el siglo XVIII, la Ilustración aplicó la razón matemática a la tipografía. Con la Romain du Roi, las letras se dibujaron sobre matrices cartesianas milimétricas. En Inglaterra, John Baskerville llevó la imprenta a un refinamiento inaudito: inventó papeles satinados y tintas de negro carbón para imprimir tipos de eje casi vertical y finísimos trazos.',
    anatomicalBreakdown: [
      {
        feature: 'Eje casi verticalizado',
        description: 'La modulación en la \'O\' se endereza: los puntos más delgados se ubican casi exactamente a las 12:00 y las 6:00.'
      },
      {
        feature: 'Cartabón reducido',
        description: 'La unión curva entre el asta y la serifa se vuelve mucho más compacta y precisa, anticipando la serifa recta moderna.'
      },
      {
        feature: 'Terminaciones en lágrima redondeada',
        description: 'Aparecen gotas redondeadas perfectas en los terminales de \'a\', \'c\', \'r\' y \'f\'.'
      }
    ],
    representativeTypefaces: ['Libre Baskerville', 'Romain du Roi', 'Fournier', 'Baskerville Old Face', 'Mrs Eaves'],
    keyGlyphsToInspect: ['o', 'e', 'g', 'Q', 'a'],
    sampleQuote: 'La belleza de una letra reside en la pureza de su proporción y la lisura del papel.',
    sampleQuoteAuthor: 'John Baskerville (1757)',
    fontFamilyClass: 'font-baskerville'
  },
  {
    id: 'didone-modern',
    number: '09',
    name: 'Romana Moderna: Didonas',
    subtitle: 'El cenit del virtuosismo: contraste extremo y eje vertical absoluto',
    period: 'Revolución Francesa y Neoclasicismo',
    approxYears: '1780 – 1830',
    category: 'modern',
    axisAngle: 0,
    axisDescription: 'Eje RIGUROSAMENTE VERTICAL (90° exactos / 0° de desviación). Simetría axial matemática absoluta en todas las letras circulares (\'O\', \'C\', \'Q\').',
    contrastRatio: 18.0,
    contrastLevel: 'Extremo',
    contrastDescription: 'Contraste dramático y abismal: astas muy densas unidas a trazos finos del espesor de un hilo de seda ("hairlines"). Relación de hasta 20 a 1.',
    ductus: 'Punzón de acero templado ultrapreciso y buril de grabador joyero; desvinculación total de la mano orgánica.',
    ductusType: 'Geometría analítica',
    serifType: 'Filiforme recta sin cartabón',
    serifDescription: 'Serifas filiformes, completamente planas y horizontales, en ángulo recto puro de 90° respecto al asta, sin ningún tipo de cartabón o curva de empalme.',
    hasBracket: false,
    xHeightRatio: 0.66,
    xHeightDescription: 'Caja x amplia con ritmo vertical disciplinado y estricto.',
    pioneers: ['Giambattista Bodoni (Parma, 1798)', 'Firmin Didot (París, 1784)', 'Joaquín Ibarra (Madrid)'],
    historicalMilestone: 'Publicación póstuma del Manuale Tipografico de Giambattista Bodoni (1818): catálogo cumbre del arte tipográfico con cientos de alfabetos de pureza geométrica inmaculada.',
    technicalSupport: 'Prensas de hierro Lord Stanhope, papel de trapo de algodón satinado mecánicamente y tintas negras puras sin residuo aceitoso.',
    description: 'A finales del siglo XVIII, Giambattista Bodoni en Italia y Firmin Didot en Francia crearon la tipografía Moderna o Didona. Su diseño representa la victoria definitiva de la arquitectura geométrica sobre la caligrafía: eje perfectamente vertical a plomo, trazos finos como cabellos y serifas horizontales rectas sin cartabón. Su elegancia monumental definió el lujo editorial y las revistas de moda hasta el día de hoy.',
    anatomicalBreakdown: [
      {
        feature: 'Eje vertical absoluto a 90°',
        description: 'La \'O\' presenta dos mitades perfectamente especulares respecto a su eje central vertical.'
      },
      {
        feature: 'Serifas apomazadas en ángulo recto',
        description: 'Los remates horizontales se conectan sin arco curvo (unbracketed hairline serifs) con un espesor mínimo uniforme.'
      },
      {
        feature: 'Terminales en gota pura (Teardrop terminals)',
        description: 'Letras como \'a\', \'r\' y \'y\' rematan en esferas o lágrimas compactas de geometría impecable.'
      }
    ],
    representativeTypefaces: ['Bodoni Moda', 'Didot', 'Walbaum', 'Playfair Display', 'Ambroise'],
    keyGlyphsToInspect: ['O', 'a', 'r', 'g', 'Q'],
    imagePath: '/src/assets/images/bodoni_specimen_1791469721520.jpg',
    imageCaption: 'Página abierta del Manuale Tipografico de Bodoni (Parma, 1818). Contraste extremo y serifas rectas filiformes medidas con compás de bronce.',
    sampleQuote: 'Quattro sono i lumi della tipografia: regolarità, nettezza, buon gusto e grazia.',
    sampleQuoteAuthor: 'Giambattista Bodoni, Manuale Tipografico (1818)',
    fontFamilyClass: 'font-bodoni'
  },
  {
    id: 'industrial-slab',
    number: '10',
    name: 'Revolución Industrial: Mecánicas y Egipcias',
    subtitle: 'El rugido de la fábrica, la publicidad callejera y la serifa en bloque',
    period: 'Siglo XIX y Expansión Comercial',
    approxYears: '1815 – 1900',
    category: 'industrial',
    axisAngle: 0,
    axisDescription: 'Eje vertical rígido. Diseñado para sostener el impacto monumental en grandes carteles urbanos de ferrocarriles y comercios.',
    contrastRatio: 1.2,
    contrastLevel: 'Muy bajo',
    contrastDescription: 'En las Egipcias puras, el contraste es mínimo: el asta y la serifa tienen prácticamente el mismo espesor.',
    ductus: 'Grabado sobre madera de boj y fundición mecánica a gran escala; letras pensadas para llamar la atención a distancia.',
    ductusType: 'Monolineal mecánico',
    serifType: 'Cuadrada / Bloque (Slab)',
    serifDescription: 'Serifas cuadrangulares, gruesas, rectangulares y sólidas ("Slab Serifs"), semejantes a vigas arquitectónicas de acero industrial.',
    hasBracket: false,
    xHeightRatio: 0.72,
    xHeightDescription: 'Altura de x muy prominente; contraformas compactas para maximizar la mancha de tinta negra sobre el papel.',
    pioneers: ['Vincent Figgins (acuñó el término Antique/Egyptian en 1815)', 'Robert Thorne', 'Fonderie Fann Street (Clarendon, 1845)'],
    historicalMilestone: '1815: Vincent Figgins presenta los primeros tipos con serifas en bloque. 1845: Benjamin Fox registra Clarendon, la primera tipografía con patente de diseño de la historia británica.',
    technicalSupport: 'Tipos gigantescos pantografiados en madera de boj (Wood Type) para cartelería callejera y prensas de vapor rotativas de alta velocidad.',
    description: 'La Revolución Industrial transformó a la sociedad campesina en una masa urbana bombardeada por publicidad, noticias de periódicos y anuncios de vapores. Los libros ya no eran el centro: la tipografía conquistó la calle. Nacieron las Egipcias o Slab Serif: letras macizas con remates cuadrangulares tan gruesos como las propias astas, concebidas para gritar desde una pared.',
    anatomicalBreakdown: [
      {
        feature: 'Serifas en bloque (Slab)',
        description: 'Remates rectangulares masivos que otorgan a la letra una estabilidad semejante a una columna de fundición de hierro.'
      },
      {
        feature: 'Monolinealidad o contraste hipertrofiado',
        description: 'Van desde trazos mecánicos uniformes (Egipcias) hasta las "Fat Faces" donde el asta gruesa devora la contraforma interior.'
      },
      {
        feature: 'Variantes con cartabón (Clarendon)',
        description: 'La subfamilia Clarendon reintrodujo un cartabón curvo para permitir su uso como letra destacada dentro del texto corriente.'
      }
    ],
    representativeTypefaces: ['Clarendon', 'Rockwell', 'Memphis', 'Roboto Slab', 'Courier'],
    keyGlyphsToInspect: ['E', 'T', 'H', 'a', 'R'],
    sampleQuote: 'THE GREAT STEAM ENGINES OF THE INDUSTRIAL REVOLUTION',
    sampleQuoteAuthor: 'Cartel de Exhibición Comercial de Londres (c. 1851)',
    fontFamilyClass: 'font-mono'
  },
  {
    id: 'twentieth-modernism',
    number: '11',
    name: 'Modernismo, Bauhaus y Estilo Suizo',
    subtitle: 'La supresión del ornamento: el triunfo de la Sans-Serif y la retícula',
    period: 'Siglo XX: Vanguardias y Posguerra',
    approxYears: '1898 – 1970',
    category: 'twentieth',
    axisAngle: 0,
    axisDescription: 'Eje vertical o neutralizado geométricamente. En la tipografía geométrica (Futura), cada letra se rige por la pureza euclidiana del círculo y el triángulo.',
    contrastRatio: 1.05,
    contrastLevel: 'Nulo',
    contrastDescription: 'Trazo monolineal uniforme con microcompensaciones ópticas para disimular engrosamientos en las uniones.',
    ductus: 'Construcción con regla, compás y estilógrafo de precisión; fotocomposición y sistemas modulares suizos.',
    ductusType: 'Geometría analítica',
    serifType: 'Suprimida (Sans-Serif)',
    serifDescription: 'SUPRESIÓN TOTAL DE LAS SERIFAS. Las astas terminan en cortes limpios, horizontales o perpendiculares al trazo.',
    hasBracket: false,
    xHeightRatio: 0.70,
    xHeightDescription: 'Altura de x generosa y uniforme; máxima claridad funcional en señalética internacional, aeropuertos y diseño corporativo.',
    pioneers: ['Paul Renner (Futura, 1927)', 'Max Miedinger y Eduard Hoffmann (Helvetica, 1957)', 'Adrian Frutiger (Univers)', 'Jan Tschichold (Die neue Typographie, 1928)'],
    historicalMilestone: '1928: Jan Tschichold publica "La Nueva Tipografía". 1957: El "Annus Mirabilis" de la tipografía con el lanzamiento simultáneo de Helvetica y Univers.',
    technicalSupport: 'Fotocomposición óptica en película fotográfica, tipografía autoadhesiva Letraset y la grilla tipográfica suiza de Josef Müller-Brockmann.',
    description: 'El siglo XX eliminó todo ornamento considerado burgués o innecesario. Guiados por la Bauhaus ("la forma sigue a la función"), diseñadores como Paul Renner crearon tipos puramente geométricos (Futura). Más tarde, la escuela suiza de Basilea y Zúrich perfeccionó las neogrotescas (Helvetica, Univers): alfabetos objetivos, racionales e impersonales que se convirtieron en la voz universal del mundo corporativo y la señalética moderna.',
    anatomicalBreakdown: [
      {
        feature: 'Desaparición total de la serifa',
        description: 'El asta culmina de manera tajante, exponiendo la estructura ósea desnuda del signo alfabético.'
      },
      {
        feature: 'Compensaciones ópticas invisibles',
        description: 'Aunque parece monolineal, los cruces de trazo se afinan sutilmente para evitar manchas oscuras indeseadas.'
      },
      {
        feature: 'Ojos cerrados y horizontales',
        description: 'En Helvetica, los terminales de \'c\', \'e\', \'s\' están cortados en líneas rigurosamente horizontales paralelas a la línea de base.'
      }
    ],
    representativeTypefaces: ['Helvetica', 'Futura', 'Akzidenz-Grotesk', 'Univers', 'Space Grotesk'],
    keyGlyphsToInspect: ['G', 'R', 'a', 'e', 'S'],
    imagePath: '/src/assets/images/swiss_modernism_1791469737229.jpg',
    imageCaption: 'Carteles del Estilo Tipográfico Suizo y Bauhaus. Tipografía sin serifas en retícula asimétrica y contraste puro.',
    sampleQuote: 'Typographie ist Ordnung, Klarheit und visuelle Präzision im Dienste des Menschen.',
    sampleQuoteAuthor: 'Josef Müller-Brockmann & Emil Ruder (1958)',
    fontFamilyClass: 'font-grotesk'
  },
  {
    id: 'digital-variable',
    number: '12',
    name: 'Era Digital y Tipografía Variable',
    subtitle: 'El texto fluido en pantalla: interpolación en tiempo real y ejes continuos',
    period: 'Revolución Digital a la Actualidad',
    approxYears: '1984 – Presente',
    category: 'digital',
    axisAngle: 0,
    axisDescription: 'Eje paramétrico dinámico. En fuentes variables OpenType, el usuario o el dispositivo pueden interpolar el eje de inclinación (slnt), contraste (opsz) y modulación de forma continua y fluida.',
    contrastRatio: 1.0,
    contrastLevel: 'Medio',
    contrastDescription: 'Contraste óptico adaptable (Optical Size): alto contraste para tamaños titulares gigantes y bajo contraste con astas reforzadas para lectura en pantallas pequeñas.',
    ductus: 'Curvas de Bézier cúbicas y cuadráticas, cálculo vectorial subpíxel y rasterización dinámica acelerada por GPU.',
    ductusType: 'Interpolación paramétrica',
    serifType: 'Variable digital',
    serifDescription: 'Morfología híbrida y mutante: un solo archivo de fuente variable puede transitar fluidamente de una serifa Bodoni a una sans-serif geométrica o slab pesada.',
    hasBracket: true,
    xHeightRatio: 0.74,
    xHeightDescription: 'Optimizada para rasterización en cuadrículas de píxeles: alta caja baja, ojos abiertos y terminales amplios.',
    pioneers: ['Matthew Carter (Georgia, Verdana)', 'John Warnock y Charles Geschke (Adobe PostScript)', 'Consorcio Apple, Google, Microsoft y Adobe (OpenType Variations, 2016)'],
    historicalMilestone: '1984: Apple Macintosh democratiza la tipografía en mapa de bits. 2016: Lanzamiento de la especificación OpenType Font Variations (ISO/IEC 14496-22).',
    technicalSupport: 'Pantallas OLED de alta densidad (Retina/4K), motores de renderizado web HarfBuzz y CSS Font Variations.',
    description: 'En la era digital, la tipografía dejó de ser plomo inmutable para convertirse en código vectorial vivo. Desde las pioneras fuentes de pantalla de Matthew Carter hasta la revolución de las Tipografías Variables (OpenType Variations), un único archivo contiene infinitos pesos, anchos y modulaciones interpoladas matemáticamente en tiempo real según el tamaño del dispositivo, la luz ambiental o la interacción del usuario.',
    anatomicalBreakdown: [
      {
        feature: 'Espacio de diseño multidimensional',
        description: 'Ejes estándar (wght, wdth, slnt, ital, opsz) y ejes personalizados que transforman el eje de modulación y las serifas en vivo.'
      },
      {
        feature: 'Tamaño óptico adaptativo (opsz)',
        description: 'La tipografía aumenta automáticamente su contraste y afina sus serifas a 72pt, y se engruesa para resistir la lectura a 9pt.'
      },
      {
        feature: 'Fluidez y reactividad',
        description: 'La letra reacciona a sensores de audio, giroscopios, distancia del lector o temas de contraste visual del sistema operativo.'
      }
    ],
    representativeTypefaces: ['Plus Jakarta Sans', 'Inter Variable', 'Fraunces Variable', 'Georgia Pro', 'Recursive'],
    keyGlyphsToInspect: ['a', 'g', 'e', 'O', '&'],
    sampleQuote: 'The screen is no longer a page: type is responsive, continuous, and alive.',
    sampleQuoteAuthor: 'Matthew Carter & Typography Today',
    fontFamilyClass: 'font-sans-modern'
  }
];

export interface TypographicTerm {
  name: string;
  category: 'eje' | 'modulacion' | 'contraste' | 'serifa' | 'anatomia';
  shortDefinition: string;
  detailedExplanation: string;
  historicalSignificance: string;
  visualDetail: string;
}

export const ANATOMICAL_TERMS: TypographicTerm[] = [
  {
    name: 'Eje de Modulación (Axis)',
    category: 'eje',
    shortDefinition: 'Inclinación de la línea imaginaria que conecta los puntos de menor grosor en una letra curva.',
    detailedExplanation: 'En letras redondas como la \'o\', \'c\', \'d\', el eje de modulación revela la posición de la mano o herramienta con la que se concibió el tipo. Un eje oblicuo hacia la izquierda (20°-45°) refleja la postura natural de la mano con pluma; un eje estrictamente vertical (90°) denota construcción geométrica analítica moderna.',
    historicalSignificance: 'La evolución del eje marca el tránsito de la escritura manual monástica (Carolina, Humanista) hacia la racionalización ilustrada (Transición) y la mecanización vertical total (Didonas y Modernas).',
    visualDetail: 'En la \'o\', traza una línea entre el adelgazamiento superior e inferior.'
  },
  {
    name: 'Modulación y Ductus',
    category: 'modulacion',
    shortDefinition: 'La variación dinámica de grosor a lo largo de un mismo trazo y el movimiento rector de la herramienta.',
    detailedExplanation: 'El ductus es el orden, dirección y velocidad de los trazos, así como el ángulo de ataque de la pluma. La modulación es la transición visible entre las partes gruesas (astas principales) y las partes delgadas (perfiles y empalmes). Puede ser orgánica y gradual o abrupta y calculada.',
    historicalSignificance: 'El ductus de la pluma ancha rigió durante mil quinientos años hasta que el buril del grabador de punzones y el compás cartesiano sustituyeron la memoria corporal del escriba.',
    visualDetail: 'Apreciable en los empalmes curvos de \'b\', \'p\', \'n\' con el asta vertical.'
  },
  {
    name: 'Contraste de Trazo',
    category: 'contraste',
    shortDefinition: 'La relación proporcional matemática entre el trazo más grueso y el trazo más fino de un glifo.',
    detailedExplanation: 'Se calcula como la ratio (Grosor Máximo : Grosor Mínimo). En una tipografía sans-serif o en la protoescritura es ~1:1; en una Garalda es ~3:1; en una Baskerville de transición asciende a ~6:1; y en las Didonas (Bodoni) alcanza extremos de 18:1 a 25:1.',
    historicalSignificance: 'A mayor contraste, mayor virtuosismo técnico de fundición y mayor necesidad de tintas y papeles lisos de alta calidad para que los trazos filiformes no se rompieran en la prensa.',
    visualDetail: 'En la \'A\' mayúscula: diferencia entre el asta descendente gruesa derecha y el asta fina izquierda.'
  },
  {
    name: 'Serifa / Remate (Serif)',
    category: 'serifa',
    shortDefinition: 'Apéndice terminal que remata los extremos de las astas principales de una letra.',
    detailedExplanation: 'Los remates varían en su forma básica: triangulares (estilo renacentista), cuadradas o en bloque (Slab serif / egipcias), filiformes en ángulo recto (modernas / didonas) o totalmente ausentes (sans-serif / grotescas).',
    historicalSignificance: 'Edward Catich demostró que nacieron del giro del pincel romano plano previo al cincel. Las serifas guían la línea horizontal de lectura en textos largos al acentuar la dirección de la mirada.',
    visualDetail: 'Bases de las astas en \'H\', \'I\', \'T\' o cabeza de \'d\', \'b\'.'
  },
  {
    name: 'Cartabón / Apófige (Bracket)',
    category: 'serifa',
    shortDefinition: 'Curva de transición o empalme que conecta el asta vertical con la serifa horizontal.',
    detailedExplanation: 'Cuando una serifa tiene cartabón ("bracketed serif"), la unión forma un arco fluido y suave. Cuando no tiene cartabón ("unbracketed serif"), la serifa se une en un ángulo vivo y seco de 90°, como en las tipografías Didonas o en las Egipcias mecánicas.',
    historicalSignificance: 'La eliminación del cartabón por Firmin Didot y Bodoni fue una declaración de modernidad estética: el despojo del último vestigio orgánico en favor del ángulo recto puro.',
    visualDetail: 'La esquina interior donde la serifa horizontal abraza el asta vertical.'
  },
  {
    name: 'Altura de x (x-height)',
    category: 'anatomia',
    shortDefinition: 'La altura del cuerpo de las letras minúsculas sin ascendentes ni descendentes (medida en la \'x\').',
    detailedExplanation: 'La proporción entre la altura de x y la altura de las mayúsculas determina la legibilidad aparente a tamaños pequeños. Tipografías con altura de x generosa (como Helvetica o Georgia) se leen mejor en pantalla o a baja resolución que aquellas con ascendentes muy largas (como Centaur o Garamond clásica).',
    historicalSignificance: 'Desde el Renacimiento hasta las fuentes digitales de pantalla de Matthew Carter, la altura de x ha ido creciendo progresivamente para optimizar la legibilidad en espacios reducidos.',
    visualDetail: 'Línea superior de las letras \'x\', \'v\', \'z\', \'o\' respecto a la línea de base.'
  },
  {
    name: 'Terminal en Gota o Lágrima (Teardrop terminal)',
    category: 'anatomia',
    shortDefinition: 'Acabado circular o redondeado en los extremos abiertos de trazos curvos.',
    detailedExplanation: 'Presente en letras como la \'a\', \'c\', \'f\', \'r\' y \'y\'. En el Renacimiento era una terminación fluida y caligráfica; en la tipografía neoclásica y moderna se convirtió en una esfera o lágrima de exactitud geométrica casi matemática.',
    historicalSignificance: 'Añade un contrapeso visual al ritmo de las serifas y evita empastes de tinta en los extremos libres de las curvas.',
    visualDetail: 'El extremo superior de la \'f\' o el brazo arqueado de la \'r\'.'
  }
];
