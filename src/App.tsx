import React, { useState, useEffect } from 'react';
import { BottomNavBar, MainViewTab } from './components/BottomNavBar';
import { DashboardView } from './components/DashboardView';
import { AnatomyModule } from './components/AnatomyModule';
import { VerticalTimelineView } from './components/VerticalTimelineView';
import { QuizGamesModule } from './components/QuizGamesModule';
import { WorkshopModule } from './components/WorkshopModule';
import { GlossaryView } from './components/GlossaryView';
import { BringhurstCategory } from './data/bringhurstHistory';
import { Flame, Zap, Trophy, Compass, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainViewTab>('dashboard');
  const [userScore, setUserScore] = useState<number>(140);
  const [streakDays, setStreakDays] = useState<number>(3);
  const [completedQuizzes, setCompletedQuizzes] = useState<number>(3);

  // Load progress from localStorage on start
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('typeography_user_score') || localStorage.getItem('cronos_user_score');
      if (savedScore) setUserScore(Number(savedScore));
      const savedQuizzes = localStorage.getItem('typeography_completed_quizzes') || localStorage.getItem('cronos_completed_quizzes');
      if (savedQuizzes) setCompletedQuizzes(Number(savedQuizzes));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAddScore = (points: number) => {
    setUserScore((prev) => {
      const next = prev + points;
      try {
        localStorage.setItem('typeography_user_score', next.toString());
      } catch (e) {
        console.error(e);
      }
      return next;
    });
    setCompletedQuizzes((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('typeography_completed_quizzes', next.toString());
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleLoadInWorkshop = (category: BringhurstCategory) => {
    setActiveTab('workshop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#EA580C] selection:text-white">
      {/* Sleek Modern Top Bar (Hidden on print) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 print:hidden">
        <div className="max-w-md md:max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-[#EA580C] flex items-center justify-center text-white font-bold text-base shadow-xs font-garamond">
              &
            </div>
            <span className="font-extrabold text-lg text-slate-900 group-hover:text-[#EA580C] transition-colors tracking-tight font-sans">
              Type-o-graphy
            </span>
          </button>

          {/* Quick Header Actions & Stats */}
          <div className="flex items-center gap-2">
            {/* Quick Glossary Access */}
            <button
              onClick={() => setActiveTab('glossary')}
              className={`flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'glossary'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              title="Glosario Visual Interactivo"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#EA580C]" />
              <span className="hidden sm:inline">Glosario</span>
            </button>

            {/* Streak */}
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200/60">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{streakDays}d</span>
            </div>

            {/* XP Button */}
            <button
              onClick={() => setActiveTab('quizzes')}
              className="flex items-center gap-1 text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-xl border border-blue-200/60 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
              <span>{userScore} XP</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Responsive Workspace */}
      <main className="flex-1 max-w-md md:max-w-4xl w-full mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            onNavigate={setActiveTab}
            userScore={userScore}
            streakDays={streakDays}
            completedQuizzes={completedQuizzes}
          />
        )}

        {/* 1º Anatomía Tipográfica */}
        {activeTab === 'anatomy' && (
          <AnatomyModule 
            onAddScore={handleAddScore} 
            onNavigateToQuizzes={() => setActiveTab('quizzes')}
          />
        )}

        {/* 2º Historia Tipográfica (Robert Bringhurst) */}
        {activeTab === 'timeline' && (
          <VerticalTimelineView onLoadInWorkshop={handleLoadInWorkshop} />
        )}

        {/* 3º Laboratorio Tipográfico */}
        {activeTab === 'workshop' && (
          <WorkshopModule />
        )}

        {/* 4º Tests y Juegos Tipográficos */}
        {activeTab === 'quizzes' && (
          <QuizGamesModule onAddScore={handleAddScore} />
        )}

        {/* Módulo Especial: Glosario Visual Interactivo */}
        {activeTab === 'glossary' && (
          <GlossaryView 
            onClose={() => setActiveTab('dashboard')} 
            onNavigateToModule={setActiveTab}
          />
        )}
      </main>

      {/* Ergonomic Bottom Navigation Bar (Hidden on print) */}
      <div className="print:hidden">
        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
