# Reestructuración Móvil de Cronos Typographica: Anatomía Táctil, Gamificación y Línea de Bringhurst

Plan de reestructuración enfocado en estudiantes y jóvenes universitarios de diseño: diseño contemporáneo, fresco, dinámico y no "avejentado", con navegación móvil intuitiva por barra inferior, dashboard de aprendizaje, anatomía táctil interactiva con tests puntuados, línea de tiempo vertical basada en Robert Bringhurst y taller de variantes tipográficas con exportación a PDF.

## User Review & Critical Decisions

> [!IMPORTANT]
> Decisiones confirmadas e incorporadas:
> - **Estética para Jóvenes y Estudiantes**: Adiós a la apariencia de museo antiguo o pergamino gastado. Adopción de una dirección visual contemporánea, limpia, audaz y enérgica (influenciada por el diseño editorial moderno, *Duolingo*, *Linear* y *Apple Design Awards*): fondos blancos puros con sutiles contrastes neutros, acentos vibrantes de color (naranja quemado/coral eléctrico, azul cobalto profundo y esmeralda de acierto), tipografía con carácter contemporáneo (*Plus Jakarta Sans* y especímenes editoriales de alto impacto), bordes suaves y microinteracciones ágiles.
> - **Navegación Móvil Ergonómica**: Dashboard con tarjetas visualmente estimulantes y barra de navegación inferior fija para acceso rápido con una sola mano.
> - **Módulo de Anatomía Didáctico**:
>   - Letras táctiles donde los estudiantes tocan directamente los puntos anatómicos (ápice, asta, cartabón, contraforma, etc.) y descubren su función.
>   - **Modo Relacionar**: Emparejar nombres con partes con feedback instantáneo.
>   - **Modo Tipear**: Escribir los nombres de memoria con pistas progresivas, contador de fallos y score final.
> - **Línea de Tiempo Vertical (Robert Bringhurst)**: Flujo vertical continuo hacia abajo estructurado según los períodos canónicos de Bringhurst, con tarjetas de estilos y especímenes tipográficos reales.
> - **Taller de Variantes Tipográficas**: Experimentación libre con cualquier letra del abecedario o palabra, ajuste de parámetros (eje, contraste, peso, serifa), comparativa con presets históricos, guardado local y exportación directa a **Ficha de Espécimen en PDF**.

---

## 1. Overview & Core Concept

- **Público Objetivo**: Estudiantes universitarios de diseño gráfico, artes visuales, tipografía y creadores digitales jóvenes.
- **Enfoque Pedagógico**: "Aprender haciendo y tocando". La tipografía deja de ser una teoría árida para convertirse en un juego interactivo de exploración táctil y experimentación visual.
- **Tono Visual**: Moderno, pulcro, fresco y memorable. Sin clichés de pergaminos desgastados ni saturación de datos innecesarios.

---

## 2. User Experience & Visual Design

### Navegación y Estructura Mobile-First

```
┌────────────────────────────────────────────────────────┐
│  CRONOS · LAB                [ 🔥 Racha: 3 | Pts: 140 ]│
├────────────────────────────────────────────────────────┤
│  ¡Hola, Diseñador! ¿Qué exploramos hoy?                │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ⚡ ANATOMÍA TÁCTIL & TESTS                       │  │
│  │    Toca las partes de la letra y ponte a prueba  │  │
│  │    [ Modo Explorar · Test Relacionar · Tipeo ]   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 📜 LÍNEA DE TIEMPO DE BRINGHURST                 │  │
│  │    Evolución vertical de estilos y especímenes   │  │
│  │    [ 7 Períodos canónicos · Especímenes reales ] │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 🧪 TALLER DE VARIANTES & PDF                     │  │
│  │    Modifica cualquier glifo y exporta tu ficha   │  │
│  │    [ Presets · Comparativa · Exportar PDF ]      │  │
│  └──────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────┤
│  BARRA INFERIOR FIJA (TOUCH FRIENDLY):                 │
│  [🏠 Inicio]   [🔍 Anatomía]   [⏳ Historia]   [🧪 Taller] │
└────────────────────────────────────────────────────────┘
```

### Paleta Cromática Contemporánea
- **Lienzo**: Blanco puro (`#FFFFFF`) y fondo base suave (`#F8FAFC` o `#F9F9FB`), transmitiendo frescura y espacio.
- **Acentos Energéticos**:
  - Coral / Fuego Editorial (`#EA580C` / `#C2410C`): Indicador de energía, botones primarios y racha de aciertos.
  - Azul Cobalto Neón (`#2563EB`): Para métricas de contraste y ejes analíticos.
  - Verde Menta / Éxito (`#10B981`): Aciertos en los tests y retroalimentación positiva.
  - Rosa / Error didáctico (`#F43F5E`): Señalización clara y constructiva de fallos.
- **Tipografía de Interfaz**: *Plus Jakarta Sans* y *Space Grotesk* para una lectura fresca y moderna en pantalla; *Cinzel*, *EB Garamond* y *Bodoni Moda* para los especímenes de estudio.

---

## 3. Key Product Decisions & Trade-Offs

- **Gamificación Ligera (Score y Feedback Positivo)**: El sistema incluye puntuaciones, mensajes de aliento y contador de aciertos en los tests para mantener motivados a los estudiantes.
- **Interactividad Directa sobre el Glifo**: En lugar de leer un texto pasivo, el usuario toca la letra en pantalla; los puntos de contacto ("hotspots") se iluminan con suaves animaciones y despliegan tarjetas emergentes con el nombre, etimología y función.
- **Cualquier Carácter del Teclado en el Taller**: El taller permite probar la 'a', 'g', 'R', 'Q', ligaduras o palabras completas del usuario, superando la limitación de la letra 'o'.
- **Exportación en PDF Optimizada para Impresión**: Al pulsar "Exportar Ficha", se genera una vista limpia con estándar tipográfico de catálogo, lista para guardar como PDF o imprimir desde el navegador del móvil o escritorio.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                               App.tsx                                   │
│  - Active Tab: 'dashboard' | 'anatomy' | 'timeline' | 'workshop'       │
│  - Progress State: XP, badges, tests completados (localStorage)         │
└──────────────┬──────────────────┬─────────────────┬─────────────────────┘
               │                  │                 │
               ▼                  ▼                 ▼
     ┌───────────────────┐ ┌──────────────┐ ┌──────────────────────┐
     │ AnatomyView.tsx   │ │ TimelineView │ │ WorkshopView.tsx     │
     │ ├─ ExploreMode    │ │ ├─ Bringhurst│ │ ├─ Glyph / Text Input│
     │ │  (Touch Points) │ │ │  7 Periods │ │ ├─ Historical Presets│
     │ ├─ MatchQuiz      │ │ ├─ Downward  │ │ ├─ Side-by-side Diff │
     │ └─ TypeInputQuiz  │ │ │  Scroll Rail││ ├─ Local Storage Save│
     │    (Pistas/Score) │ │ └─ Live Fonts│ │ └─ Print / PDF Sheet │
     └───────────────────┘ └──────────────┘ └──────────────────────┘
```

### Clasificación de Robert Bringhurst Integrada
1. **Renacentista / Humanista (1470–1540)**: Nicolas Jenson, Francesco Griffo, Aldus Manutius. Eje oblicuo pronunciado, bajo contraste, trazo de pluma ancha.
2. **Barroco (1540–1700)**: Claude Garamond, Robert Granjon, Anton Janson, William Caslon. Estabilización de la barra horizontal, modelado plástico y mayor contraste.
3. **Neoclásico / Racionalista (1690–1780)**: Romain du Roi, John Baskerville, Pierre-Simon Fournier. Eje casi vertical, contraste notable, compás y buril sobre cuadrícula.
4. **Romántico / Didona (1780–1830)**: Giambattista Bodoni, Firmin Didot. Eje vertical puro (90°), contraste extremo y serifas planas filiformes sin cartabón.
5. **Realista y Mecánico (1815–1900)**: Clarendon, Slab Serifs egipcias y primeras grotescas. Tipografía de exhibición para comercio y cartelería.
6. **Modernista y Geométrico (1910–1960)**: Bauhaus, Paul Renner (Futura), Edward Johnston, Max Miedinger (Helvetica). Desaparición de la serifa, retícula y función pura.
7. **Posmoderno, Lírico y Digital (1970–Presente)**: Tipografía para pantallas (Georgia, Verdana), revival histórico y tipografías variables adaptativas.
