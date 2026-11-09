import React from 'react';
import { User, Calculator, Wallet, ShieldCheck, Printer } from 'lucide-react';

interface HeaderProps {
  activeTab: 'profile' | 'bmi' | 'finance' | 'courts';
  setActiveTab: (tab: 'profile' | 'bmi' | 'finance' | 'courts') => void;
  onPrintCard?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onPrintCard }) => {
  return (
    <header className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white shadow-xl sticky top-0 z-50 border-b border-emerald-800/60 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Exactly 3 Zones Separated by gap-8 */}
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Single text element wordmark with Takraw ball badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center font-black text-xl shadow-md border-2 border-amber-300">
              <span role="img" aria-label="Takraw Ball" className="text-xl">⚽</span>
            </div>
            <div className="flex flex-col">
              <a 
                href="#top" 
                onClick={(e) => { e.preventDefault(); setActiveTab('profile'); }}
                className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
              >
                โรงยิมเซปักตะกร้อ <span className="text-amber-400">สุขสันต์</span>
              </a>
              <span className="text-[11px] text-emerald-300/90 tracking-wide font-normal">
                Suksan Sepak Takraw Gym Club
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links / Segmented Control Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 bg-emerald-950/70 rounded-xl border border-emerald-700/40">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-emerald-700 text-white shadow-md font-semibold'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/40'
              }`}
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>ข้อมูลนักกีฬา & บัตร</span>
            </button>

            <button
              onClick={() => setActiveTab('bmi')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'bmi'
                  ? 'bg-emerald-700 text-white shadow-md font-semibold'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/40'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>คำนวณ BMI & สมรรถภาพ</span>
            </button>

            <button
              onClick={() => setActiveTab('finance')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'finance'
                  ? 'bg-emerald-700 text-white shadow-md font-semibold'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/40'
              }`}
            >
              <Wallet className="w-4 h-4 text-amber-400" />
              <span>บัญชียิม (รับ-จ่าย)</span>
            </button>

            <button
              onClick={() => setActiveTab('courts')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'courts'
                  ? 'bg-emerald-700 text-white shadow-md font-semibold'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/40'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>สถานะสนามคอร์ท</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (activeTab !== 'profile') setActiveTab('profile');
                if (onPrintCard) onPrintCard();
              }}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">พิมพ์บัตรนักกีฬา</span>
              <span className="sm:hidden">พิมพ์บัตร</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex justify-around bg-emerald-950 border-t border-emerald-800/60 p-1.5 text-xs">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'profile' ? 'text-amber-400 font-bold bg-emerald-900/60' : 'text-emerald-300'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>โปรไฟล์</span>
        </button>

        <button
          onClick={() => setActiveTab('bmi')}
          className={`flex flex-col items-center py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'bmi' ? 'text-amber-400 font-bold bg-emerald-900/60' : 'text-emerald-300'
          }`}
        >
          <Calculator className="w-5 h-5 mb-0.5" />
          <span>คำนวณ BMI</span>
        </button>

        <button
          onClick={() => setActiveTab('finance')}
          className={`flex flex-col items-center py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'finance' ? 'text-amber-400 font-bold bg-emerald-900/60' : 'text-emerald-300'
          }`}
        >
          <Wallet className="w-5 h-5 mb-0.5" />
          <span>รายรับ-จ่าย</span>
        </button>

        <button
          onClick={() => setActiveTab('courts')}
          className={`flex flex-col items-center py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'courts' ? 'text-amber-400 font-bold bg-emerald-900/60' : 'text-emerald-300'
          }`}
        >
          <ShieldCheck className="w-5 h-5 mb-0.5" />
          <span>สนามคอร์ท</span>
        </button>
      </div>
    </header>
  );
};
