import { AthleteProfile, Court, Transaction, TakrawPosition } from './types';

export const DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="100" fill="%23064e3b"/><circle cx="100" cy="78" r="38" fill="%23f59e0b"/><path d="M42 168c0-32 26-52 58-52s58 20 58 52" fill="%23047857"/><circle cx="100" cy="100" r="88" stroke="%2310b981" stroke-width="6" stroke-dasharray="12 12"/></svg>`;

export const DEFAULT_PROFILE: AthleteProfile = {
  id: 'ath-01',
  name: 'สมชาย ใจดี',
  phone: '081-234-5678',
  age: 25,
  position: 'spiker',
  level: 'beginner',
  team: 'ทีมสุขสันต์คลับ',
  jerseyNumber: 9,
  dominantFoot: 'right',
  memberId: 'STG-2026-042',
  memberSince: '2026-01-15',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
  notes: 'ซ้อมสัปดาห์ละ 3 วัน เน้นฝึกกระโดดฟาดซันแบ็ค (Sunback) และการลงสู่พื้นเซฟหัวเข่า'
};

export const PRESET_ATHLETES: AthleteProfile[] = [
  DEFAULT_PROFILE,
  {
    id: 'ath-02',
    name: 'กิตติศักดิ์ ชัยชนะ',
    phone: '089-876-5432',
    age: 28,
    position: 'tekong',
    level: 'advanced',
    team: 'สุขสันต์ แอร์ฟอร์ซ',
    jerseyNumber: 1,
    dominantFoot: 'right',
    memberId: 'STG-2026-003',
    memberSince: '2025-06-10',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    notes: 'ตัวเสิร์ฟหลังเท้าความเร็วสูง เสิร์ฟตัดหยอดแม่นยำ'
  },
  {
    id: 'ath-03',
    name: 'พรชัย ศรีสุข',
    phone: '086-555-1212',
    age: 23,
    position: 'setter',
    level: 'intermediate',
    team: 'เยาวชนบางเขน ตะกร้อคลับ',
    jerseyNumber: 7,
    dominantFoot: 'both',
    memberId: 'STG-2026-019',
    memberSince: '2025-11-01',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    notes: 'ตัวชงความคล่องตัวสูง ชงลูกได้ทั้งข้างเท้าด้านในและหัวเข่า'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'ค่าเช่าสนาม คอร์ท 1 (2 ชม.)',
    category: 'ค่าเช่าสนาม',
    type: 'income',
    amount: 400,
    date: '2026-11-09 14:30',
    note: 'ทีมบางเขน ซ้อมทีม'
  },
  {
    id: 'tx-2',
    title: 'ซื้อลูกตะกร้อ Marathon 3 ลูก (รุ่นแข่งขัน)',
    category: 'อุปกรณ์ตะกร้อ/ตาข่าย',
    type: 'expense',
    amount: 650,
    date: '2026-11-09 11:15',
    note: 'เบิกของเข้าสต็อกยิม'
  },
  {
    id: 'tx-3',
    title: 'ค่าสมาชิกรายเดือน คุณสมชาย ใจดี',
    category: 'ค่าสมาชิก / รายเดือน',
    type: 'income',
    amount: 1200,
    date: '2026-11-08 16:40',
    note: 'อายุสมาชิก 30 วัน'
  },
  {
    id: 'tx-4',
    title: 'ค่าสอนเทรนเนอร์ คอร์สเสิร์ฟหลังเท้าเดี่ยว (โค้ชวิทย์)',
    category: 'ค่าสอน / เทรนเนอร์',
    type: 'income',
    amount: 800,
    date: '2026-11-08 10:00',
    note: 'คอร์สอบรมเยาวชน'
  },
  {
    id: 'tx-5',
    title: 'เปลี่ยนตาข่ายตะกร้อมาตรฐานแข่งขัน คอร์ท 2',
    category: 'อุปกรณ์ตะกร้อ/ตาข่าย',
    type: 'expense',
    amount: 550,
    date: '2026-11-07 18:20',
    note: 'ตาข่ายเดิมชำรุด'
  },
  {
    id: 'tx-6',
    title: 'ค่าเช่าสนาม คอร์ท 3 (1.5 ชม.)',
    category: 'ค่าเช่าสนาม',
    type: 'income',
    amount: 300,
    date: '2026-11-07 15:00',
    note: 'ซ้อมเดี่ยวกลุ่มเยาวชน'
  },
  {
    id: 'tx-7',
    title: 'บำรุงรักษาระบบไฟสปอตไลท์ LED คอร์ท 1',
    category: 'ค่าน้ำ/ค่าไฟ/ซ่อมบำรุง',
    type: 'expense',
    amount: 420,
    date: '2026-11-06 09:30',
    note: 'เปลี่ยนไดรเวอร์หลอดไฟ'
  }
];

export const INITIAL_COURTS: Court[] = [
  {
    id: 1,
    name: 'คอร์ท 1 (Court A - แข่งขันมาตรฐาน)',
    surface: 'พื้นยางสังเคราะห์มาตรฐาน Sepaktakraw ISO',
    status: 'in_use',
    currentBooking: 'ทีมบางเขน VS ชมรมสุขสันต์ (14:00 - 16:00)',
    hourlyRate: 200
  },
  {
    id: 2,
    name: 'คอร์ท 2 (Court B - ซ้อมแข่งขันในร่ม)',
    surface: 'พื้นไม้ปาร์เก้สปอร์ต รองรับแรงกระแทก',
    status: 'available',
    currentBooking: 'ว่าง - พร้อมลงเล่น',
    hourlyRate: 180
  },
  {
    id: 3,
    name: 'คอร์ท 3 (Court C - คอร์ทฝึกซ้อมเบสิก)',
    surface: 'พื้นยางโพลียูรีเทน สำหรับฝึกเสิร์ฟและแปะตะกร้อ',
    status: 'available',
    currentBooking: 'ว่าง - มีลูกตะกร้อให้ยืม',
    hourlyRate: 150
  }
];

export const POSITION_DETAILS: Record<TakrawPosition, { title: string; en: string; role: string; keyAttributes: string; idealBmi: string }> = {
  spiker: {
    title: 'ตัวฟาด (Spiker / Striker)',
    en: 'Spiker / Striker',
    role: 'ทำคะแนนหน้าเน็ตด้วยลูกฟาดข้ามตาข่าย ทั้งท่าซันแบ็ค (Sunback) และท่าโรลสไปค์ (Roll Spike)',
    keyAttributes: 'พลังกระโดด (Vertical Jump), ความยืดหยุ่นสะโพกและเอว, การทรงตัวขณะลงสู่พื้น',
    idealBmi: '19.5 - 22.2 (ตัวเบาสปริงตัวสูง กล้ามเนื้อขาแข็งแกร่ง)'
  },
  setter: {
    title: 'ตัวชง / ตัวตั้ง (Setter / Feeder)',
    en: 'Setter / Feeder',
    role: 'คุมจังหวะเกม เปิดลูกเสิร์ฟ ตั้งลูกตะกร้อให้นิ่งและได้ระดับความสูงที่ตัวฟาดเข้าทำได้สมบูรณ์',
    keyAttributes: 'สายตาเฉียบคม, การเคลื่อนที่รอบคอร์ท, สมาธิและการควบคุมน้ำหนักเท้า',
    idealBmi: '19.0 - 22.5 (คล่องแคล่ว ปราดเปรียว วิ่งเข้าหาลูกได้ฉับไว)'
  },
  tekong: {
    title: 'ตัวเสิร์ฟ / หลัง (Tekong / Server)',
    en: 'Tekong / Server',
    role: 'ยืนในวงกลมเสิร์ฟ ส่งลูกตะกร้อข้ามเน็ตด้วยความเร็ว แม่นยำ และมีพลังทำลายเกมรับคู่แข่ง',
    keyAttributes: 'ความยาวช่วงขา, แรงเหวี่ยงสะโพก, พลังกล้ามเนื้อต้นขาและข้อเท้า',
    idealBmi: '20.0 - 22.8 (ความสูงได้เปรียบ ฐานล่างมั่นคงตอนเหวี่ยงขาเสิร์ฟ)'
  },
  allrounder: {
    title: 'เล่นได้ทุกตำแหน่ง (All-Rounder)',
    en: 'All-Rounder',
    role: 'สลับสับเปลี่ยนได้ทั้งเสิร์ฟ ชง และขึ้นหน้าเน็ต เป็นกำลังหลักของทีมในทุกสถานการณ์',
    keyAttributes: 'ความฟิตของระบบหัวใจและปอด, ทักษะรอบด้าน, การอ่านเกม',
    idealBmi: '19.5 - 22.5 (ฟิตเนสระดับสูง ความทนทานกล้ามเนื้อรอบด้าน)'
  },
  beginner: {
    title: 'ผู้เริ่มต้น / ออกกำลังกาย',
    en: 'Beginner / Fitness',
    role: 'ฝึกทักษะเบสิกตะกร้อ หลังเท้า ข้างเท้าด้านใน เข่า ศีรษะ และสร้างสุขภาพที่ดี',
    keyAttributes: 'การปรับตัวของข้อต่อ, ความอดทน, การอบอุ่นร่างกายอย่างถูกต้อง',
    idealBmi: '18.5 - 22.9 (เน้นความปลอดภัยและลดแรงกระแทกข้อต่อ)'
  }
};
