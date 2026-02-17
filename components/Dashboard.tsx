
import React, { useMemo } from 'react';
import { UserData, SajuAnalysis } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface DashboardProps {
  userData: UserData;
}

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  const isTimeUnknown = userData.birthTime === 'unknown';

  // Simulated Saju Analysis based on input
  const analysis = useMemo<SajuAnalysis>(() => ({
    archetype: userData.focusArea === 'career' ? '병화(Bing-Hwa)' : userData.focusArea === 'wealth' ? '무토(Mu-To)' : '갑목(Gap-Mok)',
    elements: { 
      fire: isTimeUnknown ? 70 : 82, 
      earth: 45, 
      metal: 58, 
      water: 32, 
      wood: 61 
    },
    competencies: {
      strategy: 88,
      leadership: isTimeUnknown ? 80 : 94,
      innovation: 65,
      outcome: 72,
      interpersonal: 41,
      communication: 79
    }
  }), [userData, isTimeUnknown]);

  const radarData = [
    { subject: 'FIRE', value: analysis.elements.fire, fullMark: 100 },
    { subject: 'EARTH', value: analysis.elements.earth, fullMark: 100 },
    { subject: 'METAL', value: analysis.elements.metal, fullMark: 100 },
    { subject: 'WATER', value: analysis.elements.water, fullMark: 100 },
    { subject: 'WOOD', value: analysis.elements.wood, fullMark: 100 },
  ];

  const competencyData = [
    { name: '전략(인성)', score: analysis.competencies.strategy },
    { name: '리더십(관성)', score: analysis.competencies.leadership },
    { name: '창의성(식상)', score: analysis.competencies.innovation },
    { name: '결과(재성)', score: analysis.competencies.outcome },
    { name: '사교(비겁)', score: analysis.competencies.interpersonal },
    { name: '소통(상관)', score: analysis.competencies.communication },
  ];

  const trajectoryData = [
    { name: '1월', value: 40 }, { name: '2월', value: 30 }, { name: '3월', value: 65 }, 
    { name: '4월', value: 90 }, { name: '5월', value: 75 }, { name: '6월', value: 50 },
    { name: '7월', value: 45 }, { name: '8월', value: 60 }, { name: '9월', value: 85 },
    { name: '10월', value: 92 }, { name: '11월', value: 70 }, { name: '12월', value: 80 }
  ];

  return (
    <div className="p-8 grid grid-cols-12 gap-6 pb-20">
      <div className="col-span-12 mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{userData.name}님의 정밀 분석 대시보드</h1>
          <p className="text-slate-400">
            <span className="text-primary font-semibold">{analysis.archetype}</span> 유형 
            <span className="mx-2 opacity-30">|</span> 
            {userData.focusArea === 'career' ? '전문 경영 및 리더십 최적화' : '지속 가능한 자산 증식형'} 프로필
          </p>
        </div>
        {isTimeUnknown && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <span className="material-symbols-outlined text-amber-500 text-sm">info</span>
            <span className="text-[11px] text-amber-500 font-bold uppercase tracking-tight">삼주 기반 분석(시간 미포함)</span>
          </div>
        )}
      </div>

      {/* Left Column */}
      <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
        <div className="glass-card rounded-xl p-6 transition-all hover:border-white/20">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-bold text-lg text-white">오행 균형 분석 (Elemental Balance)</h3>
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">Real-time Analysis</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar
                  name="Elements"
                  dataKey="value"
                  stroke="#13e76b"
                  fill="#13e76b"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4 text-center">
            {radarData.map(d => (
              <div key={d.subject}>
                <p className="text-[10px] text-slate-500 uppercase">{d.subject}</p>
                <p className="text-sm font-bold text-white">{d.value}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 transition-all hover:border-white/20">
          <h3 className="font-bold text-lg text-white mb-4">상생상극 매트릭스 (Sheng/Ke Cycle)</h3>
          <div className="flex items-center gap-6">
            <div className="w-1/2 flex justify-center">
              <div className="relative w-32 h-32 border border-white/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-primary opacity-50">sync_alt</span>
                <div className="absolute top-0 w-8 h-8 glass-card rounded-full flex items-center justify-center text-[10px] text-red-400">火</div>
                <div className="absolute right-0 w-8 h-8 glass-card rounded-full flex items-center justify-center text-[10px] text-amber-400">土</div>
                <div className="absolute bottom-0 w-8 h-8 glass-card rounded-full flex items-center justify-center text-[10px] text-slate-300">金</div>
                <div className="absolute left-0 w-8 h-8 glass-card rounded-full flex items-center justify-center text-[10px] text-green-400">木</div>
              </div>
            </div>
            <div className="w-1/2 space-y-3">
              <p className="text-xs text-slate-300"><span className="font-bold text-primary">상생:</span> 목생화(木生火) - 전략이 실행을 촉진함</p>
              <p className="text-xs text-slate-300"><span className="font-bold text-red-400">상극:</span> 수극화(水剋火) - 정서적 불안정이 성과 저해</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
        <div className="glass-card rounded-xl p-8 transition-all hover:border-white/20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-xl text-white">현대적 비즈니스 역량 키워드</h3>
              <p className="text-sm text-slate-400">십성(Sipsung) 분석을 전문 역량으로 치환</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{isTimeUnknown ? '86' : '92'}</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Overall Fit</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {competencyData.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-primary font-bold">{item.score}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-6 transition-all hover:border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary">psychology</span>
              <h4 className="font-bold text-white">오늘의 핵심 인사이트</h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              현재 <span className="text-primary font-bold">화(Fire)</span>의 기운이 절정입니다. {isTimeUnknown ? "시간 정보가 없어 일간의 힘을 삼주 기준으로 추정하였을 때," : ""} 대외적인 발표나 새로운 프로젝트 런칭에 최적의 시기입니다.
            </p>
          </div>
          <div className="glass-card rounded-xl p-6 transition-all hover:border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary">warning</span>
              <h4 className="font-bold text-white">리스크 경고</h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              수(Water)의 부족으로 인해 번아웃이나 충동적 결정의 위험이 있습니다. {isTimeUnknown ? "시주(시간)의 보완 가능성을 염두에 두되," : ""} 오후 3시경 <span className="text-blue-400 font-bold">15분간의 딥 명상</span>을 권장합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-12">
        <div className="glass-card rounded-xl p-8 overflow-hidden relative transition-all hover:border-white/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <h3 className="font-bold text-xl text-white mb-6">연간 성취 에너지 흐름 (Annual Trajectory)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trajectoryData}>
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(19, 231, 107, 0.1)' }}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #13e76b', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {trajectoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 85 ? '#13e76b' : 'rgba(19, 231, 107, 0.2)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>Q1: 기초 구축</span>
            <span>Q2: 성장 확장</span>
            <span>Q3: 안정 유지</span>
            <span>Q4: 성과 수확</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
