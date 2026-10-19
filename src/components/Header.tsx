import React from 'react';
import { Compass, GitCompare, History, Sliders, BookOpen, Printer, Sparkles, Feather } from 'lucide-react';

export type ActiveTab = 
  | 'timeline' 
  | 'latin-evolution' 
  | 'print-era' 
  | 'modern-digital' 
  | 'anatomy' 
  | 'comparator' 
  | 'sandbox' 
  | 'glossary';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedEraName: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedEraName,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('timeline')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-trajan text-lg sm:text-xl font-bold tracking-wider text-stone-900 group-hover:text-[#9A3412] transition-colors">
              CRONOS TYPOGRAPHICA
            </span>
          </button>

          {/* Zone 2: Navigation links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Cronología</span>
            </button>

            <button
              onClick={() => setActiveTab('latin-evolution')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                activeTab === 'latin-evolution'
                  ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Feather className="w-3.5 h-3.5" />
              <span>Alfabeto Latino</span>
            </button>

            <button
              onClick={() => setActiveTab('print-era')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                activeTab === 'print-era'
                  ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Era de la Imprenta</span>
            </button>

            <button
              onClick={() => setActiveTab('modern-digital')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                activeTab === 'modern-digital'
                  ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Moderna y Digital</span>
            </button>

            <button
              onClick={() => setActiveTab('anatomy')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                activeTab === 'anatomy'
                  ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Inspector</span>
            </button>

            <button
              onClick={() => setActiveTab('comparator')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                activeTab === 'comparator'
                  ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Comparador</span>
            </button>

            <button
              onClick={() => setActiveTab('sandbox')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                activeTab === 'sandbox'
                  ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Laboratorio</span>
            </button>

            <button
              onClick={() => setActiveTab('glossary')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                activeTab === 'glossary'
                  ? 'text-[#9A3412] border-b-2 border-[#9A3412] font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Glosario</span>
            </button>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab(activeTab === 'print-era' ? 'latin-evolution' : 'print-era')}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 rounded hover:bg-[#9A3412] transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              {activeTab === 'print-era' ? 'Ver Alfabeto Latino' : 'Ver Era Imprenta'}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet navigation row */}
        <div className="lg:hidden flex items-center py-2 border-t border-stone-200 overflow-x-auto gap-2 museum-scrollbar">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded ${
              activeTab === 'timeline' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600'
            }`}
          >
            Cronología
          </button>
          <button
            onClick={() => setActiveTab('latin-evolution')}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded ${
              activeTab === 'latin-evolution' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600'
            }`}
          >
            Alfabeto Latino
          </button>
          <button
            onClick={() => setActiveTab('print-era')}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded ${
              activeTab === 'print-era' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600'
            }`}
          >
            Imprenta
          </button>
          <button
            onClick={() => setActiveTab('modern-digital')}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded ${
              activeTab === 'modern-digital' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600'
            }`}
          >
            Moderna / Digital
          </button>
          <button
            onClick={() => setActiveTab('anatomy')}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded ${
              activeTab === 'anatomy' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600'
            }`}
          >
            Inspector
          </button>
          <button
            onClick={() => setActiveTab('comparator')}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded ${
              activeTab === 'comparator' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600'
            }`}
          >
            Comparador
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded ${
              activeTab === 'sandbox' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600'
            }`}
          >
            Laboratorio
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded ${
              activeTab === 'glossary' ? 'bg-stone-900 text-white font-medium' : 'text-stone-600'
            }`}
          >
            Glosario
          </button>
        </div>
      </div>
    </header>
  );
};


