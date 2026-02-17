
import React, { useState } from 'react';
import { UserData } from '../types';
import { generateAmuletImage, generateFortuneAnalysis } from '../services/geminiService';

interface AmuletGeneratorProps {
  userData: UserData;
}

const AmuletGenerator: React.FC<AmuletGeneratorProps> = ({ userData }) => {
  const [amuletUrl, setAmuletUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<'wealth' | 'love' | 'health' | 'success'>('success');

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      // 1. Generate supportive message
      const prompt = `${userData.name}님을 위한 ${selectedTheme} 분야의 짧고 강렬한 응원 메시지 한 문장을 한국어로 생성해줘.`;
      const msg = await generateFortuneAnalysis(prompt);
      setMessage(msg || '당신의 앞날에 무궁한 영광이 깃들기를.');

      // 2. Generate Image via Gemini 2.5 Flash Image
      const imageUrl = await generateAmuletImage(selectedTheme, msg || '');
      setAmuletUrl(imageUrl);
    } catch (error) {
      console.error(error);
      setMessage('에너지를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const shareToSns = () => {
    alert('SNS 공유 기능이 곧 준비될 예정입니다. 생성된 이미지를 길게 눌러 저장한 후 인스타그램이나 카카오톡에 공유해 보세요!');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto pb-24">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">디지털 행운 부적 생성</h1>
        <p className="text-slate-400">당신의 고유한 사주 데이터와 AI가 결합하여 세상에 단 하나뿐인 행운의 이미지를 생성합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-4">원하는 행운 테마 선택</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'wealth', label: '금전운', icon: 'payments' },
                { id: 'love', label: '애정운', icon: 'favorite' },
                { id: 'health', label: '건강운', icon: 'vital_signs' },
                { id: 'success', label: '성공운', icon: 'military_tech' },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id as any)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    selectedTheme === theme.id 
                    ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(19,231,107,0.2)]' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl mb-2">{theme.icon}</span>
                  <span className="text-sm font-bold">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
             <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-4">부적 생성 엔진 가동</h3>
             <p className="text-sm text-slate-300 mb-6 leading-relaxed">
               선택하신 테마와 {userData.name}님의 사주 팔자 오행 균형을 분석하여, 부족한 에너지를 채워주는 맞춤형 상징 이미지를 생성합니다.
             </p>
             <button
              onClick={handleGenerate}
              disabled={isLoading}
              className={`w-full h-14 rounded-xl text-black font-black flex items-center justify-center gap-2 transition-all ${
                isLoading ? 'bg-slate-700 cursor-not-allowed opacity-50' : 'glass-3d-button-primary hover:scale-[1.02]'
              }`}
             >
               {isLoading ? (
                 <>
                   <span className="material-symbols-outlined animate-spin">autorenew</span>
                   에너지 응집 중...
                 </>
               ) : (
                 <>
                   <span className="material-symbols-outlined">auto_awesome</span>
                   부적 생성하기
                 </>
               )}
             </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full aspect-[3/4] glass-card rounded-2xl overflow-hidden border-white/20 shadow-2xl flex items-center justify-center group">
            {!amuletUrl && !isLoading && (
              <div className="text-center p-10">
                <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">temp_preferences_custom</span>
                <p className="text-slate-500 text-sm">왼쪽에서 테마를 선택하고<br/>버튼을 눌러주세요</p>
              </div>
            )}
            
            {isLoading && (
              <div className="flex flex-col items-center gap-4">
                 <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-[loading_2s_ease-in-out_infinite]"></div>
                 </div>
                 <p className="text-primary text-[10px] uppercase font-bold tracking-widest animate-pulse">Analyzing Astral Vectors</p>
              </div>
            )}

            {amuletUrl && !isLoading && (
              <>
                <img src={amuletUrl} alt="Amulet" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-2xl">
                    <p className="text-white text-sm font-medium leading-relaxed italic text-center">
                      "{message}"
                    </p>
                    <p className="text-primary text-[10px] mt-2 font-bold text-center uppercase tracking-widest">Luck Archive Energy Talisman</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {amuletUrl && !isLoading && (
            <div className="grid grid-cols-2 gap-4 w-full mt-6">
              <button 
                onClick={shareToSns}
                className="flex items-center justify-center gap-2 h-12 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-all"
              >
                <span className="material-symbols-outlined text-sm text-yellow-400">chat</span>
                카톡 공유
              </button>
              <button 
                onClick={shareToSns}
                className="flex items-center justify-center gap-2 h-12 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-all"
              >
                <span className="material-symbols-outlined text-sm text-pink-500">photo_camera</span>
                인스타 공유
              </button>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 0%; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default AmuletGenerator;
