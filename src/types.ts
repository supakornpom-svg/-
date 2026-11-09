export type TakrawPosition = 
  | 'spiker' 
  | 'setter' 
  | 'tekong' 
  | 'allrounder' 
  | 'beginner';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type DominantFoot = 'right' | 'left' | 'both';

export interface AthleteProfile {
  id: string;
  name: string;
  phone: string;
  age: number;
  position: TakrawPosition;
  level: ExperienceLevel;
  team: string;
  jerseyNumber: number;
  dominantFoot: DominantFoot;
  memberId: string;
  memberSince: string;
  photoUrl: string;
  notes?: string;
}

export interface BMIRecord {
  id: string;
  weight: number;
  height: number;
  bmi: number;
  category: string;
  date: string;
  position: TakrawPosition;
}

export type TransactionType = 'income' | 'expense';

export type TransactionCategory = 
  | 'ค่าเช่าสนาม'
  | 'ค่าสมาชิก / รายเดือน'
  | 'ค่าสอน / เทรนเนอร์'
  | 'อุปกรณ์ตะกร้อ/ตาข่าย'
  | 'ค่าน้ำ/ค่าไฟ/ซ่อมบำรุง'
  | 'เครื่องดื่มและสวัสดิการ'
  | 'อื่นๆ';

export interface Transaction {
  id: string;
  title: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
  date: string;
  note?: string;
}

export interface Court {
  id: number;
  name: string;
  surface: string;
  status: 'available' | 'in_use' | 'maintenance';
  currentBooking?: string;
  hourlyRate: number;
}
