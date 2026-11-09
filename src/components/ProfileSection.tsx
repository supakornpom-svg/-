import React, { useState } from 'react';
import { AthleteProfile, TakrawPosition, ExperienceLevel, DominantFoot } from '../types';
import { PRESET_ATHLETES, POSITION_DETAILS } from '../mockData';
import { MemberCard } from './MemberCard';
import { 
  User, Phone, Cake, Trophy, Users, Camera, 
  CheckCircle, Save, Info, RefreshCw, Shirt, Footprints, FileText
} from 'lucide-react';

interface ProfileSectionProps {
  profile: AthleteProfile;
  setProfile: (profile: AthleteProfile) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ profile, setProfile }) => {
  const [formData, setFormData] = useState<AthleteProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string>(profile.id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'jerseyNumber' ? Number(value) : value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData(prev => ({
            ...prev,
            photoUrl: reader.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    localStorage.setItem('takraw_gym_profile', JSON.stringify(formData));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSelectPreset = (preset: AthleteProfile) => {
    setFormData(preset);
    setProfile(preset);
    setActivePresetId(preset.id);
    localStorage.setItem('takraw_gym_profile', JSON.stringify(preset));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const selectedPositionInfo = POSITION_DETAILS[formData.position];

  return (
    <div className="space-y-8">
      {/* Quick Athlete Presets Selector */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-emerald-700" />
          <span className="text-xs font-semibold text-slate-700">สลับข้อมูลนักกีฬาตัวอย่าง:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_ATHLETES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activePresetId === preset.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {preset.name} ({POSITION_DETAILS[preset.position].en.split('/')[0].trim()})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Member Card Display & Photo Upload */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 flex flex-col items-center text-center">
            <h2 className="text-lg font-bold text-emerald-950 mb-1 flex items-center gap-2">
              <User className="w-5 h-5 text-amber-500" />
              <span>บัตรสมาชิกนักกีฬา (Athlete ID)</span>
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              แสดงข้อมูลและรูปถ่ายจริงสำหรับยืนยันตัวตน ณ โรงยิม
            </p>

            {/* Member Card Component */}
            <div className="w-full">
              <MemberCard profile={formData} />
            </div>

            {/* Upload Action */}
            <div className="w-full mt-6 pt-5 border-t border-slate-100 flex flex-col items-center">
              <label 
                htmlFor="photo-upload-input" 
                className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-medium text-xs border border-emerald-200 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <Camera className="w-4 h-4 text-emerald-600" />
                <span>เปลี่ยนรูปถ่ายโปรไฟล์ (Upload Photo)</span>
              </label>
              <input 
                id="photo-upload-input" 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoUpload} 
                className="hidden" 
              />
              <p className="text-[11px] text-slate-400 mt-2">
                รองรับไฟล์ PNG, JPG หรือ WEBP (ขนาดแนะนำ 1:1)
              </p>
            </div>
          </div>

          {/* Position Role Callout */}
          <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-5 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-700 text-white rounded-xl shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-emerald-950">
                  {selectedPositionInfo.title}
                </h4>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  {selectedPositionInfo.role}
                </p>
                <div className="text-[11px] text-emerald-800 pt-1">
                  <span className="font-semibold text-emerald-950">คุณลักษณะสำคัญ: </span>
                  {selectedPositionInfo.keyAttributes}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Edit Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-500" />
                <span>แก้ไขข้อมูลสมาชิกนักกีฬา</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                ข้อมูลนี้จะถูกบันทึกในระบบยิมและซิงค์กับบัตรสมาชิกทันที
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {formData.memberId}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  ชื่อ-นามสกุล <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="เช่น สมชาย ใจดี"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="081-234-5678"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  อายุ (ปี)
                </label>
                <div className="relative">
                  <Cake className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    name="age"
                    min="5"
                    max="99"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Jersey Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  หมายเลขเสื้อ (Jersey #)
                </label>
                <div className="relative">
                  <Shirt className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    name="jerseyNumber"
                    min="1"
                    max="99"
                    value={formData.jerseyNumber}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Position */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  ตำแหน่งการเล่นเซปักตะกร้อ
                </label>
                <div className="relative">
                  <Trophy className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  >
                    <option value="spiker">ตัวฟาด (Spiker / Striker)</option>
                    <option value="setter">ตัวชง / ตัวตั้ง (Setter / Feeder)</option>
                    <option value="tekong">ตัวเสิร์ฟ / หลัง (Tekong / Server)</option>
                    <option value="allrounder">เล่นได้ทุกตำแหน่ง (All-Rounder)</option>
                    <option value="beginner">ผู้เริ่มต้น / ออกกำลังกาย</option>
                  </select>
                </div>
              </div>

              {/* Dominant Foot */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  เท้าข้างที่ถนัด
                </label>
                <div className="relative">
                  <Footprints className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    name="dominantFoot"
                    value={formData.dominantFoot}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  >
                    <option value="right">เท้าขวา (Right Foot)</option>
                    <option value="left">เท้าซ้าย (Left Foot)</option>
                    <option value="both">ถนัดสองเท้า (Ambidextrous)</option>
                  </select>
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  ระดับประสบการณ์
                </label>
                <div className="relative">
                  <Trophy className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  >
                    <option value="beginner">มือใหม่ (Beginner)</option>
                    <option value="intermediate">ระดับกลาง (Intermediate)</option>
                    <option value="advanced">นักกีฬายิม / แข่งขัน (Advanced)</option>
                  </select>
                </div>
              </div>

              {/* Team / Club */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  สังกัดทีม / ชมรม
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="team"
                    value={formData.team}
                    onChange={handleInputChange}
                    placeholder="เช่น ทีมสุขสันต์คลับ"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                </div>
              </div>

            </div>

            {/* Notes / Health conditions */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                บันทึกการฝึกซ้อม / เป้าหมาย
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes || ''}
                  onChange={handleInputChange}
                  placeholder="เช่น ซ้อมสัปดาห์ละ 3 วัน, เน้นฝึกกระโดดฟาดซันแบ็ค"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
            </div>

            {/* Submit & Status */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <div className="h-6">
                {saveSuccess && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 transition-all animate-fade-in">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>บันทึกข้อมูลและอัปเดตบัตรสมาชิกสำเร็จ!</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>บันทึกข้อมูลส่วนตัว</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
