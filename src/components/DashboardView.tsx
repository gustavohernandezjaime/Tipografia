import React, { useState } from 'react';
import { MainViewTab } from './BottomNavBar';
import { 
  Compass, 
  History, 
  Sliders, 
  Flame, 
  Award, 
  Sparkles, 
  ChevronRight, 
  Zap, 
  Trophy, 
  Brain, 
  BookOpen, 
  Shuffle, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { 
  TYPOGRAPHIC_CURIOSITIES, 
  FEATURED_FONTS_POOL, 
  TypographicCuriosity, 
  FeaturedDailyFont,
  getRandomCuriosity,
  getRandomFeaturedFont
} from '../data/curiositiesData';

interface DashboardViewProps {
  onNavigate: (tab: MainViewTab) => void;
  userScore: number;
  streakDays: number;
  completedQuizzes: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  userScore,
  streakDays,
  completedQuizzes,
}) => {
  // Random curious fact & daily font (regenerated on entry or with shuffle button)
  const [curiosity, setCuriosity] = useState<TypographicCuriosity>(() => getRandomCuriosity());
  const [featuredFont, setFeaturedFont] = useState<FeaturedDailyFont>(() => getRandomFeaturedFont());

  const handleNextCuriosity = () => {
    let next = getRandomCuriosity();
    while (next.id === curiosity.id && TYPOGRAPHIC_CURIOSITIES.length > 1) {
      next = getRandomCuriosity();
    }
    setCuriosity(next);
  };

  const handleNextFeaturedFont = () => {
    let next = getRandomFeaturedFont();
    while (next.name === featuredFont.name && FEATURED_FONTS_POOL.length > 1) {
      next = getRandomFeaturedFont();
    }
    setFeaturedFont(next);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* 1. FRESH STUDENT HEADER WITH APP BRANDING */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#EA580C] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Type-o-graphy · Plataforma Educativa
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              ¡Hola, Diseñador!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-xl">
              Explora la arquitectura de las letras, recorre la historia canónica de Bringhurst, 
              experimenta en el laboratorio y pon a prueba tu ojo tipográfico.
            </p>
          </div>

          {/* Avatar Icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-[#EA580C] flex items-center justify-center text-white font-bold text-2xl shadow-xs shrink-0 font-garamond">
            &
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
          <div className="p-2.5 rounded-xl bg-orange-50/70 border border-orange-100 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-[#EA580C] font-bold text-sm font-mono">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span>{streakDays}d</span>
            </div>
            <span className="text-[10px] text-slate-600 font-medium mt-0.5 font-sans">Racha Activa</span>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-blue-800 font-bold text-sm font-mono">
              <Zap className="w-4 h-4 fill-blue-600 text-blue-600" />
              <span>{userScore} XP</span>
            </div>
            <span className="text-[10px] text-slate-600 font-medium mt-0.5 font-sans">Puntos de Nivel</span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-emerald-800 font-bold text-sm font-mono">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>{completedQuizzes}</span>
            </div>
            <span className="text-[10px] text-slate-600 font-medium mt-0.5 font-sans">Tests Listos</span>
          </div>
        </div>
      </div>

      {/* 2. DATO CURIOSO DEL DÍA (RANDOMIZED ENTRY CALLOUT) */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xs space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
              ?
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
              Dato Curioso Tipográfico · {curiosity.category}
            </span>
          </div>

          <button
            onClick={handleNextCuriosity}
            className="flex items-center gap-1 text-[11px] font-mono text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            title="Ver otro dato curioso al azar"
          >
            <Shuffle className="w-3 h-3 text-amber-400" />
            <span>Otro Dato</span>
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="font-extrabold text-base text-white font-sans">
            {curiosity.title}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-200 font-sans">
            {curiosity.fact}
          </p>
        </div>

        <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800">
          <span>Época: {curiosity.historicalPeriod}</span>
          <button
            onClick={() => onNavigate('timeline')}
            className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
          >
            <span>Ver en la Línea de Tiempo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. TIPOGRAFÍA DESTACADA DEL DÍA (ESPECIMEN ALEATORIO) */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#EA580C] font-bold block">
              Especimen Tipográfico del Día
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-sans">
              {featuredFont.name} ({featuredFont.year})
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              Por {featuredFont.designer} · Período {featuredFont.period}
            </p>
          </div>

          <button
            onClick={handleNextFeaturedFont}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Cambiar Fuente</span>
          </button>
        </div>

        {/* Big visual specimen phrase */}
        <div className="p-5 bg-[#FAF8F5] rounded-xl border border-slate-200 space-y-2 select-none">
          <div className={`text-4xl sm:text-5xl text-slate-950 font-bold leading-tight ${featuredFont.fontClass}`}>
            Aa Gg Rr 123
          </div>
          <p className={`text-sm sm:text-base text-slate-800 italic leading-relaxed pt-1 ${featuredFont.fontClass}`}>
            "{featuredFont.samplePhrase}"
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <p className="text-slate-600 flex-1">
            <strong>Rasgo clave:</strong> {featuredFont.distinction}
          </p>
          <button
            onClick={() => onNavigate('timeline')}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold hover:bg-[#EA580C] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
          >
            <span>Ver Especimen en la Historia</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. THE 4 REORDERED MODULES (EXACT ORDER REQUESTED) */}
      <div className="space-y-3.5">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold px-1">
          Módulos Principales de Estudio
        </h2>

        {/* 1º ANATOMÍA TIPOGRÁFICA */}
        <button
          onClick={() => onNavigate('anatomy')}
          className="w-full text-left bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-[#EA580C] hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-orange-100 text-[#EA580C] rounded-full text-[11px] font-mono font-bold">
                <Compass className="w-3 h-3" />
                <span>1º Módulo Principal</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#EA580C] transition-colors font-sans">
                Anatomía Tipográfica
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Explora el renglón tipográfico unificado en EB Garamond con todas las partes de las letras (ápice, cartela, oreja, cuello, lágrima, fuste y bucle) tocando los puntos interactivos.
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-2xl group-hover:bg-[#EA580C] group-hover:text-white transition-colors shrink-0 font-garamond">
              Ag
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-[#EA580C]">
            <span>Explorar Renglón Garamond</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* 2º HISTORIA TIPOGRÁFICA (ROBERT BRINGHURST) */}
        <button
          onClick={() => onNavigate('timeline')}
          className="w-full text-left bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-blue-700 hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-100 text-blue-900 rounded-full text-[11px] font-mono font-bold">
                <History className="w-3 h-3" />
                <span>2º Módulo Principal</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors font-sans">
                Historia Tipográfica Canónica
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Línea del tiempo vertical hacia abajo con los 7 períodos de Robert Bringhurst, 70 tipografías rigurosas con especímenes reales, y snapshot de evolución de la 'a' y la 'g'.
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-xl group-hover:bg-blue-900 group-hover:text-white transition-colors shrink-0 font-mono">
              70
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-blue-900">
            <span>Recorrer Línea Hacia Abajo</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* 3º LABORATORIO TIPOGRÁFICO */}
        <button
          onClick={() => onNavigate('workshop')}
          className="w-full text-left bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-emerald-700 hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded-full text-[11px] font-mono font-bold">
                <Sliders className="w-3 h-3" />
                <span>3º Módulo Principal</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors font-sans">
                Laboratorio & Taller Paramétrico
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Diseña y modula signos vectoriales fluidos. La comparativa es sobrepuesta con signos históricos, las letras se escalan dinámicamente y exportas tu ficha técnica a PDF.
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center font-mono text-xl font-bold group-hover:bg-emerald-900 group-hover:text-white transition-colors shrink-0">
              PDF
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-emerald-900">
            <span>Experimentar en el Laboratorio</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* 4º JUEGOS Y TESTS TIPOGRÁFICOS */}
        <button
          onClick={() => onNavigate('quizzes')}
          className="w-full text-left bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-purple-600 hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[11px] font-mono font-bold">
                <Trophy className="w-3 h-3" />
                <span>4º Módulo Principal</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors font-sans">
                Centro de Tests & Juegos
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Juego unificado de anatomía (versión sencilla con opciones y pista vs versión difícil donde se escribe sin pista), identificación de fuentes, épocas y scoreboard con 50+ reactivos.
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xl group-hover:bg-purple-700 group-hover:text-white transition-colors shrink-0 font-sans">
              <Brain className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-purple-700">
            <span>Jugar & Ver Scoreboard</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* 5. GLOSARIO VISUAL BANNER (ACCESSIBLE FROM DASHBOARD) */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/60 border-2 border-orange-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1 flex-1">
          <span className="text-[10px] font-mono uppercase font-bold text-[#EA580C] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Herramienta de Consulta Rápida
          </span>
          <h3 className="font-extrabold text-lg text-slate-900 font-sans">
            Glosario Visual Interactivo
          </h3>
          <p className="text-xs text-slate-700 font-sans leading-relaxed max-w-xl">
            Aprende qué es la <strong>modulación</strong>, el <strong>ductus</strong>, el <strong>eje axial</strong>, el <strong>contraste</strong> y la <strong>cartela</strong> a través de animaciones interactivas paso a paso.
          </p>
        </div>

        <button
          onClick={() => onNavigate('glossary')}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold hover:bg-[#EA580C] transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <span>Abrir Glosario Visual</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
