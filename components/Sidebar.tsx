
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/dashboard', icon: 'dashboard', label: '대시보드' },
    { to: '/chat', icon: 'chat_bubble', label: 'AI 운세 상담' },
    { to: '/amulet', icon: 'auto_awesome', label: '행운 부적 생성' },
  ];

  return (
    <aside className="w-20 lg:w-64 border-r border-white/5 flex flex-col justify-between bg-black/40 backdrop-blur-xl shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10 overflow-hidden">
          <img 
            alt="Logo" 
            className="w-10 h-10 object-contain shrink-0" 
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Nature/Four%20Leaf%20Clover.png" 
          />
          <span className="hidden lg:block text-xl font-black tracking-[0.1em] font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#0da34d] whitespace-nowrap">LUCK ARCHIVE</span>
        </div>
        
        <nav className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_0_10px_rgba(19,231,107,0.1)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="material-symbols-outlined shrink-0">{item.icon}</span>
              <span className="hidden lg:block font-bold whitespace-nowrap">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-400 transition-all w-full font-bold">
          <span className="material-symbols-outlined">logout</span>
          <span className="hidden lg:block text-sm">로그아웃</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
