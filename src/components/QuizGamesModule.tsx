import React, { useState, useEffect } from 'react';
import { 
  ANATOMY_GLYPHS, 
  ANATOMY_QUIZ_QUESTIONS_POOL, 
  FONT_MEMORY_GAME_POOL, 
  PERIOD_GAME_POOL,
  QuizQuestion,
  FontMemoryGameItem,
  PeriodGameItem,
  getRandomSlice
} from '../data/anatomyData';
import { 
  HelpCircle, 
  Keyboard, 
  Brain, 
  History, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  RotateCcw, 
  Award, 
  Flame, 
  Sparkles, 
  ArrowRight,
  Trophy,
  Shuffle,
  BarChart3,
  TrendingUp,
  Medal,
  Check,
  Zap,
  Target
} from 'lucide-react';

export type MainQuizCategory = 'anatomy' | 'memory' | 'periods' | 'scoreboard';
export type AnatomyDifficulty = 'easy' | 'hard';

interface QuizGamesModuleProps {
  onAddScore: (points: number) => void;
}

interface ScoreboardStats {
  totalXP: number;
  quizzesCompleted: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  anatomyEasyCompleted: number;
  anatomyHardCompleted: number;
  memoryCompleted: number;
  periodsCompleted: number;
  badges: string[];
}

export const QuizGamesModule: React.FC<QuizGamesModuleProps> = ({ onAddScore }) => {
  const [activeCategory, setActiveCategory] = useState<MainQuizCategory>('anatomy');

  // Anatomy difficulty: 'easy' (with options + hint) vs 'hard' (typed + NO hint)
  const [anatomyDiff, setAnatomyDiff] = useState<AnatomyDifficulty>('easy');

  // Exact 5-question test rounds (chosen at random from the 50+ question pool)
  const [anatomyQuestions, setAnatomyQuestions] = useState<QuizQuestion[]>(() => getRandomSlice(ANATOMY_QUIZ_QUESTIONS_POOL, 5));
  const [memoryQuestions, setMemoryQuestions] = useState<FontMemoryGameItem[]>(() => getRandomSlice(FONT_MEMORY_GAME_POOL, 5));
  const [periodQuestions, setPeriodQuestions] = useState<PeriodGameItem[]>(() => getRandomSlice(PERIOD_GAME_POOL, 5));

  // --- STATE FOR UNIFIED GAME 1: ANATOMY (EASY & HARD) ---
  const [anatomyQIdx, setAnatomyQIdx] = useState<number>(0);
  const [anatomyScore, setAnatomyScore] = useState<number>(0);
  const [anatomyErrors, setAnatomyErrors] = useState<number>(0);
  const [anatomyAnswerState, setAnatomyAnswerState] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  const [anatomySelectedOpt, setAnatomySelectedOpt] = useState<string | null>(null);
  const [typedInput, setTypedInput] = useState<string>('');
  const [isAnatomyFinished, setIsAnatomyFinished] = useState<boolean>(false);

  // --- STATE FOR GAME 2: FONT IDENTIFICATION ---
  const [memoryQIdx, setMemoryQIdx] = useState<number>(0);
  const [memoryScore, setMemoryScore] = useState<number>(0);
  const [memoryErrors, setMemoryErrors] = useState<number>(0);
  const [memoryAnswerState, setMemoryAnswerState] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  const [memorySelectedOpt, setMemorySelectedOpt] = useState<string | null>(null);
  const [isMemoryFinished, setIsMemoryFinished] = useState<boolean>(false);

  // --- STATE FOR GAME 3: PERIOD MATCHER ---
  const [periodQIdx, setPeriodQIdx] = useState<number>(0);
  const [periodScore, setPeriodScore] = useState<number>(0);
  const [periodErrors, setPeriodErrors] = useState<number>(0);
  const [periodAnswerState, setPeriodAnswerState] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  const [periodSelectedOpt, setPeriodSelectedOpt] = useState<string | null>(null);
  const [isPeriodFinished, setIsPeriodFinished] = useState<boolean>(false);

  // --- PERSISTENT SCOREBOARD STATS ---
  const [stats, setStats] = useState<ScoreboardStats>(() => {
    try {
      const saved = localStorage.getItem('typeography_user_scoreboard');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      totalXP: 140,
      quizzesCompleted: 3,
      totalQuestionsAnswered: 15,
      totalCorrect: 13,
      anatomyEasyCompleted: 1,
      anatomyHardCompleted: 1,
      memoryCompleted: 1,
      periodsCompleted: 0,
      badges: ['primer-trazo', 'ojo-anatomico']
    };
  });

  const updateStats = (correct: boolean) => {
    setStats((prev) => {
      const updated: ScoreboardStats = {
        ...prev,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
        totalCorrect: correct ? prev.totalCorrect + 1 : prev.totalCorrect
      };
      try {
        localStorage.setItem('typeography_user_scoreboard', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const markQuizCompleted = (type: 'anatomyEasy' | 'anatomyHard' | 'memory' | 'periods') => {
    setStats((prev) => {
      const key = `${type}Completed` as keyof ScoreboardStats;
      const count = ((prev[key] as number) || 0) + 1;
      const totalComp = prev.quizzesCompleted + 1;
      
      const newBadges = [...prev.badges];
      if (totalComp >= 1 && !newBadges.includes('primer-trazo')) newBadges.push('primer-trazo');
      if (totalComp >= 5 && !newBadges.includes('racha-imparable')) newBadges.push('racha-imparable');
      if (type === 'anatomyHard' && !newBadges.includes('maestro-tipeo')) newBadges.push('maestro-tipeo');
      if (type === 'memory' && !newBadges.includes('cazador-didonas')) newBadges.push('cazador-didonas');
      if (type === 'periods' && !newBadges.includes('historiador-bringhurst')) newBadges.push('historiador-bringhurst');

      const updated: ScoreboardStats = {
        ...prev,
        quizzesCompleted: totalComp,
        [key]: count,
        badges: newBadges
      };
      try {
        localStorage.setItem('typeography_user_scoreboard', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Helper string normalization
  const normalize = (txt: string) =>
    txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  // ==========================================
  // HANDLERS FOR UNIFIED ANATOMY GAME (EASY & HARD)
  // ==========================================
  const currentAnatomy = anatomyQuestions[anatomyQIdx] || anatomyQuestions[0];
  const targetGlyph = ANATOMY_GLYPHS.find((g) => g.letter === currentAnatomy.glyphLetter) || ANATOMY_GLYPHS[0];
  const targetPart = targetGlyph?.parts.find((p) => p.id === currentAnatomy.partId) || {
    name: currentAnatomy.correctAnswer,
    alternateNames: []
  };

  // Select option in Easy mode
  const handleSelectAnatomyOption = (option: string) => {
    if (anatomyAnswerState !== 'unanswered') return;
    setAnatomySelectedOpt(option);
    const isCorrect = option === currentAnatomy.correctAnswer;
    if (isCorrect) {
      setAnatomyAnswerState('correct');
      setAnatomyScore((prev) => prev + 10);
      onAddScore(10);
      updateStats(true);
    } else {
      setAnatomyAnswerState('incorrect');
      setAnatomyErrors((prev) => prev + 1);
      updateStats(false);
    }
  };

  // Check typed input in Hard mode (NO hint!)
  const handleCheckTypedAnatomy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim() || anatomyAnswerState !== 'unanswered') return;

    const normInput = normalize(typedInput);
    const valid = [
      currentAnatomy.correctAnswer,
      targetPart.name,
      ...(targetPart.alternateNames || [])
    ].map(normalize);

    const isCorrect = valid.some((v) => v === normInput || v.includes(normInput) || normInput.includes(v));

    if (isCorrect) {
      setAnatomyAnswerState('correct');
      setAnatomyScore((prev) => prev + 20); // +20 XP for hard mode!
      onAddScore(20);
      updateStats(true);
    } else {
      setAnatomyAnswerState('incorrect');
      setAnatomyErrors((prev) => prev + 1);
      updateStats(false);
    }
  };

  const handleNextAnatomy = () => {
    if (anatomyQIdx < anatomyQuestions.length - 1) {
      setAnatomyQIdx((prev) => prev + 1);
      setAnatomyAnswerState('unanswered');
      setAnatomySelectedOpt(null);
      setTypedInput('');
    } else {
      setIsAnatomyFinished(true);
      markQuizCompleted(anatomyDiff === 'easy' ? 'anatomyEasy' : 'anatomyHard');
    }
  };

  const handleResetAnatomy = (diff?: AnatomyDifficulty) => {
    if (diff) setAnatomyDiff(diff);
    setAnatomyQuestions(getRandomSlice(ANATOMY_QUIZ_QUESTIONS_POOL, 5));
    setAnatomyQIdx(0);
    setAnatomyScore(0);
    setAnatomyErrors(0);
    setAnatomyAnswerState('unanswered');
    setAnatomySelectedOpt(null);
    setTypedInput('');
    setIsAnatomyFinished(false);
  };

  // ==========================================
  // HANDLERS FOR GAME 2: FONT IDENTIFICATION
  // ==========================================
  const currentMemory = memoryQuestions[memoryQIdx] || memoryQuestions[0];

  const handleSelectMemory = (opt: string) => {
    if (memoryAnswerState !== 'unanswered') return;
    setMemorySelectedOpt(opt);
    const isCorrect = opt === currentMemory.fontName;
    if (isCorrect) {
      setMemoryAnswerState('correct');
      setMemoryScore((prev) => prev + 12);
      onAddScore(12);
      updateStats(true);
    } else {
      setMemoryAnswerState('incorrect');
      setMemoryErrors((prev) => prev + 1);
      updateStats(false);
    }
  };

  const handleNextMemory = () => {
    if (memoryQIdx < memoryQuestions.length - 1) {
      setMemoryQIdx((prev) => prev + 1);
      setMemoryAnswerState('unanswered');
      setMemorySelectedOpt(null);
    } else {
      setIsMemoryFinished(true);
      markQuizCompleted('memory');
    }
  };

  const handleResetMemory = () => {
    setMemoryQuestions(getRandomSlice(FONT_MEMORY_GAME_POOL, 5));
    setMemoryQIdx(0);
    setMemoryScore(0);
    setMemoryErrors(0);
    setMemoryAnswerState('unanswered');
    setMemorySelectedOpt(null);
    setIsMemoryFinished(false);
  };

  // ==========================================
  // HANDLERS FOR GAME 3: PERIODS
  // ==========================================
  const currentPeriod = periodQuestions[periodQIdx] || periodQuestions[0];

  const handleSelectPeriod = (opt: string) => {
    if (periodAnswerState !== 'unanswered') return;
    setPeriodSelectedOpt(opt);
    const isCorrect = opt === currentPeriod.correctPeriod;
    if (isCorrect) {
      setPeriodAnswerState('correct');
      setPeriodScore((prev) => prev + 12);
      onAddScore(12);
      updateStats(true);
    } else {
      setPeriodAnswerState('incorrect');
      setPeriodErrors((prev) => prev + 1);
      updateStats(false);
    }
  };

  const handleNextPeriod = () => {
    if (periodQIdx < periodQuestions.length - 1) {
      setPeriodQIdx((prev) => prev + 1);
      setPeriodAnswerState('unanswered');
      setPeriodSelectedOpt(null);
    } else {
      setIsPeriodFinished(true);
      markQuizCompleted('periods');
    }
  };

  const handleResetPeriod = () => {
    setPeriodQuestions(getRandomSlice(PERIOD_GAME_POOL, 5));
    setPeriodQIdx(0);
    setPeriodScore(0);
    setPeriodErrors(0);
    setPeriodAnswerState('unanswered');
    setPeriodSelectedOpt(null);
    setIsPeriodFinished(false);
  };

  // Accuracy calculation
  const accuracyPercent = stats.totalQuestionsAnswered > 0 
    ? Math.round((stats.totalCorrect / stats.totalQuestionsAnswered) * 100) 
    : 100;

  return (
    <div className="space-y-6 pb-24">
      {/* 1. QUIZ NAV SELECTOR TABS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#EA580C]" />
            <h1 className="font-extrabold text-lg sm:text-xl text-slate-900 font-sans tracking-tight">
              Centro de Tests & Juegos Tipográficos
            </h1>
          </div>
          <span className="text-xs font-mono font-bold text-[#EA580C] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
            5 preguntas por ronda
          </span>
        </div>

        {/* 4 Main Categories: Anatomy (Easy & Hard), Font Memory, Periods, Scoreboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
          <button
            onClick={() => setActiveCategory('anatomy')}
            className={`p-3 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'anatomy'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Target className="w-4 h-4 text-orange-400" />
            <span className="truncate">1. Anatomía (Fácil / Difícil)</span>
          </button>

          <button
            onClick={() => setActiveCategory('memory')}
            className={`p-3 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'memory'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="truncate">2. Identificar Fuente</span>
          </button>

          <button
            onClick={() => setActiveCategory('periods')}
            className={`p-3 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'periods'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <History className="w-4 h-4 text-emerald-400" />
            <span className="truncate">3. Épocas Bringhurst</span>
          </button>

          <button
            onClick={() => setActiveCategory('scoreboard')}
            className={`p-3 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'scoreboard'
                ? 'bg-[#EA580C] text-white shadow-xs'
                : 'bg-orange-50 text-[#EA580C] hover:bg-orange-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="truncate">4. Scoreboard</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. UNIFIED GAME 1: ANATOMÍA TIPOGRÁFICA (SENCILLA VS DIFÍCIL)            */}
      {/* ========================================================================= */}
      {activeCategory === 'anatomy' && (
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
          {/* Difficulty Mode Toggle Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#EA580C] font-bold uppercase">
                Juego 1 · Identificación Anatómica
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 font-sans">
                Pregunta {anatomyQIdx + 1} de 5
              </h2>
            </div>

            {/* Sencilla (Opciones + Pista) vs Difícil (Escribir + Sin Pista) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-mono">
              <button
                onClick={() => handleResetAnatomy('easy')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  anatomyDiff === 'easy'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Sencilla (Opciones + Pista)</span>
              </button>
              <button
                onClick={() => handleResetAnatomy('hard')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  anatomyDiff === 'hard'
                    ? 'bg-[#EA580C] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Difícil (Escribir · Sin Pista)</span>
              </button>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs font-bold">
              <span className="text-emerald-800">Aciertos: {anatomyScore > 0 ? Math.floor(anatomyScore / (anatomyDiff === 'easy' ? 10 : 20)) : 0}</span>
              <span className="text-red-700">Errores: {anatomyErrors}</span>
            </div>
          </div>

          {!isAnatomyFinished ? (
            <div className="space-y-5">
              {/* Glyph & Question Box */}
              <div className="flex flex-wrap items-center gap-4 bg-[#FAF8F5] p-4 rounded-xl border border-slate-200">
                <div className="w-16 h-16 rounded-xl bg-white border border-slate-300 flex items-center justify-center font-garamond text-4xl text-slate-950 font-bold shadow-xs">
                  {currentAnatomy.glyphLetter}
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                    {anatomyDiff === 'easy' ? 'Modo Sencillo: Selecciona la opción correcta' : 'Modo Difícil: Escribe el nombre de memoria sin pistas'}
                  </span>
                  <p className="text-base font-bold text-slate-900 font-sans leading-snug">
                    {currentAnatomy.questionText}
                  </p>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* SENCILLA: OPCIONES MÚLTIPLES + PISTA INCLUIDA       */}
              {/* ---------------------------------------------------- */}
              {anatomyDiff === 'easy' ? (
                <div className="space-y-4">
                  {/* Pista visible en versión sencilla */}
                  {currentAnatomy.hint && (
                    <div className="flex items-center gap-2 p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs font-sans text-amber-900">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                      <span><strong>Pista:</strong> {currentAnatomy.hint}</span>
                    </div>
                  )}

                  {/* 4 Multiple Choice Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentAnatomy.options.map((opt) => {
                      const isSelected = anatomySelectedOpt === opt;
                      const isCorrect = opt === currentAnatomy.correctAnswer;
                      
                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-400 hover:bg-slate-50';
                      if (anatomyAnswerState !== 'unanswered') {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-red-50 border-red-500 text-red-900';
                        } else {
                          btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelectAnatomyOption(opt)}
                          disabled={anatomyAnswerState !== 'unanswered'}
                          className={`p-4 rounded-xl border-2 text-left font-sans text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {anatomyAnswerState !== 'unanswered' && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {anatomyAnswerState !== 'unanswered' && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* ---------------------------------------------------- */
                /* DIFÍCIL: TIPIAR DE MEMORIA Y SIN PISTA              */
                /* ---------------------------------------------------- */
                <form onSubmit={handleCheckTypedAnatomy} className="space-y-3">
                  <div className="p-3 bg-red-50/60 border border-red-200 rounded-xl text-xs font-mono text-red-800 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-red-600" />
                    <span><strong>Modo Experto:</strong> Sin pistas ni opciones. Escribe el término anatómico preciso (+20 XP).</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={typedInput}
                      onChange={(e) => setTypedInput(e.target.value)}
                      disabled={anatomyAnswerState !== 'unanswered'}
                      placeholder="Escribe el nombre de la parte anatómica..."
                      className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white focus:outline-none focus:border-[#EA580C] text-sm font-sans font-bold"
                    />
                    <button
                      type="submit"
                      disabled={anatomyAnswerState !== 'unanswered' || !typedInput.trim()}
                      className="px-5 py-2.5 bg-[#EA580C] text-white rounded-xl text-xs font-mono font-bold hover:bg-orange-600 disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      Comprobar
                    </button>
                  </div>
                </form>
              )}

              {/* Feedback and Next */}
              {anatomyAnswerState !== 'unanswered' && (
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    {anatomyAnswerState === 'correct' ? (
                      <span className="text-xs font-mono font-bold text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ¡Correcto! Respuesta: {currentAnatomy.correctAnswer}
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-bold text-red-700 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-red-600" />
                        Incorrecto. La respuesta exacta era: {currentAnatomy.correctAnswer}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 font-sans leading-relaxed">
                    <strong>Explicación:</strong> {currentAnatomy.explanation}
                  </p>
                  <button
                    onClick={handleNextAnatomy}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold hover:bg-[#EA580C] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>{anatomyQIdx < anatomyQuestions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Test'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-8 space-y-4">
              <Award className="w-14 h-14 text-[#EA580C] mx-auto animate-bounce" />
              <h3 className="text-2xl font-extrabold text-slate-900 font-sans">
                ¡Test de Anatomía Completado! ({anatomyDiff === 'easy' ? 'Versión Sencilla' : 'Versión Difícil'})
              </h3>
              <p className="text-sm text-slate-600 font-sans">
                Puntaje obtenido: <strong className="text-slate-900">{anatomyScore} XP</strong> · 
                Fallos: <strong className="text-red-700">{anatomyErrors}</strong>
              </p>
              <div className="flex justify-center gap-3 pt-3">
                <button
                  onClick={() => handleResetAnatomy()}
                  className="px-5 py-2.5 bg-[#EA580C] text-white rounded-xl text-xs font-mono font-bold hover:bg-orange-600 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Jugar Otra Ronda (5 Nuevas)</span>
                </button>
                <button
                  onClick={() => setActiveCategory('scoreboard')}
                  className="px-5 py-2.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-mono font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Ver Scoreboard
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. GAME 2: IDENTIFICACIÓN VISUAL DE TIPOGRAFÍAS (5 QUESTIONS)              */}
      {/* ========================================================================= */}
      {activeCategory === 'memory' && (
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-mono text-purple-700 font-bold uppercase">
                Juego 2 · Identificación Visual de Fuentes
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 font-sans">
                Pregunta {memoryQIdx + 1} de 5
              </h2>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs font-bold">
              <span className="text-emerald-800">Aciertos: {memoryScore / 12}</span>
              <span className="text-red-700">Errores: {memoryErrors}</span>
            </div>
          </div>

          {!isMemoryFinished ? (
            <div className="space-y-5">
              {/* Visual Specimen Box */}
              <div className="p-6 bg-[#FAF8F5] rounded-2xl border-2 border-purple-200 flex flex-col items-center justify-center text-center min-h-[190px]">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">
                  Glifo de Muestra Tipográfica
                </span>
                <div className={`text-7xl sm:text-8xl select-none text-slate-950 font-bold ${currentMemory.fontClass}`}>
                  {currentMemory.sampleGlyphDisplay}
                </div>
                <p className="text-xs font-sans text-slate-600 mt-3 max-w-md italic">
                  "{currentMemory.distinctiveClue}"
                </p>
              </div>

              {/* 4 Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentMemory.options.map((opt) => {
                  const isSelected = memorySelectedOpt === opt;
                  const isCorrect = opt === currentMemory.fontName;
                  
                  let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-purple-400 hover:bg-slate-50';
                  if (memoryAnswerState !== 'unanswered') {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-red-50 border-red-500 text-red-900';
                    } else {
                      btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectMemory(opt)}
                      disabled={memoryAnswerState !== 'unanswered'}
                      className={`p-4 rounded-xl border-2 text-left font-sans text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {memoryAnswerState !== 'unanswered' && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {memoryAnswerState !== 'unanswered' && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              {memoryAnswerState !== 'unanswered' && (
                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
                  <span className="text-xs font-mono font-bold text-purple-900 block">
                    Período: {currentMemory.periodName}
                  </span>
                  <button
                    onClick={handleNextMemory}
                    className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold hover:bg-purple-700 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>{memoryQIdx < memoryQuestions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Test'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results */
            <div className="text-center py-8 space-y-4">
              <Award className="w-14 h-14 text-purple-600 mx-auto animate-bounce" />
              <h3 className="text-2xl font-extrabold text-slate-900 font-sans">
                ¡Test de Fuentes Completado!
              </h3>
              <p className="text-sm text-slate-600 font-sans">
                Puntaje obtenido: <strong className="text-slate-900">{memoryScore} XP</strong> · 
                Aciertos: <strong className="text-emerald-800">{memoryScore / 12} / 5</strong>
              </p>
              <div className="flex justify-center gap-3 pt-3">
                <button
                  onClick={handleResetMemory}
                  className="px-5 py-2.5 bg-purple-700 text-white rounded-xl text-xs font-mono font-bold hover:bg-purple-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Jugar Otra Ronda (5 Nuevas)</span>
                </button>
                <button
                  onClick={() => setActiveCategory('scoreboard')}
                  className="px-5 py-2.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-mono font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Ver Scoreboard
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. GAME 3: PERÍODOS DE ROBERT BRINGHURST (5 QUESTIONS)                   */}
      {/* ========================================================================= */}
      {activeCategory === 'periods' && (
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase">
                Juego 3 · Historia Tipográfica Canónica
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 font-sans">
                Pregunta {periodQIdx + 1} de 5
              </h2>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs font-bold">
              <span className="text-emerald-800">Aciertos: {periodScore / 12}</span>
              <span className="text-red-700">Errores: {periodErrors}</span>
            </div>
          </div>

          {!isPeriodFinished ? (
            <div className="space-y-5">
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold block mb-1">
                  Hito o Rasgo Histórico Clave:
                </span>
                <p className="text-base font-sans font-bold text-slate-900 leading-snug">
                  {currentPeriod.conceptText}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentPeriod.options.map((opt) => {
                  const isSelected = periodSelectedOpt === opt;
                  const isCorrect = opt === currentPeriod.correctPeriod;
                  
                  let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-emerald-400 hover:bg-slate-50';
                  if (periodAnswerState !== 'unanswered') {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-red-50 border-red-500 text-red-900';
                    } else {
                      btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectPeriod(opt)}
                      disabled={periodAnswerState !== 'unanswered'}
                      className={`p-4 rounded-xl border-2 text-left font-sans text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {periodAnswerState !== 'unanswered' && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {periodAnswerState !== 'unanswered' && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              {periodAnswerState !== 'unanswered' && (
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200 space-y-2">
                  <p className="text-xs text-slate-700 font-sans leading-relaxed">
                    <strong>Explicación:</strong> {currentPeriod.explanation}
                  </p>
                  <button
                    onClick={handleNextPeriod}
                    className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>{periodQIdx < periodQuestions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Test'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results */
            <div className="text-center py-8 space-y-4">
              <Award className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="text-2xl font-extrabold text-slate-900 font-sans">
                ¡Test de Épocas Completado!
              </h3>
              <p className="text-sm text-slate-600 font-sans">
                Puntaje obtenido: <strong className="text-slate-900">{periodScore} XP</strong> · 
                Aciertos: <strong className="text-emerald-800">{periodScore / 12} / 5</strong>
              </p>
              <div className="flex justify-center gap-3 pt-3">
                <button
                  onClick={handleResetPeriod}
                  className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-mono font-bold hover:bg-emerald-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Jugar Otra Ronda (5 Nuevas)</span>
                </button>
                <button
                  onClick={() => setActiveCategory('scoreboard')}
                  className="px-5 py-2.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-mono font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Ver Scoreboard
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB 4: SCOREBOARD & PROGRESO DEL ESTUDIANTE                            */}
      {/* ========================================================================= */}
      {activeCategory === 'scoreboard' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#EA580C] font-bold uppercase tracking-wider block">
                  Panel de Rendimiento Estudiantil
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 font-sans">
                  Scoreboard de Aprendizaje
                </h2>
              </div>

              {/* Rank Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-orange-50 border border-orange-200 rounded-xl">
                <Medal className="w-5 h-5 text-[#EA580C]" />
                <div className="text-left font-sans">
                  <span className="text-[10px] font-mono text-slate-400 block">Rango Actual:</span>
                  <span className="text-xs font-bold text-slate-900">
                    {stats.quizzesCompleted < 3 
                      ? 'Tipógrafo Aprendiz' 
                      : stats.quizzesCompleted < 8 
                        ? 'Compositor de Punzones' 
                        : 'Maestro del Plomo'}
                  </span>
                </div>
              </div>
            </div>

            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-100 flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#EA580C] font-mono">
                  {stats.totalXP}
                </span>
                <span className="text-xs font-sans text-slate-600 font-bold mt-1">Puntos XP Totales</span>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-800 font-mono">
                  {stats.quizzesCompleted}
                </span>
                <span className="text-xs font-sans text-slate-600 font-bold mt-1">Tests Completados</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono">
                  {accuracyPercent}%
                </span>
                <span className="text-xs font-sans text-slate-600 font-bold mt-1">Precisión de Aciertos</span>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-purple-800 font-mono">
                  {stats.totalQuestionsAnswered}
                </span>
                <span className="text-xs font-sans text-slate-600 font-bold mt-1">Reactivos Resueltos</span>
              </div>
            </div>

            {/* Practice Count by Quiz Type */}
            <div className="space-y-3 pt-2">
              <h3 className="font-extrabold text-slate-900 font-sans text-sm">
                Desglose de Prácticas Realizadas por Módulo:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800">1. Anatomía (Versión Sencilla):</span>
                  <span className="font-mono font-bold text-slate-900">{stats.anatomyEasyCompleted} rondas</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800">1. Anatomía (Versión Difícil):</span>
                  <span className="font-mono font-bold text-slate-900">{stats.anatomyHardCompleted} rondas</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800">2. Identificación de Fuentes:</span>
                  <span className="font-mono font-bold text-slate-900">{stats.memoryCompleted} rondas</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800">3. Períodos de Bringhurst:</span>
                  <span className="font-mono font-bold text-slate-900">{stats.periodsCompleted} rondas</span>
                </div>
              </div>
            </div>

            {/* Badges / Medals Unlocked */}
            <div className="space-y-3 pt-2">
              <h3 className="font-extrabold text-slate-900 font-sans text-sm">
                Insignias & Logros Desbloqueados:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-slate-200 flex items-center gap-3 bg-[#FAF8F5]">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-sans">Primer Trazo</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Completar la primera sesión de práctica.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 flex items-center gap-3 bg-[#FAF8F5]">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    stats.badges.includes('ojo-anatomico') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {stats.badges.includes('ojo-anatomico') ? '✓' : '🔒'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-sans">Ojo Anatómico</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Alcanzar más del 80% de precisión global.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 flex items-center gap-3 bg-[#FAF8F5]">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    stats.badges.includes('maestro-tipeo') ? 'bg-orange-100 text-[#EA580C]' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {stats.badges.includes('maestro-tipeo') ? '✓' : '🔒'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-sans">Maestro de Tipeo</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Completar la versión difícil de anatomía sin pistas.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 flex items-center gap-3 bg-[#FAF8F5]">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    stats.badges.includes('cazador-didonas') ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {stats.badges.includes('cazador-didonas') ? '✓' : '🔒'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-sans">Cazador de Didonas</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Dominar la identificación de fuentes históricas.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action to start a test */}
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500">¿Quieres seguir entrenando?</span>
              <button
                onClick={() => setActiveCategory('anatomy')}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-[#EA580C] transition-colors cursor-pointer"
              >
                Comenzar Test Anatómico →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
