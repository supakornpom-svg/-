import React, { useState, useMemo } from 'react';
import { Transaction, TransactionCategory, TransactionType } from '../types';
import { INITIAL_TRANSACTIONS } from '../mockData';
import { 
  Wallet, ArrowDownLeft, ArrowUpRight, Scale, Plus, 
  Search, Download, Trash2, RotateCcw,
  Check
} from 'lucide-react';

interface FinanceSectionProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const CATEGORIES: TransactionCategory[] = [
  'ค่าเช่าสนาม',
  'ค่าสมาชิก / รายเดือน',
  'ค่าสอน / เทรนเนอร์',
  'อุปกรณ์ตะกร้อ/ตาข่าย',
  'ค่าน้ำ/ค่าไฟ/ซ่อมบำรุง',
  'เครื่องดื่มและสวัสดิการ',
  'อื่นๆ'
];

export const FinanceSection: React.FC<FinanceSectionProps> = ({ transactions, setTransactions }) => {
  // Form State
  const [type, setType] = useState<TransactionType>('income');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('ค่าเช่าสนาม');
  const [amount, setAmount] = useState<number | ''>('');
  const [note, setNote] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  // Search & Filter State
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculations
  const { totalIncome, totalExpense, netBalance } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    transactions.forEach(t => {
      if (t.type === 'income') inc += t.amount;
      else exp += t.amount;
    });
    return {
      totalIncome: inc,
      totalExpense: exp,
      netBalance: inc - exp
    };
  }, [transactions]);

  // Filtered List
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchType = filterType === 'all' || t.type === filterType;
      const matchCategory = filterCategory === 'all' || t.category === filterCategory;
      const matchSearch = searchQuery.trim() === '' || 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.note && t.note.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchType && matchCategory && matchSearch;
    });
  }, [transactions, filterType, filterCategory, searchQuery]);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(amount);
    if (!title.trim() || !val || val <= 0) return;

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTx: Transaction = {
      id: Date.now().toString(),
      title: title.trim(),
      category,
      type,
      amount: val,
      date: dateStr,
      note: note.trim() ? note.trim() : undefined
    };

    const updated = [newTx, ...transactions];
    setTransactions(updated);
    localStorage.setItem('takraw_gym_transactions', JSON.stringify(updated));

    // Reset Form
    setTitle('');
    setAmount('');
    setNote('');
    setAddSuccess(true);
    setTimeout(() => setAddSuccess(false), 2500);
  };

  const handleDelete = (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    localStorage.setItem('takraw_gym_transactions', JSON.stringify(updated));
  };

  const handleResetDemoData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    localStorage.setItem('takraw_gym_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
  };

  const handleClearAll = () => {
    if (confirm('คุณต้องการลบรายการทั้งหมดใช่หรือไม่?')) {
      setTransactions([]);
      localStorage.setItem('takraw_gym_transactions', JSON.stringify([]));
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'วันที่', 'ประเภท', 'หมวดหมู่', 'รายละเอียด', 'จำนวนเงิน(บาท)', 'หมายเหตุ'];
    const rows = filteredTransactions.map(t => [
      t.id,
      t.date,
      t.type === 'income' ? 'รายรับ' : 'รายจ่าย',
      `"${t.category}"`,
      `"${t.title.replace(/"/g, '""')}"`,
      t.amount,
      `"${(t.note || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `suksan_takraw_finance_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* 3 Summary Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Income Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              รายรับรวม (Total Income)
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 font-mono tabular-nums">
              ฿{totalIncome.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
            </h3>
            <span className="text-[11px] text-emerald-700/80 mt-1 block">
              จากค่าเช่าสนาม & ค่าสมาชิก
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-200 shrink-0">
            <ArrowDownLeft className="w-6 h-6" />
          </div>
        </div>

        {/* Expense Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              รายจ่ายรวม (Total Expense)
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-rose-600 mt-1 font-mono tabular-nums">
              ฿{totalExpense.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
            </h3>
            <span className="text-[11px] text-rose-700/80 mt-1 block">
              ค่าอุปกรณ์ตะกร้อ & บำรุงรักษา
            </span>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center border border-rose-200 shrink-0">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              คงเหลือสุทธิ / กำไร
            </p>
            <h3 className={`text-2xl sm:text-3xl font-black mt-1 font-mono tabular-nums ${
              netBalance >= 0 ? 'text-emerald-950' : 'text-rose-600'
            }`}>
              ฿{netBalance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
            </h3>
            <span className="text-[11px] text-slate-500 mt-1 block">
              สถานะการเงินโรงยิม
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-200 shrink-0">
            <Scale className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Grid: Form on Left, History Table on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Add Transaction Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7">
          <div className="pb-4 mb-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-500" />
              <span>บันทึกรายการบัญชียิม</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              เพิ่มรายการรายรับจากค่าสนาม/สมาชิก หรือรายจ่ายอุปกรณ์ยิม
            </p>
          </div>

          <form onSubmit={handleAddTransaction} className="space-y-4">
            {/* Transaction Type Radio */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                ประเภทรายการ
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => { setType('income'); setCategory('ค่าเช่าสนาม'); }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    type === 'income'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-400 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                  <span>รายรับ (Income)</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setType('expense'); setCategory('อุปกรณ์ตะกร้อ/ตาข่าย'); }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    type === 'expense'
                      ? 'bg-rose-50 text-rose-800 border-rose-400 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4 text-rose-600" />
                  <span>รายจ่าย (Expense)</span>
                </button>
              </div>
            </div>

            {/* Title / Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                รายละเอียดรายการ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="เช่น ค่าเช่าสนามคอร์ท 1 (2 ชม.), ลูกตะกร้อ Marathon"
                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                หมวดหมู่รายการ
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                จำนวนเงิน (บาท / THB) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">฿</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-xl text-base font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition tabular-nums"
                />
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                หมายเหตุเพิ่มเติม (ถ้ามี)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="เช่น ผู้ชำระ: ทีมบางเขน, ใบเสร็จเล่มที่ 04"
                className="w-full px-3.5 py-2 bg-slate-50/50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>บันทึกรายการ</span>
            </button>

            {addSuccess && (
              <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>เพิ่มรายการสำเร็จแล้ว!</span>
              </div>
            )}
          </form>

          {/* Quick presets for gym expenses */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2">
              รายการที่พบบ่อย (คลิกเพื่อเติมด่วน):
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setType('income');
                  setTitle('ค่าเช่าสนาม คอร์ท 1 (1 ชม.)');
                  setCategory('ค่าเช่าสนาม');
                  setAmount(200);
                }}
                className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
              >
                + ค่าเช่าสนาม 1 ชม. (฿200)
              </button>
              <button
                type="button"
                onClick={() => {
                  setType('expense');
                  setTitle('ซื้อลูกตะกร้อ Marathon 1 ลูก');
                  setCategory('อุปกรณ์ตะกร้อ/ตาข่าย');
                  setAmount(220);
                }}
                className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
              >
                - ซื้อลูกตะกร้อ 1 ลูก (฿220)
              </button>
              <button
                type="button"
                onClick={() => {
                  setType('income');
                  setTitle('ค่าสมาชิกรายเดือน (สมาชิกใหม่)');
                  setCategory('ค่าสมาชิก / รายเดือน');
                  setAmount(1200);
                }}
                className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
              >
                + ค่าสมาชิก 1 เดือน (฿1,200)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Ledger Table & Filters */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-5">
          
          {/* Header & Export Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-amber-500" />
                <span>ประวัติรายการรายรับ-รายจ่าย</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                แสดงผล {filteredTransactions.length} จากทั้งหมด {transactions.length} รายการ
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="ดาวน์โหลดไฟล์ Excel/CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ส่งออก CSV</span>
              </button>
              <button
                onClick={handleResetDemoData}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
                title="รีเซ็ตเป็นข้อมูลตัวอย่างเริ่มต้น"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>รีเซ็ตตัวอย่าง</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหารายการ..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
            </div>

            {/* Type Filter Buttons */}
            <div className="sm:col-span-4 flex rounded-xl bg-slate-100 p-0.5 border border-slate-200">
              <button
                onClick={() => setFilterType('all')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  filterType === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ทั้งหมด
              </button>
              <button
                onClick={() => setFilterType('income')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  filterType === 'income' ? 'bg-white text-emerald-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                รายรับ
              </button>
              <button
                onClick={() => setFilterType('expense')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  filterType === 'expense' ? 'bg-white text-rose-700 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                รายจ่าย
              </button>
            </div>

            {/* Category Filter */}
            <div className="sm:col-span-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
              >
                <option value="all">ทุกหมวดหมู่</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="text-[11px] uppercase bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3.5">รายการ / วันที่</th>
                  <th className="py-3 px-3">หมวดหมู่</th>
                  <th className="py-3 px-3.5 text-right">จำนวนเงิน</th>
                  <th className="py-3 px-3 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      <Wallet className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="text-sm">ไม่พบข้อมูลรายการที่ตรงกับเงื่อนไข</p>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3.5">
                        <div className="font-semibold text-slate-900 leading-snug">
                          {tx.title}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span>{tx.date}</span>
                          {tx.note && (
                            <>
                              <span>·</span>
                              <span className="italic truncate max-w-[160px] sm:max-w-[240px]">{tx.note}</span>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="inline-block text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          {tx.category}
                        </span>
                      </td>

                      <td className="py-3 px-3.5 text-right font-bold text-sm font-mono tabular-nums">
                        {tx.type === 'income' ? (
                          <span className="text-emerald-600">
                            +฿{tx.amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                          </span>
                        ) : (
                          <span className="text-rose-600">
                            -฿{tx.amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleDelete(tx.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="ลบรายการนี้"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Table Summary */}
          {transactions.length > 0 && (
            <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
              <span className="tabular-nums">
                รวมแสดงผล {filteredTransactions.length} รายการ
              </span>
              <button
                onClick={handleClearAll}
                className="text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ล้างประวัติทั้งหมด</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
