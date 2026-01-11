
import React, { useState, useMemo } from 'react';
import { 
  Camera, 
  ArrowLeft, 
  User, 
  ShoppingBag, 
  AlertCircle, 
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  Globe, 
  Lock,
  Info,
  Activity,
  CreditCard,
  ShieldAlert,
  History,
  Coins,
  Layers
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
    currentBalance: '150.000.000',
    cycleOneBalance: '125.000.000'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const parseValue = (val: string) => parseInt(val.replace(/\./g, '')) || 0;

  const cycleResults = useMemo(() => {
    const tokenBase = parseValue(formData.recoveryAmount);
    const balanceCycle1 = parseValue(formData.cycleOneBalance);
    const balanceInitial = parseValue(formData.currentBalance);

    if (activeCycle === '23') {
      const totalRecoveryPayment = tokenBase * 2;
      const commission = totalRecoveryPayment * 0.5;
      const finalAccumulation = balanceCycle1 + totalRecoveryPayment + commission;

      return {
        displayFreq: '2 + 3 (GABUNGAN)',
        recoveryToPay: totalRecoveryPayment.toLocaleString('id-ID'),
        commission: commission.toLocaleString('id-ID'),
        totalAccumulated: finalAccumulation.toLocaleString('id-ID'),
        statusLabel: 'TAHAP FINALISASI',
        footerStatus: 'SIAP UNTUK PENARIKAN DANA'
      };
    } else {
      const commission = tokenBase * 0.5;
      const finalAccumulation = balanceInitial + tokenBase + commission;

      return {
        displayFreq: '1',
        recoveryToPay: tokenBase.toLocaleString('id-ID'),
        commission: commission.toLocaleString('id-ID'),
        totalAccumulated: finalAccumulation.toLocaleString('id-ID'),
        statusLabel: 'TAHAP AWAL',
        footerStatus: 'SIAP UNTUK PEMULIHAN AKUN'
      };
    }
  }, [activeCycle, formData]);

  const triggerScreenshotView = () => {
    setIsScreenshotMode(true);
    setTimeout(() => {
      window.print();
    }, 800);
  };

  const ReportDashboard = () => (
    <div id="print-area" className="bg-[#fcfcfc] w-[1508px] h-[800px] flex flex-col font-['Inter'] text-black relative p-8 border-[1px] border-black/5 shadow-2xl overflow-hidden mx-auto box-border">
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
          <h1 className="text-[3.5rem] font-serif tracking-[0.8em] mr-[-0.8em] luxury-font font-bold text-black leading-tight select-none">
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
        <div className="grid grid-cols-12 gap-5 h-[160px]">
          <div className="col-span-4 bg-white p-6 rounded-sm border-l-[8px] border-black shadow-md flex flex-col justify-center">
            <div className="flex justify-between items-center mb-3 border-b border-black/10 pb-1.5">
              <h5 className="font-black italic uppercase text-[10px] tracking-widest flex items-center gap-3">
                <ShieldCheck size={14} className="text-black" /> IDENTITAS PROFIL
              </h5>
              <History size={14} className="opacity-20" />
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex flex-col border-b border-black/5 pb-0.5">
                <span className="text-[8px] opacity-40 font-black uppercase">Pemilik</span>
                <span className="text-sm font-black uppercase truncate">{formData.name}</span>
              </div>
              <div className="flex flex-col border-b border-black/5 pb-0.5">
                <span className="text-[8px] opacity-40 font-black uppercase">Bank</span>
                <span className="text-sm font-black uppercase truncate">{formData.bank}</span>
              </div>
              <div className="flex flex-col border-b border-black/5 pb-0.5">
                <span className="text-[8px] opacity-40 font-black uppercase">No. Rekening</span>
                <span className="text-sm font-black tracking-widest">{formData.accNumber}</span>
              </div>
              <div className="flex flex-col border-b border-black/5 pb-0.5">
                <span className="text-[8px] opacity-40 font-black uppercase">Frekuensi Siklus</span>
                <span className="text-sm font-black text-black mt-0.5">{cycleResults.displayFreq}</span>
              </div>
            </div>
          </div>

          <div className="col-span-8 bg-white rounded-sm shadow-md flex relative overflow-hidden border-t-[6px] border-black">
            {activeCycle === '1' ? (
              <div className="w-full flex">
                <div className="flex-1 p-6 border-r border-black/5 flex flex-col justify-center border-t-[6px] border-red-600">
                  <div className="flex items-center gap-3 mb-1">
                    <AlertCircle className="text-red-600" size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">JUMLAH TIDAK VALID</span>
                  </div>
                  <p className="text-[8px] font-bold opacity-40 uppercase">Permintaan Pengguna</p>
                  <p className="text-[2.2rem] font-black text-red-600 tracking-tighter italic leading-none my-0.5">RP {formData.withdrawalAmount}</p>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center bg-green-50/10 border-t-[6px] border-green-600">
                  <div className="flex items-center gap-3 mb-1">
                    <Activity className="text-green-700" size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-700">JUMLAH YANG DI TENTUKAN</span>
                  </div>
                  <p className="text-[8px] font-bold opacity-40 uppercase">Target Terverifikasi</p>
                  <p className="text-[2.2rem] font-black text-green-700 tracking-tighter italic leading-none my-0.5">RP {formData.systemRequired}</p>
                </div>
              </div>
            ) : (
              <div className="w-full p-6 flex items-center gap-12">
                 <div className="shrink-0">
                    <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
                      <Coins className="text-white" size={40} />
                    </div>
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Activity className="text-black" size={18} />
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black">INFORMASI SALDO AKUN KERJA</span>
                    </div>
                    <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest text-red-800">TOTAL SALDO YANG TERSIMPAN SETELAH MENYELESAIKAN SIKLUS PERTAMA</p>
                    <p className="text-[3.2rem] font-black text-black tracking-tighter italic leading-none my-1">RP {formData.cycleOneBalance}</p>
                    <div className="flex items-center gap-4 mt-2">
                       <span className="text-[9px] font-black text-white bg-green-700 px-3 py-1 rounded-sm uppercase tracking-widest italic">Success: Siklus 1 Selesai</span>
                       <div className="h-[1px] flex-1 bg-black/10"></div>
                       <span className="text-[9px] font-black opacity-30 uppercase tracking-widest italic">GA-SECURED-ASSET</span>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 h-[210px]">
          <div className="col-span-8 bg-white p-6 border-l-[12px] border-red-700 shadow-lg flex gap-8 items-start">
             <div className="shrink-0 pt-1">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
                  <Info className="text-red-700" size={32} />
                </div>
             </div>
             <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-4 mb-3 border-b border-black/5 pb-1.5">
                   <h6 className="text-[13px] font-black uppercase tracking-[0.4em] text-red-800">ANALISA TEKNIS & KETERANGAN PEMULIHAN</h6>
                   <div className="h-[1px] flex-1 bg-red-100"></div>
                </div>
                
                {activeCycle === '1' ? (
                  <div className="grid grid-cols-2 gap-6">
                    <p className="text-[10px] font-medium leading-[1.5] text-gray-800 uppercase tracking-tight italic">
                        JUMLAH NOMINAL YANG DIAJUKAN TIDAK SESUAI DENGAN KETENTUAN JUMLAH YANG DIAJUKAN PENGGUNA <span className="font-black text-red-600 text-[11px]">RP {formData.withdrawalAmount}</span> SEDANGKAN YANG DI TENTUKAN SISTEM <span className="font-black text-green-700 text-[11px]">RP {formData.systemRequired}</span>.
                    </p>
                    <p className="text-[10px] font-medium leading-[1.5] text-gray-800 uppercase tracking-tight italic">
                        MENYEBABKAN SISTEM CRASH DAN SALURAN PENARIKAN TERKUNCI HARAP LAKUKAN ISI ULANG KEDALAM AKUN <span className="font-black text-red-700 underline decoration-1 text-[11px]">RP {cycleResults.recoveryToPay}</span> GUNA UNTUK MEMPERBARUI DATA ANDA.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <p className="text-[11px] font-black text-red-800 italic uppercase mb-2">
                       Selamat! Proses Pemulihan Sistem Anda Telah Memasuki Tahap Frekuensi 1
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="flex flex-col gap-1 text-[10px] font-bold text-gray-700 uppercase">
                          <p className="border-b border-black/5 pb-1">Rincian Pemulihan:</p>
                          <p>Biaya Isi Ulang per Frekuensi: <span className="text-red-700">Rp {formData.recoveryAmount}</span></p>
                       </div>
                       <div className="flex flex-col gap-1 text-[10px] font-bold text-gray-700 uppercase">
                          <p className="border-b border-black/5 pb-1 flex items-center gap-1"><TrendingUp size={10}/> Status Pemulihan:</p>
                          <p className="text-green-700">• ✅ Frekuensi 1: Sudah dibayar Rp {formData.recoveryAmount} Selesai</p>
                          <p className="text-red-700">• ❌ Frekuensi 2: Belum dibayar Rp {formData.recoveryAmount} Belum Selesai</p>
                          <p className="text-red-700">• ❌ Frekuensi 3: Belum dibayar Rp {formData.recoveryAmount} Belum Selesai</p>
                       </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-sm">
                   <p className="text-[8px] font-black text-red-900 tracking-widest uppercase mb-1 flex items-center gap-2">
                      <ShieldAlert size={12} /> STATUS PEMULIHAN: [{cycleResults.statusLabel}]
                   </p>
                </div>
             </div>
          </div>

          <div className="col-span-4 bg-[#f8f8f8] p-6 rounded-sm border-r-[8px] border-black shadow-inner flex flex-col">
             <div className="flex items-center gap-3 mb-3 border-b border-black/10 pb-2">
                <CreditCard size={16} />
                <h6 className="text-[10px] font-black uppercase tracking-widest">RINCIAN BIAYA RE-VALIDASI</h6>
             </div>
             <div className="space-y-4 flex-1">
                <div className="flex justify-between text-[11px] font-bold opacity-60">
                   <span>TOKEN PEMULIHAN {activeCycle === '23' ? '(CYCLE 2+3)' : '(CYCLE 1)'}</span>
                   <span>RP {cycleResults.recoveryToPay}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black text-green-700 pt-2 border-t border-black/5 mt-2">
                   <span className="flex items-center gap-1"><Coins size={12}/> ESTIMASI KOMISI (50%)</span>
                   <span>RP {cycleResults.commission}</span>
                </div>
                <div className="border-t-2 border-black pt-4 mt-auto flex justify-between items-end">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase opacity-40">TOTAL ISI ULANG PEMULIHAN AKUN</span>
                      <span className="text-[1.8rem] font-black text-red-700 tracking-tighter leading-none">RP {cycleResults.recoveryToPay}</span>
                   </div>
                   <div className="h-8 w-8 bg-red-700 text-white flex items-center justify-center rounded-full font-black text-[12px] shadow-lg animate-pulse">!</div>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 flex-1 min-h-0 mb-2">
          <div className="col-span-7 bg-[#080808] text-white p-6 rounded-sm border-l-[16px] border-red-600 flex items-center gap-8 shadow-2xl relative overflow-hidden">
             <div className="shrink-0 flex flex-col items-center z-10">
                <div className="w-16 h-16 border-2 border-red-600 rounded-full flex items-center justify-center mb-2 bg-red-950/40">
                  <AlertTriangle className="text-red-600 animate-pulse" size={32} />
                </div>
                <span className="text-[9px] font-black text-red-600 tracking-[0.3em] uppercase">Security Breach</span>
             </div>
             <div className="space-y-2 flex-1 z-10">
                <h4 className="font-black uppercase tracking-[0.3em] text-[12px] text-[#ffcc00] border-b border-white/10 pb-2 flex items-center gap-3">
                  <Lock size={14} /> WD-SEC-LOCK / NODE: MILANO-HQ
                </h4>
                <p className="text-[11px] opacity-70 leading-relaxed italic font-medium">
                  "PELANGGARAN INTEGRITAS FATAL TERDETEKSI. SEMUA TRANSFER KELUAR DITANGGUHKAN. DEPOSIT TOKEN MANUAL DIPERLUKAN UNTUK MEMBUKA KEMBALI SALURAN AMAN."
                </p>
                <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest opacity-40 pt-1">
                  <span className="text-red-500 border-r border-white/10 pr-6">ENKRIPSI: AES-256</span>
                  <span className="border-r border-white/10 pr-6">NODE: {formData.contractCode}</span>
                  <span className="text-yellow-500">DIBUTUHKAN</span>
                </div>
             </div>
          </div>

          <div className="col-span-5 bg-black text-[#ffcc00] p-6 rounded-sm shadow-2xl flex flex-col justify-center border-l-[12px] border-[#ffcc00] relative overflow-hidden">
             <div className="absolute top-4 right-4 opacity-5">
                <TrendingUp size={60} />
             </div>
             <div className="grid grid-cols-2 gap-6 mb-3">
                <div className="flex flex-col border-r border-white/10">
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 opacity-50">{activeCycle === '23' ? 'SALDO SETELAH S1' : 'SALDO AWAL AKUN'}</span>
                   <span className="text-lg font-black text-white">RP {activeCycle === '23' ? formData.cycleOneBalance : formData.currentBalance}</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 opacity-50">MODAL + KOMISI (S{activeCycle === '23' ? '2+3' : '1'})</span>
                   <span className="text-lg font-black text-green-400">RP {(parseValue(cycleResults.recoveryToPay) + parseValue(cycleResults.commission)).toLocaleString('id-ID')}</span>
                </div>
             </div>
             <div className="pt-4 border-t border-white/10">
                <span className="text-[12px] font-black uppercase tracking-[0.4em] mb-2 opacity-60 block">ESTIMASI TOTAL SALDO DI AKUN BISNIS</span>
                <span className="text-[2.8rem] font-black tracking-tighter leading-none block">RP {cycleResults.totalAccumulated}</span>
             </div>
             <div className="flex items-center gap-3 mt-4 text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase">{cycleResults.footerStatus}</span>
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
        <div className="no-print w-full bg-black text-white p-5 flex justify-between items-center fixed top-0 z-50 border-b border-white/10 shadow-2xl">
          <button onClick={() => setIsScreenshotMode(false)} className="flex items-center gap-4 font-black uppercase text-[12px] border border-white/30 px-8 py-3 hover:bg-white hover:text-black transition-all">
            <ArrowLeft size={18} /> KELUAR PRATINJAU
          </button>
          <div className="flex items-center gap-10">
             <div className="text-right">
                <p className="text-[12px] font-black text-green-400 uppercase tracking-widest">OUTPUT: 1508 x 800 [GA-SEC-REPORT]</p>
                <p className="text-[10px] opacity-40">GIORGIO ARMANI - MILANO</p>
             </div>
             <button onClick={() => window.print()} className="bg-red-700 text-white px-12 py-4 font-black text-sm uppercase shadow-2xl hover:bg-red-800 transition-all border border-red-500">
               CETAK LAPORAN
             </button>
          </div>
        </div>
        <div className="w-[1508px] h-[800px] mt-20 shadow-[0_0_150px_rgba(0,0,0,1)] bg-white animate-in zoom-in duration-700">
          <ReportDashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ebebeb] flex flex-col lg:flex-row gap-0 font-['Inter']">
      <aside className="w-full lg:w-[450px] bg-[#0c0c0c] text-white p-10 overflow-y-auto h-screen sticky top-0 z-40 shadow-2xl no-print shrink-0 border-r border-white/10 custom-scroll">
        <div className="flex items-center gap-6 mb-10 border-b border-white/10 pb-8">
          <div className="w-16 h-16 bg-white flex items-center justify-center rounded-sm">
            <span className="text-black font-serif italic text-3xl font-black">GA</span>
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-widest leading-none">ADMIN HUB</h2>
            <p className="text-[10px] font-bold opacity-30 mt-2 uppercase tracking-[0.4em]">SECURITY MANAGEMENT</p>
          </div>
        </div>

        <div className="mb-10 bg-white/5 p-2 rounded-sm border border-white/10 flex flex-col gap-2">
          <button onClick={() => setActiveCycle('1')} className={`flex items-center justify-between p-4 rounded-sm transition-all ${activeCycle === '1' ? 'bg-white text-black font-black' : 'text-white/60 hover:bg-white/10 font-bold'}`}>
            <div className="flex items-center gap-3">
              <Layers size={18} />
              <span className="text-[11px] uppercase tracking-widest">SIKLUS PERTAMA (S1)</span>
            </div>
          </button>
          <button onClick={() => setActiveCycle('23')} className={`flex items-center justify-between p-4 rounded-sm transition-all ${activeCycle === '23' ? 'bg-red-700 text-white font-black' : 'text-white/60 hover:bg-white/10 font-bold'}`}>
            <div className="flex items-center gap-3">
              <Activity size={18} />
              <span className="text-[11px] uppercase tracking-widest">SIKLUS GABUNGAN (2+3)</span>
            </div>
          </button>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h4 className="text-[11px] font-black uppercase text-red-500 tracking-[0.4em] border-l-4 border-red-500 pl-4">DATA IDENTITAS</h4>
            <div className="grid grid-cols-1 gap-4">
              <input name="name" value={formData.name} placeholder="Nama Pemilik" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 rounded-sm font-black text-white text-base outline-none focus:bg-white/10" />
              <div className="grid grid-cols-2 gap-4">
                <input name="bank" value={formData.bank} placeholder="Bank" onChange={handleInputChange} className="bg-white/5 border border-white/10 p-4 rounded-sm font-black text-white text-sm outline-none" />
                <input name="accNumber" value={formData.accNumber} placeholder="No. Rekening" onChange={handleInputChange} className="bg-white/5 border border-white/10 p-4 rounded-sm font-black text-white text-sm outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase opacity-40">Saldo Awal Sekali (Base)</label>
                <input name="currentBalance" value={formData.currentBalance} placeholder="Saldo Awal" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 rounded-sm font-black text-white text-sm outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase opacity-40">Saldo Selesai Siklus 1</label>
                <input name="cycleOneBalance" value={formData.cycleOneBalance} placeholder="Saldo Setelah S1" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 rounded-sm font-black text-green-400 text-sm outline-none" />
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-[11px] font-black uppercase text-red-500 tracking-[0.4em] border-l-4 border-red-500 pl-4">TARGET & TOKEN</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase opacity-40">WD Salah (User)</label>
                <input name="withdrawalAmount" value={formData.withdrawalAmount} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 rounded-sm font-black text-red-400 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase opacity-40">WD Benar (Sistem)</label>
                <input name="systemRequired" value={formData.systemRequired} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 rounded-sm font-black text-green-400 text-sm" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase opacity-40">Token Pemulihan Per Unit</label>
              <input name="recoveryAmount" value={formData.recoveryAmount} placeholder="Token Pemulihan" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 rounded-sm font-black text-white text-base outline-none" />
            </div>
          </section>

          <div className="p-4 bg-white/10 border border-white/20 rounded-sm space-y-2">
             <div className="flex justify-between items-center text-xs opacity-60 uppercase font-black tracking-widest">
                <span>Pembayaran Siklus Ini</span>
                <span>RP {cycleResults.recoveryToPay}</span>
             </div>
             <div className="flex justify-between items-center text-xs text-green-400 uppercase font-black tracking-widest">
                <span className="flex items-center gap-1"><Coins size={10}/> Bonus Komisi (50%)</span>
                <span>RP {cycleResults.commission}</span>
             </div>
             <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Estimasi Saldo Akhir</span>
                <span className="text-base font-black text-[#ffcc00]">RP {cycleResults.totalAccumulated}</span>
             </div>
          </div>

          <button onClick={triggerScreenshotView} className="w-full bg-white text-black py-6 mt-4 font-black uppercase tracking-[0.6em] text-sm flex items-center justify-center gap-8 hover:bg-red-700 hover:text-white transition-all shadow-2xl active:scale-95">
            <Camera size={24} /> GEN-LAPORAN
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-auto bg-[#ccc] no-print flex flex-col items-center justify-center">
        <div className="mb-6 flex justify-between items-end w-[1508px] border-b-4 border-black/10 pb-4">
          <div className="flex items-center gap-8">
            <h3 className="font-black uppercase italic tracking-[0.6em] text-black text-xl">LIVE MONITOR [GA-SEC-MILANO]</h3>
            <span className={`text-[10px] font-black px-5 py-1.5 rounded-sm animate-pulse ${activeCycle === '23' ? 'bg-red-800 text-white' : 'bg-black text-white'}`}>
              {activeCycle === '23' ? 'SIKLUS 2+3: FINAL BRIDGE' : 'SIKLUS 1: INITIAL TIER'}
            </span>
          </div>
          <div className="flex gap-4">
             <div className="px-6 py-2 bg-red-800 text-white text-[9px] font-black uppercase rounded-sm shadow-xl">SISTEM TERKUNCI</div>
             <div className="px-6 py-2 bg-black text-white text-[9px] font-black uppercase rounded-sm shadow-xl">GA-SEC-X</div>
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
          body { 
            background: #fcfcfc !important; 
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #print-area { 
            width: 1508px !important; 
            height: 800px !important;
            max-width: none !important; 
            max-height: none !important;
            box-shadow: none !important;
            border: none !important;
            transform: scale(1) !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: #fcfcfc !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
          }
          @page {
            size: 1508px 800px;
            margin: 0mm;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
