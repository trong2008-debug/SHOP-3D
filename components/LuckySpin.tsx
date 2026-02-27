
import React, { useState, useRef, useEffect } from 'react';
import { Trophy, X, PartyPopper, Sparkles } from 'lucide-react';

interface LuckySpinProps {
  onWin: (discount: number) => void;
  onClose: () => void;
}

export const LuckySpin: React.FC<LuckySpinProps> = ({ onWin, onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  
  const rewards = [0, 5, 10, 15, 20];
  const items = [...rewards, ...rewards, ...rewards, ...rewards];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    const winningIdx = Math.floor(Math.random() * rewards.length);
    const winValue = rewards[winningIdx];
    
    const itemHeight = 90;
    const finalIdx = (items.length - rewards.length) + winningIdx;
    const offset = finalIdx * itemHeight;

    if (slotRef.current) {
      slotRef.current.style.transition = 'none';
      slotRef.current.style.transform = 'translateY(0)';
      slotRef.current.offsetHeight; // force reflow
      
      slotRef.current.style.transition = 'transform 4.5s cubic-bezier(0.1, 0.9, 0.2, 1)';
      slotRef.current.style.transform = `translateY(-${offset}px)`;
    }

    setTimeout(() => {
      setIsSpinning(false);
      setResult(winValue);
      onWin(winValue);
    }, 4700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-theme-text/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white w-full max-w-sm p-10 rounded-[3rem] text-center shadow-2xl overflow-hidden border border-theme-border animate-in zoom-in duration-300">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-theme-accent shadow-sm" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 text-theme-text opacity-40 hover:opacity-100 transition-all rounded-xl hover:bg-theme-bg border border-transparent hover:border-theme-border springy"
          aria-label="Đóng"
        >
          <X size={22} />
        </button>

        <div className="inline-flex items-center justify-center w-20 h-20 bg-theme-accent-light rounded-3xl mb-8 text-theme-accent border border-theme-accent/20 shadow-inner">
          <Trophy size={36} strokeWidth={1.5} />
        </div>
        
        <h2 className="text-3xl font-black mb-3 text-theme-text tracking-tight">Vòng Quay Daylight</h2>
        <p className="text-theme-text opacity-60 mb-10 font-medium text-[13px] leading-relaxed">Khám phá mã voucher ưu đãi lên đến 20% <br/> áp dụng trực tiếp cho giỏ hàng hôm nay.</p>

        <div className="relative mb-10">
          <div className="w-44 h-[90px] mx-auto border border-theme-border rounded-[2rem] overflow-hidden bg-theme-bg/60 shadow-inner relative">
            <div ref={slotRef} className="flex flex-col">
              {items.map((val, i) => (
                <div key={i} className={`h-[90px] flex items-center justify-center text-4xl font-black ${val > 0 ? 'text-theme-accent' : 'text-theme-text opacity-10'}`}>
                  {val}%
                </div>
              ))}
            </div>
            {/* Horizontal pointer indicator */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 pointer-events-none">
              <div className="w-2 h-2 bg-theme-accent rounded-full shadow-sm" />
              <div className="w-2 h-2 bg-theme-accent rounded-full shadow-sm" />
            </div>
          </div>
          
          <div className="absolute -top-4 -right-1 text-theme-accent/40 animate-pulse"><Sparkles size={20}/></div>
          <div className="absolute -bottom-4 -left-1 text-theme-accent/40 animate-bounce"><PartyPopper size={20}/></div>
        </div>

        <button
          onClick={handleSpin}
          disabled={isSpinning || result !== null}
          className={`w-full py-4.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all springy shadow-lg ${
            isSpinning || result !== null
              ? 'bg-theme-bg text-theme-text opacity-20 border border-theme-border cursor-not-allowed'
              : 'bg-theme-accent text-white hover:bg-theme-accent-hover shadow-theme-accent/20'
          }`}
        >
          {isSpinning ? 'ĐANG XOAY...' : result !== null ? 'HOÀN THÀNH' : 'THỬ VẬN MAY NGAY'}
        </button>

        {result !== null && (
          <div className="mt-8 p-6 bg-theme-accent-light rounded-[2rem] border border-theme-accent/20 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {result > 0 ? (
              <>
                <p className="text-theme-accent font-black text-[12px] mb-1.5 tracking-wider uppercase flex items-center justify-center gap-2">
                   <PartyPopper size={16} /> TUYỆT VỜI!
                </p>
                <p className="text-theme-text font-bold text-[13px] opacity-80 leading-relaxed">Bạn nhận được voucher <span className="text-lg font-black text-theme-accent underline decoration-theme-accent/40 decoration-4">{result}%</span> cho đơn hàng này.</p>
              </>
            ) : (
              <>
                <p className="text-theme-text opacity-40 font-black text-[11px] uppercase tracking-widest">HẸN LẦN SAU NHÉ!</p>
                <p className="text-theme-text opacity-30 text-[11px] font-bold mt-1">Chúc bạn một ngày tràn đầy năng lượng! 🍀</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
