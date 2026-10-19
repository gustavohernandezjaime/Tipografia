export interface BringhurstFont {
  name: string;
  designer: string;
  year: string;
  isRepresentative?: boolean;
  notableFeature: string;
  sampleCharacters: string;
  sampleWord: string;
  fontClass: string;
}

export interface BringhurstCategory {
  id: string;
  number: string;
  name: string;
  englishName: string;
  periodYears: string;
  bringhurstConcept: string;
  corePhilosophy: string;
  
  // Anatomical metrics for large diagram
  axisAngle: number;
  axisDescription: string;
  contrastRatio: number;
  contrastLevel: string;
  serifType: string;
  hasBracket: boolean;
  
  // Vertical typographic metrics (as percentage of total em square)
  ascenderYPercent: number;  // e.g. 15%
  capHeightYPercent: number; // e.g. 24%
  xHeightYPercent: number;   // e.g. 52%
  baselineYPercent: number;  // e.g. 80%
  descenderYPercent: number; // e.g. 96%
  xHeightRatio: number;      // x-height as % of Cap Height (e.g. 62%)
  
  // 10 Typefaces with visual specimens
  typefaces: BringhurstFont[];
  
  // Most representative font analysis in depth
  representativeFont: {
    name: string;
    designer: string;
    year: string;
    whyRepresentative: string;
    axisAnalysis: string;
    modulationAnalysis: string;
    serifAnalysis: string;
    readabilityAnalysis: string;
    specimenQuote: string;
    specimenAuthor: string;
    fontFamilyClass: string;
    sampleGlyphs: string[];
    evolutionLetterA: string;
    evolutionLetterG: string;
  };
}

export const BRINGHURST_CATEGORIES: BringhurstCategory[] = [
  {
    id: 'renaissance-humanist',
    number: '01',
    name: 'Renacentista / Humanista',
    englishName: 'Renaissance / Humanist',
    periodYears: '1470 – 1540',
    bringhurstConcept: 'La letra como reflejo del cuerpo humano y el movimiento vivo de la mano con pluma.',
    corePhilosophy: 'Los humanistas italianos rechazaron la pesadez de la letra gótica y buscaron resucitar la dignidad clásica grecorromana. El tipo no imita una regla geométrica fría, sino la caligrafía espontánea y culta de los eruditos florentinos con pluma de punta ancha.',
    axisAngle: 25,
    axisDescription: 'Eje fuertemente inclinado hacia la izquierda (~25°). Los puntos de adelgazamiento en las curvas coinciden con la inclinación natural de la pluma ancha en la mano humana.',
    contrastRatio: 1.8,
    contrastLevel: 'Bajo',
    serifType: 'Triangular cóncava orgánica con cartabón',
    hasBracket: true,
    ascenderYPercent: 12,
    capHeightYPercent: 25,
    xHeightYPercent: 55,
    baselineYPercent: 80,
    descenderYPercent: 96,
    xHeightRatio: 58,
    typefaces: [
      { name: 'Adobe Jenson', designer: 'Nicolas Jenson / Slimbach', year: '1470', isRepresentative: true, notableFeature: 'Barra inclinada en la \'e\', proporciones orgánicas y textura cálida.', sampleCharacters: 'Ae', sampleWord: 'Eusebio', fontClass: 'font-garamond' },
      { name: 'Centaur', designer: 'Bruce Rogers', year: '1914', notableFeature: 'Altas ascendentes que sobrepasan la altura de las mayúsculas.', sampleCharacters: 'Ah', sampleWord: 'Venecia', fontClass: 'font-garamond' },
      { name: 'Bembo', designer: 'Griffo / Aldus Manutius', year: '1495', notableFeature: 'Mayúsculas ligeramente más bajas que las ascendentes, gran armonía.', sampleCharacters: 'Ab', sampleWord: 'Aetna', fontClass: 'font-garamond' },
      { name: 'Cloister Old Style', designer: 'Morris Fuller Benton', year: '1913', notableFeature: 'Revival fiel con serifas asimétricas en la cabeza.', sampleCharacters: 'Am', sampleWord: 'Cloister', fontClass: 'font-garamond' },
      { name: 'Golden Type', designer: 'William Morris', year: '1890', notableFeature: 'Mayor peso de entintado con espíritu de la imprenta Kelmscott.', sampleCharacters: 'Ag', sampleWord: 'Morris', fontClass: 'font-garamond' },
      { name: 'Deepdene', designer: 'Frederic Goudy', year: '1927', notableFeature: 'Serifas oblicuas y cálidos cortes caligráficos.', sampleCharacters: 'Ar', sampleWord: 'Goudy', fontClass: 'font-garamond' },
      { name: 'Lutetia', designer: 'Jan van Krimpen', year: '1925', notableFeature: 'Luminosa y esbelta con mayúsculas de corte romano puro.', sampleCharacters: 'Av', sampleWord: 'Lutetia', fontClass: 'font-garamond' },
      { name: 'Dante', designer: 'Giovanni Mardersteig', year: '1955', notableFeature: 'Tallada en punzones por Charles Malin en París para Stamperia Valdonega.', sampleCharacters: 'Ad', sampleWord: 'Verona', fontClass: 'font-garamond' },
      { name: 'Poliphilus', designer: 'Monotype', year: '1923', notableFeature: 'Facsímil con pequeñas irregularidades del sangrado de tinta en papel de trapo.', sampleCharacters: 'Ap', sampleWord: 'Aldo', fontClass: 'font-garamond' },
      { name: 'Arno Pro', designer: 'Robert Slimbach', year: '2007', notableFeature: 'Interpretación contemporánea con amplias ligaduras humanistas.', sampleCharacters: 'Ak', sampleWord: 'Firenze', fontClass: 'font-garamond' }
    ],
    representativeFont: {
      name: 'Nicolas Jenson (Eusebius, 1470)',
      designer: 'Nicolas Jenson (Venecia)',
      year: '1470',
      whyRepresentative: 'Es la primera tipografía romana humanista madura de la historia. Jenson transformó la caligrafía en caracteres metálicos repetibles con un equilibrio de grises inigualable.',
      axisAnalysis: 'Eje oblicuo pronunciado (~25°). Al trazar una línea entre los puntos más delgados de la O, la línea se inclina notablemente a la izquierda (entre la 1:00 y las 7:00).',
      modulationAnalysis: 'Ductus de pluma ancha. La barra transversal de la minúscula \'e\' es oblicua en lugar de horizontal, reflejando el gesto manual rápido.',
      serifAnalysis: 'Serifas triangulares cóncavas y robustas. La base de la serifa tiene un cartabón (apófige) curvo que asienta la letra sobre la línea de base.',
      readabilityAnalysis: 'Mancha tipográfica excepcionalmente homogénea que evita el cansancio ocular en lectura continua prolongada.',
      specimenQuote: 'Littera antiqua renata in venetiis civitate nobilissima per Nicolaum Jenson.',
      specimenAuthor: 'Nicolas Jenson, Venecia (1470)',
      fontFamilyClass: 'font-garamond',
      sampleGlyphs: ['e', 'o', 'a', 'g', 'M', 'R'],
      evolutionLetterA: 'a humanista de dos pisos con gota redondeada y ojo amplio',
      evolutionLetterG: 'g de doble bucle con oreja prominente y cuello curvo'
    }
  },
  {
    id: 'baroque',
    number: '02',
    name: 'Barroca / Clásica',
    englishName: 'Baroque',
    periodYears: '1540 – 1700',
    bringhurstConcept: 'La madurez del corte en metal: modelado plástico y dinamismo espacial.',
    corePhilosophy: 'La tipografía se independiza definitivamente del manuscrito. Los punzonistas exploran la resistencia del acero y logran una barra de la e rigurosamente horizontal, mayor contraste de trazos y un cartabón curvo esculpido con gran precisión.',
    axisAngle: 15,
    axisDescription: 'Eje oblicuo moderado (~15°). La inclinación de la pluma se modera y se acerca al orden vertical sin perder la calidez humana.',
    contrastRatio: 3.2,
    contrastLevel: 'Medio',
    serifType: 'Triangular con cartabón fluido y base delimitada',
    hasBracket: true,
    ascenderYPercent: 12,
    capHeightYPercent: 24,
    xHeightYPercent: 54,
    baselineYPercent: 80,
    descenderYPercent: 96,
    xHeightRatio: 60,
    typefaces: [
      { name: 'EB Garamond', designer: 'Claude Garamond', year: '1540', isRepresentative: true, notableFeature: 'Barra horizontal fija en la \'e\', proporciones armónicas perfectas.', sampleCharacters: 'Ae', sampleWord: 'Garamond', fontClass: 'font-garamond' },
      { name: 'Caslon', designer: 'William Caslon', year: '1725', notableFeature: 'La letra más leída del Imperio Británico; cálida, robusta y legible.', sampleCharacters: 'Ac', sampleWord: 'London', fontClass: 'font-garamond' },
      { name: 'Granjon', designer: 'Robert Granjon', year: '1570', notableFeature: 'Cursivas vibrantes con un ángulo dinámico pronunciado.', sampleCharacters: 'Ag', sampleWord: 'Cursiva', fontClass: 'font-garamond' },
      { name: 'Janson', designer: 'Miklós Kis (Anton Janson)', year: '1685', notableFeature: 'Contraste más vivo y formas afiladas de la fundición holandesa.', sampleCharacters: 'Aj', sampleWord: 'Leipzig', fontClass: 'font-garamond' },
      { name: 'Galliard', designer: 'Matthew Carter', year: '1978', notableFeature: 'Energía escultórica con terminales afilados inspirados en Granjon.', sampleCharacters: 'Aq', sampleWord: 'Galliard', fontClass: 'font-garamond' },
      { name: 'Sabon', designer: 'Jan Tschichold', year: '1967', notableFeature: 'Diseñada con idéntica métrica para composición manual y linotipia.', sampleCharacters: 'As', sampleWord: 'Sabon', fontClass: 'font-garamond' },
      { name: 'Ehrhardt', designer: 'Fundición Ehrhardt', year: '1690', notableFeature: 'Cuerpo compacto con buena altura de x para periódicos clásicos.', sampleCharacters: 'Ae', sampleWord: 'Klassik', fontClass: 'font-garamond' },
      { name: 'Minion Pro', designer: 'Robert Slimbach', year: '1990', notableFeature: 'El estándar de la literatura y edición universitaria contemporánea.', sampleCharacters: 'Am', sampleWord: 'Minion', fontClass: 'font-garamond' },
      { name: 'Plantin', designer: 'Christophe Plantin', year: '1570', notableFeature: 'Astas robustas que inspiraron a Stanley Morison para Times New Roman.', sampleCharacters: 'Ap', sampleWord: 'Plantin', fontClass: 'font-garamond' },
      { name: 'Trump Mediaeval', designer: 'Georg Trump', year: '1954', notableFeature: 'Cortes en faceta angulares con espíritu artesanal centroeuropeo.', sampleCharacters: 'At', sampleWord: 'München', fontClass: 'font-garamond' }
    ],
    representativeFont: {
      name: 'Claude Garamond (París, 1540)',
      designer: 'Claude Garamond',
      year: '1540',
      whyRepresentative: 'Consagró el canon Garaldo. Es la tipografía en la que se fijó el estándar editorial moderno: barra de la \'e\' horizontal, modulación equilibrada y familia con itálicas armónicas.',
      axisAnalysis: 'Eje oblicuo moderado (~15°). Menos inclinado que Jenson, pero conservando una fluidez orgánica visible en la O y la C.',
      modulationAnalysis: 'Contraste medio (3.2:1). Las transiciones entre finos y gruesos son armoniosas y suaves.',
      serifAnalysis: 'Serifas triangulares refinadas con cartabón curvado elegante y base ligeramente cóncava que abraza la línea.',
      readabilityAnalysis: 'La reina indiscutida de la novela impresa. Su ritmo descansado permite al lector sumergirse en el relato sin reparar en la tipografía.',
      specimenQuote: 'Festina lente: apresúrate despacio para alcanzar la perfección en el corte de acero.',
      specimenAuthor: 'Claude Garamond, París (c. 1540)',
      fontFamilyClass: 'font-garamond',
      sampleGlyphs: ['e', 'o', 'a', 'g', 'R', 'S'],
      evolutionLetterA: 'a garalda con travesaño horizontal cerrado y gota contenida',
      evolutionLetterG: 'g clásica con bucle inferior en ocho perfecto'
    }
  },
  {
    id: 'neoclassical',
    number: '03',
    name: 'Neoclásica / Racionalista',
    englishName: 'Neoclassical / Transitional',
    periodYears: '1690 – 1780',
    bringhurstConcept: 'La razón cartesiana sobre la cuadrícula: compás, buril y óptica iluminista.',
    corePhilosophy: 'La Ilustración sometió la tipografía a la geometría analítica. El rey Luis XIV encargó la Romain du Roi dibujada sobre una cuadrícula de 2.304 módulos. La pluma queda atrás: ahora manda la precisión del compás y el papel satinado caliente de John Baskerville.',
    axisAngle: 6,
    axisDescription: 'Eje casi vertical (~5° a 8°). Los puntos de máximo adelgazamiento se sitúan casi exactamente a las 12:00 y las 6:00.',
    contrastRatio: 6.5,
    contrastLevel: 'Alto',
    serifType: 'Afilada con suave cartabón horizontal',
    hasBracket: true,
    ascenderYPercent: 14,
    capHeightYPercent: 26,
    xHeightYPercent: 56,
    baselineYPercent: 82,
    descenderYPercent: 96,
    xHeightRatio: 64,
    typefaces: [
      { name: 'Libre Baskerville', designer: 'John Baskerville', year: '1757', isRepresentative: true, notableFeature: 'Pureza matemática, eje casi vertical y terminales en lágrima redondeada.', sampleCharacters: 'Ab', sampleWord: 'Baskerville', fontClass: 'font-baskerville' },
      { name: 'Romain du Roi', designer: 'Philippe Grandjean', year: '1692', notableFeature: 'Primera tipografía trazada matemáticamente sobre grilla geométrica modular.', sampleCharacters: 'Ar', sampleWord: 'Louvre', fontClass: 'font-baskerville' },
      { name: 'Fournier', designer: 'Pierre-Simon Fournier', year: '1742', notableFeature: 'Creador del sistema tipográfico de puntos (puntos tipográficos).', sampleCharacters: 'Af', sampleWord: 'Fournier', fontClass: 'font-baskerville' },
      { name: 'Bell', designer: 'John Bell / Richard Austin', year: '1788', notableFeature: 'Transición inglesa refinada con serifas de base plana y fina.', sampleCharacters: 'Ab', sampleWord: 'London', fontClass: 'font-baskerville' },
      { name: 'Bulmer', designer: 'William Martin', year: '1792', notableFeature: 'Elegancia aristocrática para las ediciones de Shakespeare en Londres.', sampleCharacters: 'Au', sampleWord: 'Bulmer', fontClass: 'font-baskerville' },
      { name: 'Mrs Eaves', designer: 'Zuzana Licko', year: '1996', notableFeature: 'Famoso revival digital con baja altura de x y hermosas ligaduras.', sampleCharacters: 'Am', sampleWord: 'Emigre', fontClass: 'font-baskerville' },
      { name: 'Georgia', designer: 'Matthew Carter', year: '1996', notableFeature: 'Diseñada con espíritu de transición pero optimizada para pantallas.', sampleCharacters: 'Ag', sampleWord: 'Georgia', fontClass: 'font-baskerville' },
      { name: 'Miller', designer: 'Matthew Carter', year: '1997', notableFeature: 'Tipo editorial neoclásico adoptado por periódicos internacionales.', sampleCharacters: 'Am', sampleWord: 'Tribune', fontClass: 'font-baskerville' },
      { name: 'Joanna', designer: 'Eric Gill', year: '1930', notableFeature: 'Serifas planas con cartabón sutil y un aire racionalista sobrio.', sampleCharacters: 'Aj', sampleWord: 'Joanna', fontClass: 'font-baskerville' },
      { name: 'Baskerville Old Face', designer: 'Fry Foundry', year: '1768', notableFeature: 'Variante directa de los tipos originales fundidos en Birmingham.', sampleCharacters: 'Ao', sampleWord: 'Birmingham', fontClass: 'font-baskerville' }
    ],
    representativeFont: {
      name: 'John Baskerville (Birmingham, 1757)',
      designer: 'John Baskerville',
      year: '1757',
      whyRepresentative: 'Perfeccionó la prensa con tintas negras de humo profundo y papel de trapo alisado con cilindros de bronce calientes, permitiendo trazos de una finura jamás vista.',
      axisAnalysis: 'Eje casi vertical (~6°). El enderezamiento de las curvas refleja el triunfo de la ciencia y la geometría analítica de la Ilustración.',
      modulationAnalysis: 'Alto contraste (6.5:1). Las astas son rotundas y los perfiles son nítidos y esbeltos.',
      serifAnalysis: 'Serifas más afiladas y horizontales con un cartabón recogido. Terminales en gotas perfectamente esféricas en \'a\', \'c\', \'r\'.',
      readabilityAnalysis: 'Gran luminosidad en página; las letras no se empastan y transmiten una autoridad solemne e ilustrada.',
      specimenQuote: 'La belleza de una letra reside en la pureza de su proporción y la lisura del papel.',
      specimenAuthor: 'John Baskerville (1757)',
      fontFamilyClass: 'font-baskerville',
      sampleGlyphs: ['O', 'e', 'g', 'Q', 'a', 'R'],
      evolutionLetterA: 'a de transición con gota circular pronunciada y panza abierta',
      evolutionLetterG: 'g con bucle inferior abierto y oreja recta'
    }
  },
  {
    id: 'romantic-didone',
    number: '04',
    name: 'Romántica / Didona',
    englishName: 'Romantic / Didone',
    periodYears: '1780 – 1830',
    bringhurstConcept: 'El drama del contraste absoluto: geometría pura, eje a plomo y serifas filiformes.',
    corePhilosophy: 'El Neoclasicismo tardío y la época de las Luces llevaron la fundición al extremo. Giambattista Bodoni en Parma y Firmin Didot en París eliminaron todo cartabón: las serifas son hilos en ángulo de 90° exactos.',
    axisAngle: 0,
    axisDescription: 'Eje RIGUROSAMENTE VERTICAL (90° exactos / 0° de desviación). Simetría axial matemática perfecta en O, C y Q.',
    contrastRatio: 18.0,
    contrastLevel: 'Extremo (18:1 a 25:1)',
    serifType: 'Filiforme recta sin cartabón (ángulo de 90°)',
    hasBracket: false,
    ascenderYPercent: 14,
    capHeightYPercent: 26,
    xHeightYPercent: 57,
    baselineYPercent: 82,
    descenderYPercent: 96,
    xHeightRatio: 65,
    typefaces: [
      { name: 'Bodoni Moda', designer: 'Giambattista Bodoni / Owen Earl', year: '1798 / 2020', isRepresentative: true, notableFeature: 'Contraste extremo, serifas filiformes rectas en ángulo recto sin cartabón.', sampleCharacters: 'Ab', sampleWord: 'Bodoni', fontClass: 'font-bodoni' },
      { name: 'Didot', designer: 'Firmin Didot', year: '1784', notableFeature: 'El emblema parisino de la moda, la elegancia aristocrática y Vogue.', sampleCharacters: 'Ad', sampleWord: 'Vogue', fontClass: 'font-bodoni' },
      { name: 'Walbaum', designer: 'Justus Erich Walbaum', year: '1804', notableFeature: 'Respuesta alemana con una calidez rítmica ligeramente más amplia.', sampleCharacters: 'Aw', sampleWord: 'Weimar', fontClass: 'font-bodoni' },
      { name: 'Ambroise', designer: 'Jean François Porchez', year: '2001', notableFeature: 'Diseño parisino contemporáneo basado en las Didot de 1830.', sampleCharacters: 'Aa', sampleWord: 'Paris', fontClass: 'font-bodoni' },
      { name: 'Playfair Display', designer: 'Claus Eggers Sørensen', year: '2011', notableFeature: 'Didona digital de titulares con gran presencia web.', sampleCharacters: 'Ap', sampleWord: 'Playfair', fontClass: 'font-bodoni' },
      { name: 'Bauer Bodoni', designer: 'Heinrich Jost', year: '1926', notableFeature: 'Digitalización fiel al Manuale Tipografico de Parma.', sampleCharacters: 'Ab', sampleWord: 'Parma', fontClass: 'font-bodoni' },
      { name: 'Scotch Roman', designer: 'Richard Austin', year: '1810', notableFeature: 'Variante británica con gotas esféricas compactas.', sampleCharacters: 'As', sampleWord: 'Scotch', fontClass: 'font-bodoni' },
      { name: 'Surveyor', designer: 'Hoefler & Co.', year: '2013', notableFeature: 'Inspirada en las inscripciones de mapas grabados en cobre.', sampleCharacters: 'Au', sampleWord: 'Survey', fontClass: 'font-bodoni' },
      { name: 'Marconi', designer: 'Hermann Zapf', year: '1976', notableFeature: 'Didona creada expresamente para fotocomposición óptica.', sampleCharacters: 'Am', sampleWord: 'Zapf', fontClass: 'font-bodoni' },
      { name: 'Falaise', designer: 'Fundición Didot', year: '1820', notableFeature: 'Serifas de grosor capilar microscópico para portadas reales.', sampleCharacters: 'Af', sampleWord: 'Empire', fontClass: 'font-bodoni' }
    ],
    representativeFont: {
      name: 'Giambattista Bodoni (Parma, 1798)',
      designer: 'Giambattista Bodoni',
      year: '1798',
      whyRepresentative: 'Su Manuale Tipografico (1818) es la cumbre de la perfección técnica. Las astas son columnas negras de tinta sólida y los perfiles son hilos de seda.',
      axisAnalysis: 'Eje RIGUROSAMENTE VERTICAL (90° exactos). Si divides la \'O\' por la mitad vertical, ambas mitades son un espejo matemático idéntico.',
      modulationAnalysis: 'Contraste extremo (18:1 a 25:1). No hay transición suave: el trazo pasa de un bloque negro macizo a una línea capilar invisible.',
      serifAnalysis: 'Serifas horizontales planas, de espesor filiforme uniforme, unidas al asta en un ángulo de 90° puro SIN cartabón (unbracketed hairlines). Gotas redondas geométricas.',
      readabilityAnalysis: 'En texto corrido pequeño causa deslumbramiento ("dazzle"); en titulares, cubiertas y moda es el sinónimo eterno del lujo y la distinción.',
      specimenQuote: 'Quattro sono i lumi della tipografia: regolarità, nettezza, buon gusto e grazia.',
      specimenAuthor: 'Giambattista Bodoni, Manuale Tipografico (1818)',
      fontFamilyClass: 'font-bodoni',
      sampleGlyphs: ['O', 'a', 'r', 'g', 'Q', 'S'],
      evolutionLetterA: 'a didona con gota perfectamente circular y panza cerrada de alto contraste',
      evolutionLetterG: 'g con enlace capilar ultrafino y bucle inferior elíptico vertical'
    }
  },
  {
    id: 'realist-mechanic',
    number: '05',
    name: 'Realista y Mecánica (Slab Serif)',
    englishName: 'Realist / Slab Serif',
    periodYears: '1815 – 1900',
    bringhurstConcept: 'El rugido de la fábrica: tipografía de exhibición, carteles y serifas en bloque.',
    corePhilosophy: 'La Revolución Industrial sacó a la tipografía de los libros y la llevó a la calle. Con la prensa de vapor y el ferrocarril, nacieron las Slab Serifs (Egipcias): letras sólidas como vigas de hierro para gritar anuncios a distancia.',
    axisAngle: 0,
    axisDescription: 'Eje vertical rígido y compacto, optimizado para impacto publicitario a gran distancia.',
    contrastRatio: 1.2,
    contrastLevel: 'Muy bajo (Monolineal pesado)',
    serifType: 'Cuadrada en bloque masivo (Slab Serif)',
    hasBracket: true,
    ascenderYPercent: 14,
    capHeightYPercent: 25,
    xHeightYPercent: 53,
    baselineYPercent: 82,
    descenderYPercent: 96,
    xHeightRatio: 68,
    typefaces: [
      { name: 'Clarendon (Zilla Slab)', designer: 'Benjamin Fox / Fann Street', year: '1845', isRepresentative: true, notableFeature: 'Primera tipografía con patente; serifas en bloque con cartabón de refuerzo.', sampleCharacters: 'Ac', sampleWord: 'Clarendon', fontClass: 'font-clarendon' },
      { name: 'Rockwell', designer: 'Monotype', year: '1934', notableFeature: 'Geometría implacable con serifas rectangulares del mismo grosor que el asta.', sampleCharacters: 'Ar', sampleWord: 'Rockwell', fontClass: 'font-clarendon' },
      { name: 'Memphis', designer: 'Rudolf Wolf', year: '1929', notableFeature: 'Slab geométrica alemana precursora de marcas industriales.', sampleCharacters: 'Am', sampleWord: 'Memphis', fontClass: 'font-clarendon' },
      { name: 'Akzidenz-Grotesk', designer: 'Fundición Berthold', year: '1898', notableFeature: 'La madre de las sans-serif realistas comerciales.', sampleCharacters: 'Aa', sampleWord: 'Berthold', fontClass: 'font-clarendon' },
      { name: 'Egyptienne', designer: 'Vincent Figgins', year: '1815', notableFeature: 'Primer catálogo en emplear la denominación "Antique / Egyptian".', sampleCharacters: 'Ae', sampleWord: 'London', fontClass: 'font-clarendon' },
      { name: 'Franklin Gothic', designer: 'Morris Fuller Benton', year: '1902', notableFeature: 'Grotesca americana para titulares de rotativas de alta velocidad.', sampleCharacters: 'Af', sampleWord: 'Franklin', fontClass: 'font-clarendon' },
      { name: 'News Gothic', designer: 'Morris Fuller Benton', year: '1908', notableFeature: 'Variante más estrecha y condensada para periódicos.', sampleCharacters: 'An', sampleWord: 'Herald', fontClass: 'font-clarendon' },
      { name: 'Courier', designer: 'Howard Kettler (IBM)', year: '1955', notableFeature: 'La slab serif monoespaciada de las máquinas de escribir mecánicas.', sampleCharacters: 'Ac', sampleWord: 'Typewriter', fontClass: 'font-clarendon' },
      { name: 'Cheltenham', designer: 'Bertram Goodhue', year: '1896', notableFeature: 'Gran altura de ascendentes con enorme familia de anchos.', sampleCharacters: 'Ah', sampleWord: 'Boston', fontClass: 'font-clarendon' },
      { name: 'Roboto Slab', designer: 'Christian Robertson', year: '2013', notableFeature: 'Estructura mecánica moderna adaptada para lectura web.', sampleCharacters: 'Ar', sampleWord: 'Android', fontClass: 'font-clarendon' }
    ],
    representativeFont: {
      name: 'Clarendon (Londres, 1845)',
      designer: 'Benjamin Fox & Robert Besley',
      year: '1845',
      whyRepresentative: 'Fue la primera tipografía en registrar una patente comercial en Gran Bretaña. Diseñada para destacar palabras dentro del texto corriente sin desentonar con la masa de lectura.',
      axisAnalysis: 'Eje vertical rígido y monolítico. La letra tiene el aplomo de un pilar de arquitectura industrial de hierro fundido.',
      modulationAnalysis: 'Contraste muy bajo (1.2:1). Las astas y los trazos horizontales comparten casi la misma potencia de masa.',
      serifAnalysis: 'Serifas cuadrangulares pesadas en bloque (Slab), pero unidas con un suave cartabón redondeado que suaviza el impacto visual y resiste la prensa.',
      readabilityAnalysis: 'Excepcional a media y larga distancia; resistente al desgaste de impresión sobre papeles rugosos de periódico.',
      specimenQuote: 'THE GREAT STEAM ENGINES OF THE INDUSTRIAL REVOLUTION',
      specimenAuthor: 'Cartel comercial victoriano (c. 1851)',
      fontFamilyClass: 'font-clarendon',
      sampleGlyphs: ['E', 'T', 'H', 'a', 'R', 'S'],
      evolutionLetterA: 'a slab con remate terminal cuadrangular robusto',
      evolutionLetterG: 'g de bloque compacto con oreja plana horizontal'
    }
  },
  {
    id: 'modernist-geometric',
    number: '06',
    name: 'Modernista y Geométrica',
    englishName: 'Modernist / Geometric Sans',
    periodYears: '1910 – 1960',
    bringhurstConcept: 'La supresión del ornamento: la forma elemental, la retícula y la función pura.',
    corePhilosophy: 'La Bauhaus y la escuela suiza demolieron la tradición historicista. La serifa fue tildada de residuo burgués. Nació la fe en el círculo, el triángulo, la línea monolineal objetiva y la retícula matemática como orden visual del mundo moderno.',
    axisAngle: 0,
    axisDescription: 'Eje estrictamente vertical y neutralizado. Construcción basada en compás y regla euclidiana.',
    contrastRatio: 1.05,
    contrastLevel: 'Nulo (Monolineal puro)',
    serifType: 'Suprimida (Sans-Serif / Palo Seco)',
    hasBracket: false,
    ascenderYPercent: 10,
    capHeightYPercent: 24,
    xHeightYPercent: 54,
    baselineYPercent: 82,
    descenderYPercent: 96,
    xHeightRatio: 70,
    typefaces: [
      { name: 'Futura (Jost)', designer: 'Paul Renner', year: '1927', isRepresentative: true, notableFeature: 'Círculo, triángulo y cuadrado puros. La cumbre de la geometría modernista.', sampleCharacters: 'Af', sampleWord: 'Bauhaus', fontClass: 'font-futura' },
      { name: 'Helvetica', designer: 'Max Miedinger & Hoffmann', year: '1957', notableFeature: 'El idioma universal del diseño corporativo: cortes terminales horizontales.', sampleCharacters: 'Ah', sampleWord: 'Zürich', fontClass: 'font-futura' },
      { name: 'Univers', designer: 'Adrian Frutiger', year: '1957', notableFeature: 'Primer sistema matricial lógico de 21 variantes de peso y ancho.', sampleCharacters: 'Au', sampleWord: 'Univers', fontClass: 'font-futura' },
      { name: 'Gill Sans', designer: 'Eric Gill', year: '1928', notableFeature: 'La sans-serif humanista británica con proporciones clásicas romanas.', sampleCharacters: 'Ag', sampleWord: 'London', fontClass: 'font-futura' },
      { name: 'Johnston Underground', designer: 'Edward Johnston', year: '1916', notableFeature: 'Pionera del metro de Londres con el punto de la \'i\' en forma de rombo.', sampleCharacters: 'Aj', sampleWord: 'Underground', fontClass: 'font-futura' },
      { name: 'Avant Garde', designer: 'Herb Lubalin', year: '1970', notableFeature: 'Geometría radical de los años 70 con ligaduras acrobáticas.', sampleCharacters: 'Av', sampleWord: 'Avant', fontClass: 'font-futura' },
      { name: 'Kabel', designer: 'Rudolf Koch', year: '1927', notableFeature: 'Sans geométrica con cortes diagonales en los terminales.', sampleCharacters: 'Ak', sampleWord: 'Kabel', fontClass: 'font-futura' },
      { name: 'Metro', designer: 'W. A. Dwiggins', year: '1929', notableFeature: 'La respuesta estadounidense de Linotype a Futura y Gill Sans.', sampleCharacters: 'Am', sampleWord: 'Metro', fontClass: 'font-futura' },
      { name: 'Neuzeit Grotesk', designer: 'Wilhelm Pischner', year: '1928', notableFeature: 'Geometría funcional sobria adoptada por la industria alemana.', sampleCharacters: 'An', sampleWord: 'Dessau', fontClass: 'font-futura' },
      { name: 'Space Grotesk', designer: 'Florian Karsten', year: '2020', notableFeature: 'Interpretación contemporánea de la estética modernista de pantalla.', sampleCharacters: 'As', sampleWord: 'Space', fontClass: 'font-futura' }
    ],
    representativeFont: {
      name: 'Futura (Paul Renner, 1927)',
      designer: 'Paul Renner (Fráncfort)',
      year: '1927',
      whyRepresentative: 'Es la encarnación suprema de la vanguardia geométrica. Renner no copió la historia: construyó la letra a partir de figuras puras, anticipando la era espacial (llegó a la Luna en la placa del Apolo 11).',
      axisAnalysis: 'Eje totalmente neutralizado o vertical geométrico. La \'O\' es un círculo perfecto de compás.',
      modulationAnalysis: 'Aparentemente monolineal (1.05:1), aunque Renner aplicó microcompensaciones ópticas secretas para que las uniones no se vieran oscuras.',
      serifAnalysis: 'SUPRESIÓN TOTAL: El asta termina en cortes limpios, perpendiculares o en bisel agudo (como el ápice de la \'A\').',
      readabilityAnalysis: 'Imbatible en titulares, carteles, marcas de arquitectura y moda minimalista.',
      specimenQuote: 'DIE FORM FOLGT DER FUNKTION: GEOMETRIE DER REINHEIT',
      specimenAuthor: 'Paul Renner, Die Form (1927)',
      fontFamilyClass: 'font-futura',
      sampleGlyphs: ['O', 'A', 'a', 'e', 'G', 'R'],
      evolutionLetterA: 'a geométrica monolineal de un solo piso (círculo con asta vertical)',
      evolutionLetterG: 'g de un piso (círculo simple con gancho descendente)'
    }
  },
  {
    id: 'postmodern-digital',
    number: '07',
    name: 'Posmoderna, Lírica y Digital',
    englishName: 'Postmodern / Lyric / Digital',
    periodYears: '1970 – Presente',
    bringhurstConcept: 'La letra líquida: revivalismo, píxeles y tipografías variables continuas.',
    corePhilosophy: 'El agotamiento de la rigidez modernista dio paso a la pluralidad: desde la desconstrucción digital de los 90 (Emigre, David Carson) hasta las fuentes variables OpenType contemporáneas que mutan en vivo según el sensor del dispositivo móvil o la interacción del usuario.',
    axisAngle: 0,
    axisDescription: 'Eje paramétrico dinámico. El software interpola en tiempo real el ángulo y la modulación.',
    contrastRatio: 1.0,
    contrastLevel: 'Variable continuo',
    serifType: 'Híbrida y Variable digital',
    hasBracket: true,
    ascenderYPercent: 12,
    capHeightYPercent: 24,
    xHeightYPercent: 52,
    baselineYPercent: 82,
    descenderYPercent: 96,
    xHeightRatio: 74,
    typefaces: [
      { name: 'Plus Jakarta Sans', designer: 'Galdino Otten (Tokotype)', year: '2020', isRepresentative: true, notableFeature: 'La reina de las interfaces móviles con alta legibilidad en pantallas Retina.', sampleCharacters: 'Aj', sampleWord: 'Jakarta', fontClass: 'font-sans-modern' },
      { name: 'Georgia Pro', designer: 'Matthew Carter', year: '1996 / 2011', notableFeature: 'La reinvención de la serifa como bloque de 1 píxel para lectura web.', sampleCharacters: 'Ag', sampleWord: 'Georgia', fontClass: 'font-sans-modern' },
      { name: 'Verdana Pro', designer: 'Matthew Carter', year: '1996 / 2011', notableFeature: 'La referencia mundial de legibilidad en pantallas de baja densidad.', sampleCharacters: 'Av', sampleWord: 'Verdana', fontClass: 'font-sans-modern' },
      { name: 'Charter', designer: 'Matthew Carter', year: '1987', notableFeature: 'Pionera en optimizar curvas para impresoras láser PostScript.', sampleCharacters: 'Ac', sampleWord: 'Charter', fontClass: 'font-sans-modern' },
      { name: 'Rotis', designer: 'Otl Aicher', year: '1988', notableFeature: 'Familia híbrida que cruza Serif, Semi-Serif y Sans-Serif.', sampleCharacters: 'Ar', sampleWord: 'Aicher', fontClass: 'font-sans-modern' },
      { name: 'FF Meta', designer: 'Erik Spiekermann', year: '1991', notableFeature: 'El "anti-Helvetica" humanista y cálido de la era digital.', sampleCharacters: 'Am', sampleWord: 'Spiekermann', fontClass: 'font-sans-modern' },
      { name: 'Scala', designer: 'Martin Majoor', year: '1990', notableFeature: 'Sistema bicameral de romana y palo seco con la misma estructura ósea.', sampleCharacters: 'As', sampleWord: 'Scala', fontClass: 'font-sans-modern' },
      { name: 'Fedra Sans', designer: 'Peter Biľak', year: '2001', notableFeature: 'Tipografía multilingüe contemporánea con gran calidez rítmica.', sampleCharacters: 'Af', sampleWord: 'Bilak', fontClass: 'font-sans-modern' },
      { name: 'Quadraat', designer: 'Fred Smeijers', year: '1992', notableFeature: 'Inspiración renacentista holandesa rediseñada para la era digital.', sampleCharacters: 'Aq', sampleWord: 'Digital', fontClass: 'font-sans-modern' },
      { name: 'Recursive Variable', designer: 'Stephen Nixon', year: '2020', notableFeature: 'Cinco ejes continuos que transitan desde monoespaciada hasta sans suave.', sampleCharacters: 'Ar', sampleWord: 'Variable', fontClass: 'font-sans-modern' }
    ],
    representativeFont: {
      name: 'Plus Jakarta Sans & Variable OpenType',
      designer: 'Galdino Otten (Tokotype) & Consorcio Variable',
      year: '2020',
      whyRepresentative: 'Representa el presente absoluto del diseño digital: proporciones generosas, contrastes sutiles que resisten pantallas de 120Hz y ejes continuos en tiempo real.',
      axisAnalysis: 'Eje paramétrico dinámico. El software puede interpolar la inclinación (slnt) o el eje de contraste óptico (opsz) en vivo.',
      modulationAnalysis: 'Diseñada con amplias contraformas interiores y gran altura de x para que nunca se cierre el ojo de la \'e\' o la \'a\' en teléfonos móviles.',
      serifAnalysis: 'Morfología líquida: convive la pureza sin serifa con revivals contemporáneos de serifas de alto contraste editorial.',
      readabilityAnalysis: 'La cúspide de la ergonomía en interfaces móviles, diseño de productos digitales y tipografía responsiva.',
      specimenQuote: 'The screen is continuous light: responsive, dynamic and alive across every device.',
      specimenAuthor: 'Tipografía Contemporánea (2026)',
      fontFamilyClass: 'font-sans-modern',
      sampleGlyphs: ['a', 'g', 'e', 'O', 'R', '&'],
      evolutionLetterA: 'a digital moderna optimizada con apertura generosa del ojo interior',
      evolutionLetterG: 'g responsiva contemporánea con gancho abierto para alta legibilidad'
    }
  }
];
