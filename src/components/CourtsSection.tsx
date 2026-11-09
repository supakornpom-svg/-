import React, { useState } from 'react';
import { Court } from '../types';
import { INITIAL_COURTS } from '../mockData';
import { ShieldCheck, MapPin, Clock, CheckCircle2, AlertTriangle, Wrench, Sparkles, BookOpen } from 'lucide-react';

export const CourtsSection: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>(() => {
    const saved = localStorage.getItem('takraw_gym_courts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_COURTS;
      }
    }
    return INITIAL_COURTS;
  });

  const toggleStatus = (id: number) => {
    setCourts(prev => {
      const next = prev.map(c => {
        if (c.id === id) {
          const nextStatus = c.status === 'available' ? 'in_use' : c.status === 'in_use' ? 'maintenance' : 'available';
          return {
            ...c,
            status: nextStatus as 'available' | 'in_use' | 'maintenance',
            currentBooking: nextStatus === 'available' ? 'ว่าง - พร้อมลงเล่น' : nextStatus === 'in_use' ? 'มีผู้เล่นกำลังซ้อมทีม' : 'กำลังทำความสะอาดและซ่อมบำรุง'
          };
        }
        return c;
      });
      localStorage.setItem('takraw_gym_courts', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* Intro Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <span>สถานะสนามเซปักตะกร้อ สุขสันต์</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            โรงยิมมี 3 คอร์ทมาตรฐานแข่งขันสมาคมฯ พร้อมไฟสปอตไลท์ LED 500 Lux สำหรับแข่งขันกลางคืน
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>ว่าง</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>กำลังแข่งขัน/ซ้อม</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>ปิดปรับปรุง</span>
          </div>
        </div>
      </div>

      {/* Courts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courts.map((court) => {
          const isAvail = court.status === 'available';
          const isInUse = court.status === 'in_use';

          return (
            <div
              key={court.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 flex flex-col justify-between transition-all hover:border-emerald-500"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      COURT 0{court.id}
                    </span>
                    <h3 className="text-base font-bold text-emerald-950">
                      {court.name}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                    isAvail
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : isInUse
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}>
                    {isAvail ? 'ว่าง' : isInUse ? 'กำลังแข่งขัน' : 'ปิดบำรุง'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-4">
                  {court.surface}
                </p>

                {/* Court mini diagram representation */}
                <div className="w-full h-24 bg-emerald-900 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border-2 border-emerald-950 shadow-inner my-3">
                  {/* Court markings */}
                  <div className="w-full h-full border border-white/60 relative flex items-center justify-center">
                    {/* Net line */}
                    <div className="w-[1px] h-full bg-amber-400"></div>
                    {/* Center Serving circle */}
                    <div className="w-6 h-6 rounded-full border border-white/60 absolute left-4"></div>
                    <div className="w-6 h-6 rounded-full border border-white/60 absolute right-4"></div>
                    {/* Quarter circles */}
                    <div className="w-4 h-4 border-t border-l border-white/60 absolute top-0 left-0"></div>
                    <div className="w-4 h-4 border-b border-l border-white/60 absolute bottom-0 left-0"></div>
                    <div className="w-4 h-4 border-t border-r border-white/60 absolute top-0 right-0"></div>
                    <div className="w-4 h-4 border-b border-r border-white/60 absolute bottom-0 right-0"></div>
                  </div>
                  <div className="absolute text-[10px] font-mono text-emerald-200/60 bg-emerald-950/70 px-2 py-0.5 rounded">
                    13.4m × 6.1m
                  </div>
                </div>

                <div className="space-y-2 mt-4 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">สถานะปัจจุบัน:</span>
                    <span className="font-medium text-slate-900 truncate max-w-[180px]">
                      {court.currentBooking}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">อัตราค่าบริการ:</span>
                    <span className="font-bold text-emerald-700 font-mono tabular-nums">
                      ฿{court.hourlyRate} / ชั่วโมง
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => toggleStatus(court.id)}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isAvail ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>สลับเป็น: กำลังแข่งขัน</span>
                    </>
                  ) : isInUse ? (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>สลับเป็น: ปิดปรับปรุง</span>
                    </>
                  ) : (
                    <>
                      <Wrench className="w-3.5 h-3.5 text-slate-600" />
                      <span>สลับเป็น: ว่างพร้อมเล่น</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gym Equipment & Rule Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Court Standards & Equipment Rental */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>อุปกรณ์ & บริการให้ยืม ณ โรงยิม</span>
          </h3>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-900 block">ลูกตะกร้อ Marathon MT.908 (รุ่นแข่งขัน)</span>
                <span className="text-[11px] text-slate-500">ลูกตะกร้อผิวนุ่ม สปริงตัวตามมาตรฐานสหพันธ์</span>
              </div>
              <span className="font-bold text-emerald-700 font-mono">สมาชิกฟรี / ทั่วไป ฿20</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-900 block">สนับเข่า / สนับข้อศอก (Knee Pads)</span>
                <span className="text-[11px] text-slate-500">ป้องกันแรงกระแทกจากการลงสู่พื้น</span>
              </div>
              <span className="font-bold text-emerald-700 font-mono">฿30 / คู่</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-900 block">รองเท้าตะกร้อ Nanyang / Breaker</span>
                <span className="text-[11px] text-slate-500">พื้นยางดิบ เกาะหนึบ ไม่ลื่น</span>
              </div>
              <span className="font-bold text-emerald-700 font-mono">฿50 / คู่</span>
            </div>
          </div>
        </div>

        {/* Gym Rules */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>กฎระเบียบและข้อปฏิบัติของโรงยิม</span>
          </h3>

          <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
            <li>
              <span className="text-slate-900 font-medium">สวมใส่รองเท้ากีฬาพื้นยาง</span> สำหรับเล่นในร่มเท่านั้น เพื่อถนอมพื้นสนามสังเคราะห์
            </li>
            <li>
              <span className="text-slate-900 font-medium">วอร์มอัพและยืดเหยียดกล้ามเนื้อ</span> อย่างน้อย 10-15 นาทีก่อนเริ่มแข่งขันเพื่อป้องกันการบาดเจ็บ
            </li>
            <li>
              <span className="text-slate-900 font-medium">คืนลูกตะกร้อและอุปกรณ์</span> ไว้ ณ จุดบริการหลังเสร็จสิ้นการซ้อม
            </li>
            <li>
              <span className="text-slate-900 font-medium">ห้ามนำเครื่องดื่มแอลกอฮอล์</span> เข้ามาในบริเวณคอร์ทแข่งขันโดยเด็ดขาด
            </li>
            <li>
              มีห้องอาบน้ำ ล็อกเกอร์เก็บของ และตู้ปฐมพยาบาลเบื้องต้น (First Aid) บริการฟรี
            </li>
          </ul>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>โรงยิมเซปักตะกร้อ สุขสันต์ ซอยวิภาวดี 64 กทม. โทร. 081-234-5678</span>
          </div>
        </div>

      </div>
    </div>
  );
};
