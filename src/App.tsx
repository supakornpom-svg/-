import { useState, useEffect } from 'react';
import { AthleteProfile, Transaction } from './types';
import { DEFAULT_PROFILE, INITIAL_TRANSACTIONS } from './mockData';
import { Header } from './components/Header';
import { ProfileSection } from './components/ProfileSection';
import { BMISection } from './components/BMISection';
import { FinanceSection } from './components/FinanceSection';
import { CourtsSection } from './components/CourtsSection';
import { Megaphone, ShieldCheck, Clock, MapPin, Phone } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'profile' | 'bmi' | 'finance' | 'courts'>('profile');

  // Load saved profile or fallback
  const [profile, setProfile] = useState<AthleteProfile>(() => {
    const saved = localStorage.getItem('takraw_gym_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  // Load saved transactions or fallback
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('takraw_gym_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_TRANSACTIONS;
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  useEffect(() => {
    // Sync title with active view
    const titles = {
      profile: 'ข้อมูลส่วนตัว & บัตรสมาชิก - โรงยิมเซปักตะกร้อ สุขสันต์',
      bmi: 'คำนวณ BMI สำหรับนักตะกร้อ - โรงยิมเซปักตะกร้อ สุขสันต์',
      finance: 'ระบบบัญชีรายรับ-รายจ่าย - โรงยิมเซปักตะกร้อ สุขสันต์',
      courts: 'สถานะสนามคอร์ท - โรงยิมเซปักตะกร้อ สุขสันต์'
    };
    document.title = titles[activeTab];
  }, [activeTab]);

  const handlePrintCard = () => {
    setActiveTab('profile');
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      {/* Header Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onPrintCard={handlePrintCard} 
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Welcome & Gym Status Banner */}
        <div className="bg-gradient-to-r from-amber-50 via-amber-100/60 to-emerald-50 rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-sm mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl shrink-0 shadow-sm">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  ยินดีต้อนรับสู่ โรงยิมเซปักตะกร้อ สุขสันต์ (Suksan Sepak Takraw Gym)
                </h3>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  มาตรฐานแข่งขันสมาคมฯ
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                เปิดบริการทุกวัน 08:00 - 21:00 น. มีสนามมาตรฐาน ตะกร้อฝึกซ้อม Marathon บริการให้ยืม และโค้ชเทรนเนอร์ดูแลความปลอดภัย
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={() => setActiveTab('courts')}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-emerald-900 rounded-xl text-xs font-semibold shadow-xs border border-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>ตรวจสถานะสนาม 3 คอร์ท</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Profile & Card */}
        {activeTab === 'profile' && (
          <section id="section-profile">
            <ProfileSection profile={profile} setProfile={setProfile} />
          </section>
        )}

        {/* Tab 2: BMI Calculator */}
        {activeTab === 'bmi' && (
          <section id="section-bmi">
            <BMISection currentPosition={profile.position} />
          </section>
        )}

        {/* Tab 3: Finance Ledger */}
        {activeTab === 'finance' && (
          <section id="section-finance">
            <FinanceSection transactions={transactions} setTransactions={setTransactions} />
          </section>
        )}

        {/* Tab 4: Courts & Rules */}
        {activeTab === 'courts' && (
          <section id="section-courts">
            <CourtsSection />
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white mt-12 border-t border-emerald-900/80 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-emerald-200/90 pb-6 border-b border-emerald-900">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⚽</span>
                <span className="font-bold text-white text-sm">โรงยิมเซปักตะกร้อ สุขสันต์</span>
              </div>
              <p className="text-emerald-300/80 leading-relaxed">
                ส่งเสริมสุขภาพ ความเป็นเลิศทางกีฬาเซปักตะกร้อไทย และพื้นที่ออกกำลังกายสำหรับเยาวชนและประชาชนทั่วไป
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-amber-400 block text-xs uppercase tracking-wider mb-2">
                สิ่งอำนวยความสะดวก
              </span>
              <p>• สนามแข่งขันพื้นยางสังเคราะห์มาตรฐาน Sepaktakraw</p>
              <p>• ตาข่ายและลูกตะกร้อ Marathon คุณภาพสูง</p>
              <p>• ห้องอาบน้ำ ล็อกเกอร์ และที่จอดรถสะดวกสบาย</p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-amber-400 block text-xs uppercase tracking-wider mb-2">
                ติดต่อสอบถาม & จองสนาม
              </span>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>เบอร์โทรศัพท์: 081-234-5678</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>เวลาทำการ: ทุกวัน 08:00 - 21:00 น.</span>
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>ซอยวิภาวดีรังสิต 64 เขตบางเขน กรุงเทพฯ</span>
              </p>
            </div>
          </div>

          <div className="pt-6 text-center text-[11px] text-emerald-400/80">
            © 2026 โรงยิมเซปักตะกร้อ สุขสันต์ (Suksan Sepak Takraw Gym Club) • All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
