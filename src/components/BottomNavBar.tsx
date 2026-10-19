import React from 'react';
import { Home, Compass, History, Sliders, Trophy, BookOpen } from 'lucide-react';

export type MainViewTab = 'dashboard' | 'anatomy' | 'timeline' | 'workshop' | 'quizzes' | 'glossary';

interface BottomNavBarProps {
  activeTab: MainViewTab;
  setActiveTab: (tab: MainViewTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5 sm:py-2">
      <div className="max-w-md md:max-w-xl mx-auto flex items-center justify-between">
        {/* Inicio */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'dashboard'
              ? 'text-[#EA580C] font-extrabold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${activeTab === 'dashboard' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[9px] sm:text-[10px] mt-1 tracking-tight font-sans">Inicio</span>
        </button>

        {/* 1. Anatomía */}
        <button
          onClick={() => setActiveTab('anatomy')}
          className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'anatomy'
              ? 'text-[#EA580C] font-extrabold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${activeTab === 'anatomy' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[9px] sm:text-[10px] mt-1 tracking-tight font-sans">1. Anatomía</span>
        </button>

        {/* 2. Historia */}
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'timeline'
              ? 'text-[#EA580C] font-extrabold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${activeTab === 'timeline' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[9px] sm:text-[10px] mt-1 tracking-tight font-sans">2. Historia</span>
        </button>

        {/* 3. Laboratorio */}
        <button
          onClick={() => setActiveTab('workshop')}
          className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'workshop'
              ? 'text-[#EA580C] font-extrabold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sliders className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${activeTab === 'workshop' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[9px] sm:text-[10px] mt-1 tracking-tight font-sans">3. Taller</span>
        </button>

        {/* 4. Tests y Juegos */}
        <button
          onClick={() => setActiveTab('quizzes')}
          className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'quizzes'
              ? 'text-[#EA580C] font-extrabold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Trophy className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${activeTab === 'quizzes' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[9px] sm:text-[10px] mt-1 tracking-tight font-sans">4. Juegos</span>
        </button>
      </div>
    </nav>
  );
};
