import React, { useState } from 'react';
import { BMIRecord, TakrawPosition } from '../types';
import { POSITION_DETAILS } from '../mockData';
import { 
  Calculator, Zap, Scale, Ruler, HeartPulse, Activity, 
  Sparkles, ShieldAlert, Award, Clock, Trash2, ArrowUpRight
} from 'lucide-react';

interface BMISectionProps {
  currentPosition: TakrawPosition;
}

export const BMISection: React.FC<BMISectionProps> = ({ currentPosition }) => {
  const [weight, setWeight] = useState<number | ''>(65.5);
  const [height, setHeight] = useState<number | ''>(172);
  const [selectedPos, setSelectedPos] = useState<TakrawPosition>(currentPosition);
  const [history, setHistory] = useState<BMIRecord[]>(() => {
    const saved = localStorage.getItem('takraw_bmi_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: '1',
        weight: 65.5,
        height: 172,
        bmi: 22.1,
        category: 'น้ำหนักปกติ สมส่วน (ระดับนักกีฬา)',
        date: '2026-11-09 10:15',
        position: 'spiker'
      }
    ];
  });

  const [activeResult, setActiveResult] = useState<{
    bmi: number;
    category: string;
    categoryType: 'under' | 'normal' | 'over' | 'obese';
    agilityAdvice: string;
    nutritionAdvice: string;
    jointAdvice: string;
  } | null>(() => {
    // Initial calculation for 65.5kg and 172cm
    const hM = 172 / 100;
    const b = +(65.5 / (hM * hM)).toFixed(1);
    return getBMIEvaluation(b, 'spiker');
  });

  function getBMIEvaluation(bmi: number, pos: TakrawPosition) {
    if (bmi < 18.5) {
      return {
        bmi,
        category: 'น้ำหนักน้อยกว่าเกณฑ์ (ผอม)',
        categoryType: 'under' as const,
        agilityAdvice: `ตัวเบาสปริงตัวได้ดี แต่ขาดมวลกล้ามเนื้อแกนกลางและต้นขา ทำให้แรงส่งลูกฟาด (${POSITION_DETAILS[pos].en.includes('Spiker') ? 'Sunback/Roll Spike' : 'ลูกเสิร์ฟ/ชง'}) ขาดพลังความหนักหน่วง`,
        nutritionAdvice: 'เพิ่มสารอาหารประเภทโปรตีนคุณภาพสูง (ไข่ต้ม อกไก่ ถั่ว และนม) พร้อมคาร์โบไฮเดรตเชิงซ้อนเพื่อสร้างกล้ามเนื้อและเพิ่มพลังงานสำรอง',
        jointAdvice: 'แรงกระแทกข้อต่อต่ำ แต่อาจเกิดอาการล้าของกล้ามเนื้อได้ง่ายเมื่อเล่นเกมยาว 3 เซ็ต'
      };
    } else if (bmi >= 18.5 && bmi <= 22.9) {
      return {
        bmi,
        category: 'น้ำหนักปกติ สมส่วน (ระดับนักกีฬาตะกร้อสมบูรณ์แบบ)',
        categoryType: 'normal' as const,
        agilityAdvice: `ดัชนีมวลกายอยู่ในช่วง Golden Ratio สำหรับนักกีฬาเซปักตะกร้อ! คล่องตัวสูง สามารถเทคตัวกระโดดม้วนฟาดและลงสู่พื้นได้อย่างสมดุล`,
        nutritionAdvice: 'รักษาสมดุลพลังงานและสารอาหาร ดื่มน้ำผสมเกลือแร่ทั้งก่อน ระหว่าง และหลังการซ้อม เพื่อป้องกันตะคริวในเกมที่เข้มข้น',
        jointAdvice: 'ข้อเข่าและข้อเท้ากระจายแรงกระแทกได้ดีเยี่ยม แนะนำฝึกยืดเหยียดเอ็นร้อยหวายและสะโพกสม่ำเสมอ'
      };
    } else if (bmi >= 23.0 && bmi <= 24.9) {
      return {
        bmi,
        category: 'น้ำหนักเกินเกณฑ์เล็กน้อย (ท้วม / ควรระวัง)',
        categoryType: 'over' as const,
        agilityAdvice: 'ความเร็วในการพุ่งตัวรับลูกและสปีดการเทคตัวอาจลดลงเล็กน้อย และข้อเข่าต้องรับแรงเหวี่ยงมากขึ้นขณะลงสู่พื้น',
        nutritionAdvice: 'ลดปริมาณอาหารหวาน เครื่องดื่มชูกำลังที่มีน้ำตาลสูง และอาหารทอด เพิ่มสัดส่วนผักใบเขียวและไฟเบอร์เพื่อเพิ่มความกระชับ',
        jointAdvice: 'ควรใช้สนับเข่า (Knee Support) และหลีกเลี่ยงการลงสู่พื้นด้วยขาข้างเดียวเต็มน้ำหนัก'
      };
    } else {
      return {
        bmi,
        category: 'เริ่มมีภาวะน้ำหนักเกิน / เสี่ยงต่อข้อต่อ',
        categoryType: 'obese' as const,
        agilityAdvice: 'มีผลต่อความคล่องตัวในสนามและการหมุนตัวกลางอากาศอย่างชัดเจน เสี่ยงต่อการบาดเจ็บเอ็นไขว้หน้า (ACL) หากกระโดดลงผิดจังหวะ',
        nutritionAdvice: 'ควบคุมแคลอรีต่อวัน ปรึกษาเทรนเนอร์ในการจัดสัดส่วนมื้ออาหาร เน้นการเผาผลาญไขมันควบคู่กับการรักษาความแข็งแรงของกล้ามเนื้อ',
        jointAdvice: 'เน้นการฝึกแปะตะกร้อบนพื้นราบและการซ้อมเบสิก ยังไม่แนะนำให้ฝึกกระโดดฟาดแบบรุนแรงจนกว่าน้ำหนักตัวจะลดลงสู่เกณฑ์ปลอดภัย'
      };
    }
  }

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const w = Number(weight);
    const h = Number(height);
    if (!w || !h || w <= 0 || h <= 0) return;

    const heightM = h / 100;
    const bmiVal = +(w / (heightM * heightM)).toFixed(1);
    const evaluation = getBMIEvaluation(bmiVal, selectedPos);
    setActiveResult(evaluation);

    // Save to history
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newRecord: BMIRecord = {
      id: Date.now().toString(),
      weight: w,
      height: h,
      bmi: bmiVal,
      category: evaluation.category,
      date: dateStr,
      position: selectedPos
    };

    const updatedHistory = [newRecord, ...history.slice(0, 9)];
    setHistory(updatedHistory);
    localStorage.setItem('takraw_bmi_history', JSON.stringify(updatedHistory));
  };

  const applyPreset = (w: number, h: number, pos: TakrawPosition) => {
    setWeight(w);
    setHeight(h);
    setSelectedPos(pos);
    const heightM = h / 100;
    const bmiVal = +(w / (heightM * heightM)).toFixed(1);
    setActiveResult(getBMIEvaluation(bmiVal, pos));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('takraw_bmi_history');
  };

  return (
    <div className="space-y-8">
      {/* Athletic Presets */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold text-slate-700">ตัวอย่างสรีระนักกีฬาตะกร้อ:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset(68, 178, 'spiker')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
          >
            ตัวฟาด (178 ซม. / 68 กก.)
          </button>
          <button
            onClick={() => applyPreset(73, 184, 'tekong')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors cursor-pointer"
          >
            ตัวเสิร์ฟ (184 ซม. / 73 กก.)
          </button>
          <button
            onClick={() => applyPreset(62, 171, 'setter')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 transition-colors cursor-pointer"
          >
            ตัวชง (171 ซม. / 62 กก.)
          </button>
          <button
            onClick={() => applyPreset(84, 169, 'beginner')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
          >
            ผู้เริ่มฝึก / น้ำหนักเกิน (169 ซม. / 84 กก.)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7">
          <div className="pb-4 mb-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-500" />
              <span>คำนวณ BMI สำหรับนักตะกร้อ</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              ประเมินความพร้อมของร่างกาย แรงสปริงตัว และการเซฟข้อเข่าในการเล่นตะกร้อ
            </p>
          </div>

          <form onSubmit={handleCalculate} className="space-y-5">
            {/* Weight Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  น้ำหนักตัว (กิโลกรัม / kg)
                </label>
                <div className="flex gap-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setWeight(prev => Math.max(30, +(Number(prev) - 0.5).toFixed(1)))}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium cursor-pointer"
                  >
                    -0.5
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeight(prev => +(Number(prev) + 0.5).toFixed(1))}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium cursor-pointer"
                  >
                    +0.5
                  </button>
                </div>
              </div>
              <div className="relative">
                <Scale className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="number"
                  step="0.1"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="เช่น 65.5"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-base font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition tabular-nums"
                />
              </div>
            </div>

            {/* Height Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  ส่วนสูง (เซนติเมตร / cm)
                </label>
                <div className="flex gap-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setHeight(prev => Math.max(100, +(Number(prev) - 1).toFixed(0)))}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium cursor-pointer"
                  >
                    -1
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeight(prev => +(Number(prev) + 1).toFixed(0))}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium cursor-pointer"
                  >
                    +1
                  </button>
                </div>
              </div>
              <div className="relative">
                <Ruler className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="number"
                  step="0.5"
                  required
                  value={height}
                  onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="เช่น 172"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-base font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition tabular-nums"
                />
              </div>
            </div>

            {/* Position Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                ตำแหน่งที่เล่น (เพื่อวิเคราะห์สมรรถภาพเฉพาะทาง)
              </label>
              <select
                value={selectedPos}
                onChange={(e) => setSelectedPos(e.target.value as TakrawPosition)}
                className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              >
                <option value="spiker">ตัวฟาด (Spiker / Striker)</option>
                <option value="setter">ตัวชง / ตัวตั้ง (Setter / Feeder)</option>
                <option value="tekong">ตัวเสิร์ฟ / หลัง (Tekong / Server)</option>
                <option value="allrounder">เล่นได้ทุกตำแหน่ง (All-Rounder)</option>
                <option value="beginner">ผู้เริ่มต้น / ออกกำลังกาย</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Zap className="w-4 h-4" />
              <span>คำนวณผลและวิเคราะห์สมรรถภาพ</span>
            </button>
          </form>

          {/* Asian Standard Scale Legend */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-xs font-semibold text-slate-600 mb-2.5">
              เกณฑ์มาตรฐาน BMI สำหรับประชากรเอเชีย:
            </h4>
            <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-medium">
              <div className="p-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200">
                &lt; 18.5<br />
                <span className="font-bold">ผอม</span>
              </div>
              <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-300 font-bold">
                18.5 - 22.9<br />
                <span>สมส่วนนักกีฬา</span>
              </div>
              <div className="p-2 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
                23.0 - 24.9<br />
                <span className="font-bold">ท้วม</span>
              </div>
              <div className="p-2 bg-rose-50 text-rose-800 rounded-lg border border-rose-200">
                &ge; 25.0<br />
                <span className="font-bold">อ้วน</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Analysis Output */}
        <div className="lg:col-span-7 space-y-6">
          {activeResult && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-6">
              
              {/* BMI Big Score Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200/80 gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    ค่าดัชนีมวลกายของคุณ (BMI Score)
                  </span>
                  <div className="text-5xl font-black text-emerald-950 my-1 font-mono tabular-nums">
                    {activeResult.bmi}
                  </div>
                  <div className={`text-sm font-bold ${
                    activeResult.categoryType === 'normal'
                      ? 'text-emerald-700'
                      : activeResult.categoryType === 'under'
                      ? 'text-blue-600'
                      : activeResult.categoryType === 'over'
                      ? 'text-amber-600'
                      : 'text-rose-600'
                  }`}>
                    {activeResult.category}
                  </div>
                </div>

                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0 border ${
                  activeResult.categoryType === 'normal'
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                    : activeResult.categoryType === 'under'
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : activeResult.categoryType === 'over'
                    ? 'bg-amber-100 text-amber-700 border-amber-300'
                    : 'bg-rose-100 text-rose-700 border-rose-300'
                }`}>
                  {activeResult.categoryType === 'normal' ? (
                    <Award className="w-10 h-10" />
                  ) : activeResult.categoryType === 'under' ? (
                    <HeartPulse className="w-10 h-10" />
                  ) : activeResult.categoryType === 'over' ? (
                    <Activity className="w-10 h-10" />
                  ) : (
                    <ShieldAlert className="w-10 h-10" />
                  )}
                </div>
              </div>

              {/* Takraw Performance Cards */}
              <div className="space-y-4">
                
                {/* Agility & Spiking */}
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <h4 className="font-bold text-emerald-950 flex items-center gap-2 text-sm mb-1.5">
                    <Zap className="w-4 h-4 text-emerald-700" />
                    <span>คำแนะนำด้านความคล่องตัวและแรงสปริงตัว (Takraw Agility):</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                    {activeResult.agilityAdvice}
                  </p>
                </div>

                {/* Nutrition */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <h4 className="font-bold text-amber-950 flex items-center gap-2 text-sm mb-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>คำแนะนำโภชนาการนักกีฬาตะกร้อ (Athletic Nutrition):</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                    {activeResult.nutritionAdvice}
                  </p>
                </div>

                {/* Knee & Joint Longevity */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm mb-1.5">
                    <HeartPulse className="w-4 h-4 text-slate-600" />
                    <span>การดูแลข้อต่อและหัวเข่า (Joint Safety & Landing):</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activeResult.jointAdvice}
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* History Log */}
          {history.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>ประวัติการคำนวณล่าสุด ({history.length} รายการ)</span>
                </div>
                <button
                  onClick={clearHistory}
                  className="text-[11px] text-slate-400 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>ล้างประวัติ</span>
                </button>
              </div>

              <div className="space-y-2">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100/80 transition-colors text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {item.bmi}
                      </span>
                      <div>
                        <div className="font-medium text-slate-800">
                          {item.weight} กก. · {item.height} ซม.
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.date}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setWeight(item.weight);
                        setHeight(item.height);
                        setSelectedPos(item.position);
                        setActiveResult(getBMIEvaluation(item.bmi, item.position));
                      }}
                      className="text-emerald-700 hover:text-emerald-900 font-medium text-[11px] flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>ดูผล</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
