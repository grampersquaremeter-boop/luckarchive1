
import React from 'react';
import { UserData } from '../types';

interface HeaderProps {
  userData: UserData | null;
}

const Header: React.FC<HeaderProps> = ({ userData }) => {
  return (
    <header className="flex items-center justify-between border-b border-white/10 px-6 md:px-10 py-4 backdrop-blur-md sticky top-0 z-50 bg-black/40">
      <div className="flex items-center gap-4 text-primary">
        {!userData && (
          <div className="flex items-center gap-4">
            <img 
              alt="Luck Archive Logo" 
              className="h-10 w-10 object-contain drop-shadow-[0_0_8px_rgba(19,231,107,0.5)]" 
              src="https://freight.cargo.site/t/original/i/V2799261148538782019767333495303/Four-leaf-clover.png" 
            />
            <span className="text-3xl font-black tracking-[0.15em] font-display bg-gradient-to-r from-primary via-[#13e76b] to-[#0da34d] bg-clip-text text-transparent">LUCK ARCHIVE</span>
          </div>
        )}
        {userData && (
          <div className="flex items-center gap-4">
            <img 
              alt="Luck Archive Logo" 
              className="h-10 w-10 object-contain" 
              src="https://freight.cargo.site/t/original/i/V2799261148538782019767333495303/Four-leaf-clover.png" 
            />
            <div className="flex flex-col">
              <h2 className="text-white font-bold text-xl">{userData.name}님의 아카이브</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-6">
        {userData && (
          <div className="hidden md:flex items-center gap-4 mr-4">
             <div className="text-right">
                <p className="text-sm font-bold text-slate-200">{userData.name}</p>
                <p className="text-[10px] text-primary font-bold">Premium Member</p>
             </div>
             <div className="size-10 rounded-full bg-cover border border-primary/40 p-0.5 shadow-[0_0_10px_rgba(19,231,107,0.3)]" style={{backgroundImage: `url('https://picsum.photos/seed/${userData.name}/100/100')`}}></div>
          </div>
        )}
        <button className="flex size-11 items-center justify-center rounded-xl bg-white/5 text-white hover:bg-primary/20 transition-all border border-white/10 hover:border-primary/30">
          <span className="material-symbols-outlined text-[24px]">settings</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
