import React, { useRef } from 'react';
import { AthleteProfile } from '../types';
import { POSITION_DETAILS } from '../mockData';
import { QrCode, Sparkles, Printer, Award, Footprints } from 'lucide-react';

interface MemberCardProps {
  profile: AthleteProfile;
}

export const MemberCard: React.FC<MemberCardProps> = ({ profile }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const positionInfo = POSITION_DETAILS[profile.position] || POSITION_DETAILS.spiker;

  const handlePrint = () => {
    window.print();
  };

  const levelColor = {
    beginner: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    intermediate: 'bg-amber-50 text-amber-800 border-amber-300',
    advanced: 'bg-purple-50 text-purple-800 border-purple-300'
  }[profile.level];

  const levelText = {
    beginner: 'มือใหม่ (Beginner)',
    intermediate: 'ระดับกลาง (Intermediate)',
    advanced: 'นักกีฬาแข่งขัน (Advanced)'
  }[profile.level];

  const footText = {
    right: 'เท้าขวา (Right Foot)',
    left: 'เท้าซ้าย (Left Foot)',
    both: 'ถนัดสองเท้า (Ambidextrous)'
  }[profile.dominantFoot];

  return (
    <div className="flex flex-col items-center">
      {/* Visual Badge Card */}
      <div
        ref={cardRef}
        id="athlete-member-card"
        className="relative w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 border-2 border-amber-400/50 backdrop-blur-md transition-all hover:shadow-emerald-900/40"
      >
        {/* Decorative Court Markings Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="takraw-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="14" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="3 3"/>
                <path d="M0 20h40M20 0v40" stroke="#fff" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#takraw-grid)"/>
          </svg>
        </div>

        {/* Card Header */}
        <div className="relative flex items-center justify-between pb-4 border-b border-emerald-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-emerald-950 font-black text-xl shadow-inner border border-amber-200">
              ⚽
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide text-white leading-tight">
                โรงยิมเซปักตะกร้อ สุขสันต์
              </h3>
              <p className="text-[10px] text-amber-300 font-medium tracking-wider uppercase">
                Official Athlete Pass
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-300 block">ID NO.</span>
            <span className="font-mono text-xs font-bold text-amber-300">{profile.memberId}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="relative mt-5 flex gap-4 items-center">
          {/* Avatar with Gold Trim */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg bg-emerald-950 flex items-center justify-center">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80';
                }}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Jersey Number Tag */}
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-emerald-950 font-black text-xs px-2 py-0.5 rounded-md shadow-md border border-amber-200">
              #{profile.jerseyNumber}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-bold text-white truncate leading-snug">
              {profile.name}
            </h4>
            <p className="text-xs text-amber-300 font-semibold mb-2">
              {positionInfo.title}
            </p>

            <div className="space-y-1 text-[11px] text-emerald-200">
              <div className="flex items-center gap-1.5 truncate">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-emerald-300">สังกัด:</span>
                <span className="font-medium text-white truncate">{profile.team || 'อิสระ'}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <Footprints className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-emerald-300">ถนัด:</span>
                <span className="font-medium text-white">{footText}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-emerald-300">อายุ:</span>
                <span className="font-medium text-white">{profile.age} ปี</span>
              </div>
            </div>
          </div>
        </div>

        {/* Level Tag & Micro Info */}
        <div className="relative mt-5 pt-3 border-t border-emerald-700/50 flex items-center justify-between">
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${levelColor}`}>
              {levelText}
            </span>
          </div>

          {/* QR Code and Chip Emulation */}
          <div className="flex items-center gap-2">
            <div className="text-[9px] text-emerald-300 text-right leading-tight">
              <span>สถานะ: </span>
              <span className="text-amber-300 font-bold">ใช้งานได้</span>
              <div className="text-[8px] text-emerald-400">เข้ายิมอัตโนมัติ</div>
            </div>
            <div className="w-8 h-8 bg-white p-0.5 rounded shadow flex items-center justify-center">
              <QrCode className="w-full h-full text-emerald-950" />
            </div>
          </div>
        </div>

        {/* Card Subtle Bottom Bar */}
        <div className="relative mt-3 text-[9px] text-center text-emerald-400/80 font-mono tracking-wider">
          SUKSAN SEPAK TAKRAW GYM • EST. 2026 • MEMBER PASS
        </div>
      </div>

      {/* Actions under card */}
      <div className="mt-4 flex items-center gap-3 no-print">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-amber-400" />
          <span>พิมพ์บัตร / บันทึกเป็น PDF</span>
        </button>
      </div>
    </div>
  );
};
