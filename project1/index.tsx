import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- Types ---
interface Certificate {
  id: number;
  name: string;
  category: string;
  difficulty: number;  // 난이도
  practicality: number; // 실용성
  expertise: number;    // 전문성
}

// --- Data: 50 Certificates ---
const CERTIFICATES: Certificate[] = [
  // IT & Tech
  { id: 1, name: "정보처리기사", category: "IT", difficulty: 6, practicality: 8, expertise: 7 },
  { id: 2, name: "AWS Solutions Architect Associate", category: "IT", difficulty: 7, practicality: 9, expertise: 8 },
  { id: 3, name: "컴퓨터활용능력 1급", category: "IT", difficulty: 6, practicality: 9, expertise: 5 },
  { id: 4, name: "SQLD (SQL 개발자)", category: "IT", difficulty: 5, practicality: 8, expertise: 6 },
  { id: 5, name: "CISA (정보시스템감사사)", category: "IT", difficulty: 8, practicality: 6, expertise: 9 },
  { id: 6, name: "CISSP (정보시스템보안전문가)", category: "IT", difficulty: 9, practicality: 7, expertise: 10 },
  { id: 7, name: "정보보안기사", category: "IT", difficulty: 9, practicality: 7, expertise: 9 },
  { id: 8, name: "빅데이터분석기사", category: "IT", difficulty: 7, practicality: 7, expertise: 8 },
  { id: 9, name: "ADsP (데이터분석준전문가)", category: "IT", difficulty: 4, practicality: 7, expertise: 5 },
  { id: 10, name: "리눅스마스터 2급", category: "IT", difficulty: 4, practicality: 6, expertise: 5 },
  { id: 11, name: "네트워크관리사 2급", category: "IT", difficulty: 4, practicality: 6, expertise: 5 },
  { id: 12, name: "CCNA", category: "IT", difficulty: 6, practicality: 8, expertise: 7 },
  
  // Finance & Accounting
  { id: 13, name: "CPA (공인회계사)", category: "Finance", difficulty: 10, practicality: 9, expertise: 10 },
  { id: 14, name: "CFA (국제재무분석사) Level 1", category: "Finance", difficulty: 8, practicality: 8, expertise: 9 },
  { id: 15, name: "전산세무 1급", category: "Finance", difficulty: 7, practicality: 9, expertise: 8 },
  { id: 16, name: "전산세무 2급", category: "Finance", difficulty: 5, practicality: 9, expertise: 6 },
  { id: 17, name: "전산회계 1급", category: "Finance", difficulty: 4, practicality: 8, expertise: 5 },
  { id: 18, name: "재경관리사", category: "Finance", difficulty: 6, practicality: 8, expertise: 7 },
  { id: 19, name: "신용분석사", category: "Finance", difficulty: 6, practicality: 7, expertise: 7 },
  { id: 20, name: "AFPK (재무설계사)", category: "Finance", difficulty: 5, practicality: 7, expertise: 6 },
  { id: 21, name: "CFP (국제재무설계사)", category: "Finance", difficulty: 8, practicality: 8, expertise: 9 },
  
  // Language
  { id: 22, name: "토익 (TOEIC) 900+", category: "Language", difficulty: 6, practicality: 9, expertise: 5 },
  { id: 23, name: "토익스피킹 AL", category: "Language", difficulty: 5, practicality: 9, expertise: 4 },
  { id: 24, name: "OPIc AL", category: "Language", difficulty: 6, practicality: 9, expertise: 5 },
  { id: 25, name: "JLPT N1", category: "Language", difficulty: 7, practicality: 6, expertise: 7 },
  { id: 26, name: "HSK 6급", category: "Language", difficulty: 8, practicality: 6, expertise: 7 },
  
  // Construction & Safety
  { id: 27, name: "산업안전기사", category: "Safety", difficulty: 6, practicality: 9, expertise: 7 },
  { id: 28, name: "건설안전기사", category: "Safety", difficulty: 6, practicality: 8, expertise: 7 },
  { id: 29, name: "전기기사", category: "Engineering", difficulty: 8, practicality: 10, expertise: 8 },
  { id: 30, name: "소방설비기사(전기)", category: "Safety", difficulty: 7, practicality: 8, expertise: 7 },
  { id: 31, name: "건축기사", category: "Engineering", difficulty: 7, practicality: 8, expertise: 7 },
  { id: 32, name: "토목기사", category: "Engineering", difficulty: 8, practicality: 8, expertise: 8 },
  { id: 33, name: "일반기계기사", category: "Engineering", difficulty: 8, practicality: 8, expertise: 8 },
  { id: 34, name: "위험물산업기사", category: "Safety", difficulty: 5, practicality: 7, expertise: 6 },

  // Service & Etc
  { id: 35, name: "바리스타 2급", category: "Service", difficulty: 2, practicality: 5, expertise: 3 },
  { id: 36, name: "제과/제빵기능사", category: "Service", difficulty: 4, practicality: 6, expertise: 5 },
  { id: 37, name: "한식조리기능사", category: "Service", difficulty: 5, practicality: 6, expertise: 5 },
  { id: 38, name: "CS리더스관리사", category: "Service", difficulty: 3, practicality: 6, expertise: 4 },
  { id: 39, name: "유통관리사 2급", category: "Business", difficulty: 4, practicality: 7, expertise: 5 },
  { id: 40, name: "물류관리사", category: "Business", difficulty: 6, practicality: 7, expertise: 6 },
  { id: 41, name: "GTQ 포토샵 1급", category: "Design", difficulty: 3, practicality: 8, expertise: 4 },
  { id: 42, name: "웹디자인기능사", category: "Design", difficulty: 4, practicality: 7, expertise: 5 },
  { id: 43, name: "직업상담사 2급", category: "Counseling", difficulty: 5, practicality: 7, expertise: 6 },
  { id: 44, name: "사회복지사 1급", category: "Social", difficulty: 6, practicality: 8, expertise: 7 },
  { id: 45, name: "한국사능력검정시험 1급", category: "General", difficulty: 4, practicality: 6, expertise: 3 },
  { id: 46, name: "KBS한국어능력시험", category: "General", difficulty: 7, practicality: 5, expertise: 6 },
  { id: 47, name: "공인중개사", category: "Real Estate", difficulty: 8, practicality: 7, expertise: 7 },
  { id: 48, name: "주택관리사", category: "Real Estate", difficulty: 7, practicality: 7, expertise: 6 },
  { id: 49, name: "감정평가사", category: "Real Estate", difficulty: 10, practicality: 8, expertise: 10 },
  { id: 50, name: "변리사", category: "Law", difficulty: 10, practicality: 8, expertise: 10 },
];

// --- Algorithm ---
function calculateMagnitude(vec: number[]): number {
  return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
}

function calculateDotProduct(vecA: number[], vecB: number[]): number {
  return vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
}

// 1. 코사인 유사도 (방향성 일치도)
// - 두 벡터의 사이각만 고려하며, 크기는 무시합니다. (비율이 비슷하면 1에 가까움)
function getCosineSimilarity(userVec: number[], certVec: number[]): number {
  const magA = calculateMagnitude(userVec);
  const magB = calculateMagnitude(certVec);

  if (magA === 0 || magB === 0) return 0;
  return calculateDotProduct(userVec, certVec) / (magA * magB);
}

// 2. 벡터 크기 유사도 (강도/레벨 일치도 - Vector Size Correction)
// - 코사인 유사도의 단점(비율은 같으나 레벨이 극명하게 다른 경우)을 보완합니다.
// - 예: 사용자가 (2,2,2)를 원하는데 (10,10,10)이 추천되는 것을 방지합니다.
function getMagnitudeSimilarity(userVec: number[], certVec: number[]): number {
  const magA = calculateMagnitude(userVec);
  const magB = calculateMagnitude(certVec);
  
  // 최대 가능한 크기 차이 (0,0,0) vs (10,10,10) => ~17.32
  const maxPossibleDiff = Math.sqrt(300); // sqrt(10^2 + 10^2 + 10^2)
  
  const diff = Math.abs(magA - magB);
  
  // 차이가 0이면 1, 차이가 최대면 0이 되도록 정규화
  // 보정 효과를 부드럽게 주기 위해 제곱근이나 지수 함수를 쓸 수 있으나 직관적인 선형 보간 사용
  let similarity = 1 - (diff / maxPossibleDiff);
  
  return Math.max(0, similarity);
}

// --- Utils ---
const getLabelForValue = (val: number, type: 'difficulty' | 'practicality' | 'expertise') => {
    if (val <= 2) return type === 'difficulty' ? '매우 쉬움' : '낮음';
    if (val <= 4) return type === 'difficulty' ? '쉬움' : '기초';
    if (val <= 6) return '보통';
    if (val <= 8) return type === 'difficulty' ? '어려움' : '높음';
    return type === 'difficulty' ? '매우 어려움' : '전문가 수준';
};

// --- Components ---

const Slider = ({ 
  label, 
  value, 
  onChange, 
  colorClass, 
  type 
}: { 
  label: string, 
  value: number, 
  onChange: (val: number) => void, 
  colorClass: string,
  type: 'difficulty' | 'practicality' | 'expertise'
}) => {
  const labelText = getLabelForValue(value, type);
  
  return (
    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <label className="text-slate-700 font-bold text-lg flex items-center gap-2">
            {label}
        </label>
        <div className={`px-3 py-1 rounded-full text-sm font-bold bg-white border shadow-sm ${colorClass.replace('text-', 'text-').replace('accent-', 'border-')}`}>
            {value}점 <span className="text-slate-400 font-normal">| {labelText}</span>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${colorClass}`}
      />
      <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium tracking-wide uppercase">
        <span>Low</span>
        <span>Mid</span>
        <span>High</span>
      </div>
    </div>
  );
};

const StatBar = ({ label, val, userVal, colorBg, colorFill }: { label: string, val: number, userVal: number, colorBg: string, colorFill: string }) => {
  return (
    <div className="flex items-center gap-3 text-xs mb-2 last:mb-0">
      <span className="w-12 text-slate-500 font-medium">{label}</span>
      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden relative">
        {/* Certificate Value Bar */}
        <div 
          className={`h-full rounded-r-full absolute top-0 left-0 transition-all duration-500 ${colorFill}`}
          style={{ width: `${val * 10}%`, opacity: 0.8 }}
        ></div>
        
        {/* User Value Marker */}
        <div 
            className="h-full absolute top-0 w-1 bg-slate-800 z-10 shadow-[0_0_4px_rgba(0,0,0,0.3)]"
            style={{ left: `${userVal * 10}%` }}
        ></div>
      </div>
      <span className="w-6 text-right font-bold text-slate-700">{val}</span>
    </div>
  );
};

interface ResultCardProps { 
  cert: Certificate; 
  similarity: number; 
  cosineSim: number;
  magSim: number;
  userVec: number[]; 
  rank: number; 
}

const ResultCard = ({ cert, similarity, cosineSim, magSim, userVec, rank }: ResultCardProps) => {
  const percentage = (similarity * 100).toFixed(1);
  const isTopMatch = rank === 1;
  
  return (
    <div className={`relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border ${isTopMatch ? 'border-indigo-200 ring-1 ring-indigo-100' : 'border-slate-100'}`}>
      
      {/* Rank Badge for top 3 */}
      {rank <= 3 && (
        <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white rounded-bl-xl ${
            rank === 1 ? 'bg-indigo-500' : rank === 2 ? 'bg-indigo-400' : 'bg-indigo-300'
        }`}>
            #{rank} 추천
        </div>
      )}

      <div className="flex justify-between items-start mb-6 mt-1">
        <div>
          <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-indigo-600 bg-indigo-50 rounded-full mb-2 uppercase">
            {cert.category}
          </span>
          <h3 className="font-bold text-xl text-slate-800 leading-tight">{cert.name}</h3>
        </div>
        <div className="text-right pl-4">
          <div className="flex items-center justify-end gap-1">
             <span className="text-3xl font-black text-indigo-600 tracking-tight">{percentage}</span>
             <span className="text-sm font-medium text-indigo-400 self-end mb-1">%</span>
          </div>
          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total Score</div>
        </div>
      </div>
      
      {/* Stats Comparison */}
      <div className="space-y-3 pt-4 border-t border-slate-50">
        <StatBar label="난이도" val={cert.difficulty} userVal={userVec[0]} colorBg="bg-red-100" colorFill="bg-red-500" />
        <StatBar label="실용성" val={cert.practicality} userVal={userVec[1]} colorBg="bg-emerald-100" colorFill="bg-emerald-500" />
        <StatBar label="전문성" val={cert.expertise} userVal={userVec[2]} colorBg="bg-blue-100" colorFill="bg-blue-500" />
      </div>

      {/* Algorithm Analysis Details */}
      <div className="mt-4 pt-3 flex gap-2 border-t border-slate-50">
         <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">성향(방향) 일치</div>
            <div className="text-sm font-bold text-slate-700">{(cosineSim * 100).toFixed(0)}%</div>
         </div>
         <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">레벨(강도) 일치</div>
            <div className="text-sm font-bold text-slate-700">{(magSim * 100).toFixed(0)}%</div>
         </div>
      </div>
    </div>
  );
};

const App = () => {
  const [difficulty, setDifficulty] = useState(5);
  const [practicality, setPracticality] = useState(5);
  const [expertise, setExpertise] = useState(5);

  const recommendedCerts = useMemo(() => {
    const userVec = [difficulty, practicality, expertise];
    
    // Check if vector is zero
    if (difficulty === 0 && practicality === 0 && expertise === 0) {
      return [];
    }

    const scored = CERTIFICATES.map(cert => {
      const certVec = [cert.difficulty, cert.practicality, cert.expertise];
      
      // 1. Cosine Similarity (Direction)
      const cosineSim = getCosineSimilarity(userVec, certVec);
      
      // 2. Magnitude Similarity (Vector Size Correction)
      const magSim = getMagnitudeSimilarity(userVec, certVec);
      
      // 3. Hybrid Score
      // 방향성(성향)을 70%, 강도(레벨)를 30% 반영
      const finalScore = (cosineSim * 0.7) + (magSim * 0.3);

      return { 
          ...cert, 
          similarity: finalScore,
          cosineSim,
          magSim
      };
    });

    // Sort by final similarity descending
    return scored.sort((a, b) => b.similarity - a.similarity).slice(0, 10); // Top 10
  }, [difficulty, practicality, expertise]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-900">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white pt-16 pb-24 px-4 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-sm">
            자격증 추천 AI
            </h1>
            <p className="text-indigo-100 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto opacity-90">
            코사인 유사도(Cosine Similarity)와 벡터 크기 보정(Vector Correction) 알고리즘을 결합하여<br className="hidden md:block" />
            당신의 성향과 레벨에 가장 적합한 자격증을 찾아드립니다.
            </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        {/* Input Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-900/5 p-8 md:p-10 mb-12 border border-white/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                선호도 설정
            </h2>
            <div className="text-xs font-mono text-slate-400 bg-slate-100 px-3 py-1 rounded-md">
                Vector: [{difficulty}, {practicality}, {expertise}]
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            <Slider 
                label="난이도" 
                value={difficulty} 
                onChange={setDifficulty} 
                colorClass="text-red-500 accent-red-500" 
                type="difficulty"
            />
            <Slider 
                label="실용성" 
                value={practicality} 
                onChange={setPracticality} 
                colorClass="text-emerald-500 accent-emerald-500" 
                type="practicality"
            />
            <Slider 
                label="전문성" 
                value={expertise} 
                onChange={setExpertise} 
                colorClass="text-blue-500 accent-blue-500" 
                type="expertise"
            />
          </div>

          <div className="mt-8 flex items-start gap-3 p-4 bg-indigo-50/50 rounded-xl text-sm text-indigo-800 border border-indigo-100/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>
              <strong>하이브리드 추천 알고리즘:</strong> 단순히 비율만 보는 것이 아니라, 
              입력하신 <strong>레벨(강도)</strong>까지 고려하여 추천합니다. 
              (예: 낮은 난이도를 원하시면 높은 난이도의 자격증은 제외됩니다.)
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-md shadow-indigo-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
            </div>
            추천 결과 <span className="text-slate-400 font-normal text-lg ml-1">Top 10</span>
          </h2>

          {difficulty === 0 && practicality === 0 && expertise === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
               <div className="text-4xl mb-4 text-slate-200">📊</div>
               <p className="text-slate-500 font-medium">선호도를 입력하여 나에게 딱 맞는 자격증을 찾아보세요.</p>
               <p className="text-sm text-slate-400 mt-2">값이 모두 0이면 추천할 수 없습니다.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedCerts.map((cert, index) => (
                <ResultCard 
                  key={cert.id} 
                  cert={cert} 
                  similarity={cert.similarity}
                  cosineSim={cert.cosineSim}
                  magSim={cert.magSim}
                  userVec={[difficulty, practicality, expertise]} 
                  rank={index + 1}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);