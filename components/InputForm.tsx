
import React, { useState } from 'react';
import { UserData } from '../types';

interface InputFormProps {
  onSubmit: (data: UserData) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    birthDate: '1992-05-14',
    birthTime: '14:30',
    birthPlace: 'seoul',
    focusArea: 'career'
  });

  const [isTimeUnknown, setIsTimeUnknown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) {
      const dataToSubmit = {
        ...formData,
        birthTime: isTimeUnknown ? 'unknown' : formData.birthTime
      };
      onSubmit(dataToSubmit);
    }
  };

  return (
    <div className="flex flex-col max-w-[800px] mx-auto py-12 px-6">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-white tracking-tight text-3xl md:text-4xl font-bold mb-2">정밀 데이터 분석을 위한 정보 입력</h1>
        <p className="text-white/50 text-base">당신의 운명을 결정하는 정밀한 시간 보정 알고리즘이 적용됩니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="scanning-line"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">person</span> 성함
            </label>
            <input 
              required
              className="form-input w-full rounded-lg text-white border border-white/10 bg-white/5 focus:border-primary h-14 p-4 text-lg font-medium transition-all placeholder:text-white/20"
              type="text"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="홍길동"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">calendar_today</span> 생년월일
            </label>
            <input 
              required
              className="form-input w-full rounded-lg text-white border border-white/10 bg-white/5 focus:border-primary h-14 p-4 text-lg font-medium transition-all"
              type="date"
              value={formData.birthDate}
              onChange={e => setFormData({...formData, birthDate: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <div className="flex justify-between items-center">
              <label className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">schedule</span> 태어난 시간
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isTimeUnknown}
                  onChange={(e) => setIsTimeUnknown(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 size-4 transition-all"
                />
                <span className="text-[11px] font-bold text-white/40 group-hover:text-primary transition-colors">시간 모름</span>
              </label>
            </div>
            <div className="relative">
              <input 
                required={!isTimeUnknown}
                disabled={isTimeUnknown}
                className={`form-input w-full rounded-lg text-white border transition-all h-14 p-4 text-lg font-medium ${
                  isTimeUnknown 
                    ? 'border-white/5 bg-white/0 text-white/20 cursor-not-allowed italic' 
                    : 'border-white/10 bg-white/5 focus:border-primary'
                }`}
                type="time"
                value={isTimeUnknown ? "" : formData.birthTime}
                onChange={e => setFormData({...formData, birthTime: e.target.value})}
              />
              {!isTimeUnknown && (
                <div className="absolute right-3 bottom-4 text-[10px] text-primary/60 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">verified</span> Correction Applied
                </div>
              )}
              {isTimeUnknown && (
                <div className="absolute right-3 bottom-4 text-[10px] text-white/20 flex items-center gap-1">
                  삼주 기반 분석 적용
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">location_on</span> 태어난 지역
            </label>
            <select 
              className="form-input w-full rounded-lg text-white border border-white/10 bg-white/5 focus:border-primary h-14 p-4 text-lg font-medium transition-all appearance-none cursor-pointer"
              value={formData.birthPlace}
              onChange={e => setFormData({...formData, birthPlace: e.target.value})}
            >
              <option value="seoul">서울특별시</option>
              <option value="busan">부산광역시</option>
              <option value="daegu">대구광역시</option>
              <option value="incheon">인천광역시</option>
              <option value="gwangju">광주광역시</option>
            </select>
          </div>
        </div>

        <div className="mt-10 p-5 rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-4">
          <div className="p-2 bg-primary/20 rounded-full text-primary shrink-0">
            <span className="material-symbols-outlined">analytics</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">정밀 시간 보정 알고리즘 가동 중</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              {isTimeUnknown 
                ? "시간 정보를 모를 경우, 생년월일 데이터(삼주)를 기반으로 핵심 오행 기운을 도출하며 분석의 정밀도가 시간 포함 시보다 다소 낮을 수 있습니다."
                : "표준 경도(135°E)와 실제 태어난 위치의 경도 차이를 계산하여 32분 시간 보정 로직 및 표준 자오선 조정이 실시간 적용됩니다."}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <label className="text-primary text-xs font-bold uppercase tracking-widest block mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">target</span> 분석 집중 분야 선택
          </label>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'career', label: '커리어 / 성취', icon: 'work' },
              { id: 'love', label: '인연 / 건강', icon: 'favorite' },
              { id: 'wealth', label: '재물 / 자산운용', icon: 'account_balance_wallet' }
            ].map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => setFormData({...formData, focusArea: area.id as any})}
                className={`px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${
                  formData.focusArea === area.id 
                  ? 'glass-3d-button-primary text-black' 
                  : 'border border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{area.icon}</span>
                {area.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <button type="submit" className="w-full flex items-center justify-center gap-3 h-16 rounded-xl text-black text-xl font-black tracking-tight hover:brightness-110 transition-all active:scale-95 glass-3d-button-primary">
            정밀 만세력 산출 시작
            <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>
          <p className="mt-4 text-center text-white/30 text-xs">
            * 데이터는 암호화되어 안전하게 처리되며 분석 후 즉시 파기합니다.
          </p>
        </div>
      </form>

      <footer className="mt-12 py-10 border-t border-white/10">
        <div className="flex items-center justify-between text-center">
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-primary text-xl font-bold">120K+</span>
            <span className="text-white/40 text-[10px] uppercase">Profiles</span>
          </div>
          <div className="w-[1px] h-10 bg-white/10"></div>
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-primary text-xl font-bold">99.9%</span>
            <span className="text-white/40 text-[10px] uppercase">Accuracy</span>
          </div>
          <div className="w-[1px] h-10 bg-white/10"></div>
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-primary text-xl font-bold">0.8s</span>
            <span className="text-white/40 text-[10px] uppercase">Speed</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InputForm;
