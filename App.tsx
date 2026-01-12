
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Camera, 
  ArrowLeft, 
  User, 
  ShoppingBag, 
  AlertCircle, 
  AlertTriangle,
  Globe, 
  Lock,
  Info, 
  Activity, 
  History, 
  Coins, 
  Layers, 
  Printer, 
  Database, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  Settings, 
  Edit3, 
  CheckCircle2, 
  Clock
} from 'lucide-react';

const App: React.FC = () => {
  const [isScreenshotMode, setIsScreenshotMode] = useState(false);
  const [activeCycle, setActiveCycle] = useState<'1' | '23'>('1');
  
  const [formData, setFormData] = useState({
    name: 'KEN',
    bank: 'BANK BRI',
    accNumber: '015282821745153',
    contractCode: 'C79F-1T70-5QLL',
    withdrawalAmount: '50.000.000',
    systemRequired: '50.000.000',
    recoveryAmount: '17.560.000',
    workingBalance: '0',
    totalFrequency: '3',
    manualAnalysis: '', // Akan diisi otomatis oleh useEffect
    manualNotes: ''
  });

  // Logika otomatis untuk membedakan keterangan berdasarkan modul
  useEffect(() => {
    if (activeCycle === '1') {
      setFormData(prev => ({
        ...prev,
        manualAnalysis: 'SISTEM MENDETEKSI ADANYA PENARIKAN YANG TIDAK VALID YANG MENYEBABKAN AKUN MENJADI CRASH DATA.\n\nPROTOKOL PEMULIHAN WAJIB DIJALANKAN UNTUK MENYINKRONKAN ULANG SELURUH LOG TRANSAKSI PADA DATABASE PUSAT DAN MEMVALIDASI INTEGRITAS SALDO ANGGOTA.',
        manualNotes: 'AKUN MEMBUTUHKAN SINKRONISASI DATABASE MANUAL SEGERA.'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        manualAnalysis: `Selamat! Proses Pemulihan Sistem Anda Telah Memasuki Tahap Frekuensi 1\n\nRincian Pemulihan:\nBiaya Isi Ulang per Frekuensi: Rp ${formData.recoveryAmount}\n\n📊 Status Pemulihan:\n• ✅ Frekuensi 1: Sudah dibayar Rp ${formData.recoveryAmount} Selesai\n• ❌ Frekuensi 2: Belum dibayar Rp ${formData.recoveryAmount} Belum Selesai\n• ❌ Frekuensi 3: Belum dibayar Rp ${formData.recoveryAmount} Belum Selesai\n\nSeluruh dana akan terakumulasi secara otomatis setelah sinkronisasi frekuensi selesai dilakukan.`,
        manualNotes: 'SINKRONISASI DATABASE SEDANG BERJALAN. HARAP SELESAIKAN SELURUH TAHAPAN FREKUENSI UNTUK MEMBUKA AKSES PENARIKAN.'
      }));
    }
  }, [activeCycle, formData.recoveryAmount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const parseValue = (val: string) => {
    if (!val) return 0;
    return parseInt(val.toString().replace(/\./g, '')) || 0;
  };

  const results = useMemo(() => {
    const recoveryPerUnit = parseValue(formData.recoveryAmount);
    const workingAccountBalance = parseValue(formData.workingBalance);

    const multiplier = activeCycle === '23' ? 2 : 1;
    const paymentThisCycle = recoveryPerUnit * multiplier;
    const commission = paymentThisCycle * 0.5;
    const totalAccumulated = workingAccountBalance + paymentThisCycle + commission;

    return {
      payment: paymentThisCycle.toLocaleString('id-ID'),
      commission: commission.toLocaleString('id-ID'),
      working: workingAccountBalance.toLocaleString('id-ID'),
      total: totalAccumulated.toLocaleString('id-ID'),
      cycleLabel: activeCycle === '1' ? formData.totalFrequency : `2 + ${formData.totalFrequency} (GABUNGAN)`,
      status: activeCycle === '23' ? 'SIAP UNTUK PENARIKAN DANA' : 'SIAP UNTUK PEMULIHAN AKUN'
    };
  }, [activeCycle, formData]);

  const triggerScreenshotView = () => {
    setIsScreenshotMode(true);
  };

  const ReportDashboard = () => (
    <div id="print-area" className="bg-[#fcfcfc] w-[1508px] h-[800px] flex flex-col font-['Inter'] text-black relative p-8 border-[1px] border-black/5 shadow-2xl overflow-hidden mx-auto box-border transition-all duration-500">
      <header className="bg-white px-10 py-4 z-30 w-full shadow-sm mb-6 border border-black/5 rounded-sm flex flex-col items-center relative">
        <div className="w-full flex justify-between items-center mb-1 absolute top-4 left-0 px-10">
           <div className="flex flex-col gap-1 opacity-40">
              <span className="text-[9px] uppercase tracking-[0.5em] font-black">EST. 1975 / MILANO</span>
              <div className="flex items-center gap-2">
                <Globe size={10} />
                <span className="text-[8px] font-black uppercase tracking-widest">PROTOKOL KEAMANAN GA-V3.2</span>
              </div>
           </div>
           <div className="flex gap-6 opacity-25">
              <ShoppingBag size={20} />
              <User size={20} />
           </div>
        </div>
        <div className="text-center w-full mt-2">
          <h1 className="text-[3.5rem] font-serif tracking-[0.45em] mr-[-0.45em] luxury-font font-bold text-black leading-tight select-none uppercase">
            GIORGIO ARMANI
          </h1>
        </div>
        <nav className="flex justify-center gap-16 text-[10px] font-black uppercase tracking-[0.4em] text-black/40 pt-2">
          <span>KOLEKSI</span>
          <span>LAYANAN</span>
          <span className="text-black border-b border-black pb-0.5">STATUS AKUN</span>
          <span>PRIVASI</span>
        </nav>
      </header>

      <div className="flex flex-col gap-5 flex-1 z-10 overflow-hidden">
        <div className="grid grid-cols-12 gap-5 h-[120px]">
          <div className="col-span-12 bg-white p-5 rounded-sm border-l-[8px] border-black shadow-md flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <ShieldCheck size={70} />
            </div>
            <div className="flex items-center gap-8">
               <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg shrink-0">
                  <User size={28} className="text-white" />
               </div>
               <div className="grid grid-cols-4 gap-x-10">
                  <div className="flex flex-col">
                    <span className="text-[8px] opacity-40 font-black uppercase tracking-[0.2em] mb-1">Pemilik Akun</span>
                    <span className="text-base font-black uppercase truncate max-w-[180px]">{formData.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] opacity-40 font-black uppercase tracking-[0.2em] mb-1">Bank Penerima</span>
                    <span className="text-base font-black uppercase truncate max-w-[180px]">{formData.bank}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] opacity-40 font-black uppercase tracking-[0.2em] mb-1">Nomor Rekening</span>
                    <span className="text-base font-black">{formData.accNumber}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] opacity-40 font-black uppercase tracking-[0.2em] mb-1">Frekuensi</span>
                    <span className="text-base font-black text-red-700 italic uppercase">{results.cycleLabel}</span>
                  </div>
               </div>
            </div>
            <div className="text-right shrink-0">
               <span className="text-[9px] font-black opacity-30 tracking-[0.2em] uppercase block">Informasi Data Anggota</span>
               <span className="text-xs font-black text-gray-400">{formData.contractCode}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 h-[160px]">
          <div className="col-span-12 bg-white rounded-sm shadow-md flex relative overflow-hidden border-t-[6px] border-black">
              <div className="w-full flex">
                {activeCycle === '1' ? (
                  <>
                    <div className="flex-1 p-5 border-r border-black/5 flex flex-col justify-center border-t-[6px] border-red-600 bg-red-50/10">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="text-red-700" size={16} />
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-red-700">Input Salah Narik</span>
                      </div>
                      <p className="text-[2.6rem] font-black text-red-600 tracking-tighter leading-none italic">RP {formData.withdrawalAmount}</p>
                      <p className="text-[9px] mt-2 font-bold text-gray-400 uppercase tracking-widest">PENARIKAN DILUAR KETENTUAN SISTEM</p>
                    </div>

                    <div className="flex-1 p-5 flex flex-col justify-center border-t-[6px] border-green-600 bg-green-50/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="text-green-700" size={16} />
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-green-700">Input Valid Target</span>
                      </div>
                      <p className="text-[2.6rem] font-black text-green-700 tracking-tighter leading-none italic">RP {formData.systemRequired}</p>
                      <p className="text-[9px] mt-2 font-bold text-gray-400 uppercase tracking-widest">DATA TRANSAKSI YANG SEHARUSNYA</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-[1.5] p-5 border-r border-black/5 flex flex-col justify-center border-t-[6px] border-red-600 bg-red-50/10">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="text-red-700" size={16} />
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-red-700">Protocol Status: INTERRUPTED</span>
                      </div>
                      <div className="flex items-baseline gap-4 mt-1">
                        <p className="text-[2.6rem] font-black text-black tracking-tighter leading-none italic uppercase">LEVEL 1/{formData.totalFrequency}</p>
                        <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest bg-red-100 px-2 py-0.5 rounded-full">Recovery Required</span>
                      </div>
                      <p className="text-[9px] mt-2 font-bold text-gray-500 uppercase tracking-widest">SINKRONISASI {formData.totalFrequency} FREKUENSI KETENTUAN PROTOKOL GA-MILANO</p>
                    </div>

                    <div className="flex-1 p-5 flex flex-col justify-center border-t-[6px] border-green-600">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="text-green-700" size={16} />
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-green-700">Database Integrity</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase">
                           <span className="opacity-40 tracking-widest">Frekuensi 1: SYNC</span>
                           <span className="text-green-700">COMPLETED</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase">
                           <span className="opacity-40 tracking-widest">Frekuensi 2: DATA</span>
                           <span className="text-red-600">LOCKED</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase">
                           <span className="opacity-40 tracking-widest">Frekuensi 3: WD-GATE</span>
                           <span className="text-red-600">LOCKED</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="w-[360px] bg-black p-5 flex flex-col justify-center text-white border-t-[6px] border-white/20 shrink-0">
                    <div className="flex items-center gap-2 mb-1.5 opacity-60">
                      <Clock size={12} className="text-yellow-400" />
                      <span className="text-[8px] font-black uppercase tracking-[0.3em]">Biaya Pemulihan</span>
                    </div>
                    <span className="text-2xl font-black italic tracking-tight text-white">RP {formData.recoveryAmount}</span>
                    <div className="mt-3 flex items-center gap-3">
                       <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                       <span className="text-[8px] font-black uppercase tracking-widest text-yellow-400">WAITING FOR RE-VALIDATION</span>
                    </div>
                </div>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 h-[230px]">
          <div className="col-span-7 bg-white p-6 border-l-[10px] border-red-700 shadow-lg flex gap-6 items-start relative overflow-hidden">
             <div className="absolute bottom-[-40px] left-[-40px] opacity-[0.03] rotate-12">
                <Database size={130} />
             </div>
             <div className="shrink-0 z-10">
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center border border-red-100 shadow-sm">
                  <Info className="text-red-700" size={28} />
                </div>
             </div>
             <div className="flex-1 overflow-hidden z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-3 border-b border-black/5 pb-2">
                   <h6 className="text-[12px] font-black uppercase tracking-[0.3em] text-red-800">ANALISA TEKNIS & KETERANGAN PEMULIHAN</h6>
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-1">
                    <p className="text-[10px] font-medium leading-[1.6] text-gray-800 uppercase tracking-tight italic whitespace-pre-wrap">
                      {formData.manualAnalysis}
                    </p>
                  </div>
                  {formData.manualNotes && (
                    <div className="mt-2 border-t border-red-100 pt-2">
                      <span className="text-[8px] font-black text-red-700 uppercase tracking-widest block mb-1">CATATAN:</span>
                      <p className="text-[9px] font-bold text-red-700 uppercase tracking-tight italic leading-relaxed">
                        "{formData.manualNotes}"
                      </p>
                    </div>
                  )}
                </div>
             </div>
          </div>

          <div className="col-span-5 bg-[#f8f8f8] p-6 rounded-sm border-r-[8px] border-black shadow-inner flex flex-col relative overflow-hidden box-border">
             <div className="absolute top-[-30px] right-[-30px] opacity-[0.04]">
                <History size={100} />
             </div>
             <div className="flex items-center gap-3 mb-4 border-b border-black/10 pb-2.5">
                <Coins size={16} className="text-black" />
                <h6 className="text-[10px] font-black uppercase tracking-widest">RINCIAN BIAYA RE-VALIDASI</h6>
             </div>
             <div className="space-y-2 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center border-b border-black/5 pb-1.5">
                   <span className="text-[8px] font-black opacity-50 uppercase tracking-widest">Saldo Akun Kerja</span>
                   <span className="text-sm font-black">RP {results.working}</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-1.5">
                   <span className="text-[8px] font-black opacity-50 uppercase tracking-widest">Pembayaran Dana Pemulihan</span>
                   <span className="text-sm font-black">RP {results.payment}</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-1.5 text-green-700">
                   <span className="text-[8px] font-black uppercase tracking-widest">Bonus Komisi (50%)</span>
                   <span className="text-sm font-black">+ RP {results.commission}</span>
                </div>
                
                <div className="pt-1.5">
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50 mb-1.5 block">ESTIMASI SELURUH dana untuk di tarik dan valid</span>
                   <div className="bg-black text-[#ffcc00] p-4 rounded-sm shadow-xl border-l-4 border-[#ffcc00] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp size={20} />
                        <span className="text-2xl font-black italic tracking-tight">RP {results.total}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 h-[130px] mb-2">
          <div className="col-span-12 bg-[#080808] text-white p-5 rounded-sm border-l-[14px] border-red-600 flex items-center justify-between shadow-2xl relative overflow-hidden">
             <div className="flex items-center gap-6 z-10 max-w-[75%]">
               <div className="shrink-0">
                  <div className="w-14 h-14 border-2 border-red-600 rounded-full flex items-center justify-center bg-red-950/40 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                    <AlertTriangle className="text-red-600 animate-pulse" size={28} />
                  </div>
               </div>
               <div className="space-y-1 overflow-hidden">
                  <h4 className="font-black uppercase tracking-[0.4em] text-[11px] text-[#ffcc00] flex items-center gap-2 truncate">
                    <Lock size={14} /> WD-SEC-LOCK / PROTOCOL VIOLATION
                  </h4>
                  <p className="text-[9px] opacity-70 leading-relaxed italic font-medium uppercase line-clamp-2">
                    "PENARIKAN TIDAK VALID TERDETEKSI. AKUN TELAH DITANGGUHKAN UNTUK MELINDUNGI ASET ANGGOTA BERDASARKAN ATURAN PROTOKOL GA-MILANO. PEMULIHAN AKUN WAJIB DILAKUKAN UNTUK SINKRONISASI ULANG DATA PADA DATABASE PUSAT."
                  </p>
               </div>
             </div>
             <div className="text-right z-10 shrink-0">
                <div className="flex items-center gap-3 justify-end text-green-400 mb-1.5">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.6)]"></div>
                  <span className="text-[11px] font-black tracking-[0.3em] uppercase">{results.status}</span>
                </div>
                <p className="text-[8px] font-black opacity-30 uppercase tracking-[0.3em]">NODE: {formData.contractCode}</p>
             </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[450px] font-serif italic opacity-[0.01] pointer-events-none select-none z-0 luxury-font leading-none">
        GA
      </div>
    </div>
  );

  if (isScreenshotMode) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-10 overflow-auto">
        <div className="no-print w-full bg-black text-white p-5 flex justify-between items-center fixed top-0 left-0 z-50 border-b border-white/10 shadow-2xl">
          <button onClick={() => setIsScreenshotMode(false)} className="flex items-center gap-4 font-black uppercase text-[12px] border border-white/30 px-8 py-3 hover:bg-white hover:text-black transition-all">
            <ArrowLeft size={18} /> KELUAR PRATINJAU
          </button>
          <div className="flex items-center gap-10">
             <div className="text-right">
                <p className="text-[12px] font-black text-green-400 uppercase tracking-widest">OUTPUT: 1508 x 800 [GA-SEC-REPORT]</p>
                <p className="text-[10px] opacity-40">GIORGIO ARMANI - MILANO HQ</p>
             </div>
             <button onClick={() => window.print()} className="bg-red-700 text-white px-12 py-4 font-black text-sm uppercase shadow-2xl hover:bg-red-800 transition-all border border-red-500 flex items-center gap-3">
               <Printer size={18} /> CETAK LAPORAN
             </button>
          </div>
        </div>
        <div className="w-[1508px] h-[800px] mt-20 shadow-[0_0_200px_rgba(0,0,0,1)] bg-white animate-in zoom-in duration-500 origin-top">
          <ReportDashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ebebeb] flex flex-col lg:flex-row gap-0 font-['Inter']">
      <aside className="w-full lg:w-[450px] bg-[#0c0c0c] text-white p-8 overflow-y-auto lg:h-screen lg:sticky top-0 z-40 shadow-2xl no-print shrink-0 border-r border-white/10 flex flex-col custom-scroll">
        <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-6">
          <div className="w-14 h-14 bg-white flex items-center justify-center rounded-sm">
            <span className="text-black font-serif italic text-2xl font-black">GA</span>
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest leading-none">ADMIN HUB</h2>
            <p className="text-[9px] font-bold opacity-30 mt-1.5 uppercase tracking-[0.4em]">CONTROL PANEL V3.2</p>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <section className="bg-white/5 border border-white/10 rounded-sm p-5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-red-950/30 rounded-sm"><Layers size={16} className="text-red-500" /></div>
               <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">MODE RECOVERY</h4>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => setActiveCycle('1')} className={`flex items-center justify-between p-3 rounded-sm transition-all text-[10px] border ${activeCycle === '1' ? 'bg-white text-black font-black border-white' : 'text-white/60 hover:bg-white/10 font-bold border-white/10'}`}>
                <span className="uppercase tracking-widest italic">3 (SINGLE PHASE)</span>
              </button>
              <button onClick={() => setActiveCycle('23')} className={`flex items-center justify-between p-3 rounded-sm transition-all text-[10px] border ${activeCycle === '23' ? 'bg-red-700 text-white font-black border-red-500' : 'text-white/60 hover:bg-white/10 font-bold border-white/10'}`}>
                <span className="uppercase tracking-widest italic">2 + 3 (GABUNGAN)</span>
              </button>
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-sm p-5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-emerald-950/30 rounded-sm"><Settings size={16} className="text-emerald-400" /></div>
               <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">ANALISA TEKNIS</h4>
            </div>
            <textarea 
              name="manualAnalysis" 
              value={formData.manualAnalysis} 
              onChange={handleInputChange} 
              className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-medium text-white text-xs outline-none focus:bg-white/10 h-32 resize-none"
            />
          </section>

          <section className="bg-white/5 border border-white/10 rounded-sm p-5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-blue-950/30 rounded-sm"><User size={16} className="text-blue-400" /></div>
               <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">DATA IDENTITAS</h4>
            </div>
            <div className="space-y-3">
               <input name="name" value={formData.name} placeholder="Nama Pemilik" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-black text-white text-xs outline-none focus:bg-white/10 uppercase" />
               <input name="bank" value={formData.bank} placeholder="Bank" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-black text-white text-xs outline-none focus:bg-white/10 uppercase" />
               <input name="accNumber" value={formData.accNumber} placeholder="Nomor Rekening" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-black text-white text-xs outline-none" />
               <div className="space-y-1">
                 <label className="text-[8px] font-black uppercase opacity-40">Saldo Akun Kerja</label>
                 <input name="workingBalance" value={formData.workingBalance} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-black text-white text-xs outline-none" />
               </div>
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-sm p-5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-purple-950/30 rounded-sm"><FileText size={16} className="text-purple-400" /></div>
               <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">CATATAN</h4>
            </div>
            <textarea 
              name="manualNotes" 
              value={formData.manualNotes} 
              onChange={handleInputChange} 
              className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-medium text-white text-xs outline-none focus:bg-white/10 h-24 resize-none"
            />
          </section>

          <section className="bg-white/5 border border-white/10 rounded-sm p-5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-yellow-950/30 rounded-sm"><Database size={16} className="text-yellow-500" /></div>
               <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">TARGET & DANA</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase opacity-40 italic">Biaya Pemulihan</label>
                <input name="recoveryAmount" value={formData.recoveryAmount} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-black text-white text-xs outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase opacity-40 italic">Total Frekuensi</label>
                <input name="totalFrequency" value={formData.totalFrequency} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-black text-white text-xs outline-none" />
              </div>
            </div>
            <div className="space-y-1">
                <label className="text-[8px] font-black uppercase opacity-40 italic">Contract ID</label>
                <input name="contractCode" value={formData.contractCode} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-black text-white text-xs outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase opacity-40 italic">Input Salah Narik</label>
                <input name="withdrawalAmount" value={formData.withdrawalAmount} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-black text-red-400 text-xs outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase opacity-40 italic">Input Valid Target</label>
                <input name="systemRequired" value={formData.systemRequired} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-black text-green-400 text-xs outline-none" />
              </div>
            </div>
          </section>
        </div>

        <button onClick={triggerScreenshotView} className="w-full bg-white text-black py-5 mt-6 font-black uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-4 hover:bg-red-700 hover:text-white transition-all shadow-2xl active:scale-95 shrink-0">
          <Camera size={18} /> GENERATE REPORT
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-auto bg-[#ccc] no-print flex flex-col items-center justify-center">
        <div className="mb-6 flex justify-between items-end w-[1508px] border-b-4 border-black/10 pb-4">
          <div className="flex items-center gap-8">
            <h3 className="font-black uppercase italic tracking-[0.6em] text-black text-xl">LIVE MONITOR [GA-SEC-MILANO]</h3>
          </div>
        </div>
        
        <div className="w-[1508px] h-[800px] shadow-[0_80px_120px_rgba(0,0,0,0.5)] overflow-hidden rounded-sm border-[1px] border-black/5 bg-white transition-all duration-700">
          <ReportDashboard />
        </div>
        <p className="mt-8 text-[11px] font-black uppercase opacity-30 tracking-[1.2em] text-center">GA Internal Detection System - Node Milano V3.2</p>
      </main>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        @media print {
          .no-print { display: none !important; }
          body { background: #fcfcfc !important; margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-area { width: 1508px !important; height: 800px !important; box-shadow: none !important; border: none !important; position: fixed !important; top: 0 !important; left: 0 !important; margin: 0 !important; }
          @page { size: 1508px 800px; margin: 0mm; }
        }
      `}</style>
    </div>
  );
};

export default App;
